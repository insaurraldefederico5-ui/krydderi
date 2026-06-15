/* Server component — pure CSS animations */

type FallDir = "ll" | "l" | "c" | "r" | "rr";

/* ── Spice SVG components ─────────────────────────────────────── */

function BasilLarge() {
  return (
    <svg width="28" height="36" viewBox="0 0 28 36" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.22))" }}>
      {/* Base shadow */}
      <path d="M14 2 C9 5 2 12 2 20 C2 26 7 34 14 35 C21 34 26 26 26 20 C26 12 19 5 14 2Z"
        fill="#145A1F" opacity="0.3" transform="translate(1,1.5)"/>
      {/* Main leaf */}
      <path d="M14 2 C9 5 2 12 2 20 C2 26 7 34 14 35 C21 34 26 26 26 20 C26 12 19 5 14 2Z"
        fill="#2D8B42"/>
      {/* Left-side lighter area */}
      <path d="M14 2 C11 5 5 12 4 20 C4 25 8 32 14 35 C15 31 16 24 16 20 C16 12 15 5 14 2Z"
        fill="#3DAB52" opacity="0.45"/>
      {/* Central vein */}
      <path d="M14 2 L14 35" stroke="#1A6828" strokeWidth="0.9" opacity="0.55"/>
      {/* Lateral veins */}
      <path d="M14 10 Q9 12 3 10"   stroke="#1A6828" strokeWidth="0.65" opacity="0.42" fill="none"/>
      <path d="M14 10 Q19 12 25 10" stroke="#1A6828" strokeWidth="0.65" opacity="0.42" fill="none"/>
      <path d="M14 18 Q7 20 2 18"   stroke="#1A6828" strokeWidth="0.65" opacity="0.42" fill="none"/>
      <path d="M14 18 Q21 20 26 18" stroke="#1A6828" strokeWidth="0.65" opacity="0.42" fill="none"/>
      <path d="M14 26 Q8 28 3 26"   stroke="#1A6828" strokeWidth="0.65" opacity="0.42" fill="none"/>
      <path d="M14 26 Q20 28 25 26" stroke="#1A6828" strokeWidth="0.65" opacity="0.42" fill="none"/>
      {/* Specular highlight */}
      <path d="M11 4 C8 8 4 14 4 20" stroke="white" strokeWidth="2.5" fill="none" opacity="0.14" strokeLinecap="round"/>
    </svg>
  );
}

function BasilSmall() {
  return (
    <svg width="18" height="24" viewBox="0 0 18 24" style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.2))" }}>
      <path d="M9 1 C6 3 1 8 1 14 C1 18 4 23 9 24 C14 23 17 18 17 14 C17 8 12 3 9 1Z"
        fill="#145A1F" opacity="0.28" transform="translate(0.5,1)"/>
      <path d="M9 1 C6 3 1 8 1 14 C1 18 4 23 9 24 C14 23 17 18 17 14 C17 8 12 3 9 1Z"
        fill="#2D8B42"/>
      <path d="M9 1 C7 3 3 8 3 14 C3 18 6 22 9 24 C10 21 11 17 11 14 C11 8 10 3 9 1Z"
        fill="#3DAB52" opacity="0.4"/>
      <path d="M9 1 L9 24" stroke="#1A6828" strokeWidth="0.7" opacity="0.5"/>
      <path d="M9 8  Q5.5 9.5 2 8"  stroke="#1A6828" strokeWidth="0.55" opacity="0.4" fill="none"/>
      <path d="M9 8  Q12.5 9.5 16 8" stroke="#1A6828" strokeWidth="0.55" opacity="0.4" fill="none"/>
      <path d="M9 15 Q5 16.5 1.5 15" stroke="#1A6828" strokeWidth="0.55" opacity="0.4" fill="none"/>
      <path d="M9 15 Q13 16.5 16.5 15" stroke="#1A6828" strokeWidth="0.55" opacity="0.4" fill="none"/>
      <path d="M7 2 C5 5 2 9 2 13" stroke="white" strokeWidth="1.8" fill="none" opacity="0.12" strokeLinecap="round"/>
    </svg>
  );
}

function RosemaryLong() {
  return (
    <svg width="54" height="11" viewBox="0 0 54 11" style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.18))" }}>
      {/* Shadow stem */}
      <path d="M0 5.5 Q27 4.5 54 5.5" stroke="#2A4020" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.25" transform="translate(0,1)"/>
      {/* Main stem */}
      <path d="M0 5 Q27 4 54 5" stroke="#4A7040" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      {/* Needles alternating */}
      <line x1="5"  y1="5"   x2="2"  y2="1.2" stroke="#3D6030" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="10" y1="4.7" x2="13" y2="1.2" stroke="#4A7038" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="15" y1="4.5" x2="12" y2="9"   stroke="#3D6030" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="20" y1="4.3" x2="23" y2="1"   stroke="#4A7038" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="25" y1="4.2" x2="22" y2="9"   stroke="#3D6030" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="30" y1="4.1" x2="33" y2="1"   stroke="#4A7038" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="35" y1="4.2" x2="32" y2="9"   stroke="#3D6030" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="40" y1="4.3" x2="43" y2="1"   stroke="#4A7038" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="45" y1="4.5" x2="42" y2="9"   stroke="#3D6030" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="50" y1="4.7" x2="53" y2="1.2" stroke="#4A7038" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function RosemaryShort() {
  return (
    <svg width="34" height="10" viewBox="0 0 34 10" style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.16))" }}>
      <path d="M0 5 Q17 4 34 5" stroke="#4A7040" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <line x1="5"  y1="4.8" x2="2"  y2="1.2" stroke="#3D6030" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="10" y1="4.5" x2="13" y2="1"   stroke="#4A7038" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="15" y1="4.3" x2="12" y2="8.5" stroke="#3D6030" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="20" y1="4.2" x2="23" y2="1"   stroke="#4A7038" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="25" y1="4.3" x2="22" y2="8.5" stroke="#3D6030" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="30" y1="4.5" x2="33" y2="1.2" stroke="#4A7038" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

function Peppercorn() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))" }}>
      {/* Shadow */}
      <circle cx="6.5" cy="6.5" r="5.5" fill="#080404" opacity="0.35"/>
      {/* Main */}
      <circle cx="6" cy="6" r="5.5" fill="#2A1A0E"/>
      {/* Dark equator band */}
      <ellipse cx="6" cy="7.5" rx="4" ry="2.2" fill="#180E06" opacity="0.5"/>
      {/* Highlight */}
      <circle cx="4" cy="3.8" r="2"   fill="white" opacity="0.14"/>
      <circle cx="3.5" cy="3.3" r="0.9" fill="white" opacity="0.18"/>
    </svg>
  );
}

function TurmericDust() {
  return (
    /* blurred powder cloud */
    <div style={{ filter: "blur(1.8px)" }}>
      <svg width="26" height="16" viewBox="0 0 26 16">
        <ellipse cx="13" cy="8"  rx="12" ry="7"   fill="#C8920A" opacity="0.5"/>
        <ellipse cx="10" cy="7"  rx="7"  ry="4.5" fill="#D4A420" opacity="0.35"/>
        <ellipse cx="16" cy="9"  rx="5"  ry="3"   fill="#C8920A" opacity="0.25"/>
      </svg>
    </div>
  );
}

function PaprikaDust() {
  return (
    <div style={{ filter: "blur(1.8px)" }}>
      <svg width="22" height="13" viewBox="0 0 22 13">
        <ellipse cx="11" cy="6.5" rx="10" ry="6"   fill="#C44010" opacity="0.5"/>
        <ellipse cx="8"  cy="5.5" rx="6"  ry="3.8" fill="#D44818" opacity="0.3"/>
      </svg>
    </div>
  );
}

function ChiliFlake() {
  return (
    <svg width="13" height="9" viewBox="0 0 13 9" style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.2))" }}>
      {/* Shadow */}
      <path d="M0 5.5L2 1.5L5.5 0L12 2L13 6L10 8.5L4 7.5L0 5.5Z"
        fill="#6B0E06" opacity="0.3" transform="translate(0.3,0.8)"/>
      {/* Main */}
      <path d="M0 5.5L2 1.5L5.5 0L12 2L13 6L10 8.5L4 7.5L0 5.5Z" fill="#C42010"/>
      {/* Lighter inner */}
      <path d="M2 5L3.5 2L6.5 1L11 3L11.5 5.5L9.5 7.5L4.5 6.5Z" fill="#D43020" opacity="0.28"/>
    </svg>
  );
}

function CorianderSeed() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.22))" }}>
      <circle cx="7" cy="7"   r="6"   fill="#7A5428" opacity="0.35"/>
      <circle cx="6.5" cy="6.5" r="6" fill="#9A7844"/>
      <circle cx="6.5" cy="6.5" r="4" fill="#B08A58" opacity="0.3"/>
      <path d="M6.5 1v11M1 6.5h11" stroke="#6A4828" strokeWidth="0.85" opacity="0.22"/>
      <circle cx="4.5" cy="4" r="1.3" fill="white" opacity="0.14"/>
    </svg>
  );
}

function CuminSeed() {
  return (
    <svg width="6" height="17" viewBox="0 0 6 17" style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.2))" }}>
      {/* Shadow */}
      <path d="M3 0 C5 2.5 5.8 7 5.2 11.5 C4.6 15 3.8 17 3 17 C2.2 17 1.4 15 0.8 11.5 C0.2 7 1 2.5 3 0Z"
        fill="#3A1E08" opacity="0.3" transform="translate(0.5,0.5)"/>
      {/* Main */}
      <path d="M3 0 C5 2.5 5.8 7 5.2 11.5 C4.6 15 3.8 17 3 17 C2.2 17 1.4 15 0.8 11.5 C0.2 7 1 2.5 3 0Z"
        fill="#7B4A22"/>
      {/* Highlight ridge */}
      <path d="M3 1 C4.2 3.5 4.8 7.5 4.2 11.5 C3.8 14 3.3 16 3 17"
        stroke="#9B6A38" strokeWidth="1.2" fill="none" opacity="0.45" strokeLinecap="round"/>
    </svg>
  );
}

function SaffronThread() {
  return (
    <svg width="15" height="23" viewBox="0 0 15 23" style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.18))" }}>
      <path d="M7.5 0 Q4 7 3 13 Q2 17 4.5 22"
        stroke="#C42A0A" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      <path d="M7.5 0 Q11 8 12 14 Q12.5 17.5 11 22"
        stroke="#D44018" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.62"/>
      <path d="M7.5 0 Q8 6 7.5 11"
        stroke="#E04820" strokeWidth="0.9" fill="none" strokeLinecap="round" opacity="0.35"/>
    </svg>
  );
}

/* ── Particle definitions ─────────────────────────────────────── */

type SpiceType =
  | "basil_l" | "basil_s"
  | "rosemary_l" | "rosemary_s"
  | "pepper"
  | "turmeric" | "paprika"
  | "chili" | "coriander" | "cumin" | "saffron";

function SpiceSVG({ type }: { type: SpiceType }) {
  switch (type) {
    case "basil_l":    return <BasilLarge />;
    case "basil_s":    return <BasilSmall />;
    case "rosemary_l": return <RosemaryLong />;
    case "rosemary_s": return <RosemaryShort />;
    case "pepper":     return <Peppercorn />;
    case "turmeric":   return <TurmericDust />;
    case "paprika":    return <PaprikaDust />;
    case "chili":      return <ChiliFlake />;
    case "coriander":  return <CorianderSeed />;
    case "cumin":      return <CuminSeed />;
    case "saffron":    return <SaffronThread />;
  }
}

const PARTICLES: { type: SpiceType; x: number; fall: FallDir; dur: number; delay: number }[] = [
  /* Basil leaves — large, visually dominant */
  { type: "basil_l",    x: -120, fall: "ll", dur: 5.2, delay: 0.0 },
  { type: "basil_l",    x:  -30, fall: "l",  dur: 5.8, delay: 2.5 },
  { type: "basil_l",    x:   45, fall: "r",  dur: 5.4, delay: 1.2 },
  { type: "basil_l",    x:  130, fall: "rr", dur: 5.0, delay: 3.8 },
  /* Basil leaves — small */
  { type: "basil_s",    x:  -80, fall: "l",  dur: 4.6, delay: 1.8 },
  { type: "basil_s",    x:   10, fall: "c",  dur: 4.8, delay: 3.2 },
  { type: "basil_s",    x:   90, fall: "rr", dur: 4.4, delay: 0.6 },
  { type: "basil_s",    x: -150, fall: "ll", dur: 5.0, delay: 2.0 },
  /* Rosemary sprigs */
  { type: "rosemary_l", x:  -60, fall: "l",  dur: 4.8, delay: 0.8 },
  { type: "rosemary_l", x:   70, fall: "r",  dur: 5.2, delay: 2.2 },
  { type: "rosemary_l", x: -140, fall: "ll", dur: 4.6, delay: 3.5 },
  { type: "rosemary_s", x:   20, fall: "c",  dur: 4.2, delay: 1.0 },
  { type: "rosemary_s", x:  115, fall: "rr", dur: 4.4, delay: 0.3 },
  { type: "rosemary_s", x:  -95, fall: "l",  dur: 4.0, delay: 2.8 },
  /* Peppercorns — small, numerous */
  { type: "pepper",     x:  -40, fall: "l",  dur: 3.5, delay: 0.5 },
  { type: "pepper",     x:    5, fall: "c",  dur: 3.8, delay: 1.5 },
  { type: "pepper",     x:   55, fall: "r",  dur: 3.3, delay: 2.8 },
  { type: "pepper",     x: -100, fall: "ll", dur: 3.6, delay: 0.2 },
  { type: "pepper",     x:  100, fall: "rr", dur: 3.4, delay: 3.4 },
  /* Powder clouds */
  { type: "turmeric",   x:  -20, fall: "c",  dur: 6.0, delay: 1.3 },
  { type: "turmeric",   x:   80, fall: "r",  dur: 5.5, delay: 3.0 },
  { type: "paprika",    x:  -75, fall: "l",  dur: 5.8, delay: 0.7 },
  { type: "paprika",    x:  -130,fall: "ll", dur: 6.2, delay: 2.5 },
  /* Chili flakes */
  { type: "chili",      x:   35, fall: "r",  dur: 3.7, delay: 0.9 },
  { type: "chili",      x:  -55, fall: "l",  dur: 3.5, delay: 3.0 },
  { type: "chili",      x:  125, fall: "rr", dur: 4.0, delay: 1.7 },
  /* Coriander seeds */
  { type: "coriander",  x:  -15, fall: "c",  dur: 4.1, delay: 2.1 },
  { type: "coriander",  x:   65, fall: "r",  dur: 3.9, delay: 0.4 },
  /* Cumin seeds */
  { type: "cumin",      x:  -45, fall: "l",  dur: 3.4, delay: 1.6 },
  { type: "cumin",      x:   40, fall: "r",  dur: 3.6, delay: 3.6 },
  { type: "cumin",      x:  105, fall: "rr", dur: 3.3, delay: 0.1 },
  /* Saffron threads */
  { type: "saffron",    x:  -10, fall: "c",  dur: 4.5, delay: 2.6 },
  { type: "saffron",    x:   85, fall: "rr", dur: 4.8, delay: 1.1 },
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
