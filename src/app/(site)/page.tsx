import { AutoScrollShowcase } from "@/components/organisms/auto-scroll-showcase";
import { BentoGrid } from "@/components/organisms/bento-grid";
import { Hero } from "@/components/organisms/hero";
import { Sandbox } from "@/components/organisms/sandbox";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <AutoScrollShowcase />
        <BentoGrid />
        <section className="mx-auto max-w-6xl px-4 pb-16 pt-4">
          <div className="glass-panel flex flex-col items-start justify-between gap-6 rounded-[2rem] p-8 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                Continue exploring -
              </p>
              <h2 className="mt-2 font-arima text-2xl font-bold text-zinc-900 dark:text-white md:text-3xl">
                Docs, fonts, and icon recipes.
              </h2>
              <p className="mt-2 max-w-xl text-sm text-zinc-600 dark:text-zinc-400">
                Each top-nav destination is a real route — bookmarkable, sharable,
                and ready for your content.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/docs"
                className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-[#FFFDF7] dark:bg-white dark:text-zinc-900"
              >
                Open docs
              </Link>
              <Link
                href="/fonts"
                className="rounded-full border border-zinc-200/90 px-5 py-2.5 text-sm font-semibold text-zinc-800 dark:border-white/15 dark:text-zinc-100"
              >
                Typography
              </Link>
            </div>
          </div>
        </section>
        <Sandbox />
      </main>
      <footer className="mx-auto max-w-6xl px-4 pb-12 text-center text-sm text-zinc-500 dark:text-zinc-500">
        <p>NexaUI — crafted for engineering curiosity.</p>
      </footer>
    </>
  );
}
