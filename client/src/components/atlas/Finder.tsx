import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { quizQuestions } from "@/data/atlas";
import { translations, philosophyMeta } from "@/data/translations";
import { SectionShell } from "./primitives";
import { ArrowLeft, RotateCcw, Sparkles } from "lucide-react";

const byId = Object.fromEntries(translations.map((t) => [t.id, t]));

export function Finder() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);

  const total = quizQuestions.length;
  const q = quizQuestions[step];

  const choose = (weights: Record<string, number>) => {
    const next = { ...scores };
    for (const [id, w] of Object.entries(weights)) next[id] = (next[id] ?? 0) + (w ?? 0);
    setScores(next);
    if (step + 1 < total) setStep(step + 1);
    else setDone(true);
  };

  const ranked = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([id, score]) => ({ t: byId[id], score }))
    .filter((x) => x.t);

  const reset = () => {
    setStep(0);
    setScores({});
    setDone(false);
  };

  return (
    <SectionShell
      id="finder"
      eyebrow="Chapter IX — Your Translation"
      title="Which Bible Fits You?"
      intro="With two dozen worthy translations, the 'best' Bible is the one suited to you. Answer five quick questions and we'll suggest versions matched to your purpose, style, and tradition. (A guide, not a verdict — and a good case for owning more than one.)"
    >
      <div className="mx-auto max-w-2xl">
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          {/* progress */}
          <div className="h-1.5 w-full bg-secondary">
            <motion.div
              className="h-full bg-accent"
              animate={{ width: `${(done ? total : step) / total * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          <div className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {!done ? (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
                    <span>Question {step + 1} of {total}</span>
                    {step > 0 && (
                      <button onClick={() => setStep(step - 1)} className="inline-flex items-center gap-1 hover:text-foreground">
                        <ArrowLeft className="h-3.5 w-3.5" /> Back
                      </button>
                    )}
                  </div>
                  <h3 className="mt-3 font-serif text-2xl font-semibold text-foreground sm:text-3xl">{q.question}</h3>
                  <div className="mt-6 space-y-3">
                    {q.options.map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => choose(opt.weights as Record<string, number>)}
                        className="group flex w-full items-center justify-between rounded-xl border border-border bg-background p-4 text-left text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-sm"
                      >
                        {opt.label}
                        <span className="text-muted-foreground transition-transform group-hover:translate-x-1">→</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-center gap-2 text-accent">
                    <Sparkles className="h-5 w-5" />
                    <span className="text-xs font-semibold uppercase tracking-wider">Your matches</span>
                  </div>
                  <h3 className="mt-2 font-serif text-3xl font-semibold text-foreground">Recommended for you</h3>
                  <div className="mt-6 space-y-3">
                    {ranked.map(({ t }, i) => (
                      <motion.div
                        key={t.id}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={cn(
                          "rounded-xl border bg-background p-5",
                          i === 0 ? "border-accent shadow-sm" : "border-border",
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                            style={{
                              backgroundColor: i === 0 ? "var(--accent)" : "var(--secondary)",
                              color: i === 0 ? "var(--accent-foreground)" : "var(--muted-foreground)",
                            }}
                          >
                            {i + 1}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-baseline gap-2">
                              <span className="font-serif text-xl font-semibold text-foreground">{t.abbr}</span>
                              <span className="truncate text-sm text-muted-foreground">{t.name}</span>
                            </div>
                            <div className="mt-0.5 text-xs" style={{ color: philosophyMeta[t.philosophy].color }}>
                              {philosophyMeta[t.philosophy].label} · {t.tradition} · Grade {t.readingLevel}
                            </div>
                          </div>
                        </div>
                        <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground text-pretty">
                          <span className="font-medium text-foreground">Why: </span>{t.bestFor}.
                        </p>
                      </motion.div>
                    ))}
                  </div>
                  <button
                    onClick={reset}
                    className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent"
                  >
                    <RotateCcw className="h-4 w-4" /> Start over
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
