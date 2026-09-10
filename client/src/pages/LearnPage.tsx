import { AppShell } from "@/components/AppShell";
import { useProgress } from "@/contexts/ProgressContext";
import { lessons, themes } from "@/lib/lessons";
import { ArrowRight, Check, Printer, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "wouter";

export default function LearnPage() {
  const { completedLessons, isComplete } = useProgress();
  const [query, setQuery] = useState("");
  const [themeId, setThemeId] = useState<number | null>(null);
  const filtered = useMemo(() => lessons.filter((lesson) => {
    const matchesTheme = themeId === null || lesson.themeId === themeId;
    const haystack = `${lesson.title} ${lesson.subtitle} ${lesson.theme} ${lesson.date} ${lesson.location}`.toLowerCase();
    return matchesTheme && haystack.includes(query.trim().toLowerCase());
  }), [query, themeId]);

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="flex items-end justify-between gap-5">
          <div><p className="font-[var(--font-sans)] text-[10px] font-bold uppercase tracking-[.2em] text-[#D95A5F]">The complete journey</p><h1 className="mt-1 text-4xl font-bold tracking-[-.02em] sm:text-5xl">Ninety nights</h1><p className="mt-3 max-w-xl text-sm leading-6 text-[#93A4B5]">Search the whole curriculum or follow one chapter at a time. Progress stays on this browser.</p></div>
          <Link href="/print-pack" className="hidden shrink-0 items-center gap-2 rounded-xl border border-white/15 bg-[#0D2234] px-4 py-3 font-[var(--font-sans)] text-sm font-bold transition hover:border-white/30 active:scale-95 sm:flex"><Printer className="h-4 w-4" /> Print study pack</Link>
        </div>

        <div className="sticky top-16 z-30 -mx-4 mt-7 border-y border-white/10 bg-[#071522]/95 px-4 py-4 backdrop-blur-xl sm:mx-0 sm:rounded-2xl sm:border sm:bg-[#0B1D2C]/95 sm:p-4">
          <label className="flex min-h-12 items-center gap-3 rounded-xl border border-white/10 bg-[#10283B] px-4 focus-within:border-[#6F9CCB]"><Search className="h-5 w-5 text-[#7E93A5]" /><input value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 bg-transparent font-[var(--font-sans)] text-sm text-[#F5EBDD] outline-none placeholder:text-[#718596]" placeholder="Search nights, places, people…" /></label>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1" aria-label="Filter by theme">
            <button onClick={() => setThemeId(null)} className={`min-h-10 shrink-0 rounded-full px-4 font-[var(--font-sans)] text-xs font-bold transition active:scale-95 ${themeId === null ? "bg-[#B83B3F] text-white" : "border border-white/10 bg-[#10283B] text-[#A7B5C1]"}`}>All nights</button>
            {themes.map((theme) => <button key={theme.id} onClick={() => setThemeId(theme.id)} className={`min-h-10 shrink-0 rounded-full px-4 font-[var(--font-sans)] text-xs font-bold transition active:scale-95 ${themeId === theme.id ? "bg-[#B83B3F] text-white" : "border border-white/10 bg-[#10283B] text-[#A7B5C1]"}`}>{theme.id}. {theme.title}</button>)}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between"><p className="font-[var(--font-sans)] text-xs font-semibold text-[#8195A6]">{filtered.length} nights</p><p className="font-[var(--font-sans)] text-xs font-semibold text-[#8195A6]">{completedLessons.length} complete</p></div>

        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          {filtered.map((lesson) => <Link key={lesson.id} href={`/lesson/${lesson.id}`} className="group grid grid-cols-[48px_1fr_auto] items-center gap-3 rounded-2xl border border-white/10 bg-[#0D2234] p-4 transition hover:border-[#B83B3F]/50 hover:bg-[#10283B] active:scale-[.99] sm:grid-cols-[54px_1fr_auto] sm:p-5">
            <span className={`flex h-11 w-11 items-center justify-center rounded-full border-2 text-sm font-bold ${isComplete(lesson.id) ? "border-[#78B087] bg-[#5D986F] text-white" : "border-white/15 bg-[#9D2D35] text-white"}`}>{isComplete(lesson.id) ? <Check className="h-4 w-4" /> : lesson.id}</span>
            <span className="min-w-0"><span className="block font-[var(--font-sans)] text-[9px] font-bold uppercase tracking-[.16em] text-[#D95A5F]">{lesson.theme}</span><strong className="mt-1 block truncate font-[var(--font-display)] text-lg text-[#F5EBDD]">{lesson.title}</strong><span className="mt-1 block truncate text-xs text-[#8195A6]">{lesson.date} · {lesson.location}</span></span>
            <ArrowRight className="h-4 w-4 text-[#D95A5F] transition group-hover:translate-x-1" />
          </Link>)}
        </div>

        {filtered.length === 0 && <div className="mt-8 rounded-2xl border border-dashed border-white/15 p-10 text-center"><p className="text-lg font-bold">No matching nights</p><p className="mt-2 text-sm text-[#8195A6]">Try another person, place, event, or theme.</p></div>}
      </div>
    </AppShell>
  );
}
