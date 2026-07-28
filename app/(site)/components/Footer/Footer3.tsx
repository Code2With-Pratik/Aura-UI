export default function Footer3() {
  return (
    <div className="w-full overflow-hidden rounded-[20px] border border-[var(--color-border-default)] bg-gradient-to-br from-white/80 to-[var(--color-bg)] p-3 shadow-sm backdrop-blur dark:from-white/10 dark:to-transparent">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold text-fg">Aura</span>
        <div className="flex gap-1.5">
          <span className="rounded-full border border-[var(--color-border-default)] px-2 py-0.5 text-[9px] text-fg/70">
            X
          </span>
          <span className="rounded-full border border-[var(--color-border-default)] px-2 py-0.5 text-[9px] text-fg/70">
            IG
          </span>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-[9px] text-fg/60">
        <span>Launches</span>
        <span>Newsletter</span>
        <span>Support</span>
      </div>
    </div>
  );
}
