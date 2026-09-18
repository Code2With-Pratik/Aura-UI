"use client";

import { useMemo, useState } from "react";
import { Check, ChevronDown, Search, X } from "lucide-react";

type SelectVariant =
  "basic" | "pill" | "search" | "multi" | "grouped" | "command";
const options = ["Design", "Engineering", "Marketing", "Research"];

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-[220px] w-full items-center justify-center overflow-visible rounded-[14px] border border-border-default p-5">
      {children}
    </div>
  );
}

function Menu({
  items,
  selected,
  onSelect,
}: {
  items: string[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="absolute left-0 top-[calc(100%+8px)] z-30 w-full overflow-hidden rounded-xl border border-border-default bg-[var(--color-surface)] p-1.5 shadow-2xl">
      <div className="space-y-0.5">
        {items.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onSelect(item)}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-fg-muted transition hover:bg-fg/10 hover:text-fg"
          >
            {item}
            {item === selected && (
              <Check className="h-3.5 w-3.5 text-accent-primary" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function SelectPreview({ variant }: { variant: SelectVariant }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Design");
  const [selectedMany, setSelectedMany] = useState(["Design", "Research"]);
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () =>
      options.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );
  const choose = (value: string) => {
    setSelected(value);
    setOpen(false);
  };
  if (variant === "multi")
    return (
      <Shell>
        <div className="relative w-full max-w-[360px]">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex min-h-12 w-full items-center gap-2 rounded-xl border border-border-default bg-[var(--color-surface)] px-3 py-2 text-left text-sm text-fg"
          >
            <div className="flex min-w-0 flex-1 flex-wrap gap-1">
              {selectedMany.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1 rounded-md bg-accent-primary/15 px-2 py-1 text-xs text-fg"
                >
                  {item}
                  <X
                    className="h-3 w-3"
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelectedMany(
                        selectedMany.filter((value) => value !== item),
                      );
                    }}
                  />
                </span>
              ))}
            </div>
            <ChevronDown
              className={`h-4 w-4 shrink-0 text-fg-muted transition ${open ? "rotate-180" : ""}`}
            />
          </button>
          {open && (
            <div className="absolute left-0 top-[calc(100%+8px)] z-30 w-full rounded-xl border border-border-default bg-[var(--color-surface)] p-1.5 shadow-2xl">
              {options.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    setSelectedMany(
                      selectedMany.includes(item)
                        ? selectedMany.filter((value) => value !== item)
                        : [...selectedMany, item],
                    )
                  }
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-fg-muted hover:bg-fg/10 hover:text-fg"
                >
                  {item}
                  {selectedMany.includes(item) && (
                    <Check className="h-3.5 w-3.5 text-accent-primary" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </Shell>
    );
  if (variant === "search")
    return (
      <Shell>
        <div className="relative w-full max-w-[320px]">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex w-full items-center gap-2 rounded-full border border-border-default bg-[var(--color-surface)] px-4 py-3 text-sm text-fg"
          >
            <Search className="h-4 w-4 text-fg-muted" />
            <span className="flex-1 text-left">{selected}</span>
            <ChevronDown className="h-4 w-4 text-fg-muted" />
          </button>
          {open && (
            <div className="absolute left-0 top-[calc(100%+8px)] z-30 w-full rounded-xl border border-border-default bg-[var(--color-surface)] p-2 shadow-2xl">
              <div className="flex items-center gap-2 rounded-lg bg-fg/5 px-2">
                <Search className="h-3.5 w-3.5 text-fg-muted" />
                <input
                  autoFocus
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search teams..."
                  className="min-w-0 flex-1 bg-transparent py-2 text-xs text-fg outline-none placeholder:text-fg-muted"
                />
              </div>
              <div className="mt-1">
                {filtered.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      choose(item);
                      setQuery("");
                    }}
                    className="block w-full rounded-lg px-3 py-2 text-left text-sm text-fg-muted hover:bg-fg/10 hover:text-fg"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </Shell>
    );
  if (variant === "grouped")
    return (
      <Shell>
        <div className="relative w-full max-w-[300px]">
          <label className="mb-2 block text-xs font-medium text-fg-muted">
            Workspace
          </label>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex w-full items-center justify-between rounded-lg border border-border-default bg-[var(--color-surface)] px-3 py-2.5 text-sm text-fg"
          >
            <span>{selected}</span>
            <ChevronDown className="h-4 w-4 text-fg-muted" />
          </button>
          {open && (
            <div className="absolute left-0 top-[calc(100%+36px)] z-30 w-full rounded-xl border border-border-default bg-[var(--color-surface)] p-1.5 shadow-2xl">
              <p className="px-3 pb-1 pt-2 text-[10px] uppercase tracking-widest text-fg-muted">
                Teams
              </p>
              {["Design", "Engineering"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => choose(item)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-fg-muted hover:bg-fg/10 hover:text-fg"
                >
                  {item}
                  {item === selected && (
                    <Check className="h-3.5 w-3.5 text-accent-primary" />
                  )}
                </button>
              ))}
              <p className="px-3 pb-1 pt-2 text-[10px] uppercase tracking-widest text-fg-muted">
                Functions
              </p>
              {["Marketing", "Research"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => choose(item)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-fg-muted hover:bg-fg/10 hover:text-fg"
                >
                  {item}
                  {item === selected && (
                    <Check className="h-3.5 w-3.5 text-accent-primary" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </Shell>
    );
  if (variant === "command")
    return (
      <Shell>
        <div className="relative w-full max-w-[320px]">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex w-full items-center justify-between rounded-xl border border-border-default bg-[var(--color-surface)] px-4 py-3 text-sm text-fg shadow-lg"
          >
            <span>
              <span className="text-fg-muted">Select team</span>
              <span className="ml-2 font-medium">{selected}</span>
            </span>
            <kbd className="rounded border border-border-default px-1.5 py-0.5 font-mono text-[10px] text-fg-muted">
              ⌘K
            </kbd>
          </button>
          {open && (
            <div className="absolute left-0 top-[calc(100%+8px)] z-30 w-full rounded-xl border border-border-default bg-[var(--color-surface)] p-2 shadow-2xl">
              <p className="px-2 pb-2 text-[10px] uppercase tracking-widest text-fg-muted">
                Jump to team
              </p>
              {options.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => choose(item)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-fg-muted hover:bg-fg/10 hover:text-fg"
                >
                  {item}
                  <span className="font-mono text-[10px] text-fg-muted">↵</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </Shell>
    );
  return (
    <Shell>
      <div
        className={`relative w-full max-w-[280px] ${variant === "pill" ? "" : ""}`}
      >
        <label className="mb-2 block text-xs font-medium text-fg-muted">
          Team
        </label>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={`flex w-full items-center justify-between border border-border-default bg-[var(--color-surface)] px-4 py-3 text-sm text-fg shadow-sm transition hover:border-accent-primary/50 ${variant === "pill" ? "rounded-full" : "rounded-lg"}`}
        >
          <span>{selected}</span>
          <ChevronDown
            className={`h-4 w-4 text-fg-muted transition ${open ? "rotate-180" : ""}`}
          />
        </button>
        {open && <Menu items={options} selected={selected} onSelect={choose} />}
      </div>
    </Shell>
  );
}
