"use client";

const updates = [
  { tag: "0.1.4", text: "Glass surfaces now respect parent saturation." },
  { tag: "0.1.3", text: "WindowMockup adds genie-effect minimize." },
  { tag: "0.1.2", text: "Bento spans expanded to 4 / 5 / 7 grid." },
  { tag: "0.1.1", text: "Hero badge gains blinking status indicator." },
  { tag: "0.1.0", text: "Aura UI lands — initial component drop." },
  { tag: "Beta", text: "Instrument Serif paired with Geist for display type." },
];

export default function Marquee() {
  // duplicated track gives a seamless -50% translate
  const track = [...updates, ...updates];
  return (
    <section
      id="updates"
      aria-label="Latest updates"
      className="relative border-y border-[var(--color-border-default)] bg-[var(--color-surface)]/60 py-5"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--color-bg)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--color-bg)] to-transparent" />

      <div className="flex overflow-hidden">
        <div
          className="flex shrink-0 items-center gap-10 whitespace-nowrap pr-10"
          style={{ animation: "var(--animate-marquee)" }}
        >
          {track.map((u, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3 text-sm text-fg/70"
            >
              <span className="aura-border rounded-full bg-fg/[0.03] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[var(--color-accent-primary)]">
                {u.tag}
              </span>
              <span>{u.text}</span>
              <span className="text-fg/15">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
