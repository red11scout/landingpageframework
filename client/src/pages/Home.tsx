import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, BarChart3, BrainCircuit, ClipboardList, MessageSquare, Search, Sparkles, Zap, ExternalLink } from "lucide-react";
import { useState } from "react";

// App Data
const apps = [
  {
    id: 1,
    title: "AI Report",
    description: "Powerful Insights.",
    icon: MessageSquare,
    link: "#",
    category: "Analysis",
    status: "Stable"
  },
  {
    id: 2,
    title: "AI Workflows",
    description: "Remove the Friction.",
    icon: BarChart3,
    link: "#",
    category: "Automation",
    status: "Stable"
  },
  {
    id: 3,
    title: "Cognitive Analytics",
    description: "Agentic Design Patterns.",
    icon: BrainCircuit,
    link: "#",
    category: "Analysis",
    status: "Stable"
  },
  {
    id: 4,
    title: "AI Research",
    description: "Dive Deeper.",
    icon: Search,
    link: "#",
    category: "Research",
    status: "Stable"
  },
  {
    id: 5,
    title: "Workshop Reports",
    description: "AI Priority.",
    icon: ClipboardList,
    link: "#",
    category: "Analysis",
    status: "New"
  },
  {
    id: 6,
    title: "AI Power",
    description: "Deeper Context.",
    icon: Zap,
    link: "#",
    category: "Core",
    status: "Beta"
  },
];

const categories = ["All", "Analysis", "Automation", "Research", "Core"];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredApps = activeCategory === "All" 
    ? apps 
    : apps.filter(app => app.category === activeCategory);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Content Layer */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Navigation */}
        <header className="container mx-auto flex items-center justify-between py-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 border border-blue-100">
              <Sparkles className="h-4 w-4 text-blue-600" />
            </div>
            <span className="text-lg font-medium tracking-tight text-slate-900">
              AI Hub
            </span>
          </div>
          <nav className="hidden md:block">
            <ul className="flex gap-8 text-sm font-medium text-slate-600">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Platform</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Research</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Enterprise</a></li>
            </ul>
          </nav>
          <Button variant="ghost" className="rounded-full px-6 text-slate-600 hover:bg-blue-50 hover:text-blue-700">
            Sign In
          </Button>
        </header>

        {/* Hero Section */}
        <main className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <h1 className="mb-6 text-5xl font-semibold tracking-tight text-slate-900 md:text-7xl lg:text-8xl">
              Intelligence, <br />
              <span className="text-slate-900">
                Refined.
              </span>
            </h1>
            <p className="mx-auto mb-12 max-w-xl text-xl font-light leading-relaxed text-slate-500 md:text-2xl">
              The future isn't just faster. It's clearer. <br />
              A suite of tools designed to amplify your mind.
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-12 flex flex-wrap justify-center gap-2"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-slate-900 text-white shadow-md"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

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
                  <a href={app.link} className="block h-full">
                    <Card className="relative h-full overflow-hidden border border-slate-200 bg-white p-8 transition-all duration-300 hover:border-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                      {/* Status Badge */}
                      {app.status !== "Stable" && (
                        <div className={`absolute top-4 right-4 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          app.status === "New" 
                            ? "bg-blue-100 text-blue-700" 
                            : "bg-amber-100 text-amber-700"
                        }`}>
                          {app.status}
                        </div>
                      )}

                      {/* Shimmer Effect */}
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-all duration-1000 group-hover:animate-shimmer group-hover:opacity-100" />
                      
                      <div className="mb-6 flex items-center justify-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-50 text-slate-900 transition-colors duration-300 group-hover:bg-blue-50 group-hover:text-blue-600">
                          <app.icon className="h-10 w-10 stroke-[1.5]" />
                        </div>
                      </div>
                      <div className="text-center relative z-10">
                        <h3 className="mb-2 text-lg font-medium text-slate-900 group-hover:text-blue-700 transition-colors">
                          {app.title}
                        </h3>
                        <p className="text-sm text-slate-500 group-hover:text-slate-600 transition-colors">
                          {app.description}
                        </p>
                      </div>
                      
                      {/* Quick Action Button (Hover) */}
                      <div className="absolute inset-x-0 bottom-0 flex justify-center pb-6 opacity-0 transition-all duration-300 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-blue-600">
                          View Details <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </Card>
                  </a>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="container mx-auto py-8 text-center text-sm text-slate-400">
          <p>&copy; 2025 AI Hub. Designed for the future.</p>
        </footer>
      </div>
    </div>
  );
}
