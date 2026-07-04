'use client';

import AuthGuard from '@/components/AuthGuard';
import { AdminHeader } from '@/components/AdminHeader';
import { AdminTable, type TableColumn } from '@/components/AdminTable';
import { useNotification } from '@/components/NotificationContext';
import { useState, useEffect } from 'react';
import { getUsers, deleteUser, updateUserRole, User } from '@/lib/api';

const userColumns: TableColumn[] = [
  { key: 'email', label: 'Email' },
  { key: 'name', label: 'Nom' },
  { key: 'role', label: 'Rôle' },
  {
    key: 'createdAt',
    label: 'Inscription',
    render: (value: string) => {
      if (!value) return '-';
      return new Date(value).toLocaleDateString('fr-FR');
    },
  },
];

export default function UsersPage() {
  const { addNotification } = useNotification();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error('Error:', err);
      addNotification('error', 'Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  const handleChangeRole = async () => {
    if (!selectedUser || !newRole) {
      addNotification('error', 'Veuillez sélectionner un rôle');
      return;
    }

    try {
      await updateUserRole(selectedUser.id, newRole);
      addNotification('success', 'Rôle mis à jour');
      setUsers(prev =>
        prev.map(u =>
          u.id === selectedUser.id ? { ...u, role: newRole } : u
        )
      );
      setSelectedUser(null);
      setNewRole('');
    } catch (err) {
      console.error('Error:', err);
      addNotification('error', 'Erreur lors de la mise à jour');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      addNotification('success', 'Utilisateur supprimé');
      setUsers(prev => prev.filter(u => u.id !== id));
    } catch (err) {
      console.error('Error:', err);
      addNotification('error', 'Erreur lors de la suppression');
    }
  };

  const stats = {
    total: users.length,
    admins: users.filter(u => u.role === 'admin').length,
    users: users.filter(u => u.role === 'user').length,
  };

  return (
    <AuthGuard>
      <div className="p-8 bg-background min-h-screen">
        <AdminHeader
          title="Gestion des Utilisateurs"
          description="Gérez les comptes utilisateurs et leurs permissions"
        />

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-surface rounded-2xl p-6 border border-border">
            <p className="text-text-secondary text-sm mb-2">Total utilisateurs</p>
            <p className="text-4xl font-bold text-primary">{stats.total}</p>
          </div>
          <div className="bg-surface rounded-2xl p-6 border border-border">
            <p className="text-text-secondary text-sm mb-2">Administrateurs</p>
            <p className="text-4xl font-bold text-orange-500">{stats.admins}</p>
          </div>
          <div className="bg-surface rounded-2xl p-6 border border-border">
            <p className="text-text-secondary text-sm mb-2">Utilisateurs</p>
            <p className="text-4xl font-bold text-blue-500">{stats.users}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Liste des utilisateurs */}
          <div className="lg:col-span-2">
            <AdminTable
              columns={userColumns}
              data={users}
              onEdit={setSelectedUser}
              onDelete={handleDelete}
              loading={loading}
              emptyMessage="Aucun utilisateur"
              hideDeleteButton
            />
          </div>

          {/* Panel de modification */}
          {selectedUser && (
            <div className="lg:col-span-1">
              <div className="bg-surface rounded-2xl p-6 border border-border sticky top-8">
                <h3 className="font-semibold text-text-primary mb-4">Modifier l&apos;utilisateur</h3>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-text-secondary mb-2">Email</p>
                    <p className="font-semibold text-text-primary text-sm break-all">
                      {selectedUser.email}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-text-secondary mb-2">Nom</p>
                    <p className="font-semibold text-text-primary">{selectedUser.name}</p>
                  </div>

                  <div>
                    <p className="text-sm text-text-secondary mb-2">Rôle actuel</p>
                    <p className="font-semibold text-text-primary">{selectedUser.role}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-text-secondary block mb-2">
                      Nouveau rôle
                    </label>
                    <select
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Sélectionner...</option>
                      <option value="user">Utilisateur</option>
                      <option value="admin">Administrateur</option>
                    </select>
                  </div>

                  <div className="pt-4 space-y-2">
                    <button
                      onClick={handleChangeRole}
                      className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
                    >
                      Mettre à jour le rôle
                    </button>
                    <button
                      onClick={() => {
                        setSelectedUser(null);
                        setNewRole('');
                      }}
                      className="w-full bg-surface-muted text-text-primary py-2 rounded-lg font-semibold hover:opacity-90 transition"
                    >
                      Fermer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}
