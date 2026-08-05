"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { FlowButton } from "@/components/ui/flow-button";

interface Tier {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  highlight?: boolean;
}

const tiers: Tier[] = [
  {
    name: "Learner",
    price: "₹9,999",
    description: "Master 20+ AI tools and learn at your own pace",
    features: [
      "Access to all learning modules",
      "Access to all future modules",
      "Weekly doubt clearing session",
      "Certificate of completion",
    ],
    cta: "Enroll now for ₹9999",
  },
  {
    name: "Community",
    price: "₹39,999",
    description: "Learn together in a thriving community and start earning money",
    features: [
      "Everything in learner",
      "Private community access",
      "Weekly content challenges",
      "Access to paid work & placements",
    ],
    cta: "Enroll now for ₹39999",
    highlight: true,
  },
  {
    name: "Personalized",
    price: "₹49,999",
    description: "Get personal mentorship from the best people",
    features: [
      "Everything in community",
      "Personalized roadmap",
      "Private 1-to-1 sessions",
      "7 day refund policy",
    ],
    cta: "Enroll now for ₹49999",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="bg-[#0A0A0A] text-white py-24 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <span className="text-xs tracking-widest text-brand-orange font-bold uppercase">
          Pricing
        </span>
        <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-white tracking-tight">
          Choose Your Path to AI Mastery
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full items-stretch">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ type: "spring", stiffness: 90, damping: 22, delay: i * 0.1 }}
              className={`card-hover bg-[#161616] border border-[#262626] text-white rounded-3xl p-5 md:p-8 flex flex-col justify-between text-left relative hover:-translate-y-2 hover:shadow-2xl hover:border-brand-orange/30 ${
                tier.highlight
                  ? "border-brand-orange/60 shadow-[0_0_40px_-10px_#FF500080]"
                  : ""
              }`}
            >
              {tier.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-orange text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full whitespace-nowrap z-20">
                  MOST POPULAR
                </span>
              )}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-300">
                  {tier.name}
                </span>
                <div className="mt-4 text-4xl md:text-5xl font-extrabold text-white">
                  {tier.price}
                </div>
                <p className="mt-3 text-sm md:text-base text-gray-300">
                  {tier.description}
                </p>
                <div className="mt-6 pt-6 border-t border-[#262626]">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">What's Included</p>
                  <ul className="space-y-3">
                    {tier.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2.5 text-sm text-white/90"
                      >
                        <span className="mt-0.5 h-4.5 w-4.5 rounded-full bg-brand-orange/15 text-brand-orange flex items-center justify-center flex-shrink-0">
                          <Check size={11} className="stroke-[3]" />
                        </span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-8 w-full flex justify-center">
                <FlowButton href="#contact" text={tier.cta} variant="dark" className="w-full justify-center" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
