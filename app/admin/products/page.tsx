'use client';

import AuthGuard from '@/components/AuthGuard';
import { AdminHeader } from '@/components/AdminHeader';
import { AdminForm, type FormField } from '@/components/AdminForm';
import { AdminTable, type TableColumn } from '@/components/AdminTable';
import { useNotification } from '@/components/NotificationContext';
import { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct, type Product } from '@/lib/api';

const productFormFields: FormField[] = [
  { name: 'name', label: 'Nom du produit', type: 'text', required: true, placeholder: 'Entrer le nom' },
  { name: 'description', label: 'Description', type: 'textarea', required: true, placeholder: 'Décrire le produit' },
  { name: 'category', label: 'Catégorie', type: 'text', required: true, placeholder: 'Ex: Informatique' },
  { name: 'price', label: 'Prix numérique', type: 'number', required: true, placeholder: '5000' },
  { name: 'priceDisplay', label: 'Prix affiché', type: 'text', required: true, placeholder: 'Ex: À partir de 5 000 FCFA' },
  { name: 'imageUrl', label: 'URL de l\'image', type: 'text', placeholder: 'https://example.com/image.jpg' },
];

const productColumns: TableColumn[] = [
  { key: 'name', label: 'Nom' },
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

export default function AdminProductsPage() {
  const { addNotification } = useNotification();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    description: '',
    category: '',
    price: 0,
    priceDisplay: '',
    imageUrl: '',
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
      addNotification('error', 'Erreur lors du chargement des produits');
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
        await updateProduct(editingId, formData as Product);
        addNotification('success', 'Produit mis à jour avec succès');
      } else {
        const newProduct: Product = {
          ...formData,
          id: Date.now().toString(),
        } as Product;
        await createProduct(newProduct);
        addNotification('success', 'Produit créé avec succès');
      }
      setEditingId(null);
      setFormData({
        name: '',
        description: '',
        category: '',
        price: 0,
        priceDisplay: '',
        imageUrl: '',
      });
      await loadProducts();
    } catch (err) {
      console.error('Error saving product:', err);
      addNotification('error', 'Erreur lors de la sauvegarde');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      addNotification('success', 'Produit supprimé avec succès');
      await loadProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
      addNotification('error', 'Erreur lors de la suppression');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      name: '',
      description: '',
      category: '',
      price: 0,
      priceDisplay: '',
      imageUrl: '',
    });
  };

  return (
    <AuthGuard>
      <div className="p-8 bg-background min-h-screen">
        <AdminHeader
          title="Gestion des Produits"
          description="Créer, modifier et supprimer les produits"
          action={{
            label: '+ Nouveau produit',
            onClick: () => {
              setEditingId(null);
              setFormData({
                name: '',
                description: '',
                category: '',
                price: 0,
                priceDisplay: '',
                imageUrl: '',
              });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            },
          }}
        />

        {editingId || Object.values(formData).some(v => v) ? (
          <AdminForm
            title={editingId ? 'Modifier le produit' : 'Nouveau produit'}
            fields={productFormFields}
            data={formData}
            onDataChange={handleDataChange}
            onSubmit={handleSave}
            onCancel={handleCancel}
            isSubmitting={isSubmitting}
            submitLabel={editingId ? 'Mettre à jour' : 'Créer'}
          />
        ) : null}

        <AdminTable
          columns={productColumns}
          data={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
          emptyMessage="Aucun produit. Créez le premier maintenant!"
        />
      </div>
    </AuthGuard>
  );
}
