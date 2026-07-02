'use client';

import { useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  category: string;
  price_value: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.proinformatique.dev';
    
    fetch(`${API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8 text-text-secondary">Chargement des produits...</div>;

  return (
    <div className="p-8 bg-background min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-text-primary">Gestion des Produits</h1>
      <div className="bg-surface border border-border rounded-3xl shadow-sm overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-surfaceMuted">
            <tr className="text-left">
              <th className="p-4 text-text-primary font-semibold">Nom</th>
              <th className="p-4 text-text-primary font-semibold">Catégorie</th>
              <th className="p-4 text-text-primary font-semibold">Prix</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t border-border">
                <td className="p-4 text-text-secondary">{product.name}</td>
                <td className="p-4 text-text-secondary">{product.category}</td>
                <td className="p-4 text-text-secondary">{product.price_value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
