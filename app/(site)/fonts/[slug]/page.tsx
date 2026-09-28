import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Download, ArrowLeft, Copy } from "lucide-react";
import { fontBySlug, fontRegistry } from "@/lib/fonts/registry";
import CopyCode from "./CopyCode";

export function generateStaticParams() { return fontRegistry.map((font) => ({ slug: font.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const font = fontBySlug((await params).slug); if (!font) return {}; return { title: `${font.name} — Aura UI Fonts`, description: `${font.name} font family: ${font.weights.join(", ")} weights, available from Aura UI.`, alternates: { canonical: `/fonts/${font.slug}` } }; }

export default async function FontDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const font = fontBySlug((await params).slug); if (!font) notFound();
  const cssUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://aura-ui-os.vercel.app"}${font.cssUrl}`;
  const css = `@import url("${cssUrl}");\n\nbody { font-family: "${font.name}", sans-serif; }`;
  const html = `<link rel="stylesheet" href="${cssUrl}" />`;
  return <main className="mx-auto w-full max-w-[1120px] px-6 pb-28 pt-12"><Link href="/fonts" className="mb-12 inline-flex items-center gap-2 text-sm text-fg/50 hover:text-fg"><ArrowLeft className="h-4 w-4" /> All fonts</Link><header className="mb-12"><p className="eyebrow mb-3">{font.category} · {font.weights.length} weights</p><h1 className="display-clamp text-6xl" style={{ fontFamily: `"${font.name}"` }}>{font.name}</h1><p className="mt-5 max-w-2xl text-fg/60">Preview, install, and download the {font.name} family from the Aura UI font registry.</p></header><section className="aura-tile mb-10 p-8"><p className="text-5xl leading-tight" style={{ fontFamily: `"${font.name}"` }}>Aa Bb Cc — 0123456789</p><p className="mt-8 text-2xl leading-relaxed" style={{ fontFamily: `"${font.name}"` }}>The quick brown fox jumps over the lazy dog. A type family for expressive interfaces and thoughtful systems.</p></section><section className="grid gap-6 md:grid-cols-2"><InstallCard title="HTML link" code={html} /><InstallCard title="CSS @import" code={css} /><InstallCard title="CSS @font-face" code={`@font-face {\n  font-family: "${font.name}";\n  src: url("${process.env.NEXT_PUBLIC_SITE_URL || "https://aura-ui-os.vercel.app"}${font.files[0]?.url}") format("woff2");\n  font-weight: ${font.files[0]?.weight || 400};\n  font-style: ${font.files[0]?.style || "normal"};\n}`} /><InstallCard title="Download" code={font.files.map((file) => file.url).join("\n")} downloadUrl={font.files[0]?.url} /></section></main>;
}

function InstallCard({ title, code, downloadUrl }: { title: string; code: string; downloadUrl?: string }) { return <div className="aura-tile p-5"><div className="mb-4 flex items-center justify-between"><h2 className="font-medium">{title}</h2>{downloadUrl ? <a href={downloadUrl} download className="flex items-center gap-2 text-sm text-fg/50 hover:text-fg"><Download className="h-4 w-4" /> WOFF2</a> : <Copy className="h-4 w-4 text-fg/30" />}</div><CopyCode code={code} /></div>; }
