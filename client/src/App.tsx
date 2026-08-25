/**
 * ETS Pro-Informatique — L’Atelier Signalétique.
 * Le routeur applique une entrée de page courte, directionnelle et respectueuse du mouvement réduit.
 */
import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Cybercafe from "./pages/Cybercafe";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Impression from "./pages/Impression";
import Serigraphy from "./pages/Serigraphy";
import Formalities from "./pages/Formalities";
import Settings from "./pages/Settings";
import Seo from "./components/Seo";
import { SoundDesignProvider } from "./contexts/SoundDesignContext";

const genericRouteSeo: Record<string, { title: string; description: string; noIndex?: boolean }> = {
  "/": { title: "ETS Pro-Informatique à Bafoussam | Impression, Sérigraphie & Formalités", description: "ETS Pro-Informatique à Bafoussam : impression numérique, grand format, sérigraphie, graphisme, personnalisation, cyberservices, télé-déclarations et attestations." },
  "/services": { title: "Services d’impression, sérigraphie et cyberservices à Bafoussam | ETS Pro-Informatique", description: "Découvrez les services d’ETS Pro-Informatique à Bafoussam : impression, grand format, graphisme, sérigraphie, personnalisation, cyberservices et formalités." },
  "/galerie": { title: "Galerie de réalisations impression & sérigraphie à Bafoussam | ETS Pro-Informatique", description: "Parcourez des exemples de banderoles, textiles personnalisés, cartes, tirages photo et supports imprimés réalisés par ETS Pro-Informatique à Bafoussam." },
  "/cybercafe-au-debit": { title: "Cybercafé Au Débit by Pro à Bafoussam | ETS Pro-Informatique", description: "Le Cybercafé Au Débit by Pro, service intégré d’ETS Pro-Informatique à Bafoussam, vous accompagne pour les impressions, numérisations et démarches en ligne." },
  "/a-propos": { title: "À propos d’ETS Pro-Informatique à Bafoussam", description: "Découvrez ETS Pro-Informatique à la descente Akwa de Bafoussam : impression, communication visuelle, personnalisation, cyberservices et formalités utiles." },
  "/contact": { title: "Contact & devis impression à Bafoussam | ETS Pro-Informatique", description: "Contactez ETS Pro-Informatique à Bafoussam pour une demande de devis en impression, sérigraphie, personnalisation, cyberservices ou formalités administratives." },
  "/parametres": { title: "Paramètres audio | ETS Pro-Informatique", description: "Gérez vos préférences audio et haptiques sur le site ETS Pro-Informatique.", noIndex: true },
};

const serviceRoutes = new Set(["/impression-bafoussam", "/serigraphie-bafoussam", "/teledeclarations-attestations-bafoussam"]);

function RouteSeo() {
  const [location] = useLocation();
  const page = genericRouteSeo[location];
  if (page) return <Seo {...page} path={location} />;
  if (serviceRoutes.has(location)) return null;
  return <Seo title="Page introuvable | ETS Pro-Informatique" description="La page demandée n’est pas disponible." path={location} noIndex />;
}

function Router() {
  return <Switch>
    <Route path="/" component={Home} />
    <Route path="/services" component={Services} />
    <Route path="/galerie" component={Gallery} />
    <Route path="/cybercafe-au-debit" component={Cybercafe} />
    <Route path="/a-propos" component={About} />
    <Route path="/contact" component={Contact} />
    <Route path="/impression-bafoussam" component={Impression} />
    <Route path="/serigraphie-bafoussam" component={Serigraphy} />
    <Route path="/teledeclarations-attestations-bafoussam" component={Formalities} />
    <Route path="/parametres" component={Settings} />
    <Route path="/404" component={NotFound} />
    <Route component={NotFound} />
  </Switch>;
}

function PageTransition() {
  const [location] = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [location]);
  return <><RouteSeo /><div key={location} className="site-page-enter"><Router /></div></>;
}

function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><SoundDesignProvider><TooltipProvider><Toaster /><PageTransition /></TooltipProvider></SoundDesignProvider></ThemeProvider></ErrorBoundary>;
}

export default App;
