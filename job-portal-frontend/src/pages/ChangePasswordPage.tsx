import { useState } from 'react';

import { changePassword } from '../api/auth';

export function ChangePasswordPage() {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      setError('New passwords do not match.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await changePassword({ currentPassword: form.currentPassword, newPassword: form.newPassword });
      setSuccess(true);
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setSuccess(false);
      setError('We could not update your password. Please verify your current password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card auth-card" data-animate="fade-up">
      <span className="page-eyebrow">Account security</span>
      <h1 style={{ marginBottom: '0.35rem' }}>Update your password</h1>
      <p style={{ color: 'rgba(148, 163, 184, 0.85)', marginBottom: '1.5rem' }}>
        Choose a strong passphrase with at least 8 characters, a number, and a symbol to help keep your account protected.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="currentPassword">Current password</label>
          <input id="currentPassword" name="currentPassword" type="password" value={form.currentPassword} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New password</label>
          <input id="newPassword" name="newPassword" type="password" value={form.newPassword} onChange={handleChange} required minLength={8} />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm new password</label>
          <input id="confirmPassword" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} required minLength={8} />
        </div>
        {error && <p style={{ color: '#fca5a5' }}>{error}</p>}
        {success && <p style={{ color: '#bbf7d0' }}>Password updated successfully.</p>}
        <button type="submit" className="primary-btn" disabled={loading}>
          {loading ? 'Updating...' : 'Save changes'}
        </button>
      </form>
    </section>
  );
}
