import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { verses } from "@/data/verses";
import { translations, philosophyMeta } from "@/data/translations";
import { SectionShell, Pill } from "./primitives";
import { Quote } from "lucide-react";

const byId = Object.fromEntries(translations.map((t) => [t.id, t]));

export function Compare() {
  const [verseId, setVerseId] = useState(verses[0].id);
  const verse = useMemo(() => verses.find((v) => v.id === verseId)!, [verseId]);

  // sort renderings by literalness of the translation (formal → dynamic)
  const ordered = useMemo(
    () =>
      [...verse.renderings].sort(
        (a, b) =>
          (byId[b.translationId]?.literalness ?? 0) -
          (byId[a.translationId]?.literalness ?? 0),
      ),
    [verse],
  );

  return (
    <SectionShell
      id="compare"
      alt
      eyebrow="Chapter IV — The Comparison Engine"
      title="One Verse, Many Voices"
      intro="Select a landmark passage and watch the translations diverge. The same Hebrew or Greek produces strikingly different English — sometimes for grammar, sometimes for theology. Renderings are ordered from the most literal to the most dynamic."
    >
      <div className="mb-8 flex flex-wrap gap-2">
        {verses.map((v) => (
          <Pill key={v.id} active={verseId === v.id} onClick={() => setVerseId(v.id)}>
            {v.reference}
          </Pill>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Original + context */}
        <AnimatePresence mode="wait">
          <motion.div
            key={verse.id}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.35 }}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-accent">{verse.theme}</div>
                  <h3 className="mt-1 font-serif text-3xl font-semibold text-foreground">{verse.reference}</h3>
                </div>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                  {verse.originalLang}
                </span>
              </div>

              <div
                className={cn(
                  "mt-5 rounded-xl bg-secondary/60 p-5 text-center",
                  verse.originalLang === "Hebrew" && "text-right",
                )}
              >
                <p
                  className="font-serif text-2xl leading-relaxed text-foreground"
                  dir={verse.originalLang === "Hebrew" ? "rtl" : "ltr"}
                >
                  {verse.original}
                </p>
                {verse.transliteration && (
                  <p className="mt-3 text-sm italic text-muted-foreground" dir="ltr">
                    {verse.transliteration}
                  </p>
                )}
              </div>

              <div className="mt-5 flex gap-3 rounded-lg border-l-2 border-accent bg-accent/5 p-4">
                <Quote className="h-4 w-4 shrink-0 text-accent" />
                <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
                  {verse.context}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Renderings */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {ordered.map((r, i) => {
              const t = byId[r.translationId];
              if (!t) return null;
              const color = philosophyMeta[t.philosophy].color;
              return (
                <motion.div
                  key={`${verse.id}-${r.translationId}`}
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  className="rounded-xl border border-border bg-card p-4 shadow-sm transition-colors hover:border-accent"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex w-16 shrink-0 flex-col items-start">
                      <span className="font-serif text-lg font-semibold text-foreground">{t.abbr}</span>
                      <span className="text-[0.65rem] text-muted-foreground">{t.year}</span>
                      <span
                        className="mt-1 h-1 w-8 rounded-full"
                        style={{ backgroundColor: color }}
                        title={philosophyMeta[t.philosophy].label}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[0.95rem] leading-relaxed text-foreground text-pretty">
                        "{r.text}"
                      </p>
                      {r.note && (
                        <p className="mt-2 inline-block rounded bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                          {r.note}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          <p className="px-1 pt-1 text-xs text-muted-foreground">
            Color bar indicates translation philosophy:{" "}
            {Object.values(philosophyMeta).map((m, i) => (
              <span key={m.label}>
                {i > 0 && " · "}
                <span style={{ color: m.color }}>{m.label}</span>
              </span>
            ))}
          </p>
        </div>
      </div>
    </SectionShell>
  );
}
