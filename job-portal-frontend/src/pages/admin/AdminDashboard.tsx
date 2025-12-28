import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { fetchAdminJobs, fetchAdminUsers } from '../../api/admin';
import { Job, UserSummary } from '../../types';

export function AdminDashboard() {
  const [users, setUsers] = useState<UserSummary[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    fetchAdminUsers().then(setUsers).catch(() => setUsers([]));
    fetchAdminJobs().then(setJobs).catch(() => setJobs([]));
  }, []);

  const disabledUsers = users.filter(user => !user.enabled).length;

  return (
    <div className="card" data-animate="fade-up">
      <h1 style={{ marginBottom: '0.2rem' }}>Admin control center</h1>
      <p style={{ color: 'rgba(148, 163, 184, 0.85)' }}>Monitor platform health and manage members.</p>

      <div className="grid" style={{ marginTop: '2rem' }}>
        <div className="stat-card" data-animate="fade-up" data-animate-delay="1">
          <h3>Users</h3>
          <p style={{ color: 'rgba(203, 213, 225, 0.82)' }}>Total users: <strong>{users.length}</strong></p>
          <p style={{ color: 'rgba(203, 213, 225, 0.82)' }}>Disabled accounts: <strong>{disabledUsers}</strong></p>
          <Link to="/admin/users" className="secondary-btn">Manage users</Link>
        </div>
        <div className="stat-card" data-animate="fade-up" data-animate-delay="2">
          <h3>Jobs</h3>
          <p style={{ color: 'rgba(203, 213, 225, 0.82)' }}>Total posted: <strong>{jobs.length}</strong></p>
          <Link to="/admin/jobs" className="secondary-btn">Manage jobs</Link>
        </div>
      </div>
    </div>
  );
}
