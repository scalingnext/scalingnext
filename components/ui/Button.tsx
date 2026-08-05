"use client";

import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-300 active:scale-[0.97] hover:-translate-y-0.5";
  const variants: Record<Variant, string> = {
    primary:
      "btn-primary-shine bg-brand-orange text-white px-6 py-3 hover:brightness-110 shadow-lg shadow-brand-orange/30 hover:shadow-brand-orange/50",
    outline:
      "bg-transparent border border-brand-orange text-brand-orange text-xs px-4 py-2.5 md:py-2 hover:bg-brand-orange hover:text-white hover:shadow-md hover:shadow-brand-orange/30",
    ghost: "bg-transparent text-light-primary hover:text-brand-orange",
  };
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
