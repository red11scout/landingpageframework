import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

// App Data
const apps = [
  {
    id: 1,
    title: "AI Chat",
    description: "Intelligent conversation.",
    icon: "/images/icon-chat.png",
    link: "#",
  },
  {
    id: 2,
    title: "Analytics",
    description: "Deep data insights.",
    icon: "/images/icon-analytics.png",
    link: "#",
  },
  {
    id: 3,
    title: "Creative Studio",
    description: "Generative art tools.",
    icon: "/images/icon-creative.png",
    link: "#",
  },
  {
    id: 4,
    title: "Code Assistant",
    description: "Next-gen development.",
    icon: "/images/icon-code.png",
    link: "#",
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background font-sans selection:bg-primary/10 selection:text-primary">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.png"
          alt="Background"
          className="h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/40 backdrop-blur-[2px]" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Navigation */}
        <header className="container mx-auto flex items-center justify-between py-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/40 shadow-sm">
              <Sparkles className="h-4 w-4 text-primary/80" />
            </div>
            <span className="text-lg font-medium tracking-tight text-primary/90">
              AI Hub
            </span>
          </div>
          <nav className="hidden md:block">
            <ul className="flex gap-8 text-sm font-medium text-primary/70">
              <li><a href="#" className="hover:text-primary transition-colors">Platform</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Research</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Enterprise</a></li>
            </ul>
          </nav>
          <Button variant="ghost" className="rounded-full px-6 hover:bg-white/20">
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
            <h1 className="mb-6 text-5xl font-semibold tracking-tight text-primary md:text-7xl lg:text-8xl">
              Intelligence, <br />
              <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                Refined.
              </span>
            </h1>
            <p className="mx-auto mb-12 max-w-xl text-xl font-light leading-relaxed text-primary/80 md:text-2xl">
              The future isn't just faster. It's clearer. <br />
              A suite of tools designed to amplify your mind.
            </p>
          </motion.div>

          {/* App Grid */}
          <div className="grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                <Card className="relative h-full overflow-hidden border-white/40 bg-white/30 p-8 backdrop-blur-xl transition-all duration-300 hover:bg-white/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-white/60">
                  <div className="mb-6 flex items-center justify-center">
                    <div className="relative h-24 w-24 overflow-hidden rounded-[22px] shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:shadow-md">
                      <img
                        src={app.icon}
                        alt={app.title}
                        className="h-full w-full object-cover"
                      />
                      {/* Gloss shine effect overlay */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/30 pointer-events-none" />
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="mb-2 text-lg font-medium text-primary">
                      {app.title}
                    </h3>
                    <p className="text-sm text-primary/60">
                      {app.description}
                    </p>
                  </div>
                  <div className="absolute bottom-4 right-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <ArrowRight className="h-4 w-4 text-primary/50" />
                  </div>
                </Card>
              </motion.a>
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className="container mx-auto py-8 text-center text-sm text-primary/40">
          <p>&copy; 2025 AI Hub. Designed for the future.</p>
        </footer>
      </div>
    </div>
  );
}
