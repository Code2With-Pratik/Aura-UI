"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Copy, Terminal } from "lucide-react";
import CategoryNav from "../_shared/CategoryNav";
import PageTransitionPreview, { type Direction } from "./PageTransitionPreview";

type Variant = {
  id: Direction;
  name: string;
  description: string;
  install: string;
  code: string;
  highlightedCode: string;
  highlightedSnippet: string;
};

export default function Gallery({ variants }: { variants: Variant[] }) {
  const [selectedId, setSelectedId] = useState<Direction | null>(null);
  const selected = variants.find((variant) => variant.id === selectedId);
  return (
    <main className="relative mx-auto w-full max-w-[1240px] px-6 pb-20 pt-6 md:pt-10 md:pb-28">
      <Link
        href="/components"
        className="mb-8 inline-flex items-center gap-1.5 text-[13px] text-fg-muted hover:text-fg"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> All components
      </Link>
      <header className="mb-12 text-center">
        <p className="eyebrow mb-3">Visual Design</p>
        <h1
          className="display-clamp text-fg"
          style={{ fontSize: "clamp(2rem, 4.5vw + 0.5rem, 4.75rem)" }}
        >
          Page Transitions
        </h1>
        <p className="mx-auto mt-5 max-w-[540px] text-[15px] leading-relaxed text-fg/70">
          Six ladder transitions for cinematic page changes. Open a card to
          preview its full-screen animation.
        </p>
      </header>
      {selected ? (
        <Detail variant={selected} onBack={() => setSelectedId(null)} />
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {variants.map((variant) => (
            <button
              type="button"
              key={variant.id}
              onClick={() => setSelectedId(variant.id)}
              className="aura-card group overflow-hidden p-4 text-left transition hover:-translate-y-1"
            >
              <div className="grid min-h-[280px] place-items-center overflow-hidden rounded-lg bg-black/5 p-4 dark:bg-black/40">
                <PageTransitionPreview
                  initialDirection={variant.id}
                  showControls={false}
                />
              </div>
              <div className="mt-4">
                <p className="text-[14px] font-medium text-fg">
                  {variant.name}
                </p>
                <p className="mt-1 text-[12px] leading-relaxed text-fg-muted">
                  {variant.description}
                </p>
                <p className="mt-3 font-mono text-[10px] text-fg-muted">
                  Show animation →
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
      <CategoryNav slug="PageTransition" />
    </main>
  );
}

function Detail({ variant, onBack }: { variant: Variant; onBack: () => void }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-[13px] text-fg-muted hover:text-fg"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to transitions
        </button>
        <span className="text-[12px] text-fg-muted">{variant.name}</span>
      </div>
      <section className="aura-tile p-3 md:p-4">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-fg-muted">
          Live preview
        </p>
        <div className="grid min-h-[340px] place-items-center rounded-lg bg-black/5 p-5 dark:bg-black/40">
          <PageTransitionPreview
            initialDirection={variant.id}
            showDirectionControls={false}
          />
        </div>
      </section>
      <div className="grid gap-5 lg:grid-cols-2">
        <Panel label="Installation" icon={<Terminal className="h-3.5 w-3.5" />}>
          <CodeBlock value={variant.install} />
        </Panel>
        <Panel label="Snippet">
          <CodeBlock value={variant.highlightedSnippet} html />
        </Panel>
      </div>
      <Panel label="Full source">
        <CodeBlock
          value={variant.highlightedCode}
          copyValue={variant.code}
          html
          expandable
        />
      </Panel>
    </div>
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
  html = false,
  expandable = false,
}: {
  value: string;
  copyValue?: string;
  html?: boolean;
  expandable?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(!expandable);
  const copy = async () => {
    await navigator.clipboard.writeText(copyValue ?? value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };
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
        className={`min-w-0 overflow-auto rounded-lg bg-[#0d1117] p-4 pr-20 font-mono text-[11px] leading-relaxed text-gray-300 ${expanded ? "max-h-[620px]" : "max-h-[220px] overflow-hidden"}`}
      >
        {html ? (
          <div
            className="shiki-wrapper min-w-max [&_pre]:!m-0 [&_pre]:!bg-transparent [&_pre]:!p-0"
            dangerouslySetInnerHTML={{ __html: value }}
          />
        ) : (
          <pre className="m-0 min-w-max">{value}</pre>
        )}
      </div>
      {expandable && (
        <button
          type="button"
          onClick={() => setExpanded((current) => !current)}
          className="mt-2 text-[11px] text-fg-muted hover:text-fg"
        >
          {expanded ? "Collapse source" : "Show full source"}
        </button>
      )}
    </div>
  );
}
