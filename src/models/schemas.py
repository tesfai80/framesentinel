from pydantic import BaseModel
from typing import Optional, Dict, List
from datetime import datetime
from enum import Enum

class SessionState(str, Enum):
    CREATED = "CREATED"
    UPLOADED = "UPLOADED"
    PROCESSING = "PROCESSING"
    ANALYZED = "ANALYZED"
    COMPLETED = "COMPLETED"
    FAILED = "FAILED"

class RiskLevel(str, Enum):
    VERIFIED = "VERIFIED"
    SUSPICIOUS = "SUSPICIOUS"
    HIGH_RISK = "HIGH_RISK"

class SessionCreateRequest(BaseModel):
    user_id: str
    device_metadata: Optional[Dict] = {}

class SessionCreateResponse(BaseModel):
    session_id: str
    state: SessionState
    created_at: datetime

class UploadResponse(BaseModel):
    session_id: str
    state: SessionState
    message: str

class DetectionFlags(BaseModel):
    deepfake_detected: bool
    replay_detected: bool
    injection_detected: bool
    face_swap_detected: bool
    metadata_anomaly: bool

class FrameEvent(BaseModel):
    frame_number: int
    timestamp: float
    flags: List[str]
    confidence: float

class VerificationResponse(BaseModel):
    session_id: str
    state: SessionState
    authenticity_score: Optional[float] = None
    risk_level: Optional[RiskLevel] = None
    detection_flags: Optional[DetectionFlags] = None
    frame_timeline: Optional[List[FrameEvent]] = None
    processed_at: Optional[datetime] = None
