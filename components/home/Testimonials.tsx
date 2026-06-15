const QUOTES = [
  {
    quote: "Vi er gået fra tre leverandører til én. Kardemommen er bedre end det vi fik fra Hamburg — og prisen er lavere.",
    name: "Lars Meyer",
    role: "Ejer, Meyers Bageri",
    accent: "#B57422",
  },
  {
    quote: "Portalen er genialt enkel. Vi genbestiller vores faste sortiment på under et minut. Det er tid vi bruger bedre i køkkenet.",
    name: "Anders Nicolajsen",
    role: "Køkkenchef, Kadeau",
    accent: "#445E38",
  },
  {
    quote: "Lab-certifikaterne med hvert parti er afgørende for vores øko-dokumentation. Ingen andre leverandører tilbyder det så let.",
    name: "Sara Lindgren",
    role: "Indkøbschef, Nordic Naturals",
    accent: "#5E4A90",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 px-5" style={{ background: "#F7F4EE" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 reveal">
          <h2
            className="text-3xl sm:text-4xl font-bold italic"
            style={{ fontFamily: "var(--font-playfair), serif", color: "#1A160F" }}
          >
            "Hvad vores kunder siger"
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {QUOTES.map(({ quote, name, role, accent }, i) => (
            <div
              key={name}
              className="rounded-2xl p-8 reveal"
              style={{
                background: "#F0EBE1",
                border: "1px solid rgba(26,22,15,0.07)",
                transitionDelay: `${i * 0.12}s`,
              }}
            >
              {/* Quote mark */}
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
                {quote}
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: `${accent}18`, color: accent }}
                >
                  {name[0]}
                </div>
                <div>
                  <p className="text-xs font-semibold" style={{ color: "#1A160F" }}>{name}</p>
                  <p style={{ fontSize: "0.68rem", color: "rgba(26,22,15,0.45)" }}>{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
