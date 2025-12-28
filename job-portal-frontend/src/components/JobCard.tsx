import { Link } from 'react-router-dom';

import { Job } from '../types';
import { formatDate } from '../utils/format';

interface JobCardProps {
  job: Job;
  showActions?: React.ReactNode;
  footer?: React.ReactNode;
}

export function JobCard({ job, showActions, footer }: JobCardProps) {
  return (
    <div className="card job-card" data-animate="fade-up">
      <div className="job-card__header">
        <div>
          <h3 style={{ margin: 0 }}>{job.title}</h3>
          <div className="job-card__meta">
            {job.company?.name ?? 'Unknown company'} • {job.location}
          </div>
          <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            <span className={`badge status-${job.status.toLowerCase()}`}>{job.status}</span>
            <span className="badge">{job.type}</span>
          </div>
        </div>
        <div className="job-card__meta" style={{ textAlign: 'right' }}>
          Posted {formatDate(job.createdAt)}
        </div>
      </div>
      <p style={{ margin: '0.35rem 0 0', color: 'rgba(226, 232, 240, 0.82)' }}>
        {job.description.slice(0, 180)}...
      </p>
      {job.skills && (
        <div className="job-card__skills">
          <strong style={{ color: 'rgba(244, 244, 255, 0.82)' }}>Skills:</strong> {job.skills}
        </div>
      )}
      <div className="job-card__footer">
        <Link to={`/jobs/${job.id}`} className="primary-btn">View details</Link>
        {showActions}
      </div>
      {footer && <div style={{ marginTop: '1.25rem', width: '100%' }}>{footer}</div>}
    </div>
  );
}
