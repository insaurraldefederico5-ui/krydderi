import { useTranslations } from "next-intl";

const ICONS = {
  direct: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 2a14.5 14.5 0 010 20M2 12h20"/>
    </svg>
  ),
  certified: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  reliable: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3"/>
      <rect x="9" y="11" width="14" height="10" rx="2"/>
      <circle cx="16" cy="16" r="1"/>
    </svg>
  ),
};

const CARDS = [
  { key: "direct"    as const, iconColor: "#B57422", borderColor: "rgba(181,116,34,0.20)" },
  { key: "certified" as const, iconColor: "#445E38", borderColor: "rgba(68,94,56,0.20)"   },
  { key: "reliable"  as const, iconColor: "#A82010", borderColor: "rgba(168,32,16,0.18)"  },
];

export function ValueProps() {
  const t = useTranslations("home.valueProps");

  return (
    <section className="py-24 px-5" style={{ background: "#EDE9E0" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 reveal">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#B57422" }}>
            {t("title")}
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold"
            style={{ fontFamily: "var(--font-playfair), serif", color: "#1A160F" }}
          >
            {t("subtitle")}
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {CARDS.map(({ key, iconColor, borderColor }, i) => (
            <div
              key={key}
              className="rounded-2xl p-8 reveal group hover:-translate-y-1 transition-transform duration-300 cursor-default"
              style={{
                background: "#F7F4EE",
                border: `1px solid ${borderColor}`,
                transitionDelay: `${i * 0.1}s`,
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{ background: `${iconColor}12`, color: iconColor }}
              >
                {ICONS[key]}
              </div>
              <h3
                className="text-lg font-semibold mb-3"
                style={{ fontFamily: "var(--font-playfair), serif", color: "#1A160F" }}
              >
                {t(`${key}.title`)}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#6B6150" }}>
                {t(`${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
