'use client';

import { useState, useEffect } from 'react';

interface Order {
  id: string;
  client_name: string;
  item_type: string;
  status: string;
  total_price: number;
}

export default function OrdersPage() {
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

  if (loading) return <div className="p-8 text-text-secondary">Chargement des commandes...</div>;

  return (
    <div className="p-8 bg-background min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-text-primary">Gestion des Commandes</h1>
      <div className="bg-surface border border-border rounded-3xl shadow-sm overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-surfaceMuted">
            <tr className="text-left">
              <th className="p-4 text-text-primary font-semibold">Client</th>
              <th className="p-4 text-text-primary font-semibold">Type</th>
              <th className="p-4 text-text-primary font-semibold">Statut</th>
              <th className="p-4 text-text-primary font-semibold">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-border">
                <td className="p-4 text-text-secondary">{order.client_name}</td>
                <td className="p-4 text-text-secondary">{order.item_type}</td>
                <td className="p-4 text-text-secondary">{order.status}</td>
                <td className="p-4 text-text-secondary">{order.total_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
