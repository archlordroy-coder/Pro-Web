'use client';

import { useState, useEffect } from 'react';
import { getServices } from '@/lib/api';
import type { Service } from '@/lib/api';
import Link from 'next/link';
import { PublicHeader } from '@/components/PublicHeader';
import { PublicFooter } from '@/components/PublicFooter';
import { CardSkeleton } from '@/components/index';

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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicHeader />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Nos Services</h1>
          <p className="text-xl opacity-90">Découvrez tous nos services informatiques</p>
        </div>
      </div>

      <main className="flex-1">
      {/* Services Grid */}
      {loading ? (
        <div className="max-w-6xl mx-auto py-16 px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto py-16 px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="p-6 bg-surface border border-border rounded-3xl shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-bold mb-2 text-primary">{service.title}</h3>
              <p className="text-text-secondary mb-4">{service.description}</p>
              {service.priceDisplay && (
                <p className="text-primary font-bold mb-4">{service.priceDisplay}</p>
              )}
              {service.features && service.features.length > 0 && (
                <ul className="text-text-secondary text-sm space-y-1">
                  {service.features.map((feature, index) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        {services.length === 0 && (
          <div className="text-center text-text-secondary py-12">
            Aucun service disponible pour le moment
          </div>
        )}
        </div>
      )}

      {/* CTA Section */}
      <div className="bg-surface py-16 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-text-primary">Besoin d'un service personnalisé ?</h2>
          <p className="text-text-secondary mb-8">Contactez-nous pour discuter de vos besoins</p>
          <Link href="/contact" className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:opacity-90 transition">
            Nous contacter
          </Link>
        </div>
      </div>
      </main>

      <PublicFooter />
    </div>
  );
}
