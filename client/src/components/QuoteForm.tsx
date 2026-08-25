/**
 * ETS Pro-Informatique — formulaire catalogue.
 * Les tarifs ne sont pas affichés : le besoin est transmis à WhatsApp pour une discussion avec l’équipe.
 */
import { type ChangeEvent, type FormEvent, type FocusEvent, useState } from "react";
import { ArrowRight, CheckCircle2, CircleAlert, LoaderCircle, Send } from "lucide-react";
import { useSoundDesign } from "@/contexts/SoundDesignContext";

type FieldName = "name" | "contact" | "message";
type Errors = Partial<Record<FieldName, string>>;
type Touched = Partial<Record<FieldName, boolean>>;
const whatsappNumber = "237699979857";

const fieldGuide: Record<FieldName, string> = {
  name: "Indiquez votre nom complet.",
  contact: "Numéro de téléphone ou adresse e-mail.",
  message: "Ajoutez au moins 12 caractères sur votre besoin.",
};

const fieldSuccess: Record<FieldName, string> = {
  name: "Nom enregistré.",
  contact: "Coordonnée reconnue.",
  message: "Projet suffisamment détaillé.",
};

const validateField = (field: FieldName, value: string) => {
  const trimmed = value.trim();
  if (field === "name") return trimmed.length >= 2 ? "" : "Indiquez au moins deux caractères pour votre nom.";
  if (field === "contact") return /(^[^\s@]+@[^\s@]+\.[^\s@]+$)|(^[+\d][\d\s().-]{6,}$)/.test(trimmed) ? "" : "Saisissez un numéro valide ou une adresse e-mail valide.";
  return trimmed.length >= 12 ? "" : "Décrivez votre projet en au moins 12 caractères.";
};

function FieldFeedback({ field, error, touched }: { field: FieldName; error?: string; touched?: boolean }) {
  const valid = Boolean(touched && !error);
  const message = error || (valid ? fieldSuccess[field] : fieldGuide[field]);
  return <span id={`${field}-feedback`} className={`field-feedback-inline ${error ? "field-feedback-error" : valid ? "field-feedback-valid" : "field-feedback-guide"}`} aria-live="polite" aria-atomic="true">{error ? <CircleAlert className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> : valid ? <CheckCircle2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> : <span className="field-feedback-mark" aria-hidden="true" />} {message}</span>;
}

export default function QuoteForm({ accent = "cyan" }: { accent?: "cyan" | "dark" }) {
  const { haptic, play } = useSoundDesign();
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Touched>({});
  const [submitted, setSubmitted] = useState(false);
  const [sent, setSent] = useState(false);

  const updateField = (field: FieldName, value: string) => {
    const error = validateField(field, value);
    setErrors((previous) => ({ ...previous, [field]: error || undefined }));
  };

  const validateSingle = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = event.currentTarget.name as FieldName;
    if (!(field in { name: true, contact: true, message: true })) return;
    setTouched((previous) => ({ ...previous, [field]: true }));
    updateField(field, event.currentTarget.value);
  };

  const validateAsTyped = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = event.currentTarget.name as FieldName;
    if (!(field in { name: true, contact: true, message: true })) return;
    setTouched((previous) => ({ ...previous, [field]: true }));
    updateField(field, event.currentTarget.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nextErrors: Errors = {
      name: validateField("name", String(data.get("name") || "")) || undefined,
      contact: validateField("contact", String(data.get("contact") || "")) || undefined,
      message: validateField("message", String(data.get("message") || "")) || undefined,
    };
    setTouched({ name: true, contact: true, message: true });
    setSubmitted(true);
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) { setSent(false); play("error"); haptic("error"); return; }
    const message = encodeURIComponent(`Bonjour ETS Pro-Informatique, je souhaite demander un devis.\n\nNom : ${data.get("name")}\nTéléphone / e-mail : ${data.get("contact")}\nService : ${data.get("service")}\nQuantité ou format : ${data.get("format") || "À préciser"}\nDélai souhaité : ${data.get("deadline") || "À préciser"}\n\nDétails du projet :\n${data.get("message")}`);
    setSent(true);
    play("success");
    haptic("success");
    window.setTimeout(() => { window.location.assign(`https://wa.me/${whatsappNumber}?text=${message}`); }, 1250);
  };

  return <form noValidate onSubmit={handleSubmit} className={`quote-form rounded-[.42rem] border border-slate-200 bg-white p-6 text-slate-950 shadow-[0_8px_20px_rgba(19,47,88,.08)] ${accent === "dark" ? "shadow-slate-950/20" : "shadow-cyan-950/20"} sm:p-8`}>
    <div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#075bb9]">Demande de devis</p><h2 className="mt-2 font-display text-2xl font-bold tracking-[-0.04em]">Parlons de votre projet.</h2><p className="mt-2 max-w-md text-xs leading-5 text-slate-500">Le tarif dépend du format, de la quantité et de la finition. Il sera discuté avec l’équipe sur WhatsApp ou à l’atelier.</p></div><span className="grid h-10 w-10 rounded-[.3rem] bg-[#eaf3ff] text-[#075bb9]"><Send className="h-4 w-4" /></span></div>
    {submitted && Object.values(errors).some(Boolean) && <div className="form-feedback form-feedback-error mt-6" role="alert"><CircleAlert className="mt-0.5 h-4 w-4 shrink-0" /><p><strong>Quelques informations sont à compléter.</strong> Vérifiez les champs signalés avant de préparer votre demande.</p></div>}
    {sent && <div className="form-feedback form-feedback-success quote-redirect-feedback mt-6" role="status" aria-live="polite"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /><div className="min-w-0 flex-1"><p><strong>Votre demande est prête.</strong> Préparation du message WhatsApp pour discuter du tarif et des détails avec l’équipe…</p><div className="quote-progress mt-3" role="progressbar" aria-label="Préparation de la redirection WhatsApp" aria-valuemin={0} aria-valuemax={100} aria-valuetext="Redirection vers WhatsApp en cours"><span /></div></div></div>}
    <div className="mt-7 grid gap-4 sm:grid-cols-2">
      <label className="form-label">Votre nom<input name="name" aria-invalid={Boolean(touched.name && errors.name)} aria-describedby="name-feedback" placeholder="Nom et prénom" className={`form-input ${errors.name ? "form-input-error" : touched.name ? "form-input-valid" : ""}`} onBlur={validateSingle} onChange={validateAsTyped} /><FieldFeedback field="name" error={errors.name} touched={touched.name} /></label>
      <label className="form-label">Téléphone / e-mail<input name="contact" aria-invalid={Boolean(touched.contact && errors.contact)} aria-describedby="contact-feedback" placeholder="Votre contact" className={`form-input ${errors.contact ? "form-input-error" : touched.contact ? "form-input-valid" : ""}`} onBlur={validateSingle} onChange={validateAsTyped} /><FieldFeedback field="contact" error={errors.contact} touched={touched.contact} /></label>
    </div>
    <label className="form-label mt-4">Service souhaité<select name="service" className="form-input"><option>Impression / grand format</option><option>Graphisme de production</option><option>Sérigraphie / personnalisation</option><option>Cybercafé / service en ligne</option><option>Télé-déclaration / attestation</option><option>Autre projet</option></select></label>
    <div className="mt-4 grid gap-4 sm:grid-cols-2"><label className="form-label">Quantité / format<input name="format" placeholder="Ex. 100 flyers A5" className="form-input" /></label><label className="form-label">Délai souhaité<input name="deadline" placeholder="Ex. Avant le 15 septembre" className="form-input" /></label></div>
    <label className="form-label mt-4">Votre projet<textarea name="message" aria-invalid={Boolean(touched.message && errors.message)} aria-describedby="message-feedback" rows={4} placeholder="Décrivez votre besoin, vos dimensions ou les documents à préparer…" className={`form-input resize-none ${errors.message ? "form-input-error" : touched.message ? "form-input-valid" : ""}`} onBlur={validateSingle} onChange={validateAsTyped} /><FieldFeedback field="message" error={errors.message} touched={touched.message} /></label>
    <button type="submit" disabled={sent} aria-busy={sent} className={`quote-submit mt-6 inline-flex w-full items-center justify-center gap-3 rounded-[.32rem] bg-[#075bb9] px-5 py-4 text-sm font-extrabold text-white transition hover:bg-[#034b99] active:scale-[0.97] disabled:cursor-wait ${sent ? "quote-submit-loading" : "disabled:opacity-75"}`}>{sent ? <><span className="quote-submit-loader" aria-hidden="true"><LoaderCircle className="h-4 w-4" /></span><span aria-live="polite">Préparation du message…</span></> : <>Discuter de mon devis sur WhatsApp <ArrowRight className="h-4 w-4" /></>}</button>
    <p className="mt-4 text-center text-[11px] leading-5 text-slate-500">Après validation, WhatsApp s’ouvre avec votre demande pré-remplie. Vous pouvez aussi venir directement à l’atelier pour discuter du tarif.</p>
  </form>;
}
