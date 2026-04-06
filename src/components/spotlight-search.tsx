"use client";

import { Command } from "cmdk";
import {
  BookOpen,
  Github,
  Home,
  LayoutGrid,
  Moon,
  Shapes,
  Sun,
  Type,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useCallback, useEffect } from "react";
import { useSpotlight } from "@/contexts/spotlight-context";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Home", icon: Home, keywords: "landing start" },
  {
    href: "/components",
    label: "Components",
    icon: LayoutGrid,
    keywords: "ui kit blocks",
  },
  { href: "/docs", label: "Docs", icon: BookOpen, keywords: "guide reference" },
  { href: "/fonts", label: "Fonts", icon: Type, keywords: "arima typography" },
  { href: "/icons", label: "Icons", icon: Shapes, keywords: "lucide svg" },
  {
    href: "https://github.com",
    label: "GitHub",
    icon: Github,
    keywords: "repo source",
    external: true as const,
  },
] as const;

export function SpotlightSearch() {
  const { open, setOpen } = useSpotlight();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  const navigate = useCallback(
    (href: string, external?: boolean) => {
      setOpen(false);
      if (external) {
        window.open(href, "_blank", "noopener,noreferrer");
        return;
      }
      router.push(href);
    },
    [router, setOpen],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [setOpen]);

  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [open, setOpen]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center px-4 pt-[12vh] sm:pt-[18vh]"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-zinc-950/45 backdrop-blur-[2px] dark:bg-black/60"
        aria-label="Close search"
        onClick={() => setOpen(false)}
      />
      <Command
        className={cn(
          "relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-zinc-200/90 bg-[#FFFDF7]/95 text-zinc-900 shadow-2xl shadow-zinc-900/10",
          "dark:border-white/10 dark:bg-zinc-950/95 dark:text-zinc-50",
        )}
        label="Spotlight search"
      >
        <div className="flex items-center gap-2 border-b border-zinc-200/80 px-3 dark:border-white/10">
          <Command.Input
            autoFocus
            placeholder="Search pages and actions…"
            className={cn(
              "flex h-12 w-full bg-transparent py-3 text-sm outline-none",
              "placeholder:text-zinc-400",
            )}
          />
          <kbd className="hidden shrink-0 rounded-md border border-zinc-200 bg-zinc-100 px-1.5 py-0.5 text-[10px] font-medium text-zinc-500 dark:border-white/15 dark:bg-zinc-900 dark:text-zinc-400 sm:inline-block">
            Esc
          </kbd>
        </div>
        <Command.List className="max-h-[min(50vh,360px)] overflow-y-auto p-2">
          <Command.Empty className="px-3 py-6 text-center text-sm text-zinc-500">
            No matches. Try “docs” or “fonts”.
          </Command.Empty>
          <Command.Group
            heading="Navigate"
            className="px-1 pb-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400"
          >
            {items.map((item) => (
              <Command.Item
                key={item.href}
                value={`${item.label} ${item.keywords}`}
                onSelect={() =>
                  navigate(item.href, "external" in item && item.external)
                }
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm",
                  "data-[selected=true]:bg-indigo-500/15 data-[selected=true]:text-zinc-900",
                  "dark:data-[selected=true]:text-white",
                )}
              >
                <item.icon className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
                <span className="font-medium">{item.label}</span>
                <span className="ml-auto truncate text-xs text-zinc-400">
                  {item.href.startsWith("http") ? "↗" : item.href}
                </span>
              </Command.Item>
            ))}
          </Command.Group>
          <Command.Group
            heading="Theme"
            className="px-1 pb-2 pt-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400"
          >
            <Command.Item
              value="toggle dark mode theme"
              onSelect={() => {
                setTheme(resolvedTheme === "dark" ? "light" : "dark");
                setOpen(false);
              }}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm",
                "data-[selected=true]:bg-indigo-500/15 data-[selected=true]:text-zinc-900",
                "dark:data-[selected=true]:text-white",
              )}
            >
              {resolvedTheme === "dark" ? (
                <Sun className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
              ) : (
                <Moon className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
              )}
              <span className="font-medium">Toggle theme</span>
            </Command.Item>
          </Command.Group>
        </Command.List>
        <div className="flex items-center justify-between border-t border-zinc-200/80 px-3 py-2 text-[11px] text-zinc-500 dark:border-white/10 dark:text-zinc-400">
          <span>
            <kbd className="rounded border border-zinc-200 bg-zinc-100 px-1 dark:border-white/15 dark:bg-zinc-900">
              ⌃
            </kbd>{" "}
            <kbd className="rounded border border-zinc-200 bg-zinc-100 px-1 dark:border-white/15 dark:bg-zinc-900">
              K
            </kbd>{" "}
            anywhere
          </span>
          <span>NexaUI spotlight</span>
        </div>
      </Command>
    </div>
  );
}
