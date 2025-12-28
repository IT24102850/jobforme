import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { fetchJobs } from '../api/jobs';
import { HeroSection } from '../components/HeroSection';
import { JobCard } from '../components/JobCard';
import { Job } from '../types';

export function HomePage() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    fetchJobs({ size: 3 }).then(data => setJobs(data.items)).catch(() => setJobs([]));
  }, []);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const keyword = formData.get('keyword')?.toString() ?? '';
    navigate(`/jobs?keyword=${encodeURIComponent(keyword)}`);
  };

  return (
    <div className="home-page">
      <HeroSection onSearch={handleSearch} />

      <section data-animate="fade-up" data-animate-delay="2" style={{ marginTop: '3rem' }}>
        <div className="page-header">
          <h2>Latest roles</h2>
          <Link to="/jobs" className="secondary-btn">View all</Link>
        </div>
        <div className="grid">
          {jobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
          {jobs.length === 0 && <p style={{ color: 'rgba(148, 163, 184, 0.85)' }}>No jobs yet. Check back soon.</p>}
        </div>
      </section>
    </div>
  );
}
