'use client';

import { useState, useEffect } from 'react';

interface Service {
  id: string;
  title: string;
  category: string;
  price_range: string;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Note: Replace with your actual deployed API URL
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    
    fetch(`${API_URL}/api/services`)
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching services:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8">Chargement...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Gestion des Services</h1>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Titre</th>
            <th className="border p-2">Catégorie</th>
            <th className="border p-2">Prix</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td className="border p-2">{service.title}</td>
              <td className="border p-2">{service.category}</td>
              <td className="border p-2">{service.price_range}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
