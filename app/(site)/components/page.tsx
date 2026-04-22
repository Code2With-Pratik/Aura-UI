import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Components — Aura UI",
  description: "Every primitive that ships with Aura UI today.",
};

const groups = [
  {
    name: "Inputs",
    items: [
      { name: "Button", desc: "Primary / secondary / ghost variants", accent: "primary" },
      { name: "Input", desc: "Text, search, with leading/trailing icons", accent: "secondary" },
      { name: "Select", desc: "Native + custom dropdown", accent: "tertiary" },
      { name: "Toggle", desc: "Animated switch with tactile snap", accent: "primary" },
      { name: "Checkbox", desc: "Lime check on dark surface", accent: "primary" },
    ],
  },
  {
    name: "Display",
    items: [
      { name: "Card", desc: "Surface + subtle border + hover-lift", accent: "secondary" },
      { name: "Badge", desc: "Pill in any of three accents", accent: "tertiary" },
      { name: "Table", desc: "Dense, ruled, with header sort", accent: "primary" },
      { name: "Avatar Stack", desc: "Overlapping circles with overflow chip", accent: "secondary" },
      { name: "Progress", desc: "Animated linear bar with gradient", accent: "secondary" },
    ],
  },
  {
    name: "Overlays",
    items: [
      { name: "Spotlight", desc: "⌘K command palette with keyboard nav", accent: "primary" },
      { name: "Toast", desc: "Anchored stack with auto-dismiss", accent: "tertiary" },
      { name: "Tooltip", desc: "Floating label, glass surface", accent: "secondary" },
      { name: "Window", desc: "macOS chrome with traffic lights + genie", accent: "primary" },
    ],
  },
];

export default function ComponentsPage() {
  return (
    <main className="relative mx-auto w-full max-w-[1240px] px-6 py-20 md:py-28">
      <header className="mb-16 max-w-2xl">
        <p className="eyebrow mb-3">The library</p>
        <h1 className="display-clamp text-balance text-fg">
          Components,{" "}
          <span className="not-italic font-sans font-light text-[var(--color-accent-primary)]">
            ready to drop in.
          </span>
        </h1>
        <p className="mt-6 text-pretty text-base leading-relaxed text-fg/60">
          A small, opinionated set of primitives — every one styled with the same tokens, animated on the same easing curve.
        </p>
      </header>

      <div className="space-y-16">
        {groups.map((g) => (
          <section key={g.name}>
            <div className="mb-6 flex items-end justify-between border-b border-[var(--color-border-default)] pb-3">
              <h2 className="font-display text-2xl italic text-fg">{g.name}</h2>
              <span className="font-mono text-xs text-fg/40">
                {g.items.length} {g.items.length === 1 ? "component" : "components"}
              </span>
            </div>

            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((item) => (
                <li
                  key={item.name}
                  className="aura-card group relative overflow-hidden p-5"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px"
                    style={{
                      background: `linear-gradient(90deg, transparent, var(--color-accent-${item.accent}), transparent)`,
                      opacity: 0.4,
                    }}
                  />
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-[15px] font-medium text-fg">{item.name}</h3>
                      <p className="mt-1 text-[13px] leading-relaxed text-fg/55">
                        {item.desc}
                      </p>
                    </div>
                    <span
                      className="h-2 w-2 shrink-0 rounded-full transition-transform duration-300 group-hover:scale-150"
                      style={{
                        backgroundColor: `var(--color-accent-${item.accent})`,
                        boxShadow: `0 0 14px var(--color-accent-${item.accent})`,
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
