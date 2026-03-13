'use client';
import { useEffect, useState } from 'react';
import { UserPlus, Edit, Trash2, Crown, Search as SearchIcon, Eye } from 'lucide-react';
import { api } from '@/lib/api';
import { toast } from '@/components/Toast';
import { confirm } from '@/components/ConfirmDialog';
import { Loading } from '@/components/Loading';
import { CustomSelect } from '@/components/CustomSelect';

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [analystActivity, setAnalystActivity] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [formData, setFormData] = useState({ email: '', password: '', role: 'VIEWER', tenant_id: 'default' });

  useEffect(() => {
    loadUsers();
    loadAnalystActivity();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await api.getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAnalystActivity = async () => {
    try {
      const data = await api.getAnalystActivity();
      setAnalystActivity(data);
    } catch (error) {
      console.error('Failed to load analyst activity:', error);
    }
  };

  const handleAddUser = async () => {
    try {
      await api.createUser(formData);
      toast.success('User created successfully');
      setFormData({ email: '', password: '', role: 'VIEWER', tenant_id: 'default' });
      setShowAddModal(false);
      loadUsers();
    } catch (error: any) {
      toast.error(error.message || 'Failed to create user');
    }
  };

  const handleEditUser = async () => {
    try {
      await api.updateUser(selectedUser.id, formData);
      toast.success('User updated successfully');
      setShowEditModal(false);
      setSelectedUser(null);
      setFormData({ email: '', password: '', role: 'VIEWER', tenant_id: 'default' });
      loadUsers();
    } catch (error: any) {
      toast.error(error.message || 'Failed to update user');
    }
  };

  const handleDeleteUser = async (id: string, email: string) => {
    const confirmed = await confirm(
      'Delete User',
      `Are you sure you want to delete ${email}? This action cannot be undone.`
    );
    
    if (confirmed) {
      try {
        await api.deleteUser(id);
        toast.success('User deleted successfully');
        loadUsers();
      } catch (error: any) {
        toast.error(error.message || 'Failed to delete user');
      }
    }
  };

  const openEditModal = (user: any) => {
    setSelectedUser(user);
    setFormData({ email: user.email, password: '', role: user.role, tenant_id: user.tenant_id });
    setShowEditModal(true);
  };

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '100px 20px' }}>
      <div style={{ fontSize: '48px', marginBottom: '20px' }}>⚡</div>
      <div style={{ fontSize: '18px', color: '#10b981', marginBottom: '10px' }}>Loading users...</div>
      <div style={{ fontSize: '14px', color: '#9ca3af' }}>Fetching data from database</div>
    </div>
  );

  return (
    <div>
      <h1 style={{ fontSize: '32px', marginBottom: '30px', color: '#e8eaed' }}>Users & Roles</h1>

      <div style={{
        background: '#161B22',
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid rgba(16, 185, 129, 0.2)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
        marginBottom: '20px',
      }}>
        <h2 style={{ fontSize: '20px', marginBottom: '20px', color: '#e8eaed' }}>Analyst Activity</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          <div style={{ padding: '20px', border: '2px solid #10b981', borderRadius: '8px', background: '#161B22' }}>
            <div style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '8px' }}>Reviews Today</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981' }}>{analystActivity?.reviews_today || 0}</div>
          </div>

          <div style={{ padding: '20px', border: '2px solid #10b981', borderRadius: '8px', background: '#161B22' }}>
            <div style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '8px' }}>Approval Rate</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981' }}>{analystActivity?.approval_rate || 0}%</div>
          </div>

          <div style={{ padding: '20px', border: '2px solid #f59e0b', borderRadius: '8px', background: '#161B22' }}>
            <div style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '8px' }}>Escalations</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f59e0b' }}>{analystActivity?.escalations || 0}</div>
          </div>
        </div>
      </div>

      <div style={{
        background: '#161B22',
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid rgba(16, 185, 129, 0.2)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
        marginBottom: '20px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '20px', color: '#e8eaed' }}>User Management</h2>
          <button
            onClick={() => setShowAddModal(true)}
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
            <UserPlus size={18} />
            <span>Add User</span>
          </button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid rgba(16, 185, 129, 0.2)' }}>
              <th style={{ padding: '12px', textAlign: 'left', color: '#9ca3af', fontSize: '14px' }}>Email</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#9ca3af', fontSize: '14px' }}>Role</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#9ca3af', fontSize: '14px' }}>Tenant</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#9ca3af', fontSize: '14px' }}>Last Login</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#9ca3af', fontSize: '14px' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#9ca3af', fontSize: '14px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} style={{ 
                borderBottom: '1px solid rgba(16, 185, 129, 0.2)',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(16, 185, 129, 0.05)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <td style={{ padding: '12px', fontSize: '13px', fontWeight: '600', color: '#e8eaed' }}>{user.email}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '600',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: user.role === 'ADMIN' ? 'rgba(16, 185, 129, 0.1)' : 
                               user.role === 'ANALYST' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(107, 114, 128, 0.1)',
                    color: user.role === 'ADMIN' ? '#10B981' : 
                           user.role === 'ANALYST' ? '#F59E0B' : '#6B7280',
                    border: `1px solid ${user.role === 'ADMIN' ? '#10B981' : user.role === 'ANALYST' ? '#F59E0B' : '#6B7280'}`,
                  }}>
                    {user.role === 'ADMIN' && <Crown size={14} />}
                    {user.role === 'ANALYST' && <SearchIcon size={14} />}
                    {user.role === 'VIEWER' && <Eye size={14} />}
                    {user.role}
                  </span>
                </td>
                <td style={{ padding: '12px', fontSize: '13px', color: '#e8eaed' }}>{user.tenant_id}</td>
                <td style={{ padding: '12px', fontSize: '13px', color: '#9ca3af' }}>
                  {user.last_login ? new Date(user.last_login).toLocaleDateString() : 'Never'}
                </td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    background: user.is_active ? 'rgba(16, 185, 129, 0.1)' : 'rgba(107, 114, 128, 0.1)',
                    color: user.is_active ? '#10b981' : '#6b7280',
                    border: `1px solid ${user.is_active ? '#10b981' : '#6b7280'}`,
                  }}>
                    {user.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td style={{ padding: '12px', display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => openEditModal(user)}
                    style={{
                      padding: '6px 12px',
                      background: '#1F2937',
                      color: '#9CA3AF',
                      border: '1px solid rgba(16, 185, 129, 0.2)',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#374151';
                      e.currentTarget.style.color = '#E5E7EB';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#1F2937';
                      e.currentTarget.style.color = '#9CA3AF';
                    }}
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id, user.email)}
                    style={{
                      padding: '6px 12px',
                      background: 'transparent',
                      color: '#6B7280',
                      border: '1px solid transparent',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                      e.currentTarget.style.color = '#EF4444';
                      e.currentTarget.style.borderColor = '#EF4444';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#6B7280';
                      e.currentTarget.style.borderColor = 'transparent';
                    }}
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{
        background: '#161B22',
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid rgba(16, 185, 129, 0.2)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
      }}>
        <h2 style={{ fontSize: '20px', marginBottom: '20px', color: '#e8eaed' }}>Role Permissions</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          <div style={{ padding: '20px', border: '2px solid #10b981', borderRadius: '8px', background: '#161B22' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Crown size={20} color="#10b981" />
              <h3 style={{ fontSize: '16px', color: '#10b981' }}>ADMIN</h3>
            </div>
            <ul style={{ fontSize: '13px', color: '#9ca3af', lineHeight: '1.8', paddingLeft: '20px' }}>
              <li>Full system access</li>
              <li>Manage users & roles</li>
              <li>Configure settings</li>
              <li>View all sessions</li>
              <li>Manage webhooks</li>
            </ul>
          </div>

          <div style={{ padding: '20px', border: '2px solid #f59e0b', borderRadius: '8px', background: '#161B22' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <SearchIcon size={20} color="#f59e0b" />
              <h3 style={{ fontSize: '16px', color: '#f59e0b' }}>ANALYST</h3>
            </div>
            <ul style={{ fontSize: '13px', color: '#9ca3af', lineHeight: '1.8', paddingLeft: '20px' }}>
              <li>View sessions</li>
              <li>Review queue access</li>
              <li>View audit logs</li>
              <li>Export reports</li>
            </ul>
          </div>

          <div style={{ padding: '20px', border: '2px solid #9ca3af', borderRadius: '8px', background: '#161B22' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Eye size={20} color="#9ca3af" />
              <h3 style={{ fontSize: '16px', color: '#9ca3af' }}>VIEWER</h3>
            </div>
            <ul style={{ fontSize: '13px', color: '#9ca3af', lineHeight: '1.8', paddingLeft: '20px' }}>
              <li>View sessions (read-only)</li>
              <li>View dashboard</li>
              <li>Basic reporting</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            background: '#161B22',
            padding: '30px',
            borderRadius: '12px',
            width: '500px',
            maxWidth: '90%',
          }}>
            <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#e8eaed' }}>Add New User</h2>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#e8eaed' }}>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  background: '#111827',
                  color: '#e8eaed',
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#e8eaed' }}>Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  background: '#111827',
                  color: '#e8eaed',
                  cursor: 'pointer',
                  appearance: 'none',
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%2310b981\' d=\'M6 9L1 4h10z\'/%3E%3C/svg%3E")',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                  paddingRight: '36px',
                }}
              >
                <option value="VIEWER" style={{ background: '#161B22', color: '#E5E7EB', padding: '10px' }}>VIEWER</option>
                <option value="ANALYST" style={{ background: '#161B22', color: '#E5E7EB', padding: '10px' }}>ANALYST</option>
                <option value="ADMIN" style={{ background: '#161B22', color: '#E5E7EB', padding: '10px' }}>ADMIN</option>
              </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#e8eaed' }}>Tenant ID</label>
              <input
                type="text"
                value={formData.tenant_id}
                onChange={(e) => setFormData({ ...formData, tenant_id: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  background: '#111827',
                  color: '#e8eaed',
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowAddModal(false)}
                style={{
                  padding: '10px 20px',
                  background: '#111827',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#e8eaed',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                style={{
                  padding: '10px 20px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: '#e8eaed',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                }}
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            background: '#161B22',
            padding: '30px',
            borderRadius: '12px',
            width: '500px',
            maxWidth: '90%',
          }}>
            <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#e8eaed' }}>Edit User</h2>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#e8eaed' }}>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  background: '#111827',
                  color: '#e8eaed',
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#e8eaed' }}>Role</label>
              <CustomSelect
                value={formData.role}
                onChange={(value) => setFormData({ ...formData, role: value })}
                options={[
                  { value: 'VIEWER', label: 'VIEWER' },
                  { value: 'ANALYST', label: 'ANALYST' },
                  { value: 'ADMIN', label: 'ADMIN' },
                ]}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#e8eaed' }}>Tenant ID</label>
              <input
                type="text"
                value={formData.tenant_id}
                onChange={(e) => setFormData({ ...formData, tenant_id: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  background: '#111827',
                  color: '#e8eaed',
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => { setShowEditModal(false); setSelectedUser(null); }}
                style={{
                  padding: '10px 20px',
                  background: '#111827',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#e8eaed',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleEditUser}
                style={{
                  padding: '10px 20px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: '#e8eaed',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
