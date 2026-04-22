"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { auraEase } from "@/lib/motion";

const STORAGE_KEY = "aura-accent";
const DEFAULT_ACCENT = "#b8ff57";

const PRESETS = [
  { name: "Lime", value: "#b8ff57" },
  { name: "Spring", value: "#9eda4b" },
  { name: "Sky", value: "#57c8ff" },
  { name: "Pink", value: "#ff57b8" },
  { name: "Violet", value: "#b88dff" },
  { name: "Amber", value: "#ffb547" },
  { name: "Coral", value: "#ff7a57" },
  { name: "Mint", value: "#57ffb8" },
  { name: "Magenta", value: "#ff57e1" },
  { name: "Cyan", value: "#57e1ff" },
  { name: "Lemon", value: "#f1ff57" },
  { name: "Crimson", value: "#ff5774" },
];

function applyAccent(value: string) {
  document.documentElement.style.setProperty("--color-accent-primary", value);
}

export default function ThemePicker() {
  const [open, setOpen] = useState(false);
  const [accent, setAccent] = useState<string>(DEFAULT_ACCENT);
  const popRef = useRef<HTMLDivElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);

  // Hydrate from localStorage on mount (the pre-paint script already
  // applied it to the DOM — we just sync React state).
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setAccent(stored);
    } catch {}
  }, []);

  // Click-outside dismiss
  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      const t = e.target as Node;
      if (popRef.current?.contains(t) || fabRef.current?.contains(t)) return;
      setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function pick(value: string) {
    setAccent(value);
    applyAccent(value);
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {}
  }

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            ref={popRef}
            initial={{ opacity: 0, scale: 0.9, y: 10, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.92, y: 8, filter: "blur(4px)" }}
            transition={{ duration: 0.32, ease: auraEase }}
            className="aura-glass relative w-[260px] origin-bottom-right rounded-2xl p-4 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.6)]"
          >
            <header className="mb-3 flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fg-muted">
                Accent
              </p>
              <span
                className="rounded-md border border-border-default bg-black/30 px-1.5 py-0.5 font-mono text-[10px] text-fg-muted"
                style={{ color: accent }}
              >
                {accent.toUpperCase()}
              </span>
            </header>

            <ul className="grid grid-cols-6 gap-2">
              {PRESETS.map((c) => {
                const active = c.value.toLowerCase() === accent.toLowerCase();
                return (
                  <li key={c.value}>
                    <button
                      type="button"
                      onClick={() => pick(c.value)}
                      title={c.name}
                      aria-label={c.name}
                      aria-pressed={active}
                      className={`relative grid h-8 w-8 place-items-center rounded-full transition-transform duration-200 hover:scale-110 ${
                        active
                          ? "ring-2 ring-fg/70 ring-offset-2 ring-offset-[var(--color-surface)]"
                          : ""
                      }`}
                      style={{
                        backgroundColor: c.value,
                        boxShadow: `0 0 14px -2px ${c.value}`,
                      }}
                    >
                      {active && (
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                          <path
                            d="M2 5.8l2.4 2.2L9 3"
                            stroke="#0a0a0a"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            <footer className="mt-4 flex items-center justify-between border-t border-border-default pt-3 text-[11px] text-fg-muted">
              <span>Live preview</span>
              <button
                type="button"
                onClick={() => pick(DEFAULT_ACCENT)}
                className="font-mono text-[11px] text-fg-muted transition-colors hover:text-fg"
              >
                Reset
              </button>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        ref={fabRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open theme picker"
        aria-expanded={open}
        className="aura-glass group relative grid h-12 w-12 place-items-center rounded-full shadow-[0_18px_40px_-15px_rgba(0,0,0,0.7)] transition-transform duration-300 hover:scale-105"
      >
        <span
          className="relative grid h-7 w-7 place-items-center rounded-full transition-transform duration-300 group-hover:rotate-45"
          style={{
            background: `conic-gradient(from 0deg, ${PRESETS.map((p, i) => `${p.value} ${(i / PRESETS.length) * 360}deg`).join(", ")}, ${PRESETS[0].value} 360deg)`,
          }}
        >
          <span
            className="h-3.5 w-3.5 rounded-full"
            style={{
              backgroundColor: accent,
              boxShadow: `0 0 10px ${accent}`,
            }}
          />
        </span>
      </button>
    </div>
  );
}
