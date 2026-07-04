'use client';

import { useEffect, useState } from 'react';
import { useNotification } from './NotificationContext';
import { Review } from '@/lib/api';

interface ReviewsListProps {
  productId: string;
}

export function ReviewsList({ productId }: ReviewsListProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotification();

  useEffect(() => {
    loadReviews();
  }, [productId]);

  const loadReviews = async () => {
    try {
      setLoading(true);
      // Appel API pour récupérer les avis
      const response = await fetch(`/api/products/${productId}/reviews`);
      if (!response.ok) throw new Error('Erreur lors du chargement');
      const data = await response.json();
      setReviews(data);
    } catch (err) {
      console.error('Error loading reviews:', err);
      addNotification('error', 'Erreur lors du chargement des avis');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-surface rounded-2xl p-6 border border-border animate-pulse h-40"></div>
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="bg-surface rounded-2xl p-8 border border-border text-center">
        <p className="text-text-secondary">Aucun avis pour le moment</p>
        <p className="text-sm text-text-secondary mt-2">Soyez le premier à laisser un avis!</p>
      </div>
    );
  }

  // Calcul de la note moyenne
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="space-y-4">
      {/* Résumé des avis */}
      <div className="bg-surface rounded-2xl p-6 border border-border">
        <div className="flex items-center gap-4">
          <div>
            <p className="text-4xl font-bold text-primary">{averageRating}</p>
            <div className="flex gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(Number(averageRating))
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <p className="text-sm text-text-secondary mt-2">{reviews.length} avis</p>
          </div>
        </div>
      </div>

      {/* Liste des avis */}
      {reviews.map((review) => (
        <div key={review.id} className="bg-surface rounded-2xl p-6 border border-border">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="font-semibold text-text-primary">{review.author}</p>
              <p className="text-sm text-text-secondary">{new Date(review.createdAt).toLocaleDateString('fr-FR')}</p>
            </div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < (review.rating || 0)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
          </div>
          <p className="text-text-secondary">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}
