'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { AuditLog } from '@/types';
import { RefreshCw } from 'lucide-react';
import { CustomSelect } from '@/components/CustomSelect';
import { Loading } from '@/components/Loading';

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionFilter, setActionFilter] = useState('');

  useEffect(() => {
    loadLogs();
  }, [actionFilter]);

  const loadLogs = async () => {
    setLoading(true);
    try {
      const params: any = { limit: 100 };
      if (actionFilter) params.action = actionFilter;
      const data = await api.getAuditLogs(params);
      setLogs(data);
    } catch (error) {
      console.error('Failed to load audit logs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '32px', marginBottom: '30px', color: '#e8eaed' }}>Audit Logs</h1>

      <div style={{
        background: 'rgba(26, 31, 46, 0.6)',
        backdropFilter: 'blur(10px)',
        padding: '20px',
        borderRadius: '12px',
        border: '1px solid rgba(16, 185, 129, 0.2)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
        marginBottom: '20px',
        display: 'flex',
        gap: '20px',
      }}>
        <div style={{ flex: 1, position: 'relative', zIndex: 10 }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#e8eaed' }}>Action</label>
          <CustomSelect
            value={actionFilter}
            onChange={setActionFilter}
            options={[
              { value: '', label: 'All Actions' },
              { value: 'session.created', label: 'Session Created' },
              { value: 'video.uploaded', label: 'Video Uploaded' },
              { value: 'result.viewed', label: 'Result Viewed' },
              { value: 'settings.updated', label: 'Settings Updated' },
            ]}
          />
        </div>

        <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', position: 'relative', zIndex: 9 }}>
          <button
            onClick={loadLogs}
            style={{
              width: '100%',
              padding: '10px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#e8eaed',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <RefreshCw size={16} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      <div style={{
        background: 'rgba(26, 31, 46, 0.6)',
        backdropFilter: 'blur(10px)',
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid rgba(16, 185, 129, 0.2)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
      }}>
        {loading ? (
          <Loading message="Loading audit logs..." />
        ) : logs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#9ca3af' }}>No audit logs found</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #374151' }}>
                <th style={{ padding: '12px', textAlign: 'left', color: '#9ca3af', fontSize: '14px' }}>ID</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#9ca3af', fontSize: '14px' }}>User</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#9ca3af', fontSize: '14px' }}>Action</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#9ca3af', fontSize: '14px' }}>Resource</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#9ca3af', fontSize: '14px' }}>Resource ID</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#9ca3af', fontSize: '14px' }}>Created</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} style={{ borderBottom: '1px solid #374151' }}>
                  <td style={{ padding: '12px', fontSize: '13px', color: '#e8eaed' }}>{log.id}</td>
                  <td style={{ padding: '12px', fontSize: '13px', color: '#e8eaed' }}>{log.user_id}</td>
                  <td style={{ padding: '12px', fontSize: '13px' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      background: 'rgba(16, 185, 129, 0.1)',
                      color: '#10b981',
                      border: '1px solid #10b981',
                    }}>
                      {log.action}
                    </span>
                  </td>
                  <td style={{ padding: '12px', fontSize: '13px', color: '#e8eaed' }}>{log.resource_type}</td>
                  <td style={{ padding: '12px', fontSize: '13px', fontFamily: 'monospace', color: '#e8eaed' }}>
                    {log.resource_id.substring(0, 8)}...
                  </td>
                  <td style={{ padding: '12px', fontSize: '13px', color: '#9ca3af' }}>
                    {new Date(log.created_at).toLocaleString()}
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
