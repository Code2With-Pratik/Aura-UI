"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "relative inline-flex h-9 w-[4.5rem] items-center rounded-full border border-zinc-200/90 bg-zinc-900 p-0.5 dark:border-white/10",
      )}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <span
        className={cn(
          "absolute left-0.5 top-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-[#FFFDF7] text-zinc-900 shadow-md transition-transform duration-300 ease-out",
          isDark && "translate-x-[2.15rem]",
        )}
      >
        {mounted ? (
          isDark ? (
            <Moon className="h-4 w-4" strokeWidth={2} />
          ) : (
            <Sun className="h-4 w-4" strokeWidth={2} />
          )
        ) : (
          <Sun className="h-4 w-4 opacity-70" strokeWidth={2} />
        )}
      </span>
      <span className="flex w-full justify-between px-2.5 text-zinc-500">
        <Sun className="h-3.5 w-3.5" aria-hidden />
        <Moon className="h-3.5 w-3.5" aria-hidden />
      </span>
    </button>
  );
}
