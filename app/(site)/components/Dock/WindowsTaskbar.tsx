import { Bell, FileText, Folder, Globe, Search, Settings, Wifi } from "lucide-react";

const apps = [
  ["File Explorer", Folder],
  ["Browser", Globe],
  ["Documents", FileText],
  ["Settings", Settings],
] as const;

export default function WindowsTaskbar() {
  return (
    <div className="flex min-w-0 w-full items-end justify-center px-3 py-8 sm:px-6 sm:py-12">
      <div className="flex min-w-0 max-w-full items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-2 py-2 shadow-[0_16px_45px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:gap-3 sm:px-3">
        <button type="button" aria-label="Open launcher" className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[var(--color-accent-primary)] text-[var(--color-bg)] transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"><span className="grid grid-cols-2 gap-0.5">{Array.from({ length: 4 }, (_, index) => <span key={index} className="h-1.5 w-1.5 rounded-[1px] bg-current" />)}</span></button>
        <div aria-hidden="true" className="hidden min-w-0 items-center gap-2 rounded-xl border border-white/15 bg-black/15 px-3 py-2 text-[10px] text-white/60 sm:flex sm:w-[150px] lg:w-[190px]"><Search className="h-3.5 w-3.5 shrink-0" /><span>Search</span><span className="ml-auto rounded border border-white/15 px-1 text-[8px]">⌘K</span></div>
        <div className="flex min-w-0 items-center gap-1 sm:gap-2" aria-label="Pinned applications">
          {apps.map(([label, Icon], index) => <button type="button" key={label} aria-label={label} className={`relative grid h-9 w-9 shrink-0 place-items-center rounded-xl text-white/80 transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] ${index === 1 ? "after:absolute after:bottom-[-5px] after:h-0.5 after:w-4 after:rounded-full after:bg-[var(--color-accent-primary)]" : ""}`}><Icon className="h-4 w-4 sm:h-5 sm:w-5" /></button>)}
        </div>
        <div className="ml-auto hidden items-center gap-2 border-l border-white/15 pl-3 text-white/65 sm:flex"><Wifi className="h-3.5 w-3.5" /><Bell className="h-3.5 w-3.5" /><span className="text-[10px] tabular-nums">10:42 AM</span></div>
      </div>
    </div>
  );
}
