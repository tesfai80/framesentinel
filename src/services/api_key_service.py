import secrets
import hashlib
from datetime import datetime, timedelta
from typing import Optional
from sqlalchemy.orm import Session
from src.models.database import APIKey, BillingAccount
import uuid

class APIKeyService:
    """Production-ready API Key management service"""
    
    @staticmethod
    def generate_key() -> str:
        """Generate a secure API key: fs_live_xxxxx or fs_test_xxxxx"""
        random_part = secrets.token_urlsafe(32)
        return f"fs_live_{random_part}"
    
    @staticmethod
    def hash_key(api_key: str) -> str:
        """Hash API key for secure storage"""
        return hashlib.sha256(api_key.encode()).hexdigest()
    
    @staticmethod
    def get_key_prefix(api_key: str) -> str:
        """Get first 12 characters for display (fs_live_xxxx)"""
        return api_key[:12] + "..." if len(api_key) > 12 else api_key
    
    @staticmethod
    def create_api_key(
        db: Session,
        tenant_id: str,
        name: str,
        expires_in_days: Optional[int] = None
    ) -> tuple[APIKey, str]:
        """
        Create new API key for tenant
        Returns: (APIKey object, plain_text_key)
        """
        # Generate key
        plain_key = APIKeyService.generate_key()
        key_hash = APIKeyService.hash_key(plain_key)
        key_prefix = APIKeyService.get_key_prefix(plain_key)
        
        # Calculate expiration
        expires_at = None
        if expires_in_days:
            expires_at = datetime.utcnow() + timedelta(days=expires_in_days)
        
        # Create DB record
        api_key = APIKey(
            id=str(uuid.uuid4()),
            tenant_id=tenant_id,
            key_hash=key_hash,
            key_prefix=key_prefix,
            name=name,
            is_active=True,
            expires_at=expires_at
        )
        
        db.add(api_key)
        db.commit()
        db.refresh(api_key)
        
        return api_key, plain_key
    
    @staticmethod
    def validate_api_key(db: Session, api_key: str) -> Optional[APIKey]:
        """
        Validate API key and return APIKey object if valid
        Returns None if invalid/expired/inactive
        """
        key_hash = APIKeyService.hash_key(api_key)
        
        # Find key
        db_key = db.query(APIKey).filter(APIKey.key_hash == key_hash).first()
        
        if not db_key:
            return None
        
        # Check if active
        if not db_key.is_active:
            return None
        
        # Check expiration
        if db_key.expires_at and db_key.expires_at < datetime.utcnow():
            return None
        
        # Update last used
        db_key.last_used_at = datetime.utcnow()
        db.commit()
        
        return db_key
    
    @staticmethod
    def revoke_api_key(db: Session, key_id: str) -> bool:
        """Revoke (deactivate) an API key"""
        api_key = db.query(APIKey).filter(APIKey.id == key_id).first()
        if not api_key:
            return False
        
        api_key.is_active = False
        db.commit()
        return True
    
    @staticmethod
    def list_tenant_keys(db: Session, tenant_id: str) -> list[APIKey]:
        """List all API keys for a tenant"""
        return db.query(APIKey).filter(APIKey.tenant_id == tenant_id).all()
    
    @staticmethod
    def check_tenant_credits(db: Session, tenant_id: str) -> tuple[bool, int]:
        """
        Check if tenant has available credits
        Returns: (has_credits, remaining_credits)
        """
        billing = db.query(BillingAccount).filter(
            BillingAccount.tenant_id == tenant_id
        ).first()
        
        if not billing:
            # Create default free tier account
            billing = BillingAccount(
                tenant_id=tenant_id,
                plan="free",
                credits_balance=100,
                credits_used=0,
                is_active=True
            )
            db.add(billing)
            db.commit()
        
        remaining = billing.credits_balance - billing.credits_used
        has_credits = remaining > 0 and billing.is_active
        
        return has_credits, remaining
    
    @staticmethod
    def consume_credit(db: Session, tenant_id: str, credits: float = 1.0) -> bool:
        """
        Consume credits for API usage
        Returns True if successful, False if insufficient credits
        """
        billing = db.query(BillingAccount).filter(
            BillingAccount.tenant_id == tenant_id
        ).first()
        
        if not billing:
            return False
        
        remaining = billing.credits_balance - billing.credits_used
        if remaining < credits:
            return False
        
        billing.credits_used += credits
        db.commit()
        
        return True
