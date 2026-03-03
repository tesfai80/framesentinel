from sqlalchemy import Column, String, Float, DateTime, JSON, Enum as SQLEnum, Integer, Boolean, Text
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
import enum

Base = declarative_base()

class SessionState(str, enum.Enum):
    CREATED = "CREATED"
    UPLOADED = "UPLOADED"
    PROCESSING = "PROCESSING"
    ANALYZED = "ANALYZED"
    COMPLETED = "COMPLETED"
    FAILED = "FAILED"

class RiskLevel(str, enum.Enum):
    VERIFIED = "VERIFIED"
    SUSPICIOUS = "SUSPICIOUS"
    HIGH_RISK = "HIGH_RISK"

class UserRole(str, enum.Enum):
    VIEWER = "VIEWER"
    ANALYST = "ANALYST"
    ADMIN = "ADMIN"

class VerificationSession(Base):
    __tablename__ = "verification_sessions"
    
    session_id = Column(String, primary_key=True)
    user_id = Column(String, nullable=False)
    tenant_id = Column(String, default="default")
    state = Column(SQLEnum(SessionState), default=SessionState.CREATED)
    video_path = Column(String)
    device_metadata = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class VerificationResult(Base):
    __tablename__ = "verification_results"
    
    session_id = Column(String, primary_key=True)
    authenticity_score = Column(Float)
    risk_level = Column(SQLEnum(RiskLevel))
    detection_flags = Column(JSON)
    frame_timeline = Column(JSON)
    processed_at = Column(DateTime, default=datetime.utcnow)

class User(Base):
    __tablename__ = "users"
    
    id = Column(String, primary_key=True)
    email = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)
    role = Column(SQLEnum(UserRole), default=UserRole.VIEWER)
    tenant_id = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    last_login = Column(DateTime)

class WebhookLog(Base):
    __tablename__ = "webhook_logs"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    session_id = Column(String, nullable=False)
    url = Column(String, nullable=False)
    payload = Column(JSON)
    status_code = Column(Integer)
    response = Column(Text)
    error = Column(Text)
    retries = Column(Integer, default=0)
    success = Column(Boolean, default=False)
    delivered_at = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)

class AuditLog(Base):
    __tablename__ = "audit_logs"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(String, nullable=False)
    action = Column(String, nullable=False)
    resource = Column(String, nullable=False)
    resource_id = Column(String)
    details = Column(JSON)
    ip_address = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)

class TenantSettings(Base):
    __tablename__ = "tenant_settings"
    
    tenant_id = Column(String, primary_key=True)
    verified_threshold = Column(Float, default=0.75)
    suspicious_threshold = Column(Float, default=0.50)
    retention_days = Column(Integer, default=30)
    max_video_size_mb = Column(Integer, default=100)
    allowed_formats = Column(JSON, default=['mp4', 'avi', 'mov', 'webm'])
    webhook_url = Column(String)
    webhook_enabled = Column(Boolean, default=False)
    deepfake_threshold = Column(Float, default=0.70)
    replay_threshold = Column(Float, default=0.65)
    injection_threshold = Column(Float, default=0.60)
    face_swap_threshold = Column(Float, default=0.75)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class APIKey(Base):
    __tablename__ = "api_keys"
    
    id = Column(String, primary_key=True)
    tenant_id = Column(String, nullable=False)
    key_hash = Column(String, nullable=False, unique=True)
    key_prefix = Column(String, nullable=False)  # First 8 chars for display
    name = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    last_used_at = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)
    expires_at = Column(DateTime)

class UsageRecord(Base):
    __tablename__ = "usage_records"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    tenant_id = Column(String, nullable=False)
    session_id = Column(String, nullable=False)
    api_key_id = Column(String, nullable=False)
    video_duration_seconds = Column(Float)
    processing_time_ms = Column(Integer)
    cost_credits = Column(Float, default=1.0)  # 1 credit per video
    timestamp = Column(DateTime, default=datetime.utcnow)

class BillingAccount(Base):
    __tablename__ = "billing_accounts"
    
    tenant_id = Column(String, primary_key=True)
    stripe_customer_id = Column(String, unique=True)
    stripe_subscription_id = Column(String)
    plan = Column(String, default="free")  # free, starter, professional, enterprise
    credits_balance = Column(Integer, default=100)  # Free tier: 100 videos
    credits_used = Column(Integer, default=0)
    billing_email = Column(String)
    is_active = Column(Boolean, default=True)
    trial_ends_at = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
