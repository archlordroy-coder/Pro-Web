'use client';

import AuthGuard from '@/components/AuthGuard';
import { AdminHeader } from '@/components/AdminHeader';
import { AdminForm, type FormField } from '@/components/AdminForm';
import { AdminTable, type TableColumn } from '@/components/AdminTable';
import { useNotification } from '@/components/NotificationContext';
import { useState, useEffect } from 'react';
import { getCyberTickets, createCyberTicket, updateCyberTicket, deleteCyberTicket, CyberTicket } from '@/lib/api';

const ticketFormFields: FormField[] = [
  { name: 'customerName', label: 'Nom du client', type: 'text', required: true, placeholder: 'Nom complet' },
  { name: 'computerId', label: 'ID Ordinateur', type: 'text', required: true, placeholder: 'Identifiant unique' },
  { name: 'duration', label: 'Durée', type: 'text', required: true, placeholder: 'Ex: 2 heures' },
  { name: 'price', label: 'Prix (FCFA)', type: 'number', required: true, placeholder: '10000' },
  { name: 'priceDisplay', label: 'Affichage du prix', type: 'text', required: true, placeholder: 'Ex: 10 000 FCFA' },
];

const ticketColumns: TableColumn[] = [
  { key: 'customerName', label: 'Client' },
  { key: 'computerId', label: 'Ordinateur' },
  { key: 'duration', label: 'Durée' },
  { key: 'priceDisplay', label: 'Prix' },
  {
    key: 'startTime',
    label: 'Date',
    render: (value: string) => {
      if (!value) return '-';
      return new Date(value).toLocaleDateString('fr-FR');
    },
  },
];

export default function CyberTicketsPage() {
  const { addNotification } = useNotification();
  const [tickets, setTickets] = useState<CyberTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<CyberTicket>>({
    customerName: '',
    computerId: '',
    duration: '',
    price: 0,
    priceDisplay: '',
  });

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const data = await getCyberTickets();
      setTickets(data);
    } catch (err) {
      console.error('Error fetching tickets:', err);
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
        await updateCyberTicket(editingId, formData as CyberTicket);
        addNotification('success', 'Cyber-ticket mis à jour');
      } else {
        const newTicket: CyberTicket = {
          ...formData,
          id: Date.now().toString(),
          startTime: new Date(),
        } as CyberTicket;
        await createCyberTicket(newTicket);
        addNotification('success', 'Cyber-ticket créé');
      }
      setEditingId(null);
      setFormData({
        customerName: '',
        computerId: '',
        duration: '',
        price: 0,
        priceDisplay: '',
      });
      await loadTickets();
    } catch (err) {
      console.error('Error:', err);
      addNotification('error', 'Erreur lors de la sauvegarde');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCyberTicket(id);
      addNotification('success', 'Cyber-ticket supprimé');
      await loadTickets();
    } catch (err) {
      console.error('Error:', err);
      addNotification('error', 'Erreur lors de la suppression');
    }
  };

  const handleEdit = (ticket: CyberTicket) => {
    setEditingId(ticket.id);
    setFormData(ticket);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      customerName: '',
      computerId: '',
      duration: '',
      price: 0,
      priceDisplay: '',
    });
  };

  return (
    <AuthGuard>
      <div className="p-8 bg-background min-h-screen">
        <AdminHeader
          title="Gestion des Cyber-Tickets"
          description="Gérez les cyber-tickets et utilisations d'ordinateurs"
          action={{
            label: '+ Nouveau ticket',
            onClick: () => {
              setEditingId(null);
              setFormData({
                customerName: '',
                computerId: '',
                duration: '',
                price: 0,
                priceDisplay: '',
              });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            },
          }}
        />

        {editingId || Object.values(formData).some(v => v) ? (
          <AdminForm
            title={editingId ? 'Modifier le ticket' : 'Nouveau cyber-ticket'}
            fields={ticketFormFields}
            data={formData}
            onDataChange={handleDataChange}
            onSubmit={handleSave}
            onCancel={handleCancel}
            isSubmitting={isSubmitting}
            submitLabel={editingId ? 'Mettre à jour' : 'Créer'}
          />
        ) : null}

        <AdminTable
          columns={ticketColumns}
          data={tickets}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
          emptyMessage="Aucun cyber-ticket. Créez le premier!"
        />
      </div>
    </AuthGuard>
  );
}
