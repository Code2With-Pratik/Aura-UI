/* Hand-drawn accent markers shared across the marketing site.
   Each wraps an inline-block span over an absolutely-positioned SVG so the
   stroke / wash sits BEHIND or UNDER the glyphs without disturbing baseline
   flow. All SVGs use currentColor wired to var(--color-accent-primary) so
   they re-tint live when the ThemePicker FAB swaps the accent. */

type Props = { children: React.ReactNode };

/* ────── Sparkle ──────
   4-point star scaled / rotated on a soft loop. Used as a decoration
   around accent words. Caller positions it absolutely via className. */
export function Sparkle({
  className = "",
  delay = "0s",
}: {
  className?: string;
  delay?: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      className={`pointer-events-none ${className}`}
      style={{
        color: "var(--color-accent-primary)",
        animation: "aura-sparkle 2.4s ease-in-out infinite",
        animationDelay: delay,
        transformOrigin: "center",
        filter:
          "drop-shadow(0 0 6px color-mix(in srgb, var(--color-accent-primary) 60%, transparent))",
      }}
    >
      <path
        d="M12 0 C 12.5 8, 16 11.5, 24 12 C 16 12.5, 12.5 16, 12 24 C 11.5 16, 8 12.5, 0 12 C 8 11.5, 11.5 8, 12 0 Z"
        fill="currentColor"
      />
      <style>{`
        @keyframes aura-sparkle {
          0%, 100% { opacity: 0.3; transform: scale(0.7) rotate(0deg); }
          50%      { opacity: 1;   transform: scale(1)   rotate(45deg); }
        }
      `}</style>
    </svg>
  );
}

/* MarkSparkle — inline word with two small twinkling stars at the
   top-left and bottom-right corners. Use for paragraph emphasis. */
export function MarkSparkle({ children }: Props) {
  return (
    <span
      className="relative inline-block px-1 font-medium"
      style={{ color: "var(--color-accent-primary)" }}
    >
      <Sparkle
        className="absolute -left-1 -top-2 h-3 w-3"
        delay="0s"
      />
      <Sparkle
        className="absolute -right-0.5 -bottom-1.5 h-2.5 w-2.5"
        delay="0.9s"
      />
      <span className="relative">{children}</span>
    </span>
  );
}

export function MarkCircle({ children }: Props) {
  return (
    <span
      className="relative inline-block px-2 py-0.5 font-medium text-fg/90"
      style={{ color: "var(--color-accent-primary)" }}
    >
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 200 60"
        preserveAspectRatio="none"
      >
        <path
          d="M180 10 C 140 0, 70 -2, 28 10 C 5 18, 4 42, 30 50 C 80 60, 150 58, 182 48 C 200 40, 198 18, 180 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.85"
        />
      </svg>
      <span className="relative text-fg">{children}</span>
    </span>
  );
}

export function MarkBrush({ children }: Props) {
  return (
    <span
      className="relative inline-block px-1.5 font-medium text-fg"
      style={{ color: "var(--color-accent-primary)" }}
    >
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 200 40"
        preserveAspectRatio="none"
      >
        <path
          d="M4 12 C 40 4, 90 8, 140 6 C 175 5, 195 10, 197 18 C 198 26, 180 32, 145 33 C 95 34, 40 32, 10 30 C 2 28, 0 18, 4 12 Z"
          fill="currentColor"
          opacity="0.32"
        />
      </svg>
      <span className="relative">{children}</span>
    </span>
  );
}

export function MarkScribble({ children }: Props) {
  return (
    <span
      className="relative inline-block font-medium text-fg/90"
      style={{ color: "var(--color-accent-primary)" }}
    >
      <span className="relative">{children}</span>
      <svg
        aria-hidden
        className="pointer-events-none absolute -bottom-2 left-0 h-3 w-full"
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
      >
        <path
          d="M2 7 C 18 2, 34 11, 52 6 C 70 1, 88 11, 108 6 C 128 1, 148 11, 168 6 C 184 2, 196 8, 198 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.9"
        />
      </svg>
    </span>
  );
}

export function MarkDoubleUnderline({ children }: Props) {
  return (
    <span
      className="relative inline-block font-medium text-fg/90"
      style={{ color: "var(--color-accent-primary)" }}
    >
      <span className="relative">{children}</span>
      <svg
        aria-hidden
        className="pointer-events-none absolute -bottom-2 left-0 h-2.5 w-full"
        viewBox="0 0 200 10"
        preserveAspectRatio="none"
      >
        <path
          d="M2 2 C 60 0, 140 4, 198 1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M4 7 C 70 5, 130 9, 196 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.7"
        />
      </svg>
    </span>
  );
}

export function MarkBox({ children }: Props) {
  return (
    <span
      className="relative inline-block px-2 py-0.5 font-medium text-fg/90"
      style={{ color: "var(--color-accent-primary)" }}
    >
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 200 50"
        preserveAspectRatio="none"
      >
        <path
          d="M5 6 C 60 3, 140 7, 196 4 C 197 4, 198 12, 197 24 C 198 36, 196 44, 195 46 C 130 49, 60 47, 6 46 C 4 46, 3 36, 4 24 C 3 14, 4 7, 5 6 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
        />
      </svg>
      <span className="relative text-fg">{children}</span>
    </span>
  );
}

export function MarkSunburst({ children }: Props) {
  return (
    <span
      className="relative inline-block px-1 font-medium text-fg"
      style={{ color: "var(--color-accent-primary)" }}
    >
      <svg
        aria-hidden
        className="pointer-events-none absolute -inset-y-3 inset-x-0 h-[calc(100%+24px)] w-full"
        viewBox="0 0 200 60"
        preserveAspectRatio="none"
      >
        <g
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.85"
        >
          {/* top rays */}
          <path d="M40 12 L 36 4" />
          <path d="M70 8 L 70 0" />
          <path d="M100 6 L 100 -2" />
          <path d="M130 8 L 130 0" />
          <path d="M160 12 L 164 4" />
          {/* bottom rays */}
          <path d="M40 48 L 36 56" />
          <path d="M70 52 L 70 60" />
          <path d="M100 54 L 100 62" />
          <path d="M130 52 L 130 60" />
          <path d="M160 48 L 164 56" />
        </g>
      </svg>
      <span className="relative">{children}</span>
    </span>
  );
}
