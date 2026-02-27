from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from src.config.database import get_db
from src.api.auth import verify_api_key
from src.models.database import WebhookLog, AuditLog, TenantSettings, VerificationSession, VerificationResult, SessionState, RiskLevel
from src.services.audit.audit_service import AuditService
from src.services.tenant.tenant_service import TenantService
from typing import Optional

router = APIRouter(prefix="/api/v1", dependencies=[Depends(verify_api_key)])

# Admin stats endpoint
@router.get("/admin/stats")
async def get_admin_stats(db: Session = Depends(get_db)):
    total_sessions = db.query(func.count(VerificationSession.session_id)).scalar()
    completed_sessions = db.query(func.count(VerificationSession.session_id)).filter(
        VerificationSession.state == SessionState.COMPLETED
    ).scalar()
    failed_sessions = db.query(func.count(VerificationSession.session_id)).filter(
        VerificationSession.state == SessionState.FAILED
    ).scalar()
    processing_sessions = db.query(func.count(VerificationSession.session_id)).filter(
        VerificationSession.state == SessionState.PROCESSING
    ).scalar()
    
    # Risk level distribution
    verified_count = db.query(func.count(VerificationResult.session_id)).filter(
        VerificationResult.risk_level == RiskLevel.VERIFIED
    ).scalar()
    suspicious_count = db.query(func.count(VerificationResult.session_id)).filter(
        VerificationResult.risk_level == RiskLevel.SUSPICIOUS
    ).scalar()
    high_risk_count = db.query(func.count(VerificationResult.session_id)).filter(
        VerificationResult.risk_level == RiskLevel.HIGH_RISK
    ).scalar()
    
    return {
        "total_sessions": total_sessions,
        "completed_sessions": completed_sessions,
        "failed_sessions": failed_sessions,
        "processing_sessions": processing_sessions,
        "risk_distribution": {
            "verified": verified_count,
            "suspicious": suspicious_count,
            "high_risk": high_risk_count
        }
    }

# Admin sessions endpoint
@router.get("/admin/sessions")
async def get_admin_sessions(
    limit: int = 100,
    offset: int = 0,
    state: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(VerificationSession)
    
    if state:
        query = query.filter(VerificationSession.state == state)
    
    sessions = query.order_by(
        VerificationSession.created_at.desc()
    ).offset(offset).limit(limit).all()
    
    return [
        {
            "session_id": s.session_id,
            "user_id": s.user_id,
            "tenant_id": s.tenant_id,
            "state": s.state,
            "video_path": s.video_path,
            "device_metadata": s.device_metadata,
            "created_at": s.created_at,
            "updated_at": s.updated_at
        }
        for s in sessions
    ]

# Webhook endpoints
@router.get("/webhooks/logs")
async def get_webhook_logs(
    session_id: Optional[str] = None,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    query = db.query(WebhookLog)
    if session_id:
        query = query.filter(WebhookLog.session_id == session_id)
    logs = query.order_by(WebhookLog.created_at.desc()).limit(limit).all()
    
    return [
        {
            "id": log.id,
            "session_id": log.session_id,
            "url": log.url,
            "status_code": log.status_code,
            "retries": log.retries,
            "success": log.success,
            "attempt": log.retries,
            "delivered_at": log.delivered_at,
            "created_at": log.created_at
        }
        for log in logs
    ]

@router.post("/sessions/{session_id}/webhook/redeliver")
async def redeliver_webhook(session_id: str, db: Session = Depends(get_db)):
    from src.services.webhooks.webhook_service import WebhookService
    from src.models.database import VerificationResult
    
    result = db.query(VerificationResult).filter(
        VerificationResult.session_id == session_id
    ).first()
    
    if not result:
        raise HTTPException(status_code=404, detail="Result not found")
    
    settings = TenantService.get_settings(db, "default")
    if not settings or not settings.webhook_enabled or not settings.webhook_url:
        raise HTTPException(status_code=400, detail="Webhook not configured")
    
    webhook_service = WebhookService()
    success = webhook_service.redeliver(
        session_id,
        settings.webhook_url,
        {
            "session_id": session_id,
            "authenticity_score": result.authenticity_score,
            "risk_level": result.risk_level.value,
            "detection_flags": result.detection_flags
        },
        db
    )
    
    return {"success": success}

# Audit endpoints
@router.get("/audit/logs")
async def get_audit_logs(
    user_id: Optional[str] = None,
    action: Optional[str] = None,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    filters = {}
    if user_id:
        filters['user_id'] = user_id
    if action:
        filters['action'] = action
    
    logs = AuditService.get_logs(db, filters, limit)
    
    return [
        {
            "id": log.id,
            "user_id": log.user_id,
            "action": log.action,
            "resource": log.resource,
            "resource_type": log.resource,
            "resource_id": log.resource_id or "N/A",
            "details": log.details,
            "ip_address": log.ip_address,
            "timestamp": log.timestamp,
            "created_at": log.timestamp
        }
        for log in logs
    ]

# Tenant settings endpoints
@router.get("/tenant/settings")
async def get_tenant_settings(tenant_id: str = "default", db: Session = Depends(get_db)):
    settings = TenantService.get_settings(db, tenant_id)
    if not settings:
        settings = TenantService.create_default_settings(db, tenant_id)
    
    return {
        "tenant_id": settings.tenant_id,
        "verified_threshold": settings.verified_threshold,
        "suspicious_threshold": settings.suspicious_threshold,
        "retention_days": settings.retention_days,
        "max_video_size_mb": settings.max_video_size_mb,
        "allowed_formats": settings.allowed_formats,
        "webhook_url": settings.webhook_url,
        "webhook_enabled": settings.webhook_enabled,
        "deepfake_threshold": settings.deepfake_threshold,
        "replay_threshold": settings.replay_threshold,
        "injection_threshold": settings.injection_threshold,
        "face_swap_threshold": settings.face_swap_threshold
    }

@router.put("/tenant/settings")
async def update_tenant_settings(updates: dict, tenant_id: str = "default", db: Session = Depends(get_db)):
    settings = TenantService.update_settings(db, tenant_id, updates)
    
    AuditService.log(
        db=db,
        user_id="system",
        action="UPDATE_SETTINGS",
        resource="tenant_settings",
        resource_id=tenant_id,
        details=updates
    )
    
    return {
        "tenant_id": settings.tenant_id,
        "verified_threshold": settings.verified_threshold,
        "suspicious_threshold": settings.suspicious_threshold,
        "retention_days": settings.retention_days,
        "max_video_size_mb": settings.max_video_size_mb,
        "allowed_formats": settings.allowed_formats,
        "webhook_url": settings.webhook_url,
        "webhook_enabled": settings.webhook_enabled,
        "deepfake_threshold": settings.deepfake_threshold,
        "replay_threshold": settings.replay_threshold,
        "injection_threshold": settings.injection_threshold,
        "face_swap_threshold": settings.face_swap_threshold
    }

# Health check endpoint
@router.get("/health")
async def health_check(db: Session = Depends(get_db)):
    try:
        db.execute("SELECT 1")
        return {
            "status": "healthy",
            "database": "connected",
            "timestamp": "2024-01-01T00:00:00Z"
        }
    except Exception as e:
        raise HTTPException(status_code=503, detail="Service unhealthy")
