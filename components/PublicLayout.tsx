'use client';

import { PublicHeader } from './PublicHeader';
import { PublicFooter } from './PublicFooter';

interface PublicLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export function PublicLayout({ children, title, description }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicHeader />

      {title && (
        <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold mb-2">{title}</h1>
            {description && <p className="text-lg opacity-90">{description}</p>}
          </div>
        </div>
      )}

      <main className="flex-1 max-w-6xl mx-auto w-full py-12 px-6">
        {children}
      </main>

      <PublicFooter />
    </div>
  );
}
