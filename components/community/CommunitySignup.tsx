/**
 * Shared community signup page.
 *
 * Renders all three routes (/twitter, /insta, /yt) from a ChannelConfig so the
 * pages cannot drift apart. Server component — only SignupForm is a client
 * component, so the form state stays out of the static shell.
 */

import { ChevronDown, Zap, BookOpen, CalendarDays, Wrench, ArrowRight } from "lucide-react";
import { SignupForm } from "./SignupForm";
import type { ChannelConfig } from "./channels";

const BENEFITS = [
  {
    icon: Zap,
    title: "AI Updates",
    description: "Stay ahead of important AI launches, updates, and trends.",
  },
  {
    icon: BookOpen,
    title: "Curated Resources",
    description: "Useful tools, guides, workflows, and learning resources.",
  },
  {
    icon: CalendarDays,
    title: "Community Sessions",
    description: "Join live sessions, discussions, and practical AI workshops.",
  },
  {
    icon: Wrench,
    title: "AI Tools",
    description: "Discover useful AI tools, workflows, and experiments.",
  },
] as const;

// Faint 40px grid, drawn with gradients so no image asset is needed.
const GRID_BACKGROUND = {
  backgroundImage:
    "linear-gradient(to right, rgba(255,255,255,0.022) 1px, transparent 1px)," +
    "linear-gradient(to bottom, rgba(255,255,255,0.022) 1px, transparent 1px)",
  backgroundSize: "40px 40px",
} as const;

export function CommunitySignup({ channel }: { channel: ChannelConfig }) {
  return (
    <div className="relative min-h-screen bg-[#080808] text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0" style={GRID_BACKGROUND} />
      {/* Softens the grid toward the bottom of the fold */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[70vh]"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,255,255,0.035), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[560px] px-5 sm:px-6">
        {/* ── Nav (floats over content for the whole page) ───────────────── */}
        <header className="sticky top-4 z-40 pt-1 sm:top-5">
          <div className="flex items-center justify-between gap-3 rounded-[14px] border border-[#242424] bg-[#101010]/80 py-2.5 pl-4 pr-2.5 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.8)] backdrop-blur-md">
            <a
              href="/"
              className="text-[15px] font-semibold tracking-tight text-white transition-opacity duration-200 hover:opacity-80"
            >
              ScalingNext
            </a>
            <a
              href="#join"
              className="flex items-center gap-1.5 rounded-[10px] bg-white px-3.5 py-2 text-[13px] font-semibold text-[#111111] transition-colors duration-200 hover:bg-[#EDEDED]"
            >
              Join Community
              <ArrowRight size={13} />
            </a>
          </div>
        </header>

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="pt-14 text-center sm:pt-20">
          <span className="inline-flex items-center rounded-full border border-[#282828] bg-[#141414] px-3.5 py-1.5 text-[12px] font-medium tracking-wide text-[#A8A8A8]">
            Free · {channel.badge}
          </span>

          <h1 className="mt-7 text-[42px] font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-[54px]">
            ScalingNext
          </h1>

          <p className="mt-4 text-[19px] font-medium tracking-[-0.01em] text-[#D4D4D4] sm:text-[21px]">
            Your unfair advantage in AI.
          </p>

          <p className="mx-auto mt-4 max-w-[430px] text-[14.5px] leading-relaxed text-[#8A8A8A] sm:text-[15px]">
            Skip the noise. Get the signal. AI updates, tools, resources, and opportunities —
            delivered directly to you.
          </p>

          <p className="mt-6 text-[12px] font-medium uppercase tracking-[0.14em] text-[#666666]">
            {channel.channelLine}
          </p>
        </section>

        {/* ── Credibility row ───────────────────────────────────────────── */}
        <section className="mt-10 flex flex-col items-center">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="ScalingNext"
              width={36}
              height={36}
              className="h-9 w-9 rounded-full border border-[#262626] bg-[#141414] object-contain p-1"
            />
            <div className="text-left">
              <p className="text-[13.5px] font-semibold leading-tight text-[#E8E8E8]">ScalingNext</p>
              <p className="mt-0.5 text-[12px] leading-tight text-[#757575]">
                AI community for people building with AI
              </p>
            </div>
          </div>
          <ChevronDown aria-hidden size={18} className="mt-8 text-[#454545]" />
        </section>

        {/* ── Signup form ───────────────────────────────────────────────── */}
        <section id="join" className="mt-8 scroll-mt-24 sm:mt-10">
          <SignupForm channel={channel} />
        </section>

        {/* ── What You'll Get ───────────────────────────────────────────── */}
        <section className="mt-20 sm:mt-24">
          <h2 className="text-center text-[22px] font-bold tracking-[-0.02em] text-white sm:text-[24px]">
            What You&apos;ll Get
          </h2>
          <div className="mt-7 grid grid-cols-1 gap-3.5 md:grid-cols-2">
            {BENEFITS.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex h-full flex-col rounded-2xl border border-[#222222] bg-[#121212] p-5 transition-colors duration-200 hover:border-[#2E2E2E]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2A2A2A] bg-[#1A1A1A]">
                  <Icon aria-hidden size={16} className="text-[#C4C4C4]" strokeWidth={1.8} />
                </span>
                <h3 className="mt-4 text-[15px] font-semibold tracking-[-0.01em] text-white">
                  {title}
                </h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#828282]">{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Footer ────────────────────────────────────────────────────── */}
        <footer className="mt-20 pb-14 text-center sm:mt-24 sm:pb-16">
          <p className="text-[12.5px] text-[#6B6B6B]">We respect your privacy. No spam, ever.</p>
          <p className="mt-2.5 text-[12.5px] text-[#4F4F4F]">ScalingNext © 2026</p>
        </footer>
      </div>
    </div>
  );
}
