/**
 * ETS Pro-Informatique — L’Atelier Signalétique.
 * Composition asymétrique, cyan technique et vert repère : chaque élément doit évoquer
 * un support imprimé en cours de fabrication et orienter vers un contact immédiat.
 */
import { FormEvent, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ChevronRight,
  Check,
  Clock3,
  FileImage,
  FileCheck2,
  Frame,
  ImagePlus,
  Instagram,
  Layers3,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  MonitorCog,
  Palette,
  Phone,
  Printer,
  ScanLine,
  Send,
  Shirt,
  Sparkles,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

const phone = "+237 699 97 98 57";
const whatsappNumber = "237699979857";
const officialLogo = "/images/logo-officiel.jpeg";
const brandSymbol = "/images/logo-symbol.png";
const heroImage = "/images/hero-print-studio.jpg";
const personalisationImage = "/images/personalisation.jpg";
const designImage = "/images/design-works.jpg";
const servicePoster = "/images/services-affiche.jpeg";

const galleryWorks = [
  {
    title: "Banderoles & visibilité grand format",
    category: "Grand format",
    description: "Banderoles, affiches et habillages pensés pour donner de l’ampleur à votre communication.",
    image: "/images/gallery-grand-format.jpg",
    type: "Impression",
  },
  {
    title: "Textile & accessoires personnalisés",
    category: "Sérigraphie",
    description: "T-shirts, polos, casquettes et objets promotionnels personnalisés pour vos équipes et événements.",
    image: "/images/gallery-serigraphie.jpg",
    type: "Sérigraphie",
  },
  {
    title: "Cartes, dépliants & supports utiles",
    category: "Impression",
    description: "Cartes, invitations, flyers, badges et documents de communication préparés dans le bon format.",
    image: "/images/gallery-stationery.jpg",
    type: "Impression",
  },
  {
    title: "Tirages photo & encadrements",
    category: "Photo",
    description: "Agrandissements et impressions décoratives pour transformer une image en objet à conserver ou offrir.",
    image: "/images/gallery-photo.jpg",
    type: "Photo",
  },
];

const galleryFilters = ["Tous", "Impression", "Grand format", "Sérigraphie", "Photo"];

const services = [
  {
    number: "01",
    icon: Printer,
    title: "Impression numérique & grand format",
    text: "Affiches, banderoles, roll-up et supports visuels conçus pour porter votre message à bonne échelle.",
    tone: "bg-cyan-600",
  },
  {
    number: "02",
    icon: Palette,
    title: "Graphisme de production",
    text: "Des visuels pensés pour passer de l’idée au support : dépliants, flyers, cartes et maquettes de communication.",
    tone: "bg-[#68B62A]",
  },
  {
    number: "03",
    icon: Shirt,
    title: "Sérigraphie & objets personnalisés",
    text: "T-shirts, casquettes, tasses, gourdes, stylos, porte-clés et autres objets à personnaliser pour votre image.",
    tone: "bg-slate-900",
  },
  {
    number: "04",
    icon: Frame,
    title: "Agrandissements photo",
    text: "Vos souvenirs et visuels en format décoratif, sur bois, cadre, toile ou glace selon le support souhaité.",
    tone: "bg-amber-500",
  },
  {
    number: "05",
    icon: FileCheck2,
    title: "Formalités & services administratifs",
    text: "Télé-déclarations, attestations d’immatriculation et accompagnement pour vos formalités administratives et documents utiles.",
    tone: "bg-cyan-800",
  },
];

const deliverables = [
  "Banderoles et affiches",
  "Cartes de visite et badges",
  "Faire-part et cartes de vœux",
  "Dépliants et flyers",
  "Autocollants et cachets numériques",
  "Tasses, gourdes et objets personnalisés",
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-cyan-700">
      <span className="h-2 w-2 rounded-full bg-[#68B62A]" />
      {children}
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Tous");
  const [selectedWork, setSelectedWork] = useState<(typeof galleryWorks)[number] | null>(null);
  const visibleWorks = activeFilter === "Tous" ? galleryWorks : galleryWorks.filter((work) => work.type === activeFilter || work.category === activeFilter);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Demande de devis — ${data.get("service") || "ETS Pro-Informatique"}`);
    const body = encodeURIComponent(
      `Bonjour ETS Pro-Informatique,\n\nNom : ${data.get("name")}\nTéléphone : ${data.get("contact")}\nService souhaité : ${data.get("service")}\n\nProjet :\n${data.get("message")}`,
    );
    setSent(true);
    window.location.href = `mailto:proinformatique2@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f6f1] text-slate-900 selection:bg-[#bdebd1] selection:text-slate-950">
      <div className="top-strip relative z-50 bg-slate-950 px-4 py-2.5 text-[11px] font-semibold tracking-wide text-white sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <p className="hidden items-center gap-2 sm:flex"><MapPin className="h-3.5 w-3.5 text-[#9ada62]" /> ETS Pro-Informatique · Descente Akwa, Bafoussam</p>
          <p className="flex items-center gap-2"><Clock3 className="h-3.5 w-3.5 text-cyan-300" /> Lun–Ven 07:30–18:00 · Sam 08:00–14:00 · Dim fermé</p>
          <a href={`tel:${phone.replace(/\s/g, "")}`} className="hidden font-bold text-[#9ada62] transition hover:text-white md:block">{phone}</a>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-[#f7f6f1]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[84px] max-w-7xl items-center justify-between px-4 sm:px-8">
          <a href="#accueil" className="flex items-center" aria-label="ETS Pro-Informatique, accueil">
            <img src={officialLogo} alt="Logo officiel ETS Pro-Informatique" className="h-14 w-32 object-contain object-left" />
          </a>

          <nav className="hidden items-center gap-7 text-sm font-bold text-slate-600 lg:flex" aria-label="Navigation principale">
            <a href="/services" className="nav-link">Services</a>
            <a href="/galerie" className="nav-link">Galerie</a>
            <a href="/cybercafe-au-debit" className="nav-link">Cyber Au Débit</a>
            <a href="/a-propos" className="nav-link">À propos</a>
            <a href="/contact" className="nav-link">Contact</a>
          </nav>

          <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="hidden items-center gap-2 rounded-full bg-[#68B62A] px-5 py-3 text-sm font-extrabold text-white shadow-[0_10px_22px_rgba(104,182,42,0.25)] transition hover:-translate-y-0.5 hover:bg-[#579c20] active:scale-[0.97] sm:flex">
            <MessageCircle className="h-4 w-4" /> Écrire sur WhatsApp
          </a>
          <button onClick={() => setMenuOpen(!menuOpen)} className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-900 lg:hidden" aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}>
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-slate-200 bg-[#f7f6f1] px-6 py-5 lg:hidden">
            <nav className="flex flex-col gap-4 text-base font-bold text-slate-800">
              <a href="/services" onClick={() => setMenuOpen(false)} className="text-left">Nos services</a>
              <a href="/galerie" onClick={() => setMenuOpen(false)} className="text-left">Galerie</a>
              <a href="/cybercafe-au-debit" onClick={() => setMenuOpen(false)} className="text-left">Cyber Au Débit</a>
              <a href="/a-propos" onClick={() => setMenuOpen(false)} className="text-left">À propos</a>
              <a href="/contact" onClick={() => setMenuOpen(false)} className="text-left">Nous contacter</a>
              <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="mt-1 flex w-fit items-center gap-2 rounded-full bg-[#68B62A] px-5 py-3 text-sm text-white"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
            </nav>
          </div>
        )}
      </header>

      <main>
        <section id="accueil" className="relative isolate overflow-hidden border-b border-slate-200 bg-white">
          <div className="absolute inset-0 opacity-[0.065] print-grid" />
          <div className="hero-accent absolute -right-14 top-16 h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl" />
          <div className="relative mx-auto grid min-h-[670px] max-w-7xl items-center gap-12 px-4 pb-16 pt-12 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:pb-12 lg:pt-8">
            <div className="relative z-10 max-w-xl py-8 lg:py-12">
              <Eyebrow>Impression · Graphisme · Personnalisation</Eyebrow>
              <h1 className="mt-5 font-display text-5xl font-bold leading-[0.94] tracking-[-0.065em] text-slate-950 sm:text-6xl xl:text-7xl">
                Votre message mérite <span className="text-cyan-700">le bon</span> format.
              </h1>
              <p className="mt-7 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
                ETS Pro-Informatique accompagne vos projets de communication, de l’idée au support final : impression numérique, grand format, graphisme et personnalisation à Bafoussam.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Bonjour ETS Pro-Informatique, je souhaite demander un devis.")}`} target="_blank" rel="noreferrer" className="group inline-flex items-center justify-center gap-3 rounded-full bg-slate-950 px-6 py-4 text-sm font-extrabold text-white shadow-xl shadow-slate-900/10 transition hover:-translate-y-0.5 active:scale-[0.97]">
                  Demander un devis <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <button onClick={() => scrollTo("services")} className="group inline-flex items-center justify-center gap-3 rounded-full border border-slate-300 bg-white px-6 py-4 text-sm font-extrabold text-slate-800 transition hover:border-cyan-700 hover:text-cyan-800 active:scale-[0.97]">
                  Voir les services <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                </button>
              </div>
              <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-bold text-slate-500">
                <span className="flex items-center gap-2"><Check className="h-4 w-4 text-[#68B62A]" /> Supports publicitaires</span>
                <span className="flex items-center gap-2"><Check className="h-4 w-4 text-[#68B62A]" /> Objets personnalisés</span>
                <span className="flex items-center gap-2"><Check className="h-4 w-4 text-[#68B62A]" /> Documents professionnels</span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-2xl lg:mr-0">
              <div className="absolute -left-5 top-10 z-20 hidden -rotate-90 items-center gap-2 whitespace-nowrap text-[10px] font-extrabold uppercase tracking-[0.18em] text-cyan-800 lg:flex"><span className="h-px w-12 bg-cyan-700" /> Production visuelle</div>
              <div className="print-sheet relative overflow-hidden bg-slate-100 p-3 shadow-[0_32px_70px_rgba(15,23,42,0.16)]">
                <img src={heroImage} alt="Atelier d’impression grand format" className="aspect-[1.14/1] w-full object-cover" />
                <div className="absolute left-3 right-3 bottom-3 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent p-7 pt-16">
                  <p className="max-w-[14rem] font-display text-2xl font-bold leading-tight tracking-[-0.05em] text-white">Concevoir, imprimer, valoriser.</p>
                </div>
              </div>
              <div className="fabrication-slip absolute -bottom-6 -left-4 flex max-w-[210px] items-center gap-3 border border-white/80 bg-white/95 p-4 shadow-xl backdrop-blur sm:-left-8">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#d9f0c4] text-[#4d931e]"><Sparkles className="h-5 w-5" /></div>
                <p className="text-xs font-bold leading-4 text-slate-700">Une équipe professionnelle, forte et dynamique à votre service.</p>
              </div>
              <div className="absolute -right-2 top-10 flex h-24 w-24 rotate-12 flex-col justify-between bg-cyan-700 p-4 text-white shadow-xl sm:-right-5 sm:h-28 sm:w-28">
                <ScanLine className="h-6 w-6" />
                <p className="font-display text-sm font-bold leading-3 tracking-[-0.05em]">FORMAT<br />QUI SE VOIT</p>
              </div>
            </div>
          </div>
          <div className="relative h-12 overflow-hidden bg-slate-950"><div className="marquee-track flex h-full w-max items-center gap-8 whitespace-nowrap text-[10px] font-extrabold uppercase tracking-[0.19em] text-white/80"><span>Impression numérique</span><i /> <span>Grand format</span><i /> <span>Graphisme de production</span><i /> <span>Personnalisation</span><i /> <span>Impression numérique</span><i /> <span>Grand format</span><i /> <span>Graphisme de production</span><i /> <span>Personnalisation</span></div></div>
        </section>

        <section id="services" className="relative scroll-mt-28 bg-[#f7f6f1] py-24 sm:py-32">
          <div className="side-rule absolute bottom-0 left-[max(1.5rem,calc((100%-80rem)/2+2rem))] top-0 hidden w-px bg-cyan-800/10 lg:block" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
              <div className="lg:pl-12">
                <Eyebrow>Nos savoir-faire</Eyebrow>
                <h2 className="mt-5 max-w-sm font-display text-4xl font-bold leading-[0.98] tracking-[-0.06em] text-slate-950 sm:text-5xl">Des supports utiles, visibles et bien pensés.</h2>
                <p className="mt-6 max-w-sm text-sm leading-6 text-slate-600">Chaque projet peut commencer par une demande simple. Nous vous aidons à identifier le format qui convient à votre communication, votre événement ou votre besoin de personnalisation.</p>
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="mt-8 inline-flex items-center gap-3 text-sm font-extrabold text-cyan-800 underline decoration-[#68B62A] decoration-2 underline-offset-8 transition hover:text-slate-950"><Phone className="h-4 w-4" /> Parlons de votre besoin</a>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {services.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <article key={service.number} className={`service-card print-sheet relative overflow-hidden border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${index === 0 ? "sm:translate-y-7" : ""} ${index === services.length - 1 ? "sm:col-span-2 sm:mx-[22%]" : ""}`}>
                      <div className="flex items-start justify-between">
                        <span className="fabrication-code font-display text-sm font-bold tracking-[-0.05em] text-slate-400">FICHE/{service.number}</span>
                        <span className={`grid h-11 w-11 place-items-center text-white ${service.tone}`}><Icon className="h-5 w-5" /></span>
                      </div>
                      <h3 className="mt-12 font-display text-xl font-bold leading-[1.02] tracking-[-0.045em] text-slate-950">{service.title}</h3>
                      <p className="mt-4 text-sm leading-6 text-slate-600">{service.text}</p>
                      <button onClick={() => scrollTo("contact")} className="mt-7 inline-flex items-center gap-2 border-b-2 border-[#68B62A] pb-1 text-xs font-extrabold text-cyan-800">Préparer un devis <ArrowRight className="h-3.5 w-3.5" /></button>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="galerie" className="relative scroll-mt-28 overflow-hidden bg-white py-24 sm:py-32">
          <div className="absolute inset-0 opacity-[0.055] print-grid" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <div>
                <Eyebrow>Galerie de production</Eyebrow>
                <h2 className="mt-5 max-w-md font-display text-4xl font-bold leading-[0.98] tracking-[-0.06em] text-slate-950 sm:text-5xl">Choisissez un univers, découvrez le format.</h2>
              </div>
              <div className="lg:pb-1"><p className="max-w-2xl text-sm leading-6 text-slate-600">Explorez les principaux univers de production de l’atelier. Les photos de vos réalisations récentes pourront ensuite être ajoutées à cette galerie au fil de vos projets.</p><div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Filtrer la galerie de production">{galleryFilters.map((filter) => <button key={filter} type="button" role="tab" aria-selected={activeFilter === filter} onClick={() => setActiveFilter(filter)} className={`gallery-filter ${activeFilter === filter ? "gallery-filter-active" : ""}`}>{filter}</button>)}</div></div>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {visibleWorks.map((work, index) => (
                <button key={work.title} type="button" onClick={() => setSelectedWork(work)} className={`gallery-work print-sheet group relative min-h-[340px] overflow-hidden text-left shadow-sm transition ${index === 0 ? "sm:col-span-2 sm:min-h-[420px] lg:col-span-2" : ""}`}>
                  <img src={work.image} alt={work.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/0" />
                  <div className="absolute left-4 top-4 border border-white/50 bg-slate-950/75 px-3 py-2 text-[9px] font-extrabold uppercase tracking-[0.14em] text-white backdrop-blur">{work.category}</div>
                  <div className="absolute inset-x-0 bottom-0 p-6"><p className="font-display text-2xl font-bold leading-[0.98] tracking-[-0.05em] text-white">{work.title}</p><span className="mt-5 inline-flex items-center gap-2 border-b-2 border-[#9ada62] pb-1 text-[11px] font-extrabold uppercase tracking-[0.1em] text-white">Voir le détail <ChevronRight className="h-3.5 w-3.5" /></span></div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="realisations" className="scroll-mt-28 bg-slate-950 py-24 text-white sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-8">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div>
                <Eyebrow>Formats & possibilités</Eyebrow>
                <h2 className="mt-5 max-w-2xl font-display text-4xl font-bold leading-[0.98] tracking-[-0.06em] sm:text-5xl">Quand l’idée devient un support qui travaille pour vous.</h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-slate-300">Une sélection de livrables affichés par l’établissement. Contactez-nous pour confirmer les finitions, quantités, tailles et disponibilités de votre projet.</p>
            </div>

            <div className="mt-14 grid gap-4 lg:grid-cols-12">
              <article className="print-sheet group relative min-h-[370px] overflow-hidden bg-slate-800 lg:col-span-7">
                <img src={personalisationImage} alt="Exemples d’objets et de supports personnalisés" className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
                <div className="absolute bottom-0 left-0 p-7 sm:p-9"><span className="fabrication-tag">Fiche / Personnalisation</span><h3 className="mt-4 font-display text-3xl font-bold tracking-[-0.06em]">Objets qui vous ressemblent.</h3></div>
              </article>
              <article className="print-sheet relative min-h-[370px] overflow-hidden bg-cyan-700 lg:col-span-5">
                <img src={designImage} alt="Conception graphique et préparation de fichiers" className="h-full w-full object-cover mix-blend-multiply opacity-85" />
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/90 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-7 sm:p-9"><span className="fabrication-tag border-white/50 bg-white/15">Fiche / Création graphique</span><h3 className="mt-4 font-display text-3xl font-bold tracking-[-0.06em]">Préparer le bon fichier, avant d’imprimer.</h3></div>
              </article>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
              <article className="print-sheet border border-white/10 bg-white/[0.06] p-7 sm:p-9">
                <div className="flex items-center gap-3"><Layers3 className="h-6 w-6 text-[#9ada62]" /><h3 className="font-display text-2xl font-bold tracking-[-0.05em]">Des solutions pour vos occasions et vos activités.</h3></div>
                <div className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                  {deliverables.map((item) => <p key={item} className="flex items-start gap-3 text-sm text-slate-200"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#9ada62]" />{item}</p>)}
                </div>
              </article>
              <article className="print-sheet relative overflow-hidden bg-cyan-600 p-7 text-white sm:p-9">
                <div className="absolute -right-8 -top-10 h-40 w-40 rounded-full border-[20px] border-white/20" />
                <FileImage className="relative h-7 w-7" />
                <h3 className="relative mt-12 max-w-xs font-display text-3xl font-bold leading-[0.98] tracking-[-0.06em]">Vous avez déjà votre maquette ?</h3>
                <p className="relative mt-4 max-w-xs text-sm font-medium leading-6 text-white/80">Envoyez-la par e-mail ou WhatsApp afin d’échanger rapidement sur la production.</p>
                <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="relative mt-7 inline-flex items-center gap-2 border-b-2 border-[#9ada62] pb-1 text-sm font-extrabold">Envoyer mon fichier <Send className="h-4 w-4" /></a>
              </article>
            </div>
          </div>
        </section>

        <section id="apropos" className="relative scroll-mt-28 overflow-hidden bg-white py-24 sm:py-32">
          <div className="absolute right-0 top-0 h-full w-1/2 bg-[#e8f7fa]" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
            <div className="relative max-w-md">
              <div className="absolute -left-4 -top-4 h-20 w-20 rounded-3xl border border-[#68B62A]/40" />
              <div className="relative overflow-hidden rounded-[2rem] border-8 border-white bg-slate-100 shadow-[0_25px_55px_rgba(15,23,42,0.14)]">
                <img src={officialLogo} alt="Logo officiel ETS Pro-Informatique" className="aspect-[1.4/1] w-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-4 rounded-2xl bg-slate-950 px-5 py-4 text-white shadow-lg sm:-right-8"><p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-cyan-300">Notre point d’ancrage</p><p className="mt-1 font-display text-xl font-bold tracking-[-0.05em]">Bafoussam</p></div>
            </div>
            <div className="lg:py-10">
              <Eyebrow>ETS Pro-Informatique</Eyebrow>
              <h2 className="mt-5 max-w-xl font-display text-4xl font-bold leading-[0.98] tracking-[-0.06em] text-slate-950 sm:text-5xl">Un atelier de production visuelle, à deux pas de vos projets.</h2>
              <p className="mt-7 max-w-xl text-base leading-7 text-slate-600">Situé à la descente Akwa de Bafoussam, ETS Pro-Informatique réunit impression numérique, supports de communication, grand format, personnalisation, formalités administratives et Cybercafé Au Débit by Pro.</p>
              <div className="mt-9 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-5"><MonitorCog className="h-5 w-5 text-cyan-700" /><p className="mt-4 text-sm font-extrabold text-slate-900">Un accompagnement orienté production</p><p className="mt-2 text-xs leading-5 text-slate-500">Pour passer du besoin au bon support avec davantage de clarté.</p></div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5"><FileCheck2 className="h-5 w-5 text-[#68B62A]" /><p className="mt-4 text-sm font-extrabold text-slate-900">Formalités et documents utiles</p><p className="mt-2 text-xs leading-5 text-slate-500">Télé-déclarations, attestations d’immatriculation et accompagnement administratif.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f7f6f1] py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-8">
            <div className="print-sheet overflow-hidden border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div className="px-2 sm:px-5"><Eyebrow>Nos prestations, en un coup d’œil</Eyebrow><h2 className="mt-5 font-display text-3xl font-bold leading-[0.98] tracking-[-0.055em] text-slate-950 sm:text-4xl">Un aperçu des services mis en avant par l’atelier.</h2><p className="mt-5 text-sm leading-6 text-slate-600">Retrouvez l’ensemble des prestations illustrées dans le visuel ci-contre. Pour un tarif ou une disponibilité, contactez directement l’équipe.</p><a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-cyan-800">Demander les détails <ArrowRight className="h-4 w-4" /></a></div>
                <a href={servicePoster} target="_blank" rel="noreferrer" className="print-sheet group relative block overflow-hidden bg-slate-100"><img src={servicePoster} alt="Affiche de présentation des services ETS Pro-Informatique" className="aspect-[1.8/1] w-full object-cover object-[center_32%] transition duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-slate-950/20 transition group-hover:bg-slate-950/10" /><span className="absolute left-4 top-4 border border-white/60 bg-slate-950/80 px-3 py-2 text-[9px] font-extrabold uppercase tracking-[0.15em] text-white backdrop-blur">Document atelier / services</span><span className="absolute bottom-4 right-4 bg-white px-3 py-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-900 shadow-lg">Ouvrir l’affiche</span></a>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="relative scroll-mt-28 overflow-hidden bg-cyan-800 py-24 text-white sm:py-32">
          <div className="absolute inset-0 opacity-10 print-grid" />
          <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-cyan-400/40 blur-3xl" />
          <div className="relative mx-auto grid max-w-7xl gap-14 px-4 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <Eyebrow>Une idée, un support, un devis</Eyebrow>
              <h2 className="mt-5 max-w-lg font-display text-4xl font-bold leading-[0.98] tracking-[-0.06em] sm:text-5xl">Parlons de votre prochain projet.</h2>
              <p className="mt-6 max-w-md text-base leading-7 text-cyan-50/80">Appelez, écrivez ou passez à l’atelier. La demande précise est le meilleur point de départ : type de support, quantité, dimensions et délai souhaité.</p>
              <div className="mt-10 space-y-4">
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="contact-row"><span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10"><Phone className="h-5 w-5 text-[#b8ea88]" /></span><span><span className="block text-[10px] font-extrabold uppercase tracking-[0.15em] text-cyan-200">Téléphone</span><span className="mt-1 block text-base font-bold">+237 699 97 98 57</span></span></a>
                <a href="mailto:proinformatique2@gmail.com" className="contact-row"><span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10"><Mail className="h-5 w-5 text-[#b8ea88]" /></span><span><span className="block text-[10px] font-extrabold uppercase tracking-[0.15em] text-cyan-200">E-mail</span><span className="mt-1 block text-base font-bold">proinformatique2@gmail.com</span></span></a>
                <a href="https://www.google.com/maps/dir/?api=1&destination=ETS+Pro-Informatique,+Descente+Akwa,+Bafoussam,+Cameroon" target="_blank" rel="noreferrer" className="contact-row"><span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10"><MapPin className="h-5 w-5 text-[#b8ea88]" /></span><span><span className="block text-[10px] font-extrabold uppercase tracking-[0.15em] text-cyan-200">Adresse</span><span className="mt-1 block text-base font-bold">BP 1313 · Descente Akwa, Bafoussam</span><span className="mt-1 block text-xs text-cyan-100">Cybercafé Au Débit by Pro : service intégré</span></span></a>
              </div>
              <div className="mt-10 flex flex-wrap gap-3"><a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#68B62A] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#579c20] active:scale-[0.97]"><MessageCircle className="h-4 w-4" /> WhatsApp</a><a href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-white hover:text-cyan-900 active:scale-[0.97]"><Clock3 className="h-4 w-4" /> Voir les horaires</a></div>
            </div>

            <form onSubmit={handleSubmit} className="print-sheet bg-white p-6 text-slate-950 shadow-2xl shadow-cyan-950/20 sm:p-8">
              <div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-cyan-700">Demande de devis</p><h3 className="mt-2 font-display text-2xl font-bold tracking-[-0.055em]">Dites-nous l’essentiel.</h3></div><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#d9f0c4] text-[#4d931e]"><Send className="h-4 w-4" /></span></div>
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <label className="form-label">Votre nom<input name="name" required placeholder="Nom et prénom" className="form-input" /></label>
                <label className="form-label">Téléphone / e-mail<input name="contact" required placeholder="Votre contact" className="form-input" /></label>
              </div>
              <label className="form-label mt-4">Service souhaité<select name="service" className="form-input"><option>Impression / grand format</option><option>Graphisme de production</option><option>Personnalisation / sérigraphie</option><option>Agrandissement photo</option><option>Autre projet</option></select></label>
              <label className="form-label mt-4">Votre projet<textarea name="message" required rows={4} placeholder="Ex. 2 banderoles de 3 × 1 m pour un événement, pour le 15 septembre…" className="form-input resize-none" /></label>
              <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-slate-950 px-5 py-4 text-sm font-extrabold text-white transition hover:bg-cyan-800 active:scale-[0.97]">Préparer l’e-mail de demande <ArrowRight className="h-4 w-4" /></button>
              <p className="mt-4 text-center text-[11px] leading-5 text-slate-500">{sent ? "Votre application e-mail s’ouvre avec les informations saisies." : "Le formulaire ouvre votre messagerie avec les détails de votre demande."}</p>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-slate-950 px-4 pb-8 pt-12 text-white sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 border-b border-white/10 pb-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div><img src={officialLogo} alt="Logo officiel ETS Pro-Informatique" className="h-16 w-40 object-contain object-left" /><p className="mt-5 max-w-xs text-sm leading-6 text-slate-400">Impression numérique, graphisme de production, grand format, formalités utiles et objets personnalisés à Bafoussam.</p></div>
          <div><p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-cyan-300">Navigation</p><div className="mt-5 flex flex-col gap-3 text-sm font-bold text-slate-300"><a href="/services" className="text-left hover:text-white">Services</a><a href="/galerie" className="text-left hover:text-white">Galerie</a><a href="/cybercafe-au-debit" className="text-left hover:text-white">Cyber Au Débit</a><a href="/contact" className="text-left hover:text-white">Contact & devis</a></div></div>
          <div><p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-cyan-300">Contact rapide</p><a className="mt-5 block text-sm font-bold text-slate-300 hover:text-white" href={`tel:${phone.replace(/\s/g, "")}`}>+237 699 97 98 57</a><a className="mt-3 block text-sm font-bold text-slate-300 hover:text-white" href="mailto:proinformatique2@gmail.com">proinformatique2@gmail.com</a><p className="mt-3 text-sm text-slate-400">Descente Akwa, Bafoussam · Cybercafé Au Débit by Pro</p></div>
        </div>
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 pt-7 text-[11px] font-medium text-slate-500 sm:flex-row"><p>© {new Date().getFullYear()} ETS Pro-Informatique. Tous droits réservés.</p><p>Site vitrine · Informations à confirmer pour tout devis ou délai.</p></div>
      </footer>

      <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-[#68B62A] text-white shadow-[0_15px_32px_rgba(51,115,19,0.35)] transition hover:-translate-y-1 active:scale-[0.95]" aria-label="Contacter ETS Pro-Informatique sur WhatsApp"><MessageCircle className="h-6 w-6" /></a>

      <Dialog open={Boolean(selectedWork)} onOpenChange={(open) => !open && setSelectedWork(null)}>
        <DialogContent className="max-w-3xl overflow-hidden rounded-[0.35rem_1.6rem_0.35rem_1.6rem] border-0 bg-white p-0 shadow-2xl" showCloseButton>
          {selectedWork && <div className="grid md:grid-cols-[1.1fr_0.9fr]"><div className="min-h-[300px] bg-slate-100"><img src={selectedWork.image} alt={selectedWork.title} className="h-full w-full object-cover" /></div><div className="flex flex-col justify-between p-7 sm:p-9"><div><span className="fabrication-tag">{selectedWork.category}</span><DialogTitle className="mt-5 font-display text-3xl font-bold leading-[0.98] tracking-[-0.06em] text-slate-950">{selectedWork.title}</DialogTitle><DialogDescription className="mt-5 text-sm leading-6 text-slate-600">{selectedWork.description}</DialogDescription></div><a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Bonjour ETS Pro-Informatique, je souhaite un devis pour : ${selectedWork.title}.`)}`} target="_blank" rel="noreferrer" className="mt-10 inline-flex w-fit items-center gap-2 border-b-2 border-[#68B62A] pb-1 text-sm font-extrabold text-cyan-800">Demander ce type de projet <ArrowRight className="h-4 w-4" /></a></div></div>}
        </DialogContent>
      </Dialog>
    </div>
  );
}
