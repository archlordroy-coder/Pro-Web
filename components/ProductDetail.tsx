'use client';

import { useState } from 'react';
import { Product } from '@/lib/api';
import { ReviewsList } from './ReviewsList';
import { AddReviewForm } from './AddReviewForm';
import { PublicHeader } from './PublicHeader';
import { PublicFooter } from './PublicFooter';

interface ProductDetailProps {
  product: Product;
  onBackClick: () => void;
}

export function ProductDetail({ product, onBackClick }: ProductDetailProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicHeader />
      {/* Header avec bouton retour */}
      <div className="sticky top-16 z-30 bg-surface border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={onBackClick}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-secondary hover:text-primary hover:bg-background rounded-lg transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour
          </button>
          <h1 className="text-2xl font-bold text-text-primary">{product.name}</h1>
        </div>
      </div>

      {/* Contenu principal */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image et prix */}
          <div>
            <div className="bg-surface rounded-3xl overflow-hidden border border-border">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="mt-6 space-y-4">
              <div className="bg-surface rounded-2xl p-6 border border-border">
                <p className="text-text-secondary text-sm mb-2">Prix à partir de</p>
                <p className="text-4xl font-bold text-primary">{product.priceDisplay}</p>
              </div>
              <button className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:opacity-90 transition">
                Demander un devis
              </button>
            </div>
          </div>

          {/* Détails */}
          <div>
            <div className="bg-surface rounded-3xl p-8 border border-border">
              <h2 className="text-2xl font-bold text-text-primary mb-4">À propos de ce produit</h2>
              <p className="text-text-secondary mb-6 leading-relaxed">{product.description}</p>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-text-secondary mb-2">CATÉGORIE</h3>
                  <p className="text-text-primary">{product.category}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text-secondary mb-2">DISPONIBILITÉ</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <p className="text-text-primary">En stock</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text-secondary mb-2">LIVRAISON</h3>
                  <p className="text-text-primary">Livraison gratuite pour commandes &gt; 50 000 FCFA</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Avis et Commentaires */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-text-primary mb-8">Avis et Commentaires</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ReviewsList productId={product.id} />
            </div>
            <div>
              {!showReviewForm ? (
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
                >
                  Laisser un avis
                </button>
              ) : (
                <AddReviewForm
                  productId={product.id}
                  onSuccess={() => setShowReviewForm(false)}
                  onCancel={() => setShowReviewForm(false)}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
