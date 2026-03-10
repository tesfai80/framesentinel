from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from src.config.database import get_db
from src.api.auth import verify_api_key
from src.middleware.api_key_middleware import get_tenant_from_request
from src.models.database import User, UserRole
from src.services.cache_service import cache_service
from pydantic import BaseModel
import bcrypt
import uuid

router = APIRouter(prefix="/api/v1/admin/users", dependencies=[Depends(verify_api_key)])

class CreateUserRequest(BaseModel):
    email: str
    password: str
    role: str = "VIEWER"
    tenant_id: str = "default"

@router.get("")
async def get_users(request: Request, db: Session = Depends(get_db)):
    tenant_id = get_tenant_from_request(request) or "default"
    
    # Try cache first
    cache_key = f"users:{tenant_id}"
    cached_data = cache_service.get(cache_key)
    if cached_data:
        return cached_data
    
    users = db.query(User).filter(User.tenant_id == tenant_id).all()
    result = [
        {
            "id": u.id,
            "email": u.email,
            "role": u.role.value,
            "tenant_id": u.tenant_id,
            "created_at": u.created_at,
            "last_login": u.last_login
        }
        for u in users
    ]
    
    # Cache for 2 minutes
    cache_service.set(cache_key, result, ttl=120)
    return result

@router.post("")
async def create_user(request: CreateUserRequest, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == request.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already exists")
    
    password_hash = bcrypt.hashpw(request.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    user = User(
        id=str(uuid.uuid4()),
        email=request.email,
        password_hash=password_hash,
        role=UserRole[request.role],
        tenant_id=request.tenant_id
    )
    
    db.add(user)
    db.commit()
    
    # Clear cache
    cache_service.delete(f"users:{request.tenant_id}")
    
    return {"message": "User created", "id": user.id}

@router.put("/{user_id}")
async def update_user(user_id: str, data: dict, request: Request, db: Session = Depends(get_db)):
    from src.services.audit.audit_service import AuditService
    
    tenant_id = get_tenant_from_request(request) or "default"
    user = db.query(User).filter(User.id == user_id, User.tenant_id == tenant_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    old_role = user.role.value if user.role else None
    
    if "email" in data:
        user.email = data["email"]
    if "role" in data:
        user.role = UserRole[data["role"]]
    if "password" in data and data["password"]:
        user.password_hash = bcrypt.hashpw(data["password"].encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    db.commit()
    
    # Clear cache
    cache_service.delete(f"users:{tenant_id}")
    
    # Log the role change
    if "role" in data and old_role != data["role"]:
        AuditService.log(
            db=db,
            user_id="admin",
            action="UPDATE_USER_ROLE",
            resource="user",
            resource_id=user_id,
            details={"old_role": old_role, "new_role": data["role"], "email": user.email},
            tenant_id=tenant_id
        )
    
    return {"message": "User updated"}

@router.delete("/{user_id}")
async def delete_user(user_id: str, request: Request, db: Session = Depends(get_db)):
    tenant_id = get_tenant_from_request(request) or "default"
    user = db.query(User).filter(User.id == user_id, User.tenant_id == tenant_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    db.delete(user)
    db.commit()
    
    # Clear cache
    cache_service.delete(f"users:{tenant_id}")
    
    return {"message": "User deleted"}
