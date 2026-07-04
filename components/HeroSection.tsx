import Link from 'next/link';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  primaryAction?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
}

export function HeroSection({
  title,
  subtitle,
  primaryAction,
  secondaryAction,
}: HeroSectionProps) {
  return (
    <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-20 px-6 rounded-3xl">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">{title}</h1>
        <p className="text-xl opacity-90 mb-8">{subtitle}</p>

        <div className="flex gap-4 justify-center flex-wrap">
          {primaryAction && (
            <Link
              href={primaryAction.href}
              className="px-8 py-3 bg-white text-primary rounded-xl font-bold hover:opacity-90 transition"
            >
              {primaryAction.label}
            </Link>
          )}
          {secondaryAction && (
            <Link
              href={secondaryAction.href}
              className="px-8 py-3 bg-white/20 text-white rounded-xl font-bold hover:bg-white/30 transition"
            >
              {secondaryAction.label}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
