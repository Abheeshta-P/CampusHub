import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '../api/index.js';
import { getToken, setToken, clearToken } from '../api/tokenStore.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {

      if (!getToken()) {
        setLoading(false);
        return;
      }
      try {
        const { user } = await authApi.me();
        setUser(user);
      } catch {
        clearToken();
      } finally {
        setLoading(false);
      }
    }
    restoreSession();
  }, []);

  const login = useCallback(async (username, password) => {
    const { token, user } = await authApi.login(username, password);
    setToken(token);
    setUser(user);
    return user;
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } finally {
      clearToken();
      setUser(null);
    }
  }, []);

  const updateUser = useCallback((patch) => {
    setUser((prev) => (prev ? { ...prev, ...patch } : prev));
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
