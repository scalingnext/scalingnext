"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  category: string;
  before: string;
  after: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Harsh Singh",
    role: "AI Video Editor",
    category: "Career Switch",
    before:
      "Watched every AI video on YouTube. Never made a single rupee from it.",
    after:
      "I got my first AI video editing job, landing a monthly salary of ₹30,000 while still pursuing BA.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    name: "Sarthak Jain",
    role: "AI Freelancer",
    category: "Freelancing",
    before:
      "Never understood how to find high paying clients and make money using AI",
    after:
      "Now I know how to make a portfolio, reach out to clients and get paid work. I made my first 50K in just 1 month!",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    name: "Ritu Jain",
    role: "AI Freelancer",
    category: "Side Income",
    before:
      "I joined just to learn a few AI tools. Didn't think I could actually earn from this.",
    after:
      "The weekly challenge pushed me out of my comfort zone. I ended up winning a cash prize. Now I know I can build and earn.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    name: "Akash",
    role: "AI Creator",
    category: "Community",
    before:
      "Learning AI alone from YouTube felt isolating. I'd get stuck and have no one to ask.",
    after:
      "Whenever I get stuck, someone is always there to help. The live sessions make it engaging. It doesn't feel like you're learning alone.",
    avatar:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&h=150&q=80",
  },
];

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  // scrollYProgress tracks how far through the pinned section the user has scrolled
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Map vertical scroll → horizontal slide (0% → -(totalWidth - viewport))
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      setProgress(v);
      if (trackRef.current) {
        const maxScroll = trackRef.current.scrollWidth - trackRef.current.offsetWidth;
        trackRef.current.scrollLeft = v * maxScroll;
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Progress bar width driven by the same scroll progress
  const barWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="bg-light-core relative"
      // The section is tall enough to give vertical scroll room for the horizontal slide.
      // 250vh ≈ each testimonial gets ~50vh of vertical scroll to reveal.
      style={{ height: "250vh" }}
    >
      {/* Sticky container — pins the visible content while the section scrolls */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center px-4 pb-8 pt-6"
        >
          <span className="text-xs tracking-widest text-brand-orange font-bold uppercase">
            Testimonials
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-light-primary tracking-tight">
            Our Students Don&apos;t Just Learn,{" "}
            <span className="text-brand-orange">They Achieve.</span>
          </h2>
        </motion.div>

        {/* Horizontal scroll track — no native scroll; position driven by scrollYProgress */}
        <div
          ref={trackRef}
          className="flex-1 flex items-center overflow-hidden px-5 md:px-8 scrollbar-none"
        >
          <div className="flex gap-4 md:gap-6 w-max items-end">
            {testimonials.map((t, i) => {
              const num = String(i + 1).padStart(2, "0");
              const isOdd = i % 2 === 0; // 0-indexed: items 0, 2 are visually "odd" (1st, 3rd)

              return (
                <article
                  key={t.name}
                  className={`card-hover bg-white border border-light-subtle rounded-3xl p-5 md:p-6 w-[300px] md:w-[400px] flex-shrink-0 relative shadow-sm hover:shadow-xl hover:border-brand-orange/30 flex flex-col justify-between transition-all duration-300 ${
                    isOdd ? "mb-8 md:mb-24" : "mt-8 md:mt-24"
                  }`}
                >
                  {/* Number + Category badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl md:text-4xl font-extrabold text-light-subtle/60 select-none">
                      {num}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand-orange/10 text-brand-orange border border-brand-orange/20">
                      {t.category}
                    </span>
                  </div>

                  {/* Quote icon */}
                  <Quote
                    size={20}
                    className="absolute top-4 right-4 text-brand-orange/40"
                    strokeWidth={1.5}
                  />

                  {/* Avatar + info */}
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="h-12 w-12 rounded-full object-cover border border-light-subtle flex-shrink-0"
                    />
                    <div>
                      <p className="text-sm font-bold text-light-primary">
                        {t.name}
                      </p>
                      <p className="text-xs text-light-muted">{t.role}</p>
                    </div>
                  </div>

                  {/* Before / After */}
                  <div className="flex flex-col gap-2 mt-2">
                    <div className="bg-gray-100 rounded-xl p-3 md:p-4">
                      <span className="text-[10px] font-bold text-gray-500 tracking-wider mb-2 block">
                        BEFORE
                      </span>
                      <p className="text-sm text-gray-700">{t.before}</p>
                    </div>
                    <div className="bg-[#111111] rounded-xl p-3 md:p-4">
                      <span className="text-[10px] font-bold text-gray-400 tracking-wider mb-2 block">
                        AFTER
                      </span>
                      <p className="text-sm text-white font-medium">
                        {t.after}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-3xl mx-auto px-5 md:px-8 pb-8">
          <div className="relative h-1 bg-light-subtle rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-brand-orange rounded-full"
              style={{ width: barWidth }}
            />
          </div>
          <div className="flex justify-between mt-2 text-[10px] font-bold uppercase tracking-widest text-light-muted">
            <span>{String(Math.min(Math.floor(progress * testimonials.length) + 1, testimonials.length)).padStart(2, "0")}</span>
            <span>{String(testimonials.length).padStart(2, "0")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
