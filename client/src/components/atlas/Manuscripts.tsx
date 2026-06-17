import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import { manuscripts, textTypes } from "@/data/atlas";
import { SectionShell, FadeIn } from "./primitives";
import { MapPin, ScrollText } from "lucide-react";

export function Manuscripts() {
  const [filter, setFilter] = useState<"All" | "Old" | "New">("All");
  const list = manuscripts.filter(
    (m) => filter === "All" || m.testament === filter || m.testament === "Both",
  );

  return (
    <SectionShell
      id="manuscripts"
      alt
      eyebrow="Chapter VI — The Witnesses"
      title="The Manuscripts Behind the Text"
      intro="We possess no original autographs of any biblical book. Instead, the text is reconstructed from thousands of copies — papyri, codices, and scrolls — spanning two millennia. These are the most important witnesses, and the manuscript families they belong to."
    >
      {/* Text-type families */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {textTypes.map((tt, i) => (
          <motion.div
            key={tt.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="rounded-xl border-t-2 border border-border bg-card p-4 shadow-sm"
            style={{ borderTopColor: tt.color }}
          >
            <div className="font-serif text-lg font-semibold text-foreground">{tt.name}</div>
            <div className="mt-0.5 text-xs font-medium" style={{ color: tt.color }}>{tt.era}</div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground text-pretty">{tt.traits}</p>
            <div className="mt-3 border-t border-border pt-2 text-[0.7rem] text-muted-foreground">
              <span className="font-semibold text-foreground">Feeds:</span> {tt.usedBy}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filter */}
      <FadeIn className="mt-10 flex items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Filter</span>
        {(["All", "Old", "New"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all",
              filter === f
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:text-foreground",
            )}
          >
            {f === "All" ? "All Manuscripts" : `${f} Testament`}
          </button>
        ))}
      </FadeIn>

      {/* Manuscript cards */}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {list.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: (i % 2) * 0.08 }}
            className="group flex gap-4 rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:border-accent hover:shadow-md"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary text-accent">
              <ScrollText className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-2">
                <h3 className="font-serif text-xl font-semibold text-foreground">{m.name}</h3>
                <span className="text-xs font-medium text-accent">{m.date}</span>
              </div>
              <div className="mt-0.5 flex flex-wrap gap-x-3 text-xs text-muted-foreground">
                <span>{m.language}</span>
                <span>·</span>
                <span>{m.family}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">{m.significance}</p>
              <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                {m.housedAt}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}
