import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getNeighbours } from "./categories";

export default function CategoryNav({ slug }: { slug: string }) {
  const { prev, next } = getNeighbours(slug);

  return (
    <nav
      aria-label="Component categories"
      className="mt-14 flex items-center justify-between border-t border-[var(--color-border-default)] pt-6"
    >
      {prev ? (
        <Link
          href={`/components/${prev.slug}`}
          className="aura-border group inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] text-fg/75 transition-colors hover:text-fg"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          <span className="flex flex-col items-start leading-tight">
            <span className="text-[10px] uppercase tracking-[0.18em] text-fg-muted">
              Previous
            </span>
            <span className="font-medium">{prev.label}</span>
          </span>
        </Link>
      ) : (
        <span />
      )}

      {next ? (
        <Link
          href={`/components/${next.slug}`}
          className="aura-border group inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] text-fg/75 transition-colors hover:text-fg"
        >
          <span className="flex flex-col items-end leading-tight">
            <span className="text-[10px] uppercase tracking-[0.18em] text-fg-muted">
              Next
            </span>
            <span className="font-medium">{next.label}</span>
          </span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
