import { Link } from "wouter";
import { figures } from "@/lib/figures";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function FiguresGallery() {
  return (
    <div className="min-h-screen parchment-bg">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[oklch(0.15_0.03_250/0.95)] border-b border-[oklch(1_0_0/0.08)]">
        <div className="container flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2 text-sm font-[var(--font-sans)] text-[oklch(0.7_0.02_250)] hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Home
          </Link>
          <h1 className="text-sm font-[var(--font-display)] font-bold text-white">Figures of the Revolution</h1>
          <Link href="/" className="flex items-center gap-2">
            <img src="/manus-storage/icon_727aa090.png" alt="" className="w-6 h-6" />
          </Link>
        </div>
      </header>

      <section className="container pt-8 pb-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-3xl md:text-4xl font-[var(--font-display)] font-bold mb-3 text-white">The People Who Made It Happen</h1>
          <p className="text-[oklch(0.65_0.02_250)] font-[var(--font-body)] italic max-w-2xl">
            Generals and poets. Farmers and philosophers. Traitors and heroes. The Revolution was made by people — flawed, brilliant, ordinary people who did extraordinary things.
          </p>
        </motion.div>
      </section>

      <div className="container"><div className="ornamental-rule" /></div>

      <section className="container py-10 md:py-14">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {figures.map((figure, index) => (
            <motion.div key={figure.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.04 }}>
              <Link href={`/figure/${figure.id}`}>
                <div className="group text-center">
                  <div className="relative w-full aspect-[3/4] overflow-hidden border-2 border-[oklch(1_0_0/0.1)] shadow-lg group-hover:shadow-xl group-hover:border-[oklch(0.6_0.25_25/0.5)] transition-all duration-300 mb-3">
                    <img src={figure.portrait} alt={figure.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.1_0.03_250/0.5)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="font-[var(--font-display)] font-bold text-sm md:text-base text-white group-hover:text-[oklch(0.6_0.25_25)] transition-colors">{figure.name}</h3>
                  <p className="text-xs text-[oklch(0.55_0.02_250)] font-[var(--font-sans)] mt-0.5 line-clamp-1">{figure.role.split(',')[0]}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="border-t border-[oklch(1_0_0/0.08)] py-6 mt-8">
        <div className="container text-center">
          <p className="text-sm text-[oklch(0.55_0.02_250)] font-[var(--font-body)] italic">{figures.length} figures. Each one a world. Tap any portrait to read their story.</p>
        </div>
      </footer>
    </div>
  );
}

