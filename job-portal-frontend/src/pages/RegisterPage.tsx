import { useState } from 'react';
import { isAxiosError } from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import { register } from '../api/auth';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../types';

const ROLES: UserRole[] = ['SEEKER', 'EMPLOYER'];

export function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'SEEKER' as UserRole });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const auth = await register(form);
      login(auth);
      navigate('/');
    } catch (err) {
      if (isAxiosError(err)) {
        if (!err.response) {
          setError('Registration failed. Unable to reach the server.');
          return;
        }
        const data = err.response.data as { message?: string; details?: string[] } | undefined;
        const apiMessage = data?.message;
        const apiDetails = data?.details?.join(', ');
        const resolved = [apiMessage, apiDetails].filter(Boolean).join(': ');
        setError(resolved || 'Registration failed. Please try again.');
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card auth-card auth-card--split" data-animate="fade-up" data-animate-delay="1">
      <aside className="auth-card__media" aria-hidden>
        <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80" alt="" />
        <div className="auth-card__overlay">
          <span className="pill">Start your journey</span>
          <h3>Craft a profile recruiters notice</h3>
          <p>Tell your story, showcase your skills, and let curated roles come to you.</p>
        </div>
      </aside>
      <div className="auth-card__form">
        <h2 style={{ marginBottom: '0.35rem' }}>Create an account</h2>
        <p style={{ color: 'rgba(148, 163, 184, 0.85)', marginBottom: '1.5rem' }}>Join the talent community and collaborate with top teams.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full name</label>
            <input id="name" name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" value={form.password} onChange={handleChange} required minLength={6} />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select id="role" name="role" value={form.role} onChange={handleChange}>
              {ROLES.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
          {error && <p style={{ color: '#fda4af' }}>{error}</p>}
          <button className="primary-btn" type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p style={{ marginTop: '1.5rem', color: 'rgba(148, 163, 184, 0.75)' }}>
          Already have an account? <Link to="/login" style={{ color: '#bbf7d0', fontWeight: 600 }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
