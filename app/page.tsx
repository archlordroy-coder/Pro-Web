'use client';

import { useEffect, useState } from 'react';
import { getServices, getProducts, type Service, type Product } from '@/lib/api';
import Link from 'next/link';

export default function Home() {
  const [services, setServices] = useState<Service[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [servicesData, productsData] = await Promise.all([
        getServices(),
        getProducts()
      ]);
      setServices(servicesData);
      setProducts(productsData);
      setLoading(false);
    } catch (err) {
      console.error('Error loading data:', err);
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-text-secondary">Chargement...</div>;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Pro Informatique</h1>
          <p className="text-xl opacity-90">Vos services informatiques et produits technologiques</p>
          <div className="mt-8 flex gap-4">
            <Link href="/services" className="px-6 py-3 bg-white text-primary rounded-xl font-bold hover:opacity-90 transition">
              Nos Services
            </Link>
            <Link href="/products" className="px-6 py-3 bg-white/20 text-white rounded-xl font-bold hover:bg-white/30 transition">
              Nos Produits
            </Link>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-6xl mx-auto py-16 px-8">
        <h2 className="text-3xl font-bold mb-8 text-text-primary">Nos Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.slice(0, 3).map((service) => (
            <div key={service.id} className="p-6 bg-surface border border-border rounded-3xl shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-bold mb-2 text-primary">{service.title}</h3>
              <p className="text-text-secondary">{service.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/services" className="text-primary font-semibold hover:underline">
            Voir tous les services →
          </Link>
        </div>
      </div>

      {/* Products Section */}
      <div className="bg-surface py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-text-primary">Nos Produits</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <div key={product.id} className="bg-background border border-border rounded-3xl overflow-hidden hover:shadow-md transition">
                <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-text-primary">{product.name}</h3>
                  <p className="text-text-secondary text-sm mt-1">{product.category}</p>
                  <p className="text-primary font-bold mt-2">{product.priceDisplay}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/products" className="text-primary font-semibold hover:underline">
              Voir tous les produits →
            </Link>
          </div>
        </div>
      </div>

      {/* Admin Link */}
      <div className="max-w-6xl mx-auto py-16 px-8 text-center">
        <Link href="/admin" className="text-text-secondary hover:text-primary transition">
          Accès Admin →
        </Link>
      </div>
    </div>
  );
}
