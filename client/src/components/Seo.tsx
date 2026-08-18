/**
 * ETS Pro-Informatique — référencement local par route.
 * Met à jour les balises essentielles et la donnée structurée Service pour chaque page ciblée.
 */
import { useEffect } from "react";

const domain = "https://ets-pro-informatique.vercel.app";

type SeoProps = { title: string; description: string; path: string; serviceName: string; serviceDescription: string };

export default function Seo({ title, description, path, serviceName, serviceDescription }: SeoProps) {
  useEffect(() => {
    document.body.dataset.seoPage = path.includes("serigraphie") ? "serigraphie" : path.includes("teledeclarations") ? "formalities" : "impression";
    document.title = title;
    const updateMeta = (name: string, value: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.querySelector<HTMLMetaElement>(selector);
      if (!element) { element = document.createElement("meta"); property ? element.setAttribute("property", name) : element.setAttribute("name", name); document.head.appendChild(element); }
      element.content = value;
    };
    updateMeta("description", description);
    updateMeta("og:title", title, true);
    updateMeta("og:description", description, true);
    updateMeta("og:url", `${domain}${path}`, true);
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = `${domain}${path}`;
    document.getElementById("service-jsonld")?.remove();
    const script = document.createElement("script");
    script.id = "service-jsonld";
    script.type = "application/ld+json";
    script.text = JSON.stringify({ "@context": "https://schema.org", "@type": "Service", name: serviceName, description: serviceDescription, areaServed: { "@type": "City", name: "Bafoussam" }, provider: { "@type": "LocalBusiness", name: "ETS Pro-Informatique", telephone: "+237699979857", email: "proinformatique2@gmail.com", address: { "@type": "PostalAddress", streetAddress: "BP 1313, Descente Akwa", addressLocality: "Bafoussam", addressCountry: "CM" } } });
    document.head.appendChild(script);
    return () => { script.remove(); delete document.body.dataset.seoPage; };
  }, [title, description, path, serviceName, serviceDescription]);
  return null;
}
