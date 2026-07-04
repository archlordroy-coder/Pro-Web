'use client';

import AuthGuard from '@/components/AuthGuard';
import { useState, useEffect } from 'react';
import { getServices, createService, updateService, deleteService, type Service } from '@/lib/api';

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Service>>({});

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const data = await getServices();
      setServices(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching services:', err);
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.description) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    try {
      if (editingId) {
        await updateService(editingId, formData as Service);
      } else {
        const newId = Date.now().toString();
        await createService({ ...formData, id: newId } as Service);
      }
      setEditingId(null);
      setFormData({});
      await loadServices();
    } catch (err) {
      console.error('Error saving service:', err);
      alert('Erreur lors de la sauvegarde');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) return;
    
    try {
      await deleteService(id);
      await loadServices();
    } catch (err) {
      console.error('Error deleting service:', err);
      alert('Erreur lors de la suppression');
    }
  };

  const handleEdit = (service: Service) => {
    setEditingId(service.id);
    setFormData(service);
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({});
  };

  if (loading) return <div className="p-8 text-text-secondary">Chargement des services...</div>;

  return (
    <AuthGuard>
      <div className="p-8 bg-background min-h-screen">
        <h1 className="text-3xl font-bold mb-8 text-text-primary">Gestion des Services</h1>
        
        <div className="bg-surface border border-border rounded-3xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-text-primary">
            {editingId ? 'Modifier le service' : 'Nouveau service'}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Titre</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-3 border border-border rounded-xl bg-background text-text-primary"
                placeholder="Titre du service"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Description</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-3 border border-border rounded-xl bg-background text-text-primary"
                placeholder="Description du service"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Catégorie</label>
              <input
                type="text"
                value={formData.category || ''}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-3 border border-border rounded-xl bg-background text-text-primary"
                placeholder="Catégorie"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Prix</label>
              <input
                type="text"
                value={formData.priceDisplay || ''}
                onChange={(e) => setFormData({ ...formData, priceDisplay: e.target.value })}
                className="w-full p-3 border border-border rounded-xl bg-background text-text-primary"
                placeholder="Ex: À partir de 10 000 FCFA"
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
                <th className="p-4 text-text-primary font-semibold">Titre</th>
                <th className="p-4 text-text-primary font-semibold">Catégorie</th>
                <th className="p-4 text-text-primary font-semibold">Prix</th>
                <th className="p-4 text-text-primary font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id} className="border-t border-border">
                  <td className="p-4 text-text-secondary">{service.title}</td>
                  <td className="p-4 text-text-secondary">{service.category}</td>
                  <td className="p-4 text-text-secondary">{service.priceDisplay}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(service)}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(service.id)}
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
          {services.length === 0 && (
            <div className="p-8 text-center text-text-secondary">
              Aucun service disponible
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}
