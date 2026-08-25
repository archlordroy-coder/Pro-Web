/**
 * ETS Pro-Informatique — L’Atelier Signalétique.
 * Navigation de service : chemin clair, données BreadcrumbList et partage des pages locales.
 */
import { useEffect } from "react";
import { Facebook, Linkedin, MessageCircle } from "lucide-react";
import { Link } from "wouter";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const domain = "https://ets-pro-informatique.vercel.app";

type ServiceNavigationProps = { title: string; path: string };

export function ServiceBreadcrumb({ title, path }: ServiceNavigationProps) {
  useEffect(() => {
    const isServiceHub = path === "/services";
    document.getElementById("breadcrumb-jsonld")?.remove();
    const script = document.createElement("script");
    script.id = "breadcrumb-jsonld";
    script.type = "application/ld+json";
    script.text = JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${domain}/` },
      ...(!isServiceHub ? [{ "@type": "ListItem", position: 2, name: "Services", item: `${domain}/services` }] : []),
      { "@type": "ListItem", position: isServiceHub ? 2 : 3, name: title, item: `${domain}${path}` },
    ] });
    document.head.appendChild(script);
    return () => script.remove();
  }, [title, path]);

  const isServiceHub = path === "/services";
  return <Breadcrumb className="mb-5"><BreadcrumbList className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-500"><BreadcrumbItem><BreadcrumbLink asChild><Link href="/" className="hover:text-cyan-800">Accueil</Link></BreadcrumbLink></BreadcrumbItem>{!isServiceHub && <><BreadcrumbSeparator className="text-[#68B62A]" /><BreadcrumbItem><BreadcrumbLink asChild><Link href="/services" className="hover:text-cyan-800">Services</Link></BreadcrumbLink></BreadcrumbItem></>}<BreadcrumbSeparator className="text-[#68B62A]" /><BreadcrumbItem className="min-w-0"><BreadcrumbPage className="truncate font-extrabold text-cyan-800">{title}</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>;
}

export function ServiceShare({ title, path }: ServiceNavigationProps) {
  const url = `${domain}${path}`;
  const text = `${title} — ETS Pro-Informatique à Bafoussam`;
  const links = [
    { label: "Partager sur Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, Icon: Facebook },
    { label: "Partager sur LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, Icon: Linkedin },
    { label: "Partager sur WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`, Icon: MessageCircle },
  ];
  return <div className="mt-7 flex flex-wrap items-center gap-2 border-t border-slate-200 pt-5"><span className="mr-1 text-[9px] font-extrabold uppercase tracking-[0.15em] text-slate-500">Partager cette page</span>{links.map(({ label, href, Icon }) => <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="share-action group inline-flex h-9 w-9 items-center justify-center border border-slate-300 bg-white text-slate-600"><Icon className="h-4 w-4" /></a>)}</div>;
}
