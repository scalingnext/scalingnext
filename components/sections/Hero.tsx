"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  SlidersHorizontal,
  Mic,
  AudioLines,
  Sparkles,
  Workflow,
  Wrench,
  Newspaper,
  BookOpen,
  Video,
  Layers,
  ArrowUpRight,
  Terminal,
  Zap,
} from "lucide-react";
import { Marquee } from "@/components/ui/Marquee";
import KineticGrid from "@/components/ui/kinetic-grid";
import { FlowButton } from "@/components/ui/flow-button";

const PROMPTS = [
  "Summarize this week's most important AI updates",
  "Show me the AI tools worth trying this week",
  "What are the most useful AI workflows for creators?",
  "Find AI tools that can save me hours every week",
  "What's new in AI right now?",
  "Show me practical AI tools I can actually use",
  "What AI skills should I learn next?",
  "Give me the most useful AI resources this week",
];

interface SignalCard {
  id: string;
  category: string;
  headline: string;
  type: "tools" | "updates" | "workflow" | "tips" | "creation" | "resources" | "webinar";
  badge?: string;
  meta?: string;
  preview: React.ReactNode;
}

const signalCards: SignalCard[] = [
  {
    id: "card-1",
    category: "AI TOOLS",
    headline: "5 AI tools worth trying this week",
    type: "tools",
    badge: "Curated",
    preview: (
      <div className="flex flex-col gap-2 w-full pt-1">
        <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] text-[11px] text-gray-300">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Claude 3.7 Sonnet
          </span>
          <span className="text-[10px] text-gray-500 font-mono">Hybrid</span>
        </div>
        <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] text-[11px] text-gray-300">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            Cursor 0.45
          </span>
          <span className="text-[10px] text-gray-500 font-mono">Agent</span>
        </div>
        <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-[#1a1a1a]/60 border border-[#262626] text-[11px] text-gray-400">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            Perplexity Pro
          </span>
          <span className="text-[10px] text-gray-500 font-mono">Deep</span>
        </div>
      </div>
    ),
  },
  {
    id: "card-2",
    category: "AI UPDATES",
    headline: "What changed in AI this week",
    type: "updates",
    badge: "Changelog",
    preview: (
      <div className="w-full rounded-lg bg-[#0e0e0e] border border-[#222222] p-2.5 font-mono text-[10px] space-y-1.5 text-gray-300">
        <div className="flex items-center gap-1.5 text-gray-500 pb-1 border-b border-[#222222]">
          <Terminal size={12} className="text-brand-orange" />
          <span>weekly_digest.log</span>
        </div>
        <p className="text-emerald-400 truncate">+ Reasoning model releases</p>
        <p className="text-gray-400 truncate">+ 200k context standard</p>
        <p className="text-gray-500 truncate">- Removed prompt latency</p>
      </div>
    ),
  },
  {
    id: "card-3",
    category: "AI WORKFLOWS",
    headline: "Automate repetitive work with AI",
    type: "workflow",
    badge: "System",
    preview: (
      <div className="w-full flex items-center justify-between px-1 py-3 text-[11px]">
        <div className="flex flex-col items-center gap-1">
          <div className="h-9 w-9 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-gray-300">
            <Zap size={15} className="text-amber-400" />
          </div>
          <span className="text-[10px] text-gray-400 font-mono">Trigger</span>
        </div>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-[#2a2a2a] via-brand-orange/60 to-[#2a2a2a] mx-1 relative">
          <span className="absolute -top-1 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-brand-orange animate-pulse" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="h-9 w-9 rounded-lg bg-[#1a1a1a] border border-brand-orange/40 flex items-center justify-center text-white">
            <Workflow size={15} className="text-brand-orange" />
          </div>
          <span className="text-[10px] text-white font-mono">Agent</span>
        </div>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-[#2a2a2a] to-emerald-500/40 mx-1" />
        <div className="flex flex-col items-center gap-1">
          <div className="h-9 w-9 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-gray-300">
            <Layers size={15} className="text-emerald-400" />
          </div>
          <span className="text-[10px] text-gray-400 font-mono">Output</span>
        </div>
      </div>
    ),
  },
  {
    id: "card-4",
    category: "AI TIPS",
    headline: "A better way to write AI prompts",
    type: "tips",
    badge: "Method",
    preview: (
      <div className="w-full rounded-lg bg-[#121212] border border-[#242424] p-2.5 text-[11px] font-mono space-y-1.5">
        <div className="flex items-center gap-1 text-[10px] text-red-400/80 line-through">
          <span>&times; "Write an email about..."</span>
        </div>
        <div className="flex items-start gap-1 text-[10px] text-emerald-400 bg-emerald-950/30 p-1.5 rounded border border-emerald-800/40">
          <span>&rarr;</span>
          <span className="leading-tight">[Role] + [Context] + [Constraints] + [Format]</span>
        </div>
      </div>
    ),
  },
  {
    id: "card-5",
    category: "AI CREATION",
    headline: "Create better visuals with AI",
    type: "creation",
    badge: "Creative",
    preview: (
      <div className="w-full h-20 rounded-lg bg-gradient-to-br from-[#1c1c1e] via-[#121214] to-[#0a0a0c] border border-[#282828] p-3 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute -right-4 -top-4 w-16 h-16 bg-brand-orange/15 rounded-full blur-xl" />
        <div className="flex items-center justify-between text-[10px] text-gray-400">
          <span className="font-mono">Midjourney v7 / Flux</span>
          <Sparkles size={13} className="text-brand-orange" />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] px-2 py-0.5 rounded bg-[#222222] text-gray-200 border border-[#333333]">Aspect 16:9</span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-[#222222] text-gray-200 border border-[#333333]">Raw Style</span>
        </div>
      </div>
    ),
  },
  {
    id: "card-6",
    category: "AI RESOURCES",
    headline: "Useful AI resources, curated",
    type: "resources",
    badge: "Library",
    preview: (
      <div className="w-full grid grid-cols-2 gap-1.5 pt-1 text-[10px]">
        <div className="p-2 rounded-md bg-[#161616] border border-[#262626] flex items-center gap-1.5 text-gray-300">
          <BookOpen size={13} className="text-brand-orange" />
          <span className="truncate">Prompts DB</span>
        </div>
        <div className="p-2 rounded-md bg-[#161616] border border-[#262626] flex items-center gap-1.5 text-gray-300">
          <Workflow size={13} className="text-cyan-400" />
          <span className="truncate">Templates</span>
        </div>
        <div className="p-2 rounded-md bg-[#161616] border border-[#262626] flex items-center gap-1.5 text-gray-300">
          <Wrench size={13} className="text-emerald-400" />
          <span className="truncate">Tool Stack</span>
        </div>
        <div className="p-2 rounded-md bg-[#161616] border border-[#262626] flex items-center gap-1.5 text-gray-300">
          <Layers size={13} className="text-amber-400" />
          <span className="truncate">Cheatsheets</span>
        </div>
      </div>
    ),
  },
  {
    id: "card-7",
    category: "WEBINARS",
    headline: "Building smarter workflows with AI",
    type: "webinar",
    badge: "Live Session",
    preview: (
      <div className="w-full rounded-lg bg-[#141414] border border-[#262626] p-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-full bg-brand-orange/15 border border-brand-orange/30 flex items-center justify-center text-brand-orange">
            <Video size={14} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[10px] font-bold text-gray-200 uppercase tracking-wider">Community Call</span>
            </div>
            <p className="text-[10px] text-gray-400">Interactive live Q&A</p>
          </div>
        </div>
        <ArrowUpRight size={14} className="text-gray-500" />
      </div>
    ),
  },
  {
    id: "card-8",
    category: "AI TOOLS",
    headline: "Tools that can save hours every week",
    type: "tools",
    badge: "Efficiency",
    preview: (
      <div className="w-full rounded-lg bg-[#121212] border border-[#222222] p-2.5 flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-[10px] text-gray-400 font-mono">Time saved metric</span>
          <p className="text-base font-bold text-emerald-400 font-mono">-4.5 hrs <span className="text-[10px] text-gray-400 font-sans font-normal">/ week</span></p>
        </div>
        <div className="h-8 px-2.5 rounded bg-emerald-950/40 border border-emerald-800/40 flex items-center justify-center text-[10px] text-emerald-300 font-medium">
          Verified
        </div>
      </div>
    ),
  },
  {
    id: "card-9",
    category: "AI TIPS",
    headline: "3 simple ways to get better AI results",
    type: "tips",
    badge: "Principles",
    preview: (
      <div className="w-full space-y-1.5 text-[11px]">
        <div className="flex items-center gap-2 text-gray-300">
          <span className="font-mono text-brand-orange text-[10px] font-bold">01</span>
          <span className="text-[10px] truncate">Provide concrete examples</span>
        </div>
        <div className="flex items-center gap-2 text-gray-300">
          <span className="font-mono text-brand-orange text-[10px] font-bold">02</span>
          <span className="text-[10px] truncate">Define explicit negative constraints</span>
        </div>
        <div className="flex items-center gap-2 text-gray-300">
          <span className="font-mono text-brand-orange text-[10px] font-bold">03</span>
          <span className="text-[10px] truncate">Ask for step-by-step thinking</span>
        </div>
      </div>
    ),
  },
  {
    id: "card-10",
    category: "AI UPDATES",
    headline: "The AI launches worth knowing about",
    type: "updates",
    badge: "Radar",
    preview: (
      <div className="w-full flex items-center justify-between gap-1.5 text-[10px] pt-1">
        <div className="flex-1 p-2 rounded bg-[#161616] border border-[#262626] text-center">
          <span className="text-brand-orange font-bold font-mono">14</span>
          <p className="text-[9px] text-gray-400 mt-0.5">Tested</p>
        </div>
        <div className="flex-1 p-2 rounded bg-[#161616] border border-[#262626] text-center">
          <span className="text-emerald-400 font-bold font-mono">3</span>
          <p className="text-[9px] text-gray-400 mt-0.5">Recommended</p>
        </div>
        <div className="flex-1 p-2 rounded bg-[#161616] border border-[#262626] text-center">
          <span className="text-gray-300 font-bold font-mono">0</span>
          <p className="text-[9px] text-gray-400 mt-0.5">Fluff</p>
        </div>
      </div>
    ),
  },
  {
    id: "card-11",
    category: "AI WORKFLOWS",
    headline: "Turn repetitive tasks into workflows",
    type: "workflow",
    badge: "Playbook",
    preview: (
      <div className="w-full space-y-1 text-[10px] font-mono">
        <div className="flex items-center justify-between p-1.5 rounded bg-[#161616] border border-[#242424] text-gray-300">
          <span>01. Ingest Data</span>
          <span className="text-emerald-400">&check;</span>
        </div>
        <div className="flex items-center justify-between p-1.5 rounded bg-[#161616] border border-brand-orange/30 text-white">
          <span>02. AI Synthesis</span>
          <span className="text-brand-orange animate-pulse">&bull;</span>
        </div>
      </div>
    ),
  },
  {
    id: "card-12",
    category: "AI RESOURCES",
    headline: "A practical AI resource worth saving",
    type: "resources",
    badge: "Bookmark",
    preview: (
      <div className="w-full rounded-lg bg-[#141414] border border-[#262626] p-2.5 flex items-center gap-2.5">
        <div className="h-8 w-8 rounded-lg bg-[#202020] border border-[#303030] flex items-center justify-center text-brand-orange">
          <Newspaper size={15} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-medium text-gray-200 truncate">Prompt Architecture 2026</p>
          <p className="text-[9px] text-gray-400">PDF Guide &middot; 12 Pages</p>
        </div>
      </div>
    ),
  },
];

function HeroPrompt() {
  const [typed, setTyped] = useState("");
  const promptIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const phaseRef = useRef<"typing" | "hold" | "deleting" | "pause">("typing");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setTyped(PROMPTS[0]);
      return;
    }

    const getNextDelay = () => {
      const phase = phaseRef.current;
      const pIdx = promptIndexRef.current;
      const currentPrompt = PROMPTS[pIdx];
      const cIdx = charIndexRef.current;

      if (phase === "typing") {
        const lastChar = currentPrompt[cIdx - 1] ?? "";
        if (lastChar === "?" || lastChar === "." || lastChar === ",") {
          return 140 + Math.random() * 80;
        }
        if (lastChar === " " && Math.random() < 0.4) {
          return 90 + Math.random() * 80;
        }
        const rand = Math.random();
        if (rand < 0.15) {
          return 28 + Math.random() * 18;
        } else if (rand < 0.85) {
          return 48 + Math.random() * 36;
        } else {
          return 88 + Math.random() * 45;
        }
      }

      if (phase === "hold") {
        return 1650 + Math.random() * 250;
      }

      if (phase === "deleting") {
        return 38 + Math.random() * 32;
      }

      if (phase === "pause") {
        return 800 + Math.random() * 350;
      }

      return 60;
    };

    const step = () => {
      const phase = phaseRef.current;
      const currentPrompt = PROMPTS[promptIndexRef.current];

      if (phase === "typing") {
        if (charIndexRef.current < currentPrompt.length) {
          charIndexRef.current += 1;
          setTyped(currentPrompt.slice(0, charIndexRef.current));
          timerRef.current = setTimeout(step, getNextDelay());
        } else {
          phaseRef.current = "hold";
          timerRef.current = setTimeout(step, getNextDelay());
        }
      } else if (phase === "hold") {
        phaseRef.current = "deleting";
        timerRef.current = setTimeout(step, getNextDelay());
      } else if (phase === "deleting") {
        if (charIndexRef.current > 0) {
          charIndexRef.current -= 1;
          setTyped(currentPrompt.slice(0, charIndexRef.current));
          timerRef.current = setTimeout(step, getNextDelay());
        } else {
          phaseRef.current = "pause";
          timerRef.current = setTimeout(step, getNextDelay());
        }
      } else if (phase === "pause") {
        promptIndexRef.current = (promptIndexRef.current + 1) % PROMPTS.length;
        charIndexRef.current = 0;
        phaseRef.current = "typing";
        timerRef.current = setTimeout(step, getNextDelay());
      }
    };

    timerRef.current = setTimeout(step, 400);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-2xl bg-[#141414] border border-[#222222] text-white rounded-[18px] px-5 sm:px-6 pt-5 pb-4 my-8 text-left flex flex-col justify-between min-h-[130px] sm:min-h-[136px] relative shadow-none transition-colors">
      <div className="w-full">
        <p className="text-gray-100 font-sans text-sm sm:text-base font-normal tracking-[-0.01em] leading-relaxed flex items-center min-h-[1.5rem] select-none">
          <span>{typed}</span>
          <span className="typing-cursor" aria-hidden="true" />
        </p>
      </div>

      <div className="flex items-center justify-between mt-6 pt-1">
        <div className="flex items-center gap-2 text-gray-400 select-none">
          <button
            type="button"
            aria-label="Add attachment"
            className="flex items-center justify-center text-gray-400 hover:text-gray-200 transition-colors p-0.5"
          >
            <Plus size={18} strokeWidth={1.75} />
          </button>
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-400 hover:text-gray-200 cursor-pointer transition-colors">
            <SlidersHorizontal size={15} strokeWidth={1.75} />
            <span>Tools</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            aria-label="Microphone input"
            className="flex items-center justify-center text-gray-400 hover:text-gray-200 transition-colors p-1"
          >
            <Mic size={17} strokeWidth={1.75} />
          </button>
          <button
            type="button"
            aria-label="Voice waveform"
            className="h-8 w-8 rounded-full bg-[#202020] hover:bg-[#282828] border border-[#2a2a2a] flex items-center justify-center text-gray-200 transition-colors cursor-pointer"
          >
            <AudioLines size={15} strokeWidth={2} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <KineticGrid
      globalColor="monochrome"
      className="text-white pt-28 pb-12 flex flex-col items-center justify-start text-center"
    >
      <div id="top" className="px-4 w-full flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 border border-[#262626] bg-[#161616]/80 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-300 px-4 py-2 rounded-full"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand-orange animate-pulse" />
          ScalingNext
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-4xl text-4xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.05]"
        >
          Stay Ahead{" "}
          <span className="brand-orange-grad bg-clip-text text-transparent">
            in AI.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 max-w-xl text-base md:text-lg text-gray-300"
        >
          A free community for practical AI tips, useful tools, important
          updates, and live sessions — all in one place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-4"
        >
          <FlowButton href="https://chat.whatsapp.com/CKzAuoLtl8w8jzeTWyBWU6" text="Join ScalingNext" variant="dark" />
          <a
            href="#community"
            className="text-sm font-semibold text-gray-300 hover:text-white transition-colors underline-hover"
          >
            Explore the Community
          </a>
        </motion.div>

        <HeroPrompt />
      </div>

      {/* "The ScalingNext Signal" — Seamless infinite horizontal feed */}
      <div className="w-full mt-10">
        <Marquee duration={42} pauseOnHover={true}>
          {signalCards.map((card) => (
            <div
              key={card.id}
              className="w-56 sm:w-64 h-64 sm:h-72 rounded-2xl flex-shrink-0 relative overflow-hidden bg-[#131314] border border-[#222224] p-4 flex flex-col justify-between group hover:border-brand-orange/40 hover:bg-[#161618] transition-all duration-300 select-none text-left"
            >
              {/* Card top badge */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-orange flex items-center gap-1">
                  <span className="h-1 w-1 rounded-full bg-brand-orange" />
                  {card.category}
                </span>
                {card.badge && (
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#1e1e20] text-gray-400 border border-[#2a2a2c]">
                    {card.badge}
                  </span>
                )}
              </div>

              {/* Card middle interactive / editorial preview */}
              <div className="my-auto py-2">
                {card.preview}
              </div>

              {/* Card bottom headline */}
              <div className="pt-2 border-t border-[#1f1f22]">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-200 group-hover:text-white transition-colors leading-snug line-clamp-2">
                  {card.headline}
                </h3>
              </div>
            </div>
          ))}
        </Marquee>
      </div>

      {/* Gentle fade from the kinetic grid hero into the next section so the
          grid dissolves instead of hard-cutting. Sits above the canvas (z-0). */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 z-[5] bg-gradient-to-b from-transparent to-[#0A0A0A]"
      />
    </KineticGrid>
  );
}

