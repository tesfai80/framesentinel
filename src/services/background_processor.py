import threading
from queue import Queue
from sqlalchemy.orm import Session
from src.services.video_processor import VideoProcessor
from src.config.database import get_db, SessionLocal

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
                print(f"\n{'*'*60}")
                print(f"BACKGROUND WORKER: Starting processing for {session_id}")
                print(f"Video path: {video_path}")
                print(f"{'*'*60}\n")
                
                self.processor.process_video(session_id, video_path, db)
                
                print(f"\n{'*'*60}")
                print(f"BACKGROUND WORKER: Completed processing for {session_id}")
                print(f"{'*'*60}\n")
            except Exception as e:
                print(f"\n{'!'*60}")
                print(f"BACKGROUND WORKER ERROR for {session_id}: {e}")
                import traceback
                traceback.print_exc()
                print(f"{'!'*60}\n")
            finally:
                db.close()
                self.queue.task_done()
    
    def enqueue(self, session_id: str, video_path: str):
        self.queue.put((session_id, video_path))

background_processor = BackgroundProcessor()
