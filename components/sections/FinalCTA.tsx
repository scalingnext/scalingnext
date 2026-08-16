"use client";

import { motion } from "framer-motion";
import { Rocket, FileCheck, Lightbulb, Users } from "lucide-react";
import { FlowButton } from "@/components/ui/flow-button";

const capabilities = [
  {
    Icon: Lightbulb,
    title: "Practical insights",
    body: "Tips, workflows, and ideas you can apply the same day you read them.",
  },
  {
    Icon: FileCheck,
    title: "Curated resources",
    body: "Guides, templates, and tools — filtered down to what's actually useful.",
  },
  {
    Icon: Users,
    title: "A community that shares",
    body: "Discussions, discoveries, and live sessions with people exploring AI too.",
  },
];

export function FinalCTA() {
  return (
    <section
      id="contact"
      className="bg-light-surface py-16 md:py-24 px-4 border-t border-light-subtle text-center relative overflow-hidden flex flex-col items-center"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, #E5E7EB 1px, transparent 1px), linear-gradient(to bottom, #E5E7EB 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 70%)",
        }}
      />

      {/* Floating icons */}
      <motion.span animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-16 left-12 hidden md:block text-brand-orange/80 z-20">
        <FileCheck size={32} strokeWidth={1.5}/>
      </motion.span>
      <motion.span animate={{ y: [0, 15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-24 right-16 hidden md:block text-brand-orange/80 z-20">
        <Rocket size={32} strokeWidth={1.5}/>
      </motion.span>
      <span className="absolute bottom-40 right-20 hidden md:block text-light-muted">
        <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M8 4l-4 8 4 8M16 4l4 8-4 8" />
        </svg>
      </span>
      <span className="absolute top-32 left-1/3 hidden md:block h-10 w-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 border border-white shadow" />
      <span className="absolute bottom-32 right-1/3 hidden md:block h-8 w-8 rounded-full bg-gradient-to-br from-rose-400 to-fuchsia-500 border border-white shadow" />

      <div className="relative z-10 flex flex-col items-center w-full">
        <span className="inline-flex items-center gap-1.5 bg-white border border-light-subtle text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full text-light-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
          <span>Free to join · Open to everyone</span>
        </span>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 90, damping: 22 }}
          className="text-3xl md:text-5xl font-extrabold text-light-primary tracking-tight max-w-2xl leading-tight my-4"
        >
          Stay ahead of what&apos;s next.
        </motion.h2>

        <p className="text-base text-light-muted max-w-md mb-8">
          Join ScalingNext for practical AI insights, useful tools, important
          updates, and live sessions — completely free.
        </p>

        <div className="relative inline-block mt-8">
          <FlowButton href="https://chat.whatsapp.com/CKzAuoLtl8w8jzeTWyBWU6" text="Join ScalingNext" variant="light" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12 md:mt-16 max-w-4xl w-full text-left pt-8 border-t border-light-subtle">
          {capabilities.map(({ Icon, title, body }) => (
            <div key={title} className="flex flex-col gap-2">
              <span className="h-9 w-9 rounded-lg bg-white border border-light-subtle flex items-center justify-center text-brand-orange">
                <Icon size={16} />
              </span>
              <h3 className="text-base font-semibold text-light-primary">
                {title}
              </h3>
              <p className="text-sm text-light-muted">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
