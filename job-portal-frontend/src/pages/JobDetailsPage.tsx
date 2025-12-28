import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchJob } from '../api/jobs';
import { applyToJob } from '../api/seeker';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useAuth } from '../hooks/useAuth';
import { Job } from '../types';
import { formatCurrency } from '../utils/format';

export function JobDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [coverLetter, setCoverLetter] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchJob(id)
      .then(setJob)
      .catch(() => setError('Job not found'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleApply = async () => {
    if (!id) return;
    try {
      await applyToJob(id, { coverLetter });
      setMessage('Application submitted successfully');
      setError(null);
    } catch (err) {
      setError('Unable to submit application. Ensure your profile and CV are up to date.');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!job) return <p style={{ color: 'rgba(248, 113, 113, 0.9)' }}>Job not found.</p>;

  return (
    <div className="card" data-animate="fade-up">
      <h1>{job.title}</h1>
      <p style={{ color: 'rgba(148, 163, 184, 0.9)' }}>{job.company?.name ?? 'Company'} • {job.location}</p>
      <div style={{ marginBottom: '1rem' }}>
        <span className={`badge status-${job.status.toLowerCase()}`}>{job.status}</span>
        <span className="badge" style={{ marginLeft: '0.5rem' }}>{job.type}</span>
      </div>
      {job.skills && (
        <p><strong>Skills:</strong> {job.skills}</p>
      )}
      <p><strong>Salary:</strong> {formatCurrency(job.minSalary)} - {formatCurrency(job.maxSalary)}</p>
      <h3>Job description</h3>
      <p style={{ whiteSpace: 'pre-line', lineHeight: 1.6 }}>{job.description}</p>

      {job.company && (
        <div style={{ marginTop: '1.5rem' }}>
          <h3>About {job.company.name}</h3>
          <p style={{ color: 'rgba(203, 213, 225, 0.85)' }}>{job.company.about ?? 'Employer has not provided additional details.'}</p>
        </div>
      )}

      {user?.role === 'SEEKER' ? (
        <div style={{ marginTop: '2rem' }}>
          <h3>Apply now</h3>
          <textarea
            value={coverLetter}
            onChange={event => setCoverLetter(event.target.value)}
            placeholder="Optional cover letter"
            rows={5}
          />
          <button className="primary-btn" style={{ marginTop: '1rem' }} onClick={handleApply}>
            Submit application
          </button>
        </div>
      ) : (
        <p style={{ marginTop: '2rem', color: 'rgba(148, 163, 184, 0.9)' }}>
          {user ? 'Only job seekers can apply to positions.' : 'Login as a job seeker to apply.'}
        </p>
      )}

      {message && <p style={{ color: '#86efac', marginTop: '1rem' }}>{message}</p>}
      {error && <p style={{ color: '#fda4af', marginTop: '1rem' }}>{error}</p>}
    </div>
  );
}
