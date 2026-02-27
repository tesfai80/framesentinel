from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.config.database import get_db
from src.models.database import User, UserRole
from pydantic import BaseModel
import bcrypt
import uuid

router = APIRouter(prefix="/api/v1/admin/users")

class CreateUserRequest(BaseModel):
    email: str
    password: str
    role: str = "VIEWER"
    tenant_id: str = "default"

@router.get("")
async def get_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return [
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
    
    return {"message": "User created", "id": user.id}

@router.put("/{user_id}")
async def update_user(user_id: str, data: dict, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if "email" in data:
        user.email = data["email"]
    if "role" in data:
        user.role = UserRole[data["role"]]
    if "password" in data and data["password"]:
        user.password_hash = bcrypt.hashpw(data["password"].encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    db.commit()
    return {"message": "User updated"}

@router.delete("/{user_id}")
async def delete_user(user_id: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    db.delete(user)
    db.commit()
    return {"message": "User deleted"}
