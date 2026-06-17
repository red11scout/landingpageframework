import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { lenses, lensPerspectives } from "@/data/atlas";
import { verses } from "@/data/verses";
import { SectionShell } from "./primitives";
import { Eye } from "lucide-react";

// only verses that have lens perspectives
const lensVerses = verses.filter((v) => lensPerspectives[v.id]);

export function Lenses() {
  const [lensId, setLensId] = useState(lenses[0].id);
  const [verseId, setVerseId] = useState(lensVerses[0].id);

  const lens = lenses.find((l) => l.id === lensId)!;
  const verse = verses.find((v) => v.id === verseId)!;
  const perspective = lensPerspectives[verseId]?.[lensId];

  return (
    <SectionShell
      id="lenses"
      alt
      eyebrow="Chapter VIII — Many Eyes, One Text"
      title="Read Through Five Lenses"
      intro="The same passage looks different depending on where you stand. Choose a scholarly tradition to see its commitments — then read how it interprets a contested verse. Each lens is presented in its own voice, charitably and without verdict."
    >
      {/* Lens selector */}
      <div className="flex flex-wrap gap-2">
        {lenses.map((l) => {
          const active = lensId === l.id;
          return (
            <button
              key={l.id}
              onClick={() => setLensId(l.id)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                active ? "text-primary-foreground shadow-sm" : "border-border bg-card text-muted-foreground hover:text-foreground",
              )}
              style={active ? { backgroundColor: l.color, borderColor: l.color } : undefined}
            >
              {l.name}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Lens profile */}
        <AnimatePresence mode="wait">
          <motion.div
            key={lens.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="rounded-2xl border-t-2 border border-border bg-card p-6 shadow-sm"
            style={{ borderTopColor: lens.color }}
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: `color-mix(in oklch, ${lens.color} 16%, transparent)`, color: lens.color }}>
                <Eye className="h-5 w-5" />
              </span>
              <h3 className="font-serif text-2xl font-semibold text-foreground">{lens.name}</h3>
            </div>
            <p className="mt-3 text-base italic text-muted-foreground text-pretty">"{lens.short}"</p>
            <dl className="mt-5 space-y-3">
              <Row term="Authority" desc={lens.authority} />
              <Row term="Canon" desc={lens.canon} />
              <Row term="Text preference" desc={lens.textPreference} />
              <Row term="Representative voices" desc={lens.voices} />
            </dl>
          </motion.div>
        </AnimatePresence>

        {/* Verse-through-lens */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-4 flex flex-wrap gap-2">
            {lensVerses.map((v) => (
              <button
                key={v.id}
                onClick={() => setVerseId(v.id)}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium transition-all",
                  verseId === v.id ? "border-accent bg-accent/15 text-accent" : "border-border text-muted-foreground hover:text-foreground",
                )}
              >
                {v.reference}
              </button>
            ))}
          </div>

          <div className="rounded-xl bg-secondary/50 p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{verse.reference} — {verse.theme}</div>
            <p className="mt-1.5 font-serif text-lg leading-relaxed text-foreground" dir={verse.originalLang === "Hebrew" ? "rtl" : "ltr"}>
              {verse.original}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${lensId}-${verseId}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="mt-4 rounded-xl border-l-2 p-4"
              style={{ borderColor: lens.color, backgroundColor: `color-mix(in oklch, ${lens.color} 7%, transparent)` }}
            >
              <div className="mb-1.5 text-xs font-semibold uppercase tracking-wider" style={{ color: lens.color }}>
                {lens.name} reads this as…
              </div>
              <p className="text-[0.95rem] leading-relaxed text-foreground text-pretty">
                {perspective ?? "This tradition does not single out this passage for distinctive comment; it reads it in continuity with the surrounding text."}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </SectionShell>
  );
}

function Row({ term, desc }: { term: string; desc: string }) {
  return (
    <div className="border-t border-border pt-3">
      <dt className="text-xs font-semibold uppercase tracking-wider text-accent">{term}</dt>
      <dd className="mt-0.5 text-sm leading-relaxed text-muted-foreground text-pretty">{desc}</dd>
    </div>
  );
}
