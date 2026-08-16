import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { TransitionOverlay } from "@/components/sections/TransitionOverlay";
import { Problem } from "@/components/sections/Problem";
import { WhatIs } from "@/components/sections/WhatIs";
import { Inside } from "@/components/sections/Inside";
import { ToolsMarquee } from "@/components/sections/ToolsMarquee";
import { Signal } from "@/components/sections/Signal";
import { FAQ } from "@/components/sections/FAQ";
import { Community } from "@/components/sections/Community";
import { Webinars } from "@/components/sections/Webinars";
import { WhyScalingNext } from "@/components/sections/WhyScalingNext";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <TransitionOverlay />
      <Problem />
      <WhatIs />
      <Inside />
      <ToolsMarquee />
      <Signal />
      <FAQ />
      <Community />
      <Webinars />
      <WhyScalingNext />
      <FinalCTA />
      <Footer />
    </main>
  );
}
