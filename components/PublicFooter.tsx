'use client';

import Link from 'next/link';

export function PublicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-text-primary text-white mt-16">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Pro Informatique</h3>
            <p className="text-white/70 text-sm">
              Vos services informatiques et produits technologiques de qualité.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services" className="text-white/70 hover:text-white transition">
                  Tous les services
                </Link>
              </li>
              <li>
                <Link href="/services#support" className="text-white/70 hover:text-white transition">
                  Support Technique
                </Link>
              </li>
              <li>
                <Link href="/services#consulting" className="text-white/70 hover:text-white transition">
                  Consulting
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4">Produits</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-white/70 hover:text-white transition">
                  Tous les produits
                </Link>
              </li>
              <li>
                <Link href="/promotions" className="text-white/70 hover:text-white transition">
                  Promotions actuelles
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Légal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button className="text-white/70 hover:text-white transition">
                  Politique de confidentialité
                </button>
              </li>
              <li>
                <button className="text-white/70 hover:text-white transition">
                  Conditions d&apos;utilisation
                </button>
              </li>
              <li>
                <button className="text-white/70 hover:text-white transition">
                  Contact
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/70">
            <p>&copy; {currentYear} Pro Informatique. Tous droits réservés.</p>
            <div className="flex gap-4">
              <button className="hover:text-white transition">Facebook</button>
              <button className="hover:text-white transition">Twitter</button>
              <button className="hover:text-white transition">LinkedIn</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
