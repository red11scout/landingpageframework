import type { ReactNode } from "react";
import { Compass, Home, MapPinned, Milestone, Printer } from "lucide-react";
import { Link, useLocation } from "wouter";
import { PwaStatus } from "./PwaStatus";

const nav = [
  { href: "/", label: "Today", icon: Home },
  { href: "/learn", label: "Learn", icon: MapPinned },
  { href: "/discover", label: "Discover", icon: Compass },
  { href: "/journey", label: "Journey", icon: Milestone },
];

export function AppShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-dvh bg-[#071522] text-[#F5EBDD]">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#071522]/92 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="Revolution Nights home">
            <img src="https://files.manuscdn.com/user_upload_by_module/session_file/90544947/RzamISePlbcgDwAH.png" alt="" className="h-9 w-9 rounded-xl object-cover" />
            <span className="truncate font-[var(--font-sans)] text-xs font-bold tracking-[0.18em] text-[#F5EBDD] sm:text-sm">
              REVOLUTION NIGHTS
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
            {nav.map(({ href, label, icon: Icon }) => {
              const active = href === "/" ? location === "/" : location.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 font-[var(--font-sans)] text-sm font-semibold transition duration-150 active:scale-[0.97] ${
                    active ? "bg-[#A82F37] text-white" : "text-[#93A4B5] hover:bg-white/5 hover:text-[#F5EBDD]"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/print-pack"
            aria-label="Create a printable study pack"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#0D2234] text-[#F5EBDD] transition hover:border-white/30 active:scale-95"
          >
            <Printer className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <main className="pb-24 md:pb-10">{children}</main>

      <nav className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-4 border-t border-white/15 bg-[#091A29]/96 px-[max(0.5rem,env(safe-area-inset-left))] pb-[max(0.45rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl md:hidden" aria-label="Mobile navigation">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? location === "/" : location.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl font-[var(--font-sans)] text-[11px] font-semibold transition active:scale-95 ${active ? "text-[#F5EBDD]" : "text-[#8195A6]"}`}
            >
              <Icon className={`h-5 w-5 ${active ? "fill-[#F5EBDD]/15" : ""}`} />
              {label}
            </Link>
          );
        })}
      </nav>
      <PwaStatus />
    </div>
  );
}
