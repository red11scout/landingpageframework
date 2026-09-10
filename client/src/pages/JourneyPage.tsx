import { AppShell } from "@/components/AppShell";
import { useProgress } from "@/contexts/ProgressContext";
import { lessons, themes } from "@/lib/lessons";
import { progressShareText, progressShareUrl } from "@/lib/progress-share";
import { ArrowRight, Check, Circle, Copy, LockKeyhole, Share2, Trophy } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

const quizTitles = ["Seeds of Discontent", "The Breaking Point", "Declaring Freedom", "The Darkest Hours", "Allies and Enemies", "People of the Revolution", "The War in the South", "Victory", "Building the Republic"];

export default function JourneyPage() {
  const { completedLessons, totalCompleted, percentComplete, isComplete, markComplete, markIncomplete } = useProgress();
  const nextLesson = lessons.find((lesson) => !completedLessons.includes(lesson.id)) ?? lessons[89];
  const [shareComplete, setShareComplete] = useState(false);
  const supportsNativeShare = typeof navigator.share === "function";

  const shareProgress = async () => {
    const url = progressShareUrl(completedLessons, window.location.origin);
    const text = progressShareText(completedLessons);
    try {
      if (supportsNativeShare) await navigator.share({ title: "Our Revolution Nights journey", text, url });
      else await navigator.clipboard.writeText(`${text} ${url}`);
      setShareComplete(true);
      window.setTimeout(() => setShareComplete(false), 2200);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      await navigator.clipboard.writeText(`${text} ${url}`);
      setShareComplete(true);
    }
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0D2234]">
          <img src="https://files.manuscdn.com/user_upload_by_module/session_file/90544947/vPeDhwCCQLSKeZoJ.jpg" alt="An illuminated route across a historical map" className="h-56 w-full object-cover sm:h-72" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#071522]/40 to-[#071522]" />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8"><p className="font-[var(--font-sans)] text-[10px] font-bold uppercase tracking-[.2em] text-[#D8B76C]">Your family journey</p><h1 className="mt-1 text-3xl font-bold sm:text-5xl">{90 - totalCompleted} nights remain</h1><p className="mt-2 max-w-lg text-sm text-[#C4CED6]">Small conversations become a lasting understanding of the American experiment.</p></div>
        </section>

        <section className="-mt-px rounded-b-3xl border border-t-0 border-white/10 bg-[#0D2234] p-5 sm:p-7">
          <div className="flex items-end justify-between"><div><strong className="text-3xl">{totalCompleted}</strong><p className="font-[var(--font-sans)] text-[10px] font-bold uppercase tracking-[.13em] text-[#8195A6]">of 90 complete</p></div><div className="flex h-16 w-16 flex-col items-center justify-center rounded-full bg-[#9D2D35] text-white"><strong className="text-lg">{percentComplete}%</strong><span className="font-[var(--font-sans)] text-[8px] uppercase tracking-[.12em]">Journey</span></div></div>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#17344C]"><div className="h-full rounded-full bg-[#B83B3F] transition-all" style={{ width: `${percentComplete}%` }} /></div>
          <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/10 pt-5"><div className="min-w-0"><p className="font-[var(--font-sans)] text-[9px] font-bold uppercase tracking-[.15em] text-[#D95A5F]">Up next</p><p className="mt-1 truncate text-sm font-bold">Night {nextLesson.id} · {nextLesson.title}</p></div><div className="flex shrink-0 items-center gap-2"><button onClick={shareProgress} className="flex min-h-11 items-center gap-2 rounded-xl border border-white/15 px-3 font-[var(--font-sans)] text-xs font-bold text-[#E1E7EB] transition active:scale-95" aria-label="Share family progress" aria-live="polite">{shareComplete ? <Check className="h-4 w-4 text-[#78B087]" /> : supportsNativeShare ? <Share2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}<span className="hidden sm:inline">{shareComplete ? "Shared" : "Share"}</span></button><Link href={`/lesson/${nextLesson.id}`} className="flex min-h-11 items-center gap-2 rounded-xl bg-[#B83B3F] px-4 font-[var(--font-sans)] text-xs font-bold text-white transition active:scale-95">Continue <ArrowRight className="h-4 w-4" /></Link></div></div>
        </section>

        <section className="mt-10"><p className="font-[var(--font-sans)] text-[10px] font-bold uppercase tracking-[.18em] text-[#D95A5F]">Ten chapters</p><h2 className="mt-1 text-3xl font-bold">Milestones</h2><p className="mt-2 text-sm leading-6 text-[#93A4B5]">Open a chapter to review its nights or update your family’s progress directly.</p>
          <div className="mt-5 space-y-3">{themes.map((theme) => { const [start, end] = theme.lessons.split("-").map(Number); const themeLessons = lessons.filter((lesson) => lesson.id >= start && lesson.id <= end); const done = themeLessons.filter((lesson) => isComplete(lesson.id)).length; return (
            <details key={theme.id} className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0D2234] open:border-[#B83B3F]/35">
              <summary className="flex min-h-20 list-none items-center gap-4 p-4 transition hover:bg-white/[.025] sm:p-5"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#9D2D35] text-sm font-bold text-white">{theme.id}</span><span className="min-w-0 flex-1"><strong className="block truncate text-lg">{theme.title}</strong><span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-[#17344C]"><span className="block h-full rounded-full bg-[#B83B3F]" style={{ width: `${(done / themeLessons.length) * 100}%` }} /></span></span><span className="font-[var(--font-sans)] text-xs text-[#8195A6]">{done}/{themeLessons.length}</span><ArrowRight className="h-4 w-4 text-[#8195A6] transition group-open:rotate-90" /></summary>
              <div className="border-t border-white/10 px-4 py-2 sm:px-5">{themeLessons.map((lesson) => <div key={lesson.id} className="flex min-h-12 items-center gap-3 border-b border-white/5 last:border-0"><button onClick={() => isComplete(lesson.id) ? markIncomplete(lesson.id) : markComplete(lesson.id)} aria-label={`${isComplete(lesson.id) ? "Mark incomplete" : "Mark complete"}: ${lesson.title}`} className="shrink-0 text-[#D95A5F]">{isComplete(lesson.id) ? <Check className="h-5 w-5" /> : <Circle className="h-5 w-5 text-[#60798D]" />}</button><Link href={`/lesson/${lesson.id}`} className={`min-w-0 flex-1 truncate font-[var(--font-sans)] text-sm ${isComplete(lesson.id) ? "text-[#718596] line-through" : "text-[#D5DEE4]"}`}>{lesson.id}. {lesson.title}</Link></div>)}</div>
            </details>); })}</div>
        </section>

        <section className="mt-12"><div className="flex items-center gap-3"><Trophy className="h-6 w-6 text-[#D8B76C]" /><div><p className="font-[var(--font-sans)] text-[10px] font-bold uppercase tracking-[.18em] text-[#D95A5F]">Knowledge checks</p><h2 className="text-3xl font-bold">Quiz nights</h2></div></div><p className="mt-3 max-w-2xl text-sm leading-6 text-[#93A4B5]">Each quiz opens after seven of its ten connected nights are complete.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{quizTitles.map((title, index) => { const set = index + 1; const start = index * 10 + 1; const done = completedLessons.filter((id) => id >= start && id <= start + 9).length; const unlocked = done >= 7; const body = <><span className={`flex h-10 w-10 items-center justify-center rounded-full ${unlocked ? "bg-[#9D2D35]" : "bg-[#17344C]"}`}>{unlocked ? set : <LockKeyhole className="h-4 w-4" />}</span><span><span className="block font-[var(--font-sans)] text-[9px] font-bold uppercase tracking-[.15em] text-[#D95A5F]">Quiz {set}</span><strong className="mt-1 block text-sm">{title}</strong><span className="mt-1 block font-[var(--font-sans)] text-xs text-[#8195A6]">{unlocked ? "Ready to play" : `${done}/7 nights required`}</span></span></>; return unlocked ? <Link key={set} href={`/quiz/${set}`} className="flex gap-4 rounded-2xl border border-white/10 bg-[#0D2234] p-4 transition hover:border-[#B83B3F]/50 active:scale-[.99]">{body}</Link> : <div key={set} className="flex gap-4 rounded-2xl border border-white/10 bg-[#0D2234] p-4 opacity-60">{body}</div>; })}</div>
        </section>
      </div>
    </AppShell>
  );
}
