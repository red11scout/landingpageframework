import { useParams, Link } from "wouter";
import { lessons, themes } from "@/lib/lessons";
import { figures, getFigureId } from "@/lib/figures";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BookOpen, MessageCircle, MapPin, ExternalLink, Lightbulb, Feather, CheckCircle2, Circle, Printer } from "lucide-react";
import { useState } from "react";
import { AudioNarration } from "@/components/AudioNarration";
import { NarrativeWithGlossary } from "@/components/GlossaryTooltip";
import { useProgress } from "@/contexts/ProgressContext";
import { primarySources } from "@/lib/primarySources";
import { PrimarySourceBlock } from "@/components/PrimarySourceBlock";
import { buildPrintHtml } from "@/lib/print";

export default function LessonPage() {
  const params = useParams<{ id: string }>();
  const lessonId = parseInt(params.id || "1");
  const lesson = lessons.find(l => l.id === lessonId);
  const [activeTab, setActiveTab] = useState<"read" | "explore" | "discuss">("read");
  const { isComplete, markComplete, markIncomplete } = useProgress();

  if (!lesson) {
    return (
      <div className="min-h-screen parchment-bg flex items-center justify-center">
        <p className="font-[var(--font-display)] text-xl text-white">Lesson not found.</p>
      </div>
    );
  }

  const theme = themes.find(t => t.id === lesson.themeId);
  const prevLesson = lessons.find(l => l.id === lessonId - 1);
  const nextLesson = lessons.find(l => l.id === lessonId + 1);
  const connectedLessons = lesson.connections.map(id => lessons.find(l => l.id === id)).filter(Boolean);
  const printLesson = () => {
    const popup = window.open("", "revolution-nights-print", "width=900,height=700");
    if (!popup) return;
    popup.document.open();
    popup.document.write(buildPrintHtml([lesson]));
    popup.document.close();
    popup.focus();
    window.setTimeout(() => popup.print(), 250);
  };

  return (
    <div className="min-h-screen parchment-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[oklch(0.15_0.03_250/0.95)] border-b border-[oklch(1_0_0/0.08)]">
        <div className="container flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2 text-sm font-[var(--font-sans)] text-[oklch(0.7_0.02_250)] hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <span className="text-sm font-[var(--font-sans)] font-medium text-white">Night {lesson.id} of 90</span>
          <Link href="/" className="flex items-center gap-2">
            <img src="/manus-storage/icon_727aa090.png" alt="" className="w-6 h-6" />
          </Link>
        </div>
      </header>

      {/* Lesson Header */}
      <section className="container pt-8 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="wax-seal">{lesson.id}</div>
            <div>
              <p className="text-xs font-[var(--font-sans)] text-[oklch(0.6_0.25_25)] uppercase tracking-wider">{theme?.title}</p>
              <p className="text-xs font-[var(--font-sans)] text-[oklch(0.6_0.02_250)]">{lesson.date} · {lesson.location}</p>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-[var(--font-display)] font-bold leading-tight mb-3 text-white">
            {lesson.title}
          </h1>
          <p className="text-lg md:text-xl font-[var(--font-body)] italic text-[oklch(0.7_0.02_250)]">
            {lesson.subtitle}
          </p>
          {/* Mark Complete Button */}
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={() => isComplete(lesson.id) ? markIncomplete(lesson.id) : markComplete(lesson.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-[var(--font-sans)] font-medium border transition-all duration-200 active:scale-[0.97] ${isComplete(lesson.id) ? 'bg-[oklch(0.6_0.25_25/0.15)] border-[oklch(0.6_0.25_25/0.4)] text-[oklch(0.7_0.25_25)]' : 'bg-[oklch(0.2_0.03_250)] border-[oklch(1_0_0/0.1)] text-[oklch(0.7_0.02_250)] hover:border-[oklch(0.6_0.25_25/0.4)] hover:text-white'}`}
            >
              {isComplete(lesson.id) ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
              {isComplete(lesson.id) ? "Completed" : "Mark as Complete"}
            </button>
            <button onClick={printLesson} className="inline-flex items-center gap-2 border border-[oklch(1_0_0/0.1)] bg-[oklch(0.2_0.03_250)] px-4 py-2 text-sm font-medium text-[oklch(0.7_0.02_250)] transition hover:border-[oklch(0.6_0.25_25/0.4)] hover:text-white active:scale-[0.97]">
              <Printer className="h-4 w-4" />
              Print
            </button>
          </div>
          <div className="ornamental-rule mt-6" />
        </motion.div>
      </section>

      {/* Tab Navigation */}
      <div className="container">
        <div className="flex border-b border-[oklch(1_0_0/0.1)]">
          <button
            onClick={() => setActiveTab("read")}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-[var(--font-sans)] font-medium border-b-2 transition-colors ${activeTab === "read" ? "border-[oklch(0.6_0.25_25)] text-white" : "border-transparent text-[oklch(0.6_0.02_250)] hover:text-white"}`}
          >
            <BookOpen className="w-4 h-4" />
            Read
          </button>
          <button
            onClick={() => setActiveTab("explore")}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-[var(--font-sans)] font-medium border-b-2 transition-colors ${activeTab === "explore" ? "border-[oklch(0.6_0.25_25)] text-white" : "border-transparent text-[oklch(0.6_0.02_250)] hover:text-white"}`}
          >
            <MapPin className="w-4 h-4" />
            Explore
          </button>
          <button
            onClick={() => setActiveTab("discuss")}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-[var(--font-sans)] font-medium border-b-2 transition-colors ${activeTab === "discuss" ? "border-[oklch(0.6_0.25_25)] text-white" : "border-transparent text-[oklch(0.6_0.02_250)] hover:text-white"}`}
          >
            <MessageCircle className="w-4 h-4" />
            Discuss
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container py-8">
        {activeTab === "read" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="marginalia-layout">
            <div>
              <AudioNarration lessonId={lesson.id} narrative={lesson.narrative} />
              <div className="prose prose-lg font-[var(--font-body)] leading-relaxed">
                {lesson.narrative.split('\n\n').map((paragraph, i) => (
                  <motion.p key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.03 }} className="mb-6 text-[oklch(0.85_0.02_250)] text-base md:text-lg">
                    <NarrativeWithGlossary text={paragraph} />
                  </motion.p>
                ))}
              </div>

              {primarySources[lesson.id] && primarySources[lesson.id].length > 0 && (
                <div className="mt-8 pt-6 border-t border-[oklch(0.6_0.25_25/0.2)]">
                  <h3 className="text-sm font-[var(--font-sans)] font-semibold uppercase tracking-wider text-[oklch(0.7_0.25_25)] mb-2">In Their Own Words</h3>
                  <p className="text-xs font-[var(--font-sans)] text-[oklch(0.6_0.02_250)] mb-4 italic">Real words from the people who lived it — read them aloud together.</p>
                  {primarySources[lesson.id].map((source, idx) => (
                    <PrimarySourceBlock key={idx} source={source} index={idx} />
                  ))}
                </div>
              )}

              {lesson.figures.length > 0 && (
                <div className="mt-6 pt-8 border-t border-[oklch(1_0_0/0.08)]">
                  <h3 className="text-sm font-[var(--font-sans)] font-semibold uppercase tracking-wider text-[oklch(0.6_0.02_250)] mb-4">Key Figures</h3>
                  <div className="flex flex-wrap gap-2">
                    {lesson.figures.map(figure => {
                      const figId = getFigureId(figure);
                      if (figId) {
                        return (
                          <Link key={figure} href={`/figure/${figId}`}>
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[oklch(0.2_0.03_250)] border border-[oklch(1_0_0/0.1)] text-sm font-[var(--font-sans)] hover:border-[oklch(0.6_0.25_25/0.5)] hover:shadow-md transition-all duration-200 cursor-pointer group">
                              <span className="w-5 h-5 rounded-full bg-[oklch(0.6_0.25_25/0.15)] flex items-center justify-center">
                                <span className="text-[0.6rem] font-bold text-[oklch(0.6_0.25_25)]">→</span>
                              </span>
                              <span className="text-[oklch(0.8_0.02_250)] group-hover:text-[oklch(0.6_0.25_25)] transition-colors">{figure}</span>
                            </span>
                          </Link>
                        );
                      }
                      return <span key={figure} className="px-3 py-1.5 bg-[oklch(0.2_0.03_250)] border border-[oklch(1_0_0/0.08)] text-sm font-[var(--font-sans)] text-[oklch(0.7_0.02_250)]">{figure}</span>;
                    })}
                  </div>
                </div>
              )}
            </div>

            <aside className="hidden lg:block space-y-6 pt-4">
              <div className="margin-note">
                <p className="font-semibold text-[oklch(0.6_0.25_25)] mb-1 flex items-center gap-1"><Feather className="w-3 h-3" /> Date & Place</p>
                <p>{lesson.date}</p>
                <p>{lesson.location}</p>
              </div>
              {lesson.figures.length > 0 && (
                <div className="margin-note">
                  <p className="font-semibold text-[oklch(0.6_0.25_25)] mb-1">Figures</p>
                  {lesson.figures.map(f => {
                    const figId = getFigureId(f);
                    return figId ? <Link key={f} href={`/figure/${figId}`} className="block hover:text-[oklch(0.6_0.25_25)] transition-colors underline decoration-dotted">{f}</Link> : <p key={f}>{f}</p>;
                  })}
                </div>
              )}
              {lesson.connections.length > 0 && (
                <div className="margin-note">
                  <p className="font-semibold text-[oklch(0.6_0.25_25)] mb-1">See Also</p>
                  {lesson.connections.map(id => {
                    const cl = lessons.find(l => l.id === id);
                    return cl ? <Link key={id} href={`/lesson/${id}`} className="block hover:text-[oklch(0.6_0.25_25)] transition-colors">Night {cl.id}: {cl.title}</Link> : null;
                  })}
                </div>
              )}
              <div className="margin-note">
                <p className="font-semibold text-[oklch(0.6_0.25_25)] mb-1">Sources</p>
                {lesson.sources.map((s, i) => (
                  <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="block hover:text-[oklch(0.6_0.25_25)] transition-colors underline decoration-dotted">{s.title}</a>
                ))}
              </div>
            </aside>
          </motion.div>
        )}

        {activeTab === "explore" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="max-w-3xl">
            <div className="mb-10">
              <h3 className="text-lg font-[var(--font-display)] font-bold mb-4 text-white">Key Facts</h3>
              <div className="space-y-3">
                {lesson.keyFacts.map((fact, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }} className="flex items-start gap-3 p-3 bg-[oklch(0.18_0.03_250)] border border-[oklch(1_0_0/0.08)]">
                    <Lightbulb className="w-4 h-4 text-[oklch(0.7_0.22_80)] shrink-0 mt-0.5" />
                    <p className="text-sm font-[var(--font-body)] text-[oklch(0.85_0.02_250)]">{fact}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            {lesson.mapCoords && lesson.mapCoords.length > 0 && (
              <div className="mb-10">
                <h3 className="text-lg font-[var(--font-display)] font-bold mb-4 text-white">Where It Happened</h3>
                <div className="bg-[oklch(0.18_0.03_250)] border border-[oklch(1_0_0/0.08)] rounded-sm p-4">
                  <div className="space-y-2">
                    {lesson.mapCoords.map((coord, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-[oklch(0.6_0.25_25)]" />
                        <span className="text-sm font-[var(--font-sans)] text-white">{coord.label}</span>
                        <span className="text-xs text-[oklch(0.5_0.02_250)] ml-auto">{coord.lat.toFixed(2)}°N, {Math.abs(coord.lng).toFixed(2)}°W</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/map" className="inline-flex items-center gap-1 mt-4 text-sm font-[var(--font-sans)] text-[oklch(0.6_0.25_25)] hover:underline">View on full map <ArrowRight className="w-3 h-3" /></Link>
                </div>
              </div>
            )}
            <div className="mb-10">
              <h3 className="text-lg font-[var(--font-display)] font-bold mb-4 text-white">Learn More</h3>
              <div className="space-y-2">
                {lesson.sources.map((source, i) => (
                  <a key={i} href={source.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-[oklch(0.18_0.03_250)] border border-[oklch(1_0_0/0.08)] rounded-sm hover:border-[oklch(0.6_0.25_25/0.4)] transition-colors">
                    <ExternalLink className="w-4 h-4 text-[oklch(0.65_0.15_260)] shrink-0" />
                    <span className="text-sm font-[var(--font-sans)] text-[oklch(0.85_0.02_250)]">{source.title}</span>
                  </a>
                ))}
              </div>
            </div>
            {connectedLessons.length > 0 && (
              <div>
                <h3 className="text-lg font-[var(--font-display)] font-bold mb-4 text-white">Connected Lessons</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {connectedLessons.map(cl => cl && (
                    <Link key={cl.id} href={`/lesson/${cl.id}`}>
                      <div className="p-3 bg-[oklch(0.18_0.03_250)] border border-[oklch(1_0_0/0.08)] rounded-sm hover:border-[oklch(0.6_0.25_25/0.4)] transition-colors">
                        <p className="text-xs text-[oklch(0.6_0.02_250)] font-[var(--font-sans)]">Night {cl.id}</p>
                        <p className="text-sm font-[var(--font-display)] font-bold text-white">{cl.title}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === "discuss" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="max-w-3xl">
            <div className="bg-[oklch(0.18_0.03_250)] border border-[oklch(1_0_0/0.08)] rounded-sm p-6 md:p-8 mb-8">
              <h3 className="text-lg font-[var(--font-display)] font-bold mb-2 text-white">Family Discussion</h3>
              <p className="text-sm text-[oklch(0.65_0.02_250)] font-[var(--font-body)] mb-6">
                These questions are designed for all ages — from your five-year-old to your thirteen-year-old. There are no wrong answers. The goal is conversation, not quizzing.
              </p>
              <div className="space-y-4">
                {lesson.discussionQuestions.map((question, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.08 }} className="flex items-start gap-4 p-4 bg-[oklch(0.2_0.03_250)] border border-[oklch(1_0_0/0.06)] rounded-sm">
                    <div className="wax-seal shrink-0 text-xs">{i + 1}</div>
                    <p className="font-[var(--font-body)] text-base leading-relaxed text-[oklch(0.85_0.02_250)]">{question}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="bg-[oklch(0.45_0.2_260/0.1)] border border-[oklch(0.45_0.2_260/0.25)] rounded-sm p-6">
              <h4 className="text-sm font-[var(--font-sans)] font-semibold text-[oklch(0.7_0.15_260)] mb-2">Tip for Parents</h4>
              <p className="text-sm font-[var(--font-body)] text-[oklch(0.7_0.02_250)]">
                Let the youngest answer first. Their answers will surprise you. Then let the older children build on what the little ones said. The best conversations happen when everyone feels safe to think aloud.
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="border-t border-[oklch(1_0_0/0.08)] mt-8">
        <div className="container py-6 flex items-center justify-between">
          {prevLesson ? (
            <Link href={`/lesson/${prevLesson.id}`} className="flex items-center gap-2 text-sm font-[var(--font-sans)] text-[oklch(0.6_0.02_250)] hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Night {prevLesson.id}: {prevLesson.title}</span>
              <span className="sm:hidden">Previous</span>
            </Link>
          ) : <div />}
          {nextLesson ? (
            <Link href={`/lesson/${nextLesson.id}`} className="flex items-center gap-2 text-sm font-[var(--font-sans)] text-[oklch(0.6_0.25_25)] hover:underline">
              <span className="hidden sm:inline">Night {nextLesson.id}: {nextLesson.title}</span>
              <span className="sm:hidden">Next</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link href="/" className="flex items-center gap-2 text-sm font-[var(--font-sans)] text-[oklch(0.6_0.25_25)] hover:underline">
              Back to Home
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
