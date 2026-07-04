'use client';

import { useState } from 'react';
import { useAuth } from './AuthContext';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading, login, register, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  if (loading) return <div className="p-8">Chargement...</div>;

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="p-8 bg-surface rounded-3xl shadow-sm border border-border w-96">
          <h1 className="text-2xl font-bold mb-6 text-primary">
            {isLogin ? 'Connexion Admin' : 'Créer un compte'}
          </h1>
          {!isLogin && (
            <input
              type="text"
              placeholder="Nom complet"
              className="w-full p-3 mb-4 border rounded-xl"
              onChange={(e) => setName(e.target.value)}
            />
          )}
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
                if (isLogin) {
                  await login(email, password);
                } else {
                  await register(name, email, password);
                  setIsLogin(true);
                }
              } catch (err) {
                setError(isLogin ? 'Identifiants invalides' : 'Erreur lors de la création du compte');
              }
            }}
          >
            {isLogin ? 'Se connecter' : 'Créer un compte'}
          </button>
          <button
            className="w-full p-3 mt-4 text-primary font-semibold"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
          >
            {isLogin ? 'Pas de compte? Créer un compte' : 'Déjà un compte? Se connecter'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-4 bg-surface border-b border-border flex justify-between items-center">
        <span className="text-text-secondary">Connecté en tant qu'admin ({user.name})</span>
        <button onClick={logout} className="text-cardPink font-bold">Déconnexion</button>
      </div>
      {children}
    </>
  );
}
