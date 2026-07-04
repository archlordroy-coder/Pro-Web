'use client';

import AuthGuard from '@/components/AuthGuard';
import { AdminHeader } from '@/components/AdminHeader';
import { AdminTable, type TableColumn } from '@/components/AdminTable';
import { useNotification } from '@/components/NotificationContext';
import { useState, useEffect } from 'react';
import { getReviews, deleteReview, Review } from '@/lib/api';

const reviewColumns: TableColumn[] = [
  { key: 'author', label: 'Auteur' },
  { key: 'productId', label: 'Produit/Service' },
  {
    key: 'rating',
    label: 'Note',
    render: (value: number) => (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${
              i < value
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
    ),
  },
  {
    key: 'comment',
    label: 'Commentaire',
    render: (value: string) => (
      <span className="truncate max-w-xs block">{value?.substring(0, 50)}...</span>
    ),
  },
  {
    key: 'createdAt',
    label: 'Date',
    render: (value: string | Date) => {
      if (!value) return '-';
      return new Date(value).toLocaleDateString('fr-FR');
    },
  },
];

export default function ReviewsPage() {
  const { addNotification } = useNotification();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const data = await getReviews();
      setReviews(data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      addNotification('error', 'Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteReview(id);
      addNotification('success', 'Avis supprimé');
      await loadReviews();
    } catch (err) {
      console.error('Error:', err);
      addNotification('error', 'Erreur lors de la suppression');
    }
  };

  const stats = {
    total: reviews.length,
    average:
      reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length).toFixed(1)
        : 0,
    recent: reviews.slice(0, 5).length,
  };

  return (
    <AuthGuard>
      <div className="p-8 bg-background min-h-screen">
        <AdminHeader
          title="Gestion des Avis et Commentaires"
          description="Modérez et gérez les avis des clients"
        />

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-surface rounded-2xl p-6 border border-border">
            <p className="text-text-secondary text-sm mb-2">Total des avis</p>
            <p className="text-4xl font-bold text-primary">{stats.total}</p>
          </div>
          <div className="bg-surface rounded-2xl p-6 border border-border">
            <p className="text-text-secondary text-sm mb-2">Note moyenne</p>
            <div className="flex items-center gap-2">
              <p className="text-4xl font-bold text-primary">{stats.average}</p>
              <svg className="w-6 h-6 fill-yellow-400 text-yellow-400" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
          </div>
          <div className="bg-surface rounded-2xl p-6 border border-border">
            <p className="text-text-secondary text-sm mb-2">Avis récents</p>
            <p className="text-4xl font-bold text-primary">{stats.recent}</p>
          </div>
        </div>

        <AdminTable
          columns={reviewColumns}
          data={reviews}
          onDelete={handleDelete}
          loading={loading}
          emptyMessage="Aucun avis pour le moment"
          hideEditButton
        />
      </div>
    </AuthGuard>
  );
}
