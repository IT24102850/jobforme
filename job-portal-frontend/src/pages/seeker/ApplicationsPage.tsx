import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { fetchSeekerApplications } from '../../api/seeker';
import { JobApplication } from '../../types';
import { formatDate } from '../../utils/format';

export function ApplicationsPage() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
    fetchSeekerApplications()
      .then(setApplications)
      .catch(() => setError('Failed to load applications'));
  }, []);

  return (
    <div className="card" data-animate="fade-up">
      <h2>My applications</h2>
      {error && <p style={{ color: '#fda4af' }}>{error}</p>}
      {applications.length === 0 && <p style={{ color: 'rgba(148, 163, 184, 0.82)' }}>You have not applied to any jobs yet.</p>}
      {applications.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Job</th>
              <th>Status</th>
              <th>Applied at</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app.id}>
                <td>{app.jobTitle}</td>
                <td><span className="badge">{app.status}</span></td>
                <td>{formatDate(app.appliedAt)}</td>
                <td><Link to={`/jobs/${app.jobId}`} className="secondary-btn">View job</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
