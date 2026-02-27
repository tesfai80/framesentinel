import httpx
from typing import Dict, Optional
from datetime import datetime
from sqlalchemy.orm import Session
from src.models.database import WebhookLog

class WebhookService:
    def __init__(self):
        self.max_retries = 3
        self.timeout = 10
    
    async def deliver(self, webhook_url: str, session_id: str, result: Dict, db: Session) -> bool:
        log = WebhookLog(
            session_id=session_id,
            url=webhook_url,
            payload=result,
            status_code=0,
            retries=0,
            success=False
        )
        
        for attempt in range(self.max_retries):
            try:
                async with httpx.AsyncClient(timeout=self.timeout) as client:
                    response = await client.post(webhook_url, json=result)
                    log.status_code = response.status_code
                    log.response = response.text[:1000]
                    
                    if 200 <= response.status_code < 300:
                        log.success = True
                        log.delivered_at = datetime.utcnow()
                        db.add(log)
                        db.commit()
                        return True
            except Exception as e:
                log.error = str(e)[:500]
            
            log.retries = attempt + 1
        
        db.add(log)
        db.commit()
        return False
    
    def redeliver(self, session_id: str, webhook_url: str, result: Dict, db: Session) -> bool:
        try:
            import requests
            response = requests.post(webhook_url, json=result, timeout=self.timeout)
            
            log = WebhookLog(
                session_id=session_id,
                url=webhook_url,
                payload=result,
                status_code=response.status_code,
                response=response.text[:1000],
                success=200 <= response.status_code < 300,
                delivered_at=datetime.utcnow() if 200 <= response.status_code < 300 else None,
                retries=1
            )
            db.add(log)
            db.commit()
            return log.success
        except Exception as e:
            return False
