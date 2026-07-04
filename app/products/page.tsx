'use client';

import { useState, useEffect } from 'react';
import { getProducts } from '@/lib/api';
import type { Product } from '@/lib/api';
import Link from 'next/link';
import { PublicHeader } from '@/components/PublicHeader';
import { PublicFooter } from '@/components/PublicFooter';
import { CardSkeleton } from '@/components/index';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicHeader />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Nos Produits</h1>
          <p className="text-xl opacity-90">Découvrez notre catalogue de produits technologiques</p>
        </div>
      </div>

      <main className="flex-1">
      {/* Products Grid */}
      {loading ? (
        <div className="max-w-6xl mx-auto py-16 px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto py-16 px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-surface border border-border rounded-3xl overflow-hidden hover:shadow-md transition">
              <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-text-primary">{product.name}</h3>
                <p className="text-text-secondary text-sm mt-1">{product.category}</p>
                <p className="text-primary font-bold mt-2">{product.priceDisplay}</p>
              </div>
            </div>
          ))}
        </div>
        {products.length === 0 && (
          <div className="text-center text-text-secondary py-12">
            Aucun produit disponible pour le moment
          </div>
        )}
        </div>
      )}

      {/* CTA Section */}
      <div className="bg-surface py-16 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-text-primary">Besoin d'un produit personnalisé ?</h2>
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
