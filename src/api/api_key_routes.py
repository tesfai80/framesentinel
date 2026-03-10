from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from src.config.database import get_db
from src.services.api_key_service import APIKeyService
from src.models.database import User, UserRole
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

router = APIRouter(prefix="/api/v1/api-keys", tags=["API Keys"])

class CreateAPIKeyRequest(BaseModel):
    name: str
    expires_in_days: Optional[int] = None

class APIKeyResponse(BaseModel):
    id: str
    name: str
    key_prefix: str
    is_active: bool
    created_at: datetime
    last_used_at: Optional[datetime]
    expires_at: Optional[datetime]

class CreateAPIKeyResponse(BaseModel):
    api_key: APIKeyResponse
    plain_key: str  # Only returned once!
    warning: str = "Save this key securely. It will not be shown again."

# Dependency to get current user - simplified for admin dashboard
def get_current_user(db: Session = Depends(get_db)) -> User:
    # For admin dashboard, use default tenant
    user = db.query(User).filter(User.tenant_id == "default").first()
    if not user:
        # Create a default admin user if none exists
        import bcrypt
        import uuid
        user = User(
            id=str(uuid.uuid4()),
            email="admin@framesentinel.com",
            password_hash=bcrypt.hashpw("admin".encode('utf-8'), bcrypt.gensalt()).decode('utf-8'),
            role=UserRole.ADMIN,
            tenant_id="default"
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    return user

@router.post("/", response_model=CreateAPIKeyResponse)
async def create_api_key(
    request: CreateAPIKeyRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Create a new API key for the authenticated user's tenant
    """
    try:
        api_key, plain_key = APIKeyService.create_api_key(
            db=db,
            tenant_id=current_user.tenant_id,
            name=request.name,
            expires_in_days=request.expires_in_days
        )
        
        return CreateAPIKeyResponse(
            api_key=APIKeyResponse(
                id=api_key.id,
                name=api_key.name,
                key_prefix=api_key.key_prefix,
                is_active=api_key.is_active,
                created_at=api_key.created_at,
                last_used_at=api_key.last_used_at,
                expires_at=api_key.expires_at
            ),
            plain_key=plain_key
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/", response_model=List[APIKeyResponse])
async def list_api_keys(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    List all API keys for the authenticated user's tenant
    """
    keys = APIKeyService.list_tenant_keys(db, current_user.tenant_id)
    
    return [
        APIKeyResponse(
            id=key.id,
            name=key.name,
            key_prefix=key.key_prefix,
            is_active=key.is_active,
            created_at=key.created_at,
            last_used_at=key.last_used_at,
            expires_at=key.expires_at
        )
        for key in keys
    ]

@router.delete("/{key_id}")
async def revoke_api_key(
    key_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Revoke (deactivate) an API key
    """
    success = APIKeyService.revoke_api_key(db, key_id)
    
    if not success:
        raise HTTPException(status_code=404, detail="API key not found")
    
    return {"message": "API key revoked successfully"}

@router.get("/usage")
async def get_usage_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get current usage and credits for tenant
    """
    has_credits, remaining = APIKeyService.check_tenant_credits(
        db, current_user.tenant_id
    )
    
    return {
        "tenant_id": current_user.tenant_id,
        "has_credits": has_credits,
        "credits_remaining": remaining
    }
