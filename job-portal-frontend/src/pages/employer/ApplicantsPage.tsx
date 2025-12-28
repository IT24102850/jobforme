import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchApplicants, updateApplicantStatus } from '../../api/employer';
import { JobApplication, ApplicationStatus } from '../../types';
import { formatDate } from '../../utils/format';

const STATUSES: ApplicationStatus[] = ['APPLIED', 'SHORTLISTED', 'REJECTED', 'INTERVIEW'];

export function ApplicantsPage() {
  const { id } = useParams();
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    if (!id) return;
     setError(null);
    fetchApplicants(id)
      .then(setApplications)
      .catch(() => setError('Failed to load applicants'));
  };

  useEffect(() => {
    load();
  }, [id]);

  const handleStatusChange = async (appId: string, status: ApplicationStatus) => {
    try {
      await updateApplicantStatus(appId, status);
      load();
    } catch (err) {
      setError('Failed to update status');
    }
  };

  return (
    <div className="card" data-animate="fade-up">
      <h2>Applicants</h2>
      {error && <p style={{ color: '#fda4af' }}>{error}</p>}
      {applications.length === 0 && <p style={{ color: 'rgba(148, 163, 184, 0.82)' }}>No applications yet.</p>}
      {applications.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Email</th>
              <th>Status</th>
              <th>Applied</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app.id}>
                <td>{app.applicant?.name ?? 'N/A'}</td>
                <td>{app.applicant?.email ?? 'N/A'}</td>
                <td><span className="badge">{app.status}</span></td>
                <td>{formatDate(app.appliedAt)}</td>
                <td>
                  <select value={app.status} onChange={event => handleStatusChange(app.id, event.target.value as ApplicationStatus)}>
                    {STATUSES.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
