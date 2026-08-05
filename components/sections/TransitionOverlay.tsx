"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// ─── Editable animation timing ──────────────────────────────────────────────
// The scroll window spans from "this section first peeks into view" (0) to
// "this section has fully passed the top of the screen" (1).
const SCROLL_WINDOW = ["start end", "end start"] as const;

// START_AT = how far into that window the animation begins.
//   0    → fires the instant the section peeks in (earliest / too early)
//   0.6  → waits until you're 60% through  ← current
//   1    → never fires
// Raise this number to make the animation happen LATER, lower it for EARLIER.
const START_AT = 0.6;

// Corner rounding: how far through the *remaining* travel the flat white line
// finishes rounding off. Larger (e.g. 0.4) → rounds more gradually.
const ROUND_SPAN = 0.25;

// The panel's final top corner radius once fully rounded.
const CORNER_RADIUS = 48; // px (= 3rem)

export function TransitionOverlay() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [...SCROLL_WINDOW],
  });

  // Everything below is held still until scroll progress reaches START_AT,
  // then plays out across the remaining window.
  const span = 1 - START_AT;

  // Dark panel fades 1 → 0.4 → 0.
  const fade = useTransform(
    scrollYProgress,
    [START_AT, START_AT + span * 0.7, 1],
    [1, 0.4, 0],
    { clamp: true },
  );
  // Light panel slides up from 100% → 0%.
  const slide = useTransform(
    scrollYProgress,
    [START_AT, 1],
    ["100%", "0%"],
    { clamp: true },
  );
  // Top corners start square (a flat white line) and round off once the panel
  // begins moving, so the reveal reads as a line easing into a rounded card.
  const radius = useTransform(
    scrollYProgress,
    [START_AT, START_AT + span * ROUND_SPAN],
    [0, CORNER_RADIUS],
    { clamp: true },
  );

  return (
    <section ref={ref} className="relative h-[30vh] -mt-2 overflow-hidden">
      <motion.div
        style={{ opacity: fade }}
        className="absolute inset-0 bg-dark-core"
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, #FF500033 0%, transparent 40%), radial-gradient(circle at 80% 70%, #FF500022 0%, transparent 40%)",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center px-6 md:px-8 z-10">
          <p className="text-center text-dark-muted text-xs uppercase tracking-widest">
            Conversion collage · student results
          </p>
        </div>
      </motion.div>

      <motion.div
        style={{
          y: slide,
          borderTopLeftRadius: radius,
          borderTopRightRadius: radius,
        }}
        className="absolute inset-x-0 bottom-0 h-full bg-light-core shadow-[0_-30px_60px_rgba(0,0,0,0.1)]"
      />
    </section>
  );
}
