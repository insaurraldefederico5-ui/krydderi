import { useTranslations } from "next-intl";

export function HowItWorks() {
  const t = useTranslations("home.howItWorks");

  const steps = [
    {
      n: "01",
      title: t("step1.title"),
      desc: t("step1.description"),
      accent: "#c4800a",
    },
    {
      n: "02",
      title: t("step2.title"),
      desc: t("step2.description"),
      accent: "#e8a020",
    },
    {
      n: "03",
      title: t("step3.title"),
      desc: t("step3.description"),
      accent: "#6B8E5A",
    },
  ];

  return (
    <section className="py-24 px-5" style={{ background: "#0f0a07" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20 reveal">
          <h2
            className="text-3xl sm:text-4xl font-bold"
            style={{ fontFamily: "var(--font-playfair), serif", color: "#f5e6c8" }}
          >
            {t("title")}
          </h2>
        </div>

        {/* Steps */}
        <div className="relative grid sm:grid-cols-3 gap-12 sm:gap-6">
          {/* Connector line (desktop only) */}
          <div
            className="absolute hidden sm:block top-6 left-[17%] right-[17%] h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(196,128,10,0.25), rgba(196,128,10,0.25), transparent)" }}
            aria-hidden="true"
          />

          {steps.map(({ n, title, desc, accent }, i) => (
            <div
              key={n}
              className="text-center reveal"
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              {/* Number circle */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10"
                style={{
                  background: "#0a0705",
                  border: `2px solid ${accent}`,
                  color: accent,
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                }}
              >
                {n}
              </div>
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: "#f5e6c8", fontFamily: "var(--font-playfair), serif" }}
              >
                {title}
              </h3>
              <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: "rgba(245,230,200,0.5)" }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
