"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const nav    = useTranslations("nav");
  const locale = useLocale();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkColor = scrolled ? "#1A160F" : "rgba(26,22,15,0.75)";

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
      style={{
        background: scrolled ? "rgba(247,244,238,0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(26,22,15,0.08)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/">
          <span
            style={{
              fontSize: "1.2rem",
              fontFamily: "var(--font-playfair), serif",
              fontWeight: 900,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#B57422",
            }}
          >
            Krydderi
          </span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: nav("range"),   href: "#sortiment" },
            { label: nav("about"),   href: "#om-os"     },
            { label: nav("contact"), href: "#kontakt"   },
          ].map(({ label, href }) => (
            <a
              key={href}
              href={href}
              style={{ fontSize: "0.875rem", fontWeight: 500, color: linkColor, textDecoration: "none" }}
              onMouseEnter={e => ((e.target as HTMLElement).style.color = "#B57422")}
              onMouseLeave={e => ((e.target as HTMLElement).style.color = linkColor)}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Right: locale toggle + CTAs */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>

          {/* DA / EN toggle */}
          <div
            className="hidden sm:flex"
            style={{
              alignItems: "center",
              borderRadius: 50,
              overflow: "hidden",
              border: "1px solid rgba(26,22,15,0.15)",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.05em",
            }}
          >
            {(["da", "en"] as const).map((loc, i) => (
              <Link
                key={loc}
                href="/"
                locale={loc}
                style={{
                  padding: "5px 11px",
                  background: locale === loc ? "#1A160F" : "transparent",
                  color:      locale === loc ? "#F7F4EE" : "rgba(26,22,15,0.45)",
                  borderRight: i === 0 ? "1px solid rgba(26,22,15,0.12)" : undefined,
                  textDecoration: "none",
                }}
              >
                {loc.toUpperCase()}
              </Link>
            ))}
          </div>

          {/* Log in */}
          <Link
            href="/login"
            className="hidden sm:inline-flex"
            style={{
              alignItems: "center",
              fontSize: "0.875rem",
              fontWeight: 500,
              padding: "0.45rem 1rem",
              borderRadius: 50,
              border: "1px solid rgba(26,22,15,0.20)",
              color: "#1A160F",
              textDecoration: "none",
            }}
          >
            {nav("login")}
          </Link>

          {/* Request account CTA */}
          <a
            href="#kontakt"
            style={{
              display: "inline-flex",
              alignItems: "center",
              fontSize: "0.875rem",
              fontWeight: 600,
              padding: "0.5rem 1.15rem",
              borderRadius: 50,
              background: "#1A160F",
              color: "#F7F4EE",
              textDecoration: "none",
            }}
          >
            {nav("requestAccount")}
          </a>
        </div>
      </div>
    </header>
  );
}
