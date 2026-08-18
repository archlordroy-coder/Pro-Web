import fs from "node:fs";
import path from "node:path";

const root = "/home/ubuntu/Pro-Web-target";
const replacements = new Map([
  ["/manus-storage/ets-pro-atelier-production-tactile_43de1956.jpg", "/images/atelier-production.jpg"],
  ["/manus-storage/ets-pro-cybercafe-service-desk_d6da4692.jpg", "/images/cybercafe-service-desk.jpg"],
  ["/manus-storage/ets-pro-design-works_ccfd28a9.jpg", "/images/design-works.jpg"],
  ["/manus-storage/ets-pro-fabrication-materials_52802c74.jpg", "/images/fabrication-materials.jpg"],
  ["/manus-storage/ets-pro-formalities-desk_7c260fd9.jpg", "/images/formalities-desk.jpg"],
  ["/manus-storage/ets-pro-gallery-grand-format_b31bb5a2.jpg", "/images/gallery-grand-format.jpg"],
  ["/manus-storage/ets-pro-gallery-photo_6e7cc566.jpg", "/images/gallery-photo.jpg"],
  ["/manus-storage/ets-pro-gallery-serigraphie_e0d8472e.jpg", "/images/gallery-serigraphie.jpg"],
  ["/manus-storage/ets-pro-gallery-stationery_7ef8d754.jpg", "/images/gallery-stationery.jpg"],
  ["/manus-storage/ets-pro-hero-print-studio_2fa49fdb.jpg", "/images/hero-print-studio.jpg"],
  ["/manus-storage/ets-pro-logo-officiel_e0c386f6.jpeg", "/images/logo-officiel.jpeg"],
  ["/manus-storage/ets-pro-logo-symbol_a3502ff4.png", "/images/logo-symbol.png"],
  ["/manus-storage/ets-pro-personalisation_b445858a.jpg", "/images/personalisation.jpg"],
  ["/manus-storage/ets-pro-services-affiche_8be52dd8.jpeg", "/images/services-affiche.jpeg"],
  ["https://etsproinfo-ejadwgbc.manus.space", "https://ets-pro-informatique.vercel.app"],
]);

const targets = [
  "client/index.html",
  "client/public/robots.txt",
  "client/public/sitemap.xml",
  "client/src",
];

function walk(entry) {
  const absolute = path.join(root, entry);
  const stat = fs.statSync(absolute);
  if (stat.isFile()) return [absolute];
  return fs.readdirSync(absolute, { withFileTypes: true }).flatMap((item) => {
    const relative = path.join(entry, item.name);
    return item.isDirectory() ? walk(relative) : [path.join(root, relative)];
  });
}

for (const target of targets.flatMap(walk)) {
  if (!/\.(tsx|ts|css|html|xml|txt)$/.test(target)) continue;
  let content = fs.readFileSync(target, "utf8");
  const before = content;
  for (const [from, to] of replacements) content = content.replaceAll(from, to);
  content = content.replace(/\s*<script defer src="%VITE_ANALYTICS_ENDPOINT%\/umami" data-website-id="%VITE_ANALYTICS_WEBSITE_ID%"><\/script>/g, "");
  if (content !== before) fs.writeFileSync(target, content);
}

console.log("Asset URLs migrated and Umami script removed.");
