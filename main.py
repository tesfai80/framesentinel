from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.api.routes import router
from src.api.admin_routes import router as admin_router
from src.api.auth_routes import router as auth_router
from src.api.user_routes import router as user_router
from src.api.api_key_routes import router as api_key_router
from src.api.usage_routes import router as usage_router
from src.api.billing_routes import router as billing_router
from src.api.tenant_routes import router as tenant_router
from src.config.database import init_db

app = FastAPI(
    title="FrameSentinel API",
    description="AI Video KYC Fraud Detection Platform",
    version="1.0.0"
)

# CORS must be first
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

app.include_router(router)
app.include_router(admin_router)
app.include_router(auth_router)
app.include_router(user_router)
app.include_router(api_key_router)
app.include_router(usage_router)
app.include_router(billing_router)
app.include_router(tenant_router)

@app.on_event("startup")
async def startup_event():
    try:
        init_db()
        print("DB initialized")
    except Exception as e:
        print("DB init failed:", e)

@app.get("/")
async def root():
    return {
        "service": "FrameSentinel",
        "version": "1.0.0",
        "status": "operational"
    }

@app.get("/health")
async def health():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    import os

    port = int(os.environ.get("PORT", 8000))

    uvicorn.run(app, host="0.0.0.0", port=port)
