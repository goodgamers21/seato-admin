import React from 'react';

export default function UserDetailModal({ user, onClose }) {
  if (!user) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: 'white', width: '500px', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}>
        
        <div style={{ padding: '20px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F8FAFC' }}>
          <h2 style={{ margin: 0, fontSize: '18px' }}>User Details</h2>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#64748B' }}>×</button>
        </div>

        <div style={{ padding: '24px', overflowY: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '32px', background: '#1B3461', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '24px' }}>
              {user.initials}
            </div>
            <div>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '20px' }}>{user.name}</h3>
              <p style={{ margin: 0, color: '#64748B' }}>{user.email}</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '8px' }}>
              <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '4px' }}>Level</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#0F172A' }}>{user.level || 1}</div>
            </div>
            <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '8px' }}>
              <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '4px' }}>XP Points</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#0F172A' }}>{user.xpPoints?.toLocaleString() || 0}</div>
            </div>
          </div>

          <div>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#475569' }}>Earned Badges ({user.badges?.length || 0})</h4>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {user.badges && user.badges.length > 0 ? user.badges.map(b => (
                <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: '#F1F5F9', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                  <img src={b.badge.iconUrl} alt={b.badge.name} style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>{b.badge.name}</span>
                </div>
              )) : (
                <div style={{ fontSize: '13px', color: '#94A3B8' }}>No badges earned yet.</div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
