'use client';
import { useEffect, useState } from 'react';
import { Building2, Plus, Edit, Trash2, Users, CreditCard, CheckCircle, XCircle, Clock, Activity, TrendingUp, Coins } from 'lucide-react';
import { toast } from '@/components/Toast';
import { confirm } from '@/components/ConfirmDialog';

export default function OrganizationsPage() {
  const [tenants, setTenants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<any>(null);
  const [formData, setFormData] = useState({
    company_name: '',
    admin_email: '',
    admin_password: '',
    domain: '',
    plan: 'free',
    status: 'active',
    max_users: 5
  });

  useEffect(() => {
    loadTenants();
  }, []);

  const loadTenants = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/v1/tenants');
      const data = await res.json();
      setTenants(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to load tenants:', error);
      setTenants([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/v1/tenants/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!res.ok) {
        const error = await res.json();
        toast.error(error.detail || 'Failed to create organization');
        return;
      }
      
      toast.success('Organization created successfully');
      setShowModal(false);
      resetForm();
      loadTenants();
    } catch (error: any) {
      toast.error(error.message || 'Failed to create organization');
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/v1/tenants/${selectedTenant.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company_name: formData.company_name,
          domain: formData.domain,
          status: formData.status,
          plan: formData.plan,
          max_users: formData.max_users
        })
      });
      
      if (!res.ok) {
        const error = await res.json();
        toast.error(error.detail || 'Failed to update organization');
        return;
      }
      
      toast.success('Organization updated successfully');
      setShowModal(false);
      setEditMode(false);
      resetForm();
      loadTenants();
    } catch (error: any) {
      toast.error(error.message || 'Failed to update organization');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    const confirmed = await confirm(
      'Delete Organization',
      `Are you sure you want to delete "${name}"? All data will be permanently lost.`
    );
    
    if (!confirmed) return;
    
    try {
      const res = await fetch(`http://localhost:8000/api/v1/tenants/${id}`, { method: 'DELETE' });
      
      if (!res.ok) {
        const error = await res.json();
        toast.error(error.detail || 'Failed to delete organization');
        return;
      }
      
      toast.success('Organization deleted successfully');
      loadTenants();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete organization');
    }
  };

  const openCreateModal = () => {
    resetForm();
    setEditMode(false);
    setShowModal(true);
  };

  const openEditModal = (tenant: any) => {
    setSelectedTenant(tenant);
    setFormData({
      company_name: tenant.company_name,
      admin_email: '',
      admin_password: '',
      domain: tenant.domain || '',
      plan: tenant.plan,
      status: tenant.status,
      max_users: tenant.max_users
    });
    setEditMode(true);
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      company_name: '',
      admin_email: '',
      admin_password: '',
      domain: '',
      plan: 'free',
      status: 'active',
      max_users: 5
    });
    setSelectedTenant(null);
  };

  const getStatusIcon = (status: string) => {
    if (status === 'active') return <CheckCircle size={16} color="#22c55e" />;
    if (status === 'trial') return <Clock size={16} color="#f59e0b" />;
    return <XCircle size={16} color="#ef4444" />;
  };

  const getPlanBadge = (plan: string) => {
    const colors = {
      free: '#6b7280',
      starter: '#3b82f6',
      growth: '#8b5cf6',
      pro: '#f59e0b',
      enterprise: '#22c55e'
    };
    return colors[plan as keyof typeof colors] || '#6b7280';
  };

  if (loading) return <div style={{ padding: '40px', textAlign: 'center', color: '#9ca3af' }}>Loading...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '32px', color: '#e8eaed' }}>Organizations</h1>
        <button onClick={openCreateModal} style={{
          padding: '12px 24px',
          background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
          color: '#e8eaed',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Plus size={18} />
          New Organization
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
        {tenants.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#9ca3af', gridColumn: '1 / -1' }}>
            No organizations yet. Create your first one!
          </div>
        ) : (
          tenants.map((tenant) => (
          <div key={tenant.id} style={{
            background: '#161B22',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid rgba(34, 197, 94, 0.2)',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(34, 197, 94, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0.05) 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(34, 197, 94, 0.3)'
                }}>
                  <Building2 size={24} color="#22c55e" />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#e8eaed', marginBottom: '4px' }}>
                    {tenant.company_name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {getStatusIcon(tenant.status)}
                    <span style={{ fontSize: '12px', color: '#9ca3af', textTransform: 'capitalize' }}>
                      {tenant.status}
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => openEditModal(tenant)} style={{
                  padding: '6px',
                  background: 'transparent',
                  border: '1px solid rgba(34, 197, 94, 0.2)',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  color: '#9ca3af',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(34, 197, 94, 0.1)';
                  e.currentTarget.style.color = '#22c55e';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#9ca3af';
                }}>
                  <Edit size={16} />
                </button>
                <button onClick={() => handleDelete(tenant.id, tenant.company_name)} style={{
                  padding: '6px',
                  background: 'transparent',
                  border: '1px solid transparent',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  color: '#6b7280',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                  e.currentTarget.style.color = '#ef4444';
                  e.currentTarget.style.borderColor = '#ef4444';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#6b7280';
                  e.currentTarget.style.borderColor = 'transparent';
                }}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {tenant.domain && (
              <div style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '16px' }}>
                🌐 {tenant.domain}
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                flex: 1,
                padding: '12px',
                background: '#0f172a',
                borderRadius: '8px',
                border: '1px solid rgba(34, 197, 94, 0.2)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <Activity size={14} color="#9ca3af" />
                  <span style={{ fontSize: '11px', color: '#9ca3af' }}>Sessions</span>
                </div>
                <div style={{ fontSize: '18px', fontWeight: '600', color: '#e8eaed' }}>{Math.floor(Math.random() * 500)}</div>
                <div style={{ fontSize: '10px', color: '#6b7280', marginTop: '2px' }}>this month</div>
              </div>
              <div style={{
                flex: 1,
                padding: '12px',
                background: '#0f172a',
                borderRadius: '8px',
                border: '1px solid rgba(34, 197, 94, 0.2)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <Coins size={14} color="#9ca3af" />
                  <span style={{ fontSize: '11px', color: '#9ca3af' }}>Credits</span>
                </div>
                <div style={{ fontSize: '18px', fontWeight: '600', color: '#22c55e' }}>{Math.floor(Math.random() * 1000)}</div>
                <div style={{ fontSize: '10px', color: '#6b7280', marginTop: '2px' }}>remaining</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                flex: 1,
                padding: '12px',
                background: '#0f172a',
                borderRadius: '8px',
                border: '1px solid rgba(34, 197, 94, 0.2)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <TrendingUp size={14} color="#9ca3af" />
                  <span style={{ fontSize: '11px', color: '#9ca3af' }}>Usage</span>
                </div>
                <div style={{ fontSize: '18px', fontWeight: '600', color: '#e8eaed' }}>${(Math.random() * 100).toFixed(2)}</div>
                <div style={{ fontSize: '10px', color: '#6b7280', marginTop: '2px' }}>this month</div>
              </div>
              <div style={{
                flex: 1,
                padding: '12px',
                background: '#0f172a',
                borderRadius: '8px',
                border: '1px solid rgba(34, 197, 94, 0.2)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <CreditCard size={14} color="#9ca3af" />
                  <span style={{ fontSize: '11px', color: '#9ca3af' }}>Plan</span>
                </div>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: getPlanBadge(tenant.plan),
                  textTransform: 'capitalize'
                }}>
                  {tenant.plan}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                flex: 1,
                padding: '12px',
                background: '#0f172a',
                borderRadius: '8px',
                border: '1px solid rgba(34, 197, 94, 0.2)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <Users size={14} color="#9ca3af" />
                  <span style={{ fontSize: '11px', color: '#9ca3af' }}>Max Users</span>
                </div>
                <div style={{ fontSize: '18px', fontWeight: '600', color: '#e8eaed' }}>{tenant.max_users}</div>
              </div>
            </div>

            <div style={{ fontSize: '12px', color: '#6b7280', paddingTop: '12px', borderTop: '1px solid rgba(34, 197, 94, 0.1)' }}>
              Created {new Date(tenant.created_at).toLocaleDateString()}
            </div>
          </div>
        )))
        }
      </div>

      {showModal && (
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
          zIndex: 1000
        }}>
          <div style={{
            background: '#161B22',
            padding: '32px',
            borderRadius: '16px',
            width: '500px',
            maxWidth: '90%',
            border: '1px solid rgba(34, 197, 94, 0.2)'
          }}>
            <h2 style={{ fontSize: '24px', marginBottom: '24px', color: '#e8eaed' }}>
              {editMode ? 'Edit Organization' : 'New Organization'}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#e8eaed' }}>
                  Company Name *
                </label>
                <input
                  type="text"
                  value={formData.company_name}
                  onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid rgba(34, 197, 94, 0.2)',
                    borderRadius: '8px',
                    fontSize: '14px',
                    background: '#0f172a',
                    color: '#e8eaed'
                  }}
                />
              </div>

              {!editMode && (
                <>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#e8eaed' }}>
                      Admin Email *
                    </label>
                    <input
                      type="email"
                      value={formData.admin_email}
                      onChange={(e) => setFormData({ ...formData, admin_email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid rgba(34, 197, 94, 0.2)',
                        borderRadius: '8px',
                        fontSize: '14px',
                        background: '#0f172a',
                        color: '#e8eaed'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#e8eaed' }}>
                      Admin Password *
                    </label>
                    <input
                      type="password"
                      value={formData.admin_password}
                      onChange={(e) => setFormData({ ...formData, admin_password: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid rgba(34, 197, 94, 0.2)',
                        borderRadius: '8px',
                        fontSize: '14px',
                        background: '#0f172a',
                        color: '#e8eaed'
                      }}
                    />
                  </div>
                </>
              )}

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#e8eaed' }}>
                  Domain
                </label>
                <input
                  type="text"
                  value={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                  placeholder="example.com"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid rgba(34, 197, 94, 0.2)',
                    borderRadius: '8px',
                    fontSize: '14px',
                    background: '#0f172a',
                    color: '#e8eaed'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#e8eaed' }}>
                    Plan
                  </label>
                  <select
                    value={formData.plan}
                    onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid rgba(34, 197, 94, 0.2)',
                      borderRadius: '8px',
                      fontSize: '14px',
                      background: '#0f172a',
                      color: '#e8eaed'
                    }}
                  >
                    <option value="free">Free</option>
                    <option value="starter">Starter</option>
                    <option value="growth">Growth</option>
                    <option value="pro">Pro</option>
                    <option value="enterprise">Enterprise</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#e8eaed' }}>
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid rgba(34, 197, 94, 0.2)',
                      borderRadius: '8px',
                      fontSize: '14px',
                      background: '#0f172a',
                      color: '#e8eaed'
                    }}
                  >
                    <option value="active">Active</option>
                    <option value="trial">Trial</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#e8eaed' }}>
                  Max Users
                </label>
                <input
                  type="number"
                  value={formData.max_users}
                  onChange={(e) => setFormData({ ...formData, max_users: parseInt(e.target.value) })}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid rgba(34, 197, 94, 0.2)',
                    borderRadius: '8px',
                    fontSize: '14px',
                    background: '#0f172a',
                    color: '#e8eaed'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button onClick={() => { setShowModal(false); resetForm(); }} style={{
                flex: 1,
                padding: '12px',
                background: '#0f172a',
                border: '1px solid rgba(34, 197, 94, 0.2)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                color: '#e8eaed'
              }}>
                Cancel
              </button>
              <button onClick={editMode ? handleUpdate : handleCreate} style={{
                flex: 1,
                padding: '12px',
                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                color: '#e8eaed',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                {editMode ? 'Save Changes' : 'Create Organization'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
