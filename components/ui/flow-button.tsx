"use client";

import { ArrowRight } from "lucide-react";

type FlowButtonVariant = "light" | "dark";

/**
 * FlowButton — a pill button that morphs into a rounded-rectangle with a
 * sweeping circular fill on hover, with an arrow that flows across.
 *
 * Built to drop into either light or dark sections:
 *   variant="light"  → dark ink on transparent, dark fill on hover (use on light bg)
 *   variant="dark"   → white ink on transparent, white fill on hover (use on dark bg)
 *
 * Accepts an `href` to render as an anchor; otherwise renders a <button>.
 */
export function FlowButton({
  text = "Modern Button",
  variant = "light",
  href,
  onClick,
  className = "",
  "aria-label": ariaLabel,
}: {
  text?: string;
  variant?: FlowButtonVariant;
  href?: string;
  onClick?: () => void;
  className?: string;
  "aria-label"?: string;
}) {
  const ink = variant === "light" ? "#111111" : "#FFFFFF";
  const inkHover = "#FFFFFF"; // text always flips to white on the filled circle

  const base = `group relative flex items-center gap-1 overflow-hidden rounded-[100px] border-[1.5px] bg-transparent px-5 md:px-8 py-3 text-sm font-semibold cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-transparent hover:text-white hover:rounded-[12px] active:scale-[0.95] ${className}`;

  // Full-width (block) buttons are wider than the default 220px fill circle, so
  // grow it larger to cover them fully; overflow-hidden clips it to the button.
  const isBlock = className.includes("w-full");
  const fillSize = isBlock
    ? "group-hover:w-[600px] group-hover:h-[600px]"
    : "group-hover:w-[220px] group-hover:h-[220px]";

  const shared = (
    <>
      {/* Left arrow (arr-2) */}
      <ArrowRight
        className="absolute w-4 h-4 left-[-25%] fill-none z-[9] group-hover:left-4 group-hover:stroke-white transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        style={{ stroke: ink }}
      />

      {/* Text */}
      <span className="relative z-[1] -translate-x-3 group-hover:translate-x-3 transition-all duration-[800ms] ease-out">
        {text}
      </span>

      {/* Circle (fill) — brand orange so it never floods the button pure black */}
      <span
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-[50%] opacity-0 ${fillSize} group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)]`}
        style={{ backgroundColor: "#FF5000" }}
      />

      {/* Right arrow (arr-1) */}
      <ArrowRight
        className="absolute w-4 h-4 right-4 fill-none z-[9] group-hover:right-[-25%] group-hover:stroke-white transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        style={{ stroke: ink }}
      />
    </>
  );

  const borderClass = variant === "light" ? "border-[#333333]/40" : "border-white/40";

  if (href) {
    return (
      <a href={href} aria-label={ariaLabel} className={`${base} ${borderClass}`} style={{ color: ink }}>
        {shared}
      </a>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`${base} ${borderClass}`}
      style={{ color: ink }}
    >
      {shared}
    </button>
  );
}
