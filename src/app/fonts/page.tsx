import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Fonts",
  description: "Typography tokens and Arima usage for NexaUI.",
};

export default function FontsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 pb-24 pt-32 md:pt-40">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
        Typography
      </p>
      <h1 className="mt-3 font-arima text-4xl font-bold text-zinc-900 dark:text-white">
        Fonts
      </h1>
      <p className="mt-6 font-arima text-3xl font-semibold text-zinc-800 dark:text-zinc-100">
        Arima carries display headlines; system UI stays crisp.
      </p>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        The root layout loads Arima via{" "}
        <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs dark:bg-zinc-900">
          next/font
        </code>{" "}
        and exposes{" "}
        <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs dark:bg-zinc-900">
          --font-arima
        </code>{" "}
        for utilities like{" "}
        <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs dark:bg-zinc-900">
          font-arima
        </code>
        .
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
