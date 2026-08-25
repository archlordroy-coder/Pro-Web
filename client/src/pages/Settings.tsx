/**
 * ETS Pro-Informatique — L’Atelier Signalétique.
 * Page Paramètres : une régie de son claire et optionnelle, sans panneau flottant dans le parcours client.
 */
import { ArrowLeft, ShieldCheck, SlidersHorizontal, Sparkles, Volume2 } from "lucide-react";
import { Link } from "wouter";
import { PageShell } from "@/components/SiteShell";
import { SoundSettingsPanel } from "@/contexts/SoundDesignContext";

export default function Settings() {
  return <PageShell>
    <main className="relative overflow-hidden bg-[#f7f6f1] py-16 sm:py-24">
      <div className="absolute inset-0 opacity-[0.045] print-grid" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.12em] text-cyan-800 transition hover:text-slate-950"><ArrowLeft className="h-4 w-4" /> Retour à l’accueil</Link>
        <div className="mt-10 grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div className="lg:pt-6">
            <p className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-cyan-700"><span className="h-2 w-2 rounded-full bg-[#68B62A]" /> Préférences</p>
            <h1 className="mt-5 max-w-md font-display text-5xl font-bold leading-[0.94] tracking-[-0.065em] text-slate-950 sm:text-6xl">Réglez votre <span className="text-cyan-700">ambiance.</span></h1>
            <p className="mt-7 max-w-md text-base leading-7 text-slate-600">Choisissez les signaux sonores, l’ambiance qui vous accompagne et les retours haptiques. Rien ne se lance sans votre action.</p>
            <div className="mt-10 space-y-4">
              <div className="settings-note"><Volume2 className="h-5 w-5 text-cyan-700" /><div><p>Sons d’interface</p><span>Des confirmations très courtes pour les actions importantes.</span></div></div>
              <div className="settings-note"><Sparkles className="h-5 w-5 text-[#4d931e]" /><div><p>Ambiances optionnelles</p><span>Atelier, Calme ou Production : une seule boucle à la fois.</span></div></div>
              <div className="settings-note"><ShieldCheck className="h-5 w-5 text-slate-700" /><div><p>Vos préférences restent prioritaires</p><span>Volume, vibration et ambiance sont modifiables à tout moment.</span></div></div>
            </div>
          </div>
          <section className="settings-console print-sheet border border-slate-200 bg-white p-6 shadow-[0_24px_54px_rgba(15,23,42,0.12)] sm:p-9" aria-labelledby="sound-settings-title">
            <div className="flex items-start gap-4 border-b border-slate-200 pb-6"><span className="grid h-12 w-12 shrink-0 place-items-center bg-cyan-50 text-cyan-800"><SlidersHorizontal className="h-5 w-5" /></span><div><p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-cyan-700">Régie personnelle</p><h2 id="sound-settings-title" className="mt-2 font-display text-3xl font-bold tracking-[-0.055em] text-slate-950">Son & sensations</h2></div></div>
            <SoundSettingsPanel />
            <p className="mt-7 border-t border-slate-100 pt-5 text-xs leading-5 text-slate-500">Les ambiances sont des boucles instrumentales originales. Elles restent désactivées à chaque nouvelle visite et peuvent être arrêtées immédiatement.</p>
          </section>
        </div>
      </div>
    </main>
  </PageShell>;
}
