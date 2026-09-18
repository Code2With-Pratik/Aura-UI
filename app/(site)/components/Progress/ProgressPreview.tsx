"use client";

import { useEffect, useState, type ReactNode } from "react";

type ProgressVariant =
  "line" | "circular" | "segments" | "steps" | "metrics" | "loading";

function Surface({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-[190px] w-full place-items-center rounded-[14px] border border-border-default bg-fg/[0.03] p-6">
      {children}
    </div>
  );
}

function Label({ title, value }: { title: string; value: string }) {
  return (
    <div className="mb-2 flex items-center justify-between text-[11px]">
      <span className="font-medium text-fg">{title}</span>
      <span className="font-mono text-fg-muted">{value}</span>
    </div>
  );
}

export default function ProgressPreview({
  variant,
}: {
  variant: ProgressVariant;
}) {
  const target =
    variant === "circular"
      ? 75
      : variant === "segments"
        ? 84
        : variant === "steps"
          ? 75
          : variant === "metrics"
            ? 92
            : 64;
  const progress = useAnimatedProgress(target);

  if (variant === "circular")
    return (
      <Surface>
        <div className="relative grid h-32 w-32 place-items-center">
          <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
            <circle
              cx="60"
              cy="60"
              r="48"
              fill="none"
              stroke="currentColor"
              strokeWidth="9"
              className="text-fg/10"
            />
            <circle
              cx="60"
              cy="60"
              r="48"
              fill="none"
              stroke="url(#progress-gradient)"
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray="301.6"
              strokeDashoffset={301.6 - 301.6 * (progress / 100)}
            />
            <defs>
              <linearGradient
                id="progress-gradient"
                x1="0"
                y1="0"
                x2="1"
                y2="1"
              >
                <stop stopColor="#b8ff57" />
                <stop offset="1" stopColor="#57c8ff" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <strong className="block text-2xl font-semibold text-fg">
              {progress}%
            </strong>
            <span className="text-[10px] text-fg-muted">complete</span>
          </div>
        </div>
      </Surface>
    );
  if (variant === "segments")
    return (
      <Surface>
        <div className="w-full max-w-[390px]">
          <Label title="Storage used" value="8.4 / 10 GB" />
          <div className="flex gap-1.5">
            {Array.from({ length: 10 }, (_, index) => (
              <span
                key={index}
                className={`h-3 flex-1 rounded-sm transition-all duration-300 ${index < Math.floor(progress / 10) ? "bg-accent-primary shadow-[0_0_12px_-4px_var(--color-accent-primary)]" : "bg-fg/10"}`}
              />
            ))}
          </div>
          <p className="mt-2 text-[10px] text-fg-muted">
            You have 1.6 GB remaining
          </p>
        </div>
      </Surface>
    );
  if (variant === "steps")
    return (
      <Surface>
        <div className="w-full max-w-[390px]">
          <div className="flex items-center justify-between">
            {["Plan", "Design", "Build", "Launch"].map((step, index) => (
              <div
                key={step}
                className="relative flex flex-1 flex-col items-center gap-2 text-center"
              >
                <span
                  className={`z-10 grid h-7 w-7 place-items-center rounded-full text-[10px] font-semibold transition-all duration-300 ${index < Math.floor(progress / 25) ? "bg-accent-primary text-black shadow-[0_0_16px_-4px_var(--color-accent-primary)]" : "border border-border-default bg-fg/[0.04] text-fg-muted"}`}
                >
                  {index < 3 ? "✓" : index + 1}
                </span>
                {index < 3 && (
                  <span
                    className={`absolute left-1/2 top-3.5 h-px w-full transition-colors duration-300 ${index < Math.floor(progress / 25) - 1 ? "bg-accent-primary" : "bg-fg/10"}`}
                  />
                )}
                {index === 3 && (
                  <span className="absolute right-1/2 top-3.5 h-px w-full bg-fg/10" />
                )}
                <span className="text-[10px] text-fg-muted">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </Surface>
    );
  if (variant === "metrics")
    return (
      <Surface>
        <div className="w-full max-w-[420px] space-y-4">
          <div>
            <Label title="Design system" value="92%" />
            <div className="h-2 overflow-hidden rounded-full bg-fg/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary transition-[width] duration-300"
                style={{ width: `${Math.min(progress, 92)}%` }}
              />
            </div>
          </div>
          <div>
            <Label title="Documentation" value="68%" />
            <div className="h-2 overflow-hidden rounded-full bg-fg/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent-secondary to-accent-tertiary transition-[width] duration-300"
                style={{ width: `${Math.min(progress * 0.74, 68)}%` }}
              />
            </div>
          </div>
          <div>
            <Label title="Community" value="44%" />
            <div className="h-2 overflow-hidden rounded-full bg-fg/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent-tertiary to-accent-primary transition-[width] duration-300"
                style={{ width: `${Math.min(progress * 0.48, 44)}%` }}
              />
            </div>
          </div>
        </div>
      </Surface>
    );
  if (variant === "loading")
    return (
      <Surface>
        <div className="w-full max-w-[390px]">
          <Label title="Uploading assets" value="Working…" />
          <div className="relative h-2 overflow-hidden rounded-full bg-fg/10">
            <span className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-gradient-to-r from-transparent via-accent-primary to-transparent animate-[progress-slide_1.4s_ease-in-out_infinite]" />
          </div>
          <p className="mt-3 text-[10px] text-fg-muted">
            Preparing your workspace
          </p>
        </div>
      </Surface>
    );
  return (
    <Surface>
      <div className="w-full max-w-[420px]">
        <Label title="Profile completion" value="64%" />
        <div className="h-3 overflow-hidden rounded-full bg-fg/10">
          <div
            className="relative h-full overflow-hidden rounded-full bg-gradient-to-r from-accent-primary via-[#d9ff7d] to-accent-secondary transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          >
            <span className="absolute inset-y-0 right-0 w-16 bg-white/30 blur-md" />
          </div>
        </div>
        <p className="mt-3 text-[10px] text-fg-muted">
          Add a profile image to finish setup
        </p>
      </div>
    </Surface>
  );
}

function useAnimatedProgress(target: number) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let frame = 0;
    const started = performance.now();
    const tick = (now: number) => {
      const elapsed = Math.min((now - started) / 1100, 1);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setValue(Math.round(target * eased));
      if (elapsed < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target]);
  return value;
}
