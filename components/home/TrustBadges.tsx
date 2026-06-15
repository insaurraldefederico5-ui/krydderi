import { useTranslations } from "next-intl";

const BADGE_ICONS: Record<string, React.ReactNode> = {
  organic: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6B8E5A" strokeWidth="1.5">
      <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z"/>
      <path d="M12 6v6l4 2"/>
      <path d="M2 12h4M18 12h4M12 2v4M12 18v4"/>
    </svg>
  ),
  fairtrade: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c4800a" strokeWidth="1.5">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  lab: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7a9dca" strokeWidth="1.5" strokeLinecap="round">
      <path d="M9 3h6M10 3v7l-4 7h12l-4-7V3"/>
      <path d="M7 17h10"/>
    </svg>
  ),
  gdpr: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9b8abf" strokeWidth="1.5" strokeLinecap="round">
      <rect x="3" y="11" width="18" height="11" rx="2"/>
      <path d="M7 11V7a5 5 0 0110 0v4"/>
    </svg>
  ),
  trace: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c4a050" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
      <path d="M12 2v10M12 12l6 6"/>
    </svg>
  ),
};

const BADGE_KEYS = ["organic", "fairtrade", "lab", "gdpr", "trace"] as const;

export function TrustBadges() {
  const t = useTranslations("home.trust.badges");

  return (
    <section
      className="py-16 px-5 border-y"
      style={{ background: "#080603", borderColor: "rgba(196,128,10,0.12)" }}
    >
      <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-10">
        {BADGE_KEYS.map((key) => (
          <div key={key} className="flex flex-col items-center gap-3 group cursor-default">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-300"
              style={{ background: "rgba(245,230,200,0.04)", border: "1px solid rgba(245,230,200,0.08)" }}
            >
              {BADGE_ICONS[key]}
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#f5e6c8" }}>
                {t(`${key}.label`)}
              </p>
              <p className="text-[10px]" style={{ color: "rgba(245,230,200,0.35)" }}>
                {t(`${key}.sub`)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
