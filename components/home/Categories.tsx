"use client";

import { useTranslations, useLocale } from "next-intl";

const EXAMPLES: Record<string, Record<string, string>> = {
  da: {
    whole_spices:  "Kardemomme · Peber · Kanel",
    ground_spices: "Gurkemeje · Paprika · Spidskommen",
    herbs:         "Timian · Rosmarin · Laurbær",
    blends:        "Nordic Dukkah · Ras el Hanout",
    organic:       "EU Øko · Fairtrade · Kosher",
  },
  en: {
    whole_spices:  "Cardamom · Pepper · Cinnamon",
    ground_spices: "Turmeric · Paprika · Cumin",
    herbs:         "Thyme · Rosemary · Bay Leaf",
    blends:        "Nordic Dukkah · Ras el Hanout",
    organic:       "EU Organic · Fairtrade · Kosher",
  },
};

const CATS = [
  { key: "whole_spices",  accent: "#B57422", dot: "●" },
  { key: "ground_spices", accent: "#C88020", dot: "●" },
  { key: "herbs",         accent: "#445E38", dot: "●" },
  { key: "blends",        accent: "#5E4A90", dot: "●" },
  { key: "organic",       accent: "#3A6830", dot: "●" },
] as const;

export function Categories() {
  const t      = useTranslations("home");
  const locale = useLocale();
  const ex     = EXAMPLES[locale] ?? EXAMPLES.da;

  return (
    <section id="sortiment" className="py-24 px-5" style={{ background: "#F7F4EE" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 reveal">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#B57422" }}>
            {t("range.title")}
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold"
            style={{ fontFamily: "var(--font-playfair), serif", color: "#1A160F" }}
          >
            {t("categories.subtitle")}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 reveal">
          {CATS.map(({ key, accent }, i) => (
            <div
              key={key}
              className={`relative rounded-2xl overflow-hidden p-8 group cursor-default transition-all duration-300 hover:-translate-y-1 ${i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}`}
              style={{
                background: "#F0EBE1",
                border: `1px solid rgba(26,22,15,0.08)`,
                minHeight: 200,
              }}
            >
              {/* Hover color wash */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{ background: `${accent}0A` }}
              />

              {/* Colour dot */}
              <div
                style={{
                  width: 10, height: 10, borderRadius: "50%",
                  background: accent,
                  marginBottom: "1.25rem",
                }}
              />

              <h3
                className="text-xl font-bold mb-2"
                style={{ fontFamily: "var(--font-playfair), serif", color: "#1A160F" }}
              >
                {t(`categories.${key}`)}
              </h3>
              <p className="text-xs mt-1" style={{ color: `rgba(26,22,15,0.45)` }}>
                {ex[key]}
              </p>

              {/* Arrow on hover */}
              <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs font-semibold" style={{ color: accent }}>
                  {t("categories.browse")}
                </span>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
