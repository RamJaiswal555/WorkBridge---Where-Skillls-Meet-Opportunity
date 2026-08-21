import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import * as authService from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = authService.getCurrentUser();
    setUser(stored);
    setLoading(false);
  }, []);

  const login = useCallback(async (payload) => {
    setLoading(true);
    try {
      const u = await authService.login(payload);
      setUser(u);
      return u;
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = useCallback(async (payload) => {
    setLoading(true);
    try {
      const u = await authService.signup(payload);
      setUser(u);
      return u;
    } finally {
      setLoading(false);
    }
  }, []);

  const loginWithOTP = useCallback(async (payload) => {
    setLoading(true);
    try {
      const u = await authService.loginWithOTP(payload);
      setUser(u);
      return u;
    } finally {
      setLoading(false);
    }
  }, []);

  const loginWithGoogle = useCallback(async (payload) => {
    setLoading(true);
    try {
      const u = await authService.loginWithGoogle(payload);
      setUser(u);
      return u;
    } finally {
      setLoading(false);
    }
  }, []);

  const loginAdmin = useCallback(async (payload) => {
    setLoading(true);
    try {
      const u = await authService.loginAdmin(payload);
      setUser(u);
      return u;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, []);

  const value = {
    user,
    role: user?.role || null,
    isAuthenticated: !!user,
    loading,
    login,
    signup,
    loginWithOTP,
    loginWithGoogle,
    loginAdmin,
    logout,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
