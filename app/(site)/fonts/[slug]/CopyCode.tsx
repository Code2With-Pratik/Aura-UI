"use client";
import { useState } from "react";
export default function CopyCode({ code }: { code: string }) { const [copied, setCopied] = useState(false); return <button className="w-full text-left" onClick={async () => { try { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1400); } catch {} }}><pre className="overflow-auto rounded-lg bg-black/30 p-4 text-xs leading-relaxed text-fg/65">{copied ? "Copied!" : code}</pre></button>; }
