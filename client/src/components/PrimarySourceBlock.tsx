import { PrimarySource } from "@/lib/primarySources";
import { ExternalLink, Scroll } from "lucide-react";

interface PrimarySourceBlockProps {
  source: PrimarySource;
  index?: number;
}

export function PrimarySourceBlock({ source, index = 0 }: PrimarySourceBlockProps) {
  return (
    <div className="my-8 relative pl-5 border-l-[3px] border-[oklch(0.6_0.25_25/0.5)] bg-[oklch(0.2_0.04_250/0.6)] py-4 pr-5" style={{ animationDelay: `${index * 100}ms` }}>
      <div className="absolute -left-3.5 top-4 w-6 h-6 bg-[oklch(0.18_0.03_250)] border border-[oklch(0.6_0.25_25/0.4)] rounded-full flex items-center justify-center">
        <Scroll className="w-3 h-3 text-[oklch(0.6_0.25_25)]" />
      </div>
      <blockquote className="font-[var(--font-body)] italic text-base md:text-lg leading-relaxed text-[oklch(0.9_0.01_250)] mb-3">"{source.text}"</blockquote>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="text-sm font-[var(--font-sans)] font-semibold text-[oklch(0.6_0.25_25)]">— {source.author}</span>
        <span className="text-xs font-[var(--font-sans)] text-[oklch(0.55_0.02_250)]">{source.document}, {source.year}</span>
        <a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-[var(--font-sans)] text-[oklch(0.6_0.25_25)] hover:underline">
          <ExternalLink className="w-3 h-3" />Read original
        </a>
      </div>
    </div>
  );
}
