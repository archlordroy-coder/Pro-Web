'use client';

import { useState } from 'react';
import { useNotification } from './NotificationContext';

interface AddReviewFormProps {
  productId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export function AddReviewForm({ productId, onSuccess, onCancel }: AddReviewFormProps) {
  const [rating, setRating] = useState(5);
  const [author, setAuthor] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addNotification } = useNotification();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!author.trim() || !comment.trim()) {
      addNotification('error', 'Veuillez remplir tous les champs');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating,
          author,
          comment,
          productId,
        }),
      });

      if (!response.ok) throw new Error('Erreur lors de la soumission');

      addNotification('success', 'Avis publié avec succès!');
      onSuccess();
    } catch (err) {
      console.error('Error submitting review:', err);
      addNotification('error', 'Erreur lors de la publication');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-surface rounded-2xl p-6 border border-border space-y-4">
      <h3 className="font-semibold text-text-primary">Ajouter un avis</h3>

      <div>
        <label className="text-sm font-medium text-text-secondary block mb-2">Nom</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Votre nom"
          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label className="text-sm font-medium text-text-secondary block mb-2">Note</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              disabled={isSubmitting}
              className="focus:outline-none transition"
            >
              <svg
                className={`w-6 h-6 cursor-pointer ${
                  star <= rating
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-text-secondary block mb-2">Commentaire</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Partagez votre expérience avec ce produit"
          rows={4}
          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          disabled={isSubmitting}
        />
      </div>

      <div className="flex gap-2 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-primary text-white py-2 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
        >
          {isSubmitting ? 'Publication...' : 'Publier'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex-1 bg-surface-muted text-text-primary py-2 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
