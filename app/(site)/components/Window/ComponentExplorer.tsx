"use client";

import { useEffect, useState, type ComponentType, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button1 from "../Buttons/Button1";
import Button2 from "../Buttons/Button2";
import Button3 from "../Buttons/Button3";
import Button4 from "../Buttons/Button4";
import Button5 from "../Buttons/Button5";
import Button6 from "../Buttons/Button6";
import Button7 from "../Buttons/Button7";
import Button8 from "../Buttons/Button8";
import Button9 from "../Buttons/Button9";
import Input2 from "../Input/Input2";
import Input3 from "../Input/Input3";
import Input4 from "../Input/Input4";
import Input5 from "../Input/Input5";
import Input6 from "../Input/Input6";
import Input7 from "../Input/Input7";
import Input1 from "../Input/Input1";
import Input8 from "../Input/Input8";
import Input9 from "../Input/Input9";
import Card2 from "../Cards/Card2";
import Card3 from "../Cards/Card3";
import Card4 from "../Cards/Card4";
import Card5 from "../Cards/Card5";
import Card6 from "../Cards/Card6";
import Card7 from "../Cards/Card7";
import Loader1 from "../Loaders/Loader1";
import Loader2 from "../Loaders/Loader2";
import Loader3 from "../Loaders/Loader3";
import Loader4 from "../Loaders/Loader4";
import Loader5 from "../Loaders/Loader5";
import Loader6 from "../Loaders/Loader6";
import Badge1 from "../Badges/Badge1";
import Badge2 from "../Badges/Badge2";
import Badge3 from "../Badges/Badge3";
import Badge4 from "../Badges/Badge4";
import Badge5 from "../Badges/Badge5";
import Avatar1 from "../AvatarStack/Avatar1";
import Avatar2 from "../AvatarStack/Avatar2";
import Avatar3 from "../AvatarStack/Avatar3";
import Avatar4 from "../AvatarStack/Avatar4";
import Avatar5 from "../AvatarStack/Avatar5";
import Avatar6 from "../AvatarStack/Avatar6";
import Table1 from "../Tables/Table1";
import MacDock from "../Dock/MacDock";
import WindowsTaskbar from "../Dock/WindowsTaskbar";
import MacBookMockup from "../MockUp/MacBookMockup";

type Renderer = (compact: boolean) => ReactNode;
type ExplorerItem = { label: string; renderers: Renderer[] };
const variants = (...components: Array<ComponentType>) => components.map((Component) => () => <Component />);
const items: ExplorerItem[] = [
  { label: "Button", renderers: variants(Button1) },
  { label: "Input", renderers: variants(Input1) },
  { label: "Card", renderers: variants(Card2) },
  { label: "Loader", renderers: variants(Loader1) },
  { label: "Badge", renderers: variants(Badge1) },
  { label: "Avatar Stack", renderers: variants(Avatar1) },
  { label: "Table", renderers: [() => <Table1 />] },
  { label: "macOS Dock", renderers: [(compact) => <MacDock compact={compact} />] },
  { label: "Mockup", renderers: [() => <MacBookMockup />] },
  { label: "Windows Taskbar", renderers: [(compact) => <WindowsTaskbar compact={compact} />] },
];

export default function ComponentExplorer({ compact = false, includeWindowsTaskbar = true, autoCycle = false }: { compact?: boolean; includeWindowsTaskbar?: boolean; autoCycle?: boolean }) {
  const [active, setActive] = useState("Button");
  const [isHovered, setIsHovered] = useState(false);
  const visibleItems = includeWindowsTaskbar ? items : items.filter((item) => item.label !== "Windows Taskbar");
  const current = visibleItems.find((item) => item.label === active) ?? visibleItems[0];
  const isWindowsTaskbar = active === "Windows Taskbar";
  useEffect(() => {
    if (!autoCycle || isHovered || visibleItems.length < 2) return;
    const interval = window.setInterval(() => {
      setActive((currentActive) => {
        const currentIndex = visibleItems.findIndex((item) => item.label === currentActive);
        return visibleItems[(currentIndex + 1) % visibleItems.length].label;
      });
    }, 3000);
    return () => window.clearInterval(interval);
  }, [autoCycle, includeWindowsTaskbar, isHovered, visibleItems.length]);
  return <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={`window-explorer flex min-h-0 w-full overflow-hidden ${compact ? "text-[0.9em]" : ""}`}>
    <aside className="w-[150px] shrink-0 border-r border-[var(--explorer-border)] bg-[var(--explorer-sidebar)] px-3 py-5"><p className="mb-4 px-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--explorer-muted)]">Components</p><nav className="space-y-1" aria-label="Component previews">{visibleItems.map((item) => { const selected = active === item.label; return <motion.button key={item.label} type="button" onClick={() => setActive(item.label)} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 520, damping: 34 }} className={`relative flex w-full items-center overflow-hidden rounded-md px-2.5 py-2 text-left text-[11px] transition-colors ${selected ? "text-[var(--explorer-fg)]" : "text-[var(--explorer-muted)] hover:bg-[var(--explorer-hover)] hover:text-[var(--explorer-fg)]"}`}>{selected && <motion.span layoutId="explorer-active" transition={{ type: "spring", stiffness: 420, damping: 32 }} className="absolute inset-0 rounded-md bg-[var(--explorer-hover)] ring-1 ring-[var(--explorer-border)]" />}<span className="relative z-10">{item.label}</span></motion.button>; })}</nav></aside>
    <section className={`min-w-0 flex flex-1 flex-col overflow-y-auto p-5 md:p-7 ${isWindowsTaskbar ? "pt-3 md:pt-4" : ""}`}>{isWindowsTaskbar ? <div className="mb-5"><h2 className="text-base font-medium text-[var(--explorer-fg)]">Live component preview</h2></div> : <div className="mb-5"><p className="font-mono text-[10px] lowercase tracking-[0.18em] text-[var(--explorer-muted)]">{active}</p><h2 className="mt-1 text-base font-medium text-[var(--explorer-fg)]">Live component preview</h2></div>}<div className="flex min-h-[360px] flex-1 items-center justify-center overflow-hidden rounded-xl border border-[var(--explorer-border)] bg-[var(--explorer-card)] p-6"><AnimatePresence mode="wait" initial={false}><motion.div key={active} initial={{ opacity: 0, y: 12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 1.01 }} transition={{ duration: 0.45, ease: "easeInOut" }} className={`flex h-full min-h-0 max-h-full w-full overflow-hidden ${isWindowsTaskbar ? "items-end justify-center" : "items-center justify-center"} ${active === "Loader" ? "window-loader-preview" : ""} ${active === "Card" ? "window-card-preview" : ""}`}>{current.renderers[0](compact)}</motion.div></AnimatePresence></div></section>
  </div>;
}
