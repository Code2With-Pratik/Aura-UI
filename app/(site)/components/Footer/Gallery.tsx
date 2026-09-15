"use client";

import { useEffect, useRef, useState, type ComponentType, type ReactNode, type RefObject } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, ChevronDown, Copy, Maximize2, Terminal } from "lucide-react";
import { auraEase } from "@/lib/motion";
import CategoryNav from "../_shared/CategoryNav";
import Footer1 from "./Footer1";
import Footer2 from "./Footer2";
import Footer3 from "./Footer3";
import Footer4 from "./Footer4";
import Footer5 from "./Footer5";
import Footer6 from "./Footer6";
import Footer7 from "./Footer7";
import Footer8 from "./Footer8";
import Footer9 from "./Footer9";

export interface Variant {
  id: number;
  name: string;
  fileName: string;
  componentName: string;
  code: string;
  highlightedCode: string;
  highlightedSnippet: string;
}

const PREVIEWS: Record<number, ComponentType> = {
  1: Footer1,
  2: Footer2,
  3: Footer3,
  4: Footer4,
  5: Footer5,
  6: Footer6,
  7: Footer7,
  8: Footer8,
  9: Footer9,
};

function Preview({ id }: { id: number }) {
  const Component = PREVIEWS[id];
  return Component ? <Component /> : null;
}

function PreviewStage({ id, compact = false, inert = false }: { id: number; compact?: boolean; inert?: boolean }) {
  return (
    <div
      className={`flex w-full min-w-0 items-start justify-center overflow-x-auto overflow-y-visible rounded-lg bg-[var(--color-bg)]/40 py-4 [scrollbar-width:thin] ${inert ? "pointer-events-none" : ""} ${compact ? "min-h-[220px] sm:min-h-[250px] lg:min-h-[280px]" : "min-h-[420px] sm:min-h-[500px] lg:min-h-[560px]"}`}
      aria-hidden={inert ? true : undefined}
      inert={inert || undefined}
    >
      <div className="w-full min-w-0 shrink-0 px-3 sm:px-5">
        <div className="w-full min-w-0 [&>*]:w-full [&>*]:min-w-0 [&>*]:max-w-none">
          <Preview id={id} />
        </div>
      </div>
    </div>
  );
}

export default function Gallery({
  slug,
  title,
  variants,
}: {
  slug: string;
  title: string;
  variants: Variant[];
}) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const detailBackRef = useRef<HTMLButtonElement>(null);
  const lastSelectedId = useRef<number | null>(null);
  const returningToGrid = useRef(false);
  const selected = variants.find((v) => v.id === selectedId) ?? null;

  function selectVariant(id: number) {
    returningToGrid.current = false;
    lastSelectedId.current = id;
    setSelectedId(id);
  }

  function restoreGridFocus() {
    if (!returningToGrid.current || lastSelectedId.current === null) return;

    window.requestAnimationFrame(() => {
      cardRefs.current[lastSelectedId.current ?? -1]?.focus();
      lastSelectedId.current = null;
      returningToGrid.current = false;
    });
  }

  function returnToGrid() {
    returningToGrid.current = true;
    setSelectedId(null);
  }

  return (
    <main id="top" className="relative mx-auto w-full max-w-[1240px] px-6 pb-20 pt-6 md:pb-28 md:pt-10">
      <Link href="/components" className="mb-8 inline-flex items-center gap-1.5 text-[13px] text-fg-muted transition-colors hover:text-fg">
        <ArrowLeft className="h-3.5 w-3.5" /> All components
      </Link>

      <header className="mb-12 flex flex-col items-center text-center">
        <p className="eyebrow mb-3">Category</p>
        <h1 className="display-clamp text-balance text-fg" style={{ fontSize: "clamp(2rem, 4.5vw + 0.5rem, 4.75rem)" }}>
          {title}
        </h1>
        <p className="mt-5 max-w-[520px] text-pretty text-[15px] leading-relaxed text-fg/70">
          {variants.length} footer variants. Click any card to preview the live demo and copy the code.
        </p>
      </header>

      <AnimatePresence mode="wait" onExitComplete={restoreGridFocus}>
        {selected ? (
          <motion.div key={`detail-${selected.id}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.32, ease: auraEase }}>
            <Detail variant={selected} backRef={detailBackRef} onBack={returnToGrid} />
          </motion.div>
        ) : (
          <motion.div key="grid" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.32, ease: auraEase }}>
            <Grid variants={variants} onSelect={selectVariant} setCardRef={(id, node) => { cardRefs.current[id] = node; }} />
            <CategoryNav slug={slug} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function Grid({ variants, onSelect, setCardRef }: { variants: Variant[]; onSelect: (id: number) => void; setCardRef: (id: number, node: HTMLDivElement | null) => void }) {
  return (
    <ul className="grid grid-cols-1 gap-5">
      {variants.map((v) => (
        <li key={v.id}>
          <div ref={(node) => setCardRef(v.id, node)} role="button" tabIndex={0} aria-label={`Open ${v.name} preview`} onClick={() => onSelect(v.id)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect(v.id); } }} className="aura-tile group relative flex min-h-[320px] w-full cursor-pointer flex-col overflow-hidden p-3 text-left outline-none transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-[var(--color-accent-primary)]/45 hover:shadow-[0_18px_50px_color-mix(in_srgb,var(--color-accent-primary)_10%,transparent)] focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] sm:p-4">
            <div className="relative flex min-h-0 flex-1 items-stretch overflow-hidden rounded-[14px] border border-[var(--color-border-default)] bg-[color-mix(in_srgb,var(--color-fg)_3%,transparent)] p-2 shadow-inner sm:p-3">
              <PreviewStage id={v.id} compact inert />
            </div>
            <div className="flex items-center justify-between gap-3 px-1 pt-4">
              <span className="min-w-0 truncate text-[13px] font-medium text-fg">{v.name}</span>
              <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[10px] text-fg-muted"><span className="rounded-full bg-fg/8 px-2 py-1">Variant {v.id}</span><Maximize2 className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-70" /></span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

function Detail({ variant, backRef, onBack }: { variant: Variant; backRef: RefObject<HTMLButtonElement | null>; onBack: () => void }) {
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => backRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [backRef]);

  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <button ref={backRef} type="button" onClick={onBack} className="aura-border inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] text-fg/75 transition-colors hover:text-fg">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to grid
        </button>
        <div className="flex items-center gap-2 text-[12px]">
          <span className="text-fg-muted">{variant.fileName}</span>
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--color-accent-primary)" }} />
          <span className="font-medium text-fg">{variant.name}</span>
        </div>
      </div>

      <div className="space-y-5">
        <Panel label="Live preview">
          <div className="w-full min-w-0 overflow-hidden rounded-[14px] border border-[var(--color-border-default)] bg-[color-mix(in_srgb,var(--color-fg)_3%,transparent)] p-3 sm:p-6">
            <PreviewStage id={variant.id} />
          </div>
        </Panel>

        <div className="grid gap-5 lg:grid-cols-2">
          <Panel label="Command" icon={<Terminal className="h-3.5 w-3.5" />}>
            <CodeBlock value={`npm install framer-motion lucide-react`} language="bash" />
            <p className="mt-3 text-[11px] text-fg-muted">Drop the component file into your project and style it with your layout tokens.</p>
          </Panel>
          <Panel label="About this variant">
            <p className="max-w-prose text-[13px] leading-relaxed text-fg/70">A production-ready footer pattern from the Aura UI collection. Open the full preview above to inspect the responsive behavior at any viewport width.</p>
          </Panel>
        </div>
      </div>

      <div className="mt-4">
        <Panel label="Snippet">
          <CodeBlock value={variant.highlightedSnippet} isHtml />
        </Panel>
      </div>

      <div className="mt-4">
        <Panel label="Full code">
          <CodeBlock value={variant.highlightedCode} isHtml expandable />
        </Panel>
      </div>
    </>
  );
}

function Panel({ label, icon, children }: { label: string; icon?: ReactNode; children: ReactNode }) {
  return (
    <section className="aura-tile p-3 md:p-4">
      <header className="mb-3 flex items-center justify-between">
        <p className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-fg-muted">
          {icon}
          {label}
        </p>
      </header>
      {children}
    </section>
  );
}

function CodeBlock({ value, language, isHtml, expandable = false }: { value: string; language?: string; isHtml?: boolean; expandable?: boolean }) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(!expandable);

  async function copy() {
    try {
      const textToCopy = isHtml ? value.replace(/<[^>]*>?/gm, "") : value;
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard blocked — fail silently */
    }
  }

  return (
    <div className="relative group/code">
      <button type="button" onClick={copy} aria-label="Copy" className="absolute right-2 top-2 z-20 inline-flex items-center gap-1 rounded-md border border-border-default bg-fg/5 px-2 py-1 text-[10px] font-medium text-fg/80 opacity-0 transition-opacity group-hover/code:opacity-100 hover:bg-fg/10 hover:text-fg">
        {copied ? <><Check className="h-3 w-3" /> Copied</> : <><Copy className="h-3 w-3" /> Copy</>}
      </button>

      <div className={`relative w-full overflow-x-auto rounded-lg border border-border-default transition-all duration-500 ease-aura ${!expanded ? "max-h-[220px] overflow-hidden" : "max-h-[800px] overflow-y-auto"} bg-[#0d1117] dark:bg-[#0d1117]`}>
        {isHtml ? (
          <div className="shiki-wrapper p-4 pr-12 font-mono text-[12px] leading-relaxed md:p-5 md:pr-20 [&_pre]:!bg-transparent [&_pre]:!p-0 [&_pre]:!overflow-visible [&_code]:!bg-transparent" dangerouslySetInnerHTML={{ __html: value }} />
        ) : (
          <pre className="p-4 pr-12 font-mono text-[12px] leading-relaxed text-gray-300 md:p-5 md:pr-20" data-lang={language}>
            <code>{value}</code>
          </pre>
        )}

        {expandable && !expanded && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex h-24 items-end justify-center bg-gradient-to-t from-black/95 to-transparent pb-4">
            <button type="button" onClick={() => setExpanded(true)} className="aura-glass pointer-events-auto flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[12px] font-medium text-white shadow-2xl backdrop-blur-md transition-transform hover:scale-105">
              Expand Code <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>

      {expandable && expanded && (
        <button type="button" onClick={() => setExpanded(false)} className="mt-2 text-[11px] font-medium text-fg/40 transition-colors hover:text-fg">
          Show less
        </button>
      )}
    </div>
  );
}
