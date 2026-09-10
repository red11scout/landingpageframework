import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ProgressProvider } from "./contexts/ProgressContext";

const Home = lazy(() => import("@/pages/Home"));
const LearnPage = lazy(() => import("@/pages/LearnPage"));
const DiscoverPage = lazy(() => import("@/pages/DiscoverPage"));
const JourneyPage = lazy(() => import("@/pages/JourneyPage"));
const PrintPackPage = lazy(() => import("@/pages/PrintPackPage"));
const LessonPage = lazy(() => import("@/pages/LessonPage"));
const ThemePage = lazy(() => import("@/pages/ThemePage"));
const TimelinePage = lazy(() => import("@/pages/TimelinePage"));
const MapPage = lazy(() => import("@/pages/MapPage"));
const FigurePage = lazy(() => import("@/pages/FigurePage"));
const FiguresGallery = lazy(() => import("@/pages/FiguresGallery"));
const GlossaryPage = lazy(() => import("@/pages/GlossaryPage"));
const QuizPage = lazy(() => import("@/pages/QuizPage"));
const ConnectionsPage = lazy(() => import("@/pages/ConnectionsPage"));
const ShareProgressPage = lazy(() => import("@/pages/ShareProgressPage"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function Router() {
  return <Suspense fallback={<div className="flex min-h-dvh items-center justify-center bg-[#071522] text-[#F5EBDD]"><div className="h-8 w-8 animate-spin rounded-full border-2 border-[#B83B3F] border-t-transparent" aria-label="Loading" /></div>}><Switch>
    <Route path="/" component={Home} />
    <Route path="/learn" component={LearnPage} />
    <Route path="/discover" component={DiscoverPage} />
    <Route path="/journey" component={JourneyPage} />
    <Route path="/print-pack" component={PrintPackPage} />
    <Route path="/lesson/:id" component={LessonPage} />
    <Route path="/theme/:id" component={ThemePage} />
    <Route path="/timeline" component={TimelinePage} />
    <Route path="/map" component={MapPage} />
    <Route path="/figure/:id" component={FigurePage} />
    <Route path="/figures" component={FiguresGallery} />
    <Route path="/glossary" component={GlossaryPage} />
    <Route path="/progress" component={JourneyPage} />
    <Route path="/quiz/:set" component={QuizPage} />
    <Route path="/connections" component={ConnectionsPage} />
    <Route path="/share" component={ShareProgressPage} />
    <Route component={NotFound} />
  </Switch></Suspense>;
}

export default function App() {
  return <ErrorBoundary><ProgressProvider><Router /></ProgressProvider></ErrorBoundary>;
}
