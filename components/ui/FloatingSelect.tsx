"use client";

/**
 * Floating listbox select — replaces the native <select> so the dropdown
 * matches the dark UI instead of rendering the OS control.
 *
 * Keyboard support: Enter/Space to open, Up/Down to move, Enter to choose,
 * Escape to close, Home/End to jump, and type-ahead for long lists.
 * Follows the ARIA combobox pattern so screen readers announce it correctly.
 */

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";

export type SelectOption = {
  value: string;
  label: string;
  /** Optional trailing text, e.g. a dial code */
  hint?: string;
};

export function FloatingSelect({
  id,
  options,
  value,
  onChange,
  placeholder = "Select an option",
  searchable = false,
  invalid = false,
  describedBy,
  ariaLabel,
  className = "",
  buttonClassName = "",
  renderValue,
}: {
  id: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchable?: boolean;
  invalid?: boolean;
  describedBy?: string;
  ariaLabel?: string;
  className?: string;
  buttonClassName?: string;
  renderValue?: (option: SelectOption | undefined) => React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const typeAhead = useRef({ text: "", at: 0 });

  const listboxId = useId();
  const selected = options.find((o) => o.value === value);

  const visible = useMemo(() => {
    if (!searchable || !query.trim()) return options;
    const q = query.trim().toLowerCase();
    return options.filter(
      (o) => o.label.toLowerCase().includes(q) || (o.hint ?? "").includes(q),
    );
  }, [options, query, searchable]);

  // Close on outside click or focus leaving the widget.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // On open: focus search if present, and scroll the selected row into view.
  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }
    const index = visible.findIndex((o) => o.value === value);
    setActiveIndex(index >= 0 ? index : 0);
    if (searchable) {
      searchRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open || activeIndex < 0) return;
    const node = listRef.current?.children[activeIndex] as HTMLElement | undefined;
    node?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open]);

  const choose = (option: SelectOption) => {
    onChange(option.value);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (!open) {
      if (["Enter", " ", "ArrowDown", "ArrowUp"].includes(event.key)) {
        event.preventDefault();
        setOpen(true);
      }
      return;
    }

    switch (event.key) {
      case "Escape":
        event.preventDefault();
        setOpen(false);
        buttonRef.current?.focus();
        break;
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, visible.length - 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(visible.length - 1);
        break;
      case "Enter":
        event.preventDefault();
        if (visible[activeIndex]) choose(visible[activeIndex]);
        break;
      case "Tab":
        setOpen(false);
        break;
      default:
        // Type-ahead, only when there is no search input to type into.
        if (!searchable && event.key.length === 1) {
          const now = Date.now();
          typeAhead.current.text =
            now - typeAhead.current.at > 700 ? event.key : typeAhead.current.text + event.key;
          typeAhead.current.at = now;
          const match = visible.findIndex((o) =>
            o.label.toLowerCase().startsWith(typeAhead.current.text.toLowerCase()),
          );
          if (match >= 0) setActiveIndex(match);
        }
    }
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <button
        ref={buttonRef}
        id={id}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        aria-haspopup="listbox"
        aria-label={ariaLabel}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onKeyDown}
        className={`flex w-full items-center justify-between gap-2 rounded-xl border bg-[#0F0F0F] px-4 py-3 text-left text-[15px] outline-none transition-colors duration-200 ${
          open ? "border-[#4A4A4A] ring-1 ring-[#4A4A4A]" : "border-[#2A2A2A] hover:border-[#3A3A3A]"
        } ${selected ? "text-white" : "text-[#5C5C5C]"} ${buttonClassName}`}
      >
        <span className="truncate">
          {renderValue ? renderValue(selected) : (selected?.label ?? placeholder)}
        </span>
        <ChevronDown
          aria-hidden
          size={16}
          className={`shrink-0 text-[#6B6B6B] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 overflow-hidden rounded-xl border border-[#2E2E2E] bg-[#161616] shadow-[0_16px_40px_-12px_rgba(0,0,0,0.7)]">
          {searchable && (
            <div className="flex items-center gap-2 border-b border-[#242424] px-3.5 py-2.5">
              <Search aria-hidden size={14} className="shrink-0 text-[#6B6B6B]" />
              <input
                ref={searchRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={onKeyDown}
                placeholder="Search"
                aria-label="Search options"
                className="w-full bg-transparent text-[14px] text-white placeholder:text-[#5C5C5C] outline-none"
              />
            </div>
          )}

          <ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            aria-label={ariaLabel}
            className="max-h-[240px] overflow-y-auto py-1"
          >
            {visible.length === 0 && (
              <li className="px-4 py-3 text-[14px] text-[#6B6B6B]">No matches</li>
            )}
            {visible.map((option, index) => {
              const isSelected = option.value === value;
              return (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => choose(option)}
                  className={`flex cursor-pointer items-center justify-between gap-3 px-4 py-2.5 text-[14.5px] transition-colors duration-100 ${
                    index === activeIndex ? "bg-[#212121] text-white" : "text-[#C4C4C4]"
                  }`}
                >
                  <span className="truncate">{option.label}</span>
                  <span className="flex shrink-0 items-center gap-2">
                    {option.hint && <span className="text-[13px] text-[#6B6B6B]">{option.hint}</span>}
                    {isSelected && <Check size={14} className="text-white" strokeWidth={2.5} />}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
