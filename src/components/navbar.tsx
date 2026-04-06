"use client";

import {
  BookOpen,
  Github,
  LayoutGrid,
  Menu,
  Search,
  Shapes,
  Type,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrandLogo } from "@/components/brand-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { useSpotlight } from "@/contexts/spotlight-context";
import { cn } from "@/lib/utils";

const allLinks = [
  { href: "/components", label: "Components", icon: LayoutGrid },
  { href: "/docs", label: "Docs", icon: BookOpen },
  { href: "/fonts", label: "Fonts", icon: Type },
  { href: "/icons", label: "Icons", icon: Shapes },
] as const;

function linkClass(active: boolean) {
  return cn(
    "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
    active
      ? "bg-black/10 text-ink dark:bg-white/15 dark:text-white"
      : "text-ink-muted hover:bg-black/[0.05] hover:text-ink dark:hover:bg-white/[0.08] dark:hover:text-white",
  );
}

export function Navbar() {
  const pathname = usePathname();
  const { setOpen: setSpotlightOpen } = useSpotlight();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on navigation
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-6">
        <nav
          className={cn(
            "pointer-events-auto flex w-full max-w-6xl items-center gap-1.5 rounded-full py-2",
          )}
          aria-label="Primary"
        >          {/* Mobile/Tablet Hamburger: Left of Logo */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-ink-muted hover:bg-black/[0.05] dark:hover:bg-white/[0.08] lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-1 sm:gap-3 shrink-0">
            <Link href="/" className="shrink-0 scale-75 sm:scale-100 origin-left">
              <BrandLogo />
            </Link>
            
            {/* Desktop Links: Left Side */}
            <div className="hidden items-center gap-1 lg:flex lg:gap-2">
              {allLinks.slice(0, 2).map((l) => {
                const active = pathname === l.href || pathname.startsWith(`${l.href}/`);
                return (
                  <Link key={l.href} href={l.href} className={linkClass(active)}>
                    <l.icon className="h-4 w-4 opacity-90" aria-hidden />
                    {l.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Search Bar: Centered */}
          <div className="flex min-w-0 flex-1 justify-center px-0 md:max-w-xl lg:max-w-2xl">
            <button
              type="button"
              onClick={() => setSpotlightOpen(true)}
              className={cn(
                "relative flex h-7 w-full cursor-pointer items-center gap-1.5 rounded-full border border-zinc-200/90 bg-white/75 px-2 text-left text-[10px] text-ink shadow-sm outline-none backdrop-blur-md sm:h-10 sm:px-4 sm:text-sm",
                "transition hover:border-indigo-400/50 dark:border-white/12 dark:bg-zinc-950/65 dark:text-zinc-50 dark:hover:border-indigo-400/35",
              )}
            >
              <Search className="h-3 w-3 shrink-0 text-zinc-500 dark:text-zinc-400 sm:h-4 sm:w-4" aria-hidden />
              <span className="min-w-0 flex-1 truncate text-ink-muted">
                Search…
              </span>
              <kbd className="ml-auto hidden shrink-0 rounded-md border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-ink-muted dark:border-white/12 dark:bg-zinc-900 dark:text-zinc-400 sm:inline">
                ⌃K
              </kbd>
            </button>
          </div>

          {/* Desktop Links: Right Side + Toggle */}
          <div className="flex items-center justify-end gap-1.5 sm:gap-3 shrink-0">
            <div className="hidden items-center gap-1 lg:flex lg:gap-2">
              {allLinks.slice(2).map((l) => {
                const active = pathname === l.href || pathname.startsWith(`${l.href}/`);
                return (
                  <Link key={l.href} href={l.href} className={linkClass(active)}>
                    <l.icon className="h-4 w-4 opacity-90" aria-hidden />
                    {l.label}
                  </Link>
                );
              })}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-ink-muted transition-colors hover:bg-black/[0.05] hover:text-ink dark:hover:bg-white/[0.06] dark:hover:text-white"
              >
                <Github className="h-4 w-4" aria-hidden />
                <span className="hidden xl:inline">GitHub</span>
              </a>
            </div>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      {/* Mobile/Tablet Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-[101] w-72 border-r border-black/[0.08] bg-[#fffff0] p-6 shadow-2xl dark:border-white/[0.08] dark:bg-zinc-950 lg:hidden"
            >
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between">
                  <BrandLogo />
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-black/[0.05] dark:hover:bg-white/[0.08]"
                  >
                    <X className="h-5 w-5 text-ink-muted" />
                  </button>
                </div>

                <div className="mt-12 flex flex-col gap-4">
                  <p className="px-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">Navigation</p>
                  <div className="flex flex-col gap-1">
                    {allLinks.map((l) => {
                      const active = pathname === l.href || pathname.startsWith(`${l.href}/`);
                      return (
                        <Link
                          key={l.href}
                          href={l.href}
                          className={cn(
                            "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                            active
                              ? "bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400"
                              : "text-ink-muted hover:bg-black/[0.04] hover:text-ink dark:hover:bg-white/[0.06] dark:hover:text-white"
                          )}
                        >
                          <l.icon className="h-5 w-5 opacity-90" aria-hidden />
                          {l.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-auto pt-6">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-zinc-950 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-zinc-900 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100"
                  >
                    <Github className="h-5 w-5" />
                    GitHub Repository
                  </a>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
