/* Server component — pure CSS animations, no JS needed */

type SpiceType = "pepper" | "cardamom" | "turmeric" | "chili" | "cumin" | "coriander" | "saffron";
type FallDir   = "ll" | "l" | "c" | "r" | "rr";

function SpiceSVG({ type }: { type: SpiceType }) {
  switch (type) {
    case "pepper":
      return (
        <svg width="10" height="10" viewBox="0 0 10 10">
          <circle cx="5" cy="5" r="5" fill="#2A1A0E"/>
          <circle cx="3.5" cy="3.5" r="1.5" fill="#3E2818" opacity="0.4"/>
        </svg>
      );
    case "cardamom":
      return (
        <svg width="8" height="15" viewBox="0 0 8 15">
          <ellipse cx="4" cy="7.5" rx="3.5" ry="7" fill="#3D5E32"/>
          <line x1="1"   y1="5"    x2="7"   y2="5"   stroke="#2A4020" strokeWidth="0.9" opacity="0.55"/>
          <line x1="0.5" y1="7.5"  x2="7.5" y2="7.5" stroke="#2A4020" strokeWidth="0.9" opacity="0.55"/>
          <line x1="1"   y1="10"   x2="7"   y2="10"  stroke="#2A4020" strokeWidth="0.9" opacity="0.55"/>
        </svg>
      );
    case "turmeric":
      return (
        <svg width="13" height="10" viewBox="0 0 13 10">
          <path d="M2 8.5L0 5.5L1.5 1.5L5 0L10 1L12.5 4.5L11 8.5L6.5 10L2 8.5Z" fill="#C8920A"/>
          <path d="M3.5 7.5L2 5L3.5 2.5L6 1.5L9 2L10.5 5L9 7.5L6.5 8.5Z" fill="#D4A420" opacity="0.28"/>
        </svg>
      );
    case "chili":
      return (
        <svg width="11" height="8" viewBox="0 0 11 8">
          <path d="M0 4.5L1.5 1.5L5 0L10 2L11 5L8.5 7.5L4 6.5L0 4.5Z" fill="#A82010"/>
          <path d="M3.5 5.5L2 3.5L3.5 1.5L6 1L9 2.5L9.5 4.5L8 6L4.5 6Z" fill="#C02818" opacity="0.22"/>
        </svg>
      );
    case "cumin":
      return (
        <svg width="5" height="15" viewBox="0 0 5 15">
          <ellipse cx="2.5" cy="7.5" rx="2.2" ry="7" fill="#6B4220"/>
          <ellipse cx="2.5" cy="7.5" rx="0.8" ry="5.5" fill="#7A5230" opacity="0.28"/>
        </svg>
      );
    case "coriander":
      return (
        <svg width="12" height="12" viewBox="0 0 12 12">
          <circle cx="6" cy="6" r="5.5" fill="#8B6844"/>
          <circle cx="6" cy="6" r="3.5" fill="#9A7854" opacity="0.28"/>
          <path d="M6 0.5v11M0.5 6h11" stroke="#6A5030" strokeWidth="0.8" opacity="0.18"/>
        </svg>
      );
    case "saffron":
      return (
        <svg width="13" height="20" viewBox="0 0 13 20">
          <path d="M6.5 0 Q4 7 3 13 Q2.5 16 4.5 20"
            stroke="#B82A0A" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
          <path d="M6.5 0 Q9 8 10 14 Q10.5 17 9 20"
            stroke="#C44010" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.62"/>
        </svg>
      );
  }
}

const PARTICLES: { type: SpiceType; x: number; fall: FallDir; dur: number; delay: number }[] = [
  { type: "pepper",    x: -155, fall: "ll", dur: 3.8, delay: 0.0  },
  { type: "cardamom",  x: -125, fall: "ll", dur: 4.5, delay: 1.5  },
  { type: "cumin",     x: -105, fall: "ll", dur: 3.3, delay: 3.0  },
  { type: "chili",     x: -120, fall: "ll", dur: 4.2, delay: 2.2  },
  { type: "turmeric",  x:  -80, fall: "l",  dur: 4.1, delay: 0.7  },
  { type: "coriander", x:  -58, fall: "l",  dur: 4.8, delay: 2.5  },
  { type: "pepper",    x:  -38, fall: "l",  dur: 3.6, delay: 1.1  },
  { type: "cumin",     x:  -65, fall: "l",  dur: 3.4, delay: 3.5  },
  { type: "saffron",   x:  -12, fall: "c",  dur: 4.3, delay: 0.3  },
  { type: "pepper",    x:    8, fall: "c",  dur: 3.9, delay: 1.9  },
  { type: "turmeric",  x:   -5, fall: "c",  dur: 4.6, delay: 3.3  },
  { type: "coriander", x:   18, fall: "c",  dur: 3.7, delay: 0.8  },
  { type: "cardamom",  x:   35, fall: "r",  dur: 4.4, delay: 2.0  },
  { type: "chili",     x:   55, fall: "r",  dur: 3.6, delay: 1.3  },
  { type: "pepper",    x:   75, fall: "r",  dur: 4.2, delay: 0.6  },
  { type: "cumin",     x:   60, fall: "r",  dur: 3.5, delay: 2.8  },
  { type: "coriander", x:   98, fall: "rr", dur: 4.0, delay: 0.5  },
  { type: "pepper",    x:  120, fall: "rr", dur: 3.8, delay: 2.1  },
  { type: "saffron",   x:  148, fall: "rr", dur: 4.7, delay: 1.1  },
  { type: "turmeric",  x:  110, fall: "rr", dur: 3.5, delay: 3.6  },
  { type: "cardamom",  x:   88, fall: "r",  dur: 4.9, delay: 1.7  },
  { type: "chili",     x: -112, fall: "ll", dur: 3.6, delay: 0.4  },
  { type: "coriander", x:  -45, fall: "l",  dur: 4.3, delay: 1.4  },
  { type: "pepper",    x:   28, fall: "c",  dur: 3.8, delay: 2.4  },
];

export function FallingSpices() {
  return (
    <div
      style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}
      aria-hidden="true"
    >
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            marginLeft: p.x,
            animation: `fall-${p.fall} ${p.dur}s ease-in infinite ${p.delay}s`,
          }}
        >
          <SpiceSVG type={p.type} />
        </div>
      ))}
    </div>
  );
}
