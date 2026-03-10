import os
from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    API_KEY: str = "dev-api-key-12345"
    STORAGE_PATH: str = "storage/videos"
    MAX_VIDEO_SIZE_MB: int = 100
    ALLOWED_FORMATS: List[str] = [".mp4", ".avi", ".mov", ".webm"]
    REDIS_URL: str = "redis://localhost:6379/0"
    DATABASE_URL: str = "sqlite:///./framesentinel.db"
    
    class Config:
        env_file = ".env"
        extra = "ignore"
    
settings = Settings()
