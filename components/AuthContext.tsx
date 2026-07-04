'use client';
import { createContext, useContext, useState } from 'react';
import { login, register } from '@/lib/api';

const AuthContext = createContext<{ user: { id: string; email: string; name: string; role: string } | null; token: string | null; loading: boolean; login: (email: string, password: string) => Promise<void>; register: (name: string, email: string, password: string) => Promise<void>; logout: () => void }>({
  user: null,
  token: null,
  loading: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ id: string; email: string; name: string; role: string } | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await login(email, password);
      setUser(response.user);
      setToken(response.token);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      await register(name, email, password);
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return <AuthContext.Provider value={{ user, token, loading, login: handleLogin, register: handleRegister, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
