/**
 * ETS Pro-Informatique — référencement local par route.
 * Injecte des titres, descriptions, canonicals, directives Google et données structurées cohérentes.
 */
import { useEffect } from "react";

const domain = "https://ets-pro-informatique.vercel.app";
const logo = `${domain}/manus-storage/logo-informatique-transparent_7b3106be.png`;
const serviceShareImages: Record<string, { src: string; alt: string }> = {
  "/services": { src: `${domain}/manus-storage/ets-pro-atelier-production-tactile_60bd90ab.jpg`, alt: "Atelier de production ETS Pro-Informatique à Bafoussam" },
  "/impression-bafoussam": { src: `${domain}/manus-storage/ets-pro-gallery-grand-format_ec012fbf.jpg`, alt: "Impression grand format à Bafoussam" },
  "/serigraphie-bafoussam": { src: `${domain}/manus-storage/ets-pro-gallery-serigraphie_91240803.jpg`, alt: "Sérigraphie et personnalisation à Bafoussam" },
  "/teledeclarations-attestations-bafoussam": { src: `${domain}/manus-storage/ets-pro-formalities-desk_41c7c244.jpg`, alt: "Accompagnement aux télé-déclarations à Bafoussam" },
  "/cybercafe-au-debit": { src: `${domain}/manus-storage/ets-pro-cybercafe-service-desk_4f071e66.jpg`, alt: "Cybercafé Au Débit by Pro à Bafoussam" },
};

type SeoProps = {
  title: string;
  description: string;
  path: string;
  serviceName?: string;
  serviceDescription?: string;
  noIndex?: boolean;
};

const canonicalUrl = (path: string) => `${domain}${path === "/" ? "/" : path.replace(/\/$/, "")}`;

export default function Seo({ title, description, path, serviceName, serviceDescription, noIndex = false }: SeoProps) {
  useEffect(() => {
    const isServicePage = ["/impression-bafoussam", "/serigraphie-bafoussam", "/teledeclarations-attestations-bafoussam"].includes(path);
    if (isServicePage) document.body.dataset.seoPage = path.includes("serigraphie") ? "serigraphie" : path.includes("teledeclarations") ? "formalities" : "impression";
    else delete document.body.dataset.seoPage;

    const canonical = canonicalUrl(path);
    const normalizedDescription = description.replace(/, face au cybercafé Au Débit\.?/gi, ", à la descente Akwa de Bafoussam.");
    const socialImage = serviceShareImages[path] ?? { src: logo, alt: "Logo ETS Pro-Informatique" };
    const robots = noIndex ? "noindex,nofollow" : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";
    document.title = title;
    document.documentElement.lang = "fr-CM";

    const updateMeta = (name: string, value: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.querySelector<HTMLMetaElement>(selector);
      if (!element) { element = document.createElement("meta"); property ? element.setAttribute("property", name) : element.setAttribute("name", name); document.head.appendChild(element); }
      element.content = value;
    };
    const updateLink = (rel: string, href: string) => {
      let element = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (!element) { element = document.createElement("link"); element.rel = rel; document.head.appendChild(element); }
      element.href = href;
    };

    updateMeta("description", normalizedDescription);
    updateMeta("robots", robots);
    updateMeta("googlebot", robots);
    updateMeta("og:type", "website", true);
    updateMeta("og:locale", "fr_CM", true);
    updateMeta("og:site_name", "ETS Pro-Informatique", true);
    updateMeta("og:title", title, true);
    updateMeta("og:description", normalizedDescription, true);
    updateMeta("og:url", canonical, true);
    updateMeta("og:image", socialImage.src, true);
    updateMeta("og:image:alt", socialImage.alt, true);
    updateMeta("twitter:card", "summary_large_image");
    updateMeta("twitter:title", title);
    updateMeta("twitter:description", normalizedDescription);
    updateMeta("twitter:image", socialImage.src);
    updateMeta("twitter:image:alt", socialImage.alt);
    updateLink("canonical", canonical);

    document.getElementById("route-jsonld")?.remove();
    const script = document.createElement("script");
    script.id = "route-jsonld";
    script.type = "application/ld+json";
    const pageSchema = {
      "@type": "WebPage",
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: title,
      description: normalizedDescription,
      image: socialImage.src,
      inLanguage: "fr-CM",
      isPartOf: { "@id": `${domain}/#website` },
      about: { "@id": `${domain}/#business` },
    };
    const serviceSchema = serviceName && serviceDescription ? {
      "@type": "Service",
      name: serviceName,
      description: serviceDescription,
      url: canonical,
      image: socialImage.src,
      areaServed: { "@type": "City", name: "Bafoussam", address: { "@type": "PostalAddress", addressCountry: "CM" } },
      provider: { "@id": `${domain}/#business` },
      availableChannel: { "@type": "ServiceChannel", servicePhone: { "@type": "ContactPoint", telephone: "+237699979857", contactType: "customer service", availableLanguage: "fr" } },
    } : undefined;
    script.text = JSON.stringify({ "@context": "https://schema.org", "@graph": [pageSchema, ...(serviceSchema ? [serviceSchema] : [])] });
    document.head.appendChild(script);
    return () => { script.remove(); delete document.body.dataset.seoPage; };
  }, [title, description, path, serviceName, serviceDescription, noIndex]);
  return null;
}
