'use client';

import Link from 'next/link';
import { useState } from 'react';

export function PublicHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-surface border-b border-border shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-2xl text-primary hover:opacity-80 transition">
          Pro Informatique
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          <Link href="/services" className="text-text-secondary hover:text-primary transition font-medium">
            Services
          </Link>
          <Link href="/products" className="text-text-secondary hover:text-primary transition font-medium">
            Produits
          </Link>
          <Link href="/promotions" className="text-text-secondary hover:text-primary transition font-medium">
            Promotions
          </Link>
          <Link href="/admin" className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition font-medium">
            Admin
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 hover:bg-background rounded-lg transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-surface border-b border-border md:hidden">
            <nav className="flex flex-col p-4 gap-4">
              <Link href="/services" className="text-text-secondary hover:text-primary transition font-medium">
                Services
              </Link>
              <Link href="/products" className="text-text-secondary hover:text-primary transition font-medium">
                Produits
              </Link>
              <Link href="/promotions" className="text-text-secondary hover:text-primary transition font-medium">
                Promotions
              </Link>
              <Link href="/admin" className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition font-medium text-center">
                Admin
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
