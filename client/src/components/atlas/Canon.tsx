import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import { canonTraditions, disputedBooks } from "@/data/atlas";
import { SectionShell, FadeIn } from "./primitives";
import { Check, Minus } from "lucide-react";

type TradKey = "jewish" | "protestant" | "catholic" | "orthodox" | "ethiopian";

const cols: { key: TradKey; short: string }[] = [
  { key: "jewish", short: "Jewish" },
  { key: "protestant", short: "Prot." },
  { key: "catholic", short: "Catholic" },
  { key: "orthodox", short: "Orthodox" },
  { key: "ethiopian", short: "Ethiopian" },
];

export function Canon() {
  const [highlight, setHighlight] = useState<TradKey | null>(null);

  return (
    <SectionShell
      id="canon"
      eyebrow="Chapter V — The Contested Table of Contents"
      title="Whose Bible? Which Books?"
      intro="Ask how many books are in the Bible and the honest answer is: it depends who you ask. From the 24 books of the Jewish Tanakh to the 81 of the Ethiopian Orthodox Church, the canon itself is a matter of tradition. Tap a tradition to highlight its canon."
    >
      {/* Tradition cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {canonTraditions.map((c, i) => {
          const active = highlight === (c.id as TradKey);
          return (
            <motion.button
              key={c.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              onClick={() => setHighlight(active ? null : (c.id as TradKey))}
              className={cn(
                "rounded-xl border bg-card p-4 text-left shadow-sm transition-all hover:-translate-y-1",
                active ? "border-accent shadow-md" : "border-border",
              )}
              style={active ? { boxShadow: `0 0 0 1px ${c.color}` } : undefined}
            >
              <div className="font-serif text-4xl font-semibold" style={{ color: c.color }}>
                {c.totalBooks}
              </div>
              <div className="mt-1 text-sm font-semibold text-foreground">{c.name}</div>
              <div className="mt-0.5 text-xs text-muted-foreground">books total</div>
            </motion.button>
          );
        })}
      </div>

      {/* Detail of highlighted tradition */}
      {highlight && (
        <FadeIn className="mt-5">
          {(() => {
            const c = canonTraditions.find((x) => x.id === highlight)!;
            return (
              <div className="rounded-xl border-l-2 bg-card p-5" style={{ borderColor: c.color }}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-serif text-xl font-semibold text-foreground">{c.name}</h3>
                  <span className="text-xs text-muted-foreground">Canon defined: {c.defined}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">{c.summary}</p>
                <div className="mt-3 text-xs text-muted-foreground">
                  Old Testament: <span className="font-medium text-foreground">{c.otBooks}</span>
                  {c.ntBooks > 0 && <> · New Testament: <span className="font-medium text-foreground">{c.ntBooks}</span></>}
                </div>
              </div>
            );
          })()}
        </FadeIn>
      )}

      {/* Disputed books matrix */}
      <FadeIn className="mt-10">
        <h3 className="mb-1 font-serif text-2xl font-semibold text-foreground">The Disputed Books</h3>
        <p className="mb-5 text-sm text-muted-foreground text-pretty">
          The 27-book New Testament is shared by all Christian traditions. The differences lie almost entirely in the Old Testament — the deuterocanonical and "broader" books below.
        </p>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="bg-secondary/70">
                <th className="sticky left-0 z-10 bg-secondary/70 px-4 py-3 text-left font-semibold text-foreground">Book</th>
                {cols.map((col) => {
                  const c = canonTraditions.find((x) => x.id === col.key)!;
                  return (
                    <th
                      key={col.key}
                      onClick={() => setHighlight(highlight === col.key ? null : col.key)}
                      className={cn(
                        "cursor-pointer px-3 py-3 text-center font-semibold transition-colors",
                        highlight === col.key ? "text-accent" : "text-foreground",
                      )}
                    >
                      <span className="inline-flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: c.color }} />
                        {col.short}
                      </span>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {disputedBooks.map((b, i) => (
                <tr key={b.name} className={cn("border-t border-border", i % 2 === 1 && "bg-secondary/20")}>
                  <td className="sticky left-0 z-10 bg-inherit px-4 py-2.5 font-medium text-foreground">
                    {b.name}
                    {b.group === "Broader" && (
                      <span className="ml-2 rounded bg-accent/15 px-1.5 py-0.5 text-[0.6rem] uppercase tracking-wide text-accent">broader</span>
                    )}
                  </td>
                  {cols.map((col) => {
                    const has = b[col.key];
                    const dim = highlight && highlight !== col.key;
                    return (
                      <td key={col.key} className={cn("px-3 py-2.5 text-center", dim && "opacity-30")}>
                        {has ? (
                          <Check className="mx-auto h-4 w-4 text-chart-2" strokeWidth={2.5} />
                        ) : (
                          <Minus className="mx-auto h-4 w-4 text-muted-foreground/40" />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          A check mark indicates the book is part of that tradition's canon. The deuterocanonical books descend from the Greek Septuagint; Protestant reformers returned to the shorter Hebrew canon.
        </p>
      </FadeIn>
    </SectionShell>
  );
}
