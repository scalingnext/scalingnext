"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Marquee } from "@/components/ui/Marquee";
import KineticGrid from "@/components/ui/kinetic-grid";

const PROMPT_TEXT = "Create a faceless YouTube video about Indian mythology";

const socialProofAvatars = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=80&h=80&q=80",
];

const marqueeItems = [
  { tag: "MAGGI", img: "https://images.unsplash.com/photo-1608500218861-0033818e6988?auto=format&fit=crop&w=400&q=80" },
  { tag: "rhode", img: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=400&q=80" },
  { tag: "H2 CHIP", img: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=400&q=80" },
];

function HeroPrompt() {
  // Per-character typing reveal with a blinking cursor.
  // Respects prefers-reduced-motion: render the full sentence instantly.
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setTyped(PROMPT_TEXT);
      setDone(true);
      return;
    }
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setTyped(PROMPT_TEXT.slice(0, i));
      if (i >= PROMPT_TEXT.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, 45);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-2xl bg-[#161616] border border-[#262626] text-white rounded-2xl p-4 my-8 shadow-2xl text-left flex flex-col justify-between h-32 relative">
      <div className="w-full overflow-hidden">
        <p className="overflow-hidden whitespace-normal break-words md:whitespace-nowrap text-white font-mono flex items-center text-xs md:text-base">
          <span>{typed}</span>
          <span className="typing-cursor h-5" aria-hidden={!done} />
        </p>
      </div>
      <div className="flex items-center justify-between absolute bottom-4 left-4 right-4 max-w-[calc(100%-2rem)]">
        <span className="bg-[#0A0A0A] border border-[#262626] text-xs px-3 py-1 rounded-md text-gray-300 flex items-center gap-1">
          <span className="text-brand-orange">+</span>
          <span>⚡ Tools</span>
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Voice input"
            className="h-8 w-8 rounded-full bg-[#0A0A0A] border border-[#262626] flex items-center justify-center text-gray-300 hover:text-white transition-colors"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="3" width="6" height="12" rx="3" />
              <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Run"
            className="h-8 w-8 rounded-full bg-brand-orange flex items-center justify-center text-white shadow-[0_0_15px_#FF5000aa]"
          >
            <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
              <path d="M5 3l14 9-14 9V3z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <KineticGrid
      globalColor="monochrome"
      className="text-white pt-28 pb-12 flex flex-col items-center justify-start text-center"
    >
      <div id="top" className="px-4 w-full flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl text-3xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15]"
        >
          Master AI Content Creation In 8 Weeks & Earn{" "}
          <span className="brand-orange-grad bg-clip-text text-transparent">
            ₹50,000 more every month.
          </span>
        </motion.h1>

        <HeroPrompt />

        {/* Social proof — matches the live site */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3"
        >
          <div className="flex -space-x-3">
            {socialProofAvatars.map((src, i) => (
              <img
                key={i}
                src={src}
                alt="Student"
                className="h-9 w-9 rounded-full border-2 border-[#000000] object-cover"
              />
            ))}
          </div>
          <p className="text-sm text-gray-300">
            <span className="font-bold text-white">500+ professionals</span> are already ahead of you.
          </p>
        </motion.div>
      </div>

      {/* Seamless infinite marquee using the shared component (no loop seam) */}
      <div className="w-full mt-12">
        <Marquee duration={22}>
          {marqueeItems.map((item, i) => (
            <div
              key={`${item.tag}-${i}`}
              className="w-44 h-72 rounded-xl flex-shrink-0 relative overflow-hidden bg-[#161616] border border-[#262626] group"
            >
              <img
                src={item.img}
                alt={item.tag}
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div className="absolute bottom-4 left-4 bg-white text-black px-2 py-1 rounded text-[10px] font-extrabold uppercase tracking-wider z-10">
                {item.tag}
              </div>
            </div>
          ))}
        </Marquee>
      </div>

      {/* Gentle fade from the kinetic grid hero into the next section so the
          grid dissolves instead of hard-cutting. Sits above the canvas (z-0). */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 z-[5] bg-gradient-to-b from-transparent to-[#0A0A0A]"
      />
    </KineticGrid>
  );
}
