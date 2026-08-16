"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Bookmark,
  Layers,
  Workflow,
  Wand2,
} from "lucide-react";
import { Marquee } from "@/components/ui/Marquee";

interface TickerItem {
  name: string;
  type: "category" | "tool";
  icon: React.ReactNode;
}

const items: TickerItem[] = [
  {
    name: "GitHub Repos",
    type: "category",
    icon: (
      // GitHub Octocat
      <svg viewBox="0 0 24 24" className="w-4 h-4 text-black fill-current flex-shrink-0">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    name: "ChatGPT",
    type: "tool",
    icon: (
      // OpenAI Knot
      <svg viewBox="0 0 24 24" className="w-4 h-4 text-emerald-600 fill-current flex-shrink-0">
        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.98 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l2.02-1.164a.08.08 0 0 1 .075 0l4.83 2.787a4.504 4.504 0 0 1-.685 8.104v-5.678a.79.79 0 0 0-.39-.675l-5.85-3.374zm1.01-2.382l2.695-1.556 2.695 1.556v3.111l-2.695 1.556-2.695-1.556z" />
      </svg>
    ),
  },
  {
    name: "Claude",
    type: "tool",
    icon: (
      // Anthropic / Claude Logo
      <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#D97757] fill-current flex-shrink-0">
        <path d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z" />
      </svg>
    ),
  },
  {
    name: "Free AI Tools",
    type: "category",
    icon: <Sparkles size={15} className="text-emerald-500 flex-shrink-0" />,
  },
  {
    name: "ComfyUI",
    type: "tool",
    icon: (
      // ComfyUI "C" logo
      <div className="w-4 h-4 rounded bg-[#0055FF] text-white flex items-center justify-center font-black text-[10px] leading-none flex-shrink-0 font-mono shadow-sm">
        C
      </div>
    ),
  },
  {
    name: "Open Source",
    type: "category",
    icon: (
      // Open Source Initiative Logo
      <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#3DA639] fill-current flex-shrink-0">
        <path d="M11.959.447A11.938 11.938 0 000 12.407c0 5.576 3.874 10.097 7.783 11.114.193.05.392-.05.467-.234l2.771-6.822a.396.396 0 00-.246-.528C9.365 15.47 8.53 14.32 8.48 12.4c-.024-1.828 1.5-3.45 3.561-3.447 1.931.003 3.479 1.632 3.479 3.453 0 .966-.203 1.687-.575 2.238-.371.552-.922.951-1.695 1.239a.396.396 0 00-.23.515l2.685 6.903a.396.396 0 00.465.24C20.163 22.534 24 18.062 24 12.406 24 5.804 18.603.447 11.959.447z" />
      </svg>
    ),
  },
  {
    name: "Hugging Face",
    type: "tool",
    icon: (
      // Hugging Face Icon
      <span className="text-sm leading-none flex-shrink-0 select-none" role="img" aria-label="Hugging Face">
        🤗
      </span>
    ),
  },
  {
    name: "AI Resources",
    type: "category",
    icon: <Bookmark size={15} className="text-amber-500 flex-shrink-0" />,
  },
  {
    name: "Kling AI",
    type: "tool",
    icon: (
      // Kling AI Abstract Loop
      <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#00E5FF] fill-current flex-shrink-0">
        <path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 8.5 9.9v-4.1a6 6 0 1 1 3 0v4.1A10 10 0 0 0 22 12 10 10 0 0 0 12 2z" />
      </svg>
    ),
  },
  {
    name: "New Models",
    type: "category",
    icon: <Layers size={15} className="text-purple-500 flex-shrink-0" />,
  },
  {
    name: "Ollama",
    type: "tool",
    icon: (
      // Ollama Llama Mark
      <svg viewBox="0 0 24 24" className="w-4 h-4 text-black fill-current flex-shrink-0">
        <path d="M16.361 10.26a.894.894 0 0 0-.558.47l-.072.148.001.207c0 .193.004.217.059.353.076.193.152.312.291.448.24.238.51.3.872.205a.86.86 0 0 0 .517-.436.752.752 0 0 0 .08-.498c-.064-.453-.33-.782-.724-.897a1.06 1.06 0 0 0-.466 0zm-9.203.005c-.305.096-.533.32-.65.639a1.187 1.187 0 0 0-.06.52c.057.309.31.59.598.667.362.095.632.033.872-.205.14-.136.215-.255.291-.448.055-.136.059-.16.059-.353l.001-.207-.072-.148a.894.894 0 0 0-.565-.472 1.02 1.02 0 0 0-.474.007ZM12 3.03c-.832 0-1.687.243-2.456.698a.958.958 0 0 1-.148.078c-.008 0-.015-.03-.015-.066a6.71 6.71 0 0 0-.097-.725C8.997 1.392 8.337.319 7.46.048a2.096 2.096 0 0 0-.585-.041Zm0 6.5c-1.539 0-3.072 1.014-3.072 2.497 0 .297.005.355.045.531.429.844 1.383 1.446 2.493 1.571.3.033 1.596.033 1.896 0 1.382-.156 2.45-1.013 2.714-2.173.038-.167.043-.23.043-.524 0-.296-.005-.354-.045-.53-.198-.888-.847-1.654-1.787-2.114-.271-.133-.66-.268-.951-.328-.179-.036-.281-.05-.654-.086a6.873 6.873 0 0 0-.855.031z" />
      </svg>
    ),
  },
  {
    name: "Automation",
    type: "category",
    icon: <Workflow size={15} className="text-brand-orange flex-shrink-0" />,
  },
  {
    name: "ElevenLabs",
    type: "tool",
    icon: (
      // ElevenLabs "11" Double Bars
      <div className="flex gap-1 items-center justify-center w-4 h-4 flex-shrink-0">
        <div className="w-1.5 h-3.5 bg-black rounded-sm" />
        <div className="w-1.5 h-3.5 bg-black rounded-sm" />
      </div>
    ),
  },
  {
    name: "Creative Tools",
    type: "category",
    icon: <Wand2 size={15} className="text-pink-500 flex-shrink-0" />,
  },
  {
    name: "Sora",
    type: "tool",
    icon: (
      // Sora Mark
      <svg viewBox="0 0 24 24" className="w-4 h-4 text-red-500 fill-none stroke-current flex-shrink-0" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Luma Dream Machine",
    type: "tool",
    icon: (
      // Luma Symbol
      <svg viewBox="0 0 24 24" className="w-4 h-4 text-amber-500 fill-current flex-shrink-0">
        <path d="M12 3a9 9 0 1 0 9 9 9.005 9.005 0 0 1-9-9z" />
      </svg>
    ),
  },
  {
    name: "Higgsfield",
    type: "tool",
    icon: (
      // Higgsfield Fluid "H" Wave
      <svg viewBox="0 0 24 24" className="w-4 h-4 text-green-500 fill-none stroke-current flex-shrink-0" strokeWidth="2.5" strokeLinecap="round">
        <path d="M3 12c3-6 6-6 9 0s6 6 9 0" />
      </svg>
    ),
  },
];

function TickerPill({ item }: { item: TickerItem }) {
  return (
    <span className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full border border-light-subtle bg-white text-xs sm:text-sm font-semibold text-light-primary whitespace-nowrap shadow-sm hover:border-brand-orange/40 hover:shadow-md transition-all duration-300 select-none">
      {item.icon}
      <span>{item.name}</span>
    </span>
  );
}

export function ToolsMarquee() {
  return (
    <section className="w-full py-12 bg-white border-y border-light-subtle overflow-hidden relative">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center text-xs text-light-muted tracking-[0.2em] font-bold uppercase mb-6"
      >
        WHAT WE&apos;RE WATCHING
      </motion.p>
      <Marquee duration={36} pauseOnHover={true}>
        {items.map((item, idx) => (
          <TickerPill key={`${item.name}-${idx}`} item={item} />
        ))}
      </Marquee>
    </section>
  );
}
