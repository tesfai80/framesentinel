'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { Session } from '@/types';
import { CheckCircle, Eye, UserPlus } from 'lucide-react';
import { toast } from '@/components/Toast';
import { Loading } from '@/components/Loading';

export default function ReviewQueuePage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
    loadQueue();
  }, []);

  const loadQueue = async () => {
    try {
      const data = await api.getSessions({ limit: 50 });
      setSessions(data.filter((s: Session) => s.risk_level === 'SUSPICIOUS' && s.state === 'COMPLETED'));
    } catch (error) {
      console.error('Failed to load review queue:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async (sessionId: string) => {
    try {
      toast.success('Session assigned to you');
      loadQueue();
    } catch (error: any) {
      toast.error(error.message || 'Failed to assign session');
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '32px', marginBottom: '30px', color: '#e8eaed' }}>Review Queue</h1>
      <p style={{ color: '#9ca3af', marginBottom: '30px' }}>
        Sessions flagged as SUSPICIOUS requiring manual review
      </p>

      <div style={{
        background: '#161B22',
        backdropFilter: 'blur(10px)',
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid rgba(16, 185, 129, 0.2)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
      }}>
        {loading ? (
          <Loading message="Loading review queue..." />
        ) : sessions.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#9ca3af', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <CheckCircle size={48} color="#10b981" />
            <span>No sessions pending review</span>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #374151' }}>
                <th style={{ padding: '12px', textAlign: 'left', color: '#9ca3af', fontSize: '14px' }}>Session ID</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#9ca3af', fontSize: '14px' }}>User ID</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#9ca3af', fontSize: '14px' }}>Score</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#9ca3af', fontSize: '14px' }}>Status</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#9ca3af', fontSize: '14px' }}>Created</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#9ca3af', fontSize: '14px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => (
                <tr key={session.session_id} style={{ borderBottom: '1px solid #374151' }}>
                  <td style={{ padding: '12px', fontSize: '13px', fontFamily: 'monospace', color: '#e8eaed' }}>
                    {session.session_id.substring(0, 8)}...
                  </td>
                  <td style={{ padding: '12px', fontSize: '13px', color: '#e8eaed' }}>{session.user_id}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      background: 'rgba(245, 158, 11, 0.1)',
                      color: '#f59e0b',
                      border: '1px solid #f59e0b',
                      fontWeight: '600',
                    }}>
                      {session.authenticity_score ? (session.authenticity_score * 100).toFixed(0) + '%' : '-'}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      background: 'rgba(16, 185, 129, 0.1)',
                      color: '#10b981',
                      border: '1px solid #10b981',
                    }}>
                      Pending Review
                    </span>
                  </td>
                  <td style={{ padding: '12px', fontSize: '13px', color: '#9ca3af' }}>
                    {new Date(session.created_at).toLocaleString()}
                  </td>
                  <td style={{ padding: '12px', display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleAssign(session.session_id)}
                      style={{
                        padding: '6px 12px',
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        color: '#e8eaed',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <UserPlus size={14} />
                      <span>Assign to Me</span>
                    </button>
                    <button
                      onClick={() => router.push(`/dashboard/sessions/${session.session_id}`)}
                      style={{
                        padding: '6px 12px',
                        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                        color: '#0f1419',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <Eye size={14} />
                      <span>Review</span>
                    </button>
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
