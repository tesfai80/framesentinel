'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { WebhookLog } from '@/types';
import { RotateCw } from 'lucide-react';
import { toast } from '@/components/Toast';
import { Loading } from '@/components/Loading';

export default function WebhooksPage() {
  const [logs, setLogs] = useState<WebhookLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    try {
      const data = await api.getWebhookLogs();
      setLogs(data);
    } catch (error) {
      console.error('Failed to load webhook logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = async (sessionId: string) => {
    try {
      await api.retryWebhook(sessionId);
      toast.success('Webhook retry initiated');
      loadLogs();
    } catch (error: any) {
      toast.error(error.message || 'Failed to retry webhook');
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '32px', marginBottom: '30px', color: '#e8eaed' }}>Webhook Logs</h1>

      <div style={{
        background: '#161B22',
        backdropFilter: 'blur(10px)',
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid rgba(16, 185, 129, 0.2)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
      }}>
        {loading ? (
          <Loading message="Loading webhook logs..." />
        ) : logs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#9ca3af' }}>No webhook logs found</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #374151' }}>
                <th style={{ padding: '12px', textAlign: 'left', color: '#9ca3af', fontSize: '14px' }}>ID</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#9ca3af', fontSize: '14px' }}>Session ID</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#9ca3af', fontSize: '14px' }}>URL</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#9ca3af', fontSize: '14px' }}>Status</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#9ca3af', fontSize: '14px' }}>Attempt</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#9ca3af', fontSize: '14px' }}>Created</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#9ca3af', fontSize: '14px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} style={{ borderBottom: '1px solid #374151' }}>
                  <td style={{ padding: '12px', fontSize: '13px', color: '#e8eaed' }}>{log.id}</td>
                  <td style={{ padding: '12px', fontSize: '13px', fontFamily: 'monospace', color: '#e8eaed' }}>
                    {log.session_id.substring(0, 8)}...
                  </td>
                  <td style={{ padding: '12px', fontSize: '13px', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', color: '#e8eaed' }}>
                    {log.url}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      background: log.success ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                      color: log.success ? '#10b981' : '#ef4444',
                      border: `1px solid ${log.success ? '#10b981' : '#ef4444'}`,
                    }}>
                      {log.status_code || 'Failed'}
                    </span>
                  </td>
                  <td style={{ padding: '12px', fontSize: '13px', color: '#e8eaed' }}>{log.attempt}</td>
                  <td style={{ padding: '12px', fontSize: '13px', color: '#9ca3af' }}>
                    {new Date(log.created_at).toLocaleString()}
                  </td>
                  <td style={{ padding: '12px' }}>
                    {!log.success && (
                      <button
                        onClick={() => handleRetry(log.session_id)}
                        style={{
                          padding: '6px 12px',
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                          color: '#e8eaed',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <RotateCw size={14} />
                        <span>Retry</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
