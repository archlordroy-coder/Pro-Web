'use client';
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext<{ user: { email: string } | null; token: string | null; loading: boolean; login: (email: string, password: string) => Promise<void>; logout: () => void }>({
  user: null,
  token: null,
  loading: false,
  login: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simple authentication - in production, call your API
      if (email === 'admin@proinformatique.dev' && password === 'admin123') {
        setUser({ email });
        setToken('simple-token');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return <AuthContext.Provider value={{ user, token, loading, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
