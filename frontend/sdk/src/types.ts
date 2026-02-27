export type SessionState = 'CREATED' | 'UPLOADED' | 'PROCESSING' | 'ANALYZED' | 'COMPLETED' | 'FAILED';
export type RiskLevel = 'VERIFIED' | 'SUSPICIOUS' | 'HIGH_RISK';

export interface FrameSentinelConfig {
  apiUrl: string;
  apiKey: string;
  onProgress?: (percent: number) => void;
  onStatusChange?: (state: SessionState) => void;
}

export interface DeviceMetadata {
  userAgent?: string;
  platform?: string;
  language?: string;
  screenResolution?: string;
  timestamp?: string;
  [key: string]: any;
}

export interface CreateSessionRequest {
  user_id: string;
  device_metadata?: DeviceMetadata;
}

export interface CreateSessionResponse {
  session_id: string;
  state: SessionState;
  created_at: string;
}

export interface DetectionFlags {
  deepfake_detected: boolean;
  replay_detected: boolean;
  injection_detected: boolean;
  face_swap_detected: boolean;
  metadata_anomaly: boolean;
}

export interface FrameEvent {
  frame_number: number;
  timestamp: number;
  flags: string[];
  confidence: number;
}

export interface VerificationResult {
  session_id: string;
  state: SessionState;
  authenticity_score?: number;
  risk_level?: RiskLevel;
  detection_flags?: DetectionFlags;
  frame_timeline?: FrameEvent[];
  processed_at?: string;
}

export interface SessionStatus {
  session_id: string;
  state: SessionState;
  updated_at: string;
}

export class FrameSentinelError extends Error {
  constructor(
    message: string,
    public code: string,
    public retryable: boolean = false
  ) {
    super(message);
    this.name = 'FrameSentinelError';
  }
}
