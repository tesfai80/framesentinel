import redis
import os
from typing import Optional, Any
from functools import wraps
from dotenv import load_dotenv

load_dotenv()

class CacheService:
    def __init__(self):
        redis_url = os.getenv('REDIS_URL')
        if not redis_url:
            self.enabled = False
            self.client = None
            return
            
        try:
            self.client = redis.from_url(
                redis_url, 
                decode_responses=True,
                socket_connect_timeout=5,
                socket_timeout=5,
                ssl_cert_reqs=None
            )
            self.client.ping()
            self.enabled = True
        except Exception as e:
            print(f"Warning: Redis not available: {str(e)}")
            self.enabled = False
            self.client = None
    
    def get(self, key: str) -> Optional[str]:
        if not self.enabled:
            return None
        try:
            return self.client.get(key)
        except Exception:
            return None
    
    def set(self, key: str, value: str, ttl: int = 300):
        if not self.enabled:
            return False
        try:
            self.client.setex(key, ttl, value)
            return True
        except Exception:
            return False
    
    def delete(self, key: str):
        if not self.enabled:
            return False
        try:
            self.client.delete(key)
            return True
        except Exception:
            return False

cache_service = CacheService()
