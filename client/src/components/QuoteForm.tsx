/**
 * ETS Pro-Informatique — L’Atelier Signalétique.
 * Formulaire réutilisable : chaque demande crée un e-mail clair à envoyer à l’atelier.
 */
import { type FormEvent, useState } from "react";
import { ArrowRight, Send } from "lucide-react";

export default function QuoteForm({ accent = "cyan" }: { accent?: "cyan" | "dark" }) {
  const [sent, setSent] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Demande de devis — ${data.get("service") || "ETS Pro-Informatique"}`);
    const body = encodeURIComponent(`Bonjour ETS Pro-Informatique,\n\nNom : ${data.get("name")}\nTéléphone / e-mail : ${data.get("contact")}\nService : ${data.get("service")}\nQuantité ou format : ${data.get("format")}\nDélai souhaité : ${data.get("deadline")}\n\nDétails du projet :\n${data.get("message")}`);
    setSent(true);
    window.location.href = `mailto:proinformatique2@gmail.com?subject=${subject}&body=${body}`;
  };
  return <form onSubmit={handleSubmit} className={`print-sheet quote-form bg-white p-6 text-slate-950 shadow-2xl ${accent === "dark" ? "shadow-slate-950/20" : "shadow-cyan-950/20"} sm:p-8`}><div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-cyan-700">Demande de devis</p><h2 className="mt-2 font-display text-2xl font-bold tracking-[-0.055em]">Dites-nous l’essentiel.</h2></div><span className="grid h-10 w-10 place-items-center bg-[#d9f0c4] text-[#4d931e]"><Send className="h-4 w-4" /></span></div><div className="mt-7 grid gap-4 sm:grid-cols-2"><label className="form-label">Votre nom<input name="name" required placeholder="Nom et prénom" className="form-input" /></label><label className="form-label">Téléphone / e-mail<input name="contact" required placeholder="Votre contact" className="form-input" /></label></div><label className="form-label mt-4">Service souhaité<select name="service" className="form-input"><option>Impression / grand format</option><option>Graphisme de production</option><option>Sérigraphie / personnalisation</option><option>Cybercafé / service en ligne</option><option>Télé-déclaration / attestation</option><option>Autre projet</option></select></label><div className="mt-4 grid gap-4 sm:grid-cols-2"><label className="form-label">Quantité / format<input name="format" placeholder="Ex. 100 flyers A5" className="form-input" /></label><label className="form-label">Délai souhaité<input name="deadline" placeholder="Ex. Avant le 15 septembre" className="form-input" /></label></div><label className="form-label mt-4">Votre projet<textarea name="message" required rows={4} placeholder="Décrivez votre besoin, vos dimensions ou les documents à préparer…" className="form-input resize-none" /></label><button type="submit" className="quote-submit mt-6 inline-flex w-full items-center justify-center gap-3 bg-[#68B62A] px-5 py-4 text-sm font-extrabold text-white transition hover:bg-[#579c20] active:scale-[0.97]">Préparer l’e-mail de demande <ArrowRight className="h-4 w-4" /></button><p className="mt-4 text-center text-[11px] leading-5 text-slate-500">{sent ? "Votre application e-mail s’ouvre avec les informations saisies." : "Le formulaire ouvre votre messagerie avec les détails de votre demande."}</p></form>;
}
