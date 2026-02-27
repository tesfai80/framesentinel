export type SessionState = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
export type RiskLevel = 'VERIFIED' | 'SUSPICIOUS' | 'HIGH_RISK';
export type UserRole = 'VIEWER' | 'ANALYST' | 'ADMIN';

export interface Session {
  session_id: string;
  user_id: string;
  state: SessionState;
  created_at: string;
  completed_at?: string;
  tenant_id: string;
  authenticity_score?: number;
  risk_level?: RiskLevel;
}

export interface DetectionFlags {
  deepfake_detected: boolean;
  replay_detected: boolean;
  injection_detected: boolean;
  face_swap_detected: boolean;
  metadata_anomaly: boolean;
}

export interface FrameFlag {
  frame_number: number;
  timestamp: number;
  flags: string[];
  confidence: number;
}

export interface SessionResult {
  session_id: string;
  state: SessionState;
  authenticity_score: number;
  risk_level: RiskLevel;
  detection_flags: DetectionFlags;
  frame_timeline: FrameFlag[];
  processing_time_ms?: number;
}

export interface WebhookLog {
  id: number;
  session_id: string;
  url: string;
  status_code?: number;
  attempt: number;
  success: boolean;
  created_at: string;
}

export interface AuditLog {
  id: number;
  user_id: string;
  action: string;
  resource_type: string;
  resource_id: string;
  details?: any;
  created_at: string;
}

export interface TenantSettings {
  tenant_id: string;
  webhook_url?: string;
  deepfake_threshold: number;
  replay_threshold: number;
  injection_threshold: number;
  face_swap_threshold: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  tenant_id: string;
  created_at: string;
}

export interface DashboardStats {
  total_sessions: number;
  verified: number;
  suspicious: number;
  high_risk: number;
  avg_score: number;
  processing_time_avg: number;
}
