import { references } from "@/data/references";
import { SectionShell } from "./primitives";
import { BookOpen, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <>
      <SectionShell
        id="sources"
        eyebrow="Apparatus"
        title="Sources & Further Reading"
        intro="This atlas is a work of synthesis. The data on translations, manuscripts, canons, and variants is drawn from standard reference works and the sources below. Where scholars disagree, the aim has been to represent the mainstream consensus fairly and to flag genuine debate."
      >
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {references.map((r) => (
            <a
              key={r.id}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-accent hover:shadow-sm"
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-secondary text-xs font-semibold text-muted-foreground">
                {r.id}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-medium leading-snug text-foreground">{r.title}</span>
                <span className="mt-0.5 inline-flex items-center gap-1 text-xs text-muted-foreground">
                  {r.source}
                  <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                </span>
              </span>
            </a>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-border bg-secondary/40 p-5 text-sm leading-relaxed text-muted-foreground text-pretty">
          <strong className="font-semibold text-foreground">A note on tone.</strong> This project is descriptive, not devotional or polemical. It does not argue that any one tradition, translation, or text-type is correct. Its purpose is to help readers of every background understand how the Bible has reached them — and to read whatever Bible they hold with greater context and care.
        </div>
      </SectionShell>

      <footer className="border-t border-border bg-secondary/30 py-12">
        <div className="container">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <BookOpen className="h-5 w-5" />
              </span>
              <span className="font-serif text-lg font-semibold text-foreground">The Bible Translation Atlas</span>
            </div>
            <p className="max-w-md text-sm text-muted-foreground text-pretty">
              An interactive scholarly exploration of how the Bible was written, copied, canonized, translated, and debated across three thousand years.
            </p>
            <p className="text-xs text-muted-foreground">
              Built as an educational resource · Original languages rendered with the Cormorant Garamond typeface
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
