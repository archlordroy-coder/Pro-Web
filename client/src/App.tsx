import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
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


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/services"} component={Services} />
      <Route path={"/galerie"} component={Gallery} />
      <Route path={"/cybercafe-au-debit"} component={Cybercafe} />
      <Route path={"/a-propos"} component={About} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/impression-bafoussam"} component={Impression} />
      <Route path={"/serigraphie-bafoussam"} component={Serigraphy} />
      <Route path={"/teledeclarations-attestations-bafoussam"} component={Formalities} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
