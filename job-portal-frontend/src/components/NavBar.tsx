import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

function linkClass({ isActive }: { isActive: boolean }) {
  return isActive ? 'active' : undefined;
}

export function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [authMenuOpen, setAuthMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const closeAuthMenu = () => setAuthMenuOpen(false);

  const handleAuthBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setAuthMenuOpen(false);
    }
  };

  return (
    <nav className="navbar" data-animate="fade-up" data-animate-delay="1">
      <div className="container navbar__inner">
        <NavLink to="/" className="navbar__brand" aria-label="JobForMe home">
          <img src="/jobforme-logo.svg" alt="" aria-hidden="true" />
          <span>JobForMe</span>
        </NavLink>
        <div className="navbar__links" data-glow>
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/jobs" className={linkClass}>Jobs</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink to="/employers" className={linkClass}>Employers</NavLink>
          <NavLink to="/resources" className={linkClass}>Resources</NavLink>
          {user?.role === 'SEEKER' && (
            <>
              <NavLink to="/seeker" className={linkClass}>Dashboard</NavLink>
              <NavLink to="/seeker/profile" className={linkClass}>Profile</NavLink>
            </>
          )}
          {user?.role === 'EMPLOYER' && (
            <>
              <NavLink to="/employer" className={linkClass}>Employer</NavLink>
              <NavLink to="/employer/jobs" className={linkClass}>My Jobs</NavLink>
            </>
          )}
          {user?.role === 'ADMIN' && (
            <>
              <NavLink to="/admin" className={linkClass}>Admin</NavLink>
              <NavLink to="/admin/users" className={linkClass}>Users</NavLink>
            </>
          )}
          {user && <NavLink to="/account/security" className={linkClass}>Security</NavLink>}
          {!user && (
            <div
              className={`navbar__auth${authMenuOpen ? ' is-open' : ''}`}
              onBlur={handleAuthBlur}
            >
              <button
                type="button"
                className="navbar__auth-trigger"
                aria-haspopup="true"
                aria-expanded={authMenuOpen}
                onClick={() => setAuthMenuOpen(prev => !prev)}
              >
                <span className="navbar__auth-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5z" />
                    <path d="M4 20a7 7 0 0 1 14 0" />
                  </svg>
                </span>
                <span>Account</span>
                <span className="navbar__auth-caret" aria-hidden="true">▾</span>
              </button>
              <div className="navbar__menu" role="menu">
                <NavLink
                  to="/login"
                  role="menuitem"
                  className="navbar__menu-link"
                  onClick={closeAuthMenu}
                >
                  <span className="navbar__menu-icon" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 10v-2a3 3 0 0 1 3-3h7" />
                      <path d="M9 14h11" />
                      <path d="M17 11l3 3-3 3" />
                      <path d="M9 20a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3" />
                    </svg>
                  </span>
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  role="menuitem"
                  className="navbar__menu-link"
                  onClick={closeAuthMenu}
                >
                  <span className="navbar__menu-icon" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5z" />
                      <path d="M20 21l-4-4" />
                      <path d="M4 21v-1a4 4 0 0 1 4-4h1" />
                      <path d="M16 5h4" />
                      <path d="M18 3v4" />
                    </svg>
                  </span>
                  Register
                </NavLink>
              </div>
            </div>
          )}
          {user && (
            <button className="secondary-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
