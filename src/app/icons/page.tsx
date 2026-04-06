import type { Metadata } from "next";
import Link from "next/link";
import { Shapes, Sparkles, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Icons",
  description: "Icon strategy and Lucide usage in NexaUI.",
};

export default function IconsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 pb-24 pt-32 md:pt-40">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
        Assets
      </p>
      <h1 className="mt-3 font-arima text-4xl font-bold text-zinc-900 dark:text-white">
        Icons
      </h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        NexaUI uses{" "}
        <strong className="font-medium text-zinc-800 dark:text-zinc-200">
          Lucide React
        </strong>{" "}
        for consistent stroke, sizing, and tree-shaking. Drop in your own SVG
        set or wire an icon pipeline here.
      </p>
      <div className="mt-8 flex gap-4 text-indigo-600 dark:text-indigo-300">
        <Shapes className="h-10 w-10" aria-hidden />
        <Sparkles className="h-10 w-10" aria-hidden />
        <Zap className="h-10 w-10" aria-hidden />
      </div>
      <Link
        href="/"
        className="mt-10 inline-flex text-sm font-semibold text-indigo-600 dark:text-indigo-300"
      >
        ← Back to home
      </Link>
    </main>
  );
}
