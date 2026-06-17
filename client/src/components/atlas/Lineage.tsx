import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import { SectionShell } from "./primitives";

interface Node {
  id: string;
  label: string;
  sub?: string;
  tier: number;
  family: "source" | "alexandrian" | "byzantine" | "masoretic" | "vulgate" | "english";
}

const nodes: Node[] = [
  // Tier 0 — original languages
  { id: "hebrew", label: "Hebrew & Aramaic", sub: "Original OT", tier: 0, family: "source" },
  { id: "greek", label: "Koine Greek", sub: "Original NT", tier: 0, family: "source" },
  // Tier 1 — earliest streams
  { id: "lxx", label: "Septuagint", sub: "Greek OT, c. 250 BC", tier: 1, family: "alexandrian" },
  { id: "masoretic", label: "Masoretic Text", sub: "Hebrew, c. 1000 AD", tier: 1, family: "masoretic" },
  { id: "alexandrian", label: "Alexandrian Text", sub: "Sinaiticus, Vaticanus", tier: 1, family: "alexandrian" },
  { id: "byzantine", label: "Byzantine Text", sub: "Majority manuscripts", tier: 1, family: "byzantine" },
  // Tier 2 — printed / Latin bridges
  { id: "vulgate", label: "Latin Vulgate", sub: "Jerome, 405 AD", tier: 2, family: "vulgate" },
  { id: "critical", label: "Critical Text", sub: "Nestle–Aland / UBS", tier: 2, family: "alexandrian" },
  { id: "tr", label: "Textus Receptus", sub: "Erasmus, 1516", tier: 2, family: "byzantine" },
  // Tier 3 — English translations
  { id: "douay", label: "Douay–Rheims", sub: "1610", tier: 3, family: "vulgate" },
  { id: "kjv", label: "KJV / NKJV", sub: "1611 / 1982", tier: 3, family: "byzantine" },
  { id: "modern", label: "ESV · NIV · NASB", sub: "Modern critical", tier: 3, family: "alexandrian" },
  { id: "nrsv", label: "NRSV · NABRE", sub: "Ecumenical critical", tier: 3, family: "alexandrian" },
  { id: "jps", label: "JPS Tanakh", sub: "Jewish, Hebrew", tier: 3, family: "masoretic" },
];

const links: { from: string; to: string }[] = [
  { from: "hebrew", to: "lxx" },
  { from: "hebrew", to: "masoretic" },
  { from: "greek", to: "alexandrian" },
  { from: "greek", to: "byzantine" },
  { from: "lxx", to: "vulgate" },
  { from: "alexandrian", to: "vulgate" },
  { from: "alexandrian", to: "critical" },
  { from: "byzantine", to: "tr" },
  { from: "lxx", to: "critical" },
  { from: "vulgate", to: "douay" },
  { from: "tr", to: "kjv" },
  { from: "critical", to: "modern" },
  { from: "critical", to: "nrsv" },
  { from: "masoretic", to: "critical" },
  { from: "masoretic", to: "jps" },
  { from: "masoretic", to: "nrsv" },
];

const familyColor: Record<Node["family"], string> = {
  source: "var(--foreground)",
  alexandrian: "var(--chart-1)",
  byzantine: "var(--chart-2)",
  masoretic: "var(--chart-3)",
  vulgate: "var(--chart-5)",
  english: "var(--accent)",
};

const tierLabels = ["Original Languages", "Manuscript Families", "Printed & Critical Texts", "English Translations"];

export function Lineage() {
  const [hover, setHover] = useState<string | null>(null);

  const connected = (id: string) => {
    if (!hover) return true;
    if (id === hover) return true;
    return links.some(
      (l) =>
        (l.from === hover && l.to === id) || (l.to === hover && l.from === id),
    );
  };

  const tiers = [0, 1, 2, 3].map((t) => nodes.filter((n) => n.tier === t));

  return (
    <SectionShell
      id="lineage"
      alt
      eyebrow="Chapter II — The Family Tree"
      title="Every Bible Has a Bloodline"
      intro="No English Bible was made from scratch. Each descends from a specific stream of manuscripts — Alexandrian, Byzantine, Masoretic, or the Latin Vulgate. Hover any node to trace its lineage from the original languages to your bookshelf."
    >
      <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-8">
        <div className="grid gap-8 lg:gap-6">
          {tiers.map((tierNodes, ti) => (
            <div key={ti}>
              <div className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {tierLabels[ti]}
              </div>
              <div className="flex flex-wrap items-stretch justify-center gap-3">
                {tierNodes.map((n) => {
                  const color = familyColor[n.family];
                  const dim = !connected(n.id);
                  return (
                    <motion.button
                      key={n.id}
                      onMouseEnter={() => setHover(n.id)}
                      onMouseLeave={() => setHover(null)}
                      onFocus={() => setHover(n.id)}
                      onBlur={() => setHover(null)}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: ti * 0.05 }}
                      className={cn(
                        "relative min-w-[8.5rem] flex-1 basis-[8.5rem] rounded-xl border bg-background px-3 py-3 text-left transition-all sm:flex-none sm:basis-auto sm:min-w-[10rem]",
                        dim ? "opacity-35" : "opacity-100",
                      )}
                      style={{
                        borderColor: hover === n.id ? color : "var(--border)",
                        boxShadow: hover === n.id ? `0 0 0 1px ${color}` : undefined,
                      }}
                    >
                      <span
                        className="absolute left-0 top-0 h-full w-1 rounded-l-xl"
                        style={{ backgroundColor: color }}
                      />
                      <div className="pl-1.5">
                        <div className="font-serif text-base font-semibold leading-tight text-foreground">
                          {n.label}
                        </div>
                        {n.sub && (
                          <div className="mt-0.5 text-[0.7rem] text-muted-foreground">
                            {n.sub}
                          </div>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
              {ti < 3 && (
                <div className="mt-3 flex justify-center">
                  <svg width="24" height="20" viewBox="0 0 24 20" className="text-border">
                    <path d="M12 0 L12 14 M6 9 L12 15 L18 9" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* legend */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-border pt-5 text-xs text-muted-foreground">
          {[
            ["Alexandrian", "alexandrian"],
            ["Byzantine", "byzantine"],
            ["Masoretic", "masoretic"],
            ["Vulgate / Latin", "vulgate"],
          ].map(([label, key]) => (
            <span key={key} className="inline-flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: familyColor[key as Node["family"]] }}
              />
              {label}
            </span>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
