export default function Footer4() {
  return (
    <div className="w-full overflow-hidden rounded-[24px] border border-[var(--color-border-default)] bg-[var(--color-bg)] p-3 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold text-fg">Join the list</p>
          <p className="text-[9px] text-fg/60">Weekly product notes</p>
        </div>
        <button className="rounded-full border border-[var(--color-border-default)] px-2.5 py-1 text-[9px] text-fg">
          Subscribe
        </button>
      </div>
      <div className="mt-3 flex gap-2 text-[9px] text-fg/60">
        <span className="rounded-full border border-[var(--color-border-default)] px-2 py-0.5">
          Home
        </span>
        <span className="rounded-full border border-[var(--color-border-default)] px-2 py-0.5">
          Pricing
        </span>
        <span className="rounded-full border border-[var(--color-border-default)] px-2 py-0.5">
          Blog
        </span>
      </div>
    </div>
  );
}
