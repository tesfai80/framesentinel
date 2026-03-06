from google.cloud import tasks_v2
from google.protobuf import timestamp_pb2
import json
import os
from datetime import datetime, timedelta

class CloudTasksService:
    def __init__(self):
        try:
            self.client = tasks_v2.CloudTasksClient()
            self.project = os.getenv("GCP_PROJECT", "framesentinel")
            self.location = os.getenv("GCP_LOCATION", "europe-west3")
            self.queue = os.getenv("TASK_QUEUE_NAME", "video-processing")
            self.worker_url = os.getenv("WORKER_URL", "https://framesentinel-worker-341068003893.europe-west3.run.app/process")
            self.enabled = True
        except Exception as e:
            print(f"Cloud Tasks not available: {e}")
            self.enabled = False
        
    def enqueue_video_processing(self, session_id: str, video_path: str):
        if not self.enabled:
            raise Exception("Cloud Tasks not configured")
            
        parent = self.client.queue_path(self.project, self.location, self.queue)
        
        task = {
            "http_request": {
                "http_method": tasks_v2.HttpMethod.POST,
                "url": self.worker_url,
                "headers": {
                    "Content-Type": "application/json",
                },
                "body": json.dumps({
                    "session_id": session_id,
                    "video_path": video_path
                }).encode(),
            }
        }
        
        # Schedule task with 30 minute timeout
        schedule_time = datetime.utcnow() + timedelta(seconds=5)
        timestamp = timestamp_pb2.Timestamp()
        timestamp.FromDatetime(schedule_time)
        task["schedule_time"] = timestamp
        
        response = self.client.create_task(request={"parent": parent, "task": task})
        return response.name

cloud_tasks_service = CloudTasksService()
