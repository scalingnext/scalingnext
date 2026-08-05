"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  pauseOnHover?: boolean;
}

export function Marquee({
  children,
  className,
  duration = 30,
  pauseOnHover = true,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className,
      )}
    >
      <motion.div
        className={cn("flex w-max", pauseOnHover && "hover:[animation-play-state:paused]")}
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        <div className="flex flex-shrink-0 gap-4 pr-4">{children}</div>
        <div className="flex flex-shrink-0 gap-4 pr-4" aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
