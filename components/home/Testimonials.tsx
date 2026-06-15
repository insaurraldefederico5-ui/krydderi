import { useTranslations } from "next-intl";

const ACCENTS = ["#B57422", "#445E38", "#5E4A90"] as const;
const KEYS    = ["q0", "q1", "q2"] as const;

export function Testimonials() {
  const t = useTranslations("home.testimonials");

  return (
    <section className="py-24 px-5" style={{ background: "#F7F4EE" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 reveal">
          <h2
            className="text-3xl sm:text-4xl font-bold italic"
            style={{ fontFamily: "var(--font-playfair), serif", color: "#1A160F" }}
          >
            {t("title")}
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {KEYS.map((key, i) => {
            const accent = ACCENTS[i];
            return (
              <div
                key={key}
                className="rounded-2xl p-8 reveal"
                style={{
                  background: "#F0EBE1",
                  border: "1px solid rgba(26,22,15,0.07)",
                  transitionDelay: `${i * 0.12}s`,
                }}
              >
                <p
                  style={{
                    fontSize: "4rem", lineHeight: 1,
                    marginBottom: "0.75rem",
                    fontFamily: "Georgia, serif",
                    color: accent,
                    opacity: 0.5,
                  }}
                >
                  &ldquo;
                </p>
                <p
                  className="text-sm leading-relaxed mb-8"
                  style={{ color: "#4A4238", fontStyle: "italic" }}
                >
                  {t(`${key}.quote`)}
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ background: `${accent}18`, color: accent }}
                  >
                    {t(`${key}.name`).charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: "#1A160F" }}>
                      {t(`${key}.name`)}
                    </p>
                    <p style={{ fontSize: "0.68rem", color: "rgba(26,22,15,0.45)" }}>
                      {t(`${key}.role`)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
