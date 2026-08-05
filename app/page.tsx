import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { TransitionOverlay } from "@/components/sections/TransitionOverlay";
import { PainPoints } from "@/components/sections/PainPoints";
import { GenAIRocket } from "@/components/sections/GenAIRocket";
import { Curriculum } from "@/components/sections/Curriculum";
import { ToolsMarquee } from "@/components/sections/ToolsMarquee";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { Testimonials } from "@/components/sections/Testimonials";
import { Founders } from "@/components/sections/Founders";
import { AudienceFit } from "@/components/sections/AudienceFit";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <TransitionOverlay />
      <PainPoints />
      <GenAIRocket />
      <Curriculum />
      <ToolsMarquee />
      <Pricing />
      <FAQ />
      <Testimonials />
      <Founders />
      <AudienceFit />
      <FinalCTA />
      <Footer />
    </main>
  );
}
