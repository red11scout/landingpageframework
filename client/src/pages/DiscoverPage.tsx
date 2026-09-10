import { AppShell } from "@/components/AppShell";
import { figures } from "@/lib/figures";
import { glossary } from "@/lib/glossary";
import { lessons, timelineEvents } from "@/lib/lessons";
import { ArrowRight, BookType, Compass, Map as MapIcon, Search, Share2, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "wouter";

type Section = "timeline" | "places" | "people" | "words" | "connections";

const sections: { id: Section; label: string; icon: typeof Compass }[] = [
  { id: "timeline", label: "Timeline", icon: Compass },
  { id: "places", label: "Places", icon: MapIcon },
  { id: "people", label: "People", icon: Users },
  { id: "words", label: "Words", icon: BookType },
  { id: "connections", label: "Connections", icon: Share2 },
];

export default function DiscoverPage() {
  const [section, setSection] = useState<Section>("timeline");
  const [query, setQuery] = useState("");
  const needle = query.trim().toLowerCase();
  const places = useMemo(() => {
    const grouped = new globalThis.Map<string, number[]>();
    lessons.forEach((lesson) => grouped.set(lesson.location, [...(grouped.get(lesson.location) ?? []), lesson.id]));
    return Array.from(grouped.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, []);

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0B1D2C] px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
          <img src="/manus-storage/discover-atlas_e42bd695.jpg" alt="A colonial map with compass and archival notes" className="absolute inset-y-0 right-0 h-full w-[74%] object-cover object-center" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#071522_0%,rgba(7,21,34,.9)_43%,rgba(7,21,34,.08)_100%)]" />
          <div className="relative max-w-xl"><p className="font-[var(--font-sans)] text-[10px] font-bold uppercase tracking-[.2em] text-[#D8B76C]">The field atlas</p><h1 className="mt-2 text-4xl font-bold leading-tight tracking-[-.02em] sm:text-5xl">Discover the connections</h1><p className="mt-3 max-w-md text-sm leading-6 text-[#D3C8BA] sm:text-base">Trace the people, places, words, and turning points behind every night.</p></div>
        </section>

        <div className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0" role="tablist" aria-label="Discovery sections">
          {sections.map(({ id, label, icon: Icon }) => <button key={id} role="tab" aria-selected={section === id} onClick={() => { setSection(id); setQuery(""); }} className={`flex min-h-11 shrink-0 items-center gap-2 rounded-full px-4 font-[var(--font-sans)] text-xs font-bold transition active:scale-95 ${section === id ? "bg-[#B83B3F] text-white" : "border border-white/10 bg-[#10283B] text-[#A4B4C0]"}`}><Icon className="h-4 w-4" />{label}</button>)}
        </div>

        <label className="mt-4 flex min-h-12 items-center gap-3 rounded-xl border border-white/10 bg-[#10283B] px-4 focus-within:border-[#6F9CCB]"><Search className="h-5 w-5 text-[#7E93A5]" /><input value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 bg-transparent font-[var(--font-sans)] text-sm outline-none placeholder:text-[#718596]" placeholder={`Search ${section}…`} /></label>

        <div className="mt-5">
          {section === "timeline" && <div className="relative space-y-3 pl-8 before:absolute before:bottom-0 before:left-2 before:top-0 before:w-px before:bg-white/15">
            {timelineEvents.filter((event) => `${event.year} ${event.title}`.toLowerCase().includes(needle)).map((event) => <Link key={`${event.year}-${event.lessonId}`} href={`/lesson/${event.lessonId}`} className="group relative block rounded-2xl border border-white/10 bg-[#0D2234] p-5 transition hover:border-[#B83B3F]/50 active:scale-[.99]"><span className="absolute -left-[29px] top-6 h-3 w-3 rounded-full border-2 border-[#F5EBDD] bg-[#B83B3F]" /><span className="font-[var(--font-sans)] text-xs font-bold text-[#D95A5F]">{event.year}</span><h2 className="mt-1 text-xl font-bold">{event.title}</h2><span className="mt-3 inline-flex items-center gap-1 font-[var(--font-sans)] text-xs font-bold text-[#D95A5F]">Open Night {event.lessonId} <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" /></span></Link>)}
          </div>}

          {section === "places" && <div className="grid gap-3 sm:grid-cols-2">{places.filter(([place]) => place.toLowerCase().includes(needle)).map(([place, ids]) => <Link key={place} href={`/lesson/${ids[0]}`} className="group rounded-2xl border border-white/10 bg-[#0D2234] p-5 transition hover:border-[#6F9CCB]/50 active:scale-[.99]"><div className="flex items-center justify-between"><MapIcon className="h-5 w-5 text-[#6F9CCB]" /><span className="font-[var(--font-sans)] text-xs text-[#8195A6]">{ids.length} {ids.length === 1 ? "night" : "nights"}</span></div><h2 className="mt-5 text-xl font-bold">{place}</h2><p className="mt-2 text-sm text-[#93A4B5]">First appears in Night {ids[0]}</p></Link>)}</div>}

          {section === "people" && <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{figures.filter((figure) => `${figure.name} ${figure.role}`.toLowerCase().includes(needle)).map((figure) => <Link key={figure.id} href={`/figure/${figure.id}`} className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0D2234] transition hover:border-[#B83B3F]/50 active:scale-[.99]"><div className="aspect-[16/9] overflow-hidden bg-[#10283B]"><img src={figure.portrait} alt={figure.name} className="h-full w-full object-cover object-top transition duration-300 group-hover:scale-[1.03]" /></div><div className="p-5"><h2 className="text-xl font-bold">{figure.name}</h2><p className="mt-2 text-xs leading-5 text-[#93A4B5]">{figure.role}</p></div></Link>)}</div>}

          {section === "words" && <div className="grid gap-3 sm:grid-cols-2">{glossary.filter((item) => `${item.term} ${item.definition}`.toLowerCase().includes(needle)).map((item) => <article key={item.term} className="rounded-2xl border border-white/10 bg-[#0D2234] p-5"><h2 className="text-xl font-bold capitalize text-[#F5EBDD]">{item.term}</h2><p className="mt-2 text-sm leading-6 text-[#B5C1CA]">{item.definition}</p>{item.example && <blockquote className="mt-4 border-l-2 border-[#B83B3F] pl-3 text-xs italic leading-5 text-[#8195A6]">{item.example}</blockquote>}</article>)}</div>}

          {section === "connections" && <div className="grid gap-3 sm:grid-cols-2">{lessons.filter((lesson) => lesson.connections.length > 0 && `${lesson.title} ${lesson.theme}`.toLowerCase().includes(needle)).map((lesson) => <article key={lesson.id} className="rounded-2xl border border-white/10 bg-[#0D2234] p-5"><Link href={`/lesson/${lesson.id}`} className="font-[var(--font-sans)] text-[10px] font-bold uppercase tracking-[.16em] text-[#D95A5F]">Night {lesson.id}</Link><h2 className="mt-1 text-xl font-bold">{lesson.title}</h2><div className="mt-4 flex flex-wrap gap-2">{lesson.connections.map((id) => { const connected = lessons[id - 1]; return <Link key={id} href={`/lesson/${id}`} className="rounded-full border border-white/10 bg-[#10283B] px-3 py-2 font-[var(--font-sans)] text-xs font-semibold text-[#C9D3DB] transition hover:border-[#B83B3F] hover:text-white">{id}. {connected?.title}</Link>; })}</div></article>)}</div>}
        </div>
      </div>
    </AppShell>
  );
}
