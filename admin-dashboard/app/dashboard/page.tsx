'use client';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { DashboardStats, Session } from '@/types';
import { CheckCircle, AlertTriangle, XCircle, TrendingUp, TrendingDown, Clock, Search, Activity, Cpu, Zap, Bell, Shield } from 'lucide-react';
import { theme } from '@/styles/theme';
import { Card } from '@/components/Card';
import { Loading } from '@/components/Loading';

export default function DashboardPage() {
  const [liveActivity, setLiveActivity] = useState<any[]>([]);

  // Use React Query for caching
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['stats'],
    queryFn: api.getStats,
  });

  const { data: recentSessions = [] } = useQuery({
    queryKey: ['recentSessions'],
    queryFn: () => api.getSessions({ limit: 5 }),
  });

  const { data: webhookStats } = useQuery({
    queryKey: ['webhookStats'],
    queryFn: api.getWebhookStats,
  });

  const { data: systemHealth } = useQuery({
    queryKey: ['systemHealth'],
    queryFn: api.getSystemHealth,
  });

  const { data: apiUsage } = useQuery({
    queryKey: ['apiUsage'],
    queryFn: api.getAPIUsage,
  });

  const { data: modelPerformance } = useQuery({
    queryKey: ['modelPerformance'],
    queryFn: api.getModelPerformance,
  });

  const { data: detectionActivity } = useQuery({
    queryKey: ['detectionActivity'],
    queryFn: () => api.getDetectionActivity({ time_range: '24h' }),
  });

  const { data: trends } = useQuery({
    queryKey: ['trends'],
    queryFn: () => api.getTrends({ time_range: '24h' }),
  });

  const { data: securityEvents = [] } = useQuery({
    queryKey: ['securityEvents'],
    queryFn: () => api.getSecurityEvents({ limit: 5 }),
  });

  useEffect(() => {
    if (recentSessions.length === 0) return;
    
    const interval = setInterval(() => {
      const randomSession = recentSessions[Math.floor(Math.random() * recentSessions.length)];
      setLiveActivity(prev => [{
        id: Date.now(),
        message: `Session ${randomSession.session_id.substring(0, 8)} analyzed`,
        type: randomSession.risk_level || 'info',
        timestamp: new Date()
      }, ...prev.slice(0, 9)]);
    }, 15000);
    
    return () => clearInterval(interval);
  }, [recentSessions]);

  if (statsLoading) {
    return <Loading message="Loading dashboard..." />;
  }

  const suspiciousTrend = stats ? ((stats.suspicious / stats.total_sessions) * 100).toFixed(1) : '0';
  const manualReviewRate = stats ? ((stats.suspicious / stats.total_sessions) * 100).toFixed(1) : '0';
  
  // Use real trends from API
  const verifiedTrend = trends?.verified_trend || 0;
  const suspiciousTrendValue = trends?.suspicious_trend || 0;
  const highRiskTrend = trends?.high_risk_trend || 0;

  return (
    <div>
      {/* Enterprise Badge */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)',
        border: '1px solid rgba(16, 185, 129, 0.3)',
        borderRadius: '8px',
        marginBottom: '20px',
      }}>
        <Shield size={16} color="#10b981" />
        <span style={{ fontSize: '13px', fontWeight: '600', color: '#10b981' }}>AI Fraud Detection Engine</span>
        <span style={{ fontSize: '11px', color: '#9ca3af' }}>• Powered by FrameSentinel</span>
      </div>

      <h1 style={{ fontSize: '32px', marginBottom: '30px', color: theme.colors.text.primary }}>Dashboard Overview</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '20px', marginBottom: '30px' }}>
        {/* Main Content */}
        <div>
          {/* KPI Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
            <Card>
              <div style={{ fontSize: '14px', color: theme.colors.text.secondary, marginBottom: '8px' }}>Total Sessions</div>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: theme.colors.text.primary }}>{stats?.total_sessions || 0}</div>
              <div style={{ fontSize: '12px', color: theme.colors.accent.green, marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <TrendingUp size={14} />
                {apiUsage?.requests_today || 0} today
              </div>
            </Card>

            <Card>
              <div style={{ fontSize: '14px', color: theme.colors.text.secondary, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={14} color={theme.colors.risk.verified} />
                Verified
              </div>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: theme.colors.risk.verified, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle size={32} />
                {stats?.verified || 0}
              </div>
              <div style={{ fontSize: '12px', color: theme.colors.accent.green, marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                {verifiedTrend >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {verifiedTrend >= 0 ? '+' : ''}{verifiedTrend.toFixed(1)}% vs last 24h
              </div>
            </Card>

            <Card>
              <div style={{ fontSize: '14px', color: theme.colors.text.secondary, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <AlertTriangle size={14} color={theme.colors.risk.suspicious} />
                Suspicious
              </div>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: theme.colors.risk.suspicious, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <AlertTriangle size={32} />
                {stats?.suspicious || 0}
              </div>
              <div style={{ fontSize: '12px', color: theme.colors.accent.amber, marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                {suspiciousTrendValue >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {suspiciousTrendValue >= 0 ? '+' : ''}{suspiciousTrendValue.toFixed(1)}% vs last 24h
              </div>
            </Card>

            <Card glow="red">
              <div style={{ fontSize: '14px', color: theme.colors.text.secondary, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <XCircle size={14} color={theme.colors.risk.high} />
                High Risk
              </div>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: theme.colors.risk.high, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <XCircle size={32} />
                {stats?.high_risk || 0}
              </div>
              <div style={{ fontSize: '12px', color: theme.colors.accent.green, marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                {highRiskTrend >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {highRiskTrend >= 0 ? '+' : ''}{highRiskTrend.toFixed(1)}% vs last 24h
              </div>
            </Card>
          </div>

          {/* System Health Widget */}
          <Card style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '18px', marginBottom: '16px', color: theme.colors.text.primary, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={20} color={theme.colors.accent.green} />
              System Status
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: systemHealth?.api_status === 'operational' ? theme.colors.accent.green : theme.colors.risk.high }} />
                <div>
                  <div style={{ fontSize: '12px', color: theme.colors.text.secondary }}>API</div>
                  <div style={{ fontSize: '14px', color: systemHealth?.api_status === 'operational' ? theme.colors.accent.green : theme.colors.risk.high, fontWeight: '600', textTransform: 'capitalize' }}>{systemHealth?.api_status || 'Operational'}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: systemHealth?.queue_status === 'normal' ? theme.colors.accent.green : theme.colors.risk.suspicious }} />
                <div>
                  <div style={{ fontSize: '12px', color: theme.colors.text.secondary }}>Processing Queue</div>
                  <div style={{ fontSize: '14px', color: systemHealth?.queue_status === 'normal' ? theme.colors.accent.green : theme.colors.risk.suspicious, fontWeight: '600', textTransform: 'capitalize' }}>{systemHealth?.queue_status || 'Normal'}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: systemHealth?.webhook_status === 'healthy' ? theme.colors.accent.green : theme.colors.risk.suspicious }} />
                <div>
                  <div style={{ fontSize: '12px', color: theme.colors.text.secondary }}>Webhook Delivery</div>
                  <div style={{ fontSize: '14px', color: systemHealth?.webhook_status === 'healthy' ? theme.colors.accent.green : theme.colors.risk.suspicious, fontWeight: '600', textTransform: 'capitalize' }}>{systemHealth?.webhook_status || 'Healthy'}</div>
                </div>
              </div>
            </div>
          </Card>

          {/* API Usage Widget */}
          <Card style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '18px', marginBottom: '16px', color: theme.colors.text.primary, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Cpu size={20} color={theme.colors.accent.cyan} />
              API Usage
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              <div>
                <div style={{ fontSize: '12px', color: theme.colors.text.secondary, marginBottom: '8px' }}>Requests Today</div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: theme.colors.text.primary }}>{apiUsage?.requests_today || 0}</div>
                <div style={{ fontSize: '11px', color: apiUsage?.change_percent >= 0 ? theme.colors.accent.green : theme.colors.risk.high, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {apiUsage?.change_percent >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {apiUsage?.change_percent >= 0 ? '+' : ''}{apiUsage?.change_percent || 0}% vs yesterday
                </div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: theme.colors.text.secondary, marginBottom: '8px' }}>Success Rate</div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: theme.colors.accent.green }}>{apiUsage?.success_rate || 0}%</div>
                <div style={{ fontSize: '11px', color: theme.colors.text.secondary, marginTop: '4px' }}>
                  {apiUsage?.failed_requests || 0} failed requests
                </div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: theme.colors.text.secondary, marginBottom: '8px' }}>Avg Response Time</div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: theme.colors.accent.cyan }}>{apiUsage?.avg_response_time || 0}s</div>
                <div style={{ fontSize: '11px', color: theme.colors.text.secondary, marginTop: '4px' }}>
                  Processing time
                </div>
              </div>
            </div>
          </Card>

          {/* Threat Level Indicator */}
          <Card style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '18px', marginBottom: '16px', color: theme.colors.text.primary, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Shield size={20} color={theme.colors.risk.suspicious} />
              Current Fraud Threat Level
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{
                padding: '16px 32px',
                background: (stats?.high_risk || 0) > (stats?.verified || 0) ? 'rgba(239, 68, 68, 0.1)' : (stats?.suspicious || 0) > 0 ? 'rgba(245, 158, 11, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                border: `2px solid ${(stats?.high_risk || 0) > (stats?.verified || 0) ? '#ef4444' : (stats?.suspicious || 0) > 0 ? '#f59e0b' : '#10b981'}`,
                borderRadius: '8px',
              }}>
                <div style={{ fontSize: '14px', color: theme.colors.text.secondary, marginBottom: '4px' }}>Threat Level</div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: (stats?.high_risk || 0) > (stats?.verified || 0) ? '#ef4444' : (stats?.suspicious || 0) > 0 ? '#f59e0b' : '#10b981' }}>
                  {(stats?.high_risk || 0) > (stats?.verified || 0) ? 'HIGH' : (stats?.suspicious || 0) > 0 ? 'MEDIUM' : 'LOW'}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', color: theme.colors.text.primary, marginBottom: '8px' }}>
                  Suspicious activity: <strong style={{ color: '#f59e0b' }}>{suspiciousTrend}%</strong> of sessions
                </div>
                <div style={{ fontSize: '12px', color: theme.colors.text.secondary }}>
                  Based on detection patterns and fraud rate trends
                </div>
              </div>
            </div>
          </Card>

          {/* Model Performance & Detection Activity */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <Card>
              <h2 style={{ fontSize: '18px', marginBottom: '16px', color: theme.colors.text.primary }}>Model Performance</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '13px', color: theme.colors.text.secondary }}>Deepfake Detection</span>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: theme.colors.accent.green }}>{modelPerformance?.deepfake_accuracy || 0}%</span>
                  </div>
                  <div style={{ height: '6px', background: '#374151', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${modelPerformance?.deepfake_accuracy || 0}%`, background: theme.colors.accent.green }} />
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '13px', color: theme.colors.text.secondary }}>Replay Detection</span>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: theme.colors.accent.green }}>{modelPerformance?.replay_accuracy || 0}%</span>
                  </div>
                  <div style={{ height: '6px', background: '#374151', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${modelPerformance?.replay_accuracy || 0}%`, background: theme.colors.accent.green }} />
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '13px', color: theme.colors.text.secondary }}>False Positive Rate</span>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: theme.colors.accent.cyan }}>{modelPerformance?.false_positive_rate || 0}%</span>
                  </div>
                  <div style={{ height: '6px', background: '#374151', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${modelPerformance?.false_positive_rate || 0}%`, background: theme.colors.accent.cyan }} />
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <h2 style={{ fontSize: '18px', marginBottom: '16px', color: theme.colors.text.primary }}>Detection Activity (24h)</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {detectionActivity && [
                  { label: 'Deepfake', count: detectionActivity.deepfake || 0, color: '#ef4444' },
                  { label: 'Replay', count: detectionActivity.replay || 0, color: '#f59e0b' },
                  { label: 'Injection', count: detectionActivity.injection || 0, color: '#8b5cf6' },
                  { label: 'Face Swap', count: detectionActivity.face_swap || 0, color: '#ec4899' },
                ].map((item) => {
                  const maxCount = Math.max(detectionActivity.deepfake, detectionActivity.replay, detectionActivity.injection, detectionActivity.face_swap, 1);
                  return (
                    <div key={item.label}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontSize: '13px', color: theme.colors.text.secondary }}>{item.label}</span>
                        <span style={{ fontSize: '13px', fontWeight: '600', color: item.color }}>{item.count} detections</span>
                      </div>
                      <div style={{ height: '6px', background: '#374151', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${(item.count / maxCount) * 100}%`, background: item.color }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Detection Breakdown & Risk Distribution */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <Card>
              <h2 style={{ fontSize: '18px', marginBottom: '16px', color: theme.colors.text.primary }}>Detection Breakdown (24h)</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {detectionActivity && [
                  { label: 'Deepfake detected', value: detectionActivity.deepfake || 0, color: theme.colors.risk.high },
                  { label: 'Replay attacks', value: detectionActivity.replay || 0, color: theme.colors.risk.suspicious },
                  { label: 'Face swap', value: detectionActivity.face_swap || 0, color: theme.colors.accent.amber },
                  { label: 'Injection attempts', value: detectionActivity.injection || 0, color: theme.colors.accent.purple },
                ].map((item) => (
                  <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '14px', color: theme.colors.text.secondary }}>{item.label}</div>
                    <div style={{ fontSize: '18px', fontWeight: '600', color: item.color }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h2 style={{ fontSize: '18px', marginBottom: '16px', color: theme.colors.text.primary }}>Risk Distribution</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: theme.colors.risk.high }} />
                    <span style={{ fontSize: '14px', color: theme.colors.text.secondary }}>High Risk</span>
                  </div>
                  <span style={{ fontSize: '18px', fontWeight: '600', color: theme.colors.risk.high }}>{stats?.high_risk || 0}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: theme.colors.risk.suspicious }} />
                    <span style={{ fontSize: '14px', color: theme.colors.text.secondary }}>Suspicious</span>
                  </div>
                  <span style={{ fontSize: '18px', fontWeight: '600', color: theme.colors.risk.suspicious }}>{stats?.suspicious || 0}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: theme.colors.risk.verified }} />
                    <span style={{ fontSize: '14px', color: theme.colors.text.secondary }}>Verified</span>
                  </div>
                  <span style={{ fontSize: '18px', fontWeight: '600', color: theme.colors.risk.verified }}>{stats?.verified || 0}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Recent Sessions */}
          <Card>
            <h2 style={{ fontSize: '20px', marginBottom: '20px', color: theme.colors.text.primary }}>Recent Sessions</h2>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid ${theme.colors.border.default}` }}>
                    <th style={{ padding: '12px', textAlign: 'left', color: theme.colors.text.secondary, fontSize: '14px' }}>Session ID</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: theme.colors.text.secondary, fontSize: '14px' }}>User ID</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: theme.colors.text.secondary, fontSize: '14px' }}>State</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: theme.colors.text.secondary, fontSize: '14px' }}>Risk Level</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: theme.colors.text.secondary, fontSize: '14px' }}>Score</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: theme.colors.text.secondary, fontSize: '14px' }}>Created</th>
                  </tr>
                </thead>
                <tbody>
                  {recentSessions.map((session: any) => (
                    <tr key={session.session_id} style={{ borderBottom: `1px solid ${theme.colors.border.default}` }}>
                      <td style={{ padding: '12px', fontSize: '13px', fontFamily: 'monospace', color: theme.colors.text.primary }}>
                        {session.session_id.substring(0, 8)}...
                      </td>
                      <td style={{ padding: '12px', fontSize: '13px', color: theme.colors.text.primary }}>{session.user_id}</td>
                      <td style={{ padding: '12px' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          background: session.state === 'COMPLETED' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                          color: session.state === 'COMPLETED' ? theme.colors.risk.verified : theme.colors.risk.suspicious,
                          border: `1px solid ${session.state === 'COMPLETED' ? theme.colors.risk.verified : theme.colors.risk.suspicious}`,
                        }}>
                          {session.state}
                        </span>
                      </td>
                      <td style={{ padding: '12px' }}>
                        {session.risk_level && (
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            background: session.risk_level === 'VERIFIED' ? 'rgba(16, 185, 129, 0.1)' : 
                                       session.risk_level === 'SUSPICIOUS' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                            color: session.risk_level === 'VERIFIED' ? theme.colors.risk.verified : 
                                   session.risk_level === 'SUSPICIOUS' ? theme.colors.risk.suspicious : theme.colors.risk.high,
                            border: `1px solid ${session.risk_level === 'VERIFIED' ? theme.colors.risk.verified : 
                                   session.risk_level === 'SUSPICIOUS' ? theme.colors.risk.suspicious : theme.colors.risk.high}`,
                          }}>
                            {session.risk_level}
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '12px', fontSize: '13px', color: theme.colors.text.primary }}>
                        {session.authenticity_score ? (session.authenticity_score * 100).toFixed(0) + '%' : '-'}
                      </td>
                      <td style={{ padding: '12px', fontSize: '13px', color: theme.colors.text.secondary }}>
                        {new Date(session.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Live Activity Sidebar */}
        <div>
          <Card>
            <h2 style={{ fontSize: '18px', marginBottom: '16px', color: theme.colors.text.primary, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={18} color={theme.colors.accent.amber} />
              Live Activity
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '300px', overflowY: 'auto' }}>
              {liveActivity.length === 0 ? (
                <div style={{ fontSize: '13px', color: theme.colors.text.secondary, textAlign: 'center', padding: '20px' }}>
                  Waiting for activity...
                </div>
              ) : (
                liveActivity.map((activity) => (
                  <div key={activity.id} style={{
                    padding: '12px',
                    background: 'rgba(16, 185, 129, 0.05)',
                    borderRadius: '8px',
                    borderLeft: `3px solid ${
                      activity.type === 'VERIFIED' ? theme.colors.risk.verified :
                      activity.type === 'SUSPICIOUS' ? theme.colors.risk.suspicious :
                      activity.type === 'REJECTED' ? theme.colors.risk.high :
                      theme.colors.accent.cyan
                    }`
                  }}>
                    <div style={{ fontSize: '13px', color: theme.colors.text.primary, marginBottom: '4px' }}>
                      {activity.message}
                    </div>
                    <div style={{ fontSize: '11px', color: theme.colors.text.secondary }}>
                      {activity.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          <Card style={{ marginTop: '20px' }}>
            <h2 style={{ fontSize: '18px', marginBottom: '16px', color: theme.colors.text.primary, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bell size={18} color={theme.colors.accent.cyan} />
              Recent Security Events
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {securityEvents.length === 0 ? (
                <div style={{ fontSize: '13px', color: theme.colors.text.secondary, textAlign: 'center', padding: '20px' }}>
                  No recent events
                </div>
              ) : (
                securityEvents.map((item: any, idx: number) => (
                  <div key={idx} style={{
                    padding: '10px',
                    background: 'rgba(16, 185, 129, 0.05)',
                    borderRadius: '6px',
                    borderLeft: `3px solid ${theme.colors.accent.green}`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', color: theme.colors.text.primary, marginBottom: '2px' }}>
                        {item.event}
                      </div>
                      <div style={{ fontSize: '11px', color: theme.colors.text.secondary }}>
                        {item.time}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
