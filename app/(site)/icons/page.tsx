"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Copy, 
  Check, 
  Terminal, 
  Layers, 
  Sparkle as SparkleIcon,
} from "lucide-react";
import { Icon } from "@/components/icons/Icon";
import { iconMap, categories, IconName } from "@/components/icons/iconMap";
import { Sparkle } from "@/components/HandMarkers";
import { auraEase } from "@/lib/motion";

export default function IconsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedIcon, setSelectedIcon] = useState<IconName>("home");
  const [previewSize, setPreviewSize] = useState(24);
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const filteredIcons = useMemo(() => {
    let result = Object.keys(iconMap) as IconName[];

    if (selectedCategory !== "All") {
      const category = categories.find((c) => c.name === selectedCategory);
      if (category) {
        result = category.icons as IconName[];
      }
    }

    if (search) {
      result = result.filter((name) =>
        name.toLowerCase().includes(search.toLowerCase())
      );
    }

    return result;
  }, [search, selectedCategory]);

  const installCommand = "npm install @nexaui-library/aura-ui";
  const usageCode = `import { Icon } from "@nexaui-library/aura-ui";\n\n<Icon name="${selectedIcon}" size={${previewSize}} />`;

  return (
    <main className="relative mx-auto w-full max-w-[1400px] px-6 pt-10 pb-28 text-fg">
      {/* 1. HERO HEADER */}
      <header className="mb-20 flex flex-col items-center px-2 text-center">
        <p className="eyebrow mb-3">System Icons</p>
        <h1
          className="display-clamp text-balance text-fg"
          style={{ fontSize: "clamp(2.5rem, 5vw + 1rem, 5rem)" }}
        >
          Visual
          <span className="relative inline-block px-3 align-baseline">
            <Sparkle className="absolute -left-2 -top-2 h-5 w-5" delay="0s" />
            <Sparkle className="absolute -right-3 top-3 h-4 w-4" delay="0.5s" />
            <span
              className="relative font-sans font-light italic"
              style={{ color: "var(--color-accent-primary)" }}
            >
              Icons.
            </span>
          </span>
        </h1>

        <div className="mt-8 flex flex-col items-center gap-6">
          <p className="max-w-[600px] text-lg text-fg/60">
            A curated collection of 60+ essential icons, built on Lucide React 
            and optimized for the Aura UI ecosystem.
          </p>

          {/* Install Command */}
          <div className="aura-tile group relative flex items-center gap-4 bg-fg/[0.03] py-3 pl-5 pr-3 transition-all hover:bg-fg/[0.05]">
            <Terminal className="h-4 w-4 text-[var(--color-accent-primary)]" />
            <code className="font-mono text-sm text-fg/80">{installCommand}</code>
            <button
              onClick={() => handleCopy(installCommand, "install")}
              className="ml-2 rounded-md p-2 transition-colors hover:bg-fg/10"
            >
              {copied === "install" ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4 text-fg/40" />
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[480px_1fr]">
        {/* 2. LEFT PANEL: PREVIEW (Sticky) */}
        <aside className="relative">
          <div className="sticky top-24 space-y-8">
            <div className="aura-tile overflow-hidden bg-surface p-10">
              <div className="flex aspect-square items-center justify-center rounded-2xl bg-fg/[0.02]">
                <motion.div
                  key={selectedIcon + previewSize}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", damping: 20 }}
                >
                  <Icon 
                    name={selectedIcon} 
                    size={previewSize * 4} 
                    className="text-[var(--color-accent-primary)]"
                    strokeWidth={1.5}
                  />
                </motion.div>
              </div>

              <div className="mt-8 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold capitalize tracking-tight">
                    {selectedIcon}
                  </h3>
                  <div className="flex gap-1.5">
                    {[16, 24, 32].map((s) => (
                      <button
                        key={s}
                        onClick={() => setPreviewSize(s)}
                        className={`rounded-md px-2 py-1 text-xs font-mono transition-all ${
                          previewSize === s 
                            ? "bg-[var(--color-accent-primary)] text-white" 
                            : "bg-fg/5 text-fg/40 hover:bg-fg/10"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-fg/40">aura-ui / {selectedIcon}</p>
              </div>

              {/* Usage Snippet */}
              <div className="mt-8 space-y-3">
                <p className="text-[10px] uppercase tracking-widest text-fg/30 font-bold">Usage Snippet</p>
                <div className="group relative rounded-xl bg-fg/[0.03] p-4 font-mono text-[13px] leading-relaxed">
                  <pre className="text-fg/70">
                    <span className="text-[var(--color-accent-primary)]">import</span> {"{ Icon }"} <span className="text-[var(--color-accent-primary)]">from</span> <span className="text-green-500">"@nexaui-library/aura-ui"</span>;{"\n\n"}
                    {"<Icon name="}<span className="text-orange-400">"{selectedIcon}"</span>{" size="}
                    <span className="text-blue-400">{"{"}{previewSize}{"}"}</span> {"/>"}
                  </pre>
                  <button
                    onClick={() => handleCopy(usageCode, "usage")}
                    className="absolute right-3 top-3 opacity-0 transition-opacity group-hover:opacity-100 rounded-md p-1.5 hover:bg-fg/10"
                  >
                    {copied === "usage" ? (
                      <Check className="h-3.5 w-3.5 text-green-500" />
                    ) : (
                      <Copy className="h-3.5 w-3.5 text-fg/30" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="aura-tile bg-fg/[0.02] p-6 space-y-4 border-dashed">
              <div className="flex items-center gap-3 text-fg/60">
                <Layers className="h-4 w-4" />
                <span className="text-sm">Optimized for React</span>
              </div>
              <div className="flex items-center gap-3 text-fg/60">
                <SparkleIcon className="h-4 w-4" />
                <span className="text-sm">Aura-themed defaults</span>
              </div>
            </div>
          </div>
        </aside>

        {/* 3. RIGHT PANEL: BROWSER */}
        <section className="space-y-8">
          {/* Controls */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {["All", ...categories.map((c) => c.name)].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-fg text-surface"
                      : "bg-fg/5 text-fg/50 hover:bg-fg/10 hover:text-fg"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="group relative flex items-center border-b border-border-default pt-1.5 pb-2 sm:min-w-[280px]">
              <Search className="mr-3 h-4 w-4 text-fg/30 transition-colors group-focus-within:text-[var(--color-accent-primary)]" />
              <input
                type="text"
                placeholder="Search icons..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent text-sm outline-none placeholder:text-fg/30"
              />
              <div className="absolute bottom-[-1px] left-0 h-[1.5px] w-0 bg-[var(--color-accent-primary)] transition-all duration-300 group-focus-within:w-full" />
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
            <AnimatePresence mode="popLayout">
              {filteredIcons.map((name) => (
                <motion.button
                  layout
                  key={name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => setSelectedIcon(name)}
                  className={`aura-tile group relative flex flex-col items-center justify-center gap-4 py-8 transition-all hover:border-[var(--color-accent-primary)]/50 hover:shadow-[0_0_30px_color-mix(in_srgb,var(--color-accent-primary)_5%,transparent)] ${
                    selectedIcon === name 
                      ? "border-[var(--color-accent-primary)] bg-[var(--color-accent-primary)]/[0.03] shadow-[0_0_20px_color-mix(in_srgb,var(--color-accent-primary)_10%,transparent)]" 
                      : "bg-fg/[0.02] hover:bg-fg/[0.04]"
                  }`}
                >
                  <div className={`transition-transform group-hover:scale-110 ${selectedIcon === name ? "text-[var(--color-accent-primary)]" : "text-fg/40 group-hover:text-fg"}`}>
                    <Icon name={name} size={28} strokeWidth={1.5} />
                  </div>
                  <span className={`font-mono text-[10px] tracking-tight transition-colors ${selectedIcon === name ? "text-[var(--color-accent-primary)] font-bold" : "text-fg/30 group-hover:text-fg/60"}`}>
                    {name}
                  </span>
                  
                  {selectedIcon === name && (
                    <motion.div 
                      layoutId="active-indicator"
                      className="absolute inset-0 rounded-xl ring-2 ring-[var(--color-accent-primary)] pointer-events-none"
                    />
                  )}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          {filteredIcons.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 text-center opacity-40">
              <Search className="mb-4 h-12 w-12 stroke-[1px]" />
              <p className="text-lg">No icons match your search</p>
              <button 
                onClick={() => { setSearch(""); setSelectedCategory("All"); }}
                className="mt-4 text-sm underline underline-offset-4 hover:text-fg"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Transparency Note */}
          <footer className="mt-20 border-t border-border-default pt-8 text-center">
            <p className="text-xs text-fg/30 tracking-wide uppercase">
              Aura UI icons are powered internally by Lucide.
            </p>
          </footer>
        </section>
      </div>
    </main>
  );
}
