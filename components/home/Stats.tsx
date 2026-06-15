const STATS = [
  { value: "48 t",    label: "Leveringstid på lagerførte varer" },
  { value: "15+",     label: "Oprindelseslande repræsenteret" },
  { value: "100 %",   label: "Laboratorietestet hvert parti" },
  { value: "Net 30",  label: "Fleksible betalingsbetingelser" },
];

export function Stats() {
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
