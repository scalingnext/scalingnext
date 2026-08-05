"use client";

import { motion } from "framer-motion";
import { Rocket, FileCheck, Layers, Users } from "lucide-react";
import { FlowButton } from "@/components/ui/flow-button";

function HandshakeIcon({ size = 28 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 17l1.5 1.5a2 2 0 0 0 2.8 0l.7-.7a2 2 0 0 1 2.8 0l1.4 1.4a2 2 0 0 1-2.8 2.8l-1.4-1.4" />
      <path d="M14 14l1.5-1.5a2 2 0 0 0 0-2.8l-.7-.7a2 2 0 0 1 0-2.8l1.4-1.4a2 2 0 0 1 2.8 0l1.4 1.4a2 2 0 0 1 0 2.8L19 10.4" />
      <path d="M3 12l3-3 3 3-3 3z" />
      <path d="M21 12l-3-3-3 3 3 3z" />
    </svg>
  );
}

const capabilities = [
  {
    Icon: Layers,
    title: "Master AI Content with 7 detailed modules",
    body: "Go from absolute beginner to producing monetizable AI videos in 8 weeks.",
  },
  {
    Icon: FileCheck,
    title: "Learn by Doing, Not Watching",
    body: "Every module ends with a shipped project — portfolio-ready from day one.",
  },
  {
    Icon: Users,
    title: "Lifetime Access with All Future Updates",
    body: "Pay once, keep access forever — including all new tools and modules we ship.",
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

      {/* 1. Floating Icons */}
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
          <div className="flex -space-x-1.5 mr-1 flex-shrink-0">
            <img className="h-4 w-4 rounded-full border border-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80" alt="Student" />
            <img className="h-4 w-4 rounded-full border border-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80" alt="Student" />
          </div>
          <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
          <span>Registrations Ongoing!</span>
        </span>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 90, damping: 22 }}
          className="text-3xl md:text-5xl font-extrabold text-light-primary tracking-tight max-w-2xl leading-tight my-4"
        >
          Join India&apos;s Biggest AI Community
        </motion.h2>

        <p className="text-base text-light-muted max-w-md mb-8">
          Members report promotions, raises, or new opportunities within 3
          months.
        </p>

        {/* 2. Button and Annotation */}
        <div className="relative inline-block mt-8">
          <FlowButton
            onClick={() => {
              document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
            }}
            text="starting from ₹9999"
            variant="light"
          />
          
          {/* Annotation positioned OUTSIDE the button */}
          <div className="absolute -top-10 -right-56 hidden md:flex flex-col items-start gap-1 rotate-[4deg] z-20 w-64">
            <span className="font-handwritten text-brand-orange text-lg tracking-wide font-bold">
              500+ PROFESSIONALS ARE ALREADY AHEAD OF YOU
            </span>
            <svg viewBox="0 0 60 30" className="w-10 h-10 text-brand-orange ml-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 5 Q 30 15 50 25 M 45 20 L 50 25 L 42 28" />
            </svg>
          </div>
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
