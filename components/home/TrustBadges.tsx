import { useTranslations } from "next-intl";

const BADGE_ICONS: Record<string, React.ReactNode> = {
  organic: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#445E38" strokeWidth="1.6">
      <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z"/>
      <path d="M12 6v6l4 2"/>
      <path d="M2 12h4M18 12h4M12 2v4M12 18v4"/>
    </svg>
  ),
  fairtrade: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#B57422" strokeWidth="1.6">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  lab: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#4A7AAA" strokeWidth="1.6" strokeLinecap="round">
      <path d="M9 3h6M10 3v7l-4 7h12l-4-7V3"/>
      <path d="M7 17h10"/>
    </svg>
  ),
  gdpr: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#6B5490" strokeWidth="1.6" strokeLinecap="round">
      <rect x="3" y="11" width="18" height="11" rx="2"/>
      <path d="M7 11V7a5 5 0 0110 0v4"/>
    </svg>
  ),
  trace: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#A07A30" strokeWidth="1.6" strokeLinecap="round">
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
      style={{ background: "#EDE9E0", borderColor: "rgba(26,22,15,0.08)" }}
    >
      <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-12">
        {BADGE_KEYS.map((key) => (
          <div key={key} className="flex flex-col items-center gap-3 cursor-default">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: "#F7F4EE", border: "1px solid rgba(26,22,15,0.08)" }}
            >
              {BADGE_ICONS[key]}
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#1A160F" }}>
                {t(`${key}.label`)}
              </p>
              <p style={{ fontSize: "0.68rem", color: "rgba(26,22,15,0.45)" }}>
                {t(`${key}.sub`)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
