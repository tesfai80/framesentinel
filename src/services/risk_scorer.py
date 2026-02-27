from typing import List, Dict
from src.models.schemas import RiskLevel, DetectionFlags, FrameEvent

class FraudRiskScorer:
    def calculate_score(self, frame_results: List[Dict], metadata_result: Dict) -> Dict:
        total_frames = len(frame_results)
        if total_frames == 0:
            return self._default_result()
        
        deepfake_count = sum(1 for r in frame_results if r["deepfake"]["detected"])
        replay_count = sum(1 for r in frame_results if r["replay"]["detected"])
        injection_count = sum(1 for r in frame_results if r["injection"]["detected"])
        face_swap_count = sum(1 for r in frame_results if r["face_swap"]["detected"])
        metadata_anomaly = metadata_result.get("detected", False)
        
        detection_rate = (deepfake_count + replay_count + injection_count + face_swap_count) / (total_frames * 4)
        
        authenticity_score = max(0.0, 1.0 - detection_rate - (0.2 if metadata_anomaly else 0.0))
        
        risk_level = self._determine_risk_level(authenticity_score)
        
        detection_flags = DetectionFlags(
            deepfake_detected=deepfake_count > total_frames * 0.3,
            replay_detected=replay_count > total_frames * 0.3,
            injection_detected=injection_count > total_frames * 0.3,
            face_swap_detected=face_swap_count > total_frames * 0.3,
            metadata_anomaly=metadata_anomaly
        )
        
        frame_timeline = self._build_timeline(frame_results)
        
        return {
            "authenticity_score": round(authenticity_score, 3),
            "risk_level": risk_level,
            "detection_flags": detection_flags,
            "frame_timeline": frame_timeline
        }
    
    def _determine_risk_level(self, score: float) -> RiskLevel:
        if score >= 0.75:
            return RiskLevel.VERIFIED
        elif score >= 0.50:
            return RiskLevel.SUSPICIOUS
        else:
            return RiskLevel.HIGH_RISK
    
    def _build_timeline(self, frame_results: List[Dict]) -> List[FrameEvent]:
        timeline = []
        for result in frame_results:
            flags = []
            confidences = []
            
            if result["deepfake"]["detected"]:
                flags.append("deepfake")
                confidences.append(result["deepfake"]["confidence"])
            if result["replay"]["detected"]:
                flags.append("replay")
                confidences.append(result["replay"]["confidence"])
            if result["injection"]["detected"]:
                flags.append("injection")
                confidences.append(result["injection"]["confidence"])
            if result["face_swap"]["detected"]:
                flags.append("face_swap")
                confidences.append(result["face_swap"]["confidence"])
            
            if flags:
                timeline.append(FrameEvent(
                    frame_number=result["frame_number"],
                    timestamp=result["frame_number"] / 30.0,
                    flags=flags,
                    confidence=round(sum(confidences) / len(confidences), 3)
                ))
        
        return timeline
    
    def _default_result(self) -> Dict:
        return {
            "authenticity_score": 0.0,
            "risk_level": RiskLevel.HIGH_RISK,
            "detection_flags": DetectionFlags(
                deepfake_detected=False,
                replay_detected=False,
                injection_detected=False,
                face_swap_detected=False,
                metadata_anomaly=True
            ),
            "frame_timeline": []
        }
