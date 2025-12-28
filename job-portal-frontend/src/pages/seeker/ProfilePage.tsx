import { useEffect, useState } from 'react';

import { fetchSeekerProfile, updateSeekerProfile, uploadSeekerCv } from '../../api/seeker';
import { SeekerProfile } from '../../types';

export function ProfilePage() {
  const [profile, setProfile] = useState<SeekerProfile>({ education: '', experience: '', skills: '', cvUrl: null });
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchSeekerProfile().then(data => setProfile(data ?? { education: '', experience: '', skills: '', cvUrl: null }))
      .catch(() => setProfile({ education: '', experience: '', skills: '', cvUrl: null }));
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
      const updated = await updateSeekerProfile(profile);
      setProfile(updated);
      setMessage('Profile updated');
    } catch (err) {
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    setMessage(null);
    try {
      const updated = await uploadSeekerCv(file);
      setProfile(updated);
      setMessage('CV uploaded successfully');
    } catch (err) {
      setError('Failed to upload CV. Ensure it is a PDF under 5MB.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="card content-narrow" data-animate="fade-up">
      <h2 style={{ marginBottom: '0.35rem' }}>Seeker profile</h2>
      <p style={{ color: 'rgba(148, 163, 184, 0.82)', marginBottom: '1.5rem' }}>Keep your story current to stand out in every application.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="education">Education</label>
          <input id="education" name="education" value={profile.education ?? ''} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="experience">Experience</label>
          <textarea id="experience" name="experience" rows={4} value={profile.experience ?? ''} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="skills">Skills (comma separated)</label>
          <input id="skills" name="skills" value={profile.skills ?? ''} onChange={handleChange} />
        </div>
        {message && <p style={{ color: '#86efac' }}>{message}</p>}
        {error && <p style={{ color: '#fda4af' }}>{error}</p>}
        <button className="primary-btn" type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save profile'}
        </button>
      </form>

      <div className="card card--compact" data-animate="fade-up" data-animate-delay="2" style={{ marginTop: '2rem' }}>
        <h3>Curriculum Vitae</h3>
        <p style={{ color: 'rgba(203, 213, 225, 0.82)' }}>Upload a PDF CV (max 5MB). It will be attached to job applications.</p>
        <input type="file" accept="application/pdf" onChange={handleUpload} />
        {uploading && <p style={{ color: 'rgba(148, 163, 184, 0.82)' }}>Uploading...</p>}
        {profile.cvUrl && <p style={{ color: '#a5f3fc' }}>CV on file.</p>}
      </div>
    </div>
  );
}
