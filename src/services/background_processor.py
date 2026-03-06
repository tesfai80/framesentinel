import threading
from queue import Queue
from sqlalchemy.orm import Session
from src.services.video_processor import VideoProcessor
from src.database import SessionLocal

class BackgroundProcessor:
    def __init__(self):
        self.queue = Queue()
        self.processor = VideoProcessor()
        self.worker_thread = threading.Thread(target=self._worker, daemon=True)
        self.worker_thread.start()
    
    def _worker(self):
        while True:
            task = self.queue.get()
            if task is None:
                break
            
            session_id, video_path = task
            db = SessionLocal()
            try:
                self.processor.process_video(session_id, video_path, db)
            except Exception as e:
                print(f"Background processing error: {e}")
            finally:
                db.close()
                self.queue.task_done()
    
    def enqueue(self, session_id: str, video_path: str):
        self.queue.put((session_id, video_path))

background_processor = BackgroundProcessor()
