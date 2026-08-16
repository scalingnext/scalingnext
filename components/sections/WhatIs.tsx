"use client";

import { motion } from "framer-motion";
import {
  Lightbulb,
  Wrench,
  Newspaper,
  Workflow,
  FolderOpen,
  Users,
} from "lucide-react";

const pillars = [
  {
    Icon: Lightbulb,
    label: "AI TIPS",
    title: "Practical techniques & prompts",
    body: "Prompts, workflows, and ideas you can actually use to save real time.",
  },
  {
    Icon: Wrench,
    label: "AI TOOLS",
    title: "Curated tools worth trying",
    body: "Useful tools and platforms filtered down to the ones actually worth your time.",
  },
  {
    Icon: Newspaper,
    label: "AI UPDATES",
    title: "Important news without noise",
    body: "Key model launches and feature updates explained clearly as they happen.",
  },
  {
    Icon: Workflow,
    label: "AI WORKFLOWS",
    title: "Step-by-step automation",
    body: "Practical workflows and systems you can copy into your daily routine.",
  },
  {
    Icon: FolderOpen,
    label: "AI RESOURCES",
    title: "Guides, templates & references",
    body: "Curated resource libraries, cheatsheets, and guides collected in one place.",
  },
  {
    Icon: Users,
    label: "COMMUNITY",
    title: "Learn & build together",
    body: "Connect, share discoveries, and ask questions alongside other AI builders.",
  },
];

export function WhatIs() {
  return (
    <section className="bg-[#0A0A0A] py-16 md:py-20 px-4 relative overflow-hidden text-white">
      {/* Subtle background ambient blur */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FF5000]/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Centered Heading & Single-line Explanation */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Everything useful about AI. In one place.
          </h2>
          <p className="mt-3 text-sm md:text-base text-gray-300">
            AI moves fast. We help you keep up — without the noise.
          </p>
        </div>

        {/* Compact 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 mt-10 sm:mt-12">
          {pillars.map(({ Icon, label, title, body }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.4,
                delay: i * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="card-hover bg-[#141414] border border-[#222222] rounded-xl p-5 hover:border-brand-orange/40 hover:bg-[#161616] transition-all duration-300 flex flex-col justify-between text-left"
            >
              <div>
                <div className="flex items-center gap-2 text-brand-orange text-[11px] font-bold tracking-wider uppercase mb-2">
                  <Icon size={14} strokeWidth={2} />
                  <span>{label}</span>
                </div>
                <h3 className="text-base font-semibold text-white leading-snug">
                  {title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-400 mt-2 leading-relaxed">
                {body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
