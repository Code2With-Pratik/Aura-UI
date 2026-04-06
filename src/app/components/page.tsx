import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Components",
  description:
    "Composable UI blocks, glass panels, and motion primitives for NexaUI.",
};

export default function ComponentsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 pb-24 pt-32 md:pt-40">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
        Library
      </p>
      <h1 className="mt-3 font-arima text-4xl font-bold text-zinc-900 dark:text-white">
        Components
      </h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        This route is wired for your component gallery — drop in MDX, Storybook
        embeds, or catalog data here.
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
