export default function Footer2() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-bg)] p-3 text-[10px] shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-fg">Studio</p>
          <p className="mt-1 text-fg/60">Design systems for fast-moving teams.</p>
        </div>
        <div className="flex flex-col gap-1 text-fg/60">
          <span>Work</span>
          <span>Journal</span>
          <span>Hire</span>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-[var(--color-border-default)] pt-2 text-[9px] text-fg/50">
        <span>Privacy</span>
        <span>Terms</span>
      </div>
    </div>
  );
}
