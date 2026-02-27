from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from src.models.database import Base
from src.config.settings import settings

# SQLite requires check_same_thread=False, PostgreSQL doesn't need it
if settings.DATABASE_URL.startswith("sqlite"):
    engine = create_engine(settings.DATABASE_URL, connect_args={"check_same_thread": False})
else:
    # PostgreSQL - Supabase requires SSL
    engine = create_engine(
        settings.DATABASE_URL,
        pool_pre_ping=True,
        connect_args={
            "connect_timeout": 10,
            "sslmode": "require"
        }
    )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
