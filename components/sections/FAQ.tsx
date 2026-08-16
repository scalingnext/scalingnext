"use client";

import { Accordion, type AccordionItem } from "@/components/ui/Accordion";
import { FlowButton } from "@/components/ui/flow-button";

const faqs: AccordionItem[] = [
  {
    id: "q1",
    title: "Is ScalingNext free?",
    content: "Yes. Joining the community is completely free.",
  },
  {
    id: "q2",
    title: "What do I get inside?",
    content:
      "AI tips, tools, news, resources, webinars, and community discussions.",
  },
  {
    id: "q3",
    title: "Who is ScalingNext for?",
    content: "Anyone interested in learning and keeping up with AI.",
  },
  {
    id: "q4",
    title: "Do I need technical knowledge?",
    content:
      "No. ScalingNext should be useful whether you're just getting started or already using AI regularly.",
  },
  {
    id: "q5",
    title: "Are there live sessions?",
    content:
      "Yes. ScalingNext will host webinars and community sessions around useful AI topics.",
  },
  {
    id: "q6",
    title: "Is ScalingNext a course?",
    content: "No. It's a free AI content and learning community.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((faq) => ({
    "@type": "Question",
    "name": faq.title,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.content,
    },
  })),
};

export function FAQ() {
  return (
    <section id="faqs" className="bg-dark-core py-24 px-4 relative overflow-hidden text-white z-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
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
