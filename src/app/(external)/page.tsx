import CTA from "./_components/cta";
import FrequentlyAskedQuestions from "./_components/faq";
import Features from "./_components/features";
import HeroSection from "./_components/hero";
import Pricing from "./_components/pricing";
import Testimonials from "./_components/testimonials";

export default function Page() {
  return (
    <main>
      <HeroSection />
      <Features />
      <Pricing />
      <FrequentlyAskedQuestions />
      <Testimonials />
      <CTA />
    </main>
  );
}
