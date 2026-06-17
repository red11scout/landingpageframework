import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  translations,
  philosophyMeta,
  traditionList,
  type Philosophy,
  type Tradition,
  type Translation,
} from "@/data/translations";
import { SectionShell, Pill } from "./primitives";
import { BookMarked, GraduationCap, Layers, X } from "lucide-react";

const philosophies: Philosophy[] = ["Formal", "Mediating", "Dynamic", "Paraphrase"];

export function Explorer() {
  const [phil, setPhil] = useState<Philosophy | "All">("All");
  const [trad, setTrad] = useState<Tradition | "All">("All");
  const [apoc, setApoc] = useState<"All" | "yes" | "no">("All");
  const [selected, setSelected] = useState<Translation | null>(null);
  const [sort, setSort] = useState<"literal" | "year" | "reading">("literal");

  const filtered = useMemo(() => {
    let list = translations.filter(
      (t) =>
        (phil === "All" || t.philosophy === phil) &&
        (trad === "All" || t.tradition === trad) &&
        (apoc === "All" || (apoc === "yes" ? t.includesApocrypha : !t.includesApocrypha)),
    );
    list = [...list].sort((a, b) => {
      if (sort === "literal") return b.literalness - a.literalness;
      if (sort === "year") return a.year - b.year;
      return a.readingLevel - b.readingLevel;
    });
    return list;
  }, [phil, trad, apoc, sort]);

  return (
    <SectionShell
      id="explorer"
      eyebrow="Chapter III — The Library"
      title="The Translation Explorer"
      intro="Twenty-four major English versions, each a different answer to one question: how do you carry an ancient text into a living language? Filter by translation philosophy, tradition, and canon — then open any version for its full profile."
    >
      {/* Filters */}
      <div className="space-y-4">
        <FilterRow label="Philosophy">
          <Pill active={phil === "All"} onClick={() => setPhil("All")}>All</Pill>
          {philosophies.map((p) => (
            <Pill key={p} active={phil === p} onClick={() => setPhil(p)} color={philosophyMeta[p].color}>
              {philosophyMeta[p].label}
            </Pill>
          ))}
        </FilterRow>
        <FilterRow label="Tradition">
          <Pill active={trad === "All"} onClick={() => setTrad("All")}>All</Pill>
          {traditionList.map((t) => (
            <Pill key={t} active={trad === t} onClick={() => setTrad(t)}>{t}</Pill>
          ))}
        </FilterRow>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <FilterRow label="Deuterocanon">
            <Pill active={apoc === "All"} onClick={() => setApoc("All")}>Any</Pill>
            <Pill active={apoc === "yes"} onClick={() => setApoc("yes")}>Included</Pill>
            <Pill active={apoc === "no"} onClick={() => setApoc("no")}>Excluded</Pill>
          </FilterRow>
          <FilterRow label="Sort by">
            <Pill active={sort === "literal"} onClick={() => setSort("literal")}>Literalness</Pill>
            <Pill active={sort === "reading"} onClick={() => setSort("reading")}>Reading level</Pill>
            <Pill active={sort === "year"} onClick={() => setSort("year")}>Year</Pill>
          </FilterRow>
        </div>
      </div>

      {/* Spectrum bar */}
      <Spectrum />

      {/* Cards */}
      <div className="mt-8 text-sm text-muted-foreground">
        Showing <span className="font-semibold text-foreground">{filtered.length}</span> of {translations.length} versions
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((t) => (
            <motion.button
              key={t.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelected(t)}
              className="group flex flex-col rounded-xl border border-border bg-card p-5 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-accent hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-serif text-2xl font-semibold text-foreground">{t.abbr}</div>
                  <div className="mt-0.5 text-sm text-muted-foreground">{t.name}</div>
                </div>
                <span className="shrink-0 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                  {t.year}
                </span>
              </div>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground text-pretty">
                {t.blurb}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5 pt-1">
                <Tag color={philosophyMeta[t.philosophy].color}>{philosophyMeta[t.philosophy].label}</Tag>
                <Tag>{t.tradition}</Tag>
                <Tag>Grade {t.readingLevel}</Tag>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      <DetailDialog t={selected} onClose={() => setSelected(null)} />
    </SectionShell>
  );
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
    </div>
  );
}

function Tag({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-0.5 text-[0.7rem] font-medium text-muted-foreground"
      style={color ? { borderColor: color, color } : undefined}
    >
      {color && <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />}
      {children}
    </span>
  );
}

function Spectrum() {
  // Plot translations on the literalness axis
  return (
    <div className="mt-8 rounded-xl border border-border bg-card p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <span>Thought-for-Thought</span>
        <span>The Translation Spectrum</span>
        <span>Word-for-Word</span>
      </div>
      <div className="relative h-px w-full bg-gradient-to-r from-chart-4 via-chart-3 to-chart-1">
        <div className="relative h-0">
          {translations.map((t, i) => (
            <div
              key={t.id}
              className="group absolute -translate-x-1/2"
              style={{ left: `${t.literalness}%`, top: i % 2 === 0 ? "-6px" : "-6px" }}
            >
              <span
                className="block h-3 w-3 rounded-full border-2 border-card transition-transform group-hover:scale-150"
                style={{ backgroundColor: philosophyMeta[t.philosophy].color }}
              />
              <span className="pointer-events-none absolute left-1/2 top-5 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-foreground px-1.5 py-0.5 text-[0.65rem] font-medium text-background opacity-0 transition-opacity group-hover:opacity-100">
                {t.abbr}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
        {philosophies.map((p) => (
          <span key={p} className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: philosophyMeta[p].color }} />
            {philosophyMeta[p].label}
          </span>
        ))}
      </div>
    </div>
  );
}

function DetailDialog({ t, onClose }: { t: Translation | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {t && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-foreground/40 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ type: "spring", damping: 26, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-t-2xl border border-border bg-card p-6 shadow-2xl sm:rounded-2xl sm:p-8"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="text-xs font-semibold uppercase tracking-wider text-accent">{t.year} · {t.tradition}</div>
            <h3 className="mt-1 font-serif text-3xl font-semibold text-foreground">{t.name}</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground text-pretty">{t.blurb}</p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Metric icon={<Layers className="h-4 w-4" />} label="Philosophy" value={philosophyMeta[t.philosophy].label} />
              <Metric icon={<GraduationCap className="h-4 w-4" />} label="Reading level" value={`Grade ${t.readingLevel}`} />
              <Metric icon={<BookMarked className="h-4 w-4" />} label="OT basis" value={t.otBasis} />
              <Metric icon={<BookMarked className="h-4 w-4" />} label="NT basis" value={t.ntBasis} />
            </div>

            <div className="mt-5 rounded-lg bg-secondary/60 p-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Literalness</div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-background">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${t.literalness}%`, backgroundColor: philosophyMeta[t.philosophy].color }}
                />
              </div>
            </div>

            <div className="mt-5 rounded-lg border border-accent/30 bg-accent/10 p-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-accent">Best for</div>
              <div className="mt-1 text-sm font-medium text-foreground">{t.bestFor}</div>
            </div>

            <div className="mt-4 text-xs text-muted-foreground">
              Publisher: {t.publisher}{t.includesApocrypha ? " · Includes deuterocanon" : ""}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-background p-3">
      <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="mt-1 text-sm font-semibold text-foreground">{value}</div>
    </div>
  );
}
