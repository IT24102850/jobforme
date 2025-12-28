import { useEffect, useState } from 'react';

import { disableUser, fetchAdminUsers } from '../../api/admin';
import { UserSummary } from '../../types';
import { formatDate } from '../../utils/format';

export function UsersPage() {
  const [users, setUsers] = useState<UserSummary[]>([]);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setError(null);
    fetchAdminUsers()
      .then(setUsers)
      .catch(() => setError('Failed to load users'));
  };

  useEffect(() => {
    load();
  }, []);

  const handleDisable = async (userId: string) => {
    try {
      await disableUser(userId);
      load();
    } catch (err) {
      setError('Unable to disable user');
    }
  };

  return (
    <div className="card" data-animate="fade-up">
      <h2>Users</h2>
      {error && <p style={{ color: '#fda4af' }}>{error}</p>}
      {users.length === 0 && <p style={{ color: 'rgba(148, 163, 184, 0.82)' }}>No users found.</p>}
      {users.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td><span className="badge">{user.role}</span></td>
                <td>
                  <span className={`badge status-${user.enabled ? 'open' : 'closed'}`}>
                    {user.enabled ? 'Enabled' : 'Disabled'}
                  </span>
                </td>
                <td>{formatDate(user.createdAt)}</td>
                <td>
                  {user.enabled ? (
                    <button className="secondary-btn" onClick={() => handleDisable(user.id)}>Disable</button>
                  ) : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
