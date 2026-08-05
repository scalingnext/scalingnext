"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const forYou = [
  "You want to turn AI tools into an actual income stream.",
  "You're a freelancer ready to sell AI content to brands",
  "You're a marketer who needs to produce more content, faster, and cheaper",
  "You're a business owner who wants marketing assets without hiring a full team",
  "You're willing to put in the work — AI is the tool, but you're the builder",
];

const notForYou = [
  "You want a magic button that prints money with no effort",
  "You're looking for free tips you can find on YouTube",
  "You don't plan to actually create content or take action",
  "You think AI will replace hard work entirely",
  "You just want to make \"hot AI influencer\" pages and call it a business",
];

export function AudienceFit() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="text-xs tracking-widest text-brand-orange font-bold uppercase">
            Is this you?
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-light-primary tracking-tight">
            This Course Is a Perfect Fit If You're Ready to...
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-10 md:mt-12 w-full items-stretch">
          <div className="bg-light-surface border-2 border-green-500/20 rounded-3xl overflow-hidden shadow-sm flex flex-col">
            <div className="bg-brand-orange text-white px-5 md:px-6 py-4 font-bold text-sm tracking-wide uppercase">
              This is for you if:
            </div>
            <ul className="p-6 space-y-3 flex-1">
              {forYou.map((s) => (
                <li key={s} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 h-5 w-5 rounded-full bg-brand-orange/15 text-brand-orange flex items-center justify-center flex-shrink-0">
                    <Check size={12} />
                  </span>
                  <span className="text-light-primary/90">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-light-surface border-2 border-red-500/20 rounded-3xl overflow-hidden shadow-sm flex flex-col">
            <div className="bg-dark-core text-white px-5 md:px-6 py-4 font-bold text-sm tracking-wide uppercase">
              This is not for you if:
            </div>
            <ul className="p-6 space-y-3 flex-1">
              {notForYou.map((s) => (
                <li key={s} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 h-5 w-5 rounded-full bg-light-subtle text-light-muted flex items-center justify-center flex-shrink-0">
                    <X size={12} />
                  </span>
                  <span className="text-light-primary/80">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
