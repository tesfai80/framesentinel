'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { DashboardStats, Session } from '@/types';
import { CheckCircle, AlertTriangle, XCircle, TrendingUp, Clock, Search } from 'lucide-react';
import { theme } from '@/styles/theme';
import { Card } from '@/components/Card';
import { Loading } from '@/components/Loading';

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentSessions, setRecentSessions] = useState<Session[]>([]);
  const [webhookStats, setWebhookStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [statsData, sessionsData, webhookData] = await Promise.all([
        api.getStats(),
        api.getSessions({ limit: 5 }),
        api.getWebhookStats(),
      ]);
      setStats(statsData);
      setRecentSessions(sessionsData);
      setWebhookStats(webhookData);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading message="Loading dashboard..." />;
  }

  const suspiciousTrend = stats ? ((stats.suspicious / stats.total_sessions) * 100).toFixed(1) : '0';
  const manualReviewRate = stats ? ((stats.suspicious / stats.total_sessions) * 100).toFixed(1) : '0';

  return (
    <div>
      <h1 style={{ fontSize: '32px', marginBottom: '30px', color: theme.colors.text.primary }}>Dashboard Overview</h1>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <Card>
          <div style={{ fontSize: '14px', color: theme.colors.text.secondary, marginBottom: '8px' }}>Total Sessions</div>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: theme.colors.text.primary }}>{stats?.total_sessions || 0}</div>
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
        </Card>

        <Card>
          <div style={{ fontSize: '14px', color: theme.colors.text.secondary, marginBottom: '8px' }}>Avg Score</div>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#10b981', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <TrendingUp size={32} />
            {stats?.avg_score ? (stats.avg_score * 100).toFixed(0) : 0}%
          </div>
        </Card>

        <Card>
          <div style={{ fontSize: '14px', color: theme.colors.text.secondary, marginBottom: '8px' }}>Avg Processing</div>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: theme.colors.accent.purple, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Clock size={32} />
            {stats?.processing_time_avg ? (stats.processing_time_avg / 1000).toFixed(1) : 0}s
          </div>
        </Card>

        <Card>
          <div style={{ fontSize: '14px', color: theme.colors.text.secondary, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <TrendingUp size={14} />
            Suspicious Trend (7d)
          </div>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: theme.colors.accent.amber }}>
            {suspiciousTrend}%
          </div>
        </Card>

        <Card>
          <div style={{ fontSize: '14px', color: theme.colors.text.secondary, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Search size={14} />
            Manual Review Rate
          </div>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#10b981' }}>
            {manualReviewRate}%
          </div>
        </Card>

        <Card>
          <div style={{ fontSize: '14px', color: theme.colors.text.secondary, marginBottom: '8px' }}>Webhook Fail Rate</div>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: theme.colors.risk.high }}>
            {webhookStats?.fail_rate || 0}%
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
            {recentSessions.map((session) => (
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
  );
}
