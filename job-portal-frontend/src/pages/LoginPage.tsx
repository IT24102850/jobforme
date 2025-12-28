import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { login } from '../api/auth';
import { useAuth } from '../hooks/useAuth';

export function LoginPage() {
  const { login: setAuth } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const auth = await login(form);
      setAuth(auth);
      navigate('/');
    } catch (err) {
      setError('Invalid credentials or disabled account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card auth-card auth-card--split" data-animate="fade-up" data-animate-delay="1">
      <aside className="auth-card__media" aria-hidden>
        <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80" alt="" />
        <div className="auth-card__overlay">
          <span className="pill">Ready to log in?</span>
          <h3>Return to your hiring cockpit</h3>
          <p>Track applications, respond instantly, and keep your momentum going.</p>
        </div>
      </aside>
      <div className="auth-card__form">
        <h2 style={{ marginBottom: '0.35rem' }}>Login</h2>
        <p style={{ color: 'rgba(148, 163, 184, 0.85)', marginBottom: '1.5rem' }}>Access tailored opportunities in seconds.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" value={form.password} onChange={handleChange} required />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <span style={{ color: 'rgba(148, 163, 184, 0.75)', fontSize: '0.85rem' }}>Forgot your login?</span>
            <Link to="/forgot-password" style={{ color: '#fef08a', fontWeight: 600 }}>Reset password</Link>
          </div>
          {error && <p style={{ color: '#fda4af' }}>{error}</p>}
          <button className="primary-btn" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
        <p style={{ marginTop: '1.5rem', color: 'rgba(148, 163, 184, 0.75)' }}>
          Need an account? <Link to="/register" style={{ color: '#bbf7d0', fontWeight: 600 }}>Join JobForMe</Link>
        </p>
      </div>
    </div>
  );
}
