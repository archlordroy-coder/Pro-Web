/**
 * ETS Pro-Informatique — L’Atelier Signalétique.
 * FAQ de service : réponses de proximité, présentées comme des fiches de fabrication consultables.
 */
type FaqItem = { question: string; answer: string };

export default function ServiceFaq({ eyebrow = "Questions fréquentes", title, intro, items }: { eyebrow?: string; title: string; intro?: string; items: FaqItem[] }) {
  return <section className="relative overflow-hidden bg-white py-20 sm:py-28"><div aria-hidden className="section-production-rail" /><div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-8 lg:grid-cols-[0.78fr_1.22fr]"><div><p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-cyan-700">{eyebrow}</p><h2 className="mt-5 max-w-md font-display text-4xl font-bold leading-[0.98] tracking-[-0.06em] text-slate-950 sm:text-5xl">{title}</h2>{intro && <p className="mt-5 max-w-md text-sm leading-6 text-slate-600">{intro}</p>}</div><div className="space-y-3">{items.map((item, index) => <details key={item.question} className="service-faq print-sheet border border-slate-200 bg-[#f7f6f1] p-5"><summary className="cursor-pointer list-none pr-8 font-display text-xl font-bold tracking-[-0.04em] text-slate-950"><span className="mr-3 text-[10px] font-extrabold tracking-[0.16em] text-[#68B62A]">FAQ/{String(index + 1).padStart(2, "0")}</span>{item.question}</summary><p className="mt-4 border-l-2 border-cyan-700 pl-4 text-sm leading-6 text-slate-600">{item.answer}</p></details>)}</div></div></section>;
}
