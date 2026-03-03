"""
Migration script to add API Keys, Usage Tracking, and Billing tables
Run this after updating database.py schema
"""
from src.config.database import engine
from src.models.database import Base

def run_migration():
    print("Creating new tables...")
    Base.metadata.create_all(bind=engine)
    print("Migration completed successfully!")
    print("New tables created:")
    print("  - api_keys")
    print("  - usage_records")
    print("  - billing_accounts")

if __name__ == "__main__":
    run_migration()
