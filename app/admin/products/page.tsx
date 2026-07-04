'use client';

import AuthGuard from '@/components/AuthGuard';
import { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct, type Product } from '@/lib/api';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({});

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching products:', err);
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.name || !formData.category || !formData.priceDisplay) {
      alert('Veuillez remplir tous les champs requis');
      return;
    }

    try {
      if (editingId) {
        await updateProduct(editingId, formData as Product);
      } else {
        const newId = Date.now().toString();
        await createProduct({ ...formData, id: newId } as Product);
      }
      setEditingId(null);
      setFormData({});
      await loadProducts();
    } catch (err) {
      console.error('Error saving product:', err);
      alert('Erreur lors de la sauvegarde');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) return;
    
    try {
      await deleteProduct(id);
      await loadProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Erreur lors de la suppression');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData(product);
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({});
  };

  if (loading) return <div className="p-8 text-text-secondary">Chargement des produits...</div>;

  return (
    <AuthGuard>
      <div className="p-8 bg-background min-h-screen">
        <h1 className="text-3xl font-bold mb-8 text-text-primary">Gestion des Produits</h1>
        
        <div className="bg-surface border border-border rounded-3xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-text-primary">
            {editingId ? 'Modifier le produit' : 'Nouveau produit'}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Nom</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 border border-border rounded-xl bg-background text-text-primary"
                placeholder="Nom du produit"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Description</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-3 border border-border rounded-xl bg-background text-text-primary"
                placeholder="Description du produit"
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
              <label className="block text-sm font-medium text-text-secondary mb-2">Prix affiché</label>
              <input
                type="text"
                value={formData.priceDisplay || ''}
                onChange={(e) => setFormData({ ...formData, priceDisplay: e.target.value })}
                className="w-full p-3 border border-border rounded-xl bg-background text-text-primary"
                placeholder="Ex: À partir de 5 000 FCFA"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Prix numérique</label>
              <input
                type="number"
                value={formData.price || ''}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full p-3 border border-border rounded-xl bg-background text-text-primary"
                placeholder="5000"
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
                <th className="p-4 text-text-primary font-semibold">Nom</th>
                <th className="p-4 text-text-primary font-semibold">Catégorie</th>
                <th className="p-4 text-text-primary font-semibold">Prix</th>
                <th className="p-4 text-text-primary font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-border">
                  <td className="p-4 text-text-secondary">{product.name}</td>
                  <td className="p-4 text-text-secondary">{product.category}</td>
                  <td className="p-4 text-text-secondary">{product.priceDisplay}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
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
          {products.length === 0 && (
            <div className="p-8 text-center text-text-secondary">
              Aucun produit disponible
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}
