const QUOTES = [
  {
    quote: "Vi er gået fra tre leverandører til én. Kardemommen er bedre end det vi fik fra Hamburg — og prisen er lavere.",
    name: "Lars Meyer",
    role: "Ejer, Meyers Bageri",
    initial: "L",
    accent: "#c4800a",
  },
  {
    quote: "Portalen er genialt enkel. Vi genbestiller vores faste sortiment på under et minut. Det er tid vi bruger bedre i køkkenet.",
    name: "Anders Nicolajsen",
    role: "Køkkenchef, Kadeau",
    initial: "A",
    accent: "#6B8E5A",
  },
  {
    quote: "Lab-certifikaterne med hvert parti er afgørende for vores øko-dokumentation. Ingen andre leverandører tilbyder det så let.",
    name: "Sara Lindgren",
    role: "Indkøbschef, Nordic Naturals",
    initial: "S",
    accent: "#7a9dca",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 px-5" style={{ background: "#0a0705" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 reveal">
          <h2
            className="text-3xl sm:text-4xl font-bold italic"
            style={{ fontFamily: "var(--font-playfair), serif", color: "#f5e6c8" }}
          >
            "Hvad vores kunder siger"
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {QUOTES.map(({ quote, name, role, initial, accent }, i) => (
            <div
              key={name}
              className="rounded-2xl p-8 reveal"
              style={{
                background: "rgba(245,230,200,0.03)",
                border: "1px solid rgba(245,230,200,0.07)",
                transitionDelay: `${i * 0.12}s`,
              }}
            >
              {/* Quote mark */}
              <p
                className="text-5xl leading-none mb-4"
                style={{ fontFamily: "Georgia, serif", color: accent, opacity: 0.6 }}
              >
                &ldquo;
              </p>
              <p
                className="text-sm leading-relaxed mb-8"
                style={{ color: "rgba(245,230,200,0.7)", fontStyle: "italic" }}
              >
                {quote}
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: `${accent}22`, color: accent }}
                >
                  {initial}
                </div>
                <div>
                  <p className="text-xs font-semibold" style={{ color: "#f5e6c8" }}>{name}</p>
                  <p className="text-[11px]" style={{ color: "rgba(245,230,200,0.4)" }}>{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
