/**
 * Illuminated Scholarly Atlas: the masthead is compact, legible, and shared by every research instrument.
 */
import { useTheme } from "@/contexts/ThemeContext";
import { ExternalLink, Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";

const originalAtlas = "https://genesisnations-6t6jlssk.manus.space";

const navItems = [
  { label: "Atlas", href: "/", internal: true },
  { label: "Table of Nations", href: `${originalAtlas}/nations` },
  { label: "Censuses", href: `${originalAtlas}/census` },
  { label: "Levite Allocator", href: `${originalAtlas}/levites` },
  { label: "Temple Atlas", href: "/temples", internal: true },
  { label: "Revelation", href: `${originalAtlas}/revelation` },
  { label: "Sources", href: "/sources", internal: true },
];

export function SiteHeader() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="masthead">
      <div className="masthead__inner">
        <Link href="/" className="brand-lockup" onClick={() => setOpen(false)}>
          <img
            className="brand-mark"
            src="/manus-storage/genesis-nations-emblem-v2_57479104.png"
            alt=""
            width="42"
            height="42"
          />
          <span className="brand-copy">
            <strong>Genesis Nations</strong>
            <span>An Atlas of Scripture & Sacred Geography</span>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) =>
            item.internal ? (
              <Link
                key={item.label}
                href={item.href}
                className={`nav-link ${location === item.href ? "is-active" : ""}`}
              >
                {item.label}
              </Link>
            ) : (
              <a className="nav-link nav-link--external" href={item.href} key={item.label}>
                {item.label}
                <ExternalLink aria-hidden="true" size={10} />
                <span className="sr-only"> (opens the original Genesis Nations atlas)</span>
              </a>
            ),
          )}
        </nav>

        <div className="masthead__actions">
          <button
            className="icon-button"
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "night" : "day"} mode`}
            title={`Switch to ${theme === "light" ? "night" : "day"} mode`}
          >
            {theme === "light" ? <Moon size={17} /> : <Sun size={17} />}
          </button>
          <button
            className="icon-button mobile-menu-button"
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation" : "Open navigation"}
          >
            {open ? <X size={18} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
          {navItems.map((item) =>
            item.internal ? (
              <Link
                key={item.label}
                href={item.href}
                className={`mobile-nav__link ${location === item.href ? "is-active" : ""}`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ) : (
              <a className="mobile-nav__link" href={item.href} key={item.label}>
                {item.label}
                <ExternalLink aria-hidden="true" size={12} />
              </a>
            ),
          )}
        </nav>
      )}
    </header>
  );
}
