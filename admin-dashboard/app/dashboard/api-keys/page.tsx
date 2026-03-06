'use client';
import { useEffect, useState } from 'react';
import { Key, Plus, Copy, Trash2, AlertCircle, CheckCircle } from 'lucide-react';
import { api } from '@/lib/api';
import { toast } from '@/components/Toast';
import { confirm } from '@/components/ConfirmDialog';
import { Loading } from '@/components/Loading';

interface APIKey {
  id: string;
  name: string;
  key_prefix: string;
  is_active: boolean;
  created_at: string;
  last_used_at: string | null;
  expires_at: string | null;
}

export default function APIKeysPage() {
  const [keys, setKeys] = useState<APIKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyValue, setNewKeyValue] = useState('');
  const [showNewKey, setShowNewKey] = useState(false);
  const [creating, setCreating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    loadKeys();
  }, []);

  const loadKeys = async () => {
    try {
      const data = await api.getAPIKeys();
      setKeys(data);
    } catch (error) {
      console.error('Failed to load API keys:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateKey = async () => {
    if (!newKeyName.trim()) {
      toast.error('Please enter a key name');
      return;
    }

    setCreating(true);
    try {
      const response = await api.createAPIKey({ name: newKeyName });
      setNewKeyValue(response.plain_key);
      setShowNewKey(true);
      toast.success('API key created successfully');
      loadKeys();
    } catch (error: any) {
      toast.error(error.message || 'Failed to create API key');
    } finally {
      setCreating(false);
    }
  };

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.success('API key copied to clipboard');
  };

  const handleRevokeKey = async (id: string, name: string) => {
    const confirmed = await confirm(
      'Revoke API Key',
      `Are you sure you want to revoke "${name}"? This action cannot be undone.`
    );

    if (confirmed) {
      try {
        await api.revokeAPIKey(id);
        toast.success('API key revoked successfully');
        loadKeys();
      } catch (error: any) {
        toast.error(error.message || 'Failed to revoke API key');
      }
    }
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
    setNewKeyName('');
    setNewKeyValue('');
    setShowNewKey(false);
  };

  if (loading) return <Loading message="Loading API keys..." />;

  return (
    <div style={{ padding: isMobile ? '16px' : '24px' }}>
      <div style={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between', 
        alignItems: isMobile ? 'stretch' : 'center',
        gap: isMobile ? '16px' : '0',
        marginBottom: '24px' 
      }}>
        <div>
          <h1 style={{ fontSize: isMobile ? '24px' : '32px', marginBottom: '8px', color: '#e8eaed' }}>
            API Keys
          </h1>
          <p style={{ color: '#9ca3af', fontSize: isMobile ? '13px' : '14px' }}>
            Manage your API keys for programmatic access
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          style={{
            padding: isMobile ? '12px 20px' : '10px 20px',
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
            width: isMobile ? '100%' : 'auto',
          }}
        >
          <Plus size={18} />
          <span>Create API Key</span>
        </button>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: isMobile ? '12px' : '20px' 
      }}>
        {keys.map((key) => (
          <div
            key={key.id}
            style={{
              background: '#161B22',
              padding: isMobile ? '16px' : '20px',
              borderRadius: '12px',
              border: `1px solid ${key.is_active ? 'rgba(16, 185, 129, 0.4)' : 'rgba(107, 114, 128, 0.3)'}`,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <Key size={16} color="#10b981" />
                  <h3 style={{ fontSize: isMobile ? '15px' : '16px', fontWeight: '600', color: '#e8eaed' }}>
                    {key.name}
                  </h3>
                </div>
                <div style={{ 
                  fontSize: isMobile ? '11px' : '12px', 
                  color: '#9ca3af',
                  fontFamily: 'monospace',
                  wordBreak: 'break-all'
                }}>
                  {key.key_prefix}
                </div>
              </div>
              <span style={{
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '11px',
                fontWeight: '600',
                background: key.is_active ? 'rgba(16, 185, 129, 0.1)' : 'rgba(107, 114, 128, 0.1)',
                color: key.is_active ? '#10b981' : '#6b7280',
                border: `1px solid ${key.is_active ? '#10b981' : '#6b7280'}`,
                height: 'fit-content',
              }}>
                {key.is_active ? 'Active' : 'Revoked'}
              </span>
            </div>

            <div style={{ fontSize: isMobile ? '11px' : '12px', color: '#6b7280', marginBottom: '12px' }}>
              <div>Created: {new Date(key.created_at).toLocaleDateString()}</div>
              {key.last_used_at && (
                <div>Last used: {new Date(key.last_used_at).toLocaleDateString()}</div>
              )}
            </div>

            {key.is_active && (
              <button
                onClick={() => handleRevokeKey(key.id, key.name)}
                style={{
                  width: '100%',
                  padding: isMobile ? '10px' : '8px',
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                  color: '#e8eaed',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: isMobile ? '13px' : '12px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <Trash2 size={14} />
                <span>Revoke Key</span>
              </button>
            )}
          </div>
        ))}
      </div>

      {keys.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: isMobile ? '40px 20px' : '60px 40px',
          background: '#161B22',
          borderRadius: '12px',
          border: '1px solid rgba(16, 185, 129, 0.2)',
        }}>
          <Key size={isMobile ? 40 : 48} color="#6b7280" style={{ marginBottom: '16px' }} />
          <h3 style={{ fontSize: isMobile ? '16px' : '18px', color: '#e8eaed', marginBottom: '8px' }}>
            No API Keys Yet
          </h3>
          <p style={{ fontSize: isMobile ? '13px' : '14px', color: '#9ca3af' }}>
            Create your first API key to start using the FrameSentinel API
          </p>
        </div>
      )}

      {showCreateModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: isMobile ? '16px' : '20px',
        }}>
          <div style={{
            background: '#111827',
            padding: isMobile ? '24px' : '30px',
            borderRadius: '12px',
            width: '100%',
            maxWidth: isMobile ? '100%' : '500px',
            border: '1px solid rgba(16, 185, 129, 0.2)',
          }}>
            {!showNewKey ? (
              <>
                <h2 style={{ fontSize: isMobile ? '20px' : '24px', marginBottom: '20px', color: '#e8eaed' }}>
                  Create API Key
                </h2>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#e8eaed' }}>
                    Key Name
                  </label>
                  <input
                    type="text"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    placeholder="Production API Key"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid rgba(16, 185, 129, 0.2)',
                      borderRadius: '8px',
                      fontSize: '14px',
                      background: '#111827',
                      color: '#E5E7EB',
                    }}
                  />
                </div>

                <div style={{ padding: '12px', background: 'rgba(6, 182, 212, 0.1)', border: '1px solid #06b6d4', borderRadius: '8px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
                    <AlertCircle size={16} color="#06b6d4" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <p style={{ fontSize: '13px', color: '#06b6d4', margin: 0 }}>
                      The API key will only be shown once. Make sure to copy and store it securely.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', flexDirection: isMobile ? 'column' : 'row' }}>
                  <button
                    onClick={closeCreateModal}
                    disabled={creating}
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: '#111827',
                      border: '1px solid rgba(16, 185, 129, 0.2)',
                      borderRadius: '8px',
                      cursor: creating ? 'not-allowed' : 'pointer',
                      fontSize: '14px',
                      color: '#E5E7EB',
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateKey}
                    disabled={creating || !newKeyName.trim()}
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: creating || !newKeyName.trim() ? '#6b7280' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: '#e8eaed',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: creating || !newKeyName.trim() ? 'not-allowed' : 'pointer',
                      fontSize: '14px',
                      fontWeight: '600',
                    }}
                  >
                    {creating ? 'Creating...' : 'Create Key'}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <CheckCircle size={56} color="#10b981" style={{ marginBottom: '16px' }} />
                  <h2 style={{ fontSize: '24px', marginBottom: '8px', color: '#e8eaed' }}>
                    API Key Created!
                  </h2>
                  <p style={{ fontSize: '14px', color: '#9ca3af' }}>
                    Copy your API key now. It won't be shown again.
                  </p>
                </div>

                <div style={{
                  background: '#111827',
                  padding: '16px',
                  borderRadius: '8px',
                  marginBottom: '16px',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                }}>
                  <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '8px', fontWeight: '600' }}>
                    Your API Key:
                  </div>
                  <div style={{
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    color: '#10b981',
                    wordBreak: 'break-all',
                    marginBottom: '12px',
                  }}>
                    {newKeyValue}
                  </div>
                  <button
                    onClick={() => handleCopyKey(newKeyValue)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: '#e8eaed',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                    }}
                  >
                    <Copy size={14} />
                    <span>Copy to Clipboard</span>
                  </button>
                </div>

                <button
                  onClick={closeCreateModal}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: '#111827',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: '#E5E7EB',
                  }}
                >
                  Done
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
