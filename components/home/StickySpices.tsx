"use client";

import { useEffect, useState } from "react";

/* ── High-quality sidebar spice illustrations ─────────────────── */

function CardamomPod() {
  return (
    <svg width="20" height="44" viewBox="0 0 20 44" style={{ filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.22))" }}>
      <path d="M10 3 C5 5 3 12 3 22 C3 31 5 38 10 40 C15 38 17 31 17 22 C17 12 15 5 10 3Z"
        fill="#1A3A1A" opacity="0.3" transform="translate(0.8,1.5)"/>
      <path d="M10 3 C5 5 3 12 3 22 C3 31 5 38 10 40 C15 38 17 31 17 22 C17 12 15 5 10 3Z"
        fill="#3A6630"/>
      <path d="M10 3 C7.5 5 5 12 5 22 C5 30 6.5 37 10 40 C11 37 11.5 30 11.5 22 C11.5 12 11 5 10 3Z"
        fill="#4A8040" opacity="0.38"/>
      <path d="M10 1 L10 4" stroke="#2A5020" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M4.5 14 Q10 13 15.5 14" stroke="#2A5020" strokeWidth="0.8" fill="none" opacity="0.4"/>
      <path d="M4 20 Q10 19 16 20"     stroke="#2A5020" strokeWidth="0.8" fill="none" opacity="0.4"/>
      <path d="M4 27 Q10 26 16 27"     stroke="#2A5020" strokeWidth="0.8" fill="none" opacity="0.4"/>
      <path d="M5 33 Q10 32 15 33"     stroke="#2A5020" strokeWidth="0.8" fill="none" opacity="0.4"/>
      <path d="M6 6 C5 10 4.5 16 5 22" stroke="white" strokeWidth="2" fill="none" opacity="0.13" strokeLinecap="round"/>
    </svg>
  );
}

function PeppercornCluster() {
  return (
    <svg width="44" height="30" viewBox="0 0 44 30" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }}>
      <circle cx="9.5"  cy="10.5" r="7.5" fill="#080404" opacity="0.3"/>
      <circle cx="22"   cy="7"    r="7"   fill="#080404" opacity="0.3"/>
      <circle cx="34"   cy="10.5" r="6.5" fill="#080404" opacity="0.3"/>
      <circle cx="16"   cy="21"   r="6.5" fill="#080404" opacity="0.3"/>
      <circle cx="28.5" cy="21"   r="6"   fill="#080404" opacity="0.3"/>
      <circle cx="9"    cy="9.5"  r="7.5" fill="#2A1A0E"/>
      <circle cx="21.5" cy="6.5"  r="7"   fill="#2A1A0E"/>
      <circle cx="33.5" cy="9.5"  r="6.5" fill="#2A1A0E"/>
      <circle cx="15.5" cy="20"   r="6.5" fill="#2A1A0E"/>
      <circle cx="28"   cy="20"   r="6"   fill="#2A1A0E"/>
      <circle cx="9"    cy="10"   r="5"   fill="#180E06" opacity="0.45"/>
      <circle cx="21.5" cy="7"    r="4.8" fill="#180E06" opacity="0.45"/>
      <circle cx="33.5" cy="10"   r="4.3" fill="#180E06" opacity="0.45"/>
      <circle cx="15.5" cy="20.5" r="4.3" fill="#180E06" opacity="0.45"/>
      <circle cx="28"   cy="20.5" r="4"   fill="#180E06" opacity="0.45"/>
      <circle cx="6.5"  cy="7"    r="2.5" fill="white" opacity="0.13"/>
      <circle cx="19"   cy="4.5"  r="2.2" fill="white" opacity="0.13"/>
      <circle cx="31"   cy="7.5"  r="2"   fill="white" opacity="0.13"/>
      <circle cx="13"   cy="17.5" r="2"   fill="white" opacity="0.13"/>
      <circle cx="25.5" cy="17.5" r="1.8" fill="white" opacity="0.13"/>
    </svg>
  );
}

function ChiliPepperLarge() {
  return (
    <svg width="13" height="54" viewBox="0 0 13 54" style={{ filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.22))" }}>
      <path d="M6.5 7 C9.5 11 11.5 23 11 35 C10.5 45 8.5 51 6.5 52 C4.5 51 2.5 45 2 35 C1.5 23 3.5 11 6.5 7Z"
        fill="#5A0808" opacity="0.3" transform="translate(0.5,1)"/>
      <path d="M6.5 7 C9.5 11 11.5 23 11 35 C10.5 45 8.5 51 6.5 52 C4.5 51 2.5 45 2 35 C1.5 23 3.5 11 6.5 7Z"
        fill="#C22020"/>
      <path d="M6.5 7 C5.5 10 4 19 4 29 C4 39 5 48 6.5 52 C7.5 49 8 41 8 31 C8 19 7.2 10 6.5 7Z"
        fill="#D84040" opacity="0.32"/>
      <path d="M6.5 2 C5.5 3 5 5 6.5 7 C8 5 7.5 3 6.5 2Z" fill="#3D6030"/>
      <line x1="6.5" y1="1" x2="6.5" y2="7" stroke="#3D6030" strokeWidth="1.5"/>
      <path d="M4.5 9 C4 15 3.5 23 3.8 33" stroke="white" strokeWidth="1.7" fill="none" opacity="0.16" strokeLinecap="round"/>
    </svg>
  );
}

function CinnamonRoll() {
  return (
    <svg width="50" height="16" viewBox="0 0 50 16" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.25))" }}>
      <rect x="1" y="2"  width="49" height="14" rx="7" fill="#3A1A06" opacity="0.3"/>
      <rect x="0" y="1"  width="50" height="14" rx="7" fill="#9B5820"/>
      <rect x="1" y="1"  width="48" height="7"  rx="5.5" fill="#B87030" opacity="0.38"/>
      <path d="M8   2  Q9   8 8   14" stroke="#7A3C0E" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5"/>
      <path d="M16  1  Q17  8 16  15" stroke="#7A3C0E" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5"/>
      <path d="M24  1  Q25  8 24  15" stroke="#7A3C0E" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5"/>
      <path d="M32  1  Q33  8 32  15" stroke="#7A3C0E" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5"/>
      <path d="M40  2  Q41  8 40  14" stroke="#7A3C0E" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5"/>
      <path d="M7 3 Q25 2 43 3" stroke="white" strokeWidth="2" fill="none" opacity="0.12" strokeLinecap="round"/>
    </svg>
  );
}

/* ── Spice config ─────────────────────────────────────────────── */

const SPICES = [
  { C: CardamomPod,      top: "12%", rate: 0.07, delay: "0s",   bobDur: "5.5s" },
  { C: PeppercornCluster,top: "31%", rate: 0.10, delay: "0.8s", bobDur: "4.8s" },
  { C: ChiliPepperLarge, top: "52%", rate: 0.06, delay: "1.5s", bobDur: "6.3s" },
  { C: CinnamonRoll,     top: "70%", rate: 0.09, delay: "0.3s", bobDur: "5.1s" },
];

export function StickySpices() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handle = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  const opacity = Math.min(scrollY / 250, 1) * 0.72;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        right: 18,
        top: 0,
        width: 64,
        height: "100vh",
        pointerEvents: "none",
        zIndex: 15,
        opacity,
        transition: "opacity 0.4s ease",
      }}
    >
      {SPICES.map(({ C, top, rate, delay, bobDur }, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            right: 0,
            top,
            transform: `translateY(${Math.min(scrollY * rate, 240)}px)`,
          }}
        >
          <div style={{ animation: `spice-bob ${bobDur} ease-in-out infinite ${delay}` }}>
            <C />
          </div>
        </div>
      ))}
    </div>
  );
}
