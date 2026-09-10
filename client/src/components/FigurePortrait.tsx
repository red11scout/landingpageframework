import { UserRound } from "lucide-react";
import { useState } from "react";

export function FigurePortrait({ name, src, className = "", imageClassName = "" }: { name: string; src?: string; className?: string; imageClassName?: string }) {
  const [failed, setFailed] = useState(false);
  const initials = name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("");
  const available = Boolean(src && !src.startsWith("/manus-storage/") && !failed);

  return <div className={`relative overflow-hidden bg-[#10283B] ${className}`}>
    {available ? <img src={src} alt={`Portrait of ${name}`} onError={() => setFailed(true)} className={`h-full w-full object-cover object-top ${imageClassName}`} /> : <div className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_28%,#25465E_0%,#10283B_55%,#091A29_100%)] text-[#D8B76C]"><UserRound className="h-14 w-14 opacity-30" strokeWidth={1.25} /><span className="mt-3 font-[var(--font-display)] text-2xl font-bold tracking-[.12em]">{initials}</span><span className="mt-1 max-w-[85%] truncate font-[var(--font-sans)] text-[9px] font-bold uppercase tracking-[.15em] text-[#93A4B5]">{name}</span></div>}
  </div>;
}
