import { useEffect, useState } from 'react';

import { fetchCompanyProfile, updateCompanyProfile } from '../../api/employer';
import { CompanyProfile } from '../../types';

export function CompanyProfilePage() {
  const [profile, setProfile] = useState<CompanyProfile>({ companyName: '', website: '', location: '', about: '' });
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCompanyProfile()
      .then(data => data && setProfile(data))
      .catch(() => setProfile({ companyName: '', website: '', location: '', about: '' }));
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      const updated = await updateCompanyProfile(profile);
      setProfile(updated);
      setMessage('Company profile saved');
    } catch (err) {
      setError('Failed to save company profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card content-narrow" data-animate="fade-up">
      <h2 style={{ marginBottom: '0.35rem' }}>Company profile</h2>
      <p style={{ color: 'rgba(148, 163, 184, 0.82)', marginBottom: '1.5rem' }}>Share your brand story to convert more applicants.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="companyName">Company name</label>
          <input id="companyName" name="companyName" value={profile.companyName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" value={profile.website ?? ''} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input id="location" name="location" value={profile.location ?? ''} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="about">About</label>
          <textarea id="about" name="about" rows={4} value={profile.about ?? ''} onChange={handleChange} />
        </div>
        {message && <p style={{ color: '#86efac' }}>{message}</p>}
        {error && <p style={{ color: '#fda4af' }}>{error}</p>}
        <button className="primary-btn" type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save profile'}
        </button>
      </form>
    </div>
  );
}
