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
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    
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

  if (loading) return <div className="p-8">Chargement...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Gestion des Commandes</h1>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Client</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Statut</th>
            <th className="border p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="border p-2">{order.client_name}</td>
              <td className="border p-2">{order.item_type}</td>
              <td className="border p-2">{order.status}</td>
              <td className="border p-2">{order.total_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
