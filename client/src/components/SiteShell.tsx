/**
 * ETS Pro-Informatique — L’Atelier Signalétique.
 * Chrome de navigation partagé : logo officiel, routes courtes et WhatsApp immédiatement accessible.
 */
import { useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Clock3, Facebook, Mail, MapPin, Menu, MessageCircle, Phone, X } from "lucide-react";

const officialLogo = "/manus-storage/ets-pro-logo-officiel_e0c386f6.jpeg";
const whatsappNumber = "237699979857";
const phone = "+237 699 97 98 57";

const routes = [
  { href: "/services", label: "Services" },
  { href: "/impression-bafoussam", label: "Impression" },
  { href: "/serigraphie-bafoussam", label: "Sérigraphie" },
  { href: "/teledeclarations-attestations-bafoussam", label: "Formalités" },
  { href: "/galerie", label: "Galerie" },
  { href: "/cybercafe-au-debit", label: "Cyber Au Débit" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="top-strip relative z-50 bg-slate-950 px-4 py-2.5 text-[11px] font-semibold tracking-wide text-white sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <p className="hidden items-center gap-2 sm:flex"><MapPin className="h-3.5 w-3.5 text-[#9ada62]" /> ETS Pro-Informatique · Descente Akwa, Bafoussam</p>
          <p className="flex items-center gap-2"><Clock3 className="h-3.5 w-3.5 text-cyan-300" /> Lun–Ven 07:30–18:00 · Sam 08:00–14:00 · Dim fermé</p>
          <a href={`tel:${phone.replace(/\s/g, "")}`} className="hidden font-bold text-[#9ada62] transition hover:text-white xl:block">{phone}</a>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-[#f7f6f1]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[84px] max-w-7xl items-center justify-between px-4 sm:px-8">
          <Link href="/" className="flex items-center" aria-label="ETS Pro-Informatique, accueil"><img src={officialLogo} alt="Logo officiel ETS Pro-Informatique" className="h-14 w-32 object-contain object-left" /></Link>
          <nav className="hidden items-center gap-5 text-[13px] font-extrabold text-slate-600 xl:flex" aria-label="Navigation principale">
            {routes.map((route) => <Link key={route.href} href={route.href} className={`nav-link whitespace-nowrap ${location === route.href ? "text-cyan-800" : ""}`}>{route.label}</Link>)}
          </nav>
          <Link href="/contact" className="hidden items-center gap-2 rounded-full bg-[#68B62A] px-5 py-3 text-sm font-extrabold text-white shadow-[0_10px_22px_rgba(104,182,42,0.25)] transition hover:-translate-y-0.5 hover:bg-[#579c20] active:scale-[0.97] sm:flex"><MessageCircle className="h-4 w-4" /> Demander un devis</Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-900 xl:hidden" aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}>{menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
        {menuOpen && <div className="border-t border-slate-200 bg-[#f7f6f1] px-6 py-5 xl:hidden"><nav className="flex flex-col gap-4 text-base font-bold text-slate-800">{routes.map((route) => <Link key={route.href} href={route.href} onClick={closeMenu} className={location === route.href ? "text-cyan-800" : ""}>{route.label}</Link>)}<a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="mt-1 flex w-fit items-center gap-2 rounded-full bg-[#68B62A] px-5 py-3 text-sm text-white"><MessageCircle className="h-4 w-4" /> WhatsApp</a></nav></div>}
      </header>
    </>
  );
}

export function SiteFooter() {
  return <footer className="relative overflow-hidden bg-slate-950 px-4 pb-8 pt-12 text-white sm:px-8"><div aria-hidden className="absolute inset-x-0 top-0 production-ribbon" /><div className="relative mx-auto grid max-w-7xl gap-10 border-b border-white/10 pb-10 md:grid-cols-[1.15fr_0.85fr_0.9fr]"><div><img src={officialLogo} alt="Logo officiel ETS Pro-Informatique" className="h-16 w-40 object-contain object-left" /><p className="mt-5 max-w-xs text-sm leading-6 text-slate-400">Impression, grand format, sérigraphie, cyberservices et formalités administratives à Bafoussam.</p></div><div><p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-cyan-300">Explorer</p><div className="mt-5 flex flex-col gap-3 text-sm font-bold text-slate-300">{routes.map((route) => <Link key={route.href} href={route.href} className="hover:text-white">{route.label}</Link>)}</div></div><div><p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-cyan-300">Contact rapide</p><a className="mt-5 flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white" href={`tel:${phone.replace(/\s/g, "")}`}><Phone className="h-4 w-4 text-[#9ada62]" /> +237 699 97 98 57</a><a className="mt-3 flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white" href="mailto:proinformatique2@gmail.com"><Mail className="h-4 w-4 text-[#9ada62]" /> proinformatique2@gmail.com</a><a className="mt-3 flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white" href="https://www.facebook.com/EtsProInformatique/" target="_blank" rel="noreferrer"><Facebook className="h-4 w-4 text-[#9ada62]" /> Facebook</a><p className="mt-3 text-sm text-slate-400">Descente Akwa, Bafoussam · Cybercafé Au Débit by Pro</p></div></div><div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-3 pt-7 text-[11px] font-medium text-slate-500 sm:flex-row"><p>© {new Date().getFullYear()} ETS Pro-Informatique. Tous droits réservés.</p><p>Impression · Cyberservices · Formalités</p></div></footer>;
}

export function WhatsAppFloat() {
  return <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Bonjour ETS Pro-Informatique, je souhaite avoir plus d’informations.")}`} target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-[#68B62A] text-white shadow-[0_15px_32px_rgba(51,115,19,0.35)] transition hover:-translate-y-1 hover:bg-[#579c20] active:scale-[0.95]" aria-label="Contacter ETS Pro-Informatique sur WhatsApp"><MessageCircle className="h-6 w-6" /></a>;
}

export function PageShell({ children }: { children: ReactNode }) {
  return <div className="min-h-screen overflow-x-hidden bg-[#f7f6f1] text-slate-900"><SiteHeader /><main>{children}</main><SiteFooter /><WhatsAppFloat /></div>;
}
