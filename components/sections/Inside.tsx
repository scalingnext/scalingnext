"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, Zap } from "lucide-react";
import { FlowButton } from "@/components/ui/flow-button";

interface PillarItem {
  num: string;
  title: string;
}

interface Pillar {
  index: number;
  title: string;
  items: PillarItem[];
}

// Content pillars for ScalingNext — what members actually find inside.
const pillars: Pillar[] = [
  {
    index: 1,
    title: "Practical AI",
    items: [
      { num: "01", title: "Prompts and workflows you can reuse" },
      { num: "02", title: "Real use cases, broken down step by step" },
      { num: "03", title: "Techniques that save you real time" },
    ],
  },
  {
    index: 2,
    title: "AI Tools",
    items: [
      { num: "01", title: "Tools worth trying this week" },
      { num: "02", title: "Honest first impressions, not ads" },
      { num: "03", title: "Comparisons and alternatives" },
    ],
  },
  {
    index: 3,
    title: "AI News",
    items: [
      { num: "01", title: "The updates that actually matter" },
      { num: "02", title: "What changed and why it matters" },
    ],
  },
  {
    index: 4,
    title: "Webinars",
    items: [
      { num: "01", title: "Live sessions on useful topics" },
      { num: "02", title: "Practical discussions and Q&A" },
    ],
  },
  {
    index: 5,
    title: "Resources",
    items: [
      { num: "01", title: "Guides, templates, and references" },
      { num: "02", title: "Curated links worth saving" },
    ],
  },
  {
    index: 6,
    title: "Opportunities",
    items: [
      { num: "01", title: "Launches, programs, and events" },
      { num: "02", title: "Interesting discoveries worth knowing" },
    ],
  },
];

const inside = [
  "Practical AI tips and workflows",
  "Tools worth knowing about",
  "The updates that actually matter",
  "Webinars and live sessions",
  "Guides, templates, and resources",
  "Opportunities and discoveries",
];

export function Inside() {
  return (
    <section id="resources" className="bg-light-core py-20 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center"
      >
        <h2 className="text-3xl md:text-5xl font-extrabold text-light-primary tracking-tight">
          What You&apos;ll Find Inside{" "}
          <span className="text-brand-orange">ScalingNext</span>
        </h2>
        <p className="mt-3 text-base md:text-lg text-light-muted max-w-2xl mx-auto">
          Six content pillars, one goal — keeping you ahead{" "}
          <span className="text-brand-orange font-semibold">
            without the noise.
          </span>
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-12 items-start">
        {/* Pillars listed inline, like content channels rather than modules */}
        <div className="md:col-span-7 space-y-10">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                type: "spring",
                stiffness: 90,
                damping: 22,
                delay: i * 0.08,
              }}
              className="group"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                  Pillar {pillar.index}
                </span>
                <span className="h-px flex-1 bg-light-subtle" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-light-primary mb-4 group-hover:text-brand-orange transition-colors duration-300">
                {pillar.title}
              </h3>
              <ul className="space-y-3">
                {pillar.items.map((item) => (
                  <li
                    key={item.num}
                    className="flex items-start gap-4 text-sm md:text-base group/lesson"
                  >
                    <span className="font-mono text-xs font-bold text-brand-orange/70 mt-0.5 w-5 flex-shrink-0">
                      {item.num}
                    </span>
                    <span className="text-light-primary/90 group-hover/lesson:text-light-primary transition-colors">
                      {item.title}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 90, damping: 22 }}
          className="md:col-span-5 md:sticky md:top-24 bg-[#111111] border border-[#262626] text-white rounded-3xl p-6 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Inside ScalingNext</h3>
            <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider bg-brand-orange/20 text-brand-orange px-2 py-1 rounded-full">
              <Zap size={12} /> Free
            </span>
          </div>

          <div>
            <p className="text-xs font-bold tracking-wider text-gray-300 mb-2">
              WHAT YOU GET WHEN YOU JOIN
            </p>
            <ul className="space-y-2">
              {inside.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <span className="mt-0.5 h-4 w-4 rounded-full bg-brand-orange/15 text-brand-orange flex items-center justify-center flex-shrink-0">
                    <Check size={10} />
                  </span>
                  <span className="text-white/90">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-2 bg-[#161616] border border-[#262626] rounded-xl px-3 py-2.5 text-white">
            <span className="text-brand-orange">
              <Sparkles size={14} />
            </span>
            <span className="text-xs font-semibold">
              Open to everyone — no payment, no catch.
            </span>
          </div>

          <div className="w-full flex justify-center">
            <FlowButton href="https://chat.whatsapp.com/CKzAuoLtl8w8jzeTWyBWU6" text="Join ScalingNext" variant="dark" className="w-full justify-center" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
