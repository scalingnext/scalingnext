"use client";

import { motion } from "framer-motion";
import { Marquee } from "@/components/ui/Marquee";

interface Tool {
  name: string;
  icon: string;
}

const tools: Tool[] = [
  { name: "Luma Dream Machine", icon: "luma" },
  { name: "ElevenLabs", icon: "elevenlabs" },
  { name: "ChatGPT", icon: "chatgpt" },
  { name: "Higgsfield", icon: "higgsfield" },
  { name: "Kling AI", icon: "kling" },
  { name: "ByteDance", icon: "bytedance" },
  { name: "Sora", icon: "sora" }
];

function ToolIcon({ type }: { type: string }) {
  if (type === "luma") {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-amber-500 fill-current flex-shrink-0">
        <path d="M12 3a9 9 0 1 0 9 9 9.005 9.005 0 0 1-9-9z" />
      </svg>
    );
  }
  if (type === "elevenlabs") {
    return (
      <div className="flex gap-1.5 items-center justify-center w-5 h-5 flex-shrink-0">
        <div className="w-1.5 h-4 bg-black rounded-sm" />
        <div className="w-1.5 h-4 bg-black rounded-sm" />
      </div>
    );
  }
  if (type === "chatgpt") {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-black fill-current flex-shrink-0">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </svg>
    );
  }
  if (type === "higgsfield") {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-green-500 fill-none stroke-current flex-shrink-0" strokeWidth="2.5" strokeLinecap="round">
        <path d="M3 12c3-6 6-6 9 0s6 6 9 0" />
      </svg>
    );
  }
  if (type === "kling") {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#00E5FF] fill-current flex-shrink-0">
        <path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 8.5 9.9v-4.1a6 6 0 1 1 3 0v4.1A10 10 0 0 0 22 12 10 10 0 0 0 12 2z" />
      </svg>
    );
  }
  if (type === "bytedance") {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-blue-500 fill-current flex-shrink-0">
        <rect x="3" y="6" width="3" height="12" rx="1.5" />
        <rect x="9" y="4" width="3" height="16" rx="1.5" />
        <rect x="15" y="8" width="3" height="8" rx="1.5" />
      </svg>
    );
  }
  if (type === "sora") {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-red-500 fill-none stroke-current flex-shrink-0" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
      </svg>
    );
  }
  return null;
}

function ToolChip({ tool }: { tool: Tool }) {
  return (
    <span className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-light-subtle bg-white text-sm font-bold text-light-primary whitespace-nowrap">
      <ToolIcon type={tool.icon} />
      {tool.name}
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
        className="text-center text-xs text-light-muted tracking-widest font-bold uppercase mb-6"
      >
        AI Tools Covered
      </motion.p>
      <Marquee duration={28}>
        {tools.map((t) => (
          <ToolChip key={t.name} tool={t} />
        ))}
      </Marquee>
    </section>
  );
}
