"use client";

import { useLocale } from "next-intl";

const WORDS: Record<string, string[]> = {
  da: ["Kardemomme", "·", "Gurkemeje", "·", "Kanel", "·", "Spidskommen", "·",
       "Timian", "·", "Rosmarin", "·", "Chiliflager", "·", "Sort Peber", "·",
       "Paprika", "·", "Koriander", "·", "Nordic Dukkah", "·"],
  en: ["Cardamom", "·", "Turmeric", "·", "Cinnamon", "·", "Cumin", "·",
       "Thyme", "·", "Rosemary", "·", "Chili Flakes", "·", "Black Pepper", "·",
       "Paprika", "·", "Coriander", "·", "Nordic Dukkah", "·"],
};

export function Marquee() {
  const locale = useLocale();
  const words  = WORDS[locale] ?? WORDS.da;
  const track  = [...words, ...words];

  return (
    <div
      className="relative overflow-hidden py-4 border-y"
      style={{ background: "#F0EBE1", borderColor: "rgba(26,22,15,0.08)" }}
    >
      <div className="marquee-track flex gap-7 whitespace-nowrap">
        {track.map((w, i) => (
          <span
            key={i}
            className="text-xs font-medium uppercase tracking-[0.14em] flex-shrink-0"
            style={{
              color:      w === "·" ? "#B57422" : "rgba(26,22,15,0.5)",
              fontFamily: w === "·" ? "serif"   : undefined,
              fontSize:   w === "·" ? "0.9rem"  : undefined,
            }}
          >
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}
