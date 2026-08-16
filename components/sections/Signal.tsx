"use client";

import { motion } from "framer-motion";
import { Check, X, Filter, CalendarClock, Sparkles } from "lucide-react";

const noise = [
  "47 new AI tools launched this week",
  "Another thread about the next big model",
  "10 tutorials that all say the same thing",
  "A viral post with no real substance",
  "Rumors, hype, and recycled hot takes",
  "Clickbait about AI taking every job",
];

const signal = [
  {
    Icon: Sparkles,
    title: "1 update worth knowing",
    body: "The model change that actually affects how you work — explained in plain language.",
  },
  {
    Icon: Filter,
    title: "2 tools worth trying",
    body: "Tested, compared, and shortlisted. Skip the rest.",
  },
  {
    Icon: CalendarClock,
    title: "1 workflow you can reuse",
    body: "A practical technique you can apply today, not someday.",
  },
];

export function Signal() {
  return (
    <section className="bg-[#0A0A0A] text-white py-24 px-4 relative overflow-hidden">
      {/* Subtle radial blurs, matching the site's dark-section treatment */}
      <div className="absolute top-1/4 left-12 w-80 h-80 bg-[#FF5000]/5 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-12 w-80 h-80 bg-[#FF5000]/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center">
          <span className="text-xs tracking-widest text-brand-orange font-bold uppercase">
            Curation
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Less noise. More signal.
          </h2>
          <p className="mt-4 text-sm md:text-base text-gray-300 max-w-xl">
            The AI world moves fast. We filter the noise so you can focus on
            what actually matters.
          </p>
        </div>

        {/* Browser-window mockup: the noise on the left, the signal on the right */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 90, damping: 22 }}
          className="mt-16 bg-[#161616] border border-[#262626] rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[#262626] bg-[#111111]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#262626]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#262626]" />
            <span className="h-2.5 w-2.5 rounded-full bg-brand-orange/60" />
            <span className="ml-3 flex-1 max-w-xs bg-[#161616] border border-[#262626] rounded-md px-3 py-1 text-[11px] text-gray-400 font-mono truncate">
              scalingnext / this-week
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* The noise */}
            <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-[#262626]">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-5">
                What everyone else sees
              </p>
              <ul className="space-y-3">
                {noise.map((n, i) => (
                  <motion.li
                    key={n}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="flex items-start gap-3 text-sm text-gray-500"
                  >
                    <span className="mt-0.5 h-4 w-4 rounded-full bg-[#262626] text-gray-500 flex items-center justify-center flex-shrink-0">
                      <X size={10} />
                    </span>
                    <span className="line-through decoration-gray-600">{n}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* The signal */}
            <div className="p-6 md:p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-5">
                What you get instead
              </p>
              <div className="space-y-4">
                {signal.map(({ Icon, title, body }, i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="card-hover bg-[#111111] border border-[#262626] rounded-xl p-4 flex items-start gap-3 hover:border-brand-orange/40 transition-colors duration-300"
                  >
                    <span className="h-9 w-9 rounded-lg bg-brand-orange/15 text-brand-orange flex items-center justify-center flex-shrink-0">
                      <Icon size={16} />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-white">{title}</p>
                      <p className="text-xs md:text-sm text-gray-300 mt-1">{body}</p>
                    </div>
                    <span className="ml-auto mt-0.5 h-4 w-4 rounded-full bg-brand-orange/15 text-brand-orange flex items-center justify-center flex-shrink-0">
                      <Check size={10} />
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
          {["Curated, not scraped", "Explained simply", "Ready to apply"].map((chip, i) => (
            <motion.span
              key={chip}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-[#161616] border border-[#262626] px-4 py-2 rounded-full text-xs font-semibold text-white"
            >
              {chip}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
