import React, { useState, useEffect } from 'react';
import { fetchUsers as apiFetchUsers } from '../lib/api';
import UserDetailModal from '../components/UserDetailModal';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await apiFetchUsers();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Users</h1>
      </div>

      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#F8FAFC' }}>
            <tr>
              <th style={{ padding: '16px', textAlign: 'left', color: '#64748B', fontWeight: 600, fontSize: '13px' }}>User</th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#64748B', fontWeight: 600, fontSize: '13px' }}>Location</th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#64748B', fontWeight: 600, fontSize: '13px' }}>Level</th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#64748B', fontWeight: 600, fontSize: '13px' }}>Reservations</th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#64748B', fontWeight: 600, fontSize: '13px' }}>Badges</th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#64748B', fontWeight: 600, fontSize: '13px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" style={{ padding: '24px', textAlign: 'center' }}>Loading...</td></tr>
            ) : users.map(user => (
              <tr key={user.id} style={{ borderTop: '1px solid #E2E8F0' }}>
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '16px', background: '#1B3461', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '12px' }}>
                      {user.initials}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600 }}>{user.name}</div>
                      <div style={{ fontSize: '12px', color: '#64748B' }}>{user.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '16px' }}>{user.location || '-'}</td>
                <td style={{ padding: '16px' }}>
                  <span style={{ background: '#F0FDFA', color: '#0F766E', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 600 }}>Level {user.level || 1}</span>
                </td>
                <td style={{ padding: '16px' }}>{user._count?.reservations || 0}</td>
                <td style={{ padding: '16px' }}>{user._count?.badges || 0}</td>
                <td style={{ padding: '16px' }}>
                  <button 
                    onClick={() => setSelectedUser(user)}
                    style={{ background: 'transparent', border: 'none', color: '#3B82F6', cursor: 'pointer', fontWeight: 600 }}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <UserDetailModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
}
