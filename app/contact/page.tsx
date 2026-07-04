'use client';

import { useState } from 'react';
import { PublicHeader } from '@/components/PublicHeader';
import { PublicFooter } from '@/components/PublicFooter';
import { useNotification } from '@/components/NotificationContext';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addNotification } = useNotification();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      addNotification('error', 'Veuillez remplir les champs obligatoires');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Erreur');

      addNotification('success', 'Message envoyé avec succès! Nous vous recontacterons bientôt.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      console.error('Error:', err);
      addNotification('error', 'Erreur lors de l\'envoi du message');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicHeader />

      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-text-primary mb-4">Nous Contacter</h1>
          <p className="text-text-secondary text-lg">
            Vous avez des questions? Notre équipe est prête à vous aider. Contactez-nous dès maintenant!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Informations de contact */}
          <div className="lg:col-span-1">
            <div className="bg-surface rounded-2xl p-6 border border-border space-y-6">
              <div>
                <h3 className="font-semibold text-text-primary mb-2">Adresse</h3>
                <p className="text-text-secondary">123 Rue de l&apos;Informatique, Douala, Cameroun</p>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-2">Téléphone</h3>
                <p className="text-text-secondary">+237 671 234 567</p>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-2">Email</h3>
                <p className="text-text-secondary">contact@proinformatique.cm</p>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-2">Horaires</h3>
                <p className="text-text-secondary text-sm">Lun - Ven: 8h00 - 18h00</p>
                <p className="text-text-secondary text-sm">Sam: 9h00 - 13h00</p>
                <p className="text-text-secondary text-sm">Dim: Fermé</p>
              </div>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-surface rounded-2xl p-8 border border-border space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Nom complet *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Votre nom"
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="votre@email.com"
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Téléphone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+237 6xx xxx xxx"
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Sujet</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={isSubmitting}
                >
                  <option value="">Sélectionner un sujet</option>
                  <option value="support">Support Technique</option>
                  <option value="sales">Vente/Commande</option>
                  <option value="feedback">Retour d&apos;expérience</option>
                  <option value="other">Autre</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Votre message ici..."
                  rows={6}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
              </button>
            </form>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
