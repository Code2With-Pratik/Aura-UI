"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  Terminal,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export interface Variant {
  id: number;
  name: string;
  fileName: string;
  code: string;
  highlightedCode: string;
  highlightedSnippet: string;
}

export default function Gallery({
  variant,
}: {
  variant: Variant;
}) {
  return (
    <main className="relative mx-auto w-full max-w-[1240px] px-6 pt-6 pb-20 md:pt-10 md:pb-28">
      <Link
        href="/components"
        className="mb-8 inline-flex items-center gap-1.5 text-[13px] text-fg-muted transition-colors hover:text-fg"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> All components
      </Link>

      <header className="mb-12 flex flex-col items-center text-center">
        <p className="eyebrow mb-3">System</p>
        <h1
          className="display-clamp text-balance text-fg"
          style={{ fontSize: "clamp(2rem, 4.5vw + 0.5rem, 4.75rem)" }}
        >
          Theme Toggle
        </h1>
        <p className="mt-5 max-w-[520px] text-pretty text-[15px] leading-relaxed text-fg/70">
          A high-fidelity theme switcher with custom GIF transitions and a bento-style settings dashboard.
        </p>
      </header>

      <div className="flex flex-col gap-10">
        <div className="grid gap-4 lg:grid-cols-2">
          <Panel label="Live Preview">
            <div className="grid h-[580px] place-items-center rounded-lg bg-black/5 dark:bg-black/40 p-6 overflow-hidden">
               <div className="scale-[0.8] sm:scale-100 origin-center">
                 <ThemeToggle />
               </div>
            </div>
          </Panel>

          <Panel label="Command" icon={<Terminal className="h-3.5 w-3.5" />}>
            <CodeBlock value={"npx aura-ui add theme-toggle"} language="bash" />
            <p className="mt-3 text-[11px] text-fg-muted">
              Add the tactile theme toggle and bento dashboard to your project.
            </p>
          </Panel>
        </div>

        <Panel label="Snippet">
          <CodeBlock value={variant.highlightedSnippet} isHtml />
        </Panel>

        <Panel label="Full code">
          <CodeBlock value={variant.highlightedCode} isHtml expandable />
        </Panel>
      </div>
    </main>
  );
}

function Panel({
  label,
  children,
  icon,
}: {
  label: string;
  children: ReactNode;
  icon?: ReactNode;
}) {
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

function CodeBlock({
  value,
  language,
  isHtml,
  expandable,
}: {
  value: string;
  language?: string;
  isHtml?: boolean;
  expandable?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(!expandable);

  const onCopy = () => {
    const textToCopy = isHtml
      ? value.replace(/<[^>]*>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
      : value;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative">
      <div
        data-lenis-prevent
        className={`relative w-full overflow-x-auto rounded-lg border border-border-default transition-all duration-500 ease-aura ${
          !expanded ? "max-h-[220px] overflow-hidden" : "max-h-[800px] overflow-y-auto"
        } bg-[#0d1117] dark:bg-[#0d1117]`}
      >
        {isHtml ? (
          <div
            data-lenis-prevent
            className="shiki-wrapper p-4 md:p-5 pr-12 md:pr-20 font-mono text-[12px] md:text-[13px] leading-relaxed [&_pre]:!bg-transparent [&_pre]:!p-0 [&_pre]:!overflow-visible [&_code]:!bg-transparent"
            dangerouslySetInnerHTML={{ __html: value }}
          />
        ) : (
          <pre
            data-lenis-prevent
            className="p-4 md:p-5 pr-12 md:pr-20 font-mono text-[12px] md:text-[13px] leading-relaxed text-gray-300"
            data-lang={language}
          >
            <code data-lenis-prevent>{value}</code>
          </pre>
        )}

        {/* Gradient Mask + Expand Button */}
        {expandable && !expanded && (
          <div className="absolute inset-x-0 bottom-0 z-10 pointer-events-none flex h-24 items-end justify-center bg-gradient-to-t from-black/95 to-transparent pb-4">
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="aura-glass pointer-events-auto flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[12px] font-medium text-white shadow-2xl backdrop-blur-md transition-transform hover:scale-105"
            >
              Expand Code <ChevronUp className="h-3.5 w-3.5 rotate-180" />
            </button>
          </div>
        )}
      </div>

      <div className="absolute top-3 right-3 z-20 flex gap-2">
        {expandable && expanded && (
          <button
            onClick={() => setExpanded(false)}
            className="flex h-8 items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 text-[11px] font-medium text-white/70 backdrop-blur-sm transition-colors hover:bg-white/10 hover:text-white"
          >
            <ChevronUp className="h-3.5 w-3.5" /> Hide code
          </button>
        )}
        <button
          onClick={onCopy}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/70 backdrop-blur-sm transition-colors hover:bg-white/10 hover:text-white"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
      </div>
    </div>
  );
}
