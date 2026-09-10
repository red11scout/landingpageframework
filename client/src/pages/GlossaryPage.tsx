import { useState } from "react";
import { Link } from "wouter";
import { glossary, searchGlossary } from "@/lib/glossary";
import { motion } from "framer-motion";
import { ArrowLeft, Search, BookOpen } from "lucide-react";

export default function GlossaryPage() {
  const [query, setQuery] = useState("");
  const results = searchGlossary(query);

  return (
    <div className="min-h-screen parchment-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[oklch(0.15_0.03_250/0.95)] border-b border-[oklch(1_0_0/0.08)]">
        <div className="container flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2 text-sm font-[var(--font-sans)] text-[oklch(0.7_0.02_250)] hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Home
          </Link>
          <h1 className="text-sm font-[var(--font-display)] font-bold">Vocabulary</h1>
          <Link href="/" className="flex items-center gap-2">
            <img src="https://files.manuscdn.com/user_upload_by_module/session_file/90544947/RzamISePlbcgDwAH.png" alt="" className="w-6 h-6" />
          </Link>
        </div>
      </header>

      <section className="container pt-8 pb-4">
        <h1 className="text-3xl md:text-4xl font-[var(--font-display)] font-bold mb-2">
          Words of the Revolution
        </h1>
        <p className="text-[oklch(0.6_0.02_250)] font-[var(--font-body)] italic mb-6">
          Every war has its own language. Learn these words and the stories come alive.
        </p>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[oklch(0.6_0.02_250)]" />
          <input
            type="text"
            placeholder="Search for a word..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[oklch(0.18_0.03_250)] border border-[oklch(1_0_0/0.08)] rounded-sm font-[var(--font-sans)] text-sm focus:outline-none focus:border-[oklch(0.55_0.2_25/0.5)] transition-colors"
          />
        </div>
      </section>

      {/* Terms */}
      <section className="container py-6">
        <p className="text-xs text-[oklch(0.6_0.02_250)] font-[var(--font-sans)] mb-4">
          {results.length} term{results.length !== 1 ? 's' : ''} {query && `matching "${query}"`}
        </p>
        <div className="space-y-3">
          {results.map((term, index) => (
            <motion.div
              key={term.term}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(index * 0.02, 0.5) }}
              className="bg-[oklch(0.18_0.03_250)] border border-[oklch(1_0_0/0.08)] border-l-[3px] border-l-[oklch(0.6_0.25_25)] p-4"
            >
              <div className="flex items-start gap-3">
                <BookOpen className="w-4 h-4 text-[oklch(0.6_0.25_25)] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-[var(--font-display)] font-bold text-base capitalize">{term.term}</h3>
                  <p className="text-sm font-[var(--font-body)] mt-1 leading-relaxed">{term.definition}</p>
                  {term.example && (
                    <p className="text-xs font-[var(--font-body)] italic text-[oklch(0.6_0.02_250)] mt-2">"{term.example}"</p>
                  )}
                  {term.relatedTerms && term.relatedTerms.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {term.relatedTerms.map(rt => (
                        <span key={rt} className="text-xs px-2 py-0.5 bg-[oklch(0.92_0.02_80)] border border-[oklch(1_0_0/0.08)] rounded-sm font-[var(--font-sans)]">{rt}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
