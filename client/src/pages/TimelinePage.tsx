import { Link } from "wouter";
import { timelineEvents, lessons } from "@/lib/lessons";
import { motion } from "framer-motion";
import { ArrowLeft, Star } from "lucide-react";
import { useProgress } from "@/contexts/ProgressContext";
import { useState } from "react";

export default function TimelinePage() {
  const { isComplete } = useProgress();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[oklch(0.15_0.03_250)]">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[oklch(0.15_0.03_250/0.95)] border-b border-[oklch(1_0_0/0.1)]">
        <div className="container flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2 text-sm font-[var(--font-sans)] text-[oklch(0.8_0.02_80)] hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Home
          </Link>
          <h1 className="text-sm font-[var(--font-display)] font-bold text-white">Timeline</h1>
          <Link href="/" className="flex items-center gap-2">
            <img src="https://files.manuscdn.com/user_upload_by_module/session_file/90544947/RzamISePlbcgDwAH.png" alt="" className="w-6 h-6" />
          </Link>
        </div>
      </header>

      {/* Timeline Hero */}
      <section className="container pt-8 pb-6">
        <h1 className="text-3xl md:text-4xl font-[var(--font-display)] font-bold mb-2 text-white">
          From Taxation to Constitution
        </h1>
        <p className="text-[oklch(0.75_0.02_80)] font-[var(--font-body)] italic">
          Thirty-seven years. From the first shots of the French and Indian War to the Bill of Rights.
        </p>
      </section>

      {/* CSS for hover animations */}
      <style>{`
        .timeline-card {
          transition: transform 0.25s cubic-bezier(0.23, 1, 0.32, 1),
                      box-shadow 0.25s cubic-bezier(0.23, 1, 0.32, 1),
                      border-color 0.25s ease;
        }
        .timeline-card:hover {
          transform: translateY(-4px) scale(1.02);
        }
        .timeline-dot {
          transition: transform 0.25s cubic-bezier(0.23, 1, 0.32, 1),
                      box-shadow 0.3s ease;
        }
        .timeline-dot-active {
          transform: scale(1.4);
        }
        @keyframes dot-pulse {
          0%, 100% { box-shadow: 0 0 8px var(--dot-color), 0 0 16px var(--dot-color); }
          50% { box-shadow: 0 0 14px var(--dot-color), 0 0 28px var(--dot-color); }
        }
        .timeline-dot-active {
          animation: dot-pulse 1.5s ease-in-out infinite;
        }
        .timeline-year {
          transition: transform 0.2s ease, text-shadow 0.3s ease;
        }
        .timeline-card:hover .timeline-year {
          transform: scale(1.08);
          text-shadow: 0 0 20px currentColor;
        }
        .timeline-subtitle {
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: max-height 0.3s ease, opacity 0.3s ease, margin 0.3s ease;
        }
        .timeline-card:hover .timeline-subtitle {
          max-height: 60px;
          opacity: 1;
          margin-top: 8px;
        }
      `}</style>

      {/* Interactive Timeline */}
      <section className="container py-6 pb-16">
        <div className="relative">
          {/* Central line */}
          <div className="absolute left-5 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[3px] bg-gradient-to-b from-[oklch(0.6_0.25_25)] via-[oklch(0.95_0.02_80)] to-[oklch(0.45_0.2_260)]" />

          <div className="space-y-6 md:space-y-10">
            {timelineEvents.map((event, index) => {
              const lesson = lessons.find(l => l.id === event.lessonId);
              const isLeft = index % 2 === 0;
              const completed = isComplete(event.lessonId);
              const isHovered = hoveredIndex === index;

              // Alternate colors: crimson, white, navy
              const colorCycle = index % 3;
              const dotColor = colorCycle === 0 ? "oklch(0.6 0.25 25)" : colorCycle === 1 ? "oklch(0.95 0.02 80)" : "oklch(0.45 0.2 260)";
              const yearColor = colorCycle === 0 ? "text-[oklch(0.7_0.25_25)]" : colorCycle === 1 ? "text-white" : "text-[oklch(0.7_0.15_260)]";
              const glowColor = colorCycle === 0 ? "oklch(0.6 0.25 25 / 0.25)" : colorCycle === 1 ? "oklch(0.95 0.02 80 / 0.2)" : "oklch(0.45 0.2 260 / 0.25)";
              const borderHover = colorCycle === 0 ? "oklch(0.6 0.25 25 / 0.6)" : colorCycle === 1 ? "oklch(0.95 0.02 80 / 0.5)" : "oklch(0.45 0.2 260 / 0.6)";

              return (
                <motion.div
                  key={`${event.year}-${event.lessonId}`}
                  initial={{ opacity: 0, x: isLeft ? -16 : 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.04, ease: [0.23, 1, 0.32, 1] }}
                  className="relative"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Mobile layout */}
                  <div className="md:hidden flex items-start gap-4 pl-12">
                    <div
                      className={`absolute left-3 top-2 w-5 h-5 rounded-full border-[3px] border-[oklch(0.15_0.03_250)] z-10 timeline-dot ${isHovered ? 'timeline-dot-active' : ''}`}
                      style={{ background: dotColor, '--dot-color': dotColor, boxShadow: `0 0 8px ${dotColor}` } as React.CSSProperties}
                    >
                      {completed && (
                        <Star className="w-2.5 h-2.5 absolute top-0.5 left-0.5 text-[oklch(0.15_0.03_250)] fill-current" />
                      )}
                    </div>
                    <Link href={`/lesson/${event.lessonId}`} className="w-full">
                      <div
                        className={`timeline-card p-4 rounded-sm border ${completed ? 'bg-[oklch(0.2_0.04_250)] border-[oklch(0.7_0.22_80/0.4)]' : 'bg-[oklch(0.18_0.03_250)] border-[oklch(1_0_0/0.08)]'}`}
                        style={{ ['--hover-glow' as string]: glowColor }}
                      >
                        <div className="flex items-baseline justify-between gap-3">
                          <p className={`text-2xl font-[var(--font-display)] font-bold timeline-year ${yearColor}`}>{event.year}</p>
                          {completed && <span className="text-[10px] font-[var(--font-sans)] text-[oklch(0.7_0.22_80)] uppercase tracking-wider">Done</span>}
                        </div>
                        <p className="font-[var(--font-display)] font-bold text-white text-base mt-1 leading-snug">{event.title}</p>
                        {lesson && (
                          <p className="timeline-subtitle text-xs text-[oklch(0.65_0.02_80)] font-[var(--font-body)] italic">{lesson.subtitle}</p>
                        )}
                        {lesson && <p className="text-xs text-[oklch(0.65_0.02_80)] font-[var(--font-sans)] mt-2">Night {lesson.id} →</p>}
                      </div>
                    </Link>
                  </div>

                  {/* Desktop layout */}
                  <div className={`hidden md:flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`flex-1 ${isLeft ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                      <Link href={`/lesson/${event.lessonId}`}>
                        <div
                          className={`timeline-card inline-block p-5 rounded-sm border max-w-sm ${isLeft ? 'ml-auto' : 'mr-auto'} ${completed ? 'bg-[oklch(0.2_0.04_250)] border-[oklch(0.7_0.22_80/0.4)]' : 'bg-[oklch(0.18_0.03_250)] border-[oklch(1_0_0/0.08)]'}`}
                          style={{
                            boxShadow: isHovered ? `0 8px 32px ${glowColor}, 0 0 0 1px ${borderHover}` : 'none',
                            borderColor: isHovered ? borderHover : undefined,
                          }}
                        >
                          <div className="flex items-baseline gap-3">
                            <p className={`text-3xl font-[var(--font-display)] font-bold timeline-year ${yearColor}`}>{event.year}</p>
                            {completed && <Star className="w-4 h-4 text-[oklch(0.7_0.22_80)] fill-current" />}
                          </div>
                          <p className="font-[var(--font-display)] font-bold text-white text-lg mt-1">{event.title}</p>
                          {lesson && (
                            <p className="text-sm text-[oklch(0.7_0.02_80)] font-[var(--font-body)] italic mt-2">{lesson.subtitle}</p>
                          )}
                          {lesson && <p className="text-xs text-[oklch(0.6_0.02_80)] font-[var(--font-sans)] mt-2">Night {lesson.id} →</p>}
                        </div>
                      </Link>
                    </div>
                    <div
                      className={`relative z-10 w-7 h-7 rounded-full border-[3px] border-[oklch(0.15_0.03_250)] timeline-dot ${isHovered ? 'timeline-dot-active' : ''}`}
                      style={{ background: dotColor, '--dot-color': dotColor, boxShadow: `0 0 12px ${dotColor}` } as React.CSSProperties}
                    >
                      {completed && (
                        <Star className="w-3 h-3 absolute top-1 left-1 text-[oklch(0.15_0.03_250)] fill-current" />
                      )}
                    </div>
                    <div className="flex-1" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[oklch(1_0_0/0.08)] py-6">
        <div className="container text-center">
          <p className="text-sm text-[oklch(0.55_0.02_80)] font-[var(--font-sans)]">
            Timeline data sourced from the National Park Service and American Battlefield Trust
          </p>
        </div>
      </footer>
    </div>
  );
}
