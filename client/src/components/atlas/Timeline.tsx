import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import { timeline, type TimelineEvent } from "@/data/atlas";
import { SectionShell, Pill } from "./primitives";

const eras: { id: TimelineEvent["era"] | "All"; label: string }[] = [
  { id: "All", label: "All Eras" },
  { id: "Ancient", label: "Ancient World" },
  { id: "Manuscript", label: "Manuscript Age" },
  { id: "Reformation", label: "Reformation" },
  { id: "Modern", label: "Modern Era" },
];

const eraColor: Record<TimelineEvent["era"], string> = {
  Ancient: "var(--chart-3)",
  Manuscript: "var(--chart-5)",
  Reformation: "var(--chart-4)",
  Modern: "var(--chart-1)",
};

export function Timeline() {
  const [era, setEra] = useState<TimelineEvent["era"] | "All">("All");
  const events = timeline.filter((e) => era === "All" || e.era === era);

  return (
    <SectionShell
      id="timeline"
      eyebrow="Chapter I — The Journey"
      title="Three Millennia in One Thread"
      intro="The Bible did not arrive as a single book. It was written, gathered, translated, debated, printed, and revised across thirty centuries. Follow the pivotal moments — and filter by era to focus your view."
    >
      <div className="mb-10 flex flex-wrap gap-2">
        {eras.map((e) => (
          <Pill key={e.id} active={era === e.id} onClick={() => setEra(e.id)}>
            {e.label}
          </Pill>
        ))}
      </div>

      <div className="relative">
        {/* center spine on desktop */}
        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-accent/40 via-border to-transparent md:left-1/2" />

        <div className="space-y-6">
          {events.map((event, i) => {
            const left = i % 2 === 0;
            return (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={cn(
                  "relative pl-12 md:w-1/2 md:pl-0",
                  left ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12",
                )}
              >
                {/* node */}
                <span
                  className="absolute left-4 top-6 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-background md:left-auto"
                  style={{
                    backgroundColor: eraColor[event.era],
                    [left ? "right" : "left"]: "-0.43rem",
                  } as React.CSSProperties}
                />
                <div className="group rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-md">
                  <div
                    className={cn(
                      "mb-1.5 flex items-center gap-2",
                      left && "md:justify-end",
                    )}
                  >
                    <span
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: eraColor[event.era] }}
                    >
                      {event.display}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
