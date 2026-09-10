import { AppShell } from "@/components/AppShell";
import { useProgress } from "@/contexts/ProgressContext";
import { lessons, themes, timelineEvents } from "@/lib/lessons";
import { ArrowRight, BookOpen, Check, Clock3, Sparkles } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { completedLessons, totalCompleted, percentComplete } = useProgress();
  const nextLesson = lessons.find((lesson) => !completedLessons.includes(lesson.id)) ?? lessons[89];
  const event = timelineEvents[new Date().getDate() % timelineEvents.length];

  return (
    <AppShell>
      <section className="relative min-h-[610px] overflow-hidden border-b border-white/10 sm:min-h-[650px] lg:min-h-[700px]">
        <picture className="absolute inset-0 block h-full w-full">
          <source media="(max-width: 699px)" srcSet="https://files.manuscdn.com/user_upload_by_module/session_file/90544947/cjgTPMYRaCxnlHwm.jpg" />
          <img src="https://files.manuscdn.com/user_upload_by_module/session_file/90544947/JQjVHLGaEJfAbyxp.jpg" alt="A family reading a Revolutionary-era letter together" className="h-full w-full object-cover object-center" />
        </picture>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,21,34,.03)_0%,rgba(7,21,34,.42)_53%,#071522_100%)] lg:bg-[linear-gradient(90deg,rgba(7,21,34,.96)_0%,rgba(7,21,34,.68)_38%,rgba(7,21,34,.1)_78%)]" />
        <div className="relative mx-auto flex min-h-[610px] max-w-6xl items-end px-5 pb-16 pt-20 sm:min-h-[650px] sm:px-8 lg:min-h-[700px] lg:items-center lg:pb-0">
          <div className="max-w-xl">
            <p className="mb-3 font-[var(--font-sans)] text-xs font-bold uppercase tracking-[0.22em] text-[#D8B76C]">90 nights with history</p>
            <h1 className="text-5xl font-bold leading-[.98] tracking-[-.03em] text-[#F5EBDD] sm:text-6xl lg:text-7xl">The Revolution</h1>
            <p className="mt-4 max-w-lg text-base italic leading-7 text-[#E0D5C6] sm:text-lg">Read together. Explore together. Talk together.</p>
            <p className="mt-4 hidden max-w-lg text-sm leading-7 text-[#AFC0CE] sm:block">The war started on a bridge. Farmers held muskets. The world changed. Ninety nights. One revolution. Your family’s journey begins.</p>
            <Link href={`/lesson/${nextLesson.id}`} className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#B83B3F] px-5 py-3 font-[var(--font-sans)] text-sm font-bold text-white shadow-xl shadow-black/25 transition duration-150 hover:bg-[#C6464B] active:scale-[.97]">
              <BookOpen className="h-5 w-5" />{totalCompleted ? `Continue Night ${nextLesson.id}` : "Begin Night One"}
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <section aria-label="Course summary" className="grid grid-cols-3 divide-x divide-white/10 text-center">
          {[{ value: "90", label: "Nights", color: "text-[#D95A5F]" }, { value: "15", label: "Minutes each", color: "text-[#F5EBDD]" }, { value: "10", label: "Themes", color: "text-[#78A6D3]" }].map((stat) => (
            <div key={stat.label} className="px-2"><div className={`text-3xl font-bold sm:text-4xl ${stat.color}`}>{stat.value}</div><div className="mt-1 font-[var(--font-sans)] text-[10px] font-semibold uppercase tracking-[.12em] text-[#8195A6] sm:text-xs">{stat.label}</div></div>
          ))}
        </section>

        {totalCompleted > 0 && <section className="mt-9 rounded-2xl border border-white/10 bg-[#0D2234] p-5 shadow-xl shadow-black/15 sm:p-6">
          <div className="flex items-end justify-between gap-4"><div><p className="font-[var(--font-sans)] text-[10px] font-bold uppercase tracking-[.18em] text-[#D8B76C]">Your family journey</p><h2 className="mt-1 text-xl font-bold">{totalCompleted} nights complete</h2></div><strong className="font-[var(--font-sans)] text-2xl text-[#D8B76C]">{percentComplete}%</strong></div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#17344C]"><div className="h-full rounded-full bg-[#B83B3F]" style={{ width: `${percentComplete}%` }} /></div>
          <Link href="/journey" className="mt-4 inline-flex items-center gap-1.5 font-[var(--font-sans)] text-sm font-bold text-[#D95A5F]">View the whole journey <ArrowRight className="h-4 w-4" /></Link>
        </section>}

        <section className="mt-12 sm:mt-16">
          <div className="mb-4 flex items-end justify-between gap-4"><div><p className="font-[var(--font-sans)] text-[10px] font-bold uppercase tracking-[.18em] text-[#D95A5F]">Today in history</p><h2 className="mt-1 text-2xl font-bold sm:text-3xl">{event.title}</h2></div><Clock3 className="h-6 w-6 shrink-0 text-[#6F9CCB]" /></div>
          <Link href={`/lesson/${event.lessonId}`} className="group grid overflow-hidden rounded-2xl border border-white/10 bg-[#0D2234] shadow-xl shadow-black/15 transition hover:border-[#B83B3F]/50 active:scale-[.99] sm:grid-cols-[150px_1fr]">
            <div className="flex min-h-28 flex-col justify-center bg-[#9D2D35] p-5"><strong className="text-3xl text-white">{event.year}</strong><span className="mt-1 font-[var(--font-sans)] text-[10px] font-bold uppercase tracking-[.12em] text-white/70">A turning point</span></div>
            <div className="flex flex-col justify-center p-5 sm:p-6"><p className="text-sm leading-6 text-[#D7CCBD]">Open the night connected to this moment and see why it changed the American story.</p><span className="mt-3 inline-flex items-center gap-1 font-[var(--font-sans)] text-sm font-bold">Read Night {event.lessonId} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span></div>
          </Link>
        </section>

        <section className="mt-14 sm:mt-20">
          <p className="font-[var(--font-sans)] text-[10px] font-bold uppercase tracking-[.18em] text-[#D95A5F]">The curriculum</p><h2 className="mt-1 text-3xl font-bold">Ten themes. One story.</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-[#93A4B5]">Follow the Revolution from the first disputed taxes to the experiment of a new republic.</p>
          <div className="-mx-4 mt-6 flex snap-x gap-3 overflow-x-auto px-4 pb-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
            {themes.map((theme) => { const [start, end] = theme.lessons.split("-").map(Number); const done = completedLessons.filter((id) => id >= start && id <= end).length; return (
              <Link key={theme.id} href={`/theme/${theme.id}`} className="group flex min-h-56 w-[82vw] max-w-[310px] shrink-0 snap-center flex-col rounded-2xl border border-white/10 bg-[#0D2234] p-5 transition hover:-translate-y-1 hover:border-[#B83B3F]/50 sm:w-auto sm:max-w-none">
                <div className="flex items-center justify-between"><span className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/15 text-sm font-bold text-white ${done === end - start + 1 ? "bg-[#5D986F]" : "bg-[#9D2D35]"}`}>{done === end - start + 1 ? <Check className="h-4 w-4" /> : theme.id}</span><span className="font-[var(--font-sans)] text-[10px] font-bold uppercase tracking-[.14em] text-[#8195A6]">Nights {theme.lessons}</span></div>
                <h3 className="mt-5 text-xl font-bold">{theme.title}</h3><p className="mt-2 flex-1 text-sm italic leading-6 text-[#93A4B5]">{theme.subtitle}</p><div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4"><span className="font-[var(--font-sans)] text-xs font-semibold text-[#C8D2D9]">{done} complete</span><ArrowRight className="h-4 w-4 text-[#D95A5F] transition group-hover:translate-x-1" /></div>
              </Link>); })}
          </div>
        </section>

        <section className="mt-14 rounded-3xl border border-white/10 bg-[#10283B] p-6 sm:mt-20 sm:p-8">
          <p className="font-[var(--font-sans)] text-[10px] font-bold uppercase tracking-[.18em] text-[#D8B76C]">How each night works</p><h2 className="mt-1 text-2xl font-bold sm:text-3xl">A family ritual in three acts</h2>
          <div className="mt-7 grid gap-6 md:grid-cols-3">{[{ n: 1, title: "Read together", body: "A short true story, written to be heard aloud." }, { n: 2, title: "Explore together", body: "Key facts, places, people, and original words." }, { n: 3, title: "Talk together", body: "Four questions with no wrong answers." }].map((step) => <div key={step.n} className="flex gap-4 md:block"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#9D2D35] font-bold text-white">{step.n}</span><div><h3 className="text-lg font-bold md:mt-4">{step.title}</h3><p className="mt-1 text-sm leading-6 text-[#93A4B5]">{step.body}</p></div></div>)}</div>
          <div className="mt-7 flex items-center gap-2 rounded-xl bg-black/15 p-4 text-sm text-[#C9D3DB]"><Sparkles className="h-5 w-5 shrink-0 text-[#D8B76C]" /> Start anywhere. Journey will always guide you to the next unfinished night.</div>
        </section>
      </div>
    </AppShell>
  );
}
