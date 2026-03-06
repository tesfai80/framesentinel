from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from sqlalchemy import func
from src.config.database import get_db
from src.middleware.api_key_middleware import get_tenant_from_request
from src.models.database import UsageRecord, BillingAccount
from datetime import datetime, timedelta
from typing import Optional

router = APIRouter(prefix="/api/v1/usage", tags=["Usage"])

@router.get("/summary")
async def get_usage_summary(
    request: Request,
    days: Optional[int] = 30,
    db: Session = Depends(get_db)
):
    """Get usage summary for the tenant"""
    tenant_id = get_tenant_from_request(request)
    
    # Get billing info
    billing = db.query(BillingAccount).filter(
        BillingAccount.tenant_id == tenant_id
    ).first()
    
    if not billing:
        billing = BillingAccount(
            tenant_id=tenant_id,
            plan="free",
            credits_balance=100,
            credits_used=0
        )
        db.add(billing)
        db.commit()
    
    # Get usage for last N days
    since_date = datetime.utcnow() - timedelta(days=days)
    
    usage_records = db.query(UsageRecord).filter(
        UsageRecord.tenant_id == tenant_id,
        UsageRecord.timestamp >= since_date
    ).all()
    
    total_requests = len(usage_records)
    total_credits_used = sum(r.cost_credits for r in usage_records)
    avg_processing_time = sum(r.processing_time_ms for r in usage_records) / total_requests if total_requests > 0 else 0
    
    # Group by day
    daily_usage = {}
    for record in usage_records:
        day = record.timestamp.date().isoformat()
        if day not in daily_usage:
            daily_usage[day] = {"requests": 0, "credits": 0}
        daily_usage[day]["requests"] += 1
        daily_usage[day]["credits"] += record.cost_credits
    
    return {
        "tenant_id": tenant_id,
        "plan": billing.plan,
        "credits_balance": billing.credits_balance,
        "credits_used": billing.credits_used,
        "credits_remaining": billing.credits_balance - billing.credits_used,
        "period_days": days,
        "period_usage": {
            "total_requests": total_requests,
            "total_credits_used": total_credits_used,
            "avg_processing_time_ms": int(avg_processing_time)
        },
        "daily_usage": daily_usage
    }

@router.get("/history")
async def get_usage_history(
    request: Request,
    limit: Optional[int] = 100,
    db: Session = Depends(get_db)
):
    """Get detailed usage history"""
    tenant_id = get_tenant_from_request(request)
    
    records = db.query(UsageRecord).filter(
        UsageRecord.tenant_id == tenant_id
    ).order_by(
        UsageRecord.timestamp.desc()
    ).limit(limit).all()
    
    return [
        {
            "session_id": r.session_id,
            "api_key_id": r.api_key_id,
            "processing_time_ms": r.processing_time_ms,
            "cost_credits": r.cost_credits,
            "timestamp": r.timestamp
        }
        for r in records
    ]

@router.get("/credits")
async def get_credits(
    db: Session = Depends(get_db)
):
    """Get current credit balance - public endpoint for dashboard"""
    # For now, return default tenant credits
    # In production, get tenant_id from JWT token
    tenant_id = "default-tenant"
    
    billing = db.query(BillingAccount).filter(
        BillingAccount.tenant_id == tenant_id
    ).first()
    
    if not billing:
        billing = BillingAccount(
            tenant_id=tenant_id,
            plan="free",
            credits_balance=100,
            credits_used=0
        )
        db.add(billing)
        db.commit()
        db.refresh(billing)
    
    return {
        "tenant_id": tenant_id,
        "plan": billing.plan,
        "credits_balance": billing.credits_balance,
        "credits_used": billing.credits_used,
        "remaining_credits": billing.credits_balance - billing.credits_used
    }
