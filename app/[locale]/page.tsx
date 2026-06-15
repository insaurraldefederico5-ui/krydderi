import { Navbar }         from "@/components/home/Navbar";
import { Hero }           from "@/components/home/Hero";
import { Marquee }        from "@/components/home/Marquee";
import { Stats }          from "@/components/home/Stats";
import { ValueProps }     from "@/components/home/ValueProps";
import { Categories }     from "@/components/home/Categories";
import { HowItWorks }     from "@/components/home/HowItWorks";
import { Testimonials }   from "@/components/home/Testimonials";
import { TrustBadges }    from "@/components/home/TrustBadges";
import { LeadForm }       from "@/components/home/LeadForm";
import { SiteFooter }     from "@/components/home/SiteFooter";
import { ScrollRevealInit } from "@/components/home/ScrollReveal";

export default function HomePage() {
  return (
    <>
      {/* Scroll-reveal initialiser — client, zero render output */}
      <ScrollRevealInit />

      {/* Sticky navigation */}
      <Navbar />

      {/* 1. Full-screen hero with falling spices */}
      <Hero />

      {/* 2. Scrolling product name marquee */}
      <Marquee />

      {/* 3. Quick stats */}
      <Stats />

      {/* 4. Why Krydderi */}
      <ValueProps />

      {/* 5. Product categories */}
      <Categories />

      {/* 6. How it works */}
      <HowItWorks />

      {/* 7. Customer testimonials */}
      <Testimonials />

      {/* 8. Certifications strip */}
      <TrustBadges />

      {/* 9. Request account form */}
      <LeadForm />

      {/* 10. Footer */}
      <SiteFooter />
    </>
  );
}
