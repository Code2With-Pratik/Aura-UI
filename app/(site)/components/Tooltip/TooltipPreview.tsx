"use client";

import { Info } from "lucide-react";
import type { ReactNode } from "react";

export type TooltipVariant =
  | "hover"
  | "title"
  | "stats"
  | "placement"
  | "info"
  | "product"
  | "square"
  | "circle"
  | "speech"
  | "notification"
  | "neon"
  | "sheet";

const tipBase =
  "pointer-events-none absolute z-[9999] rounded-xl bg-[#111] px-3 py-2 text-left text-white opacity-0 shadow-[0_16px_35px_rgba(0,0,0,.35)] ring-1 ring-white/10 transition-[opacity,transform] duration-300 ease-out group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 group-focus-within/tooltip:opacity-100 group-focus-within/tooltip:scale-100";

function Trigger({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      className="rounded-full border border-border-default bg-fg/[0.03] px-4 py-2 text-[13px] text-fg transition hover:bg-fg/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
    >
      {children}
    </button>
  );
}

export default function TooltipPreview({
  variant,
}: {
  variant: TooltipVariant;
}) {
  if (variant === "square" || variant === "circle") {
    return (
      <div className="group/tooltip relative flex h-[190px] items-center justify-center">
        <div
          className={`${tipBase} bottom-[calc(50%+28px)] left-1/2 -translate-x-1/2 scale-90 whitespace-nowrap text-[12px] font-semibold ${variant === "circle" ? "grid h-24 w-24 place-items-center rounded-full text-center" : "rounded-md"}`}
        >
          {variant === "circle" ? "Saved!" : "Copy command"}
          <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-[#111]" />
        </div>
        <Trigger>{variant === "circle" ? "Circle" : "Square"}</Trigger>
      </div>
    );
  }

  if (variant === "speech") {
    return (
      <div className="group/tooltip relative flex h-[190px] items-center justify-center">
        <div
          className={`${tipBase} bottom-[calc(50%+30px)] left-1/2 w-[230px] -translate-x-1/2 scale-90 rounded-[24px] px-4 py-3 text-[12px] leading-relaxed`}
        >
          A softer speech bubble for conversational UI.
          <span className="absolute -bottom-2 left-8 h-5 w-5 rotate-45 rounded-br-md bg-[#111]" />
        </div>
        <Trigger>Speech bubble</Trigger>
      </div>
    );
  }

  if (variant === "notification") {
    return (
      <div className="group/tooltip relative flex h-[190px] items-center justify-center">
        <div
          className={`${tipBase} bottom-[calc(50%+30px)] left-1/2 w-[210px] -translate-x-1/2 scale-90 rounded-2xl border border-white/10 p-3`}
        >
          <div className="flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-lg bg-accent-primary text-[11px] font-bold text-black">
              ✓
            </span>
            <div>
              <p className="text-[12px] font-semibold">Build complete</p>
              <p className="text-[10px] text-white/50">
                All checks passed just now
              </p>
            </div>
          </div>
          <span className="absolute -bottom-1.5 right-8 h-3 w-3 rotate-45 bg-[#111]" />
        </div>
        <Trigger>Notify</Trigger>
      </div>
    );
  }

  if (variant === "neon") {
    return (
      <div className="group/tooltip relative flex h-[190px] items-center justify-center">
        <div
          className={`${tipBase} bottom-[calc(50%+28px)] left-1/2 -translate-x-1/2 scale-90 whitespace-nowrap border border-accent-primary/70 bg-[#101a0d] text-[12px] font-semibold text-accent-primary shadow-[0_0_28px_rgba(184,255,87,.25)]`}
        >
          Neon glow
          <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-accent-primary/70 bg-[#101a0d]" />
        </div>
        <Trigger>Neon</Trigger>
      </div>
    );
  }

  if (variant === "sheet") {
    return (
      <div className="group/tooltip relative flex h-[190px] items-end justify-center pb-8">
        <div
          className={`${tipBase} bottom-[calc(50%+8px)] left-1/2 w-[280px] -translate-x-1/2 scale-90 rounded-2xl p-4`}
        >
          <div className="mx-auto mb-3 h-1 w-8 rounded-full bg-white/20" />
          <p className="text-[13px] font-semibold">Quick details</p>
          <p className="mt-1 text-[11px] leading-relaxed text-white/55">
            A spacious pop-up surface for actions that need a little more room.
          </p>
        </div>
        <Trigger>Bottom sheet</Trigger>
      </div>
    );
  }

  if (variant === "stats") {
    return (
      <div className="group/tooltip relative flex h-[190px] items-center justify-center">
        <div
          className={`${tipBase} bottom-[calc(50%+28px)] w-[170px] space-y-3`}
        >
          {[
            "Status|Completed",
            "Code Coverage|94.3%",
            "Last Deploy|Today at 15:42",
            "Performance Score|98/100",
          ].map((item) => {
            const [label, value] = item.split("|");
            return (
              <div key={label}>
                <p className="text-[11px] text-white/45">{label}</p>
                <p className="text-[12px] font-semibold">{value}</p>
              </div>
            );
          })}
          <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-[#111]" />
        </div>
        <Trigger>Stats</Trigger>
      </div>
    );
  }

  if (variant === "title") {
    return (
      <div className="group/tooltip relative flex h-[190px] items-center justify-center">
        <div className={`${tipBase} bottom-[calc(50%+30px)] w-[260px]`}>
          <p className="text-[13px] font-semibold">Tooltip with title</p>
          <p className="mt-1 text-[11px] leading-relaxed text-white/55">
            Tooltips are made to be highly customizable, with rich content and
            clear placement.
          </p>
          <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-[#111]" />
        </div>
        <Trigger>With title</Trigger>
      </div>
    );
  }

  if (variant === "placement") {
    return (
      <div className="relative flex h-[190px] items-center justify-center gap-2">
        {(
          [
            [
              "Left",
              "right-[calc(100%+12px)] top-1/2 -translate-y-1/2",
              "right-[-6px] top-1/2 -translate-y-1/2",
            ],
            [
              "Top",
              "bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2",
              "bottom-[-6px] left-1/2 -translate-x-1/2",
            ],
            [
              "Bottom",
              "top-[calc(100%+12px)] left-1/2 -translate-x-1/2",
              "top-[-6px] left-1/2 -translate-x-1/2",
            ],
            [
              "Right",
              "left-[calc(100%+12px)] top-1/2 -translate-y-1/2",
              "left-[-6px] top-1/2 -translate-y-1/2",
            ],
          ] as const
        ).map(([position, placement, arrow]) => (
          <span key={position} className="group/tooltip relative inline-flex">
            <button
              type="button"
              className="rounded-full border border-border-default px-3 py-2 text-[12px] text-fg transition hover:bg-fg/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
            >
              {position}
            </button>
            <span
              className={`${tipBase} ${placement} whitespace-nowrap px-3 py-2 text-[12px] font-semibold`}
            >
              Hey there!
              <span
                className={`absolute h-3 w-3 rotate-45 bg-[#111] ${arrow}`}
              />
            </span>
          </span>
        ))}
      </div>
    );
  }

  if (variant === "info") {
    return (
      <div className="group/tooltip relative flex h-[190px] items-center justify-center">
        <div
          className={`${tipBase} bottom-[calc(50%+28px)] left-1/2 -translate-x-1/2 whitespace-nowrap text-[12px] font-semibold`}
        >
          More information
          <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-[#111]" />
        </div>
        <button
          type="button"
          aria-label="More information"
          className="grid h-9 w-9 place-items-center rounded-full border border-border-default text-fg-muted hover:text-fg"
        >
          <Info className="h-4 w-4" />
        </button>
      </div>
    );
  }

  if (variant === "product") {
    return (
      <div className="group/tooltip relative flex h-[190px] items-center justify-center">
        <div
          className={`${tipBase} bottom-[calc(50%+35px)] w-[260px] overflow-hidden p-2`}
        >
          <img
            src="/Image.jpg"
            alt="Product preview"
            className="h-24 w-full rounded-lg object-cover"
          />
          <p className="mt-2 text-[12px] font-semibold">Product Preview</p>
          <p className="mt-1 text-[11px] text-white/60">
            View the full product details and specifications
          </p>
          <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-[#111]" />
        </div>
        <Trigger>Product Preview</Trigger>
      </div>
    );
  }

  return (
    <div className="group/tooltip relative flex h-[190px] items-center justify-center">
      <div
        className={`${tipBase} bottom-[calc(50%+28px)] text-[12px] font-semibold`}
      >
        Add to library
        <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-[#111]" />
      </div>
      <Trigger>Hover</Trigger>
    </div>
  );
}
