import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CategoryNav from "./CategoryNav";
import { getNeighbours } from "./categories";

/* Placeholder gallery. Layout mirrors the real Buttons gallery so that
   when eight source files land in the category's folder the shape of
   the page does not shift. Each card is a dashed "empty slot" with a
   Coming-soon label and Variant N / file placeholder row so a future
   wire-up only swaps the inner preview. */
export default function ComingSoon({ slug }: { slug: string }) {
  const { current } = getNeighbours(slug);
  const title = current?.label ?? slug;

  return (
    <main className="relative mx-auto w-full max-w-[1240px] px-6 pt-6 pb-20 md:pt-10 md:pb-28">
      <Link
        href="/components"
        className="mb-8 inline-flex items-center gap-1.5 text-[13px] text-fg-muted transition-colors hover:text-fg"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> All components
      </Link>

      <header className="mb-12 flex flex-col items-center text-center">
        <p className="eyebrow mb-3">Category</p>
        <h1
          className="display-clamp text-balance text-fg"
          style={{ fontSize: "clamp(2rem, 4.5vw + 0.5rem, 4.75rem)" }}
        >
          {title}
        </h1>
        <p className="mt-5 max-w-[520px] text-pretty text-[15px] leading-relaxed text-fg/70">
          Eight {title.toLowerCase()} variants are on the way. Drop your source
          files into the folder and the slots below come alive.
        </p>
      </header>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <li key={i}>
            <div
              className="aura-tile relative flex h-[220px] w-full flex-col overflow-hidden p-4"
              aria-label={`${title} variant ${i + 1} — coming soon`}
            >
              <div className="flex flex-1 items-center justify-center">
                <div
                  className="grid w-full flex-1 place-items-center rounded-lg border border-dashed p-4"
                  style={{
                    borderColor: "var(--color-border-default)",
                    backgroundColor: "color-mix(in srgb, var(--color-fg) 3%, transparent)",
                  }}
                >
                  <div className="flex flex-col items-center gap-2">
                    <span
                      className="h-1.5 w-1.5 rotate-45"
                      style={{
                        backgroundColor: "var(--color-accent-primary)",
                        boxShadow:
                          "0 0 10px color-mix(in srgb, var(--color-accent-primary) 60%, transparent)",
                      }}
                    />
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-fg-muted">
                      Coming soon
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[13px] font-medium text-fg/60">
                  Variant {i + 1}
                </span>
                <span className="font-mono text-[10px] text-fg-muted">—</span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <CategoryNav slug={slug} />
    </main>
  );
}
