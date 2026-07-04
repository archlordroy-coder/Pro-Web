'use client';

import AuthGuard from '@/components/AuthGuard';
import { AdminHeader } from '@/components/AdminHeader';
import { AdminForm, type FormField } from '@/components/AdminForm';
import { AdminTable, type TableColumn } from '@/components/AdminTable';
import { useNotification } from '@/components/NotificationContext';
import { useState, useEffect } from 'react';
import { getPromotions, createPromotion, updatePromotion, deletePromotion, Promotion } from '@/lib/api';

const promotionFormFields: FormField[] = [
  { name: 'title', label: 'Titre', type: 'text', required: true, placeholder: 'Titre de la promotion' },
  { name: 'description', label: 'Description', type: 'textarea', required: true, placeholder: 'Détails de la promotion' },
  { name: 'imageUrl', label: 'URL de l\'image', type: 'text', placeholder: 'https://...' },
];

const promotionColumns: TableColumn[] = [
  { key: 'title', label: 'Titre' },
  {
    key: 'description',
    label: 'Description',
    render: (value: string) => (
      <span className="truncate max-w-xs">{value?.substring(0, 50)}...</span>
    ),
  },
  {
    key: 'imageUrl',
    label: 'Image',
    render: (value: string) => (
      <div className="w-10 h-10 bg-surface-muted rounded border border-border flex items-center justify-center">
        {value ? '✓' : '-'}
      </div>
    ),
  },
];

export default function PromotionsPage() {
  const { addNotification } = useNotification();
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<Promotion>>({
    title: '',
    description: '',
    imageUrl: '',
  });

  useEffect(() => {
    loadPromotions();
  }, []);

  const loadPromotions = async () => {
    try {
      const data = await getPromotions();
      setPromotions(data);
    } catch (err) {
      console.error('Error:', err);
      addNotification('error', 'Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  const handleDataChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      if (editingId) {
        await updatePromotion(editingId, formData as Promotion);
        addNotification('success', 'Promotion mise à jour');
      } else {
        const newPromotion: Promotion = {
          ...formData,
          id: Date.now().toString(),
        } as Promotion;
        await createPromotion(newPromotion);
        addNotification('success', 'Promotion créée');
      }
      setEditingId(null);
      setFormData({
        title: '',
        description: '',
        imageUrl: '',
      });
      await loadPromotions();
    } catch (err) {
      console.error('Error:', err);
      addNotification('error', 'Erreur lors de la sauvegarde');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePromotion(id);
      addNotification('success', 'Promotion supprimée');
      await loadPromotions();
    } catch (err) {
      console.error('Error:', err);
      addNotification('error', 'Erreur lors de la suppression');
    }
  };

  const handleEdit = (promotion: Promotion) => {
    setEditingId(promotion.id);
    setFormData(promotion);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      imageUrl: '',
    });
  };

  return (
    <AuthGuard>
      <div className="p-8 bg-background min-h-screen">
        <AdminHeader
          title="Gestion des Promotions"
          description="Créez et gérez les promotions et offres spéciales"
          action={{
            label: '+ Nouvelle promotion',
            onClick: () => {
              setEditingId(null);
              setFormData({
                title: '',
                description: '',
                imageUrl: '',
              });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            },
          }}
        />

        {editingId || Object.values(formData).some(v => v) ? (
          <AdminForm
            title={editingId ? 'Modifier la promotion' : 'Nouvelle promotion'}
            fields={promotionFormFields}
            data={formData}
            onDataChange={handleDataChange}
            onSubmit={handleSave}
            onCancel={handleCancel}
            isSubmitting={isSubmitting}
            submitLabel={editingId ? 'Mettre à jour' : 'Créer'}
          />
        ) : null}

        <AdminTable
          columns={promotionColumns}
          data={promotions}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
          emptyMessage="Aucune promotion. Créez la première!"
        />
      </div>
    </AuthGuard>
  );
}
