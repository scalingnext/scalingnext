"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Boxes,
  Newspaper,
  GraduationCap,
  Clock,
  AlertTriangle,
} from "lucide-react";

const cards = [
  {
    Icon: Boxes,
    title: "Too many tools. New ones launch every single week.",
  },
  {
    Icon: Newspaper,
    title: "Too many updates. By the time you read them, they're old.",
  },
  {
    Icon: GraduationCap,
    title: "Too many tutorials. Most of them are noise.",
  },
  {
    Icon: Clock,
    title: "You're spending hours searching for what actually matters.",
  },
  {
    Icon: AlertTriangle,
    title: "AI is moving fast — and you don't want to fall behind.",
  },
  {
    Icon: Sparkles,
    title: "You want things you can actually use, not more hype.",
  },
];

/* ── 3D Tilt Card with light-reflection glow ── */

interface TiltState {
  rx: number;
  ry: number;
  gx: number;
  gy: number;
  on: boolean;
}

const ZERO: TiltState = { rx: 0, ry: 0, gx: 50, gy: 50, on: false };

function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState<TiltState>(ZERO);
  const raf = useRef(0);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      setT({
        rx: -(y * 14),
        ry: x * 14,
        gx: (x + 0.5) * 100,
        gy: (y + 0.5) * 100,
        on: true,
      });
    });
  }, []);

  const onLeave = useCallback(() => {
    cancelAnimationFrame(raf.current);
    setT(ZERO);
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ perspective: "800px" }}
    >
      <div
        className="relative w-full h-full rounded-2xl transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${t.rx}deg) rotateY(${t.ry}deg) scale(${t.on ? 1.03 : 1})`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Light-reflection glow that follows the cursor */}
        <div
          className="pointer-events-none absolute inset-0 z-10 rounded-2xl transition-opacity duration-300"
          style={{
            opacity: t.on ? 1 : 0,
            background: `radial-gradient(300px circle at ${t.gx}% ${t.gy}%, rgba(255,80,0,0.15) 0%, rgba(255,80,0,0.06) 40%, transparent 70%)`,
          }}
        />
        {/* Subtle border + outer glow */}
        <div
          className="pointer-events-none absolute inset-0 z-10 rounded-2xl transition-opacity duration-300"
          style={{
            opacity: t.on ? 1 : 0,
            boxShadow:
              "inset 0 0 0 1px rgba(255,80,0,0.2), 0 0 20px -5px rgba(255,80,0,0.2)",
          }}
        />
        {children}
      </div>
    </div>
  );
}

/* ── Section ── */

export function Problem() {
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto flex flex-col items-center">
      <div className="relative flex flex-col items-center">
        <span className="text-sm font-semibold text-brand-orange tracking-widest uppercase mb-2">
          Is this you?
        </span>
        <div className="relative">
          <h2 className="text-3xl md:text-5xl font-extrabold text-light-primary text-center max-w-3xl leading-tight">
            <span className="bg-gradient-to-r from-black to-brand-orange bg-clip-text text-transparent">
              You Know AI Is Changing Fast. <br />
              You Just Don&apos;t Know Where To Start.
            </span>
          </h2>
          <div className="absolute -top-10 right-0 md:-right-24 rotate-[-6deg] flex flex-col items-start z-20 w-32 md:w-36">
            <span className="font-handwritten text-brand-orange text-base md:text-xl tracking-wider font-bold whitespace-nowrap">
              SOUNDS FAMILIAR!
            </span>
            <svg
              viewBox="0 0 60 30"
              className="w-12 h-8 text-brand-orange ml-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M50 10 Q 25 5 10 15 M 18 7 L 10 15 L 18 23" />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full">
        {cards.map(({ Icon, title }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              type: "spring",
              stiffness: 90,
              damping: 22,
              delay: i * 0.05,
            }}
          >
            <TiltCard className="h-full cursor-default">
              <div className="bg-light-surface border border-light-subtle rounded-2xl p-6 flex flex-col gap-4 group h-full">
                <span className="h-10 w-10 rounded-full border border-light-subtle bg-white flex items-center justify-center text-brand-orange transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:border-brand-orange/40">
                  <Icon size={18} />
                </span>
                <p className="text-base font-medium text-light-primary leading-snug">
                  {title}
                </p>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mt-12 text-base md:text-lg text-light-muted text-center max-w-2xl"
      >
        ScalingNext filters that noise into useful information you can actually
        understand and use.
      </motion.p>
    </section>
  );
}
