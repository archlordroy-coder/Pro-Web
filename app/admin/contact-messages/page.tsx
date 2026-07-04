'use client';

import AuthGuard from '@/components/AuthGuard';
import { AdminHeader } from '@/components/AdminHeader';
import { useState, useEffect } from 'react';
import { useNotification } from '@/components/NotificationContext';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  createdAt: Date | string;
  status: 'new' | 'read' | 'replied';
}

export default function ContactMessagesPage() {
  const { addNotification } = useNotification();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const response = await fetch('/api/contact');
      if (!response.ok) throw new Error('Erreur');
      const data = await response.json();
      setMessages(data || []);
    } catch (err) {
      console.error('Error:', err);
      addNotification('error', 'Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
    addNotification('success', 'Message supprimé');
  };

  const handleMarkAsRead = (id: string) => {
    setMessages(prev =>
      prev.map(m =>
        m.id === id ? { ...m, status: 'read' as const } : m
      )
    );
  };

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMessage || !replyText.trim()) {
      addNotification('error', 'Veuillez entrer une réponse');
      return;
    }

    // TODO: Implémenter l'envoi de la réponse par email
    setMessages(prev =>
      prev.map(m =>
        m.id === selectedMessage.id
          ? { ...m, status: 'replied' as const }
          : m
      )
    );
    setReplyText('');
    addNotification('success', 'Réponse envoyée avec succès');
  };

  const stats = {
    total: messages.length,
    new: messages.filter(m => m.status === 'new').length,
    read: messages.filter(m => m.status === 'read').length,
  };

  if (loading) {
    return (
      <AuthGuard>
        <div className="p-8 bg-background min-h-screen">
          <p className="text-text-secondary">Chargement...</p>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <div className="p-8 bg-background min-h-screen">
        <AdminHeader
          title="Messages de Contact"
          description="Gérez les messages reçus des clients"
        />

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-surface rounded-2xl p-6 border border-border">
            <p className="text-text-secondary text-sm mb-2">Total messages</p>
            <p className="text-4xl font-bold text-primary">{stats.total}</p>
          </div>
          <div className="bg-surface rounded-2xl p-6 border border-border">
            <p className="text-text-secondary text-sm mb-2">Non lus</p>
            <p className="text-4xl font-bold text-orange-500">{stats.new}</p>
          </div>
          <div className="bg-surface rounded-2xl p-6 border border-border">
            <p className="text-text-secondary text-sm mb-2">Lus</p>
            <p className="text-4xl font-bold text-green-500">{stats.read}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Liste des messages */}
          <div className="lg:col-span-1">
            <div className="bg-surface rounded-2xl border border-border overflow-hidden">
              <div className="max-h-96 overflow-y-auto">
                {messages.length === 0 ? (
                  <div className="p-6 text-center text-text-secondary">
                    Aucun message
                  </div>
                ) : (
                  messages.map((msg) => (
                    <button
                      key={msg.id}
                      onClick={() => {
                        setSelectedMessage(msg);
                        handleMarkAsRead(msg.id);
                      }}
                      className={`w-full text-left p-4 border-b border-border last:border-b-0 hover:bg-background transition ${
                        msg.id === selectedMessage?.id ? 'bg-primary/10' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            msg.status === 'new' ? 'bg-blue-500' : 'bg-green-500'
                          }`}
                        ></div>
                        <h4 className="font-semibold text-text-primary text-sm truncate">
                          {msg.name}
                        </h4>
                      </div>
                      <p className="text-xs text-text-secondary truncate">
                        {msg.subject || msg.message?.substring(0, 30)}
                      </p>
                      <p className="text-xs text-text-secondary mt-1">
                        {new Date(msg.createdAt).toLocaleDateString('fr-FR')}
                      </p>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Détails du message sélectionné */}
          {selectedMessage ? (
            <div className="lg:col-span-2">
              <div className="bg-surface rounded-2xl p-6 border border-border">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-text-primary mb-4">
                    {selectedMessage.subject || 'Message sans sujet'}
                  </h2>

                  <div className="space-y-3 mb-6 pb-6 border-b border-border">
                    <div>
                      <p className="text-sm text-text-secondary">De</p>
                      <p className="font-semibold text-text-primary">{selectedMessage.name}</p>
                      <p className="text-sm text-text-secondary">{selectedMessage.email}</p>
                    </div>
                    {selectedMessage.phone && (
                      <div>
                        <p className="text-sm text-text-secondary">Téléphone</p>
                        <p className="text-text-primary">{selectedMessage.phone}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-text-secondary">Date</p>
                      <p className="text-text-primary">
                        {new Date(selectedMessage.createdAt).toLocaleDateString('fr-FR', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-text-secondary mb-2">Message</p>
                    <p className="text-text-primary leading-relaxed whitespace-pre-wrap">
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>

                {/* Formulaire de réponse */}
                <form onSubmit={handleReply} className="pt-6 border-t border-border">
                  <h3 className="font-semibold text-text-primary mb-3">Répondre</h3>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Votre réponse..."
                    rows={4}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary resize-none mb-4"
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 bg-primary text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
                    >
                      Envoyer la réponse
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        handleDelete(selectedMessage.id);
                        setSelectedMessage(null);
                      }}
                      className="flex-1 bg-red-100 text-red-600 py-2 rounded-lg font-semibold hover:bg-red-200 transition"
                    >
                      Supprimer
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="lg:col-span-2 bg-surface rounded-2xl p-8 border border-border text-center">
              <p className="text-text-secondary">Sélectionnez un message pour voir les détails</p>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}
