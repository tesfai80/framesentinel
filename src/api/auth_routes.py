from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from src.config.database import get_db
from src.models.database import User
from pydantic import BaseModel, EmailStr
import bcrypt
import jwt
from datetime import datetime, timedelta

router = APIRouter(prefix="/api/v1/auth")

SECRET_KEY = "your-secret-key-change-in-production"
ALGORITHM = "HS256"

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class LoginResponse(BaseModel):
    token: str
    user: dict

class CreateUserRequest(BaseModel):
    email: EmailStr
    password: str
    role: str = "VIEWER"
    tenant_id: str = "default"

@router.post("/login", response_model=LoginResponse)
async def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()
    
    if not user or not bcrypt.checkpw(request.password.encode('utf-8'), user.password_hash.encode('utf-8')):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    token = jwt.encode(
        {"user_id": user.id, "email": user.email, "exp": datetime.utcnow() + timedelta(days=7)},
        SECRET_KEY,
        algorithm=ALGORITHM
    )
    
    user.last_login = datetime.utcnow()
    db.commit()
    
    return LoginResponse(
        token=token,
        user={
            "id": user.id,
            "email": user.email,
            "role": user.role.value,
            "tenant_id": user.tenant_id
        }
    )

@router.post("/register")
async def register(request: CreateUserRequest, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == request.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    import uuid
    password_hash = bcrypt.hashpw(request.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    user = User(
        id=str(uuid.uuid4()),
        email=request.email,
        password_hash=password_hash,
        role=request.role,
        tenant_id=request.tenant_id
    )
    
    db.add(user)
    db.commit()
    
    return {"message": "User created successfully", "user_id": user.id}
