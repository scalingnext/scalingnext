"use client";

import { motion } from "framer-motion";
import { Check, Award, Clock, Infinity as InfinityIcon, Zap } from "lucide-react";
import { FlowButton } from "@/components/ui/flow-button";

interface Lesson {
  num: string;
  title: string;
}

interface Module {
  index: number;
  title: string;
  lessons: Lesson[];
}

// Module content sourced from the live course (ai.growthrocket.media)
// to match what students actually receive — not fabricated descriptions.
const modules: Module[] = [
  {
    index: 1,
    title: "AI Image Generation",
    lessons: [
      { num: "01", title: "Master ChatGPT & Prompt Engineering" },
      { num: "02", title: "Create AI images using Nano Banana" },
      { num: "03", title: "Create AI images using Seedream" },
    ],
  },
  {
    index: 2,
    title: "AI Video Studio",
    lessons: [
      { num: "01", title: "Master Veo3 to make AI videos" },
      { num: "02", title: "Master Kling to make AI videos" },
      { num: "03", title: "Master Seedance to make AI videos" },
      { num: "04", title: "Master Sora to make AI videos" },
      { num: "05", title: "Master Higgsfield to make AI videos" },
    ],
  },
  {
    index: 3,
    title: "AI Voice & Audio",
    lessons: [
      { num: "01", title: "Clone audio & voice using Eleven Labs" },
      { num: "02", title: "Create music using Suno" },
    ],
  },
  {
    index: 4,
    title: "AI Avatars & Digital Clones",
    lessons: [
      { num: "01", title: "Create your realistic AI Avatars" },
      { num: "02", title: "Creating digital clones using HeyGen" },
    ],
  },
  {
    index: 5,
    title: "AI Ads & UGC Models",
    lessons: [
      { num: "01", title: "How to create AI product ads" },
      { num: "02", title: "How to create AI UGC ads" },
    ],
  },
  {
    index: 6,
    title: "Create & Sell AI Videos",
    lessons: [
      { num: "01", title: "Building your portfolio" },
      { num: "02", title: "4 ways to find clients" },
      { num: "03", title: "5 more ways to find clients" },
      { num: "04", title: "How to pitch and close clients" },
      { num: "05", title: "Delivering and completing projects" },
    ],
  },
  {
    index: 7,
    title: "Monetizing AI Influencers",
    lessons: [
      { num: "01", title: "Create viral AI Influencers" },
      { num: "02", title: "Make money from AI Influencers" },
    ],
  },
];

const features = [
  "Instant access to full curriculum",
  "All future updates and bonus content included",
  "Join weekly live sessions",
  "Content reward challenges & paid work opportunities",
  "Get prompts, templates and workflows",
];

export function Curriculum() {
  return (
    <section id="curriculum" className="bg-light-core py-20 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center"
      >
        <h2 className="text-3xl md:text-5xl font-extrabold text-light-primary tracking-tight">
          What You&apos;ll Learn
        </h2>
        <p className="mt-3 text-base md:text-lg text-light-muted max-w-2xl mx-auto">
          Step By Step roadmap to create viral AI videos{" "}
          <span className="text-brand-orange font-semibold">
            and make money.
          </span>
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-12 items-start">
        {/* Inline modules — every lesson visible at once, like the live site */}
        <div className="md:col-span-7 space-y-10">
          {modules.map((module, i) => (
            <motion.div
              key={module.index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                type: "spring",
                stiffness: 90,
                damping: 22,
                delay: i * 0.08,
              }}
              className="group"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                  Module {module.index}
                </span>
                <span className="h-px flex-1 bg-light-subtle" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-light-primary mb-4 group-hover:text-brand-orange transition-colors duration-300">
                {module.title}
              </h3>
              <ul className="space-y-3">
                {module.lessons.map((lesson) => (
                  <li
                    key={lesson.num}
                    className="flex items-start gap-4 text-sm md:text-base group/lesson"
                  >
                    <span className="font-mono text-xs font-bold text-brand-orange/70 mt-0.5 w-5 flex-shrink-0">
                      {lesson.num}
                    </span>
                    <span className="text-light-primary/90 group-hover/lesson:text-light-primary transition-colors">
                      {lesson.title}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 90, damping: 22 }}
          className="md:col-span-5 md:sticky md:top-24 bg-[#111111] border border-[#262626] text-white rounded-3xl p-6 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Course Overview</h3>
            <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider bg-brand-orange/20 text-brand-orange px-2 py-1 rounded-full">
              <Zap size={12} /> AI
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { Icon: Award, label: "Beginner Friendly" },
              { Icon: Check, label: "Completion Certificate" },
              { Icon: Clock, label: "21 Hours" },
              { Icon: InfinityIcon, label: "Full lifetime access" },
            ].map(({ Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 bg-[#161616] border border-[#262626] rounded-xl px-3 py-2.5 text-white"
              >
                <span className="text-brand-orange">
                  <Icon size={14} />
                </span>
                <span className="text-xs font-semibold">{label}</span>
              </div>
            ))}
          </div>

          <div>
            <p className="text-xs font-bold tracking-wider text-gray-300 mb-2">
              A QUICK OVERVIEW OF THE COURSE
            </p>
            <ul className="space-y-2">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <span className="mt-0.5 h-4 w-4 rounded-full bg-brand-orange/15 text-brand-orange flex items-center justify-center flex-shrink-0">
                    <Check size={10} />
                  </span>
                  <span className="text-white/90">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full flex justify-center">
            <FlowButton href="#pricing" text="Enroll now for ₹9999" variant="dark" className="w-full justify-center" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
