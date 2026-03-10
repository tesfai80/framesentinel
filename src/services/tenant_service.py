from sqlalchemy.orm import Session
from src.models.database import Tenant, User, BillingAccount
from datetime import datetime
import uuid
import hashlib

class TenantService:
    @staticmethod
    def create_tenant(db: Session, company_name: str, admin_email: str, admin_password: str, plan: str = "free"):
        tenant_id = str(uuid.uuid4())
        
        # Create tenant
        tenant = Tenant(
            id=tenant_id,
            company_name=company_name,
            status="trial",
            plan=plan
        )
        db.add(tenant)
        
        # Create admin user
        user = User(
            id=str(uuid.uuid4()),
            email=admin_email,
            password_hash=hashlib.sha256(admin_password.encode()).hexdigest(),
            role="ADMIN",
            tenant_id=tenant_id
        )
        db.add(user)
        
        # Create billing account
        credits = {"free": 200, "starter": 2000, "growth": 10000, "pro": 50000}.get(plan, 200)
        billing = BillingAccount(
            tenant_id=tenant_id,
            plan=plan,
            credits_balance=credits,
            billing_email=admin_email
        )
        db.add(billing)
        
        db.commit()
        db.refresh(tenant)
        return tenant
    
    @staticmethod
    def get_tenant(db: Session, tenant_id: str):
        return db.query(Tenant).filter(Tenant.id == tenant_id).first()
    
    @staticmethod
    def list_tenants(db: Session):
        return db.query(Tenant).all()
    
    @staticmethod
    def update_tenant(db: Session, tenant_id: str, **kwargs):
        tenant = db.query(Tenant).filter(Tenant.id == tenant_id).first()
        if not tenant:
            return None
        
        for key, value in kwargs.items():
            if hasattr(tenant, key):
                setattr(tenant, key, value)
        
        tenant.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(tenant)
        return tenant
    
    @staticmethod
    def delete_tenant(db: Session, tenant_id: str):
        tenant = db.query(Tenant).filter(Tenant.id == tenant_id).first()
        if tenant:
            db.delete(tenant)
            db.commit()
            return True
        return False
