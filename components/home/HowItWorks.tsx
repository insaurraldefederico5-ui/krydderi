import { useTranslations } from "next-intl";

export function HowItWorks() {
  const t = useTranslations("home.howItWorks");

  const steps = [
    { n: "01", title: t("step1.title"), desc: t("step1.description"), accent: "#B57422" },
    { n: "02", title: t("step2.title"), desc: t("step2.description"), accent: "#1A160F" },
    { n: "03", title: t("step3.title"), desc: t("step3.description"), accent: "#445E38" },
  ];

  return (
    <section className="py-24 px-5" style={{ background: "#EDE9E0" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20 reveal">
          <h2
            className="text-3xl sm:text-4xl font-bold"
            style={{ fontFamily: "var(--font-playfair), serif", color: "#1A160F" }}
          >
            {t("title")}
          </h2>
        </div>

        <div className="relative grid sm:grid-cols-3 gap-12 sm:gap-6">
          {/* Connector (desktop) */}
          <div
            className="absolute hidden sm:block top-6 left-[17%] right-[17%] h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(26,22,15,0.10), rgba(26,22,15,0.10), transparent)" }}
            aria-hidden="true"
          />

          {steps.map(({ n, title, desc, accent }, i) => (
            <div
              key={n}
              className="text-center reveal"
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10"
                style={{
                  background: "#EDE9E0",
                  border: `2px solid ${accent}`,
                  color: accent,
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "0.85rem", fontWeight: 700,
                }}
              >
                {n}
              </div>
              <h3
                className="text-lg font-semibold mb-3"
                style={{ fontFamily: "var(--font-playfair), serif", color: "#1A160F" }}
              >
                {title}
              </h3>
              <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: "#6B6150" }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
