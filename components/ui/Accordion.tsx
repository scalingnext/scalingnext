"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
  theme?: "light" | "dark";
  defaultOpen?: string;
}

export function Accordion({
  items,
  theme = "light",
  defaultOpen,
}: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpen ?? null);

  const borderClass = theme === "light" ? "border-light-subtle" : "border-[#262626]";
  const titleClass =
    theme === "light" ? "text-light-primary" : "text-white";
  const mutedClass = theme === "light" ? "text-light-muted" : "text-gray-300";

  return (
    <div className="w-full">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className={cn(
              "border-b pb-4 relative z-20",
              borderClass,
              theme === "dark" ? "bg-[#0A0A0A]" : "bg-transparent",
            )}
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className={cn(
                "flex w-full items-center justify-between gap-3 py-3 md:py-2 text-base md:text-lg font-bold cursor-pointer text-left",
                titleClass,
              )}
              aria-expanded={isOpen}
            >
              <span>{item.title}</span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className={cn(
                  "flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border",
                  theme === "light"
                    ? "border-light-subtle bg-light-surface"
                    : "border-[#262626] bg-[#161616] text-white",
                )}
              >
                <Plus size={14} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className={cn("pb-2 text-sm md:text-base", mutedClass)}>
                    {item.content}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
