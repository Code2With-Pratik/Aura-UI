"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";

export type DockItem = {
  id: string;
  name: string;
  icon: ReactNode;
  onClick?: () => void;
  active?: boolean;
};

const defaultItems: DockItem[] = [
  { id: "finder", name: "Finder", icon: <img src="/AppIcon/Finder.png" alt="" width={44} height={44} />, active: true },
  { id: "launchpad", name: "Launchpad", icon: <img src="/AppIcon/Launchpad.png" alt="" width={44} height={44} /> },
  { id: "app-store", name: "App Store", icon: <img src="/AppIcon/AppStore.png" alt="" width={44} height={44} /> },
  { id: "folder", name: "Folder", icon: <img src="/AppIcon/Folder.png" alt="" width={44} height={44} /> },
  { id: "calendar", name: "Calendar", icon: <img src="/AppIcon/Calendar.png" alt="" width={44} height={44} /> },
  { id: "whatsapp", name: "WhatsApp", icon: <img src="/AppIcon/WhatsApp.png" alt="" width={44} height={44} /> },
  { id: "weather", name: "Weather", icon: <img src="/AppIcon/Weather.png" alt="" width={44} height={44} /> },
  { id: "music", name: "Music", icon: <img src="/AppIcon/Music.png" alt="" width={44} height={44} /> },
  { id: "spotify", name: "Spotify", icon: <img src="/AppIcon/Sportify.png" alt="" width={44} height={44} /> },
  { id: "settings", name: "Settings", icon: <img src="/AppIcon/Setting.png" alt="" width={44} height={44} /> },
  { id: "trash", name: "Trash", icon: <img src="/AppIcon/Trash.png" alt="" width={44} height={44} /> },
];

export function Dock({ items = defaultItems }: { items?: DockItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [launchpadOpen, setLaunchpadOpen] = useState(false);
  const [launchpadQuery, setLaunchpadQuery] = useState("");
  const reducedMotion = useReducedMotion();
  const launchpadRef = useRef<HTMLDivElement>(null);
  const launchpadSearchRef = useRef<HTMLInputElement>(null);
  const launchpadTriggerRef = useRef<HTMLButtonElement>(null);
  const spring = reducedMotion ? { duration: 0 } : { type: "spring" as const, stiffness: 430, damping: 28, mass: 0.45 };

  function closeLaunchpad() {
    const trigger = launchpadTriggerRef.current;
    setLaunchpadOpen(false);
    window.requestAnimationFrame(() => trigger?.focus());
  }

  useEffect(() => {
    if (!launchpadOpen) return;
    const frame = window.requestAnimationFrame(() => launchpadSearchRef.current?.focus());
    function closeOnEscape(event: KeyboardEvent) { if (event.key === "Escape") closeLaunchpad(); }
    document.addEventListener("keydown", closeOnEscape);
    return () => { window.cancelAnimationFrame(frame); document.removeEventListener("keydown", closeOnEscape); };
  }, [launchpadOpen]);

  function handleItemClick(item: DockItem, event: MouseEvent<HTMLButtonElement>) {
    if (item.id === "launchpad") {
      launchpadTriggerRef.current = event.currentTarget;
      setLaunchpadOpen((open) => !open);
    }
    item.onClick?.();
  }

  const filteredItems = items.filter((item) => item.name.toLowerCase().includes(launchpadQuery.trim().toLowerCase()));

  return (
    <div className="relative flex min-w-0 w-full flex-col items-center overflow-visible">
      <AnimatePresence initial={false}>
        {launchpadOpen && <motion.div initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.96 }} transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 330, damping: 27 }} className="relative z-20 mb-3 w-full min-w-0 px-3 sm:px-6">
          <button type="button" aria-label="Close Launchpad" onClick={closeLaunchpad} className="absolute inset-0 z-0 cursor-default bg-black/10" />
          <div ref={launchpadRef} role="dialog" aria-modal="false" aria-label="Launchpad applications" tabIndex={-1} className="relative z-10 mx-auto max-h-[min(72vh,430px)] w-[min(100%,560px)] max-w-full overflow-y-auto rounded-[22px] border border-white/20 bg-[color-mix(in_srgb,var(--color-bg)_78%,white_22%)] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:rounded-[26px] sm:p-5">
            <div className="mb-5 flex items-center justify-between"><div><p className="text-[14px] font-semibold tracking-[-0.04em] text-fg">Launchpad</p><p className="mt-1 text-[10px] text-fg-muted">All applications</p></div><button type="button" aria-label="Close Launchpad" onClick={closeLaunchpad} className="grid h-7 w-7 place-items-center rounded-full bg-fg/8 text-fg-muted transition-colors hover:bg-fg/14 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary">×</button></div>
            <input ref={launchpadSearchRef} type="search" value={launchpadQuery} onChange={(event) => setLaunchpadQuery(event.target.value)} placeholder="Search applications" aria-label="Search applications" className="mx-auto mb-4 block h-9 w-full max-w-[320px] rounded-full border border-fg/12 bg-fg/6 px-4 text-center text-[11px] text-fg outline-none placeholder:text-fg-muted focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/30" />
            {filteredItems.length > 0 ? <div className="grid grid-cols-3 gap-3" role="list">{filteredItems.map((item) => <button type="button" key={item.id} onClick={() => { item.onClick?.(); closeLaunchpad(); }} className="group flex min-w-0 flex-col items-center gap-2 rounded-xl p-2 text-center transition-colors hover:bg-fg/6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"><span className="grid h-11 w-11 place-items-center overflow-hidden rounded-[13px] transition-transform group-hover:scale-105 sm:h-12 sm:w-12">{item.icon}</span><span className="max-w-full truncate text-[10px] text-fg/80">{item.name}</span></button>)}</div> : <p className="py-8 text-center text-[11px] text-fg-muted">No applications found</p>}
          </div>
        </motion.div>}
      </AnimatePresence>

      <div className="flex min-w-0 w-full items-end overflow-x-auto overflow-y-hidden overscroll-x-contain px-2 pb-3 pt-10 [scrollbar-width:thin] sm:px-6 sm:pt-10">
        <div aria-label="Dock" onMouseLeave={() => setActiveIndex(null)} className="mx-auto flex h-[52px] w-max max-w-none shrink-0 items-center gap-1.5 overflow-visible rounded-[20px] border border-white/20 bg-white/15 px-2 shadow-[0_18px_50px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:gap-2 sm:px-2.5">
          {items.length > 0 ? items.map((item, index) => {
            const distance = activeIndex === null ? Infinity : Math.abs(index - activeIndex);
          const scale = distance === 0 ? 1.25 : distance === 1 ? 1.07 : 1;
          const y = distance === 0 ? -7 : distance === 1 ? -2 : 0;
            const highlighted = activeIndex === index;
            const tooltipId = `dock-tooltip-${item.id}`;
            return <div key={item.id} className="relative flex h-9 w-9 flex-col items-center sm:h-9 sm:w-9">{index === 0 && <span aria-hidden="true" className="pointer-events-none absolute -right-1 top-1/2 h-6 w-px -translate-y-1/2 bg-white/20" />} {item.id === "trash" && <span aria-hidden="true" className="pointer-events-none absolute -left-1 top-1/2 h-6 w-px -translate-y-1/2 bg-white/20" />}<AnimatePresence>{highlighted && <motion.span id={tooltipId} role="tooltip" initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 3 }} transition={{ duration: reducedMotion ? 0 : 0.16 }} className="pointer-events-none absolute bottom-full mb-3 whitespace-nowrap rounded-md bg-black/75 px-2 py-1 text-[9px] font-medium text-white shadow-lg">{item.name}</motion.span>}</AnimatePresence><motion.button type="button" aria-label={item.name} aria-describedby={highlighted ? tooltipId : undefined} aria-pressed={item.active} onClick={(event) => handleItemClick(item, event)} onMouseEnter={() => setActiveIndex(index)} onFocus={() => setActiveIndex(index)} onBlur={() => setActiveIndex(null)} animate={{ scale, y }} transition={spring} whileTap={reducedMotion ? undefined : { scale: 0.94 }} className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"><span className="flex h-full w-full items-center justify-center overflow-hidden rounded-[inherit] [&>img]:h-full [&>img]:w-full [&>img]:rounded-[inherit] [&>img]:object-contain">{item.icon}</span></motion.button>{item.active && <span className="pointer-events-none absolute bottom-[-5px] left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-white/80" aria-label={`${item.name} is active`} />}</div>;
          }) : <span className="px-3 text-[10px] text-white/55">No apps</span>}
        </div>
      </div>
    </div>
  );
}

export default Dock;
