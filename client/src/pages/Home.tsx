import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, BrainCircuit, ClipboardList, MessageSquare, Search, Sparkles, Zap } from "lucide-react";

// App Data
const apps = [
  {
    id: 1,
    title: "AI Report",
    description: "Powerful Insights.",
    icon: MessageSquare,
    link: "#",
  },
  {
    id: 2,
    title: "AI Workflows",
    description: "Remove the Friction.",
    icon: BarChart3,
    link: "#",
  },
  {
    id: 3,
    title: "Cognitive Analytics",
    description: "Agentic Design Patterns.",
    icon: BrainCircuit,
    link: "#",
  },
  {
    id: 4,
    title: "AI Research",
    description: "Dive Deeper.",
    icon: Search,
    link: "#",
  },
  {
    id: 5,
    title: "Workshop Reports",
    description: "AI Priority.",
    icon: ClipboardList,
    link: "#",
  },
  {
    id: 6,
    title: "AI Power",
    description: "Deeper Context.",
    icon: Zap,
    link: "#",
  },
];

export default function Home() {
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

          {/* App Grid */}
          <div className="grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {apps.map((app, index) => (
              <motion.a
                key={app.id}
                href={app.link}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + index * 0.1,
                  ease: "easeOut",
                }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group block"
              >
                <Card className="relative h-full overflow-hidden border border-slate-200 bg-white p-8 transition-all duration-300 hover:border-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]">
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
                  <div className="absolute bottom-4 right-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <ArrowRight className="h-4 w-4 text-blue-500" />
                  </div>
                </Card>
              </motion.a>
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className="container mx-auto py-8 text-center text-sm text-slate-400">
          <p>&copy; 2025 AI Hub. Designed for the future.</p>
        </footer>
      </div>
    </div>
  );
}
