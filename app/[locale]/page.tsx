import { Navbar }          from "@/components/home/Navbar";
import { Hero }            from "@/components/home/Hero";
import { Marquee }         from "@/components/home/Marquee";
import { Stats }           from "@/components/home/Stats";
import { ValueProps }      from "@/components/home/ValueProps";
import { Categories }      from "@/components/home/Categories";
import { HowItWorks }      from "@/components/home/HowItWorks";
import { Testimonials }    from "@/components/home/Testimonials";
import { TrustBadges }     from "@/components/home/TrustBadges";
import { LeadForm }        from "@/components/home/LeadForm";
import { SiteFooter }      from "@/components/home/SiteFooter";
import { ScrollRevealInit } from "@/components/home/ScrollReveal";
export default function HomePage() {
  return (
    <>
      <ScrollRevealInit />
      <Navbar />
      <Hero />
      <Marquee />
      <Stats />
      <ValueProps />
      <Categories />
      <HowItWorks />
      <Testimonials />
      <TrustBadges />
      <LeadForm />
      <SiteFooter />
    </>
  );
}
