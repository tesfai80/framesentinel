from src.services.frame_extractor import FrameExtractor
from src.detection.pipeline import DetectionPipeline
from src.services.risk_scorer import FraudRiskScorer
from src.models.database import VerificationSession, VerificationResult, SessionState
from src.services.tenant.tenant_service import TenantService
from src.services.webhooks.webhook_service import WebhookService
from sqlalchemy.orm import Session
from datetime import datetime
import asyncio

class VideoProcessor:
    def __init__(self):
        self.frame_extractor = FrameExtractor(sample_rate=5)
        self.detection_pipeline = DetectionPipeline()
        self.risk_scorer = FraudRiskScorer()
    
    def process_video(self, session_id: str, video_path: str, db: Session):
        try:
            session = db.query(VerificationSession).filter(
                VerificationSession.session_id == session_id
            ).first()
            
            if not session:
                return
            
            session.state = SessionState.PROCESSING
            db.commit()
            
            metadata = self.frame_extractor.get_video_metadata(video_path)
            frames = self.frame_extractor.extract_frames(video_path)
            
            frame_results = []
            for frame_num, frame in frames:
                result = self.detection_pipeline.process_frame(frame_num, frame)
                frame_results.append(result)
            
            metadata_result = self.detection_pipeline.check_metadata(metadata)
            
            session.state = SessionState.ANALYZED
            db.commit()
            
            scoring_result = self.risk_scorer.calculate_score(frame_results, metadata_result)
            
            result = VerificationResult(
                session_id=session_id,
                authenticity_score=scoring_result["authenticity_score"],
                risk_level=scoring_result["risk_level"],
                detection_flags=scoring_result["detection_flags"].dict(),
                frame_timeline=[event.dict() for event in scoring_result["frame_timeline"]],
                processed_at=datetime.utcnow()
            )
            
            db.add(result)
            session.state = SessionState.COMPLETED
            db.commit()
            
            # Send webhook if configured
            tenant_settings = TenantService.get_settings(db, session.tenant_id)
            if tenant_settings and tenant_settings.webhook_enabled and tenant_settings.webhook_url:
                webhook_service = WebhookService()
                webhook_payload = {
                    "session_id": session_id,
                    "user_id": session.user_id,
                    "authenticity_score": scoring_result["authenticity_score"],
                    "risk_level": scoring_result["risk_level"].value,
                    "detection_flags": scoring_result["detection_flags"].dict(),
                    "processed_at": datetime.utcnow().isoformat()
                }
                try:
                    asyncio.run(webhook_service.deliver(
                        tenant_settings.webhook_url,
                        session_id,
                        webhook_payload,
                        db
                    ))
                except Exception as webhook_error:
                    print(f"Webhook delivery failed: {webhook_error}")
            
        except Exception as e:
            session.state = SessionState.FAILED
            db.commit()
            raise e
