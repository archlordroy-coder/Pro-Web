'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthContext';

interface Service {
  id: string;
  title: string;
  category: string;
  price_range: string;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.proinformatique.dev';
    
    fetch(`${API_URL}/api/services`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching services:', err);
        setLoading(false);
      });
  }, [token]);

  if (loading) return <div className="p-8 text-text-secondary">Chargement des services...</div>;
  if (!token) return <div className="p-8 text-text-secondary">Authentification requise.</div>;

  return (
    <div className="p-8 bg-background min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-text-primary">Gestion des Services</h1>
      <div className="bg-surface border border-border rounded-3xl shadow-sm overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-surfaceMuted">
            <tr className="text-left">
              <th className="p-4 text-text-primary font-semibold">Titre</th>
              <th className="p-4 text-text-primary font-semibold">Catégorie</th>
              <th className="p-4 text-text-primary font-semibold">Prix</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} className="border-t border-border">
                <td className="p-4 text-text-secondary">{service.title}</td>
                <td className="p-4 text-text-secondary">{service.category}</td>
                <td className="p-4 text-text-secondary">{service.price_range}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
