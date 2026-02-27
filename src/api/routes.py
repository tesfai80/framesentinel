from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from src.config.database import get_db
from src.api.auth import verify_api_key
from src.models.schemas import (
    SessionCreateRequest, SessionCreateResponse, UploadResponse, VerificationResponse
)
from src.models.database import VerificationSession, VerificationResult, SessionState
from src.services.video_processor import VideoProcessor
from src.config.settings import settings
import uuid
import os
import shutil

router = APIRouter(prefix="/api/v1", dependencies=[Depends(verify_api_key)])

@router.get("/sessions")
async def list_sessions(db: Session = Depends(get_db)):
    sessions = db.query(VerificationSession).order_by(
        VerificationSession.created_at.desc()
    ).limit(100).all()
    
    return [
        {
            "session_id": s.session_id,
            "user_id": s.user_id,
            "state": s.state,
            "created_at": s.created_at,
            "updated_at": s.updated_at
        }
        for s in sessions
    ]

@router.post("/sessions", response_model=SessionCreateResponse)
async def create_session(request: SessionCreateRequest, db: Session = Depends(get_db)):
    session_id = str(uuid.uuid4())
    session = VerificationSession(
        session_id=session_id,
        user_id=request.user_id,
        state=SessionState.CREATED,
        device_metadata=request.device_metadata
    )
    db.add(session)
    db.commit()
    db.refresh(session)
    
    return SessionCreateResponse(
        session_id=session.session_id,
        state=session.state,
        created_at=session.created_at
    )

@router.post("/sessions/{session_id}/upload", response_model=UploadResponse)
async def upload_video(
    session_id: str,
    background_tasks: BackgroundTasks,
    video: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    session = db.query(VerificationSession).filter(
        VerificationSession.session_id == session_id
    ).first()
    
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    if session.state != SessionState.CREATED:
        raise HTTPException(status_code=400, detail="Session already uploaded")
    
    file_ext = os.path.splitext(video.filename)[1]
    if file_ext not in settings.ALLOWED_FORMATS:
        raise HTTPException(status_code=400, detail="Invalid video format")
    
    os.makedirs(settings.STORAGE_PATH, exist_ok=True)
    video_path = os.path.join(settings.STORAGE_PATH, f"{session_id}{file_ext}")
    
    with open(video_path, "wb") as buffer:
        shutil.copyfileobj(video.file, buffer)
    
    session.video_path = video_path
    session.state = SessionState.UPLOADED
    db.commit()
    
    processor = VideoProcessor()
    background_tasks.add_task(processor.process_video, session_id, video_path, db)
    
    return UploadResponse(
        session_id=session_id,
        state=SessionState.UPLOADED,
        message="Video uploaded successfully, processing started"
    )

@router.get("/sessions/{session_id}/result", response_model=VerificationResponse)
async def get_result(session_id: str, db: Session = Depends(get_db)):
    session = db.query(VerificationSession).filter(
        VerificationSession.session_id == session_id
    ).first()
    
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    if session.state in [SessionState.CREATED, SessionState.UPLOADED, SessionState.PROCESSING]:
        return VerificationResponse(
            session_id=session_id,
            state=session.state
        )
    
    result = db.query(VerificationResult).filter(
        VerificationResult.session_id == session_id
    ).first()
    
    if not result:
        return VerificationResponse(
            session_id=session_id,
            state=session.state
        )
    
    from src.models.schemas import DetectionFlags, FrameEvent
    
    return VerificationResponse(
        session_id=session_id,
        state=session.state,
        authenticity_score=result.authenticity_score,
        risk_level=result.risk_level,
        detection_flags=DetectionFlags(**result.detection_flags),
        frame_timeline=[FrameEvent(**event) for event in result.frame_timeline],
        processed_at=result.processed_at
    )

@router.get("/sessions/{session_id}/status")
async def get_status(session_id: str, db: Session = Depends(get_db)):
    session = db.query(VerificationSession).filter(
        VerificationSession.session_id == session_id
    ).first()
    
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    return {
        "session_id": session_id,
        "state": session.state,
        "updated_at": session.updated_at
    }
