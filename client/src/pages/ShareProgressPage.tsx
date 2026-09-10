import { AppShell } from "@/components/AppShell";
import { lessons, themes } from "@/lib/lessons";
import { decodeProgress, progressShareText, progressShareUrl } from "@/lib/progress-share";
import { Check, Copy, Share2 } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function ShareProgressPage() {
  const completed = decodeProgress(new URLSearchParams(window.location.search).get("p"));
  const percent = Math.round((completed.length / 90) * 100);
  const next = lessons.find((lesson) => !completed.includes(lesson.id));
  const [shared, setShared] = useState(false);
  const supportsNativeShare = typeof navigator.share === "function";

  const share = async () => {
    const url = progressShareUrl(completed, window.location.origin);
    const text = progressShareText(completed);
    try {
      if (supportsNativeShare) await navigator.share({ title: "Our Revolution Nights journey", text, url });
      else await navigator.clipboard.writeText(`${text} ${url}`);
      setShared(true);
      window.setTimeout(() => setShared(false), 2200);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      await navigator.clipboard.writeText(`${text} ${url}`);
      setShared(true);
    }
  };

  return <AppShell><div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0D2234] p-6 sm:p-10">
      <img src="https://files.manuscdn.com/user_upload_by_module/session_file/90544947/vPeDhwCCQLSKeZoJ.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" /><div className="absolute inset-0 bg-gradient-to-r from-[#071522] via-[#071522]/90 to-[#071522]/55" />
      <div className="relative"><p className="font-[var(--font-sans)] text-[10px] font-bold uppercase tracking-[.2em] text-[#D8B76C]">A family progress card</p><h1 className="mt-2 text-4xl font-bold sm:text-5xl">Our Revolution journey</h1><p className="mt-3 max-w-xl text-sm leading-6 text-[#C8D2D9]">A shareable snapshot from Revolution Nights.</p>
        <div className="mt-8 flex flex-wrap items-end gap-8"><div><strong className="text-6xl text-[#F5EBDD]">{completed.length}</strong><p className="font-[var(--font-sans)] text-xs font-bold uppercase tracking-[.14em] text-[#8FA2B1]">of 90 nights</p></div><div><strong className="text-4xl text-[#D95A5F]">{percent}%</strong><p className="font-[var(--font-sans)] text-xs font-bold uppercase tracking-[.14em] text-[#8FA2B1]">complete</p></div></div>
        <div className="mt-6 h-2 overflow-hidden rounded-full bg-[#17344C]"><div className="h-full rounded-full bg-[#B83B3F]" style={{ width: `${percent}%` }} /></div>
        <button onClick={share} className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#B83B3F] px-5 font-[var(--font-sans)] text-sm font-bold text-white transition active:scale-95">{shared ? <Check className="h-5 w-5" /> : supportsNativeShare ? <Share2 className="h-5 w-5" /> : <Copy className="h-5 w-5" />}{shared ? "Shared" : supportsNativeShare ? "Share this progress" : "Copy progress link"}</button>
      </div>
    </section>

    {next && <section className="mt-5 rounded-2xl border border-white/10 bg-[#0D2234] p-5 sm:p-6"><p className="font-[var(--font-sans)] text-[10px] font-bold uppercase tracking-[.18em] text-[#D95A5F]">Next up</p><h2 className="mt-1 text-2xl font-bold">Night {next.id} · {next.title}</h2><p className="mt-2 text-sm leading-6 text-[#93A4B5]">{next.subtitle}</p></section>}

    <section className="mt-9"><h2 className="text-2xl font-bold">Chapter progress</h2><div className="mt-4 grid gap-3 sm:grid-cols-2">{themes.map((theme) => { const [start, end] = theme.lessons.split("-").map(Number); const count = completed.filter((id) => id >= start && id <= end).length; const total = end - start + 1; return <div key={theme.id} className="rounded-2xl border border-white/10 bg-[#0D2234] p-4"><div className="flex items-center justify-between gap-3"><strong className="truncate text-sm">{theme.id}. {theme.title}</strong><span className="font-[var(--font-sans)] text-xs text-[#93A4B5]">{count}/{total}</span></div><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#17344C]"><div className="h-full rounded-full bg-[#B83B3F]" style={{ width: `${(count / total) * 100}%` }} /></div></div>; })}</div></section>

    <div className="mt-9 rounded-2xl border border-[#D8B76C]/25 bg-[#D8B76C]/10 p-5 text-center"><p className="text-sm leading-6 text-[#D8D0C5]">Want to begin or continue your own 90-night family journey?</p><Link href="/" className="mt-3 inline-flex min-h-11 items-center rounded-xl border border-[#D8B76C]/40 px-4 font-[var(--font-sans)] text-sm font-bold text-[#F5EBDD]">Open Revolution Nights</Link></div>
  </div></AppShell>;
}
