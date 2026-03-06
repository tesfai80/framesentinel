import stripe
import os
from sqlalchemy.orm import Session
from src.models.database import BillingAccount
from typing import Optional

# Initialize Stripe
stripe.api_key = os.getenv("STRIPE_SECRET_KEY", "")

class BillingService:
    """Production-ready Stripe billing integration"""
    
    PLANS = {
        "free": {
            "name": "Free Tier",
            "credits": 100,
            "price": 0,
            "stripe_price_id": None
        },
        "starter": {
            "name": "Starter",
            "credits": 1000,
            "price": 99,
            "stripe_price_id": os.getenv("STRIPE_STARTER_PRICE_ID", "")
        },
        "professional": {
            "name": "Professional",
            "credits": 10000,
            "price": 499,
            "stripe_price_id": os.getenv("STRIPE_PRO_PRICE_ID", "")
        },
        "enterprise": {
            "name": "Enterprise",
            "credits": 100000,
            "price": 2999,
            "stripe_price_id": os.getenv("STRIPE_ENTERPRISE_PRICE_ID", "")
        }
    }
    
    @staticmethod
    def create_customer(email: str, tenant_id: str, db: Session) -> str:
        """Create Stripe customer"""
        try:
            customer = stripe.Customer.create(
                email=email,
                metadata={"tenant_id": tenant_id}
            )
            
            # Update billing account
            billing = db.query(BillingAccount).filter(
                BillingAccount.tenant_id == tenant_id
            ).first()
            
            if billing:
                billing.stripe_customer_id = customer.id
                billing.billing_email = email
                db.commit()
            
            return customer.id
        except Exception as e:
            print(f"Stripe customer creation failed: {e}")
            return None
    
    @staticmethod
    def create_subscription(
        tenant_id: str,
        plan: str,
        db: Session
    ) -> Optional[dict]:
        """Create Stripe subscription"""
        if plan not in BillingService.PLANS:
            return None
        
        plan_info = BillingService.PLANS[plan]
        
        if not plan_info["stripe_price_id"]:
            return None
        
        billing = db.query(BillingAccount).filter(
            BillingAccount.tenant_id == tenant_id
        ).first()
        
        if not billing or not billing.stripe_customer_id:
            return None
        
        try:
            subscription = stripe.Subscription.create(
                customer=billing.stripe_customer_id,
                items=[{"price": plan_info["stripe_price_id"]}],
                metadata={"tenant_id": tenant_id}
            )
            
            # Update billing account
            billing.stripe_subscription_id = subscription.id
            billing.plan = plan
            billing.credits_balance = plan_info["credits"]
            billing.credits_used = 0
            db.commit()
            
            return {
                "subscription_id": subscription.id,
                "status": subscription.status,
                "plan": plan
            }
        except Exception as e:
            print(f"Stripe subscription creation failed: {e}")
            return None
    
    @staticmethod
    def cancel_subscription(tenant_id: str, db: Session) -> bool:
        """Cancel Stripe subscription"""
        billing = db.query(BillingAccount).filter(
            BillingAccount.tenant_id == tenant_id
        ).first()
        
        if not billing or not billing.stripe_subscription_id:
            return False
        
        try:
            stripe.Subscription.delete(billing.stripe_subscription_id)
            
            # Downgrade to free
            billing.stripe_subscription_id = None
            billing.plan = "free"
            billing.credits_balance = 100
            billing.credits_used = 0
            db.commit()
            
            return True
        except Exception as e:
            print(f"Stripe subscription cancellation failed: {e}")
            return False
    
    @staticmethod
    def create_checkout_session(
        tenant_id: str,
        plan: str,
        success_url: str,
        cancel_url: str,
        db: Session
    ) -> Optional[str]:
        """Create Stripe Checkout session"""
        if plan not in BillingService.PLANS:
            return None
        
        plan_info = BillingService.PLANS[plan]
        
        if not plan_info["stripe_price_id"]:
            return None
        
        billing = db.query(BillingAccount).filter(
            BillingAccount.tenant_id == tenant_id
        ).first()
        
        if not billing:
            return None
        
        try:
            session = stripe.checkout.Session.create(
                customer=billing.stripe_customer_id,
                payment_method_types=["card"],
                line_items=[{
                    "price": plan_info["stripe_price_id"],
                    "quantity": 1
                }],
                mode="subscription",
                success_url=success_url,
                cancel_url=cancel_url,
                metadata={"tenant_id": tenant_id, "plan": plan}
            )
            
            return session.url
        except Exception as e:
            print(f"Stripe checkout session creation failed: {e}")
            return None
    
    @staticmethod
    def handle_webhook(payload: dict, db: Session):
        """Handle Stripe webhook events"""
        event_type = payload.get("type")
        
        if event_type == "customer.subscription.created":
            subscription = payload["data"]["object"]
            tenant_id = subscription["metadata"].get("tenant_id")
            
            if tenant_id:
                billing = db.query(BillingAccount).filter(
                    BillingAccount.tenant_id == tenant_id
                ).first()
                
                if billing:
                    billing.stripe_subscription_id = subscription["id"]
                    billing.is_active = True
                    db.commit()
        
        elif event_type == "customer.subscription.deleted":
            subscription = payload["data"]["object"]
            tenant_id = subscription["metadata"].get("tenant_id")
            
            if tenant_id:
                billing = db.query(BillingAccount).filter(
                    BillingAccount.tenant_id == tenant_id
                ).first()
                
                if billing:
                    billing.stripe_subscription_id = None
                    billing.plan = "free"
                    billing.credits_balance = 100
                    billing.credits_used = 0
                    billing.is_active = True
                    db.commit()
        
        elif event_type == "invoice.payment_succeeded":
            invoice = payload["data"]["object"]
            customer_id = invoice["customer"]
            
            billing = db.query(BillingAccount).filter(
                BillingAccount.stripe_customer_id == customer_id
            ).first()
            
            if billing:
                # Reset credits for the new billing period
                plan_info = BillingService.PLANS.get(billing.plan, BillingService.PLANS["free"])
                billing.credits_balance = plan_info["credits"]
                billing.credits_used = 0
                db.commit()
