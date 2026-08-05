"use client";

import { Accordion, type AccordionItem } from "@/components/ui/Accordion";
import { FlowButton } from "@/components/ui/flow-button";

const faqs: AccordionItem[] = [
  {
    id: "q1",
    title: "Do I need any prior experience with AI tools?",
    content:
      "No. We start from the basics. Whether you've never touched an AI tool or you've been experimenting for months, the curriculum meets you where you are.",
  },
  {
    id: "q2",
    title: "How much time do I need to invest each week?",
    content:
      "5-7 hours per week is ideal, but even 3-4 hours of focused work can deliver results. Some members landed their first clients within month one.",
  },
  {
    id: "q3",
    title: "What AI tools will I learn?",
    content:
      "You'll master Midjourney, FLUX, Veo3, Kling, Runway, ElevenLabs, HeyGen, and ChatGPT, along with advanced workflow stitching.",
  },
  {
    id: "q4",
    title: "Can I actually make money from this?",
    content:
      "Yes. Members land freelance gigs, sell AI-generated ads to brands, grow monetized theme pages, and offer content creation services.",
  },
  {
    id: "q5",
    title: "What's the difference between Course & Community?",
    content:
      "The Course gives you self-paced modules. The Community tier adds weekly live sessions, job board access, group portfolio reviews, and collaborative challenges.",
  },
  {
    id: "q6",
    title: "Can I upgrade from course to community or master?",
    content:
      "Yes, you can upgrade at any time. You will only pay the prorated difference between the tiers.",
  },
  {
    id: "q7",
    title: "What's the duration of this course?",
    content:
      "The core curriculum is structured as a self-paced 8-week roadmap, but you get lifetime access so you can learn at your own speed.",
  },
  {
    id: "q8",
    title: "Is this live classes or recorded content?",
    content:
      "It is a hybrid. The core modules are pre-recorded for high-production quality and lifetime reference, supplemented by weekly live Q&A sessions, workshops, and community events.",
  },
];

export function FAQ() {
  return (
    <section id="faqs" className="bg-dark-core py-24 px-4 relative overflow-hidden text-white z-0">
      <div className="absolute inset-0 opacity-15 pointer-events-none -z-10" style={{ backgroundImage: 'linear-gradient(to right, #262626 1px, transparent 1px)', backgroundSize: '80px 100%' }} />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="text-xs tracking-widest text-brand-orange font-bold uppercase">
            FAQ
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <Accordion items={faqs} theme="dark" defaultOpen="q1" />

        <div className="w-full text-center flex flex-col items-center justify-center gap-4 mt-16">
          <p className="text-gray-300 text-sm md:text-base max-w-md">
            Still got questions? Reach out, we&apos;re here to help
          </p>
          <FlowButton href="#contact" text="Reach out to us" variant="dark" />
        </div>
      </div>
    </section>
  );
}
