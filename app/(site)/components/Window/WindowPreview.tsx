"use client";

import { Maximize2, Minus, X } from "lucide-react";
import ComponentExplorer from "./ComponentExplorer";

export default function WindowPreview({ kind, compact = false }: { kind: "windows" | "macos"; compact?: boolean }) {
  const mac = kind === "macos";
  return <div className={`relative overflow-hidden rounded-[18px] border border-border-default bg-[var(--color-surface)] text-fg shadow-[0_30px_80px_-30px_rgba(0,0,0,.28)] ${compact ? "mx-auto max-w-[820px]" : "w-full"}`}>
    <div className="relative flex h-11 items-center border-b border-border-default bg-[var(--color-surface-elevated)] px-4">
      {!mac && <div className="mr-3 grid h-5 w-5 grid-cols-2 gap-0.5 rounded bg-[#2d8cff] p-1"><i className="bg-white/90" /><i className="bg-white/90" /><i className="bg-white/90" /><i className="bg-white/90" /></div>}
      {mac ? <div className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><i className="h-2.5 w-2.5 rounded-full bg-[#28c840]" /></div> : <div className="ml-auto flex items-center gap-4"><Minus className="h-3 w-3 text-fg-muted" /><Maximize2 className="h-3 w-3 text-fg-muted" /><X className="h-3 w-3 text-fg-muted" /></div>}
      <span className="pointer-events-none absolute inset-x-0 text-center font-mono text-[10px] text-fg-muted">Aura UI — Component Explorer</span>
    </div>
    <ComponentExplorer compact={compact} />
  </div>;
}
