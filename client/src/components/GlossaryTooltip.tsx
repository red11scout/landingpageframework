import { useState, useRef, useEffect } from "react";
import { glossary, GlossaryTerm } from "@/lib/glossary";

interface GlossaryTooltipProps {
  text: string;
}

// Renders text with glossary terms highlighted and tappable
export function NarrativeWithGlossary({ text }: GlossaryTooltipProps) {
  const [activeTerm, setActiveTerm] = useState<GlossaryTerm | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ top: number; left: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Find glossary terms in this paragraph
  const termMatches: { term: GlossaryTerm; start: number; end: number }[] = [];
  const lowerText = text.toLowerCase();

  for (const entry of glossary) {
    const termLower = entry.term.toLowerCase();
    let searchFrom = 0;
    // Only find first occurrence to avoid over-highlighting
    const idx = lowerText.indexOf(termLower, searchFrom);
    if (idx !== -1) {
      const before = idx === 0 || /[\s.,;:!?'"()\-—]/.test(text[idx - 1]);
      const after = idx + termLower.length >= text.length || /[\s.,;:!?'"()\-—]/.test(text[idx + termLower.length]);
      if (before && after) {
        // Check no overlap with existing matches
        const overlaps = termMatches.some(m => 
          (idx >= m.start && idx < m.end) || (idx + termLower.length > m.start && idx + termLower.length <= m.end)
        );
        if (!overlaps) {
          termMatches.push({ term: entry, start: idx, end: idx + termLower.length });
        }
      }
    }
  }

  termMatches.sort((a, b) => a.start - b.start);

  const handleTermClick = (term: GlossaryTerm, e: React.MouseEvent) => {
    if (activeTerm?.term === term.term) {
      setActiveTerm(null);
      setTooltipPos(null);
      return;
    }
    setActiveTerm(term);
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (containerRect) {
      setTooltipPos({
        top: rect.bottom - containerRect.top + 4,
        left: Math.max(0, Math.min(rect.left - containerRect.left, containerRect.width - 280)),
      });
    }
  };

  // Close tooltip on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActiveTerm(null);
        setTooltipPos(null);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  // Build segments
  const segments: { text: string; term?: GlossaryTerm }[] = [];
  let lastEnd = 0;
  for (const match of termMatches) {
    if (match.start > lastEnd) {
      segments.push({ text: text.slice(lastEnd, match.start) });
    }
    segments.push({ text: text.slice(match.start, match.end), term: match.term });
    lastEnd = match.end;
  }
  if (lastEnd < text.length) {
    segments.push({ text: text.slice(lastEnd) });
  }

  if (termMatches.length === 0) {
    return <span>{text}</span>;
  }

  return (
    <span ref={containerRef} className="relative">
      {segments.map((seg, i) => 
        seg.term ? (
          <span
            key={i}
            onClick={(e) => handleTermClick(seg.term!, e)}
            className="underline decoration-dotted decoration-[oklch(0.55_0.2_25/0.4)] underline-offset-2 cursor-pointer hover:decoration-[oklch(0.6_0.25_25)] hover:text-[oklch(0.6_0.25_25)] transition-colors"
          >
            {seg.text}
          </span>
        ) : (
          <span key={i}>{seg.text}</span>
        )
      )}
      {/* Tooltip */}
      {activeTerm && tooltipPos && (
        <div
          className="absolute z-50 w-72 p-3 bg-[oklch(0.2_0.04_250)] border border-[oklch(0.6_0.25_25/0.3)] shadow-xl border-[oklch(0.55_0.2_25/0.3)] animate-in fade-in slide-in-from-top-1 duration-200"
          style={{ top: tooltipPos.top, left: tooltipPos.left }}
          onClick={(e) => e.stopPropagation()}
        >
          <p className="font-[var(--font-display)] font-bold text-sm text-[oklch(0.6_0.25_25)] mb-1">{activeTerm.term}</p>
          <p className="text-xs font-[var(--font-body)] leading-relaxed">{activeTerm.definition}</p>
          {activeTerm.example && (
            <p className="text-xs font-[var(--font-body)] italic text-muted-foreground mt-1.5">"{activeTerm.example}"</p>
          )}
        </div>
      )}
    </span>
  );
}
