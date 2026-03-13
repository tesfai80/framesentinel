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
            "timestamp": datetime.utcnow().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=503, detail="Service unhealthy")

# System Health endpoint
@router.get("/admin/system-health")
async def get_system_health(request: Request, db: Session = Depends(get_db)):
    tenant_id = get_tenant_from_request(request) or "default"
    
    cache_key = f"system_health:{tenant_id}"
    cached_data = cache_service.get(cache_key)
    if cached_data:
        return cached_data
    
    # Check API status
    api_status = "operational"
    
    # Check processing queue
    processing_count = db.query(func.count(VerificationSession.session_id)).filter(
        and_(
            VerificationSession.state == SessionState.PROCESSING,
            VerificationSession.tenant_id == tenant_id
        )
    ).scalar() or 0
    queue_status = "normal" if processing_count < 10 else "busy"
    
    # Check webhook delivery
    recent_webhooks = db.query(func.count(WebhookLog.id)).join(
        VerificationSession, WebhookLog.session_id == VerificationSession.session_id
    ).filter(
        and_(
            WebhookLog.created_at >= datetime.utcnow() - timedelta(hours=1),
            VerificationSession.tenant_id == tenant_id
        )
    ).scalar() or 0
    
    failed_webhooks = db.query(func.count(WebhookLog.id)).join(
        VerificationSession, WebhookLog.session_id == VerificationSession.session_id
    ).filter(
        and_(
            WebhookLog.success == False,
            WebhookLog.created_at >= datetime.utcnow() - timedelta(hours=1),
            VerificationSession.tenant_id == tenant_id
        )
    ).scalar() or 0
    
    webhook_status = "healthy" if (failed_webhooks / max(recent_webhooks, 1)) < 0.1 else "degraded"
    
    result = {
        "api_status": api_status,
        "queue_status": queue_status,
        "webhook_status": webhook_status,
        "processing_queue_size": processing_count
    }
    
    cache_service.set(cache_key, result, ttl=60)
    return result

# API Usage endpoint
@router.get("/admin/api-usage")
async def get_api_usage(request: Request, db: Session = Depends(get_db)):
    tenant_id = get_tenant_from_request(request) or "default"
    
    cache_key = f"api_usage:{tenant_id}"
    cached_data = cache_service.get(cache_key)
    if cached_data:
        return cached_data
    
    today = datetime.utcnow().date()
    today_start = datetime.combine(today, datetime.min.time())
    yesterday_start = today_start - timedelta(days=1)
    
    # Requests today
    requests_today = db.query(func.count(UsageRecord.id)).filter(
        and_(
            UsageRecord.timestamp >= today_start,
            UsageRecord.tenant_id == tenant_id
        )
    ).scalar() or 0
    
    # Requests yesterday
    requests_yesterday = db.query(func.count(UsageRecord.id)).filter(
        and_(
            UsageRecord.timestamp >= yesterday_start,
            UsageRecord.timestamp < today_start,
            UsageRecord.tenant_id == tenant_id
        )
    ).scalar() or 1
    
    # Calculate percentage change
    change_percent = ((requests_today - requests_yesterday) / requests_yesterday * 100) if requests_yesterday > 0 else 0
    
    # Success rate
    total_requests = db.query(func.count(VerificationSession.session_id)).filter(
        and_(
            VerificationSession.created_at >= today_start,
            VerificationSession.tenant_id == tenant_id
        )
    ).scalar() or 1
    
    failed_requests = db.query(func.count(VerificationSession.session_id)).filter(
        and_(
            VerificationSession.state == SessionState.FAILED,
            VerificationSession.created_at >= today_start,
            VerificationSession.tenant_id == tenant_id
        )
    ).scalar() or 0
    
    success_rate = ((total_requests - failed_requests) / total_requests * 100) if total_requests > 0 else 100
    
    # Average response time
    avg_response_time = db.query(func.avg(UsageRecord.processing_time_ms)).filter(
        and_(
            UsageRecord.timestamp >= today_start,
            UsageRecord.tenant_id == tenant_id
        )
    ).scalar() or 0
    
    avg_response_time_seconds = float(avg_response_time) / 1000 if avg_response_time else 0
    
    result = {
        "requests_today": requests_today,
        "change_percent": round(change_percent, 1),
        "success_rate": round(success_rate, 1),
        "failed_requests": failed_requests,
        "avg_response_time": round(avg_response_time_seconds, 2)
    }
    
    cache_service.set(cache_key, result, ttl=60)
    return result

# Model Performance endpoint
@router.get("/admin/model-performance")
async def get_model_performance(request: Request, db: Session = Depends(get_db)):
    tenant_id = get_tenant_from_request(request) or "default"
    
    cache_key = f"model_performance:{tenant_id}"
    cached_data = cache_service.get(cache_key)
    if cached_data:
        return cached_data
    
    # Get all completed results for tenant
    results = db.query(VerificationResult).join(
        VerificationSession, VerificationResult.session_id == VerificationSession.session_id
    ).filter(VerificationSession.tenant_id == tenant_id).all()
    
    if not results:
        return {
            "deepfake_accuracy": 0,
            "replay_accuracy": 0,
            "false_positive_rate": 0
        }
    
    # Calculate detection accuracy (simplified)
    total = len(results)
    deepfake_detected = sum(1 for r in results if r.detection_flags.get('deepfake_detected', False))
    replay_detected = sum(1 for r in results if r.detection_flags.get('replay_detected', False))
    
    # False positive rate (verified sessions with any detection flag)
    verified_with_flags = sum(
        1 for r in results 
        if r.risk_level == RiskLevel.VERIFIED and any(r.detection_flags.values())
    )
    false_positive_rate = (verified_with_flags / total * 100) if total > 0 else 0
    
    result = {
        "deepfake_accuracy": round((deepfake_detected / total * 100) if total > 0 else 0, 1),
        "replay_accuracy": round((replay_detected / total * 100) if total > 0 else 0, 1),
        "false_positive_rate": round(false_positive_rate, 1)
    }
    
    cache_service.set(cache_key, result, ttl=300)
    return result

# Detection Activity endpoint
@router.get("/admin/detection-activity")
async def get_detection_activity(request: Request, time_range: str = "24h", db: Session = Depends(get_db)):
    tenant_id = get_tenant_from_request(request) or "default"
    
    cache_key = f"detection_activity:{tenant_id}:{time_range}"
    cached_data = cache_service.get(cache_key)
    if cached_data:
        return cached_data
    
    # Calculate time range
    if time_range == "24h":
        start_time = datetime.utcnow() - timedelta(hours=24)
    elif time_range == "7d":
        start_time = datetime.utcnow() - timedelta(days=7)
    else:
        start_time = datetime.utcnow() - timedelta(days=30)
    
    # Get detection counts by type
    results = db.query(VerificationResult).join(
        VerificationSession, VerificationResult.session_id == VerificationSession.session_id
    ).filter(
        and_(
            VerificationResult.processed_at >= start_time,
            VerificationSession.tenant_id == tenant_id
        )
    ).all()
    
    deepfake_count = sum(1 for r in results if r.detection_flags.get('deepfake_detected', False))
    replay_count = sum(1 for r in results if r.detection_flags.get('replay_detected', False))
    injection_count = sum(1 for r in results if r.detection_flags.get('injection_detected', False))
    face_swap_count = sum(1 for r in results if r.detection_flags.get('face_swap_detected', False))
    
    result = {
        "deepfake": deepfake_count,
        "replay": replay_count,
        "injection": injection_count,
        "face_swap": face_swap_count,
        "total": len(results)
    }
    
    cache_service.set(cache_key, result, ttl=300)
    return result

# Trends endpoint
@router.get("/admin/trends")
async def get_trends(request: Request, time_range: str = "24h", db: Session = Depends(get_db)):
    tenant_id = get_tenant_from_request(request) or "default"
    
    cache_key = f"trends:{tenant_id}:{time_range}"
    cached_data = cache_service.get(cache_key)
    if cached_data:
        return cached_data
    
    # Calculate time ranges
    now = datetime.utcnow()
    if time_range == "24h":
        current_start = now - timedelta(hours=24)
        previous_start = now - timedelta(hours=48)
    elif time_range == "7d":
        current_start = now - timedelta(days=7)
        previous_start = now - timedelta(days=14)
    else:
        current_start = now - timedelta(days=30)
        previous_start = now - timedelta(days=60)
    
    # Current period stats
    current_verified = db.query(func.count(VerificationResult.session_id)).join(
        VerificationSession, VerificationResult.session_id == VerificationSession.session_id
    ).filter(
        and_(
            VerificationResult.risk_level == RiskLevel.VERIFIED,
            VerificationResult.processed_at >= current_start,
            VerificationSession.tenant_id == tenant_id
        )
    ).scalar() or 0
    
    current_suspicious = db.query(func.count(VerificationResult.session_id)).join(
        VerificationSession, VerificationResult.session_id == VerificationSession.session_id
    ).filter(
        and_(
            VerificationResult.risk_level == RiskLevel.SUSPICIOUS,
            VerificationResult.processed_at >= current_start,
            VerificationSession.tenant_id == tenant_id
        )
    ).scalar() or 0
    
    current_high_risk = db.query(func.count(VerificationResult.session_id)).join(
        VerificationSession, VerificationResult.session_id == VerificationSession.session_id
    ).filter(
        and_(
            VerificationResult.risk_level == RiskLevel.HIGH_RISK,
            VerificationResult.processed_at >= current_start,
            VerificationSession.tenant_id == tenant_id
        )
    ).scalar() or 0
    
    # Previous period stats
    previous_verified = db.query(func.count(VerificationResult.session_id)).join(
        VerificationSession, VerificationResult.session_id == VerificationSession.session_id
    ).filter(
        and_(
            VerificationResult.risk_level == RiskLevel.VERIFIED,
            VerificationResult.processed_at >= previous_start,
            VerificationResult.processed_at < current_start,
            VerificationSession.tenant_id == tenant_id
        )
    ).scalar() or 1
    
    previous_suspicious = db.query(func.count(VerificationResult.session_id)).join(
        VerificationSession, VerificationResult.session_id == VerificationSession.session_id
    ).filter(
        and_(
            VerificationResult.risk_level == RiskLevel.SUSPICIOUS,
            VerificationResult.processed_at >= previous_start,
            VerificationResult.processed_at < current_start,
            VerificationSession.tenant_id == tenant_id
        )
    ).scalar() or 1
    
    previous_high_risk = db.query(func.count(VerificationResult.session_id)).join(
        VerificationSession, VerificationResult.session_id == VerificationSession.session_id
    ).filter(
        and_(
            VerificationResult.risk_level == RiskLevel.HIGH_RISK,
            VerificationResult.processed_at >= previous_start,
            VerificationResult.processed_at < current_start,
            VerificationSession.tenant_id == tenant_id
        )
    ).scalar() or 1
    
    # Calculate trends
    verified_trend = ((current_verified - previous_verified) / previous_verified * 100) if previous_verified > 0 else 0
    suspicious_trend = ((current_suspicious - previous_suspicious) / previous_suspicious * 100) if previous_suspicious > 0 else 0
    high_risk_trend = ((current_high_risk - previous_high_risk) / previous_high_risk * 100) if previous_high_risk > 0 else 0
    
    result = {
        "verified_trend": round(verified_trend, 1),
        "suspicious_trend": round(suspicious_trend, 1),
        "high_risk_trend": round(high_risk_trend, 1),
        "verified_count": current_verified,
        "suspicious_count": current_suspicious,
        "high_risk_count": current_high_risk
    }
    
    cache_service.set(cache_key, result, ttl=300)
    return result

# Analytics endpoint
@router.get("/admin/analytics")
async def get_analytics(request: Request, time_range: str = "7d", db: Session = Depends(get_db)):
    tenant_id = get_tenant_from_request(request) or "default"
    
    cache_key = f"analytics:{tenant_id}:{time_range}"
    cached_data = cache_service.get(cache_key)
    if cached_data:
        return cached_data
    
    # Calculate time range
    if time_range == "24h":
        start_time = datetime.utcnow() - timedelta(hours=24)
    elif time_range == "7d":
        start_time = datetime.utcnow() - timedelta(days=7)
    elif time_range == "30d":
        start_time = datetime.utcnow() - timedelta(days=30)
    else:
        start_time = datetime.utcnow() - timedelta(days=90)
    
    # Get all results in time range
    results = db.query(VerificationResult).join(
        VerificationSession, VerificationResult.session_id == VerificationSession.session_id
    ).filter(
        and_(
            VerificationResult.processed_at >= start_time,
            VerificationSession.tenant_id == tenant_id
        )
    ).all()
    
    total_sessions = len(results)
    if total_sessions == 0:
        return {
            "fraud_rate": 0,
            "fraud_rate_change": 0,
            "detection_breakdown": {"deepfake": 0, "replay": 0, "injection": 0, "face_swap": 0},
            "false_positive_rate": 0,
            "false_positive_change": 0,
            "manual_review_rate": 0,
            "manual_review_change": 0,
            "total_sessions": 0,
            "fraud_detected": 0,
            "auto_approved": 0,
            "manual_reviews": 0
        }
    
    # Calculate fraud rate
    fraud_detected = sum(1 for r in results if r.risk_level == RiskLevel.HIGH_RISK)
    fraud_rate = (fraud_detected / total_sessions * 100) if total_sessions > 0 else 0
    
    # Detection breakdown
    deepfake_count = sum(1 for r in results if r.detection_flags.get('deepfake_detected', False))
    replay_count = sum(1 for r in results if r.detection_flags.get('replay_detected', False))
    injection_count = sum(1 for r in results if r.detection_flags.get('injection_detected', False))
    face_swap_count = sum(1 for r in results if r.detection_flags.get('face_swap_detected', False))
    
    # False positive rate
    verified_with_flags = sum(
        1 for r in results 
        if r.risk_level == RiskLevel.VERIFIED and any(r.detection_flags.values())
    )
    false_positive_rate = (verified_with_flags / total_sessions * 100) if total_sessions > 0 else 0
    
    # Manual review rate (suspicious)
    manual_reviews = sum(1 for r in results if r.risk_level == RiskLevel.SUSPICIOUS)
    manual_review_rate = (manual_reviews / total_sessions * 100) if total_sessions > 0 else 0
    
    # Auto approved (verified)
    auto_approved = sum(1 for r in results if r.risk_level == RiskLevel.VERIFIED)
    
    result = {
        "fraud_rate": round(fraud_rate, 1),
        "fraud_rate_change": 0,  # Would need historical comparison
        "detection_breakdown": {
            "deepfake": deepfake_count,
            "replay": replay_count,
            "injection": injection_count,
            "face_swap": face_swap_count
        },
        "false_positive_rate": round(false_positive_rate, 1),
        "false_positive_change": 0,  # Would need historical comparison
        "manual_review_rate": round(manual_review_rate, 1),
        "manual_review_change": 0,  # Would need historical comparison
        "total_sessions": total_sessions,
        "fraud_detected": fraud_detected,
        "auto_approved": auto_approved,
        "manual_reviews": manual_reviews
    }
    
    cache_service.set(cache_key, result, ttl=300)
    return result


# Detection Trend endpoint (7 days breakdown)
@router.get("/admin/detection-trend")
async def get_detection_trend(request: Request, days: int = 7, db: Session = Depends(get_db)):
    tenant_id = get_tenant_from_request(request) or "default"
    
    cache_key = f"detection_trend:{tenant_id}:{days}"
    cached_data = cache_service.get(cache_key)
    if cached_data:
        return cached_data
    
    trend_data = []
    now = datetime.utcnow()
    
    for i in range(days - 1, -1, -1):
        day_start = (now - timedelta(days=i)).replace(hour=0, minute=0, second=0, microsecond=0)
        day_end = day_start + timedelta(days=1)
        
        # Get results for this day
        results = db.query(VerificationResult).join(
            VerificationSession, VerificationResult.session_id == VerificationSession.session_id
        ).filter(
            and_(
                VerificationResult.processed_at >= day_start,
                VerificationResult.processed_at < day_end,
                VerificationSession.tenant_id == tenant_id
            )
        ).all()
        
        deepfake_count = sum(1 for r in results if r.detection_flags.get('deepfake_detected', False))
        replay_count = sum(1 for r in results if r.detection_flags.get('replay_detected', False))
        injection_count = sum(1 for r in results if r.detection_flags.get('injection_detected', False))
        face_swap_count = sum(1 for r in results if r.detection_flags.get('face_swap_detected', False))
        
        trend_data.append({
            "date": day_start.strftime("%b %d"),
            "deepfake": deepfake_count,
            "replay": replay_count,
            "injection": injection_count,
            "face_swap": face_swap_count
        })
    
    cache_service.set(cache_key, trend_data, ttl=300)
    return trend_data

# Recent Security Events endpoint
@router.get("/admin/security-events")
async def get_security_events(request: Request, limit: int = 5, db: Session = Depends(get_db)):
    tenant_id = get_tenant_from_request(request) or "default"
    
    cache_key = f"security_events:{tenant_id}:{limit}"
    cached_data = cache_service.get(cache_key)
    if cached_data:
        return cached_data
    
    # Get recent audit logs
    events = db.query(AuditLog).filter(
        AuditLog.tenant_id == tenant_id
    ).order_by(AuditLog.timestamp.desc()).limit(limit).all()
    
    result = [
        {
            "event": log.action.replace('_', ' ').title(),
            "time": _format_time_ago(log.timestamp),
            "type": log.action,
            "user": log.user_id
        }
        for log in events
    ]
    
    cache_service.set(cache_key, result, ttl=60)
    return result

def _format_time_ago(timestamp: datetime) -> str:
    """Format timestamp as 'X min/hours/days ago'"""
    now = datetime.utcnow()
    diff = now - timestamp
    
    if diff.total_seconds() < 60:
        return "Just now"
    elif diff.total_seconds() < 3600:
        minutes = int(diff.total_seconds() / 60)
        return f"{minutes} min ago"
    elif diff.total_seconds() < 86400:
        hours = int(diff.total_seconds() / 3600)
        return f"{hours} hour{'s' if hours > 1 else ''} ago"
    else:
        days = int(diff.total_seconds() / 86400)
        return f"{days} day{'s' if days > 1 else ''} ago"
