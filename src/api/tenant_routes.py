from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.config.database import get_db
from src.services.tenant_service import TenantService
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

router = APIRouter(prefix="/api/v1/tenants", tags=["Tenants"])

class CreateTenantRequest(BaseModel):
    company_name: str
    admin_email: str
    admin_password: str
    plan: str = "free"
    domain: Optional[str] = None

class UpdateTenantRequest(BaseModel):
    company_name: Optional[str] = None
    domain: Optional[str] = None
    status: Optional[str] = None
    plan: Optional[str] = None
    max_users: Optional[int] = None

class TenantResponse(BaseModel):
    id: str
    company_name: str
    domain: Optional[str]
    status: str
    plan: str
    max_users: int
    created_at: datetime
    updated_at: datetime

@router.post("/", response_model=TenantResponse)
async def create_tenant(request: CreateTenantRequest, db: Session = Depends(get_db)):
    try:
        tenant = TenantService.create_tenant(
            db=db,
            company_name=request.company_name,
            admin_email=request.admin_email,
            admin_password=request.admin_password,
            plan=request.plan
        )
        
        if request.domain:
            tenant.domain = request.domain
            db.commit()
            db.refresh(tenant)
        
        return tenant
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/", response_model=List[TenantResponse])
async def list_tenants(db: Session = Depends(get_db)):
    return TenantService.list_tenants(db)

@router.get("/{tenant_id}", response_model=TenantResponse)
async def get_tenant(tenant_id: str, db: Session = Depends(get_db)):
    tenant = TenantService.get_tenant(db, tenant_id)
    if not tenant:
        raise HTTPException(status_code=404, detail="Tenant not found")
    return tenant

@router.put("/{tenant_id}", response_model=TenantResponse)
async def update_tenant(tenant_id: str, request: UpdateTenantRequest, db: Session = Depends(get_db)):
    updates = {k: v for k, v in request.dict().items() if v is not None}
    tenant = TenantService.update_tenant(db, tenant_id, **updates)
    if not tenant:
        raise HTTPException(status_code=404, detail="Tenant not found")
    return tenant

@router.delete("/{tenant_id}")
async def delete_tenant(tenant_id: str, db: Session = Depends(get_db)):
    success = TenantService.delete_tenant(db, tenant_id)
    if not success:
        raise HTTPException(status_code=404, detail="Tenant not found")
    return {"message": "Tenant deleted successfully"}
