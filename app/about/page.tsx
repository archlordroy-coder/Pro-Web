'use client';

import { PublicHeader } from '@/components/PublicHeader';
import { PublicFooter } from '@/components/PublicFooter';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicHeader />

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-16">
        {/* Présentation */}
        <section className="mb-16">
          <h1 className="text-5xl font-bold text-text-primary mb-6">À Propos de Pro Informatique</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-text-secondary text-lg leading-relaxed mb-4">
                Pro Informatique est une entreprise spécialisée dans la fourniture de solutions informatiques modernes et le support technique professionnel. Fondée en 2010, nous avons accompagné des centaines de clients dans leur transformation numérique.
              </p>
              <p className="text-text-secondary text-lg leading-relaxed mb-4">
                Notre mission est de fournir des produits et services informatiques de qualité, avec un excellent support client et des prix compétitifs. Nous croyons que la technologie doit être accessible à tous.
              </p>
              <p className="text-text-secondary text-lg leading-relaxed">
                Avec une équipe d&apos;experts passionnés, nous travaillons chaque jour pour dépasser vos attentes et vous aider à réussir dans le monde numérique.
              </p>
            </div>
            <div className="bg-surface rounded-3xl p-8 border border-border">
              <div className="space-y-6">
                <div>
                  <h3 className="text-4xl font-bold text-primary mb-2">500+</h3>
                  <p className="text-text-secondary">Clients satisfaits</p>
                </div>
                <div>
                  <h3 className="text-4xl font-bold text-primary mb-2">14+</h3>
                  <p className="text-text-secondary">Années d&apos;expérience</p>
                </div>
                <div>
                  <h3 className="text-4xl font-bold text-primary mb-2">50+</h3>
                  <p className="text-text-secondary">Produits et services</p>
                </div>
                <div>
                  <h3 className="text-4xl font-bold text-primary mb-2">99%</h3>
                  <p className="text-text-secondary">Satisfaction client</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Valeurs */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-text-primary mb-8">Nos Valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-surface rounded-2xl p-6 border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">Innovation</h3>
              <p className="text-text-secondary">
                Nous restons à la pointe de la technologie pour offrir les meilleures solutions.
              </p>
            </div>

            <div className="bg-surface rounded-2xl p-6 border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">Qualité</h3>
              <p className="text-text-secondary">
                Chaque produit et service est soigneusement sélectionné pour sa qualité.
              </p>
            </div>

            <div className="bg-surface rounded-2xl p-6 border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">Fiabilité</h3>
              <p className="text-text-secondary">
                Vous pouvez compter sur nous pour un support technique fiable et rapide.
              </p>
            </div>
          </div>
        </section>

        {/* Équipe */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-text-primary mb-8">Notre Équipe</h2>
          <p className="text-text-secondary text-lg mb-8">
            Notre équipe est composée de professionnels expérimentés et passionnés par l&apos;informatique.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Jean Dupont', role: 'Directeur Général' },
              { name: 'Marie Martin', role: 'Chef Technique' },
              { name: 'Paul Lefevre', role: 'Responsable Ventes' },
              { name: 'Sophie Renard', role: 'Support Client' },
            ].map((member) => (
              <div key={member.name} className="bg-surface rounded-2xl p-6 border border-border text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4"></div>
                <h3 className="font-semibold text-text-primary mb-1">{member.name}</h3>
                <p className="text-sm text-text-secondary">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Prêt à Commencer?</h2>
          <p className="mb-8 text-white/90 max-w-2xl mx-auto">
            Explorez nos produits et services, ou contactez-nous pour une consultation personnalisée.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/products"
              className="px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:opacity-90 transition"
            >
              Voir nos Produits
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 transition"
            >
              Nous Contacter
            </Link>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
