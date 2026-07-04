'use client';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { login, register } from '@/lib/api';
import { useNotification } from './NotificationContext';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  isInitialized: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: 'auth_user',
  TOKEN: 'auth_token',
} as const;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const { addNotification } = useNotification();

  // Initialiser depuis localStorage au montage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
        const storedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);

        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        localStorage.removeItem(STORAGE_KEYS.USER);
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
      } finally {
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, []);

  const handleLogin = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await login(email, password);
      const userData = response.user;
      const tokenData = response.token;

      setUser(userData);
      setToken(tokenData);

      // Persister dans localStorage
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
      localStorage.setItem(STORAGE_KEYS.TOKEN, tokenData);

      addNotification('success', `Bienvenue ${userData.name}!`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Identifiants invalides';
      addNotification('error', errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [addNotification]);

  const handleRegister = useCallback(async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      await register(name, email, password);
      addNotification('success', 'Compte créé avec succès! Connectez-vous pour continuer.');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur lors de la création du compte';
      addNotification('error', errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [addNotification]);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    addNotification('success', 'Déconnecté avec succès');
  }, [addNotification]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isInitialized,
        login: handleLogin,
        register: handleRegister,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
