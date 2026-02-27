import cv2
import numpy as np
from typing import List, Tuple

class FrameExtractor:
    def __init__(self, sample_rate: int = 5):
        self.sample_rate = sample_rate
    
    def extract_frames(self, video_path: str) -> List[Tuple[int, np.ndarray]]:
        frames = []
        cap = cv2.VideoCapture(video_path)
        
        if not cap.isOpened():
            raise ValueError("Cannot open video file")
        
        frame_count = 0
        while True:
            ret, frame = cap.read()
            if not ret:
                break
            
            if frame_count % self.sample_rate == 0:
                frames.append((frame_count, frame))
            
            frame_count += 1
        
        cap.release()
        return frames
    
    def get_video_metadata(self, video_path: str) -> dict:
        cap = cv2.VideoCapture(video_path)
        
        metadata = {
            "fps": cap.get(cv2.CAP_PROP_FPS),
            "frame_count": int(cap.get(cv2.CAP_PROP_FRAME_COUNT)),
            "width": int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)),
            "height": int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT)),
            "codec": int(cap.get(cv2.CAP_PROP_FOURCC))
        }
        
        cap.release()
        return metadata
