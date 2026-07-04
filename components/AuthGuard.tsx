'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useAuth } from './AuthContext';
import { useNotification } from './NotificationContext';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading, isInitialized, login, register, logout } = useAuth();
  const { addNotification } = useNotification();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = useCallback(() => {
    if (!email || !password) {
      addNotification('error', 'Veuillez remplir tous les champs');
      return false;
    }

    if (!isLogin && !name) {
      addNotification('error', 'Veuillez entrer votre nom');
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      addNotification('error', 'Email invalide');
      return false;
    }

    if (password.length < 6) {
      addNotification('error', 'Le mot de passe doit contenir au moins 6 caractères');
      return false;
    }

    return true;
  }, [email, password, name, isLogin, addNotification]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(name, email, password);
        setIsLogin(true);
        setEmail('');
        setPassword('');
        setName('');
      }
    } catch (err) {
      console.error('Auth error:', err);
    } finally {
      setIsSubmitting(false);
    }
  }, [isLogin, email, password, name, login, register, validateForm]);

  if (!isInitialized || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-text-secondary">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background p-4 relative">
        {/* Bouton retour à l'accueil */}
        <Link
          href="/"
          className="absolute top-4 left-4 md:top-6 md:left-6 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-secondary hover:text-primary hover:bg-surface rounded-lg transition"
          title="Retourner à l'accueil"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="hidden sm:inline">Accueil</span>
        </Link>

        <div className="w-full max-w-md">
          <div className="bg-surface rounded-3xl shadow-lg border border-border p-8">
            <h1 className="text-3xl font-bold mb-2 text-primary text-center">
              {isLogin ? 'Connexion Admin' : 'Créer un compte'}
            </h1>
            <p className="text-text-secondary text-center mb-8">
              {isLogin ? 'Accédez au panel d\'administration' : 'Créer un nouveau compte administrateur'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Nom complet</label>
                  <input
                    type="text"
                    placeholder="Votre nom"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-xl bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    disabled={isSubmitting}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Email</label>
                <input
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-xl bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Mot de passe</label>
                <input
                  type="password"
                  placeholder="Minimum 6 caractères"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-xl bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting && <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>}
                {isLogin ? 'Se connecter' : 'Créer un compte'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setEmail('');
                  setPassword('');
                  setName('');
                }}
                disabled={isSubmitting}
                className="w-full py-3 text-primary font-semibold hover:bg-primary/5 rounded-xl transition disabled:opacity-50"
              >
                {isLogin ? 'Pas de compte? Créer un compte' : 'Déjà un compte? Se connecter'}
              </button>
            </form>

            {/* Lien retour à l'accueil en bas du formulaire */}
            <div className="mt-6 pt-6 border-t border-border text-center">
              <Link
                href="/"
                className="text-sm text-text-secondary hover:text-primary transition inline-flex items-center gap-2 justify-center"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12a9 9 0 0110.89-8.8A9 9 0 1021.9 9" />
                </svg>
                Retourner à l&apos;accueil
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-40 bg-surface border-b border-border shadow-sm">
        <div className="px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <span className="text-primary font-bold text-sm">{user.name.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">{user.name}</p>
              <p className="text-xs text-text-secondary">{user.role}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition"
          >
            Déconnexion
          </button>
        </div>
      </header>
      {children}
    </>
  );
}
