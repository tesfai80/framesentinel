from sqlalchemy.orm import Session
from src.models.database import TenantSettings
from typing import Dict, Optional

class TenantService:
    @staticmethod
    def get_settings(db: Session, tenant_id: str) -> Optional[TenantSettings]:
        return db.query(TenantSettings).filter(
            TenantSettings.tenant_id == tenant_id
        ).first()
    
    @staticmethod
    def create_default_settings(db: Session, tenant_id: str) -> TenantSettings:
        settings = TenantSettings(
            tenant_id=tenant_id,
            verified_threshold=0.75,
            suspicious_threshold=0.50,
            retention_days=30,
            max_video_size_mb=100,
            allowed_formats=['mp4', 'avi', 'mov', 'webm'],
            webhook_url=None,
            webhook_enabled=False,
            deepfake_threshold=0.70,
            replay_threshold=0.65,
            injection_threshold=0.60,
            face_swap_threshold=0.75
        )
        db.add(settings)
        db.commit()
        return settings
    
    @staticmethod
    def update_settings(db: Session, tenant_id: str, updates: Dict) -> TenantSettings:
        settings = TenantService.get_settings(db, tenant_id)
        if not settings:
            settings = TenantService.create_default_settings(db, tenant_id)
        
        for key, value in updates.items():
            if hasattr(settings, key):
                setattr(settings, key, value)
        
        db.commit()
        db.refresh(settings)
        return settings
    
    @staticmethod
    def get_risk_level(settings: TenantSettings, score: float) -> str:
        if score >= settings.verified_threshold:
            return 'VERIFIED'
        elif score >= settings.suspicious_threshold:
            return 'SUSPICIOUS'
        else:
            return 'HIGH_RISK'
