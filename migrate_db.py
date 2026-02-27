"""
Database migration script to add detection threshold columns to tenant_settings
"""
from sqlalchemy import create_engine, text
import os
from dotenv import load_dotenv

load_dotenv()

def migrate():
    database_url = os.getenv('DATABASE_URL', 'sqlite:///./framesentinel.db')
    engine = create_engine(database_url)
    
    with engine.connect() as conn:
        # Check if columns exist
        try:
            # Add new columns if they don't exist
            conn.execute(text("""
                ALTER TABLE tenant_settings 
                ADD COLUMN IF NOT EXISTS deepfake_threshold FLOAT DEFAULT 0.70
            """))
            conn.execute(text("""
                ALTER TABLE tenant_settings 
                ADD COLUMN IF NOT EXISTS replay_threshold FLOAT DEFAULT 0.65
            """))
            conn.execute(text("""
                ALTER TABLE tenant_settings 
                ADD COLUMN IF NOT EXISTS injection_threshold FLOAT DEFAULT 0.60
            """))
            conn.execute(text("""
                ALTER TABLE tenant_settings 
                ADD COLUMN IF NOT EXISTS face_swap_threshold FLOAT DEFAULT 0.75
            """))
            conn.commit()
            print("✅ Migration completed successfully")
        except Exception as e:
            print(f"❌ Migration failed: {e}")
            conn.rollback()

if __name__ == "__main__":
    migrate()
