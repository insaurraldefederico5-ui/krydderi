export function Marquee() {
  const words = [
    "Kardemomme", "·", "Gurkemeje", "·", "Kanel", "·",
    "Spidskommen", "·", "Timian", "·", "Rosmarin", "·",
    "Chiliflager", "·", "Sort Peber", "·", "Paprika", "·",
    "Koriander", "·", "Nordic Dukkah", "·",
  ];

  /* Duplicate track for seamless loop */
  const track = [...words, ...words];

  return (
    <div
      className="relative overflow-hidden py-4 border-y"
      style={{
        background: "#0d0603",
        borderColor: "rgba(196,128,10,0.20)",
      }}
    >
      <div className="marquee-track flex gap-6 whitespace-nowrap">
        {track.map((w, i) => (
          <span
            key={i}
            className="text-sm font-medium uppercase tracking-[0.15em] flex-shrink-0"
            style={{
              color: w === "·" ? "rgba(196,128,10,0.45)" : "rgba(245,230,200,0.55)",
              fontFamily: w === "·" ? "serif" : undefined,
            }}
          >
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}
