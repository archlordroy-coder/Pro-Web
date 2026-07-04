'use client';

import { useState, useEffect } from 'react';
import { PublicHeader } from '@/components/PublicHeader';
import { PublicFooter } from '@/components/PublicFooter';
import AuthGuard from '@/components/AuthGuard';

interface Order {
  id: string;
  client_name: string;
  item_type: string;
  status: string;
  total_price: number;
}

function OrdersContent() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.proinformatique.dev';
    
    fetch(`${API_URL}/api/orders`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching orders:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicHeader />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-text-primary">Mes Commandes</h1>
          {loading ? (
            <div className="text-center text-text-secondary py-12">
              Chargement de vos commandes...
            </div>
          ) : (
            <div className="bg-surface border border-border rounded-3xl shadow-sm overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-surface-muted">
                  <tr className="text-left">
                    <th className="p-4 text-text-primary font-semibold">Produit/Service</th>
                    <th className="p-4 text-text-primary font-semibold">Type</th>
                    <th className="p-4 text-text-primary font-semibold">Statut</th>
                    <th className="p-4 text-text-primary font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-text-secondary">
                        Vous n&apos;avez pas encore de commandes
                      </td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order.id} className="border-t border-border hover:bg-surface-muted transition">
                        <td className="p-4 text-text-primary font-medium">{order.client_name}</td>
                        <td className="p-4 text-text-secondary">{order.item_type}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === 'Livré' ? 'bg-green-100 text-green-700' :
                            order.status === 'En cours' ? 'bg-blue-100 text-blue-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="p-4 text-text-primary font-bold">{order.total_price.toLocaleString('fr-FR')} FCFA</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}

export default function OrdersPage() {
  return (
    <AuthGuard>
      <OrdersContent />
    </AuthGuard>
  );
}
