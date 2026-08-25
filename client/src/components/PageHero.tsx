/**
 * ETS Pro-Informatique — en-tête de fiche catalogue.
 * Référence : navigation sobre, informations à gauche, visuel de service à droite.
 */
import { type ReactNode } from "react";
import { Link } from "wouter";
import { ArrowRight, MessageCircle } from "lucide-react";
import { ServiceBreadcrumb, ServiceShare } from "./ServiceNavigation";
import { quoteLink } from "./SiteShell";

const localServicePages: Record<string, { title: string; path: string }> = {
  "Services ETS Pro-Informatique": { title: "Services", path: "/services" },
  "Impression à Bafoussam": { title: "Impression à Bafoussam", path: "/impression-bafoussam" },
  "Sérigraphie à Bafoussam": { title: "Sérigraphie à Bafoussam", path: "/serigraphie-bafoussam" },
  "Télé-déclarations à Bafoussam": { title: "Télé-déclarations & attestations", path: "/teledeclarations-attestations-bafoussam" },
  "Cybercafé Au Débit by Pro": { title: "Cyber Au Débit by Pro", path: "/cybercafe-au-debit" },
};

export default function PageHero({ eyebrow, title, description, image, children }: { eyebrow: string; title: ReactNode; description: string; image: string; children?: ReactNode }) {
  const servicePage = localServicePages[eyebrow];
  return <section className="catalog-hero">
    <div className="catalog-wrap grid gap-9 py-10 lg:grid-cols-[.92fr_1.08fr] lg:items-center lg:py-14">
      <div>
        {servicePage ? <ServiceBreadcrumb {...servicePage} /> : <p className="catalog-crumbs"><Link href="/">Accueil</Link> <span className="mx-1">›</span> {eyebrow}</p>}
        <p className="catalog-kicker mt-5">{eyebrow}</p>
        <h1 className="mt-3 max-w-2xl">{title}</h1>
        <p className="catalog-hero-copy mt-5 max-w-2xl">{description}</p>
        {children ? <div className="mt-7">{children}</div> : <div className="mt-7 flex flex-wrap gap-3"><a href={quoteLink(eyebrow)} target="_blank" rel="noreferrer" className="catalog-primary-button"><MessageCircle className="h-4 w-4" /> Demander un devis</a><Link href="/contact" className="catalog-secondary-button">Passer à l’atelier <ArrowRight className="h-4 w-4" /></Link></div>}
        {servicePage && <ServiceShare {...servicePage} />}
      </div>
      <div className="catalog-hero-visual"><img src={image} alt="" /><span className="catalog-hero-label">ETS Pro-Informatique · Bafoussam</span></div>
    </div>
  </section>;
}
