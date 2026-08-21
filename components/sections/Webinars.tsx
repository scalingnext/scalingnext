"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Wrench, Workflow, Blocks, ArrowUpRight } from "lucide-react";

// ─── Editable animation timing ──────────────────────────────────────────────
// Vertical parallax: the image drifts downward inside a fixed window as you
// scroll (at a slower rate than the page), so it reads as sitting deeper in
// the background.
//
// The scroll window spans from "the container first peeks into view" (0) to
// "the container has fully passed the top of the screen" (1).
const SCROLL_WINDOW = ["start end", "end start"] as const;

// How far the image's center drifts over that window, as a % of its height.
//   -25% = starts shifted up    ← current
//    10% = ends shifted down    ← current
// Widen the gap for a stronger parallax push.
const Y_FROM = "-25%";
const Y_TO = "10%";

// The image renders 50% taller than its window so the drift above never
// exposes empty space at the top or bottom.
const IMAGE_HEIGHT = "150%";

const sessions = [
  {
    Icon: Wrench,
    category: "AI Tools",
    title: "Tools worth trying this month",
    body: "A live walkthrough of the tools we're actually using — what they're good at, and where they fall short.",
  },
  {
    Icon: Workflow,
    category: "AI Workflows",
    title: "Workflows that save hours",
    body: "Step-by-step sessions on practical workflows you can copy into your own work the same day.",
  },
  {
    Icon: Blocks,
    category: "Building with AI",
    title: "Building real things with AI",
    body: "Hands-on sessions where we build, break, and fix — with the community watching and asking questions.",
  },
];

export function Webinars() {
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: [...SCROLL_WINDOW],
  });

  // Linear scrub: vertical drift maps 1:1 to scroll across the whole window.
  const y = useTransform(scrollYProgress, [0, 1], [Y_FROM, Y_TO], {
    clamp: true,
  });

  return (
    <section id="webinars" className="bg-light-core pt-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="text-xs tracking-widest text-brand-orange font-bold uppercase">
            Webinars &amp; Live Sessions
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-light-primary tracking-tight">
            Learn Beyond the Feed.
          </h2>
          <p className="mt-4 text-sm md:text-base text-light-muted max-w-xl mx-auto">
            Join practical webinars and live sessions on the tools, workflows,
            and ideas shaping AI.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {sessions.map(({ Icon, category, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                type: "spring",
                stiffness: 90,
                damping: 22,
                delay: i * 0.1,
              }}
              className="card-hover bg-light-surface border border-light-subtle rounded-2xl p-6 flex flex-col gap-4 h-full hover:border-brand-orange/40 transition-colors duration-300"
            >
              <div className="flex items-center justify-between">
                <span className="h-10 w-10 rounded-full border border-light-subtle bg-white flex items-center justify-center text-brand-orange">
                  <Icon size={18} />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand-orange/10 text-brand-orange border border-brand-orange/20">
                  {category}
                </span>
              </div>
              <h3 className="text-lg font-bold text-light-primary">{title}</h3>
              <p className="text-sm text-light-muted flex-1">{body}</p>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-light-primary uppercase tracking-wider">
                Free to join
                <ArrowUpRight size={14} className="text-brand-orange" />
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full-bleed backdrop: fills the width of the section, bottom flush with
          the section edge so it runs straight into the next one.

          Drawn entirely in CSS rather than loaded from a URL. The previous
          version pulled a stock photo from images.unsplash.com — a third-party
          dependency on a page we do not control, and one that would leave a
          hole in the layout if it ever 404'd or got rate-limited. */}
      <div
        ref={imageRef}
        className="w-full mt-12 relative overflow-hidden aspect-video md:aspect-[21/9] bg-[#0E0E10]"
      >
        {/* Moving layer: taller than the window (150%) so the vertical drift
            never exposes empty space at the top or bottom. `y` is a % of this
            layer's own height, so the container needs no explicit height. */}
        <motion.div style={{ y, height: IMAGE_HEIGHT }} className="w-full relative">
          {/* Perspective grid — reads as a room/stage receding into the dark. */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px)," +
                "linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
              maskImage: "radial-gradient(ellipse 70% 60% at 50% 45%, black, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 60% at 50% 45%, black, transparent 75%)",
            }}
          />
          {/* Warm key light, off-centre so the composition is not symmetrical. */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 45% 55% at 38% 40%, rgba(255,80,0,0.20), transparent 70%)," +
                "radial-gradient(ellipse 40% 50% at 72% 62%, rgba(74,158,255,0.13), transparent 70%)",
            }}
          />
        </motion.div>
        {/* Static fade overlay — scrolls with the page, no animation. */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
