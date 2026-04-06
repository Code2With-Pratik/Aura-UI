import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Docs",
  description: "Guides and references for building with NexaUI.",
};

export default function DocsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 pb-24 pt-32 md:pt-40">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
        Guides
      </p>
      <h1 className="mt-3 font-arima text-4xl font-bold text-zinc-900 dark:text-white">
        Documentation
      </h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        Install, configure themes, and adopt patterns — replace this stub with
        your real doc content or CMS-driven pages.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex text-sm font-semibold text-indigo-600 dark:text-indigo-300"
      >
        ← Back to home
      </Link>
    </main>
  );
}
