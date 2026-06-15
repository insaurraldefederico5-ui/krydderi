/* Server component — pure CSS animations, real spice photography */

type FallDir = "ll" | "l" | "c" | "r" | "rr";

type Particle = {
  src:     string;
  w:       number;
  h:       number;
  x:       number;
  fall:    FallDir;
  dur:     number;
  delay:   number;
  opacity?: number;
};

/*
 * mix-blend-mode: multiply dissolves the white photo backgrounds into
 * the #F7F4EE page, leaving only the coloured spice pixels visible.
 */
const PARTICLES: Particle[] = [
  /* Basil */
  { src:"basil.jpg", w:72, h:54, x:-115, fall:"ll", dur:5.4, delay:0.0 },
  { src:"basil.jpg", w:64, h:48, x: -30, fall:"l",  dur:5.9, delay:2.5 },
  { src:"basil.jpg", w:78, h:58, x:  50, fall:"r",  dur:5.2, delay:1.3 },
  { src:"basil.jpg", w:60, h:45, x: 130, fall:"rr", dur:5.6, delay:3.8 },
  { src:"basil.jpg", w:55, h:41, x: -80, fall:"l",  dur:4.8, delay:4.5 },

  /* Rosemary */
  { src:"rosemary.jpg", w:90, h:60, x: -55, fall:"l",  dur:4.9, delay:0.7 },
  { src:"rosemary.jpg", w:80, h:53, x:  75, fall:"r",  dur:5.3, delay:2.2 },
  { src:"rosemary.jpg", w:75, h:50, x:-140, fall:"ll", dur:4.7, delay:3.5 },
  { src:"rosemary.jpg", w:65, h:43, x: 115, fall:"rr", dur:4.5, delay:1.0 },

  /* Peppercorns */
  { src:"pepper.jpg", w:58, h:39, x: -40, fall:"l",  dur:3.6, delay:0.5 },
  { src:"pepper.jpg", w:52, h:35, x:   5, fall:"c",  dur:3.9, delay:1.5 },
  { src:"pepper.jpg", w:60, h:40, x:  60, fall:"r",  dur:3.4, delay:2.9 },
  { src:"pepper.jpg", w:50, h:33, x:-100, fall:"ll", dur:3.7, delay:4.1 },
  { src:"pepper.jpg", w:55, h:37, x: 100, fall:"rr", dur:3.5, delay:0.2 },

  /* Chili */
  { src:"chili.jpg", w:44, h:66, x:  35, fall:"r",  dur:3.8, delay:1.0 },
  { src:"chili.jpg", w:38, h:57, x: -55, fall:"l",  dur:3.6, delay:3.1 },
  { src:"chili.jpg", w:42, h:63, x: 125, fall:"rr", dur:4.0, delay:1.8 },

  /* Cardamom */
  { src:"cardamom.jpg", w:62, h:46, x: -20, fall:"c",  dur:4.2, delay:2.1 },
  { src:"cardamom.jpg", w:56, h:42, x:  70, fall:"r",  dur:4.0, delay:0.4 },
  { src:"cardamom.jpg", w:58, h:44, x:-130, fall:"ll", dur:4.4, delay:3.0 },

  /* Cinnamon */
  { src:"cinnamon.jpg", w:76, h:43, x:  15, fall:"c",  dur:4.6, delay:1.7 },
  { src:"cinnamon.jpg", w:68, h:38, x: -75, fall:"l",  dur:4.3, delay:3.8 },
  { src:"cinnamon.jpg", w:70, h:39, x: 110, fall:"rr", dur:4.8, delay:0.6 },

  /* Turmeric & coriander */
  { src:"turmeric.jpg",  w:66, h:27, x: -10, fall:"c",  dur:5.0, delay:2.7, opacity:0.75 },
  { src:"coriander.jpg", w:54, h:54, x:  85, fall:"rr", dur:4.1, delay:1.2 },
  { src:"turmeric.jpg",  w:60, h:25, x: -90, fall:"l",  dur:4.7, delay:0.9, opacity:0.72 },
  { src:"coriander.jpg", w:48, h:48, x:  40, fall:"r",  dur:3.8, delay:3.5 },
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/spices/${p.src}`}
            alt=""
            width={p.w}
            height={p.h}
            style={{
              display: "block",
              width: p.w,
              height: p.h,
              objectFit: "cover",
              mixBlendMode: "multiply",
              opacity: p.opacity ?? 0.88,
            }}
          />
        </div>
      ))}
    </div>
  );
}
