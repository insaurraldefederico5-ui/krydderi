import { useTranslations } from "next-intl";

const CATEGORIES = [
  {
    key: "whole_spices",
    bg: "linear-gradient(145deg, #3d1f0a 0%, #1e0e05 100%)",
    accent: "#c4800a",
    icon: "✦",
    examples: "Kardemomme · Peber · Kanel",
  },
  {
    key: "ground_spices",
    bg: "linear-gradient(145deg, #5c2a10 0%, #2d1307 100%)",
    accent: "#d4921a",
    icon: "◈",
    examples: "Gurkemeje · Paprika · Spidskommen",
  },
  {
    key: "herbs",
    bg: "linear-gradient(145deg, #1a2e14 0%, #0d180a 100%)",
    accent: "#6B8E5A",
    icon: "❧",
    examples: "Timian · Rosmarin · Laurbær",
  },
  {
    key: "blends",
    bg: "linear-gradient(145deg, #1e1a2e 0%, #0f0d18 100%)",
    accent: "#7a6ab0",
    icon: "⊕",
    examples: "Nordic Dukkah · Ras el Hanout",
  },
  {
    key: "organic",
    bg: "linear-gradient(145deg, #0e2218 0%, #07130d 100%)",
    accent: "#4a8c5a",
    icon: "✿",
    examples: "EU Øko · Fairtrade · Kosher",
  },
];

export function Categories() {
  const t = useTranslations("home");

  return (
    <section id="sortiment" className="py-24 px-5" style={{ background: "#0a0705" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 reveal">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ fontFamily: "var(--font-playfair), serif", color: "#f5e6c8" }}
          >
            {t("range.title")}
          </h2>
          <p className="text-sm" style={{ color: "rgba(245,230,200,0.4)" }}>
            15+ produkter på lager · Fortoldet og klar til levering
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 reveal">
          {CATEGORIES.map(({ key, bg, accent, icon, examples }, i) => (
            <div
              key={key}
              className={`relative rounded-2xl overflow-hidden p-8 group cursor-default transition-all duration-400 hover:scale-[1.02] ${i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}`}
              style={{ background: bg, border: `1px solid ${accent}20`, minHeight: 200 }}
            >
              {/* Ambient glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 30% 40%, ${accent}12 0%, transparent 65%)` }}
              />

              <span className="text-3xl mb-4 block" style={{ color: accent }}>
                {icon}
              </span>
              <h3
                className="text-xl font-bold mb-1"
                style={{ fontFamily: "var(--font-playfair), serif", color: "#f5e6c8" }}
              >
                {t(`categories.${key}`)}
              </h3>
              <p className="text-xs mt-2" style={{ color: `${accent}99` }}>
                {examples}
              </p>

              {/* CTA hint */}
              <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs font-medium" style={{ color: accent }}>
                  Se sortiment
                </span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5">
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
