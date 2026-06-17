import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { variants } from "@/data/atlas";
import { SectionShell } from "./primitives";
import { AlertTriangle, ChevronDown, FileSearch, ScrollText } from "lucide-react";

function confidenceColor(v: number) {
  if (v >= 80) return "var(--chart-4)"; // strongly an addition
  if (v >= 50) return "var(--chart-3)";
  return "var(--chart-1)";
}

function confidenceLabel(v: number) {
  if (v >= 80) return "Very likely a later addition";
  if (v >= 50) return "Probably a later addition";
  if (v >= 40) return "Genuinely disputed";
  return "A translation choice";
}

export function Variants() {
  const [open, setOpen] = useState<string | null>(variants[0].id);

  return (
    <SectionShell
      id="variants"
      eyebrow="Chapter VII — The Honest Footnotes"
      title="The Verses Scholars Debate"
      intro="A world-class understanding of the Bible means facing the hard cases honestly. Some beloved passages are absent from the earliest manuscripts; some famous words turn on a single ambiguous term. Each card shows the scholarly consensus on a confidence scale — not to unsettle faith, but to illuminate how the text has been studied."
    >
      <div className="space-y-4">
        {variants.map((v, i) => {
          const isOpen = open === v.id;
          const color = confidenceColor(v.additionConfidence);
          return (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="overflow-hidden rounded-xl border border-border bg-card shadow-sm"
            >
              <button
                onClick={() => setOpen(isOpen ? null : v.id)}
                className="flex w-full items-center gap-4 p-5 text-left"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: `color-mix(in oklch, ${color} 16%, transparent)` }}>
                  {v.additionConfidence >= 80 ? (
                    <AlertTriangle className="h-5 w-5" style={{ color }} />
                  ) : (
                    <FileSearch className="h-5 w-5" style={{ color }} />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <h3 className="font-serif text-xl font-semibold text-foreground">{v.name}</h3>
                    <span className="text-xs font-medium text-muted-foreground">{v.reference}</span>
                  </div>
                  <div className="mt-0.5 text-sm text-muted-foreground">{v.consensus}</div>
                </div>
                <ChevronDown
                  className={cn("h-5 w-5 shrink-0 text-muted-foreground transition-transform", isOpen && "rotate-180")}
                />
              </button>

              {/* Confidence meter */}
              <div className="px-5 pb-2">
                <div className="flex items-center justify-between text-[0.7rem] font-medium text-muted-foreground">
                  <span>Original to the text</span>
                  <span style={{ color }}>{confidenceLabel(v.additionConfidence)}</span>
                  <span>A later addition</span>
                </div>
                <div className="relative mt-1.5 h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${v.additionConfidence}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: color }}
                  />
                </div>
              </div>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-4 p-5 pt-3 md:grid-cols-3">
                      <Detail label="What it says" body={v.whatItSays} />
                      <Detail label="The evidence" body={v.evidence} />
                      <Detail label="In modern Bibles" body={v.modernTreatment} icon />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </SectionShell>
  );
}

function Detail({ label, body, icon }: { label: string; body: string; icon?: boolean }) {
  return (
    <div className="rounded-lg bg-secondary/50 p-4">
      <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
        {icon && <ScrollText className="h-3.5 w-3.5" />}
        {label}
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{body}</p>
    </div>
  );
}
