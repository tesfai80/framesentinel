import { Session, SessionResult, WebhookLog, AuditLog, TenantSettings, User, DashboardStats } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || 'dev-api-key-12345';

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,
      ...options.headers,
    },
  });
  
  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(error.detail || `API Error: ${res.statusText}`);
  }
  
  return res.json();
}

export const api = {
  // Sessions
  getSessions: (params?: { state?: string; risk_level?: string; limit?: number }) => 
    fetchAPI(`/api/v1/sessions?${new URLSearchParams(params as any)}`),
  
  getSession: (id: string) => fetchAPI(`/api/v1/sessions/${id}/status`),
  
  getSessionResult: (id: string): Promise<SessionResult> => 
    fetchAPI(`/api/v1/sessions/${id}/result`),

  // Admin
  getWebhookLogs: (sessionId?: string) => 
    fetchAPI(`/api/v1/webhooks/logs${sessionId ? `?session_id=${sessionId}` : ''}`),
  
  retryWebhook: (sessionId: string) => 
    fetchAPI(`/api/v1/sessions/${sessionId}/webhook/redeliver`, { method: 'POST' }),
  
  getAuditLogs: (params?: { user_id?: string; action?: string; limit?: number }) => 
    fetchAPI(`/api/v1/audit/logs?${new URLSearchParams(params as any)}`),
  
  getTenantSettings: (tenantId: string): Promise<TenantSettings> => 
    fetchAPI(`/api/v1/tenant/settings?tenant_id=${tenantId}`),
  
  updateTenantSettings: (tenantId: string, settings: Partial<TenantSettings>) => 
    fetchAPI(`/api/v1/tenant/settings?tenant_id=${tenantId}`, {
      method: 'PUT',
      body: JSON.stringify(settings),
    }),

  getHealth: () => fetchAPI('/api/v1/health'),

  // Users
  getUsers: () => fetchAPI('/api/v1/admin/users'),
  createUser: (data: any) => fetchAPI('/api/v1/admin/users', { method: 'POST', body: JSON.stringify(data) }),
  updateUser: (id: string, data: any) => fetchAPI(`/api/v1/admin/users/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteUser: (id: string) => fetchAPI(`/api/v1/admin/users/${id}`, { method: 'DELETE' }),

  // Stats
  getStats: async (): Promise<DashboardStats> => {
    const statsData = await fetchAPI('/api/v1/admin/stats');
    return {
      total_sessions: statsData.total_sessions || 0,
      verified: statsData.risk_distribution?.verified || 0,
      suspicious: statsData.risk_distribution?.suspicious || 0,
      high_risk: statsData.risk_distribution?.high_risk || 0,
      avg_score: statsData.avg_score || 0,
      processing_time_avg: statsData.processing_time_avg || 0,
    };
  },

  // Analyst Activity
  getAnalystActivity: () => fetchAPI('/api/v1/admin/analyst-activity'),

  // Webhook Stats
  getWebhookStats: () => fetchAPI('/api/v1/admin/webhook-stats'),

  // API Keys
  getAPIKeys: () => fetchAPI('/api/v1/api-keys'),
  createAPIKey: (data: { name: string; expires_in_days?: number }) => 
    fetchAPI('/api/v1/api-keys', { method: 'POST', body: JSON.stringify(data) }),
  revokeAPIKey: (keyId: string) => 
    fetchAPI(`/api/v1/api-keys/${keyId}`, { method: 'DELETE' }),
  getUsageStats: () => fetchAPI('/api/v1/api-keys/usage'),
  getCredits: () => fetchAPI('/api/v1/usage/credits'),
};
