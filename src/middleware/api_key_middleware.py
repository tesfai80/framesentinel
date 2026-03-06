from fastapi import Request, HTTPException, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from src.config.database import SessionLocal
from src.services.api_key_service import APIKeyService
from src.models.database import UsageRecord
from datetime import datetime
import time
import uuid

class APIKeyMiddleware:
    """
    Middleware for API Key authentication and usage tracking
    """
    
    def __init__(self, app):
        self.app = app
    
    async def __call__(self, scope, receive, send):
        if scope["type"] != "http":
            await self.app(scope, receive, send)
            return
        
        request = Request(scope, receive)
        
        # Skip auth for public endpoints
        public_paths = [
            "/",
            "/health",
            "/docs",
            "/redoc",
            "/openapi.json",
            "/api/v1/auth/login",
            "/api/v1/auth/register",
            "/api/v1/usage/credits",
        ]
        
        if any(request.url.path.startswith(path) for path in public_paths):
            await self.app(scope, receive, send)
            return
        
        # Check for API key in header
        api_key = request.headers.get("X-API-Key")
        
        if not api_key:
            response = JSONResponse(
                status_code=status.HTTP_401_UNAUTHORIZED,
                content={"detail": "API key required. Include X-API-Key header."}
            )
            await response(scope, receive, send)
            return
        
        # Validate API key
        db = SessionLocal()
        try:
            db_key = APIKeyService.validate_api_key(db, api_key)
            
            if not db_key:
                response = JSONResponse(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    content={"detail": "Invalid or expired API key"}
                )
                await response(scope, receive, send)
                return
            
            # Check credits
            has_credits, remaining = APIKeyService.check_tenant_credits(db, db_key.tenant_id)
            
            if not has_credits:
                response = JSONResponse(
                    status_code=status.HTTP_402_PAYMENT_REQUIRED,
                    content={
                        "detail": "Insufficient credits. Please upgrade your plan.",
                        "credits_remaining": remaining
                    }
                )
                await response(scope, receive, send)
                return
            
            # Add tenant_id and api_key_id to request state
            scope["state"] = {
                "tenant_id": db_key.tenant_id,
                "api_key_id": db_key.id,
                "credits_remaining": remaining
            }
            
            # Track request start time
            start_time = time.time()
            
            # Process request
            await self.app(scope, receive, send)
            
            # Track usage (only for session creation endpoints)
            if request.url.path.startswith("/api/v1/sessions") and request.method == "POST":
                processing_time = int((time.time() - start_time) * 1000)
                
                # Record usage
                usage = UsageRecord(
                    tenant_id=db_key.tenant_id,
                    session_id=str(uuid.uuid4()),  # Will be updated with actual session_id
                    api_key_id=db_key.id,
                    processing_time_ms=processing_time,
                    cost_credits=1.0
                )
                db.add(usage)
                
                # Consume credit
                APIKeyService.consume_credit(db, db_key.tenant_id, 1.0)
                
                db.commit()
        
        except Exception as e:
            print(f"Middleware error: {e}")
            response = JSONResponse(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                content={"detail": "Internal server error"}
            )
            await response(scope, receive, send)
        finally:
            db.close()


def get_tenant_from_request(request: Request) -> str:
    """Helper function to get tenant_id from request state"""
    return getattr(request.state, "tenant_id", None)


def get_api_key_from_request(request: Request) -> str:
    """Helper function to get api_key_id from request state"""
    return getattr(request.state, "api_key_id", None)
