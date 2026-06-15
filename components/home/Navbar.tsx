"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const nav = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(13, 6, 3, 0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(196,128,10,0.15)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span
            className="text-xl tracking-widest uppercase font-semibold"
            style={{
              color: scrolled ? "#e8a020" : "#f5e6c8",
              fontFamily: "var(--font-playfair), serif",
              letterSpacing: "0.18em",
            }}
          >
            Krydderi
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: nav("range"),   href: "#sortiment" },
            { label: nav("about"),   href: "#om-os" },
            { label: nav("contact"), href: "#kontakt" },
          ].map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: scrolled ? "#c4a882" : "rgba(245,230,200,0.75)" }}
              onMouseEnter={e => ((e.target as HTMLElement).style.color = "#e8a020")}
              onMouseLeave={e => ((e.target as HTMLElement).style.color = scrolled ? "#c4a882" : "rgba(245,230,200,0.75)")}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Right side: locale toggle + CTAs */}
        <div className="flex items-center gap-3">
          {/* Language toggle */}
          <div
            className="hidden sm:flex items-center rounded-full overflow-hidden text-xs font-semibold select-none"
            style={{ border: "1px solid rgba(196,128,10,0.30)" }}
          >
            {(["da", "en"] as const).map((loc, i) => (
              <Link
                key={loc}
                href={pathname}
                locale={loc}
                className="px-3 py-1.5 transition-colors duration-200"
                style={{
                  background: locale === loc ? "rgba(196,128,10,0.20)" : "transparent",
                  color: locale === loc ? "#e8a020" : "rgba(245,230,200,0.45)",
                  borderRight: i === 0 ? "1px solid rgba(196,128,10,0.30)" : undefined,
                }}
              >
                {loc.toUpperCase()}
              </Link>
            ))}
          </div>

          {/* Log in */}
          <Link
            href="/login"
            className="hidden sm:inline-flex items-center text-sm font-medium px-4 py-2 rounded-full transition-all duration-200"
            style={{
              color: scrolled ? "#c4a882" : "rgba(245,230,200,0.85)",
              border: "1px solid rgba(196,128,10,0.35)",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = "rgba(196,128,10,0.15)";
              (e.currentTarget as HTMLElement).style.borderColor = "#c4800a";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = "";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(196,128,10,0.35)";
            }}
          >
            {nav("login")}
          </Link>

          {/* Request account CTA */}
          <a
            href="#kontakt"
            className="inline-flex items-center text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #c4800a 0%, #e8a020 100%)",
              color: "#0d0603",
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.88")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
          >
            {nav("requestAccount")}
          </a>
        </div>
      </div>
    </header>
  );
}
