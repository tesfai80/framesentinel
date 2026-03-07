from fastapi import Security, HTTPException, status, Request, Depends
from fastapi.security import APIKeyHeader
from sqlalchemy.orm import Session
from src.config.database import get_db
from src.services.api_key_service import APIKeyService

api_key_header = APIKeyHeader(name="X-API-Key", auto_error=False)

async def verify_api_key(request: Request, api_key: str = Security(api_key_header), db: Session = Depends(get_db)):
    if request.method == "OPTIONS":
        return None
    
    if not api_key:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid API Key")
    
    api_key_obj = APIKeyService.validate_api_key(db, api_key)
    if not api_key_obj:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid API Key")
    
    request.state.tenant_id = api_key_obj.tenant_id
    request.state.api_key_id = api_key_obj.id
    return api_key
