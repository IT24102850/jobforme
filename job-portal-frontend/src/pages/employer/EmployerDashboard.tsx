import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { fetchCompanyProfile, fetchEmployerJobs } from '../../api/employer';
import { CompanyProfile, Job } from '../../types';

export function EmployerDashboard() {
  const [company, setCompany] = useState<CompanyProfile | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    fetchCompanyProfile().then(setCompany).catch(() => setCompany(null));
    fetchEmployerJobs().then(setJobs).catch(() => setJobs([]));
  }, []);

  const openJobs = jobs.filter(job => job.status === 'OPEN');

  return (
    <div className="card" data-animate="fade-up">
      <h1 style={{ marginBottom: '0.2rem' }}>Employer overview</h1>
      <p style={{ color: 'rgba(148, 163, 184, 0.85)' }}>Manage your company profile and monitor active job postings.</p>

      <div className="grid" style={{ marginTop: '2rem' }}>
        <div className="stat-card" data-animate="fade-up" data-animate-delay="1">
          <h3>Company profile</h3>
          <p style={{ color: 'rgba(203, 213, 225, 0.82)' }}>{company?.companyName ?? 'Complete your company profile to attract talent.'}</p>
          <Link to="/employer/profile" className="secondary-btn">Edit profile</Link>
        </div>
        <div className="stat-card" data-animate="fade-up" data-animate-delay="2">
          <h3>Job postings</h3>
          <p style={{ color: 'rgba(203, 213, 225, 0.82)' }}>Open positions: <strong>{openJobs.length}</strong></p>
          <p style={{ color: 'rgba(203, 213, 225, 0.82)' }}>Total jobs: <strong>{jobs.length}</strong></p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            <Link to="/employer/jobs/new" className="primary-btn">Post a job</Link>
            <Link to="/employer/jobs" className="secondary-btn">Manage jobs</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
