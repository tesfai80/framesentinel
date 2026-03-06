from fastapi import FastAPI, Request, HTTPException
from pydantic import BaseModel
from src.services.video_processor import VideoProcessor
from src.config.database import SessionLocal
import os

app = FastAPI(title="FrameSentinel Worker")

class ProcessVideoRequest(BaseModel):
    session_id: str
    video_path: str

@app.post("/process")
async def process_video(request: ProcessVideoRequest):
    db = SessionLocal()
    try:
        processor = VideoProcessor()
        processor.process_video(request.session_id, request.video_path, db)
        return {"status": "success", "session_id": request.session_id}
    except Exception as e:
        print(f"Worker error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()

@app.get("/health")
async def health():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)
