"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Maximize2, Minus, X } from "lucide-react";
import { auraEase, scaleIn } from "@/lib/motion";
import ComponentExplorer from "@/app/(site)/components/Window/ComponentExplorer";

export default function WindowMockup() {
  const [minimized, setMinimized] = useState(false);
  const reduce = useReducedMotion();
  return <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="relative">
    <motion.div animate={minimized ? { scale: 0.85, y: 30, opacity: 0.7, filter: "blur(2px)" } : { scale: 1, y: 0, opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.65, ease: auraEase }} style={{ transformOrigin: "50% 100%" }} className="aura-stack">
      <div className="aura-window overflow-hidden">
        <div className="relative flex items-center border-b border-border-default bg-[color-mix(in_srgb,var(--color-surface-elevated)_48%,transparent)] px-4 py-3 backdrop-blur-xl"><div className="flex items-center gap-2"><TrafficLight color="#ff5f57" label="Close" onClick={() => setMinimized(false)} /><TrafficLight color="#febc2e" label="Minimize" onClick={() => !reduce && setMinimized((value) => !value)} /><TrafficLight color="#28c840" label="Zoom" /></div><div className="pointer-events-none absolute inset-x-0 flex justify-center px-20"><span className="truncate font-mono text-[10px] text-fg-muted sm:text-[12px]">Aura UI<span className="hidden sm:inline"> — Component Explorer</span></span></div></div>
        <div className="h-[540px] overflow-hidden"><ComponentExplorer compact includeWindowsTaskbar={false} autoCycle /></div>
      </div>
    </motion.div>
    {minimized && <button onClick={() => setMinimized(false)} className="aura-border mt-6 inline-flex items-center gap-2 rounded-full bg-fg/3 px-4 py-2 text-xs text-fg/70 transition-colors hover:text-fg"><span className="h-1.5 w-1.5 rounded-full bg-fg" /> Restore window</button>}
  </motion.div>;
}

function TrafficLight({ color, label, onClick }: { color: string; label: string; onClick?: () => void }) {
  return <button aria-label={label} onClick={onClick} className="relative h-3 w-3 rounded-full transition-transform duration-200 hover:scale-110" style={{ backgroundColor: color, boxShadow: `0 0 0 0.5px rgba(0,0,0,0.4) inset, 0 0 8px -2px ${color}` }} />;
}
