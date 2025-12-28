import { useState } from 'react';

import { requestPasswordReset } from '../api/auth';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await requestPasswordReset({ email });
      setSent(true);
    } catch (err) {
      setError('We could not find that email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card auth-card" data-animate="fade-up" data-animate-delay="1">
      <h2 style={{ marginBottom: '0.35rem' }}>Forgot password</h2>
      <p style={{ color: 'rgba(148, 163, 184, 0.85)', marginBottom: '1.5rem' }}>
        Enter the email connected to your JobForMe account. We&apos;ll send instructions to reset your password.
      </p>
      {sent ? (
        <div style={{ color: '#bef264', lineHeight: 1.5 }}>
          <strong>Check your inbox.</strong> If the address exists in our system you&apos;ll receive a secure link to create a new password. The link expires in 15 minutes.
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={email} onChange={event => setEmail(event.target.value)} required />
          </div>
          {error && <p style={{ color: '#fca5a5' }}>{error}</p>}
          <button className="primary-btn" type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send reset link'}
          </button>
        </form>
      )}
    </div>
  );
}
