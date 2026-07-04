'use client';

import { useEffect, useState } from 'react';
import { getServices, getProducts, type Service, type Product } from '@/lib/api';
import Link from 'next/link';
import { PublicHeader } from '@/components/PublicHeader';
import { PublicFooter } from '@/components/PublicFooter';
import { HeroSection } from '@/components/HeroSection';
import { LoadingState, CardSkeleton } from '@/components/index';

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
    } catch (err) {
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicHeader />

      {/* Hero Section */}
      <div className="max-w-6xl w-full mx-auto px-6 pt-12">
        <HeroSection
          title="Pro Informatique"
          subtitle="Vos services informatiques et produits technologiques de qualité"
          primaryAction={{ label: 'Nos Services', href: '/services' }}
          secondaryAction={{ label: 'Nos Produits', href: '/products' }}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-16">
        {loading ? (
          <>
            {/* Services skeleton */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-text-primary">Nos Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            </div>

            {/* Products skeleton */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-text-primary">Nos Produits</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(i => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Services Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-text-primary">Nos Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {services.slice(0, 3).map((service) => (
                  <div
                    key={service.id}
                    className="p-6 bg-surface border border-border rounded-3xl shadow-sm hover:shadow-md transition animate-fade-in"
                  >
                    <h3 className="text-xl font-bold mb-2 text-primary">{service.title}</h3>
                    <p className="text-text-secondary mb-4 line-clamp-2">{service.description}</p>
                    <p className="text-sm text-text-secondary">{service.priceDisplay}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link
                  href="/services"
                  className="text-primary font-semibold hover:underline transition inline-block"
                >
                  Voir tous les services →
                </Link>
              </div>
            </section>

            {/* Products Section */}
            <section className="bg-surface rounded-3xl p-8 -mx-6 px-6">
              <h2 className="text-3xl font-bold mb-8 text-text-primary">Nos Produits</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {products.slice(0, 4).map((product) => (
                  <div
                    key={product.id}
                    className="bg-background border border-border rounded-3xl overflow-hidden hover:shadow-md transition animate-fade-in"
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-text-primary line-clamp-1">{product.name}</h3>
                      <p className="text-text-secondary text-sm mt-1">{product.category}</p>
                      <p className="text-primary font-bold mt-2">{product.priceDisplay}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link
                  href="/products"
                  className="text-primary font-semibold hover:underline transition inline-block"
                >
                  Voir tous les produits →
                </Link>
              </div>
            </section>
          </>
        )}
      </main>

      <PublicFooter />
    </div>
  );
}
