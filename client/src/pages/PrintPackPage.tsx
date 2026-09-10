import { AppShell } from "@/components/AppShell";
import { lessons, themes } from "@/lib/lessons";
import { buildPrintHtml } from "@/lib/print";
import { Check, Printer } from "lucide-react";
import { useMemo, useState } from "react";

export default function PrintPackPage() {
  const [selected, setSelected] = useState<number[]>([1]);
  const chosen = useMemo(() => lessons.filter((lesson) => selected.includes(lesson.id)), [selected]);
  const toggle = (id: number) => setSelected((current) => current.includes(id) ? current.filter((value) => value !== id) : [...current, id]);
  const print = () => {
    if (!chosen.length) return;
    const popup = window.open("", "revolution-nights-print", "width=900,height=700");
    if (!popup) return;
    popup.document.open(); popup.document.write(buildPrintHtml(chosen)); popup.document.close(); popup.focus(); window.setTimeout(() => popup.print(), 250);
  };

  return <AppShell><div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
    <div className="max-w-2xl"><p className="font-[var(--font-sans)] text-[10px] font-bold uppercase tracking-[.2em] text-[#D95A5F]">Family resources</p><h1 className="mt-1 text-4xl font-bold sm:text-5xl">Build a study pack</h1><p className="mt-3 text-sm leading-6 text-[#93A4B5]">Print one night, a custom set, an entire chapter, or the complete journey. The print layout removes navigation and leaves space for family notes.</p></div>
    <div className="mt-7 flex flex-wrap gap-2"><button onClick={() => setSelected(lessons.map((lesson) => lesson.id))} className="min-h-11 rounded-full bg-[#B83B3F] px-4 font-[var(--font-sans)] text-xs font-bold text-white active:scale-95">Select all 90</button><button onClick={() => setSelected([])} className="min-h-11 rounded-full border border-white/10 bg-[#10283B] px-4 font-[var(--font-sans)] text-xs font-bold active:scale-95">Clear</button>{themes.map((theme) => { const [start, end] = theme.lessons.split("-").map(Number); return <button key={theme.id} onClick={() => setSelected(Array.from({ length: end - start + 1 }, (_, index) => start + index))} className="min-h-11 rounded-full border border-white/10 bg-[#10283B] px-4 font-[var(--font-sans)] text-xs font-bold active:scale-95">Theme {theme.id}</button>; })}</div>
    <div className="mt-7 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{lessons.map((lesson) => { const active = selected.includes(lesson.id); return <button key={lesson.id} onClick={() => toggle(lesson.id)} className={`flex min-h-16 items-center gap-3 rounded-xl border p-3 text-left transition active:scale-[.99] ${active ? "border-[#B83B3F] bg-[#9D2D35]/15" : "border-white/10 bg-[#0D2234]"}`}><span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${active ? "bg-[#B83B3F] text-white" : "bg-[#17344C] text-[#A7B5C1]"}`}>{active ? <Check className="h-4 w-4" /> : lesson.id}</span><span className="min-w-0"><span className="block truncate text-sm font-bold">{lesson.title}</span><span className="mt-1 block truncate font-[var(--font-sans)] text-[10px] text-[#8195A6]">{lesson.theme}</span></span></button>; })}</div>
    <div className="sticky bottom-20 z-30 mt-7 rounded-2xl border border-white/10 bg-[#0B1D2C]/95 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl md:bottom-4"><div className="flex items-center justify-between gap-4"><div><strong className="block text-lg">{chosen.length} {chosen.length === 1 ? "night" : "nights"} selected</strong><span className="font-[var(--font-sans)] text-xs text-[#8195A6]">Opens your browser’s print dialog</span></div><button disabled={!chosen.length} onClick={print} className="flex min-h-12 items-center gap-2 rounded-xl bg-[#B83B3F] px-5 font-[var(--font-sans)] text-sm font-bold text-white transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"><Printer className="h-5 w-5" /> Print</button></div></div>
  </div></AppShell>;
}
