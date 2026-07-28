"use client";

import { useState, type ComponentType, type ReactNode } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, ChevronDown, Copy, Terminal } from "lucide-react";
import { auraEase } from "@/lib/motion";
import CategoryNav from "../_shared/CategoryNav";
import Footer1 from "./Footer1";
import Footer2 from "./Footer2";
import Footer3 from "./Footer3";
import Footer4 from "./Footer4";
import Footer5 from "./Footer5";
import Footer6 from "./Footer6";

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
};

function Preview({ id }: { id: number }) {
  const Component = PREVIEWS[id];
  return Component ? <Component /> : null;
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
  const selected = variants.find((v) => v.id === selectedId) ?? null;

  return (
    <main className="relative mx-auto w-full max-w-[1240px] px-6 pb-20 pt-6 md:pb-28 md:pt-10">
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

      <AnimatePresence mode="wait">
        {selected ? (
          <motion.div key={`detail-${selected.id}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.32, ease: auraEase }}>
            <Detail variant={selected} onBack={() => setSelectedId(null)} />
          </motion.div>
        ) : (
          <motion.div key="grid" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.32, ease: auraEase }}>
            <Grid variants={variants} onSelect={setSelectedId} />
            <CategoryNav slug={slug} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function Grid({ variants, onSelect }: { variants: Variant[]; onSelect: (id: number) => void }) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {variants.map((v) => (
        <li key={v.id}>
          <div role="button" tabIndex={0} onClick={() => onSelect(v.id)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect(v.id); } }} className="aura-tile group relative flex h-[220px] w-full cursor-pointer flex-col overflow-hidden p-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-accent-primary">
            <div className="flex flex-1 items-center justify-center">
              <div className="grid h-[120px] w-full place-items-center rounded-lg bg-black/5 p-4 dark:bg-black/40">
                <Preview id={v.id} />
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[13px] font-medium text-fg">{v.name}</span>
              <span className="font-mono text-[10px] text-fg-muted">{v.fileName}</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

function Detail({ variant, onBack }: { variant: Variant; onBack: () => void }) {
  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <button type="button" onClick={onBack} className="aura-border inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] text-fg/75 transition-colors hover:text-fg">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to grid
        </button>
        <div className="flex items-center gap-2 text-[12px]">
          <span className="text-fg-muted">{variant.fileName}</span>
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--color-accent-primary)" }} />
          <span className="font-medium text-fg">{variant.name}</span>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel label="Preview">
          <div className="grid min-h-[280px] place-items-center rounded-lg bg-black/5 p-6 dark:bg-black/40">
            <Preview id={variant.id} />
          </div>
        </Panel>

        <Panel label="Command" icon={<Terminal className="h-3.5 w-3.5" />}>
          <CodeBlock value={`npm install framer-motion lucide-react`} language="bash" />
          <p className="mt-3 text-[11px] text-fg-muted">Drop the component file into your project and style it with your layout tokens.</p>
        </Panel>
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
