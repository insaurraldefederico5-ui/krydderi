import { useTranslations } from "next-intl";

export function Stats() {
  const t = useTranslations("home.stats");

  const STATS = [
    { value: t("delivery.value"), label: t("delivery.label") },
    { value: t("countries.value"), label: t("countries.label") },
    { value: t("tested.value"),    label: t("tested.label")   },
    { value: t("payment.value"),   label: t("payment.label")  },
  ];

  return (
    <section className="py-20 px-5" style={{ background: "#F7F4EE" }}>
      <div
        className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4"
        style={{ borderTop: "1px solid rgba(26,22,15,0.08)", borderBottom: "1px solid rgba(26,22,15,0.08)" }}
      >
        {STATS.map(({ value, label }, i) => (
          <div
            key={value}
            className="text-center py-12 px-6"
            style={{
              borderRight: i < 3 ? "1px solid rgba(26,22,15,0.08)" : undefined,
            }}
          >
            <p
              className="text-4xl sm:text-5xl font-bold mb-3"
              style={{ fontFamily: "var(--font-playfair), serif", color: "#1A160F" }}
            >
              {value}
            </p>
            <p className="text-xs font-medium uppercase tracking-widest leading-snug" style={{ color: "#6B6150" }}>
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
