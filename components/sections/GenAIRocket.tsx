"use client";

import { motion } from "framer-motion";
import { Wrench, DollarSign, RefreshCw, Quote } from "lucide-react";
import { FlowButton } from "@/components/ui/flow-button";

const tags = ["Creative Strategist", "AI Creator", "Video Editor", "AI Freelancer"];

const pillars = [
  {
    Icon: Wrench,
    label: "MASTER 20+ AI TOOLS",
    title: "Hands-on with every tool that matters",
    body: "From Veo3 and KlingAI to HeyGen, Higgsfield and Seedance, you won't just learn the tools, you'll learn when and how to use each one.",
  },
  {
    Icon: DollarSign,
    label: "MONETIZE VIDEOS",
    title: "Turn views into revenue",
    body: "Learn how to sell AI Ads, make money from AI Influencers or start your AI Content Agency.",
  },
  {
    Icon: RefreshCw,
    label: "WEEKLY UPDATES",
    title: "Stay ahead of the curve",
    body: "Every week, we drop new tutorials and step-by-step workflows so you can create viral-quality AI videos in minutes, not hours.",
  },
];

export function GenAIRocket() {
  return (
    <section className="bg-[#0A0A0A] py-24 px-4 relative overflow-hidden text-white">
      {/* Subtle radial blurs pinned behind the cards only */}
      <div className="absolute top-1/4 right-12 w-80 h-80 bg-[#FF5000]/5 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-24 w-80 h-80 bg-[#FF5000]/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center">
          <span className="text-xs tracking-widest text-brand-orange font-bold uppercase">
            Introducing GenAI Rocket
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-white tracking-tight max-w-3xl">
            The A-to-Z System for Monetizing AI Videos
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 items-start">
          <div className="md:sticky md:top-24 space-y-6">
            <span className="inline-block border border-[#262626] text-gray-300 text-xs font-bold uppercase tracking-wider rounded-full px-3 py-1.5">
              Get Ahead
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              The only community that teaches you to create &amp; monetize AI
              content.
            </h3>
            <div className="inline-block">
              <FlowButton href="#pricing" text="starting from ₹9999" variant="dark" />
            </div>
            <p className="text-sm md:text-base text-gray-300">
              Mastering prompt engineering unlocks a new wave of roles that
              blend creativity, technology, and strategy.
            </p>
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <span
                  key={t}
                  className="bg-[#161616] border border-[#262626] px-3 py-1.5 rounded-full text-xs font-semibold text-white"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {pillars.map(({ Icon, label, title, body }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ type: "spring", stiffness: 90, damping: 22, delay: i * 0.1 }}
                className="card-hover bg-[#161616] border border-[#262626] text-white rounded-2xl p-6 md:p-8 space-y-4 hover:border-brand-orange/40 hover:shadow-[0_8px_30px_-12px_rgba(255,80,0,0.35)] transition-all duration-300"
              >
                <span className="inline-flex items-center gap-2 text-brand-orange text-xs font-bold tracking-wider uppercase">
                  <Icon size={14} />
                  {label}
                </span>
                <h4 className="text-xl font-semibold text-white">
                  {title}
                </h4>
                <p className="text-sm md:text-base text-gray-300">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 90, damping: 22 }}
          className="w-full max-w-4xl mx-auto bg-[#161616]/50 border border-[#262626] text-white rounded-2xl p-6 md:p-8 mt-16 relative text-center flex flex-col items-center justify-center hover:border-brand-orange/40 transition-colors duration-300"
        >
          <Quote
            size={32}
            className="text-brand-orange mb-4"
            strokeWidth={1.5}
          />
          <p className="text-lg md:text-xl text-white font-medium max-w-2xl">
            Within just 3 weeks of joining this AI community, I built a
            high-converting portfolio of AI-powered product ads and closed my
            first $500 client as a college student!
          </p>
          <div className="mt-6 flex items-center gap-3">
            <img 
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80" 
              alt="Sarthak Jain" 
              className="h-12 w-12 rounded-full object-cover border border-[#262626]" 
            />
            <div className="text-left">
              <p className="text-sm font-bold text-white">
                Sarthak Jain
              </p>
              <p className="text-xs text-gray-300">19, Freelancer</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
