"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  MessageSquare,
  Calendar,
  FolderOpen,
  Users,
  Lightbulb,
  Radio,
} from "lucide-react";

interface CommunityCard {
  Icon: typeof MessageSquare;
  category: string;
  title: string;
  body: string;
}

const cards: CommunityCard[] = [
  {
    Icon: MessageSquare,
    category: "Discussions",
    title: "Ask anything, get real answers",
    body: "Stuck on a prompt or a workflow? Ask the community and get practical answers from people who've actually done it.",
  },
  {
    Icon: Lightbulb,
    category: "Shared discoveries",
    title: "Members share what's working",
    body: "New tools, techniques, and finds — shared by the community, not just by us.",
  },
  {
    Icon: Calendar,
    category: "Events",
    title: "Sessions you can actually join",
    body: "Webinars, workshops, and community sessions announced right inside the community.",
  },
  {
    Icon: FolderOpen,
    category: "Shared resources",
    title: "A growing library of useful things",
    body: "Guides, templates, and curated links collected and organized in one place.",
  },
  {
    Icon: Radio,
    category: "Community activity",
    title: "Always something happening",
    body: "Discussions, shares, and updates keep the community moving — you'll never run out of things to explore.",
  },
  {
    Icon: Users,
    category: "Members",
    title: "People at every level",
    body: "Beginners, builders, creators, and professionals — everyone curious about AI has a place here.",
  },
];

export function Community() {
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
      id="community"
      ref={sectionRef}
      className="bg-light-core relative"
      // The section is tall enough to give vertical scroll room for the horizontal slide.
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
            Community
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-light-primary tracking-tight">
            You&apos;re Not Learning AI{" "}
            <span className="text-brand-orange">Alone.</span>
          </h2>
          <p className="mt-4 text-sm md:text-base text-light-muted max-w-xl mx-auto">
            ScalingNext brings together people who are curious about AI,
            building with it, experimenting with it, and trying to stay ahead
            of what&apos;s next.
          </p>
        </motion.div>

        {/* Horizontal scroll track — no native scroll; position driven by scrollYProgress */}
        <div
          ref={trackRef}
          className="flex-1 flex items-center overflow-hidden px-5 md:px-8 scrollbar-none"
        >
          <div className="flex gap-4 md:gap-6 w-max items-end">
            {cards.map((card, i) => {
              const num = String(i + 1).padStart(2, "0");
              const isOdd = i % 2 === 0; // 0-indexed: items 0, 2 are visually "odd" (1st, 3rd)

              return (
                <article
                  key={card.title}
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
                      {card.category}
                    </span>
                  </div>

                  {/* Icon */}
                  <span className="h-11 w-11 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-4">
                    <card.Icon size={20} strokeWidth={1.75} />
                  </span>

                  <h3 className="text-lg font-bold text-light-primary">
                    {card.title}
                  </h3>
                  <p className="text-sm text-light-muted mt-2">{card.body}</p>
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
            <span>{String(Math.min(Math.floor(progress * cards.length) + 1, cards.length)).padStart(2, "0")}</span>
            <span>{String(cards.length).padStart(2, "0")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
