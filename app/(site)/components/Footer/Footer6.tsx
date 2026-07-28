export default function Footer6() {
  return (
    <div className="w-full overflow-hidden rounded-[28px] border border-[var(--color-border-default)] bg-[var(--color-bg)] p-3 shadow-sm">
      <div className="flex items-center justify-between text-[10px] text-fg/70">
        <span className="font-semibold text-fg">Launchpad</span>
        <span>Made with care</span>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-[8px] text-fg/60">
        <span className="rounded-full border border-[var(--color-border-default)] px-2 py-1 text-center">Home</span>
        <span className="rounded-full border border-[var(--color-border-default)] px-2 py-1 text-center">Docs</span>
        <span className="rounded-full border border-[var(--color-border-default)] px-2 py-1 text-center">GitHub</span>
      </div>
      <div className="mt-3 border-t border-[var(--color-border-default)] pt-2 text-[9px] text-fg/50">
        © 2026 Launchpad • All rights reserved
      </div>
    </div>
  );
}
