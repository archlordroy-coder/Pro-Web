'use client';

import AuthGuard from '@/components/AuthGuard';
import { AdminHeader } from '@/components/AdminHeader';
import { AdminForm, type FormField } from '@/components/AdminForm';
import { AdminTable, type TableColumn } from '@/components/AdminTable';
import { useNotification } from '@/components/NotificationContext';
import { useState, useEffect } from 'react';
import { getComputers, updateComputer, Computer } from '@/lib/api';

const computerFormFields: FormField[] = [
  { name: 'name', label: 'Nom de l\'ordinateur', type: 'text', required: true, placeholder: 'Poste 1' },
  {
    name: 'isAvailable',
    label: 'Disponibilité',
    type: 'select',
    required: true,
    options: [
      { label: 'Disponible', value: 'true' },
      { label: 'Occupé', value: 'false' },
    ],
  },
];

const computerColumns: TableColumn[] = [
  { key: 'name', label: 'Nom' },
  {
    key: 'isAvailable',
    label: 'Statut',
    render: (value: boolean) => (
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${value ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span>{value ? 'Disponible' : 'Occupé'}</span>
      </div>
    ),
  },
];

export default function ComputersPage() {
  const { addNotification } = useNotification();
  const [computers, setComputers] = useState<Computer[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<Computer>>({
    name: '',
    isAvailable: true,
  });

  useEffect(() => {
    loadComputers();
  }, []);

  const loadComputers = async () => {
    try {
      const data = await getComputers();
      setComputers(data);
    } catch (err) {
      console.error('Error fetching computers:', err);
      addNotification('error', 'Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  const handleDataChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: field === 'isAvailable' ? value === 'true' : value,
    }));
  };

  const handleSave = async () => {
    if (!formData.name) {
      addNotification('error', 'Veuillez remplir le nom');
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingId) {
        await updateComputer(editingId, formData as Computer);
        addNotification('success', 'Ordinateur mis à jour');
      } else {
        const newComputer: Computer = {
          ...formData,
          id: Date.now().toString(),
        } as Computer;
        // TODO: Créer une fonction createComputer dans l'API
        addNotification('success', 'Ordinateur créé');
      }
      setEditingId(null);
      setFormData({
        name: '',
        isAvailable: true,
      });
      await loadComputers();
    } catch (err) {
      console.error('Error:', err);
      addNotification('error', 'Erreur lors de la sauvegarde');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      // TODO: Créer une fonction deleteComputer dans l'API
      addNotification('success', 'Ordinateur supprimé');
      await loadComputers();
    } catch (err) {
      console.error('Error:', err);
      addNotification('error', 'Erreur lors de la suppression');
    }
  };

  const handleEdit = (computer: Computer) => {
    setEditingId(computer.id);
    setFormData(computer);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      name: '',
      isAvailable: true,
    });
  };

  return (
    <AuthGuard>
      <div className="p-8 bg-background min-h-screen">
        <AdminHeader
          title="Gestion des Ordinateurs"
          description="Gérez la disponibilité et l'état des ordinateurs"
          action={{
            label: '+ Nouvel ordinateur',
            onClick: () => {
              setEditingId(null);
              setFormData({
                name: '',
                isAvailable: true,
              });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            },
          }}
        />

        {editingId || formData.name ? (
          <AdminForm
            title={editingId ? 'Modifier l\'ordinateur' : 'Nouvel ordinateur'}
            fields={computerFormFields}
            data={formData}
            onDataChange={handleDataChange}
            onSubmit={handleSave}
            onCancel={handleCancel}
            isSubmitting={isSubmitting}
            submitLabel={editingId ? 'Mettre à jour' : 'Créer'}
          />
        ) : null}

        <AdminTable
          columns={computerColumns}
          data={computers}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
          emptyMessage="Aucun ordinateur. Ajoutez-en un!"
        />
      </div>
    </AuthGuard>
  );
}
