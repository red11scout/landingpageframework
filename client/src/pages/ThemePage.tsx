import { AppShell } from "@/components/AppShell";
import { useProgress } from "@/contexts/ProgressContext";
import { lessons, themes } from "@/lib/lessons";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Link, useParams } from "wouter";

export default function ThemePage() {
  const params = useParams<{ id: string }>();
  const themeId = Number.parseInt(params.id || "1", 10);
  const theme = themes.find((item) => item.id === themeId);
  const themeLessons = lessons.filter((lesson) => lesson.themeId === themeId);
  const { isComplete } = useProgress();

  if (!theme) return <AppShell><div className="flex min-h-[70dvh] items-center justify-center"><p className="text-xl">Theme not found.</p></div></AppShell>;
  const done = themeLessons.filter((lesson) => isComplete(lesson.id)).length;

  return <AppShell><div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
    <Link href="/learn" className="inline-flex min-h-11 items-center gap-2 font-[var(--font-sans)] text-sm font-semibold text-[#93A4B5] transition hover:text-white"><ArrowLeft className="h-4 w-4" /> All nights</Link>
    <section className="relative mt-3 overflow-hidden rounded-3xl border border-white/10 bg-[#0D2234] px-5 py-10 sm:px-8 sm:py-14">
      <img src="/manus-storage/revolution-hero_66c81fc0.jpg" alt="" className="absolute inset-y-0 right-0 h-full w-2/3 object-cover object-right opacity-55" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#071522_0%,rgba(7,21,34,.92)_50%,rgba(7,21,34,.35)_100%)]" />
      <div className="relative max-w-xl"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#9D2D35] text-sm font-bold text-white">{theme.id}</span><p className="mt-6 font-[var(--font-sans)] text-[10px] font-bold uppercase tracking-[.18em] text-[#D95A5F]">Nights {theme.lessons}</p><h1 className="mt-1 text-4xl font-bold leading-tight sm:text-5xl">{theme.title}</h1><p className="mt-3 text-lg italic text-[#D5CABC]">{theme.subtitle}</p><div className="mt-6 flex max-w-sm items-center gap-3"><div className="h-2 flex-1 overflow-hidden rounded-full bg-[#17344C]"><div className="h-full rounded-full bg-[#B83B3F]" style={{ width: `${(done / themeLessons.length) * 100}%` }} /></div><span className="font-[var(--font-sans)] text-xs font-bold text-[#C1CDD5]">{done}/{themeLessons.length}</span></div></div>
    </section>

    <section className="mt-6 grid gap-3 lg:grid-cols-2">{themeLessons.map((lesson) => <Link key={lesson.id} href={`/lesson/${lesson.id}`} className="group grid min-h-24 grid-cols-[48px_1fr_auto] items-center gap-3 rounded-2xl border border-white/10 bg-[#0D2234] p-4 transition hover:border-[#B83B3F]/50 active:scale-[.99] sm:p-5"><span className={`flex h-11 w-11 items-center justify-center rounded-full border-2 text-sm font-bold ${isComplete(lesson.id) ? "border-[#78B087] bg-[#5D986F]" : "border-white/15 bg-[#9D2D35]"}`}>{isComplete(lesson.id) ? <Check className="h-4 w-4" /> : lesson.id}</span><span className="min-w-0"><strong className="block truncate text-lg">{lesson.title}</strong><span className="mt-1 block truncate text-sm italic text-[#A4B2BD]">{lesson.subtitle}</span><span className="mt-2 block truncate font-[var(--font-sans)] text-[10px] text-[#718596]">{lesson.date} · {lesson.location}</span></span><ArrowRight className="h-4 w-4 text-[#D95A5F] transition group-hover:translate-x-1" /></Link>)}</section>
  </div></AppShell>;
}
