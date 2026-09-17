"use client";

import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
  type MutableRefObject,
} from "react";
import Link from "next/link";
import { ArrowLeft, Check, Copy, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import WindowsWindow from "./WindowsWindow";
import MacOSWindow from "./MacOSWindow";
import CategoryNav from "../_shared/CategoryNav";

export type Variant = {
  id: number;
  name: string;
  fileName: string;
  code: string;
  highlightedCode: string;
  install: string;
};
type PreviewComponent = ComponentType<{ compact?: boolean }>;
const PREVIEWS: Record<number, PreviewComponent> = {
  1: WindowsWindow,
  2: MacOSWindow,
};

export default function Gallery({ variants }: { variants: Variant[] }) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selected =
    variants.find((variant) => variant.id === selectedId) ?? null;
  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const lastSelected = useRef<number | null>(null);
  function back() {
    lastSelected.current = selectedId;
    setSelectedId(null);
  }
  useEffect(() => {
    if (selectedId === null && lastSelected.current !== null) {
      const id = window.setTimeout(
        () => cardRefs.current[lastSelected.current ?? -1]?.focus(),
        0,
      );
      lastSelected.current = null;
      return () => window.clearTimeout(id);
    }
  }, [selectedId]);
  return (
    <main className="relative mx-auto w-full max-w-[1240px] px-6 pb-20 pt-6 md:pb-28 md:pt-10">
      <Link
        href="/components"
        className="mb-8 inline-flex items-center gap-1.5 text-[13px] text-fg-muted hover:text-fg"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> All components
      </Link>
      <header className="mb-12 flex flex-col items-center text-center">
        <p className="eyebrow mb-3">Overlays</p>
        <h1
          className="display-clamp text-fg"
          style={{ fontSize: "clamp(2rem, 4.5vw + 0.5rem, 4.75rem)" }}
        >
          Window
        </h1>
        <p className="mt-5 max-w-[540px] text-[15px] leading-relaxed text-fg/70">
          Window chrome for Windows and macOS, with editable image backgrounds
          and embedded video previews.
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
            <Detail variant={selected} onBack={back} />
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <Grid
              variants={variants}
              onSelect={setSelectedId}
              cardRefs={cardRefs}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <CategoryNav slug="Window" />
    </main>
  );
}

function Grid({
  variants,
  onSelect,
  cardRefs,
}: {
  variants: Variant[];
  onSelect: (id: number) => void;
  cardRefs: MutableRefObject<Record<number, HTMLDivElement | null>>;
}) {
  return (
    <ul className="grid grid-cols-1 gap-5">
      {variants.map((variant) => {
        const Preview = PREVIEWS[variant.id];
        return (
          <li key={variant.id}>
            <div
              ref={(node) => {
                cardRefs.current[variant.id] = node;
              }}
              role="button"
              tabIndex={0}
              aria-label={`Open ${variant.name} preview`}
              onClick={() => onSelect(variant.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onSelect(variant.id);
                }
              }}
              className="aura-tile group flex min-h-[360px] w-full cursor-pointer flex-col overflow-hidden p-3 text-left outline-none transition hover:-translate-y-1 hover:border-accent-primary/50 focus-visible:ring-2 focus-visible:ring-accent-primary sm:p-4"
            >
              <div className="flex min-h-[285px] flex-1 items-center overflow-hidden rounded-[14px] border border-border-default bg-fg/[0.03]">
                <div className="pointer-events-none w-full min-w-0" inert>
                  <Preview compact />
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 px-1 pt-4">
                <div>
                  <p className="text-[13px] font-medium text-fg">
                    {variant.name}
                  </p>
                  <p className="mt-1 text-[11px] text-fg-muted">
                    Click to open full review
                  </p>
                </div>
                <span className="rounded-full border border-border-default px-2 py-1 font-mono text-[10px] text-fg-muted">
                  View code →
                </span>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function Detail({ variant, onBack }: { variant: Variant; onBack: () => void }) {
  const Preview = PREVIEWS[variant.id];
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
      <section className="aura-tile p-3 md:p-4">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-fg-muted">
          Live preview
        </p>
        <div className="flex min-h-[380px] w-full items-center justify-center overflow-hidden rounded-[14px] border border-border-default bg-fg/[0.03] sm:min-h-[520px]">
          <div className="w-full min-w-0">
            <Preview />
          </div>
        </div>
      </section>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Panel label="Installation" icon={<Terminal className="h-3.5 w-3.5" />}>
          <CodeBlock value={variant.install} language="bash" />
        </Panel>
        <Panel label="Source code">
          <CodeBlock
            value={variant.highlightedCode}
            copyValue={variant.code}
            isHtml
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
  icon?: ReactNode;
  children: ReactNode;
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
  language,
  isHtml = false,
  expandable = false,
}: {
  value: string;
  copyValue?: string;
  language?: string;
  isHtml?: boolean;
  expandable?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(!expandable);
  async function copy() {
    try {
      await navigator.clipboard.writeText(copyValue ?? value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard unavailable */
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
        data-lang={language}
        data-lenis-prevent
        className={`min-w-0 overflow-x-auto overflow-y-auto overscroll-contain rounded-lg bg-[#0d1117] p-4 pr-20 font-mono text-[11px] leading-relaxed text-gray-300 ${expanded ? "max-h-[520px]" : "max-h-[150px]"}`}
      >
        {isHtml ? (
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
          onClick={() => setExpanded((open) => !open)}
          className="mt-2 text-[11px] text-fg-muted hover:text-fg"
        >
          {expanded ? "Show less" : "Expand source"}
        </button>
      )}
    </div>
  );
}
