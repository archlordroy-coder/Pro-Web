'use client';

import { useState } from 'react';

export interface TableColumn {
  key: string;
  label: string;
  render?: (value: any) => React.ReactNode;
}

interface AdminTableProps {
  columns: TableColumn[];
  data: any[];
  onEdit?: (item: any) => void;
  onDelete?: (id: string) => void;
  loading?: boolean;
  emptyMessage?: string;
  hideEditButton?: boolean;
  hideDeleteButton?: boolean;
}

export function AdminTable({
  columns,
  data,
  onEdit,
  onDelete,
  loading = false,
  emptyMessage = 'Aucune donnée disponible',
  hideEditButton = false,
  hideDeleteButton = false,
}: AdminTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) {
      setDeletingId(id);
      if (onDelete) onDelete(id);
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="bg-surface border border-border rounded-3xl shadow-sm p-8">
        <div className="flex items-center justify-center gap-3">
          <div className="inline-block w-6 h-6 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-text-secondary">Chargement des données...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-3xl shadow-sm overflow-hidden">
      {data.length === 0 ? (
        <div className="p-8 text-center text-text-secondary">
          {emptyMessage}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-muted border-b border-border">
              <tr className="text-left">
                {columns.map(column => (
                  <th
                    key={column.key}
                    className="px-6 py-4 text-sm font-semibold text-text-primary"
                  >
                    {column.label}
                  </th>
                ))}
                <th className="px-6 py-4 text-sm font-semibold text-text-primary">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={item.id || index}
                  className="border-t border-border hover:bg-surface-muted transition"
                >
                  {columns.map(column => (
                    <td
                      key={`${item.id || index}-${column.key}`}
                      className="px-6 py-4 text-sm text-text-secondary"
                    >
                      {column.render ? column.render(item[column.key]) : item[column.key]}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      {!hideEditButton && onEdit && (
                        <button
                          onClick={() => onEdit(item)}
                          className="px-3 py-2 bg-primary/10 text-primary rounded-lg text-xs font-medium hover:bg-primary/20 transition"
                        >
                          Modifier
                        </button>
                      )}
                      {!hideDeleteButton && onDelete && (
                        <button
                          onClick={() => handleDelete(item.id)}
                          disabled={deletingId === item.id}
                          className="px-3 py-2 bg-red-100 text-red-600 rounded-lg text-xs font-medium hover:bg-red-200 transition disabled:opacity-50"
                        >
                          {deletingId === item.id ? 'Suppression...' : 'Supprimer'}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
