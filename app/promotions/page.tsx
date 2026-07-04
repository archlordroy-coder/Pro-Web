'use client';

import { useState, useEffect } from 'react';
import { getPromotions, createPromotion, updatePromotion, deletePromotion } from '@/lib/api';
import type { Promotion } from '@/lib/api';

export default function PromotionsPage() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Promotion>>({});

  useEffect(() => {
    loadPromotions();
  }, []);

  const loadPromotions = async () => {
    try {
      const data = await getPromotions();
      setPromotions(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching promotions:', err);
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.description || !formData.imageUrl) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    try {
      if (editingId) {
        await updatePromotion(editingId, formData as Promotion);
      } else {
        const newId = Date.now().toString();
        await createPromotion({ ...formData, id: newId } as Promotion);
      }
      setEditingId(null);
      setFormData({});
      await loadPromotions();
    } catch (err) {
      console.error('Error saving promotion:', err);
      alert('Erreur lors de la sauvegarde');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette promotion ?')) return;
    
    try {
      await deletePromotion(id);
      await loadPromotions();
    } catch (err) {
      console.error('Error deleting promotion:', err);
      alert('Erreur lors de la suppression');
    }
  };

  const handleEdit = (promotion: Promotion) => {
    setEditingId(promotion.id);
    setFormData(promotion);
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({});
  };

  if (loading) return <div className="p-8 text-text-secondary">Chargement des promotions...</div>;

  return (
    <div className="p-8 bg-background min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-text-primary">Gestion des Promotions</h1>
      
      <div className="bg-surface border border-border rounded-3xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-text-primary">
          {editingId ? 'Modifier la promotion' : 'Nouvelle promotion'}
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Titre</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-3 border border-border rounded-xl bg-background text-text-primary"
              placeholder="Titre de la promotion"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Description</label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-3 border border-border rounded-xl bg-background text-text-primary"
              placeholder="Description de la promotion"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">URL de l'image</label>
            <input
              type="text"
              value={formData.imageUrl || ''}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full p-3 border border-border rounded-xl bg-background text-text-primary"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition"
            >
              {editingId ? 'Mettre à jour' : 'Créer'}
            </button>
            {editingId && (
              <button
                onClick={handleCancel}
                className="px-6 py-3 bg-surfaceMuted text-text-primary rounded-xl font-semibold hover:opacity-90 transition"
              >
                Annuler
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-3xl shadow-sm overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-surfaceMuted">
            <tr className="text-left">
              <th className="p-4 text-text-primary font-semibold">Image</th>
              <th className="p-4 text-text-primary font-semibold">Titre</th>
              <th className="p-4 text-text-primary font-semibold">Description</th>
              <th className="p-4 text-text-primary font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {promotions.map((promotion) => (
              <tr key={promotion.id} className="border-t border-border">
                <td className="p-4">
                  <img
                    src={promotion.imageUrl}
                    alt={promotion.title}
                    className="w-20 h-20 object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.png';
                    }}
                  />
                </td>
                <td className="p-4 text-text-secondary">{promotion.title}</td>
                <td className="p-4 text-text-secondary max-w-xs truncate">{promotion.description}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(promotion)}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(promotion.id)}
                      className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-sm font-medium hover:bg-red-200 transition"
                    >
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {promotions.length === 0 && (
          <div className="p-8 text-center text-text-secondary">
            Aucune promotion disponible
          </div>
        )}
      </div>
    </div>
  );
}
