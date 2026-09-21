"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Copy, Terminal } from "lucide-react";
import CategoryNav from "./CategoryNav";
import MockupPreview from "../MockUp/MockupPreview";
import PageTransitionPreview from "../PageTransition/PageTransitionPreview";

export default function ComponentGallery({
  kind,
  code,
  highlightedCode,
  highlightedSnippet,
}: {
  kind: "mockup" | "page-transition";
  code: string;
  highlightedCode: string;
  highlightedSnippet: string;
}) {
  const isMockup = kind === "mockup";
  const title = isMockup ? "Mockup" : "Page Transition";
  const slug = isMockup ? "MockUp" : "PageTransition";
  const install = isMockup
    ? "npx aura-ui add mockup"
    : "npx aura-ui add page-transition";
  const Preview = isMockup ? MockupPreview : PageTransitionPreview;
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
          {title}
        </h1>
        <p className="mx-auto mt-5 max-w-[540px] text-[15px] leading-relaxed text-fg/70">
          A production-ready {title.toLowerCase()} pattern with live interaction
          and complete source.
        </p>
      </header>
      <section className="aura-tile p-3 md:p-4">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-fg-muted">
          Live preview
        </p>
        <div className="grid min-h-[280px] place-items-center rounded-lg bg-black/5 p-5 dark:bg-black/40">
          <Preview />
        </div>
      </section>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Panel label="Installation" icon={<Terminal className="h-3.5 w-3.5" />}>
          <CodeBlock value={install} />
        </Panel>
        <Panel label="Snippet">
          <CodeBlock value={highlightedSnippet} html />
        </Panel>
      </div>
      <div className="mt-5">
        <Panel label="Full code">
          <CodeBlock value={highlightedCode} copyValue={code} html expandable />
        </Panel>
      </div>
      <CategoryNav slug={slug} />
    </main>
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
