import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#F7F4EE", minHeight: "100vh" }}
    >
      {/* Very subtle paper texture */}
      <div
        style={{
          position: "absolute", inset: 0, opacity: 0.028, pointerEvents: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex flex-col lg:flex-row min-h-screen">
        {/* ── LEFT: text ─────────────────────────────────────────────── */}
        <div className="flex flex-col justify-center pt-28 pb-16 lg:pr-12 lg:w-[58%] relative z-10">
          {/* Eyebrow */}
          <div
            style={{
              display: "flex", alignItems: "center", gap: 12,
              marginBottom: "2.5rem",
              animation: "hero-in 0.7s ease both 0.15s",
            }}
          >
            <span style={{ width: 28, height: 1, background: "#B57422", flexShrink: 0 }} />
            <span
              style={{
                fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.22em",
                textTransform: "uppercase", color: "#B57422",
              }}
            >
              {t("eyebrow")}
            </span>
          </div>

          {/* Headline */}
          <h1
            className="hero-headline"
            style={{
              fontSize: "clamp(2rem, 3.8vw, 4rem)",
              color: "#1A160F",
              animation: "hero-in 0.9s ease both 0.25s",
              maxWidth: "22ch",
            }}
          >
            {t("headline")}
          </h1>

          {/* Amber rule */}
          <div
            style={{
              width: 52, height: 2.5, background: "#B57422",
              margin: "2.2rem 0",
              animation: "hero-in 0.8s ease both 0.4s",
            }}
          />

          {/* Subheadline */}
          <p
            style={{
              fontSize: "clamp(0.9rem, 1.6vw, 1.1rem)",
              lineHeight: 1.7,
              color: "#6B6150",
              maxWidth: "38ch",
              animation: "hero-in 0.8s ease both 0.5s",
            }}
          >
            {t("subhead")}
          </p>

          {/* CTAs */}
          <div
            style={{
              display: "flex", flexWrap: "wrap", gap: "0.9rem",
              marginTop: "2.5rem",
              animation: "hero-in 0.8s ease both 0.65s",
            }}
          >
            <Link
              href="/login"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "0.9rem 1.75rem",
                borderRadius: 50,
                background: "#1A160F",
                color: "#F7F4EE",
                fontSize: "0.875rem", fontWeight: 600,
                textDecoration: "none", whiteSpace: "nowrap",
              }}
            >
              {t("ctaLogin")}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>

            <a
              href="#kontakt"
              style={{
                display: "inline-flex", alignItems: "center",
                padding: "0.9rem 1.75rem",
                borderRadius: 50,
                border: "1.5px solid rgba(26,22,15,0.22)",
                color: "#1A160F",
                fontSize: "0.875rem", fontWeight: 600,
                textDecoration: "none", whiteSpace: "nowrap",
              }}
            >
              {t("ctaRequest")}
            </a>
          </div>

          {/* Social proof */}
          <p
            style={{
              marginTop: "2.5rem",
              fontSize: "0.72rem",
              color: "rgba(26,22,15,0.33)",
              animation: "hero-in 0.8s ease both 0.8s",
            }}
          >
            {t("socialProof")}
          </p>
        </div>

        {/* ── RIGHT: video ──────────────────────────────────── */}
        <div className="hidden lg:block lg:w-[42%] relative" style={{ minHeight: "100vh" }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 18%)",
              maskImage: "linear-gradient(to right, transparent 0%, black 18%)",
            }}
          >
            <source src="/api/video" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        style={{
          position: "absolute", bottom: 36, left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          animation: "hero-in 1s ease both 1.1s",
        }}
        aria-hidden="true"
      >
        <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(26,22,15,0.3)" }}>
          Scroll
        </span>
        <div
          style={{
            width: 1, height: 36,
            background: "linear-gradient(to bottom, rgba(26,22,15,0.3), transparent)",
          }}
        />
      </div>
    </section>
  );
}
