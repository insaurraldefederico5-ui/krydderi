"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function SiteFooter() {
  const t   = useTranslations("home.footer");
  const nav = useTranslations("nav");

  return (
    <footer
      className="border-t px-5 pt-16 pb-10"
      style={{ background: "#070402", borderColor: "rgba(196,128,10,0.12)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div>
            <p
              className="text-2xl font-bold mb-3 tracking-widest uppercase"
              style={{ fontFamily: "var(--font-playfair), serif", color: "#e8a020", letterSpacing: "0.15em" }}
            >
              Krydderi
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(245,230,200,0.4)" }}>
              {t("tagline")}
            </p>
            <div className="flex gap-3 mt-5">
              <a href="#" className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(245,230,200,0.05)", border: "1px solid rgba(245,230,200,0.08)", color: "rgba(245,230,200,0.5)" }}
                aria-label="LinkedIn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(245,230,200,0.05)", border: "1px solid rgba(245,230,200,0.08)", color: "rgba(245,230,200,0.5)" }}
                aria-label="Instagram">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Portal links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: "rgba(245,230,200,0.3)" }}>
              {t("portalTitle")}
            </p>
            <ul className="space-y-3">
              {([
                [nav("login"),          "/login"    ],
                [nav("requestAccount"), "#kontakt"  ],
                [t("range"),            "#sortiment"],
              ] as [string, string][]).map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "rgba(245,230,200,0.5)" }}
                    onMouseEnter={e => ((e.target as HTMLElement).style.color = "#e8a020")}
                    onMouseLeave={e => ((e.target as HTMLElement).style.color = "rgba(245,230,200,0.5)")}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: "rgba(245,230,200,0.3)" }}>
              {t("contactTitle")}
            </p>
            <ul className="space-y-2 text-sm" style={{ color: "rgba(245,230,200,0.5)" }}>
              <li>Copenhagen, Denmark</li>
              <li>
                <a href="mailto:hej@krydderi.dk" className="hover:text-amber-400 transition-colors">
                  hej@krydderi.dk
                </a>
              </li>
              <li>+45 · · · · · ·</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 text-xs"
          style={{ borderTop: "1px solid rgba(245,230,200,0.07)", color: "rgba(245,230,200,0.25)" }}
        >
          <p>© {new Date().getFullYear()} Krydderi ApS</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-amber-400 transition-colors">{t("privacy")}</a>
            <a href="#" className="hover:text-amber-400 transition-colors">{t("terms")}</a>
            <a href="#" className="hover:text-amber-400 transition-colors">{t("gdpr")}</a>
          </div>
          <div className="flex gap-3">
            <Link href="/" locale="da" className="hover:text-amber-400 transition-colors">DA</Link>
            <span>·</span>
            <Link href="/" locale="en" className="hover:text-amber-400 transition-colors">EN</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
