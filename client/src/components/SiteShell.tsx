/**
 * ETS Pro-Informatique — Chrome catalogue bleu et blanc.
 * Référence : barre utilitaire bleu nuit, recherche, navigation par familles et devis WhatsApp.
 */
import { useState, type FormEvent, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Clock3, Facebook, Heart, Mail, MapPin, Menu, MessageCircle, Phone, Search, Settings2, ShoppingBag, UserRound, X } from "lucide-react";
import ScrollRevealManager from "./ScrollRevealManager";

const officialLogo = "/manus-storage/logo-informatique-transparent_7b3106be.png";
const whatsappNumber = "237699979857";
const phone = "+237 699 97 98 57";

const routes = [
  { href: "/services", label: "Services" },
  { href: "/impression-bafoussam", label: "Impression & grand format" },
  { href: "/serigraphie-bafoussam", label: "Personnalisation" },
  { href: "/cybercafe-au-debit", label: "Cyber Au Débit" },
  { href: "/teledeclarations-attestations-bafoussam", label: "Formalités" },
  { href: "/galerie", label: "Réalisations" },
];

function quoteLink(service?: string) {
  const suffix = service ? ` pour ${service}` : "";
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Bonjour ETS Pro-Informatique, je souhaite discuter d’un devis${suffix}.`)}`;
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [, setLocation] = useLocation();
  const [location] = useLocation();
  const closeMenu = () => setMenuOpen(false);
  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLocation(query.trim() ? `/services?recherche=${encodeURIComponent(query.trim())}` : "/services");
    setQuery("");
  };

  return <>
    <div className="catalog-utility">
      <div className="catalog-wrap flex items-center justify-between gap-4">
        <p className="hidden items-center gap-2 md:flex"><MapPin className="h-3.5 w-3.5" /> BP 1313, Descente Akwa · Bafoussam</p>
        <p className="flex items-center gap-2"><Clock3 className="h-3.5 w-3.5" /> Lun–Ven 07:30–18:00 · Sam 08:00–14:00</p>
        <div className="hidden items-center gap-4 lg:flex"><Link href="/a-propos">Qui sommes-nous ?</Link><Link href="/contact">Contact</Link></div>
      </div>
    </div>
    <header className="catalog-header">
      <div className="catalog-wrap flex min-h-[78px] items-center gap-4 py-3">
        <Link href="/" className="shrink-0" aria-label="ETS Pro-Informatique, accueil"><img src={officialLogo} alt="ETS Pro-Informatique" className="h-14 w-36 object-contain object-left sm:h-16 sm:w-44" /></Link>
        <form className="catalog-search hidden flex-1 md:flex" onSubmit={submitSearch} role="search">
          <Search className="h-4 w-4 text-slate-400" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher un service, un support ou une formalité…" aria-label="Rechercher un service" />
          <button type="submit" aria-label="Lancer la recherche"><Search className="h-4 w-4" /></button>
        </form>
        <div className="ml-auto hidden items-center gap-4 text-[11px] font-semibold text-slate-700 lg:flex">
          <Link href="/contact" className="catalog-head-action"><UserRound className="h-4 w-4" /><span>Nous contacter</span></Link>
          <Link href="/contact" className="catalog-head-action"><ShoppingBag className="h-4 w-4" /><span>Mon devis</span></Link>
          <a href={quoteLink()} target="_blank" rel="noreferrer" className="catalog-whatsapp-small"><MessageCircle className="h-4 w-4" /><span>WhatsApp</span></a>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="catalog-menu-toggle xl:hidden" aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}>{menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
      </div>
      <nav className="catalog-nav hidden xl:block" aria-label="Navigation principale"><div className="catalog-wrap flex min-h-[42px] items-stretch"><Link href="/services" className={`catalog-nav-home ${location === "/services" ? "is-active" : ""}`}>CATALOGUE</Link>{routes.slice(1).map((route) => <Link key={route.href} href={route.href} className={`catalog-nav-link ${location === route.href ? "is-active" : ""}`}>{route.label}</Link>)}<Link href="/contact" className="catalog-nav-link ml-auto">DEMANDE DE DEVIS</Link></div></nav>
      {menuOpen && <div className="catalog-mobile-panel xl:hidden"><form className="catalog-search mb-4 md:hidden" onSubmit={submitSearch}><Search className="h-4 w-4 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher un service…" /><button type="submit"><Search className="h-4 w-4" /></button></form><nav className="flex flex-col gap-1">{routes.map((route) => <Link key={route.href} href={route.href} onClick={closeMenu} className="catalog-mobile-link">{route.label}</Link>)}<Link href="/contact" onClick={closeMenu} className="catalog-mobile-link">Contact & devis</Link><Link href="/parametres" onClick={closeMenu} className="catalog-mobile-link"><Settings2 className="h-4 w-4" /> Paramètres</Link><a href={quoteLink()} target="_blank" rel="noreferrer" className="catalog-mobile-quote"><MessageCircle className="h-4 w-4" /> Discuter sur WhatsApp</a></nav></div>}
    </header>
  </>;
}

export function SiteFooter() {
  return <footer className="catalog-footer">
    <div className="catalog-wrap grid gap-9 py-12 md:grid-cols-[1.25fr_.85fr_.9fr]">
      <div><img src={officialLogo} alt="ETS Pro-Informatique" className="h-16 w-44 object-contain object-left brightness-0 invert" /><p className="mt-5 max-w-sm text-sm leading-6 text-slate-300">Impression, grand format, sérigraphie, cyberservices et formalités à Bafoussam. Les tarifs se discutent avec l’équipe via WhatsApp ou directement à l’atelier.</p><a className="catalog-footer-cta" href={quoteLink()} target="_blank" rel="noreferrer"><MessageCircle className="h-4 w-4" /> Discuter de mon projet</a></div>
      <div><p className="catalog-footer-title">CATALOGUE</p><div className="mt-4 grid gap-2.5 text-sm text-slate-300">{routes.map((route) => <Link key={route.href} href={route.href}>{route.label}</Link>)}<Link href="/parametres" className="inline-flex items-center gap-2"><Settings2 className="h-3.5 w-3.5" /> Paramètres</Link></div></div>
      <div><p className="catalog-footer-title">CONTACT</p><div className="mt-4 grid gap-3 text-sm text-slate-300"><a href={`tel:${phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2"><Phone className="h-4 w-4 text-sky-300" /> {phone}</a><a href="mailto:proinformatique2@gmail.com" className="inline-flex items-center gap-2"><Mail className="h-4 w-4 text-sky-300" /> proinformatique2@gmail.com</a><a href="https://www.facebook.com/EtsProInformatique/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2"><Facebook className="h-4 w-4 text-sky-300" /> Facebook</a><p className="inline-flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" /> BP 1313, Descente Akwa, Bafoussam</p></div></div>
    </div>
    <div className="border-t border-white/10"><div className="catalog-wrap flex flex-col gap-2 py-5 text-[11px] text-slate-400 sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} ETS Pro-Informatique.</p><p>Prix et disponibilités à discuter via WhatsApp ou à l’atelier.</p></div></div>
  </footer>;
}

export function WhatsAppFloat() {
  return <a href={quoteLink()} target="_blank" rel="noreferrer" className="catalog-float" aria-label="Contacter ETS Pro-Informatique sur WhatsApp"><MessageCircle className="h-6 w-6" /><span className="hidden sm:inline">Discuter d’un devis</span></a>;
}

export function PageShell({ children }: { children: ReactNode }) {
  return <div className="min-h-screen overflow-x-hidden bg-[#f4f6fa] text-[#14213d]"><ScrollRevealManager /><SiteHeader /><main className="site-main">{children}</main><SiteFooter /><WhatsAppFloat /></div>;
}

export { quoteLink };
