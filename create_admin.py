"""
Create first admin user for FrameSentinel
"""
import bcrypt
import uuid
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

database_url = os.getenv('DATABASE_URL', 'sqlite:///./framesentinel.db')
engine = create_engine(database_url)
SessionLocal = sessionmaker(bind=engine)

def create_admin():
    from src.models.database import User, UserRole
    
    db = SessionLocal()
    
    email = input("Enter admin email: ")
    password = input("Enter admin password: ")
    
    existing = db.query(User).filter(User.email == email).first()
    if existing:
        print(f"❌ User with email {email} already exists")
        return
    
    password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    user = User(
        id=str(uuid.uuid4()),
        email=email,
        password_hash=password_hash,
        role=UserRole.ADMIN,
        tenant_id="default"
    )
    
    db.add(user)
    db.commit()
    
    print(f"✅ Admin user created successfully!")
    print(f"Email: {email}")
    print(f"Role: ADMIN")
    print(f"Tenant: default")
    
    db.close()

if __name__ == "__main__":
    create_admin()
