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
    <section className="py-16 px-5" style={{ background: "#111009" }}>
      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
        {STATS.map(({ value, label }) => (
          <div key={value} className="text-center">
            <p
              className="text-4xl sm:text-5xl font-bold mb-2"
              style={{
                fontFamily: "var(--font-playfair), serif",
                color: "#e8a020",
              }}
            >
              {value}
            </p>
            <p className="text-sm leading-snug" style={{ color: "rgba(245,230,200,0.5)" }}>
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
