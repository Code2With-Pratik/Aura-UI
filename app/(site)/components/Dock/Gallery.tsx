"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Check, Copy, Terminal } from "lucide-react";
import MacDock from "./MacDock";
import WindowsTaskbar from "./WindowsTaskbar";
import CategoryNav from "../_shared/CategoryNav";

export interface Variant {
  id: number;
  name: string;
  fileName: string;
  code: string;
  highlightedCode: string;
}

const PREVIEWS = { 1: MacDock, 2: WindowsTaskbar } as const;

export default function Gallery({ variants }: { variants: Variant[] }) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const backRef = useRef<HTMLButtonElement>(null);
  const lastSelectedId = useRef<number | null>(null);
  const returningToGrid = useRef(false);
  const selected = variants.find((variant) => variant.id === selectedId);

  function selectVariant(id: number) {
    returningToGrid.current = false;
    lastSelectedId.current = id;
    setSelectedId(id);
  }
  function returnToGrid() {
    returningToGrid.current = true;
    setSelectedId(null);
  }
  function restoreFocus() {
    if (!returningToGrid.current || lastSelectedId.current === null) return;
    window.requestAnimationFrame(() => {
      cardRefs.current[lastSelectedId.current ?? -1]?.focus();
      lastSelectedId.current = null;
      returningToGrid.current = false;
    });
  }

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
          Dock
        </h1>
        <p className="mt-5 max-w-[520px] text-[15px] leading-relaxed text-fg/70">
          Desktop navigation patterns with tactile launchers, system context,
          and responsive polish.
        </p>
      </header>
      <AnimatePresence mode="wait" onExitComplete={restoreFocus}>
        {selected ? (
          <motion.div
            key={`detail-${selected.id}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <Detail
              variant={selected}
              backRef={backRef}
              onBack={returnToGrid}
            />
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <Grid
              variants={variants}
              onSelect={selectVariant}
              setCardRef={(id, node) => {
                cardRefs.current[id] = node;
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <CategoryNav slug="Dock" />
    </main>
  );
}

function Grid({
  variants,
  onSelect,
  setCardRef,
}: {
  variants: Variant[];
  onSelect: (id: number) => void;
  setCardRef: (id: number, node: HTMLDivElement | null) => void;
}) {
  return (
    <ul className="grid grid-cols-1 gap-5">
      {variants.map((variant) => {
        const Preview = PREVIEWS[variant.id as keyof typeof PREVIEWS];
        return (
          <li key={variant.id}>
            <div
              ref={(node) => setCardRef(variant.id, node)}
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
              className="aura-tile group flex min-h-[330px] w-full cursor-pointer flex-col overflow-hidden p-3 text-left outline-none transition hover:-translate-y-1 hover:border-[var(--color-accent-primary)]/50 focus-visible:ring-2 focus-visible:ring-accent-primary sm:p-4"
            >
              <div className="flex min-h-[250px] flex-1 items-center overflow-hidden rounded-[14px] border border-[var(--color-border-default)] bg-[color-mix(in_srgb,var(--color-fg)_3%,transparent)]">
                <div
                  className="pointer-events-none w-full min-w-0"
                  aria-hidden="true"
                  inert
                >
                  <Preview compact />
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 px-1 pt-4">
                <span className="text-[13px] font-medium text-fg">
                  {variant.name}
                </span>
                <span className="font-mono text-[10px] text-fg-muted">
                  Variant {variant.id}
                </span>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function Detail({
  variant,
  backRef,
  onBack,
}: {
  variant: Variant;
  backRef: RefObject<HTMLButtonElement | null>;
  onBack: () => void;
}) {
  const Preview = PREVIEWS[variant.id as keyof typeof PREVIEWS];
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => backRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [backRef]);
  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <button
          ref={backRef}
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
        <div className="flex min-h-[360px] w-full min-w-0 items-center justify-center overflow-hidden rounded-[14px] border border-[var(--color-border-default)] bg-[color-mix(in_srgb,var(--color-fg)_3%,transparent)] sm:min-h-[460px]">
          <div className="w-full min-w-0">
            <Preview />
          </div>
        </div>
      </section>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Panel label="Command" icon={<Terminal className="h-3.5 w-3.5" />}>
          <CodeBlock
            value={
              variant.id === 1
                ? "npx aura-ui add macos-dock"
                : "npx aura-ui add windows-taskbar"
            }
            language="bash"
          />
        </Panel>
        <Panel label="Source">
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
    await navigator.clipboard.writeText(copyValue ?? value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
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
        data-lenis-prevent
        data-lang={language}
        className={`min-w-0 overflow-x-auto overflow-y-auto overscroll-contain touch-pan-x touch-pan-y rounded-lg bg-[#0d1117] p-4 pr-20 font-mono text-[11px] leading-relaxed text-gray-300 ${expanded ? "max-h-[500px]" : "max-h-[130px]"}`}
      >
        {isHtml ? (
          <div
            data-lenis-prevent
            className="shiki-wrapper min-w-max [&_pre]:!m-0 [&_pre]:!bg-transparent [&_pre]:!p-0 [&_pre]:!overflow-visible [&_code]:!bg-transparent"
            dangerouslySetInnerHTML={{ __html: value }}
          />
        ) : (
          <pre data-lenis-prevent className="m-0 min-w-max">
            <code>{value}</code>
          </pre>
        )}
      </div>
      {expandable && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-[11px] text-fg-muted hover:text-fg"
        >
          {expanded ? "Show less" : "Expand source"}
        </button>
      )}
    </div>
  );
}
