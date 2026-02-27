'use client';
import { useEffect, useState } from 'react';
import { UserPlus, Edit, Trash2, Crown, Search as SearchIcon, Eye } from 'lucide-react';
import { api } from '@/lib/api';
import { toast } from '@/components/Toast';
import { confirm } from '@/components/ConfirmDialog';
import { Loading } from '@/components/Loading';

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [formData, setFormData] = useState({ email: '', password: '', role: 'VIEWER', tenant_id: 'default' });

  useEffect(() => {
    loadUsers();
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

  if (loading) return <Loading message="Loading users..." />;

  return (
    <div>
      <h1 style={{ fontSize: '32px', marginBottom: '30px', color: '#e8eaed' }}>Users & Roles</h1>

      <div style={{
        background: '#1a1f2e',
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid #374151',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
        marginBottom: '20px',
      }}>
        <h2 style={{ fontSize: '20px', marginBottom: '20px', color: '#e8eaed' }}>Analyst Activity</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          <div style={{ padding: '20px', border: '2px solid #10b981', borderRadius: '8px', background: '#0f1419' }}>
            <div style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '8px' }}>Reviews Today</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981' }}>24</div>
          </div>

          <div style={{ padding: '20px', border: '2px solid #10b981', borderRadius: '8px', background: '#0f1419' }}>
            <div style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '8px' }}>Approval Rate</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981' }}>87%</div>
          </div>

          <div style={{ padding: '20px', border: '2px solid #f59e0b', borderRadius: '8px', background: '#0f1419' }}>
            <div style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '8px' }}>Escalations</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f59e0b' }}>3</div>
          </div>
        </div>
      </div>

      <div style={{
        background: '#1a1f2e',
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid #374151',
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
            <tr style={{ borderBottom: '2px solid #374151' }}>
              <th style={{ padding: '12px', textAlign: 'left', color: '#9ca3af', fontSize: '14px' }}>ID</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#9ca3af', fontSize: '14px' }}>Username</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#9ca3af', fontSize: '14px' }}>Email</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#9ca3af', fontSize: '14px' }}>Role</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#9ca3af', fontSize: '14px' }}>Tenant</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#9ca3af', fontSize: '14px' }}>Created</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#9ca3af', fontSize: '14px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} style={{ borderBottom: '1px solid #374151' }}>
                <td style={{ padding: '12px', fontSize: '13px', color: '#e8eaed' }}>{user.id}</td>
                <td style={{ padding: '12px', fontSize: '13px', fontWeight: '600', color: '#e8eaed' }}>{user.username}</td>
                <td style={{ padding: '12px', fontSize: '13px', color: '#e8eaed' }}>{user.email}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    background: user.role === 'ADMIN' ? 'rgba(6, 182, 212, 0.1)' : 
                               user.role === 'ANALYST' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(156, 163, 175, 0.1)',
                    color: user.role === 'ADMIN' ? '#06b6d4' : 
                           user.role === 'ANALYST' ? '#f59e0b' : '#9ca3af',
                    border: `1px solid ${user.role === 'ADMIN' ? '#06b6d4' : user.role === 'ANALYST' ? '#f59e0b' : '#9ca3af'}`,
                  }}>
                    {user.role}
                  </span>
                </td>
                <td style={{ padding: '12px', fontSize: '13px', color: '#e8eaed' }}>{user.tenant_id}</td>
                <td style={{ padding: '12px', fontSize: '13px', color: '#9ca3af' }}>
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                <td style={{ padding: '12px' }}>
                  <button
                    onClick={() => openEditModal(user)}
                    style={{
                      padding: '6px 12px',
                      background: '#2d3548',
                      color: '#e8eaed',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      marginRight: '8px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <Edit size={14} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id, user.email)}
                    style={{
                      padding: '6px 12px',
                      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                      color: '#e8eaed',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <Trash2 size={14} />
                    <span>Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{
        background: '#1a1f2e',
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid #374151',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
      }}>
        <h2 style={{ fontSize: '20px', marginBottom: '20px', color: '#e8eaed' }}>Role Permissions</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          <div style={{ padding: '20px', border: '2px solid #10b981', borderRadius: '8px', background: '#0f1419' }}>
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

          <div style={{ padding: '20px', border: '2px solid #f59e0b', borderRadius: '8px', background: '#0f1419' }}>
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

          <div style={{ padding: '20px', border: '2px solid #9ca3af', borderRadius: '8px', background: '#0f1419' }}>
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
            background: '#1a1f2e',
            padding: '30px',
            borderRadius: '12px',
            width: '500px',
            maxWidth: '90%',
          }}>
            <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#e8eaed' }}>Add New User</h2>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#e8eaed' }}>Username</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  fontSize: '14px',
                  background: '#2d3548',
                  color: '#e8eaed',
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#e8eaed' }}>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  fontSize: '14px',
                  background: '#2d3548',
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
                  padding: '10px',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  fontSize: '14px',
                  background: '#2d3548',
                  color: '#e8eaed',
                }}
              >
                <option value="VIEWER">VIEWER</option>
                <option value="ANALYST">ANALYST</option>
                <option value="ADMIN">ADMIN</option>
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
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  fontSize: '14px',
                  background: '#2d3548',
                  color: '#e8eaed',
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowAddModal(false)}
                style={{
                  padding: '10px 20px',
                  background: '#2d3548',
                  border: '1px solid #374151',
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
            background: '#1a1f2e',
            padding: '30px',
            borderRadius: '12px',
            width: '500px',
            maxWidth: '90%',
          }}>
            <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#e8eaed' }}>Edit User</h2>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#e8eaed' }}>Username</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  fontSize: '14px',
                  background: '#2d3548',
                  color: '#e8eaed',
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#e8eaed' }}>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  fontSize: '14px',
                  background: '#2d3548',
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
                  padding: '10px',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  fontSize: '14px',
                  background: '#2d3548',
                  color: '#e8eaed',
                }}
              >
                <option value="VIEWER">VIEWER</option>
                <option value="ANALYST">ANALYST</option>
                <option value="ADMIN">ADMIN</option>
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
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  fontSize: '14px',
                  background: '#2d3548',
                  color: '#e8eaed',
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => { setShowEditModal(false); setSelectedUser(null); }}
                style={{
                  padding: '10px 20px',
                  background: '#2d3548',
                  border: '1px solid #374151',
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
