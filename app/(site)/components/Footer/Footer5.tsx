export default function Footer5() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-bg)] p-3 text-[10px] shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: "var(--color-accent-secondary)" }}
          />
          <span className="font-semibold text-fg">Luma</span>
        </div>
        <div className="text-fg/60">Fast • Clear • Lovely</div>
      </div>
      <div className="mt-3 flex justify-between border-t border-[var(--color-border-default)] pt-2 text-[9px] text-fg/60">
        <span>Features</span>
        <span>Customers</span>
        <span>Careers</span>
      </div>
    </div>
  );
}
