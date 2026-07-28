export default function Footer1() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-bg)] p-3 text-[10px] shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: "var(--color-accent-primary)" }}
          />
          <span className="font-semibold text-fg">Aura UI</span>
        </div>
        <div className="flex gap-2 text-fg/60">
          <span>Docs</span>
          <span>About</span>
          <span>Contact</span>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-[var(--color-border-default)] pt-2 text-[9px] text-fg/50">
        <span>© 2026 Aura UI</span>
        <span>Built for modern products</span>
      </div>
    </div>
  );
}
