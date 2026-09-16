import { Compass, Folder, Globe, MessageCircle, Music, Search } from "lucide-react";

const apps = [
  ["Finder", Folder, "bg-[#6da9e8] text-white"],
  ["Browser", Globe, "bg-[#f4f5f8] text-[#2563eb]"],
  ["Messages", MessageCircle, "bg-[#46c96b] text-white"],
  ["Music", Music, "bg-[#f05b8b] text-white"],
  ["Compass", Compass, "bg-[#f3c55c] text-[#11213b]"],
  ["Search", Search, "bg-[#dce6f7] text-[#355176]"],
] as const;

export default function MacDock() {
  return (
    <div className="flex min-w-0 w-full items-end justify-center px-3 py-10 sm:px-8 sm:py-14">
      <div className="flex max-w-full items-end gap-1.5 overflow-visible rounded-[22px] border border-white/20 bg-white/15 px-2.5 py-2.5 shadow-[0_18px_50px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:gap-2 sm:rounded-[26px] sm:px-3 sm:py-3">
        {apps.map(([label, Icon, color], index) => (
          <div key={label} className="group relative flex flex-col items-center">
            <span role="tooltip" className="pointer-events-none absolute bottom-full mb-3 whitespace-nowrap rounded-md bg-black/75 px-2 py-1 text-[9px] font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">{label}</span>
            <button type="button" aria-label={label} className={`grid h-10 w-10 shrink-0 place-items-center rounded-[11px] shadow-md transition duration-300 ease-out hover:-translate-y-3 hover:scale-[1.35] focus-visible:-translate-y-3 focus-visible:scale-[1.35] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] sm:h-12 sm:w-12 sm:rounded-[14px] ${color}`}>
              <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={index === 0 ? 1.7 : 2} />
            </button>
            {index === 1 && <span className="mt-2 h-1 w-1 rounded-full bg-white/80" aria-label="Active application" />}
          </div>
        ))}
      </div>
    </div>
  );
}
