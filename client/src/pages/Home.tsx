import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, BarChart3, BrainCircuit, ClipboardList, MessageSquare, Search, Sparkles, Zap, Heart, Play, X, Moon, Sun } from "lucide-react";

import { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";

// App Data
const apps = [
  {
    id: 1,
    title: "AI Report",
    description: "Powerful Insights.",
    longDescription: "Generate comprehensive reports with deep AI analysis. Uncover hidden patterns and actionable insights from your data in seconds.",
    icon: MessageSquare,
    link: "https://reports.aiplatformsforscale.com",
    category: "Analysis",
    status: "Stable"
  },
  {
    id: 2,
    title: "AI Workflows",
    description: "Remove the Friction.",
    longDescription: "Streamline your business processes with intelligent automation. Connect your favorite tools and let AI handle the repetitive tasks.",
    icon: BarChart3,
    link: "https://workflows.aiplatformsforscale.com",
    category: "Automation",
    status: "Stable"
  },
  {
    id: 3,
    title: "Cognitive Analytics",
    description: "Agentic Design Patterns.",
    longDescription: "Leverage advanced cognitive models to understand user behavior. Predict trends and optimize your strategies with agentic intelligence.",
    icon: BrainCircuit,
    link: "https://cognitive.aiplatformsforscale.com",
    category: "Analysis",
    status: "Stable"
  },
  {
    id: 4,
    title: "AI Research",
    description: "Dive Deeper.",
    longDescription: "Access a vast knowledge base with AI-powered search. Get summarized answers, source citations, and deep-dive research papers.",
    icon: Search,
    link: "https://research.aiplatformsforscale.com",
    category: "Research",
    status: "Stable"
  },
  {
    id: 5,
    title: "Workshop Reports",
    description: "AI Priority.",
    longDescription: "Collaborate effectively with AI-generated workshop summaries. Capture key takeaways, action items, and consensus points automatically.",
    icon: ClipboardList,
    link: "https://workshops.aiplatformsforscale.com",
    category: "Analysis",
    status: "New"
  },
  {
    id: 6,
    title: "AI Power",
    description: "Deeper Context.",
    longDescription: "Unlock the full potential of your data with context-aware AI. Integrate deep learning into your core business logic.",
    icon: Zap,
    link: "https://power.aiplatformsforscale.com",
    category: "Core",
    status: "Beta"
  },
];

const categories = ["All", "Analysis", "Automation", "Research", "Core"];

export default function Home() {

  const { theme, setTheme } = useTheme();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedApp, setSelectedApp] = useState<typeof apps[0] | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const filteredApps = apps.filter(app => {
    const matchesCategory = activeCategory === "All" || app.category === activeCategory;
    const matchesSearch = app.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          app.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white dark:bg-slate-950 font-sans selection:bg-blue-100 selection:text-blue-900 dark:selection:bg-blue-900 dark:selection:text-blue-100 transition-colors duration-300">
      {/* Content Layer */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Navigation */}
        <header className="container mx-auto flex items-center justify-between py-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 border border-blue-100 dark:bg-blue-900/30 dark:border-blue-800">
              <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-lg font-medium tracking-tight text-slate-900 dark:text-white">
              AI Hub
            </span>
          </div>
          <nav className="hidden md:block">
            <ul className="flex gap-8 text-sm font-medium text-slate-600 dark:text-slate-400">
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Platform</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Research</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Enterprise</a></li>
            </ul>
          </nav>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

          </div>
        </header>

        {/* Hero Section */}
        <main className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <h1 className="mb-6 text-5xl font-semibold tracking-tight text-slate-900 dark:text-white md:text-7xl lg:text-8xl">
              Intelligence, <br />
              <span className="text-slate-900 dark:text-white">
                Refined.
              </span>
            </h1>
            <p className="mx-auto mb-12 max-w-xl text-xl font-light leading-relaxed text-slate-500 dark:text-slate-400 md:text-2xl">
              The future isn't just faster. It's clearer. <br />
              A suite of tools designed to amplify your mind.
            </p>
          </motion.div>

          {/* Search & Filter Section */}
          <div className="mb-12 flex flex-col items-center gap-6 w-full max-w-2xl">
            {/* Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="relative w-full"
            >
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <Input 
                type="text" 
                placeholder="Search tools..." 
                className="h-12 w-full rounded-full border-slate-200 bg-white pl-12 pr-4 text-base shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:bg-slate-900 dark:border-slate-800 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-900/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </motion.div>

            {/* Filter Tabs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-wrap justify-center gap-2"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-slate-900 text-white shadow-md dark:bg-white dark:text-slate-900"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800"
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>
          </div>

          {/* App Grid */}
          <motion.div 
            layout
            className="grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredApps.map((app) => (
                <motion.div
                  key={app.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative block"
                >
                  <div 
                    onClick={() => {
                      if (app.link && app.link !== "#") {
                        window.open(app.link, "_blank", "noopener,noreferrer");
                      } else {
                        setSelectedApp(app);
                      }
                    }}
                    className="block h-full cursor-pointer"
                  >
                    <Card className="relative h-full overflow-hidden border border-slate-200 bg-white p-8 transition-all duration-300 hover:border-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] dark:bg-slate-900 dark:border-slate-800 dark:hover:border-blue-500 dark:hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                      {/* Status Badge */}
                      {app.status !== "Stable" && (
                        <div className={`absolute top-4 right-4 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          app.status === "New" 
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300" 
                            : "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300"
                        }`}>
                          {app.status}
                        </div>
                      )}

                      {/* Favorite Button */}
                      <button 
                        onClick={(e) => toggleFavorite(e, app.id)}
                        className="absolute top-4 left-4 z-20 rounded-full p-2 text-slate-300 transition-colors hover:bg-slate-50 hover:text-red-500 dark:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-red-500"
                      >
                        <Heart className={`h-5 w-5 ${favorites.includes(app.id) ? "fill-red-500 text-red-500" : ""}`} />
                      </button>

                      {/* Shimmer Effect */}
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-all duration-1000 group-hover:animate-shimmer group-hover:opacity-100 dark:via-white/5" />
                      
                      <div className="mb-6 flex items-center justify-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-50 text-slate-900 transition-colors duration-300 group-hover:bg-blue-50 group-hover:text-blue-600 dark:bg-slate-800 dark:text-white dark:group-hover:bg-blue-900/30 dark:group-hover:text-blue-400">
                          <app.icon className="h-10 w-10 stroke-[1.5]" />
                        </div>
                      </div>
                      <div className="text-center relative z-10">
                        <h3 className="mb-2 text-lg font-medium text-slate-900 group-hover:text-blue-700 transition-colors dark:text-white dark:group-hover:text-blue-400">
                          {app.title}
                        </h3>
                        <p className="text-sm text-slate-500 group-hover:text-slate-600 transition-colors dark:text-slate-400 dark:group-hover:text-slate-300">
                          {app.description}
                        </p>
                      </div>
                      
                      {/* Quick Action Button (Hover) */}
                      <div className="absolute inset-x-0 bottom-0 flex justify-center pb-6 opacity-0 transition-all duration-300 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
                          View Details <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="container mx-auto py-8 text-center text-sm text-slate-400 dark:text-slate-600">
          <p>&copy; 2026 AI Hub. Designed for the future.</p>
        </footer>
      </div>

      {/* Detail Modal */}
      <Dialog open={!!selectedApp} onOpenChange={(open) => !open && setSelectedApp(null)}>
        <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden border-0 shadow-2xl dark:bg-slate-900">
          {selectedApp && (
            <div className="flex flex-col">
              {/* Modal Header / Video Placeholder */}
              <div className="relative h-48 w-full bg-slate-900 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="rounded-full bg-white/10 p-4 backdrop-blur-sm transition-transform hover:scale-110 cursor-pointer">
                    <Play className="h-8 w-8 text-white fill-white" />
                  </div>
                  <span className="text-xs font-medium text-white/80 tracking-wide uppercase">Watch Demo</span>
                </div>
              </div>
              
              {/* Modal Content */}
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-slate-800 dark:text-blue-400">
                      <selectedApp.icon className="h-7 w-7" />
                    </div>
                    <div>
                      <DialogTitle className="text-2xl font-semibold text-slate-900 dark:text-white">
                        {selectedApp.title}
                      </DialogTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-slate-500 dark:text-slate-400">{selectedApp.category}</span>
                        {selectedApp.status !== "Stable" && (
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                            selectedApp.status === "New" 
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300" 
                              : "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300"
                          }`}>
                            {selectedApp.status}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedApp(null)}
                    className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors dark:hover:bg-slate-800 dark:hover:text-slate-300"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                <DialogDescription className="text-base leading-relaxed text-slate-600 mb-8 dark:text-slate-300">
                  {selectedApp.longDescription}
                </DialogDescription>
                
                <div className="flex gap-3">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-lg text-base font-medium">
                    Launch Tool
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 border-slate-200 hover:bg-slate-50 text-slate-700 h-12 rounded-lg text-base font-medium dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                    onClick={(e) => {
                      toggleFavorite(e as any, selectedApp.id);
                    }}
                  >
                    <Heart className={`mr-2 h-4 w-4 ${favorites.includes(selectedApp.id) ? "fill-red-500 text-red-500" : ""}`} />
                    {favorites.includes(selectedApp.id) ? "Saved" : "Save to Favorites"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
