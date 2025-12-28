import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { fetchSeekerApplications, fetchSeekerProfile } from '../../api/seeker';
import { useAuth } from '../../hooks/useAuth';
import { JobApplication, SeekerProfile } from '../../types';

export function SeekerDashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<SeekerProfile | null>(null);
  const [applications, setApplications] = useState<JobApplication[]>([]);

  useEffect(() => {
    fetchSeekerProfile().then(setProfile).catch(() => setProfile(null));
    fetchSeekerApplications().then(setApplications).catch(() => setApplications([]));
  }, []);

  const appliedCount = applications.length;
  const shortlisted = applications.filter(app => app.status === 'SHORTLISTED').length;

  return (
    <div className="card" data-animate="fade-up">
      <h1 style={{ marginBottom: '0.2rem' }}>Welcome back, {user?.name}</h1>
      <p style={{ color: 'rgba(148, 163, 184, 0.85)' }}>Track your profile completeness and application progress at a glance.</p>

      <div className="grid" style={{ marginTop: '2rem' }}>
        <div className="stat-card" data-animate="fade-up" data-animate-delay="1">
          <h3>Profile</h3>
          <p style={{ color: 'rgba(203, 213, 225, 0.82)' }}>{profile?.education ? 'Profile completed' : 'Complete your profile to stand out.'}</p>
          <Link to="/seeker/profile" className="secondary-btn">Manage profile</Link>
        </div>
        <div className="stat-card" data-animate="fade-up" data-animate-delay="2">
          <h3>Applications</h3>
          <p style={{ color: 'rgba(203, 213, 225, 0.82)' }}>Total applied: <strong>{appliedCount}</strong></p>
          <p style={{ color: 'rgba(203, 213, 225, 0.82)' }}>Shortlisted: <strong>{shortlisted}</strong></p>
          <Link to="/seeker/applications" className="secondary-btn">View applications</Link>
        </div>
      </div>
    </div>
  );
}
