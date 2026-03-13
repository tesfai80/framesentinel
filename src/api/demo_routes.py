from fastapi import APIRouter, UploadFile, File, HTTPException, Request
from sqlalchemy.orm import Session
from src.config.database import get_db
from fastapi import Depends
from src.models.database import VerificationSession, VerificationResult, SessionState
from src.services.background_processor import background_processor
from src.config.settings import settings
import uuid
import os
import shutil
import time
from collections import defaultdict
from datetime import datetime, timedelta
import cv2

router = APIRouter(prefix="/api/v1/demo")

# In-memory rate limiting (for production, use Redis)
rate_limit_store = defaultdict(list)
RATE_LIMIT_PER_IP = 2  # 2 attempts per IP
RATE_LIMIT_WINDOW = 3600  # 1 hour in seconds
MAX_VIDEO_DURATION = 15  # 15 seconds max
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB

def check_rate_limit(ip: str) -> bool:
    """Check if IP has exceeded rate limit"""
    now = time.time()
    
    # Clean old entries
    rate_limit_store[ip] = [
        timestamp for timestamp in rate_limit_store[ip]
        if now - timestamp < RATE_LIMIT_WINDOW
    ]
    
    # Check limit
    if len(rate_limit_store[ip]) >= RATE_LIMIT_PER_IP:
        return False
    
    # Add new attempt
    rate_limit_store[ip].append(now)
    return True

def get_video_duration(video_path: str) -> float:
    """Get video duration in seconds"""
    try:
        cap = cv2.VideoCapture(video_path)
        fps = cap.get(cv2.CAP_PROP_FPS)
        frame_count = cap.get(cv2.CAP_PROP_FRAME_COUNT)
        duration = frame_count / fps if fps > 0 else 0
        cap.release()
        return duration
    except Exception as e:
        print(f"Error getting video duration: {e}")
        return 0

@router.post("/upload")
async def demo_upload(
    request: Request,
    video: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """
    Demo endpoint for trying FrameSentinel without API key.
    Limitations:
    - 2 attempts per IP per hour
    - Max 10 seconds video
    - Max 10MB file size
    - Partial results only (score + flags, no timeline)
    """
    
    # Get client IP
    client_ip = request.client.host
    
    # Check rate limit
    if not check_rate_limit(client_ip):
        raise HTTPException(
            status_code=429,
            detail={
                "error": "Rate limit exceeded",
                "message": "You've reached the demo limit of 2 attempts per hour. Please sign up for unlimited access.",
                "retry_after": RATE_LIMIT_WINDOW
            }
        )
    
    # Check file size
    file_size = 0
    content = await video.read()
    file_size = len(content)
    
    if file_size > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail=f"File too large. Demo limit is 10MB. Please sign up for larger files."
        )
    
    # Validate format
    file_ext = os.path.splitext(video.filename)[1]
    if file_ext not in settings.ALLOWED_FORMATS:
        raise HTTPException(status_code=400, detail="Invalid video format")
    
    # Create demo session
    session_id = str(uuid.uuid4())
    session = VerificationSession(
        session_id=session_id,
        user_id=f"demo_{client_ip}",
        tenant_id="demo",
        state=SessionState.CREATED,
        device_metadata={"ip": client_ip, "demo": True}
    )
    db.add(session)
    db.commit()
    
    # Save video temporarily
    os.makedirs(settings.STORAGE_PATH, exist_ok=True)
    video_path = os.path.join(settings.STORAGE_PATH, f"{session_id}{file_ext}")
    
    with open(video_path, "wb") as buffer:
        buffer.write(content)
    
    # Check video duration
    duration = get_video_duration(video_path)
    if duration > MAX_VIDEO_DURATION:
        os.remove(video_path)
        db.delete(session)
        db.commit()
        raise HTTPException(
            status_code=400,
            detail={
                "error": "Video too long",
                "message": f"Your video is {duration:.1f} seconds. Demo limit is {MAX_VIDEO_DURATION} seconds.",
                "suggestion": "Try a shorter clip or sign up for unlimited video length.",
                "upgrade_url": "/signup"
            }
        )
    
    # Update session
    session.video_path = video_path
    session.state = SessionState.UPLOADED
    db.commit()
    
    # Start processing
    background_processor.enqueue(session_id, video_path)
    
    return {
        "session_id": session_id,
        "state": SessionState.UPLOADED,
        "message": "Demo video uploaded successfully. Processing...",
        "demo_mode": True,
        "limitations": {
            "attempts_remaining": RATE_LIMIT_PER_IP - len(rate_limit_store[client_ip]),
            "max_video_duration": MAX_VIDEO_DURATION,
            "partial_results": True
        }
    }

@router.get("/result/{session_id}")
async def demo_result(
    session_id: str,
    request: Request,
    db: Session = Depends(get_db)
):
    """
    Get demo result - returns partial results only (score + flags)
    """
    
    session = db.query(VerificationSession).filter(
        VerificationSession.session_id == session_id,
        VerificationSession.tenant_id == "demo"
    ).first()
    
    if not session:
        raise HTTPException(status_code=404, detail="Demo session not found")
    
    # Return status if still processing
    if session.state in [SessionState.CREATED, SessionState.UPLOADED, SessionState.PROCESSING]:
        return {
            "session_id": session_id,
            "state": session.state,
            "demo_mode": True,
            "message": "Processing your video..."
        }
    
    # Get result
    result = db.query(VerificationResult).filter(
        VerificationResult.session_id == session_id
    ).first()
    
    if not result:
        return {
            "session_id": session_id,
            "state": session.state,
            "demo_mode": True
        }
    
    # Return PARTIAL results only (no frame timeline)
    return {
        "session_id": session_id,
        "state": session.state,
        "authenticity_score": result.authenticity_score,
        "risk_level": result.risk_level,
        "detection_flags": result.detection_flags,
        "demo_mode": True,
        "message": "Demo results - Sign up for full analysis including frame-by-frame timeline",
        "upgrade_url": "/signup"
    }

@router.get("/status/{session_id}")
async def demo_status(
    session_id: str,
    request: Request,
    db: Session = Depends(get_db)
):
    """Get demo session status"""
    
    session = db.query(VerificationSession).filter(
        VerificationSession.session_id == session_id,
        VerificationSession.tenant_id == "demo"
    ).first()
    
    if not session:
        raise HTTPException(status_code=404, detail="Demo session not found")
    
    return {
        "session_id": session_id,
        "state": session.state,
        "demo_mode": True,
        "updated_at": session.updated_at
    }
