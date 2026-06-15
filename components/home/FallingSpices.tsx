"use client";

import { useEffect, useRef } from "react";

/* ── SVG path data for each spice shape ───────────────────────────── */
const SHAPES = [
  {
    // Star anise — 8-point star
    d: "M12 2 L13.8 8.6 L20.5 7.2 L16 12 L20.5 16.8 L13.8 15.4 L12 22 L10.2 15.4 L3.5 16.8 L8 12 L3.5 7.2 L10.2 8.6 Z",
    fill: "#6B3A2A",
    stroke: "#9B5A3A",
  },
  {
    // Cardamom pod — tapered oval
    d: "M12 2 C15.5 3 18 7 18 12 C18 17 15.5 21 12 22 C8.5 21 6 17 6 12 C6 7 8.5 3 12 2 Z",
    fill: "#4A6741",
    stroke: "#6B8E5A",
  },
  {
    // Cinnamon stick — thin rounded rect
    d: "M11 3 H13 Q14 3 14 4 L14 20 Q14 21 13 21 H11 Q10 21 10 20 L10 4 Q10 3 11 3 Z",
    fill: "#7A3B1E",
    stroke: "#A0522D",
  },
  {
    // Peppercorn — small sphere
    d: "M12 5 A7 7 0 1 1 11.99 5 Z",
    fill: "#1E1210",
    stroke: "#3D2419",
  },
  {
    // Herb leaf
    d: "M12 3 C7 5 3 9.5 3 14 C3 18 6.5 21 12 22 C17.5 21 21 18 21 14 C21 9.5 17 5 12 3 Z M12 3 L12 22",
    fill: "#3D5C30",
    stroke: "#5A7A45",
  },
  {
    // Chili pepper
    d: "M12 4 C9 4 7 7.5 7 11 C7 15.5 9 19 12 21 C15 19 17 15.5 17 11 C17 7.5 15 4 12 4 Z M12 4 L12.5 1",
    fill: "#8B1A0A",
    stroke: "#B22C14",
  },
  {
    // Cumin seed — small crescent
    d: "M8 12 C8 7 10 4 12 4 C14 4 16 7 16 12 C16 14 15 16 12 17 C9 16 8 14 8 12 Z",
    fill: "#8B6914",
    stroke: "#A8801E",
  },
];

interface SpiceParticle {
  left: string;
  delay: number;
  duration: number;
  size: number;
  shapeIdx: number;
  swayDuration: number;
  swayDelay: number;
}

/* Deterministic "random" distribution so SSR & client match */
const PARTICLES: SpiceParticle[] = [
  { left: "3%",  delay: 0,  duration: 13, size: 20, shapeIdx: 0, swayDuration: 9,  swayDelay: 0   },
  { left: "8%",  delay: 4,  duration: 10, size: 13, shapeIdx: 3, swayDuration: 7,  swayDelay: 2   },
  { left: "14%", delay: 8,  duration: 15, size: 22, shapeIdx: 1, swayDuration: 11, swayDelay: 1   },
  { left: "19%", delay: 2,  duration: 12, size: 16, shapeIdx: 4, swayDuration: 8,  swayDelay: 3   },
  { left: "25%", delay: 6,  duration: 14, size: 18, shapeIdx: 2, swayDuration: 10, swayDelay: 0   },
  { left: "31%", delay: 11, duration: 11, size: 24, shapeIdx: 5, swayDuration: 7,  swayDelay: 4   },
  { left: "37%", delay: 3,  duration: 16, size: 14, shapeIdx: 6, swayDuration: 12, swayDelay: 2   },
  { left: "43%", delay: 9,  duration: 13, size: 20, shapeIdx: 0, swayDuration: 9,  swayDelay: 5   },
  { left: "49%", delay: 1,  duration: 12, size: 17, shapeIdx: 3, swayDuration: 8,  swayDelay: 1   },
  { left: "55%", delay: 7,  duration: 14, size: 22, shapeIdx: 1, swayDuration: 10, swayDelay: 3   },
  { left: "61%", delay: 5,  duration: 11, size: 15, shapeIdx: 5, swayDuration: 7,  swayDelay: 0   },
  { left: "67%", delay: 12, duration: 15, size: 19, shapeIdx: 2, swayDuration: 11, swayDelay: 6   },
  { left: "73%", delay: 2,  duration: 13, size: 23, shapeIdx: 4, swayDuration: 9,  swayDelay: 2   },
  { left: "79%", delay: 8,  duration: 12, size: 16, shapeIdx: 6, swayDuration: 8,  swayDelay: 4   },
  { left: "85%", delay: 4,  duration: 16, size: 21, shapeIdx: 0, swayDuration: 12, swayDelay: 1   },
  { left: "90%", delay: 10, duration: 11, size: 14, shapeIdx: 3, swayDuration: 7,  swayDelay: 5   },
  { left: "95%", delay: 6,  duration: 14, size: 18, shapeIdx: 5, swayDuration: 10, swayDelay: 3   },
  { left: "11%", delay: 14, duration: 17, size: 12, shapeIdx: 2, swayDuration: 13, swayDelay: 7   },
  { left: "47%", delay: 16, duration: 12, size: 26, shapeIdx: 1, swayDuration: 8,  swayDelay: 0   },
  { left: "71%", delay: 13, duration: 15, size: 15, shapeIdx: 4, swayDuration: 10, swayDelay: 6   },
];

export function FallingSpices() {
  const containerRef = useRef<HTMLDivElement>(null);

  /* Subtle parallax: slow the fall rate on scroll */
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking && containerRef.current) {
        window.requestAnimationFrame(() => {
          if (containerRef.current) {
            const y = window.scrollY * 0.12;
            containerRef.current.style.transform = `translateY(${y}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {PARTICLES.map((p, i) => {
        const shape = SHAPES[p.shapeIdx];
        return (
          <div
            key={i}
            className="absolute top-0"
            style={{
              left: p.left,
              animation: `spice-fall ${p.duration}s ${p.delay}s infinite linear`,
              opacity: 0,
              willChange: "transform",
            }}
          >
            <svg
              width={p.size}
              height={p.size}
              viewBox="0 0 24 24"
              style={{
                animation: `spice-sway ${p.swayDuration}s ${p.swayDelay}s infinite ease-in-out`,
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4))",
              }}
            >
              <path
                d={shape.d}
                fill={shape.fill}
                stroke={shape.stroke}
                strokeWidth="0.5"
              />
            </svg>
          </div>
        );
      })}
    </div>
  );
}
