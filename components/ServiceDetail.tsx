'use client';

import { useState } from 'react';
import { Service } from '@/lib/api';
import { ReviewsList } from './ReviewsList';
import { AddReviewForm } from './AddReviewForm';

interface ServiceDetailProps {
  service: Service;
  onBackClick: () => void;
}

export function ServiceDetail({ service, onBackClick }: ServiceDetailProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [quoteData, setQuoteData] = useState({
    name: '',
    email: '',
    phone: '',
    description: '',
  });

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Logique de soumission du devis
    console.log('Devis:', quoteData);
    setShowQuoteForm(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header avec bouton retour */}
      <div className="sticky top-0 z-40 bg-surface border-b border-border">
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
          <h1 className="text-2xl font-bold text-text-primary">{service.title}</h1>
        </div>
      </div>

      {/* Contenu principal */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image et prix */}
          <div>
            <div className="bg-surface rounded-3xl overflow-hidden border border-border">
              <img
                src={`/services/${service.id.toLowerCase()}.png`}
                alt={service.title}
                className="w-full h-96 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/services/support.png';
                }}
              />
            </div>
            <div className="mt-6 space-y-4">
              <div className="bg-surface rounded-2xl p-6 border border-border">
                <p className="text-text-secondary text-sm mb-2">Prix à partir de</p>
                <p className="text-4xl font-bold text-primary">{service.priceDisplay}</p>
              </div>
              <button
                onClick={() => setShowQuoteForm(true)}
                className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
              >
                Demander un devis
              </button>
            </div>
          </div>

          {/* Détails */}
          <div>
            <div className="bg-surface rounded-3xl p-8 border border-border">
              <h2 className="text-2xl font-bold text-text-primary mb-4">À propos de ce service</h2>
              <p className="text-text-secondary mb-6 leading-relaxed">{service.description}</p>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-text-secondary mb-2">CATÉGORIE</h3>
                  <p className="text-text-primary">{service.category}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text-secondary mb-2">DISPONIBILITÉ</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <p className="text-text-primary">Service disponible</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text-secondary mb-2">INTERVENTION</h3>
                  <p className="text-text-primary">Intervention rapide sur demande</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Formulaire de devis */}
        {showQuoteForm && (
          <div className="mt-12 bg-surface rounded-3xl p-8 border border-border max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-text-primary mb-6">Demander un devis</h2>
            <form onSubmit={handleQuoteSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Nom complet</label>
                <input
                  type="text"
                  value={quoteData.name}
                  onChange={(e) => setQuoteData({ ...quoteData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Votre nom"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Email</label>
                <input
                  type="email"
                  value={quoteData.email}
                  onChange={(e) => setQuoteData({ ...quoteData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="votre@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Téléphone</label>
                <input
                  type="tel"
                  value={quoteData.phone}
                  onChange={(e) => setQuoteData({ ...quoteData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="+1 (555) 000-0000"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Description du besoin</label>
                <textarea
                  value={quoteData.description}
                  onChange={(e) => setQuoteData({ ...quoteData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  rows={5}
                  placeholder="Décrivez votre besoin en détail"
                  required
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
                >
                  Envoyer la demande
                </button>
                <button
                  type="button"
                  onClick={() => setShowQuoteForm(false)}
                  className="flex-1 bg-surface-muted text-text-primary py-3 rounded-lg font-semibold hover:opacity-90 transition"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Section Avis et Commentaires */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-text-primary mb-8">Avis des clients</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ReviewsList productId={service.id} />
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
                  productId={service.id}
                  onSuccess={() => setShowReviewForm(false)}
                  onCancel={() => setShowReviewForm(false)}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
