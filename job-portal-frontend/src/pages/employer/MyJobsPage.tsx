import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { closeJob, fetchEmployerJobs } from '../../api/employer';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { Job } from '../../types';
import { formatDate } from '../../utils/format';

export function MyJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loadJobs = () => {
    setLoading(true);
    setError(null);
    fetchEmployerJobs()
      .then(setJobs)
      .catch(() => setError('Failed to load jobs'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleClose = async (jobId: string) => {
    try {
      await closeJob(jobId);
      loadJobs();
    } catch (err) {
      setError('Unable to close job');
    }
  };

  return (
    <div className="card" data-animate="fade-up">
      <div className="page-header">
        <h2>My jobs</h2>
        <button className="primary-btn" onClick={() => navigate('/employer/jobs/new')}>Post job</button>
      </div>
      {error && <p style={{ color: '#fda4af' }}>{error}</p>}
      {loading && <LoadingSpinner />}
      {jobs.length === 0 && !loading && <p style={{ color: 'rgba(148, 163, 184, 0.82)' }}>No job postings yet.</p>}
      {jobs.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Posted</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map(job => (
              <tr key={job.id}>
                <td>{job.title}</td>
                <td><span className={`badge status-${job.status.toLowerCase()}`}>{job.status}</span></td>
                <td>{formatDate(job.createdAt)}</td>
                <td style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                  <Link to={`/employer/jobs/${job.id}/edit`} className="secondary-btn">Edit</Link>
                  <Link to={`/employer/jobs/${job.id}/applicants`} className="secondary-btn">Applicants</Link>
                  {job.status === 'OPEN' && (
                    <button className="secondary-btn" onClick={() => handleClose(job.id)}>Close job</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
