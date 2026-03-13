'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { Session } from '@/types';
import { RefreshCw, Eye, Search, Calendar } from 'lucide-react';
import { CustomSelect } from '@/components/CustomSelect';
import { CustomDatePicker } from '@/components/CustomDatePicker';
import { Loading } from '@/components/Loading';

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [stateFilter, setStateFilter] = useState('');
  const [riskFilter, setRiskFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const router = useRouter();

  useEffect(() => {
    loadSessions();
  }, [stateFilter, riskFilter, searchQuery, dateFrom, dateTo]);

  const loadSessions = async () => {
    setLoading(true);
    try {
      const params: any = { limit: 100 };
      if (stateFilter) params.state = stateFilter;
      if (riskFilter) params.risk_level = riskFilter;
      const data = await api.getSessions(params);
      
      // Client-side filtering for search and date range
      let filtered = data;
      if (searchQuery) {
        filtered = filtered.filter((s: any) => 
          s.session_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.user_id.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      if (dateFrom) {
        filtered = filtered.filter((s: any) => new Date(s.created_at) >= new Date(dateFrom));
      }
      if (dateTo) {
        filtered = filtered.filter((s: any) => new Date(s.created_at) <= new Date(dateTo));
      }
      
      setSessions(filtered);
    } catch (error) {
      console.error('Failed to load sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '32px', marginBottom: '30px', color: '#e8eaed' }}>Sessions</h1>

      <div style={{
        background: '#161B22',
        padding: '20px',
        borderRadius: '12px',
        border: '1px solid #374151',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
        marginBottom: '20px',
      }}>
        {/* Search Bar */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#e8eaed' }}>Search Session ID / User ID</label>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by session ID or user ID..."
              style={{
                width: '100%',
                padding: '10px 10px 10px 40px',
                background: '#0d1117',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#e8eaed',
                fontSize: '14px',
              }}
            />
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#e8eaed' }}>Risk Level</label>
            <CustomSelect
              value={riskFilter}
              onChange={setRiskFilter}
              options={[
                { value: '', label: 'All Risk Levels' },
                { value: 'VERIFIED', label: 'VERIFIED' },
                { value: 'SUSPICIOUS', label: 'SUSPICIOUS' },
                { value: 'HIGH_RISK', label: 'HIGH_RISK' },
              ]}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#e8eaed' }}>Status</label>
            <CustomSelect
              value={stateFilter}
              onChange={setStateFilter}
              options={[
                { value: '', label: 'All States' },
                { value: 'PENDING', label: 'PENDING' },
                { value: 'PROCESSING', label: 'PROCESSING' },
                { value: 'COMPLETED', label: 'COMPLETED' },
                { value: 'FAILED', label: 'FAILED' },
              ]}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#e8eaed' }}>Date From</label>
            <CustomDatePicker
              value={dateFrom}
              onChange={setDateFrom}
              placeholder="From date"
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#e8eaed' }}>Date To</label>
            <CustomDatePicker
              value={dateTo}
              onChange={setDateTo}
              placeholder="To date"
            />
          </div>
        </div>

        <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
          <button
            onClick={loadSessions}
            style={{
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#e8eaed',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <RefreshCw size={16} />
            <span>Apply Filters</span>
          </button>
          <button
            onClick={() => {
              setSearchQuery('');
              setStateFilter('');
              setRiskFilter('');
              setDateFrom('');
              setDateTo('');
            }}
            style={{
              padding: '10px 20px',
              background: '#374151',
              color: '#e8eaed',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
            }}
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div style={{
        background: '#161B22',
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid #374151',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
        maxHeight: '600px',
        overflowY: 'auto',
      }}>
        {loading ? (
          <Loading message="Loading sessions..." />
        ) : sessions.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#9ca3af' }}>No sessions found</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #374151' }}>
                <th style={{ padding: '12px', textAlign: 'left', color: '#9ca3af', fontSize: '14px' }}>Session ID</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#9ca3af', fontSize: '14px' }}>User ID</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#9ca3af', fontSize: '14px' }}>State</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#9ca3af', fontSize: '14px' }}>Risk Level</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#9ca3af', fontSize: '14px' }}>Score</th>
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
                      background: session.state === 'COMPLETED' ? 'rgba(16, 185, 129, 0.1)' : 
                                 session.state === 'FAILED' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                      color: session.state === 'COMPLETED' ? '#10b981' : 
                             session.state === 'FAILED' ? '#ef4444' : '#f59e0b',
                      border: `1px solid ${session.state === 'COMPLETED' ? '#10b981' : session.state === 'FAILED' ? '#ef4444' : '#f59e0b'}`,
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
                        color: session.risk_level === 'VERIFIED' ? '#10b981' : 
                               session.risk_level === 'SUSPICIOUS' ? '#f59e0b' : '#ef4444',
                        border: `1px solid ${session.risk_level === 'VERIFIED' ? '#10b981' : session.risk_level === 'SUSPICIOUS' ? '#f59e0b' : '#ef4444'}`,
                      }}>
                        {session.risk_level}
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '12px', fontSize: '13px', color: '#e8eaed' }}>
                    {session.authenticity_score ? (session.authenticity_score * 100).toFixed(0) + '%' : '-'}
                  </td>
                  <td style={{ padding: '12px', fontSize: '13px', color: '#9ca3af' }}>
                    {new Date(session.created_at).toLocaleString()}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <button
                      onClick={() => router.push(`/dashboard/sessions/${session.session_id}`)}
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
                      <Eye size={14} />
                      <span>View</span>
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
