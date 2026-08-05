"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// ─── Editable animation timing ──────────────────────────────────────────────
// The image scales up as you scroll, so it reads as coming toward the viewer.
//
// The scroll window spans from "the image first peeks into view" (0) to
// "the image has fully passed the top of the screen" (1).
const SCROLL_WINDOW = ["start end", "end start"] as const;

// How much the image grows across that window.
//   1    = its natural size (no zoom)
//   1.18 = ends 18% larger  ← current
// Raise SCALE_TO for a stronger "coming toward you" push.
const SCALE_FROM = 1;
const SCALE_TO = 1.18;

export function Founders() {
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: [...SCROLL_WINDOW],
  });

  // Smooth, continuous zoom across the whole window — no gate, no snapping.
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [SCALE_FROM, SCALE_TO],
    { clamp: true },
  );

  return (
    <section className="bg-light-core pt-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="text-xs tracking-widest text-brand-orange font-bold uppercase">
            Meet The Founders
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-light-primary tracking-tight">
            The People Behind Growth Rocket AI
          </h2>
        </motion.div>
      </div>

      {/* Full-bleed image: fills the width of the section, bottom flush with
          the section edge so it runs straight into the next one. */}
      <div ref={imageRef} className="w-full mt-12 relative overflow-hidden">
        <motion.img
          style={{ scale }}
          src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=2000&q=80"
          alt="Founders"
          className="w-full h-auto aspect-video md:aspect-[21/9] object-cover origin-bottom"
        />
        {/* The seamless fade overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
