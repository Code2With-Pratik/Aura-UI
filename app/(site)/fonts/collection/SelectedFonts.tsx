"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Check, Copy, Download, ExternalLink, Trash2 } from "lucide-react";
import { fontRegistry } from "@/lib/fonts/registry";
import { useMemo, useState } from "react";

const origin = process.env.NEXT_PUBLIC_SITE_URL || "https://aura-ui-os.vercel.app";

export default function SelectedFonts() {
  const params = useSearchParams();
  const router = useRouter();
  const selectedIds = useMemo(() => (params.get("fonts") || "").split(",").filter(Boolean), [params]);
  const selected = useMemo(() => {
    return fontRegistry.filter((font) => selectedIds.includes(font.id));
  }, [selectedIds]);
  const removeFont = (id: string) => {
    const remaining = selectedIds.filter((selectedId) => selectedId !== id);
    localStorage.setItem("aura-selected-fonts", JSON.stringify(remaining));
    router.replace(`/fonts/collection?fonts=${remaining.join(",")}`);
  };
  const html = selected.map((font) => `<link rel="stylesheet" href="${origin}${font.cssUrl}" />`).join("\n");
  const css = selected.map((font) => `@import url("${origin}${font.cssUrl}");`).join("\n") + (selected.length ? `\n\nbody { font-family: ${selected.map((font) => `"${font.name}"`).join(", ")}, sans-serif; }` : "");

  return <main className="mx-auto w-full max-w-[1120px] px-6 pb-28 pt-12">
    <Link href="/fonts" className="mb-12 inline-flex items-center gap-2 text-sm text-fg/50 hover:text-fg"><ArrowLeft className="h-4 w-4" /> All fonts</Link>
    <header className="mb-12"><p className="eyebrow mb-3">Font collection</p><h1 className="display-clamp text-6xl">Your selected fonts</h1><p className="mt-5 max-w-2xl text-fg/60">Install your selected font families from one place. Every name, CDN link, weight, style, and download is grouped in the panel below.</p></header>
    {selected.length === 0 ? <div className="aura-tile p-8"><p className="text-fg/70">No fonts selected yet.</p><Link href="/fonts" className="mt-5 inline-flex rounded-lg bg-[var(--color-accent-primary)] px-4 py-2 text-sm text-black">Choose fonts</Link></div> : <section className="aura-tile overflow-hidden"><div className="border-b border-fg/15 px-6 py-5 md:px-8"><div className="flex items-center justify-between"><div><p className="eyebrow">Selected families</p><h2 className="mt-1 text-xl">{selected.length} font{selected.length === 1 ? "" : "s"} ready to install</h2></div><span className="rounded-full border border-[var(--color-accent-primary)]/50 px-3 py-1 text-xs text-[var(--color-accent-primary)]">Aura UI CDN</span></div></div><div className="divide-y divide-fg/10">{selected.map((font) => <FontRow key={font.id} font={font} onRemove={() => removeFont(font.id)} />)}</div><div className="border-t border-fg/15 px-6 py-6 md:px-8"><p className="eyebrow mb-4">Install all selected fonts</p><div className="grid gap-4 md:grid-cols-2"><CodeBlock title="HTML links" code={html} /><CodeBlock title="CSS imports" code={css} /></div></div></section>}
  </main>;
}

function FontRow({ font, onRemove }: { font: (typeof fontRegistry)[number]; onRemove: () => void }) {
  return <div className="px-6 py-5 md:px-8"><div className="flex flex-wrap items-center justify-between gap-4"><div className="flex min-w-0 items-center gap-4"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-fg/15 text-lg text-[var(--color-accent-primary)]" style={{ fontFamily: `"${font.name}"` }}>Aa</div><div className="min-w-0"><a href={`/fonts/${font.slug}`} className="flex items-center gap-2 text-xl hover:text-[var(--color-accent-primary)]">{font.name}<ExternalLink className="h-3.5 w-3.5 text-fg/35" /></a><p className="truncate text-sm text-fg/50">{font.category} · {font.weights.join(", ")} · {font.styles.join(", ")}</p></div></div><div className="flex items-center gap-2"><a href={`${origin}${font.cssUrl}`} target="_blank" rel="noreferrer" className="rounded-md border border-fg/20 px-3 py-1.5 text-xs text-fg/65 hover:border-[var(--color-accent-primary)] hover:text-fg">CDN CSS</a><a href={font.files[0]?.url} download className="flex items-center gap-2 rounded-md border border-fg/20 px-3 py-1.5 text-xs text-fg/65 hover:border-[var(--color-accent-primary)] hover:text-fg"><Download className="h-3.5 w-3.5" /> WOFF2</a><button type="button" onClick={onRemove} aria-label={`Remove ${font.name} from selected fonts`} className="flex items-center gap-2 rounded-md border border-red-400/30 px-3 py-1.5 text-xs text-red-300/80 hover:border-red-300 hover:text-red-200"><Trash2 className="h-3.5 w-3.5" /> Remove</button></div></div><div className="mt-4 flex flex-wrap gap-2">{font.files.map((file) => <a key={file.url} href={file.url} download className="rounded-md bg-fg/5 px-2.5 py-1 text-xs text-fg/55 hover:bg-fg/10 hover:text-fg">{file.file.split("/").pop()}</a>)}</div></div>;
}

function CodeBlock({ title, code }: { title: string; code: string }) {
  const [copied, setCopied] = useState(false);
  return <div><div className="mb-2 flex items-center justify-between"><p className="text-xs uppercase tracking-widest text-fg/40">{title}</p><button aria-label={`Copy ${title} snippet`} onClick={async () => { try { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1400); } catch {} }} className="flex items-center gap-1 text-xs text-fg/40 hover:text-fg">{copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}{copied ? "Copied" : "Copy"}</button></div><pre className="min-h-24 overflow-auto rounded-lg bg-black/30 p-4 text-xs leading-relaxed text-fg/65"><code>{code.split("\n").map((line, index) => <span key={`${index}-${line}`} className="block">{highlightLine(line, title)}{index < code.split("\n").length - 1 ? "\n" : ""}</span>)}</code></pre></div>;
}

function highlightLine(line: string, title: string) {
  const tokens = line.split(/("[^"]*"|<\/?[a-z]+>|\b(?:href|rel|stylesheet|font-family|body|url|import)\b|@[a-z-]+)/gi);
  return tokens.map((token, index) => {
    if (/^"/.test(token)) return <span key={index} className="text-[var(--color-accent-primary)]">{token}</span>;
    if (/^<\/?[a-z]+>$/i.test(token)) return <span key={index} className="text-[#ff9f7a]">{token}</span>;
    if (/^(href|rel|stylesheet)$/i.test(token)) return <span key={index} className="text-[#79c7ff]">{token}</span>;
    if (/^(font-family|body|url|import)$/i.test(token) || (title === "CSS imports" && /^@/.test(token))) return <span key={index} className="text-[#d5a8ff]">{token}</span>;
    return <span key={index}>{token}</span>;
  });
}
