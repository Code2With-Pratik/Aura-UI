"use client";

import { useEffect, useState, type ComponentType } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Check, Copy, Terminal } from "lucide-react";
import CategoryNav from "../_shared/CategoryNav";
import Navbar1 from "./Navbar1";
import Navbar2 from "./Navbar2";
import Navbar3 from "./Navbar3";
import Navbar4 from "./Navbar4";
import Navbar5 from "./Navbar5";
import Navbar6 from "./Navbar6";
import Navbar7 from "./Navbar7";
import Navbar8 from "./Navbar8";

export type Variant = {
  id: number;
  name: string;
  fileName: string;
  code: string;
  highlightedCode: string;
  install: string;
};

const previews: Record<number, ComponentType> = {
  1: Navbar1,
  2: Navbar2,
  3: Navbar3,
  4: Navbar4,
  5: Navbar5,
  6: Navbar6,
  7: Navbar7,
  8: Navbar8,
};

export default function Gallery({ variants }: { variants: Variant[] }) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selected = variants.find((variant) => variant.id === selectedId);

  useEffect(() => {
    if (selectedId !== null) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedId]);

  return (
    <main className="mx-auto w-full max-w-[1240px] px-6 pb-20 pt-6 md:pt-10">
      <Link
        href="/components"
        className="mb-8 inline-flex items-center gap-1.5 text-[13px] text-fg-muted hover:text-fg"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> All components
      </Link>
      <header className="mb-12 text-center">
        <p className="eyebrow mb-3">Navigation</p>
        <h1
          className="display-clamp text-fg"
          style={{ fontSize: "clamp(2rem, 4.5vw + 0.5rem, 4.75rem)" }}
        >
          Navbar
        </h1>
        <p className="mx-auto mt-5 max-w-[560px] text-[15px] leading-relaxed text-fg/70">
          Expressive navigation systems inspired by Apple, macOS, iOS glass,
          dashboards, and modern product sites.
        </p>
      </header>
      <AnimatePresence mode="wait">
        {selected ? (
          <motion.div
            key="detail"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <Detail variant={selected} onBack={() => setSelectedId(null)} />
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <div className="grid grid-cols-1 gap-5">
              {variants.map((variant) => {
                const Preview = previews[variant.id];
                return (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={() => setSelectedId(variant.id)}
                    className="aura-tile group overflow-visible p-3 text-left transition hover:-translate-y-1 hover:border-accent-primary/50"
                  >
                    <div className="overflow-visible rounded-[14px] border border-border-default bg-transparent">
                      <Preview />
                    </div>
                    <div className="flex items-center justify-between gap-2 px-1 pt-3">
                      <span className="text-[13px] font-medium text-fg">
                        {variant.name}
                      </span>
                      <span className="font-mono text-[10px] text-fg-muted">
                        View code -&gt;
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <CategoryNav slug="Navbar" />
    </main>
  );
}

function Detail({ variant, onBack }: { variant: Variant; onBack: () => void }) {
  const Preview = previews[variant.id];
  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="aura-border inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] text-fg/75 hover:text-fg"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to grid
        </button>
        <span className="font-mono text-[11px] text-fg-muted">
          {variant.fileName}
        </span>
      </div>
      <section className="aura-tile overflow-visible p-3 md:p-4">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-fg-muted">
          Live preview
        </p>
        <div className="overflow-visible rounded-[14px] border border-border-default bg-transparent">
          <Preview />
        </div>
      </section>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Panel label="Installation" icon={<Terminal className="h-3.5 w-3.5" />}>
          <CodeBlock value={variant.install} />
        </Panel>
        <Panel label="Source code">
          <CodeBlock
            value={variant.highlightedCode}
            copyValue={variant.code}
            html
            expandable
          />
        </Panel>
      </div>
    </>
  );
}

function Panel({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="aura-tile p-3 md:p-4">
      <p className="mb-3 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-fg-muted">
        {icon}
        {label}
      </p>
      {children}
    </section>
  );
}

function CodeBlock({
  value,
  copyValue,
  html = false,
  expandable = false,
}: {
  value: string;
  copyValue?: string;
  html?: boolean;
  expandable?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(copyValue ?? value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      /* unavailable */
    }
  }
  return (
    <div className="relative">
      <button
        type="button"
        onClick={copy}
        className="absolute right-2 top-2 z-10 inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-white/80"
      >
        {copied ? (
          <>
            <Check className="h-3 w-3" /> Copied
          </>
        ) : (
          <>
            <Copy className="h-3 w-3" /> Copy
          </>
        )}
      </button>
      <div
        tabIndex={html ? 0 : undefined}
        role={html ? "region" : undefined}
        aria-label={html ? "Scrollable source code" : undefined}
        className={`min-w-0 overscroll-contain rounded-lg bg-[#0d1117] p-4 pr-20 font-mono text-[11px] leading-relaxed text-gray-300 ${html ? (expanded ? "h-[520px] max-h-[520px] overflow-auto" : "h-[220px] max-h-[220px] overflow-hidden") : "min-h-[56px] overflow-auto"}`}
      >
        {html ? (
          <div
            className="shiki-wrapper min-w-max [&_pre]:!m-0 [&_pre]:!bg-transparent [&_pre]:!p-0"
            dangerouslySetInnerHTML={{ __html: value }}
          />
        ) : (
          <pre className="m-0 min-w-max">
            <code>{value}</code>
          </pre>
        )}
      </div>
      {expandable && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="mt-2 text-[11px] text-fg-muted transition-colors hover:text-fg"
        >
          {expanded ? "Collapse source" : "Show full source"}
        </button>
      )}
    </div>
  );
}
