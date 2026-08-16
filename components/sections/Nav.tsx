"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { FlowButton } from "@/components/ui/flow-button";

const links = [
  { label: "Community", href: "#community" },
  { label: "Resources", href: "#resources" },
  { label: "Webinars", href: "#webinars" },
  { label: "About", href: "#about" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 max-w-5xl mx-auto px-4">
      <motion.div
        initial={false}
        animate={{
          height: scrolled ? 56 : 64,
          boxShadow: scrolled
            ? "0 10px 30px -10px rgba(0,0,0,0.15)"
            : "0 10px 15px -3px rgba(0,0,0,0.08)",
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="w-full bg-white/95 backdrop-blur rounded-full border border-gray-200/50 flex items-center justify-between px-6"
      >
        <a href="#top" className="flex items-center gap-2.5 group">
          <motion.img
            src="/logo.png"
            alt="ScalingNext Logo"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="w-8 h-8 rounded-lg object-contain"
          />
          <span className="text-base font-extrabold tracking-tight text-light-primary">
            ScalingNext
          </span>
        </a>

        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-light-primary">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link hover:text-brand-orange">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center">
          <FlowButton href="https://chat.whatsapp.com/CKzAuoLtl8w8jzeTWyBWU6" text="Join Free" variant="light" />
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex h-11 w-11 items-center justify-center rounded-full border border-light-subtle active:scale-95 transition-transform"
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden mt-2 rounded-2xl bg-white border border-light-subtle shadow-xl p-4 flex flex-col gap-3"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-light-primary py-3 px-3 rounded-lg hover:bg-light-surface transition-colors duration-200"
              >
                {l.label}
              </a>
            ))}
            <div onClick={() => setOpen(false)} className="w-full flex justify-center">
              <FlowButton href="https://chat.whatsapp.com/CKzAuoLtl8w8jzeTWyBWU6" text="Join Free" variant="light" className="w-full justify-center" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
