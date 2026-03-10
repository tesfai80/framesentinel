from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from sqlalchemy import func, and_
from datetime import datetime, timedelta
from src.config.database import get_db
from src.api.auth import verify_api_key
from src.middleware.api_key_middleware import get_tenant_from_request
from src.models.database import WebhookLog, AuditLog, TenantSettings, VerificationSession, VerificationResult, SessionState, RiskLevel, UsageRecord
from src.services.audit.audit_service import AuditService
from src.services.tenant.tenant_service import TenantService
from src.services.cache_service import cache_service
from typing import Optional

router = APIRouter(prefix="/api/v1", dependencies=[Depends(verify_api_key)])

# Admin stats endpoint
@router.get("/admin/stats")
async def get_admin_stats(request: Request, db: Session = Depends(get_db)):
    tenant_id = get_tenant_from_request(request) or "default"
    
    # Try cache first
    cache_key = f"stats:{tenant_id}"
    cached_data = cache_service.get(cache_key)
    if cached_data:
        return cached_data
    
    total_sessions = db.query(func.count(VerificationSession.session_id)).filter(
        VerificationSession.tenant_id == tenant_id
    ).scalar()
    completed_sessions = db.query(func.count(VerificationSession.session_id)).filter(
        and_(
            VerificationSession.state == SessionState.COMPLETED,
            VerificationSession.tenant_id == tenant_id
        )
    ).scalar()
    failed_sessions = db.query(func.count(VerificationSession.session_id)).filter(
        and_(
            VerificationSession.state == SessionState.FAILED,
            VerificationSession.tenant_id == tenant_id
        )
    ).scalar()
    processing_sessions = db.query(func.count(VerificationSession.session_id)).filter(
        and_(
            VerificationSession.state == SessionState.PROCESSING,
            VerificationSession.tenant_id == tenant_id
        )
    ).scalar()
    
    # Risk level distribution - join with sessions to filter by tenant
    verified_count = db.query(func.count(VerificationResult.session_id)).join(
        VerificationSession, VerificationResult.session_id == VerificationSession.session_id
    ).filter(
        and_(
            VerificationResult.risk_level == RiskLevel.VERIFIED,
            VerificationSession.tenant_id == tenant_id
        )
    ).scalar()
    suspicious_count = db.query(func.count(VerificationResult.session_id)).join(
        VerificationSession, VerificationResult.session_id == VerificationSession.session_id
    ).filter(
        and_(
            VerificationResult.risk_level == RiskLevel.SUSPICIOUS,
            VerificationSession.tenant_id == tenant_id
        )
    ).scalar()
    high_risk_count = db.query(func.count(VerificationResult.session_id)).join(
        VerificationSession, VerificationResult.session_id == VerificationSession.session_id
    ).filter(
        and_(
            VerificationResult.risk_level == RiskLevel.HIGH_RISK,
            VerificationSession.tenant_id == tenant_id
        )
    ).scalar()
    
    # Calculate average score and processing time for tenant
    avg_score = db.query(func.avg(VerificationResult.authenticity_score)).join(
        VerificationSession, VerificationResult.session_id == VerificationSession.session_id
    ).filter(VerificationSession.tenant_id == tenant_id).scalar() or 0
    
    avg_processing_time = db.query(func.avg(UsageRecord.processing_time_ms)).filter(
        UsageRecord.tenant_id == tenant_id
    ).scalar() or 0
    
    result = {
        "total_sessions": total_sessions,
        "completed_sessions": completed_sessions,
        "failed_sessions": failed_sessions,
        "processing_sessions": processing_sessions,
        "risk_distribution": {
            "verified": verified_count,
            "suspicious": suspicious_count,
            "high_risk": high_risk_count
        },
        "avg_score": float(avg_score),
        "processing_time_avg": float(avg_processing_time)
    }
    
    # Cache for 5 minutes
    cache_service.set(cache_key, result, ttl=300)
    return result

# Analyst activity stats
@router.get("/admin/analyst-activity")
async def get_analyst_activity(request: Request, db: Session = Depends(get_db)):
    tenant_id = get_tenant_from_request(request) or "default"
    
    # Try cache first
    cache_key = f"analyst_activity:{tenant_id}"
    cached_data = cache_service.get(cache_key)
    if cached_data:
        return cached_data
    
    today = datetime.utcnow().date()
    today_start = datetime.combine(today, datetime.min.time())
    
    # Reviews today - count completed sessions today for tenant
    reviews_today = db.query(func.count(VerificationSession.session_id)).filter(
        and_(
            VerificationSession.state == SessionState.COMPLETED,
            VerificationSession.updated_at >= today_start,
            VerificationSession.tenant_id == tenant_id
        )
    ).scalar() or 0
    
    # Approval rate (verified vs total completed) for tenant
    total_completed = db.query(func.count(VerificationResult.session_id)).join(
        VerificationSession, VerificationResult.session_id == VerificationSession.session_id
    ).filter(VerificationSession.tenant_id == tenant_id).scalar() or 1
    
    approved = db.query(func.count(VerificationResult.session_id)).join(
        VerificationSession, VerificationResult.session_id == VerificationSession.session_id
    ).filter(
        and_(
            VerificationResult.risk_level == RiskLevel.VERIFIED,
            VerificationSession.tenant_id == tenant_id
        )
    ).scalar() or 0
    
    approval_rate = (approved / total_completed * 100) if total_completed > 0 else 0
    
    # Escalations (high risk sessions today) for tenant
    escalations = db.query(func.count(VerificationResult.session_id)).join(
        VerificationSession, VerificationResult.session_id == VerificationSession.session_id
    ).filter(
        and_(
            VerificationResult.risk_level == RiskLevel.HIGH_RISK,
            VerificationResult.processed_at >= today_start,
            VerificationSession.tenant_id == tenant_id
        )
    ).scalar() or 0
    
    result = {
        "reviews_today": reviews_today,
        "approval_rate": round(approval_rate, 1),
        "escalations": escalations
    }
    
    # Cache for 1 minute
    cache_service.set(cache_key, result, ttl=60)
    return result

# Webhook stats
@router.get("/admin/webhook-stats")
async def get_webhook_stats(request: Request, db: Session = Depends(get_db)):
    tenant_id = get_tenant_from_request(request) or "default"
    
    # Try cache first
    cache_key = f"webhook_stats:{tenant_id}"
    cached_data = cache_service.get(cache_key)
    if cached_data:
        return cached_data
    
    # Join with sessions to filter by tenant
    total_webhooks = db.query(func.count(WebhookLog.id)).join(
        VerificationSession, WebhookLog.session_id == VerificationSession.session_id
    ).filter(VerificationSession.tenant_id == tenant_id).scalar() or 1
    
    failed_webhooks = db.query(func.count(WebhookLog.id)).join(
        VerificationSession, WebhookLog.session_id == VerificationSession.session_id
    ).filter(
        and_(
            WebhookLog.success == False,
            VerificationSession.tenant_id == tenant_id
        )
    ).scalar() or 0
    
    fail_rate = (failed_webhooks / total_webhooks * 100) if total_webhooks > 0 else 0
    
    result = {
        "total_webhooks": total_webhooks,
        "failed_webhooks": failed_webhooks,
        "fail_rate": round(fail_rate, 1)
    }
    
    # Cache for 2 minutes
    cache_service.set(cache_key, result, ttl=120)
    return result

# Admin sessions endpoint
@router.get("/admin/sessions")
async def get_admin_sessions(
    request: Request,
    limit: int = 100,
    offset: int = 0,
    state: Optional[str] = None,
    db: Session = Depends(get_db)
):
    tenant_id = get_tenant_from_request(request) or "default"
    query = db.query(VerificationSession).filter(VerificationSession.tenant_id == tenant_id)
    
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
    request: Request,
    session_id: Optional[str] = None,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    tenant_id = get_tenant_from_request(request) or "default"
    query = db.query(WebhookLog).join(
        VerificationSession, WebhookLog.session_id == VerificationSession.session_id
    ).filter(VerificationSession.tenant_id == tenant_id)
    
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
    request: Request,
    user_id: Optional[str] = None,
    action: Optional[str] = None,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    tenant_id = get_tenant_from_request(request) or "default"
    filters = {'tenant_id': tenant_id}
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
@router.options("/tenant/settings")
async def options_tenant_settings():
    return {}

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
