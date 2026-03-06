from fastapi import APIRouter, Depends, Request, HTTPException
from sqlalchemy.orm import Session
from src.config.database import get_db
from src.middleware.api_key_middleware import get_tenant_from_request
from src.services.billing_service import BillingService
from src.models.database import BillingAccount
from pydantic import BaseModel

router = APIRouter(prefix="/api/v1/billing", tags=["Billing"])

class CreateCheckoutRequest(BaseModel):
    plan: str
    success_url: str
    cancel_url: str

@router.get("/plans")
async def get_plans():
    """Get available billing plans"""
    return {
        "plans": [
            {
                "id": "free",
                "name": "Free Tier",
                "credits": 100,
                "price": 0,
                "features": [
                    "100 video verifications/month",
                    "Basic fraud detection",
                    "Email support"
                ]
            },
            {
                "id": "starter",
                "name": "Starter",
                "credits": 1000,
                "price": 99,
                "features": [
                    "1,000 video verifications/month",
                    "Advanced fraud detection",
                    "Priority email support",
                    "Webhook notifications"
                ]
            },
            {
                "id": "professional",
                "name": "Professional",
                "credits": 10000,
                "price": 499,
                "features": [
                    "10,000 video verifications/month",
                    "All detection modules",
                    "24/7 support",
                    "Custom thresholds",
                    "API access"
                ]
            },
            {
                "id": "enterprise",
                "name": "Enterprise",
                "credits": 100000,
                "price": 2999,
                "features": [
                    "100,000 video verifications/month",
                    "Dedicated infrastructure",
                    "Custom integration",
                    "SLA guarantee",
                    "Dedicated account manager"
                ]
            }
        ]
    }

@router.get("/account")
async def get_billing_account(
    request: Request,
    db: Session = Depends(get_db)
):
    """Get current billing account info"""
    tenant_id = get_tenant_from_request(request)
    
    billing = db.query(BillingAccount).filter(
        BillingAccount.tenant_id == tenant_id
    ).first()
    
    if not billing:
        return {
            "plan": "free",
            "credits_balance": 100,
            "credits_used": 0,
            "credits_remaining": 100
        }
    
    return {
        "plan": billing.plan,
        "credits_balance": billing.credits_balance,
        "credits_used": billing.credits_used,
        "credits_remaining": billing.credits_balance - billing.credits_used,
        "is_active": billing.is_active,
        "stripe_customer_id": billing.stripe_customer_id,
        "stripe_subscription_id": billing.stripe_subscription_id
    }

@router.post("/checkout")
async def create_checkout_session(
    request: Request,
    body: CreateCheckoutRequest,
    db: Session = Depends(get_db)
):
    """Create Stripe checkout session"""
    tenant_id = get_tenant_from_request(request)
    
    checkout_url = BillingService.create_checkout_session(
        tenant_id=tenant_id,
        plan=body.plan,
        success_url=body.success_url,
        cancel_url=body.cancel_url,
        db=db
    )
    
    if not checkout_url:
        raise HTTPException(status_code=400, detail="Failed to create checkout session")
    
    return {"checkout_url": checkout_url}

@router.post("/cancel-subscription")
async def cancel_subscription(
    request: Request,
    db: Session = Depends(get_db)
):
    """Cancel current subscription"""
    tenant_id = get_tenant_from_request(request)
    
    success = BillingService.cancel_subscription(tenant_id, db)
    
    if not success:
        raise HTTPException(status_code=400, detail="Failed to cancel subscription")
    
    return {"message": "Subscription cancelled successfully"}

@router.post("/webhook")
async def stripe_webhook(
    request: Request,
    db: Session = Depends(get_db)
):
    """Handle Stripe webhook events"""
    payload = await request.json()
    
    try:
        BillingService.handle_webhook(payload, db)
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
