import numpy as np
from typing import Dict, List
import cv2

class DeepfakeDetector:
    def analyze(self, frame: np.ndarray) -> Dict:
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        variance = np.var(gray)
        detected = variance < 100 or variance > 10000
        return {"detected": detected, "confidence": 0.75 if detected else 0.25}

class ReplayDetector:
    def analyze(self, frame: np.ndarray) -> Dict:
        edges = cv2.Canny(frame, 100, 200)
        edge_density = np.sum(edges) / edges.size
        detected = edge_density > 0.15
        return {"detected": detected, "confidence": 0.70 if detected else 0.30}

class InjectionDetector:
    def analyze(self, frame: np.ndarray) -> Dict:
        hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
        saturation = hsv[:, :, 1]
        detected = np.mean(saturation) < 50
        return {"detected": detected, "confidence": 0.65 if detected else 0.35}

class FaceSwapDetector:
    def analyze(self, frame: np.ndarray) -> Dict:
        face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, 1.1, 4)
        detected = len(faces) != 1
        return {"detected": detected, "confidence": 0.80 if detected else 0.20}

class MetadataIntegrityChecker:
    def check(self, metadata: dict) -> Dict:
        anomaly = metadata.get("codec", 0) == 0 or metadata.get("fps", 0) < 15
        return {"detected": anomaly, "confidence": 0.90 if anomaly else 0.10}

class DetectionPipeline:
    def __init__(self):
        self.deepfake_detector = DeepfakeDetector()
        self.replay_detector = ReplayDetector()
        self.injection_detector = InjectionDetector()
        self.face_swap_detector = FaceSwapDetector()
        self.metadata_checker = MetadataIntegrityChecker()
    
    def process_frame(self, frame_num: int, frame: np.ndarray) -> Dict:
        return {
            "frame_number": frame_num,
            "deepfake": self.deepfake_detector.analyze(frame),
            "replay": self.replay_detector.analyze(frame),
            "injection": self.injection_detector.analyze(frame),
            "face_swap": self.face_swap_detector.analyze(frame)
        }
    
    def check_metadata(self, metadata: dict) -> Dict:
        return self.metadata_checker.check(metadata)
