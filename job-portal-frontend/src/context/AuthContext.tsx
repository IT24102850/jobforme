import { createContext, useCallback, useEffect, useMemo, useState } from 'react';

import { AuthResponse, CurrentUser } from '../types';

type AuthContextValue = {
  user: CurrentUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (auth: AuthResponse) => void;
  logout: () => void;
  updateUser: (payload: Partial<CurrentUser>) => void;
};

const STORAGE_KEY = 'jobportal-auth';

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as { user: CurrentUser; token: string };
        setUser(parsed.user);
        setToken(parsed.token);
      } catch (error) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const persist = useCallback((nextUser: CurrentUser | null, nextToken: string | null) => {
    if (!nextUser || !nextToken) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: nextUser, token: nextToken }));
    }
  }, []);

  const login = useCallback((auth: AuthResponse) => {
    const nextUser: CurrentUser = {
      id: auth.userId,
      name: auth.name,
      email: auth.email,
      role: auth.role
    };
    setUser(nextUser);
    setToken(auth.accessToken);
    persist(nextUser, auth.accessToken);
  }, [persist]);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const updateUser = useCallback((payload: Partial<CurrentUser>) => {
    setUser(prev => {
      if (!prev) return prev;
      const next = { ...prev, ...payload };
      persist(next, token);
      return next;
    });
  }, [persist, token]);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    token,
    isAuthenticated: Boolean(user && token),
    login,
    logout,
    updateUser
  }), [user, token, login, logout, updateUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
