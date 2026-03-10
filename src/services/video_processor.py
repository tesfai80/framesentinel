from src.services.frame_extractor import FrameExtractor
from src.detection.pipeline import DetectionPipeline
from src.services.risk_scorer import FraudRiskScorer
from src.models.database import VerificationSession, VerificationResult, SessionState
from src.services.tenant.tenant_service import TenantService
from src.services.webhooks.webhook_service import WebhookService
from src.services.cache_service import cache_service
from sqlalchemy.orm import Session
from datetime import datetime
import asyncio
import hashlib
import json

class VideoProcessor:
    def __init__(self):
        self.frame_extractor = FrameExtractor(sample_rate=15, max_frames=15)
        self.detection_pipeline = DetectionPipeline()
        self.risk_scorer = FraudRiskScorer()
    
    def _get_video_hash(self, video_path: str) -> str:
        """Calculate hash of video file for caching"""
        try:
            with open(video_path, 'rb') as f:
                return hashlib.md5(f.read()).hexdigest()
        except Exception:
            return None
    
    def _send_webhook(self, session_id: str, session, scoring_result: dict, processing_start: datetime, db: Session):
        """Send webhook notification"""
        print(f"\n{'='*60}")
        print(f"WEBHOOK CHECK START - Session: {session_id}")
        print(f"Tenant ID: {session.tenant_id}")
        
        tenant_settings = TenantService.get_settings(db, session.tenant_id)
        print(f"Tenant settings loaded: {tenant_settings is not None}")
        
        if tenant_settings:
            print(f"Webhook enabled: {tenant_settings.webhook_enabled}")
            print(f"Webhook URL: {tenant_settings.webhook_url}")
        
        if tenant_settings and tenant_settings.webhook_enabled and tenant_settings.webhook_url:
            print(f"\n🚀 SENDING WEBHOOK TO: {tenant_settings.webhook_url}")
            processing_time_ms = int((datetime.utcnow() - processing_start).total_seconds() * 1000)
            webhook_service = WebhookService()
            webhook_payload = {
                "session_id": session_id,
                "user_id": session.user_id,
                "authenticity_score": scoring_result["authenticity_score"],
                "risk_level": scoring_result["risk_level"].value,
                "detection_flags": scoring_result["detection_flags"].dict(),
                "processing_time_ms": processing_time_ms,
                "tenant_id": session.tenant_id,
                "processed_at": datetime.utcnow().isoformat()
            }
            print(f"Webhook payload: {json.dumps(webhook_payload, indent=2)}")
            try:
                print("Calling webhook service...")
                result = asyncio.run(webhook_service.deliver(
                    tenant_settings.webhook_url,
                    session_id,
                    webhook_payload,
                    db
                ))
                print(f"✅ WEBHOOK DELIVERED SUCCESSFULLY: {result}")
            except Exception as webhook_error:
                print(f"❌ WEBHOOK DELIVERY FAILED: {webhook_error}")
                import traceback
                traceback.print_exc()
        else:
            print(f"⚠️ WEBHOOK SKIPPED - Not configured or disabled")
            if tenant_settings:
                print(f"  - Enabled: {tenant_settings.webhook_enabled}")
                print(f"  - URL: {tenant_settings.webhook_url}")
        
        print(f"WEBHOOK CHECK END")
        print(f"{'='*60}\n")
    
    def process_video(self, session_id: str, video_path: str, db: Session):
        processing_start = datetime.utcnow()
        print(f"\n[VIDEO PROCESSOR] Starting process_video for {session_id}")
        
        try:
            session = db.query(VerificationSession).filter(
                VerificationSession.session_id == session_id
            ).first()
            
            if not session:
                print(f"[VIDEO PROCESSOR] Session not found: {session_id}")
                return
            
            print(f"[VIDEO PROCESSOR] Session found, tenant: {session.tenant_id}")
            session.state = SessionState.PROCESSING
            db.commit()
            
            # Check cache for identical video
            video_hash = self._get_video_hash(video_path)
            print(f"[VIDEO PROCESSOR] Video hash: {video_hash}")
            
            if video_hash:
                cache_key = f"video_result:{video_hash}"
                cached_result = cache_service.get(cache_key)
                if cached_result:
                    print(f"[VIDEO PROCESSOR] Using cached result")
                    cached_data = json.loads(cached_result)
                    result = VerificationResult(
                        session_id=session_id,
                        authenticity_score=cached_data["authenticity_score"],
                        risk_level=cached_data["risk_level"],
                        detection_flags=cached_data["detection_flags"],
                        frame_timeline=cached_data["frame_timeline"],
                        processed_at=datetime.utcnow()
                    )
                    db.add(result)
                    session.state = SessionState.COMPLETED
                    db.commit()
                    
                    # Send webhook even for cached results
                    scoring_result = {
                        "authenticity_score": cached_data["authenticity_score"],
                        "risk_level": type('obj', (object,), {'value': cached_data["risk_level"]}),
                        "detection_flags": type('obj', (object,), {'dict': lambda: cached_data["detection_flags"]})
                    }
                    self._send_webhook(session_id, session, scoring_result, processing_start, db)
                    return
            
            print(f"[VIDEO PROCESSOR] Processing video (not cached)")
            
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
            
            print(f"[VIDEO PROCESSOR] Result saved to database")
            
            # Cache result for future identical videos (24 hours)
            if video_hash:
                cache_key = f"video_result:{video_hash}"
                cache_data = {
                    "authenticity_score": scoring_result["authenticity_score"],
                    "risk_level": scoring_result["risk_level"].value,
                    "detection_flags": scoring_result["detection_flags"].dict(),
                    "frame_timeline": [event.dict() for event in scoring_result["frame_timeline"]]
                }
                cache_service.set(cache_key, json.dumps(cache_data), ttl=86400)
                print(f"[VIDEO PROCESSOR] Result cached")
            
            # Send webhook
            self._send_webhook(session_id, session, scoring_result, processing_start, db)
            
        except Exception as e:
            print(f"[VIDEO PROCESSOR] Exception occurred: {e}")
            import traceback
            traceback.print_exc()
            session.state = SessionState.FAILED
            db.commit()
            raise e
