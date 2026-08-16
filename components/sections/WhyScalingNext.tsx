"use client";

import { motion } from "framer-motion";
import { Wrench, Filter, RefreshCw, Gift } from "lucide-react";

const principles = [
  {
    Icon: Wrench,
    title: "Practical",
    body: "Less theory. More things you can actually use.",
  },
  {
    Icon: Filter,
    title: "Curated",
    body: "Useful information without endless scrolling.",
  },
  {
    Icon: RefreshCw,
    title: "Current",
    body: "Stay updated as AI changes.",
  },
  {
    Icon: Gift,
    title: "Free",
    body: "The community is open to everyone.",
  },
];

export function WhyScalingNext() {
  return (
    <section id="about" className="bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="text-xs tracking-widest text-brand-orange font-bold uppercase">
            The difference
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-light-primary tracking-tight">
            Why ScalingNext?
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-10 md:mt-12 w-full">
          {principles.map(({ Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col items-center text-center gap-3"
            >
              <span className="h-11 w-11 rounded-full border border-light-subtle bg-light-surface flex items-center justify-center text-brand-orange">
                <Icon size={18} />
              </span>
              <h3 className="text-base font-bold text-light-primary">{title}</h3>
              <p className="text-sm text-light-muted">{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
