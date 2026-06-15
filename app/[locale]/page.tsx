import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  const t = useTranslations("home");
  const nav = useTranslations("nav");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Nav */}
      <header className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-semibold tracking-tight text-primary">
            Krydderi
          </span>
          <nav className="flex items-center gap-3">
            <Button variant="ghost" size="sm" render={<Link href="/login" />}>
              {nav("login")}
            </Button>
            <Button size="sm" render={<Link href="#request" />}>
              {nav("requestAccount")}
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-b from-accent/30 to-background">
        <Badge variant="secondary" className="mb-6">
          Phase 0 — Foundation
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground max-w-2xl leading-tight">
          {t("hero.headline")}
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
          {t("hero.subhead")}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" render={<Link href="/login" />}>
            {t("hero.ctaLogin")}
          </Button>
          <Button size="lg" variant="outline" render={<Link href="#request" />}>
            {t("hero.ctaRequest")}
          </Button>
        </div>
      </section>

      {/* Value props */}
      <section className="py-16 px-4 bg-card border-t border-border">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-10">
            {t("valueProps.title")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {(["direct", "certified", "reliable"] as const).map((key) => (
              <div
                key={key}
                className="rounded-xl border border-border bg-background p-6"
              >
                <h3 className="font-semibold text-primary mb-2">
                  {t(`valueProps.${key}.title`)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(`valueProps.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack status — Phase 0 diagnostics strip */}
      <section className="py-8 px-4 bg-muted/50 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-mono text-muted-foreground text-center mb-4">
            Phase 0 stack check
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "Next.js 16 App Router",
              "TypeScript strict",
              "Tailwind v4",
              "shadcn/ui (base-nova)",
              "next-intl (da/en)",
              "@supabase/ssr",
              "React Hook Form + Zod",
              "Resend",
            ].map((item) => (
              <Badge key={item} variant="outline" className="text-xs">
                ✓ {item}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 bg-card">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Krydderi</span>
          <span>{t("footer.tagline")}</span>
          <div className="flex gap-4">
            <Link href="/" locale="da" className="hover:text-foreground transition-colors">
              DA
            </Link>
            <Link href="/" locale="en" className="hover:text-foreground transition-colors">
              EN
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
