'use client';

import AuthGuard from '@/components/AuthGuard';
import { AdminHeader } from '@/components/AdminHeader';
import { AdminForm, type FormField } from '@/components/AdminForm';
import { AdminTable, type TableColumn } from '@/components/AdminTable';
import { useNotification } from '@/components/NotificationContext';
import { useState, useEffect } from 'react';
import { getServices, createService, updateService, deleteService, type Service } from '@/lib/api';

const serviceFormFields: FormField[] = [
  { name: 'title', label: 'Titre du service', type: 'text', required: true, placeholder: 'Entrer le titre' },
  { name: 'description', label: 'Description', type: 'textarea', required: true, placeholder: 'Décrire le service' },
  { name: 'category', label: 'Catégorie', type: 'text', placeholder: 'Ex: Support Informatique' },
  { name: 'priceDisplay', label: 'Prix affiché', type: 'text', required: true, placeholder: 'Ex: À partir de 10 000 FCFA' },
];

const serviceColumns: TableColumn[] = [
  { key: 'title', label: 'Titre' },
  { key: 'category', label: 'Catégorie' },
  { key: 'priceDisplay', label: 'Prix' },
  {
    key: 'description',
    label: 'Description',
    render: (value: string) => (
      <span className="truncate max-w-xs" title={value}>
        {value?.substring(0, 50)}...
      </span>
    ),
  },
];

export default function AdminServicesPage() {
  const { addNotification } = useNotification();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<Service>>({
    title: '',
    description: '',
    category: '',
    priceDisplay: '',
  });

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const data = await getServices();
      setServices(data);
    } catch (err) {
      console.error('Error fetching services:', err);
      addNotification('error', 'Erreur lors du chargement des services');
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
        await updateService(editingId, formData as Service);
        addNotification('success', 'Service mis à jour avec succès');
      } else {
        const newService: Service = {
          ...formData,
          id: Date.now().toString(),
        } as Service;
        await createService(newService);
        addNotification('success', 'Service créé avec succès');
      }
      setEditingId(null);
      setFormData({
        title: '',
        description: '',
        category: '',
        priceDisplay: '',
      });
      await loadServices();
    } catch (err) {
      console.error('Error saving service:', err);
      addNotification('error', 'Erreur lors de la sauvegarde');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteService(id);
      addNotification('success', 'Service supprimé avec succès');
      await loadServices();
    } catch (err) {
      console.error('Error deleting service:', err);
      addNotification('error', 'Erreur lors de la suppression');
    }
  };

  const handleEdit = (service: Service) => {
    setEditingId(service.id);
    setFormData(service);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      category: '',
      priceDisplay: '',
    });
  };

  return (
    <AuthGuard>
      <div className="p-8 bg-background min-h-screen">
        <AdminHeader
          title="Gestion des Services"
          description="Créer, modifier et supprimer les services informatiques"
          action={{
            label: '+ Nouveau service',
            onClick: () => {
              setEditingId(null);
              setFormData({
                title: '',
                description: '',
                category: '',
                priceDisplay: '',
              });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            },
          }}
        />

        {editingId || Object.values(formData).some(v => v) ? (
          <AdminForm
            title={editingId ? 'Modifier le service' : 'Nouveau service'}
            fields={serviceFormFields}
            data={formData}
            onDataChange={handleDataChange}
            onSubmit={handleSave}
            onCancel={handleCancel}
            isSubmitting={isSubmitting}
            submitLabel={editingId ? 'Mettre à jour' : 'Créer'}
          />
        ) : null}

        <AdminTable
          columns={serviceColumns}
          data={services}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
          emptyMessage="Aucun service. Créez le premier maintenant!"
        />
      </div>
    </AuthGuard>
  );
}
