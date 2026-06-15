import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FallingSpices } from "./FallingSpices";

export function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 90% 60% at 10% 20%, rgba(140,72,20,0.18) 0%, transparent 55%),
          radial-gradient(ellipse 70% 50% at 85% 75%, rgba(100,42,10,0.14) 0%, transparent 55%),
          radial-gradient(ellipse 100% 80% at 50% 110%, rgba(60,22,5,0.35) 0%, transparent 65%),
          #0d0603
        `,
      }}
    >
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />

      {/* Ambient glow blobs */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "12%", left: "8%",
          width: 480, height: 480,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,128,10,0.09) 0%, transparent 70%)",
          animation: "glow-pulse 6s ease-in-out infinite",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "18%", right: "6%",
          width: 360, height: 360,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,46,22,0.10) 0%, transparent 70%)",
          animation: "glow-pulse 8s ease-in-out infinite 2s",
        }}
      />

      {/* Falling spice particles */}
      <FallingSpices />

      {/* Content */}
      <div className="relative z-10 text-center px-5 max-w-5xl mx-auto">
        {/* Eyebrow */}
        <div
          className="inline-flex items-center gap-2.5 mb-8"
          style={{ animation: "hero-in 0.9s ease both 0.1s" }}
        >
          <span style={{ width: 28, height: 1, background: "#c4800a", display: "inline-block" }} />
          <span
            className="text-xs font-semibold uppercase tracking-[0.22em]"
            style={{ color: "#c4800a" }}
          >
            {t("eyebrow")}
          </span>
          <span style={{ width: 28, height: 1, background: "#c4800a", display: "inline-block" }} />
        </div>

        {/* Headline */}
        <h1
          className="hero-headline text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
          style={{
            color: "#f5e6c8",
            animation: "hero-in 0.9s ease both 0.25s",
          }}
        >
          {t("headline")}
        </h1>

        {/* Divider */}
        <div
          className="mx-auto my-8"
          style={{
            width: 60, height: 2,
            background: "linear-gradient(90deg, transparent, #c4800a, transparent)",
            animation: "hero-in 0.9s ease both 0.4s",
          }}
        />

        {/* Subheadline */}
        <p
          className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          style={{
            color: "rgba(245,230,200,0.68)",
            animation: "hero-in 0.9s ease both 0.5s",
          }}
        >
          {t("subhead")}
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
          style={{ animation: "hero-in 0.9s ease both 0.65s" }}
        >
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #c4800a 0%, #e8a020 100%)",
              color: "#0d0603",
              boxShadow: "0 0 32px rgba(196,128,10,0.30)",
            }}
          >
            {t("ctaLogin")}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
          <a
            href="#kontakt"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300"
            style={{
              background: "rgba(245,230,200,0.06)",
              color: "#f5e6c8",
              border: "1px solid rgba(245,230,200,0.20)",
              backdropFilter: "blur(8px)",
            }}
          >
            {t("ctaRequest")}
          </a>
        </div>

        {/* Social proof */}
        <p
          className="mt-10 text-xs"
          style={{
            color: "rgba(245,230,200,0.35)",
            animation: "hero-in 0.9s ease both 0.8s",
          }}
        >
          {t("socialProof")}
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ animation: "hero-in 1s ease both 1.1s" }}
        aria-hidden="true"
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: "rgba(196,128,10,0.5)" }}>
          Scroll
        </span>
        <div
          className="w-px h-10"
          style={{
            background: "linear-gradient(to bottom, rgba(196,128,10,0.5), transparent)",
            animation: "glow-pulse 2s ease-in-out infinite",
          }}
        />
      </div>
    </section>
  );
}
