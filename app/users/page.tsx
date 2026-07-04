'use client';

import AuthGuard from '@/components/AuthGuard';
import { useState, useEffect } from 'react';
import { getUsers, deleteUser, updateUserRole, type User } from '@/lib/api';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching users:', err);
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return;
    
    try {
      await deleteUser(id);
      await loadUsers();
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Erreur lors de la suppression');
    }
  };

  const handleRoleChange = async (id: string, newRole: string) => {
    try {
      await updateUserRole(id, newRole);
      await loadUsers();
    } catch (err) {
      console.error('Error updating user role:', err);
      alert('Erreur lors de la mise à jour du rôle');
    }
  };

  if (loading) return <div className="p-8 text-text-secondary">Chargement des utilisateurs...</div>;

  return (
    <AuthGuard>
      <div className="p-8 bg-background min-h-screen">
        <h1 className="text-3xl font-bold mb-8 text-text-primary">Gestion des Utilisateurs</h1>
        
        <div className="bg-surface border border-border rounded-3xl shadow-sm overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-surfaceMuted">
              <tr className="text-left">
                <th className="p-4 text-text-primary font-semibold">Nom</th>
                <th className="p-4 text-text-primary font-semibold">Email</th>
                <th className="p-4 text-text-primary font-semibold">Rôle</th>
                <th className="p-4 text-text-primary font-semibold">Date de création</th>
                <th className="p-4 text-text-primary font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t border-border">
                  <td className="p-4 text-text-secondary">{user.name}</td>
                  <td className="p-4 text-text-secondary">{user.email}</td>
                  <td className="p-4">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className="p-2 border rounded-lg bg-background text-text-primary"
                    >
                      <option value="user">Utilisateur</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="p-4 text-text-secondary">
                    {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-sm font-medium hover:bg-red-200 transition"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && (
            <div className="p-8 text-center text-text-secondary">
              Aucun utilisateur disponible
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}
