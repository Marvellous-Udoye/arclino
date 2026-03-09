import AudienceGrid from "./_components/audience-grid";
import CTA from "./_components/cta";
import FrequentlyAskedQuestions from "./_components/faq";
import Features from "./_components/features";
import HeroSection from "./_components/hero";
import HowItWorks from "./_components/how-it-works";
import LogoStrip from "./_components/logo-strip";
import Pricing from "./_components/pricing";
import Testimonials from "./_components/testimonials";

export default function Page() {
  return (
    <main>
      <HeroSection />
      <LogoStrip />
      <Features />
      <HowItWorks />
      <AudienceGrid />
      <Pricing />
      <FrequentlyAskedQuestions />
      <Testimonials />
      <CTA />
    </main>
  );
}
