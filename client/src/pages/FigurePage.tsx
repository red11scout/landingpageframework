import { useParams, Link } from "wouter";
import { figures } from "@/lib/figures";
import { lessons } from "@/lib/lessons";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, ExternalLink, Quote } from "lucide-react";
import { useProgress } from "@/contexts/ProgressContext";
import { useEffect } from "react";

export default function FigurePage() {
  const params = useParams<{ id: string }>();
  const figureId = params.id || "";
  const figure = figures.find(f => f.id === figureId);
  const { markFigureVisited } = useProgress();

  useEffect(() => {
    if (figure) { markFigureVisited(figure.id); }
  }, [figure?.id]);

  if (!figure) {
    return (
      <div className="min-h-screen parchment-bg flex items-center justify-center">
        <div className="text-center">
          <p className="font-[var(--font-display)] text-xl mb-4 text-white">Figure not found.</p>
          <Link href="/" className="text-sm font-[var(--font-sans)] text-[oklch(0.6_0.25_25)] hover:underline">Return Home</Link>
        </div>
      </div>
    );
  }

  const relatedLessons = figure.lessonsAppearing.map(id => lessons.find(l => l.id === id)).filter(Boolean).slice(0, 8);

  return (
    <div className="min-h-screen parchment-bg">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[oklch(0.15_0.03_250/0.95)] border-b border-[oklch(1_0_0/0.08)]">
        <div className="container flex items-center justify-between h-14">
          <Link href="/figures" className="flex items-center gap-2 text-sm font-[var(--font-sans)] text-[oklch(0.7_0.02_250)] hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Figures
          </Link>
          <span className="text-sm font-[var(--font-display)] font-bold text-white">Key Figures</span>
          <Link href="/" className="flex items-center gap-2"><img src="/manus-storage/icon_727aa090.png" alt="" className="w-6 h-6" /></Link>
        </div>
      </header>

      <section className="container pt-8 pb-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }} className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
          <div className="shrink-0">
            <div className="w-40 h-52 md:w-52 md:h-68 overflow-hidden border-4 border-[oklch(1_0_0/0.12)] shadow-lg shadow-[oklch(0_0_0/0.3)] relative">
              <img src={figure.portrait} alt={`Portrait of ${figure.name}`} className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-[var(--font-display)] font-bold leading-tight mb-2 text-white">{figure.name}</h1>
            <p className="text-base md:text-lg font-[var(--font-body)] italic text-[oklch(0.65_0.02_250)] mb-3">{figure.role}</p>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm font-[var(--font-sans)] text-[oklch(0.6_0.02_250)] mb-4">
              <span>Born: {figure.born}</span>
              <span>Died: {figure.died}</span>
            </div>
            {figure.quote && (
              <div className="bg-[oklch(0.2_0.03_250)] border border-[oklch(1_0_0/0.1)] p-4 mt-4 max-w-lg">
                <div className="flex items-start gap-3">
                  <Quote className="w-4 h-4 text-[oklch(0.6_0.25_25)] shrink-0 mt-1" />
                  <p className="font-[var(--font-body)] italic text-sm leading-relaxed text-[oklch(0.8_0.02_250)]">{figure.quote}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </section>

      <div className="container"><div className="ornamental-rule" /></div>

      <section className="container py-8 md:py-12">
        <div className="marginalia-layout">
          <div>
            <h2 className="text-xl font-[var(--font-display)] font-bold mb-6 text-white">The Story</h2>
            <div className="prose prose-lg font-[var(--font-body)] leading-relaxed">
              {figure.narrative.split('\n\n').map((paragraph, i) => (
                <motion.p key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.03 }} className="mb-5 text-[oklch(0.85_0.02_250)] text-base md:text-lg">{paragraph}</motion.p>
              ))}
            </div>
          </div>
          <aside className="hidden lg:block space-y-6 pt-12">
            <div className="margin-note">
              <p className="font-semibold text-[oklch(0.6_0.25_25)] mb-2">Key Facts</p>
              {figure.keyFacts.slice(0, 4).map((fact, i) => <p key={i} className="mb-1.5">{fact}</p>)}
            </div>
            <div className="margin-note">
              <p className="font-semibold text-[oklch(0.6_0.25_25)] mb-2">Appears In</p>
              {relatedLessons.slice(0, 5).map(l => l && (
                <Link key={l.id} href={`/lesson/${l.id}`} className="block hover:text-[oklch(0.6_0.25_25)] transition-colors mb-1">Night {l.id}: {l.title}</Link>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="container py-8 md:py-12">
        <h2 className="text-xl font-[var(--font-display)] font-bold mb-6 text-white">Life Timeline</h2>
        <div className="relative">
          <div className="absolute left-5 md:left-6 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[oklch(0.6_0.25_25)] via-white to-[oklch(0.45_0.2_260)]" />
          <div className="space-y-4 md:space-y-6">
            {figure.timeline.map((event, index) => {
              const colorCycle = index % 3;
              const dotColor = colorCycle === 0 ? "oklch(0.6 0.25 25)" : colorCycle === 1 ? "white" : "oklch(0.45 0.2 260)";
              const yearColor = colorCycle === 0 ? "text-[oklch(0.7_0.25_25)]" : colorCycle === 1 ? "text-white" : "text-[oklch(0.7_0.15_260)]";
              return (
                <motion.div key={`${event.year}-${index}`} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: index * 0.04 }} className="relative pl-12 md:pl-16">
                  <div className="absolute left-3.5 md:left-4.5 top-2 w-3 h-3 rounded-full border-2 border-[oklch(0.15_0.03_250)]" style={{ background: dotColor, boxShadow: `0 0 6px ${dotColor}` }} />
                  <div className="bg-[oklch(0.18_0.03_250)] border border-[oklch(1_0_0/0.08)] border-l-[3px] border-l-[oklch(0.6_0.25_25)] p-4">
                    <div className="flex items-baseline gap-3 mb-1">
                      <span className={`text-lg md:text-xl font-[var(--font-display)] font-bold ${yearColor}`}>{event.year}</span>
                      <span className="font-[var(--font-display)] font-bold text-sm md:text-base text-white">{event.title}</span>
                    </div>
                    <p className="text-sm font-[var(--font-body)] text-[oklch(0.65_0.02_250)]">{event.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container py-8 lg:hidden">
        <h2 className="text-xl font-[var(--font-display)] font-bold mb-4 text-white">Key Facts</h2>
        <div className="space-y-2">
          {figure.keyFacts.map((fact, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-[oklch(0.18_0.03_250)] border border-[oklch(1_0_0/0.08)]">
              <div className="w-5 h-5 rounded-full bg-[oklch(0.6_0.25_25/0.15)] flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-[var(--font-sans)] font-bold text-[oklch(0.6_0.25_25)]">{i + 1}</span>
              </div>
              <p className="text-sm font-[var(--font-body)] text-[oklch(0.85_0.02_250)]">{fact}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container py-8 md:py-12">
        <h2 className="text-xl font-[var(--font-display)] font-bold mb-4 text-white">Lessons Featuring {figure.name.split(' ').pop()}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {relatedLessons.map(lesson => lesson && (
            <Link key={lesson.id} href={`/lesson/${lesson.id}`}>
              <div className="group bg-[oklch(0.18_0.03_250)] border border-[oklch(1_0_0/0.08)] border-l-[3px] border-l-[oklch(0.6_0.25_25)] p-4 hover:border-[oklch(0.6_0.25_25/0.4)] transition-all duration-200">
                <div className="flex items-center gap-3 mb-1">
                  <div className="wax-seal text-xs shrink-0" style={{ width: '1.75rem', height: '1.75rem', fontSize: '0.65rem' }}>{lesson.id}</div>
                  <div className="min-w-0">
                    <p className="font-[var(--font-display)] font-bold text-sm truncate text-white">{lesson.title}</p>
                    <p className="text-xs text-[oklch(0.55_0.02_250)] font-[var(--font-sans)]">{lesson.date}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container py-8 md:py-12">
        <h2 className="text-xl font-[var(--font-display)] font-bold mb-4 text-white">Learn More</h2>
        <div className="space-y-2 max-w-xl">
          {figure.sources.map((source, i) => (
            <a key={i} href={source.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-[oklch(0.18_0.03_250)] border border-[oklch(1_0_0/0.08)] hover:border-[oklch(0.6_0.25_25/0.4)] transition-colors">
              <ExternalLink className="w-4 h-4 text-[oklch(0.65_0.15_260)] shrink-0" />
              <span className="text-sm font-[var(--font-sans)] text-[oklch(0.85_0.02_250)]">{source.title}</span>
            </a>
          ))}
        </div>
      </section>

      <div className="border-t border-[oklch(1_0_0/0.08)] mt-8">
        <div className="container py-6 flex items-center justify-between">
          <Link href="/figures" className="flex items-center gap-2 text-sm font-[var(--font-sans)] text-[oklch(0.6_0.02_250)] hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            All Figures
          </Link>
          <Link href="/timeline" className="text-sm font-[var(--font-sans)] text-[oklch(0.6_0.25_25)] hover:underline">View Timeline →</Link>
        </div>
      </div>
    </div>
  );
}
