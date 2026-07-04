'use client';

import { useState } from 'react';
import { useAuth } from './AuthContext';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading, login, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (loading) return <div className="p-8">Chargement...</div>;

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="p-8 bg-surface rounded-3xl shadow-sm border border-border w-96">
          <h1 className="text-2xl font-bold mb-6 text-primary">Connexion Admin</h1>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 border rounded-xl"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full p-3 mb-6 border rounded-xl"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
          <button
            className="w-full p-3 bg-primary text-white rounded-xl font-bold"
            onClick={async () => {
              try {
                await login(email, password);
              } catch (err) {
                setError('Identifiants invalides');
              }
            }}
          >
            Se connecter
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-4 bg-surface border-b border-border flex justify-between items-center">
        <span className="text-text-secondary">Connecté en tant qu'admin</span>
        <button onClick={logout} className="text-cardPink font-bold">Déconnexion</button>
      </div>
      {children}
    </>
  );
}
