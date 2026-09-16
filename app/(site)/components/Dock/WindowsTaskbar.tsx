"use client";

import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Bell, Bluetooth, FileText, Folder, Globe, Search, Settings, Volume2, Wifi, X } from "lucide-react";

const apps = [["File Explorer", Folder], ["Browser", Globe], ["Documents", FileText], ["Settings", Settings]] as const;
type Panel = "launcher" | "search" | "quick" | null;
type PanelName = Exclude<Panel, null>;

export default function WindowsTaskbar() {
  const [panel, setPanel] = useState<Panel>(null);
  const [query, setQuery] = useState("");
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(true);
  const [volume, setVolume] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();

  function togglePanel(nextPanel: PanelName, trigger: HTMLButtonElement) {
    if (panel === nextPanel) {
      closePanel();
      return;
    }
    triggerRef.current = trigger;
    setPanel(nextPanel);
  }

  function closePanel() {
    const trigger = triggerRef.current;
    setPanel(null);
    window.requestAnimationFrame(() => trigger?.focus());
  }

  function focusActivePanel() {
    if (!panel) return;
    if (panel === "search") {
      searchRef.current?.focus();
      return;
    }
    const panelId = panel === "launcher" ? "windows-launcher" : "windows-quick-settings";
    if (panelRef.current?.id === panelId) panelRef.current.focus();
  }

  useEffect(() => {
    if (!panel) return;
    const frame = window.requestAnimationFrame(focusActivePanel);
    function closeOnEscape(event: KeyboardEvent) { if (event.key === "Escape") closePanel(); }
    function closeOnOutside(event: PointerEvent) { if (rootRef.current && !rootRef.current.contains(event.target as Node)) closePanel(); }
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOnOutside);
    return () => { window.cancelAnimationFrame(frame); document.removeEventListener("keydown", closeOnEscape); document.removeEventListener("pointerdown", closeOnOutside); };
  }, [panel]);

  return (
    <div ref={rootRef} className="relative flex min-w-0 w-full flex-col items-center gap-3 px-3 py-8 sm:px-6 sm:py-12">
      <AnimatePresence initial={false} mode="wait">
        {panel && <motion.div key={panel} initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scaleY: 0.82 }} animate={{ opacity: 1, scaleY: 1 }} exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scaleY: 0.82 }} onAnimationComplete={focusActivePanel} transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 30 }} style={{ transformOrigin: "bottom center" }} className={`flex w-full min-w-0 ${panel === "quick" ? "justify-end" : "justify-center"}`}>
          <TaskbarPanel panel={panel} panelRef={panelRef} query={query} setQuery={setQuery} searchRef={searchRef} close={closePanel} wifi={wifi} bluetooth={bluetooth} volume={volume} notifications={notifications} setWifi={setWifi} setBluetooth={setBluetooth} setVolume={setVolume} setNotifications={setNotifications} />
        </motion.div>}
      </AnimatePresence>
      <div className="flex w-max min-w-0 max-w-full items-center gap-3 overflow-x-auto rounded-2xl border border-white/15 bg-white/10 px-2 py-2 shadow-[0_16px_45px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:gap-4 sm:px-3">
        <button type="button" aria-label="Open launcher" aria-expanded={panel === "launcher"} aria-controls="windows-launcher" onClick={(event) => togglePanel("launcher", event.currentTarget)} className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[var(--color-accent-primary)] text-[var(--color-bg)] transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"><span className="grid grid-cols-2 gap-0.5">{Array.from({ length: 4 }, (_, index) => <span key={index} className="h-1.5 w-1.5 rounded-[1px] bg-current" />)}</span></button>
        <button type="button" aria-label="Search" aria-expanded={panel === "search"} aria-controls="windows-search" onClick={(event) => togglePanel("search", event.currentTarget)} className="flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-xl border border-white/15 bg-black/15 text-[10px] text-white/60 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] sm:w-[150px] sm:justify-start sm:px-3"><Search className="h-3.5 w-3.5 shrink-0" /><span className="hidden sm:inline">Search</span><span className="ml-auto hidden rounded border border-white/15 px-1 text-[8px] sm:inline">⌘K</span></button>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3" aria-label="Pinned applications">{apps.map(([label, Icon], index) => <button type="button" key={label} aria-label={label} className={`relative grid h-9 w-9 shrink-0 place-items-center rounded-xl text-white/80 transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] ${index === 1 ? "after:absolute after:bottom-[-5px] after:h-0.5 after:w-4 after:rounded-full after:bg-[var(--color-accent-primary)]" : ""}`}><Icon className="h-4 w-4 sm:h-5 sm:w-5" /></button>)}</div>
        <div className="ml-auto hidden shrink-0 items-center gap-2 border-l border-white/15 pl-3 sm:flex"><TrayButton label="Wi-Fi" active={wifi} expanded={panel === "quick"} controls="windows-quick-settings" icon={<Wifi className="h-3.5 w-3.5" />} onClick={(event) => togglePanel("quick", event.currentTarget)} /><TrayButton label="Bluetooth" active={bluetooth} expanded={panel === "quick"} controls="windows-quick-settings" icon={<Bluetooth className="h-3.5 w-3.5" />} onClick={(event) => togglePanel("quick", event.currentTarget)} /><TrayButton label="Volume" active={volume} expanded={panel === "quick"} controls="windows-quick-settings" icon={<Volume2 className="h-3.5 w-3.5" />} onClick={(event) => togglePanel("quick", event.currentTarget)} /><TrayButton label="Notifications" active={notifications} expanded={panel === "quick"} controls="windows-quick-settings" icon={<Bell className="h-3.5 w-3.5" />} onClick={(event) => togglePanel("quick", event.currentTarget)} /><span className="ml-1 text-[10px] tabular-nums text-white/65">10:42 AM</span></div>
      </div>
    </div>
  );
}

function TrayButton({ label, active, expanded, controls, icon, onClick }: { label: string; active: boolean; expanded: boolean; controls: string; icon: ReactNode; onClick: (event: React.MouseEvent<HTMLButtonElement>) => void }) { return <button type="button" aria-label={`${label}: ${active ? "on" : "off"}`} aria-expanded={expanded} aria-controls={controls} onClick={onClick} className={`rounded-md p-1.5 transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] ${active ? "text-white/75" : "text-white/30"}`}>{icon}</button>; }

function TaskbarPanel({ panel, panelRef, query, setQuery, searchRef, close, wifi, bluetooth, volume, notifications, setWifi, setBluetooth, setVolume, setNotifications }: { panel: PanelName; panelRef: RefObject<HTMLDivElement | null>; query: string; setQuery: (value: string) => void; searchRef: RefObject<HTMLInputElement | null>; close: () => void; wifi: boolean; bluetooth: boolean; volume: boolean; notifications: boolean; setWifi: (value: boolean) => void; setBluetooth: (value: boolean) => void; setVolume: (value: boolean) => void; setNotifications: (value: boolean) => void }) {
  if (panel === "search") return <div ref={panelRef} id="windows-search" role="dialog" aria-label="Search" tabIndex={-1} className="relative z-20 mx-auto mb-3 w-[min(320px,calc(100%_-_1.5rem))] rounded-2xl border border-white/15 bg-[#111827]/95 p-3 text-white shadow-2xl backdrop-blur-xl"><div className="flex items-center gap-2 rounded-xl border border-white/15 bg-black/20 px-3"><Search className="h-4 w-4 text-white/45" /><input ref={searchRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search apps and files" className="min-w-0 flex-1 bg-transparent py-2.5 text-xs outline-none placeholder:text-white/40" /><button type="button" aria-label="Close search" onClick={close}><X className="h-3.5 w-3.5 text-white/50" /></button></div><p className="mt-4 text-[10px] uppercase tracking-[0.14em] text-white/45">{query ? "Results" : "Suggested"}</p><p className="mt-3 rounded-xl bg-white/5 p-3 text-xs text-white/60">{query ? `No results for “${query}”` : "Type to search apps, settings, and files."}</p></div>;
  if (panel === "launcher") return <div ref={panelRef} id="windows-launcher" role="dialog" aria-label="Application launcher" tabIndex={-1} className="relative z-20 mx-auto mb-3 w-[min(330px,calc(100%_-_1.5rem))] rounded-2xl border border-white/15 bg-[#111827]/95 p-4 text-white shadow-2xl backdrop-blur-xl"><div className="mb-4 flex items-center justify-between"><span className="text-xs font-semibold">All apps</span><button type="button" aria-label="Close launcher" onClick={close}><X className="h-4 w-4 text-white/50" /></button></div><div className="grid grid-cols-2 gap-2">{apps.map(([label, Icon]) => <button type="button" key={label} onClick={close} className="flex items-center gap-2 rounded-xl bg-white/5 p-3 text-left text-xs text-white/75 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"><Icon className="h-4 w-4 text-[var(--color-accent-primary)]" />{label}</button>)}</div></div>;
  return <div ref={panelRef} id="windows-quick-settings" role="dialog" aria-label="Quick settings" tabIndex={-1} className="relative z-20 mx-auto mb-3 self-end w-[min(300px,calc(100%_-_1.5rem))] rounded-2xl border border-white/15 bg-[#111827]/95 p-4 text-white shadow-2xl backdrop-blur-xl"><div className="mb-4 flex items-center justify-between"><span className="text-xs font-semibold">Quick settings</span><button type="button" aria-label="Close quick settings" onClick={close}><X className="h-4 w-4 text-white/50" /></button></div><div className="grid grid-cols-2 gap-2"><SettingButton label="Wi-Fi" active={wifi} icon={<Wifi />} onClick={() => setWifi(!wifi)} /><SettingButton label="Bluetooth" active={bluetooth} icon={<Bluetooth />} onClick={() => setBluetooth(!bluetooth)} /><SettingButton label="Volume" active={volume} icon={<Volume2 />} onClick={() => setVolume(!volume)} /><SettingButton label="Notifications" active={notifications} icon={<Bell />} onClick={() => setNotifications(!notifications)} /></div></div>;
}

function SettingButton({ label, active, icon, onClick }: { label: string; active: boolean; icon: ReactNode; onClick: () => void }) { return <button type="button" aria-pressed={active} onClick={onClick} className={`flex items-center gap-2 rounded-xl p-3 text-xs transition-colors ${active ? "bg-[var(--color-accent-primary)] text-[var(--color-bg)]" : "bg-white/5 text-white/45"}`}>{icon}<span>{label}</span><span className="ml-auto text-[9px]">{active ? "On" : "Off"}</span></button>; }
