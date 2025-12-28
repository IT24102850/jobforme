import { useEffect, useState } from 'react';

import { deleteJob, fetchAdminJobs } from '../../api/admin';
import { Job } from '../../types';
import { formatDate } from '../../utils/format';

export function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filter, setFilter] = useState<'ALL' | 'OPEN' | 'CLOSED'>('ALL');
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setError(null);
    fetchAdminJobs()
      .then(setJobs)
      .catch(() => setError('Failed to load jobs'));
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (jobId: string) => {
    try {
      await deleteJob(jobId);
      load();
    } catch (err) {
      setError('Unable to delete job');
    }
  };

  const filtered = jobs.filter(job => (filter === 'ALL' ? true : job.status === filter));

  return (
    <div className="card" data-animate="fade-up">
      <div className="page-header">
        <h2>Jobs</h2>
        <select value={filter} onChange={event => setFilter(event.target.value as 'ALL' | 'OPEN' | 'CLOSED')}>
          <option value="ALL">All</option>
          <option value="OPEN">Open</option>
          <option value="CLOSED">Closed</option>
        </select>
      </div>
      {error && <p style={{ color: '#fda4af' }}>{error}</p>}
      {filtered.length === 0 && <p style={{ color: 'rgba(148, 163, 184, 0.82)' }}>No jobs found.</p>}
      {filtered.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Company</th>
              <th>Location</th>
              <th>Status</th>
              <th>Posted</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(job => (
              <tr key={job.id}>
                <td>{job.title}</td>
                <td>{job.companyName}</td>
                <td>{job.location}</td>
                <td><span className={`badge status-${job.status.toLowerCase()}`}>{job.status}</span></td>
                <td>{formatDate(job.createdAt)}</td>
                <td>
                  <button className="secondary-btn" onClick={() => handleDelete(job.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
