import { useTranslations } from "next-intl";

const ICONS = {
  direct: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 2a14.5 14.5 0 010 20M2 12h20"/>
      <path d="M12 2C6 2 3 7 3 12s3 10 9 10M12 2c6 0 9 5 9 10s-3 10-9 10"/>
    </svg>
  ),
  certified: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  reliable: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3"/>
      <rect x="9" y="11" width="14" height="10" rx="2"/>
      <circle cx="16" cy="16" r="1"/>
    </svg>
  ),
};

export function ValueProps() {
  const t = useTranslations("home.valueProps");

  const cards = [
    { key: "direct" as const,   gradient: "linear-gradient(135deg, #2d1507 0%, #1a0d04 100%)", border: "rgba(196,128,10,0.25)", icon: ICONS.direct },
    { key: "certified" as const, gradient: "linear-gradient(135deg, #0e1f0c 0%, #091408 100%)", border: "rgba(90,122,69,0.30)", icon: ICONS.certified },
    { key: "reliable" as const,  gradient: "linear-gradient(135deg, #1a0a0a 0%, #0f0606 100%)", border: "rgba(139,46,22,0.30)", icon: ICONS.reliable },
  ];

  return (
    <section className="py-24 px-5" style={{ background: "#0f0a07" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 reveal">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ fontFamily: "var(--font-playfair), serif", color: "#f5e6c8" }}
          >
            {t("title")}
          </h2>
          <p className="text-sm max-w-md mx-auto" style={{ color: "rgba(245,230,200,0.45)" }}>
            Det der gør forskellen for professionelle køkkener
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {cards.map(({ key, gradient, border, icon }, i) => (
            <div
              key={key}
              className="rounded-2xl p-8 reveal group cursor-default transition-transform duration-300 hover:-translate-y-1"
              style={{
                background: gradient,
                border: `1px solid ${border}`,
                animationDelay: `${i * 0.12}s`,
              }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                style={{
                  background: "rgba(196,128,10,0.10)",
                  color: "#e8a020",
                }}
              >
                {icon}
              </div>
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: "#f5e6c8", fontFamily: "var(--font-playfair), serif" }}
              >
                {t(`${key}.title`)}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(245,230,200,0.55)" }}>
                {t(`${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
