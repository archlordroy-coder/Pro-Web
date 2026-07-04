'use client';

import { useState, useEffect } from 'react';
import { getServices } from '@/lib/api';
import type { Service } from '@/lib/api';

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServices()
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching services:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8 text-text-secondary">Chargement des services...</div>;

  return (
    <div className="p-8 bg-background min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-text-primary">Gestion des Services</h1>
      <div className="bg-surface border border-border rounded-3xl shadow-sm overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-surfaceMuted">
            <tr className="text-left">
              <th className="p-4 text-text-primary font-semibold">Titre</th>
              <th className="p-4 text-text-primary font-semibold">Description</th>
              <th className="p-4 text-text-primary font-semibold">Fonctionnalités</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} className="border-t border-border">
                <td className="p-4 text-text-secondary">{service.title}</td>
                <td className="p-4 text-text-secondary">{service.description}</td>
                <td className="p-4 text-text-secondary">{service.features.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
