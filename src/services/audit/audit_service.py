from datetime import datetime
from sqlalchemy.orm import Session
from src.models.database import AuditLog
from typing import Optional, Dict

class AuditService:
    @staticmethod
    def log(
        db: Session,
        user_id: str,
        action: str,
        resource: str,
        resource_id: Optional[str] = None,
        details: Optional[Dict] = None,
        ip_address: Optional[str] = None
    ):
        log = AuditLog(
            user_id=user_id,
            action=action,
            resource=resource,
            resource_id=resource_id,
            details=details or {},
            ip_address=ip_address,
            timestamp=datetime.utcnow()
        )
        db.add(log)
        db.commit()
        return log
    
    @staticmethod
    def get_logs(db: Session, filters: Dict = None, limit: int = 100):
        query = db.query(AuditLog)
        
        if filters:
            if 'user_id' in filters:
                query = query.filter(AuditLog.user_id == filters['user_id'])
            if 'action' in filters:
                query = query.filter(AuditLog.action == filters['action'])
            if 'resource' in filters:
                query = query.filter(AuditLog.resource == filters['resource'])
        
        return query.order_by(AuditLog.timestamp.desc()).limit(limit).all()
