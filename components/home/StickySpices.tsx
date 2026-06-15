"use client";

import { useEffect, useState } from "react";

function CardamomPod() {
  return (
    <svg width="36" height="54" viewBox="0 0 36 54" fill="none">
      <ellipse cx="18" cy="27" rx="13" ry="24" fill="#4A6840" opacity="0.88"/>
      <ellipse cx="18" cy="27" rx="8"  ry="18" fill="#3A5830" opacity="0.28"/>
      <line x1="7"  y1="17" x2="29" y2="17" stroke="#2A4020" strokeWidth="1.3" opacity="0.5"/>
      <line x1="6"  y1="23" x2="30" y2="23" stroke="#2A4020" strokeWidth="1.3" opacity="0.5"/>
      <line x1="6"  y1="29" x2="30" y2="29" stroke="#2A4020" strokeWidth="1.3" opacity="0.5"/>
      <line x1="7"  y1="35" x2="29" y2="35" stroke="#2A4020" strokeWidth="1.3" opacity="0.5"/>
      <line x1="9"  y1="41" x2="27" y2="41" stroke="#2A4020" strokeWidth="1.3" opacity="0.5"/>
      <line x1="18" y1="3"  x2="18" y2="9"  stroke="#2A4020" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}

function ChiliPepper() {
  return (
    <svg width="28" height="60" viewBox="0 0 28 60" fill="none">
      <path d="M14 0 Q17 4 14 9" stroke="#3A5020" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M14 7 C21 11 25 26 23 40 C21 50 18 55 14 57 C10 55 7 50 5 40 C3 26 7 11 14 7Z"
        fill="#A82010"/>
      <path d="M14 11 C18 16 21 27 19 38 C18 44 16 48 14 50"
        stroke="#C83020" strokeWidth="2.2" fill="none" opacity="0.42" strokeLinecap="round"/>
      <circle cx="14" cy="12" r="2.2" fill="#E03828" opacity="0.28"/>
    </svg>
  );
}

function CinnamonStick() {
  return (
    <svg width="22" height="60" viewBox="0 0 22 60" fill="none">
      <rect x="2" y="1" width="18" height="58" rx="9" fill="#8B5E2A"/>
      <rect x="6" y="1" width="6"  height="58" rx="3" fill="#A07030" opacity="0.22"/>
      <line x1="2" y1="12" x2="20" y2="12" stroke="#6A4418" strokeWidth="1.2" opacity="0.48"/>
      <line x1="2" y1="20" x2="20" y2="20" stroke="#6A4418" strokeWidth="1.2" opacity="0.48"/>
      <line x1="2" y1="28" x2="20" y2="28" stroke="#6A4418" strokeWidth="1.2" opacity="0.48"/>
      <line x1="2" y1="36" x2="20" y2="36" stroke="#6A4418" strokeWidth="1.2" opacity="0.48"/>
      <line x1="2" y1="44" x2="20" y2="44" stroke="#6A4418" strokeWidth="1.2" opacity="0.48"/>
      <line x1="2" y1="52" x2="20" y2="52" stroke="#6A4418" strokeWidth="1.2" opacity="0.48"/>
    </svg>
  );
}

function Peppercorns() {
  return (
    <svg width="50" height="34" viewBox="0 0 50 34" fill="none">
      <circle cx="11"  cy="24" r="10" fill="#2A1A0E"/>
      <circle cx="25"  cy="13" r="11" fill="#2A1A0E"/>
      <circle cx="39"  cy="24" r="10" fill="#2A1A0E"/>
      <circle cx="9.5"  cy="22" r="3.5" fill="#3E2818" opacity="0.38"/>
      <circle cx="23.5" cy="11" r="4"   fill="#3E2818" opacity="0.38"/>
      <circle cx="37.5" cy="22" r="3.5" fill="#3E2818" opacity="0.38"/>
    </svg>
  );
}

const SPICES = [
  { C: CardamomPod,   top: "14%", rate: 0.07, delay: "0s",   bobDur: "5.5s" },
  { C: Peppercorns,   top: "33%", rate: 0.10, delay: "0.8s", bobDur: "4.8s" },
  { C: ChiliPepper,   top: "53%", rate: 0.06, delay: "1.5s", bobDur: "6.3s" },
  { C: CinnamonStick, top: "71%", rate: 0.09, delay: "0.3s", bobDur: "5.1s" },
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
        /* outer: scroll-driven Y offset */
        <div
          key={i}
          style={{
            position: "absolute",
            right: 0,
            top,
            transform: `translateY(${Math.min(scrollY * rate, 240)}px)`,
          }}
        >
          {/* inner: CSS bobbing animation */}
          <div style={{ animation: `spice-bob ${bobDur} ease-in-out infinite ${delay}` }}>
            <C />
          </div>
        </div>
      ))}
    </div>
  );
}
