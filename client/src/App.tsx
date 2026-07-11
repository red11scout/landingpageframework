/**
 * Illuminated Scholarly Atlas: institutional routing must feel editorial, precise, and continuous.
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Sources from "./pages/Sources";
import TempleAtlas from "./pages/TempleAtlas";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/temples" component={TempleAtlas} />
      <Route path="/sources" component={Sources} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable>
        <TooltipProvider>
          <div className="site-frame">
            <SiteHeader />
            <Router />
            <SiteFooter />
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
