/** ETS Pro-Informatique — Contact & devis, présenté comme une fiche de service catalogue. */
import { Clock3, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageShell, quoteLink } from "@/components/SiteShell";
import PageHero from "@/components/PageHero";
import QuoteForm from "@/components/QuoteForm";

const schedule = [
  ["Lundi — vendredi", "07:30 — 18:00"],
  ["Samedi", "08:00 — 14:00"],
  ["Dimanche", "Fermé"],
];

export default function Contact() {
  return <PageShell>
    <PageHero eyebrow="Contact & devis" title={<>Parlons de votre <span className="text-[#075bb9]">projet.</span></>} description="Indiquez le service, le format, la quantité et le délai. L’équipe ETS Pro-Informatique discutera avec vous de la solution et du tarif." image="/manus-storage/ets-pro-formalities-desk_7c260fd9.jpg" />
    <section className="catalog-section bg-[#f4f6fa]"><div className="catalog-wrap grid gap-7 lg:grid-cols-[.82fr_1.18fr] lg:items-start"><aside className="catalog-filter-panel"><p className="catalog-kicker">Informations pratiques</p><h2 className="catalog-section-title mt-2 text-[1.75rem]">Retrouvez-nous facilement.</h2><div className="mt-6 grid gap-4"><a href="tel:+237699979857" className="flex items-center gap-3 text-sm text-slate-700"><span className="grid h-9 w-9 place-items-center rounded-[.3rem] bg-[#eaf3ff] text-[#075bb9]"><Phone className="h-4 w-4" /></span><span><strong className="block text-[#1b3152]">Téléphone</strong>+237 699 97 98 57</span></a><a href="mailto:proinformatique2@gmail.com" className="flex items-center gap-3 text-sm text-slate-700"><span className="grid h-9 w-9 place-items-center rounded-[.3rem] bg-[#eaf3ff] text-[#075bb9]"><Mail className="h-4 w-4" /></span><span><strong className="block text-[#1b3152]">E-mail</strong>proinformatique2@gmail.com</span></a><a href="https://www.google.com/maps/dir/?api=1&destination=ETS+Pro-Informatique,+Descente+Akwa,+Bafoussam,+Cameroon" target="_blank" rel="noreferrer" className="flex items-start gap-3 text-sm text-slate-700"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-[.3rem] bg-[#eaf3ff] text-[#075bb9]"><MapPin className="h-4 w-4" /></span><span><strong className="block text-[#1b3152]">Atelier</strong>BP 1313, Descente Akwa, Bafoussam<br /><small>Cyber Au Débit by Pro : service intégré</small></span></a></div><div className="mt-7 border-t border-slate-100 pt-5"><div className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-[#075bb9]" /><p className="text-xs font-bold text-[#1b3152]">Horaires d’ouverture</p></div><div className="mt-3 divide-y divide-slate-100">{schedule.map(([day, time]) => <div key={day} className="flex items-center justify-between gap-3 py-2.5 text-xs"><span className="text-slate-600">{day}</span><strong className={time === "Fermé" ? "text-slate-400" : "text-[#1b3152]"}>{time}</strong></div>)}</div></div><div className="mt-6 rounded-[.35rem] bg-[#eef5ff] p-4"><p className="text-xs font-bold text-[#1b3152]">Tarifs sur demande</p><p className="mt-1 text-xs leading-5 text-slate-600">Le format, la quantité et la finition déterminent la proposition. Discutez-en avec l’équipe sur WhatsApp ou directement à l’atelier.</p><a href={quoteLink()} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-[#075bb9]"><MessageCircle className="h-4 w-4" /> Écrire sur WhatsApp</a></div></aside><QuoteForm /></div></section>
  </PageShell>;
}
