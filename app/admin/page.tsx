'use client';

import AuthGuard from '@/components/AuthGuard';
import { useEffect, useState } from 'react';
import { getServices, getProducts } from '@/lib/api';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    services: 0,
    products: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [services, products] = await Promise.all([
        getServices(),
        getProducts()
      ]);
      setStats({
        services: services.length,
        products: products.length,
      });
    } catch (err) {
      console.error('Error loading stats:', err);
    }
  };

  return (
    <AuthGuard>
      <div className="p-8 bg-background min-h-screen">
        <h1 className="text-3xl font-bold mb-8 text-text-primary">Tableau de bord Admin</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link href="/admin/services" className="p-6 bg-surface border border-border rounded-3xl shadow-sm hover:shadow-md transition cursor-pointer">
            <h2 className="text-xl font-bold mb-2 text-primary">Services</h2>
            <p className="text-4xl font-bold text-text-primary">{stats.services}</p>
            <p className="text-text-secondary mt-2">Services actifs</p>
          </Link>
          <Link href="/admin/products" className="p-6 bg-surface border border-border rounded-3xl shadow-sm hover:shadow-md transition cursor-pointer">
            <h2 className="text-xl font-bold mb-2 text-primary">Produits</h2>
            <p className="text-4xl font-bold text-text-primary">{stats.products}</p>
            <p className="text-text-secondary mt-2">Produits en catalogue</p>
          </Link>
          <Link href="/admin/promotions" className="p-6 bg-surface border border-border rounded-3xl shadow-sm hover:shadow-md transition cursor-pointer">
            <h2 className="text-xl font-bold mb-2 text-primary">Promotions</h2>
            <p className="text-4xl font-bold text-text-primary">Gérer</p>
            <p className="text-text-secondary mt-2">Promotions en cours</p>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/admin/users" className="p-6 bg-surface border border-border rounded-3xl shadow-sm hover:shadow-md transition cursor-pointer">
            <h2 className="text-xl font-bold mb-2 text-primary">Utilisateurs</h2>
            <p className="text-text-secondary">Gérer les comptes utilisateurs</p>
          </Link>
          <Link href="/" className="p-6 bg-surface border border-border rounded-3xl shadow-sm hover:shadow-md transition cursor-pointer">
            <h2 className="text-xl font-bold mb-2 text-primary">Voir le site</h2>
            <p className="text-text-secondary">Accéder à la boutique publique</p>
          </Link>
        </div>
      </div>
    </AuthGuard>
  );
}
