type Props = {
  size?: number;
  className?: string;
};

/**
 * The mark uses `currentColor` for its accent so it follows whatever
 * the parent sets — which we drive from `--color-accent-primary`,
 * the live token the ThemePicker mutates.
 */
export default function LogoMark({ size = 28, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ color: "var(--color-accent-primary)" }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="aura-mark" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="currentColor" />
          <stop offset="55%" stopColor="currentColor" stopOpacity="0.45" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect
        x="1"
        y="1"
        width="30"
        height="30"
        rx="9"
        fill="var(--color-surface)"
        stroke="var(--color-border-hover)"
        strokeWidth="1"
      />
      <circle cx="16" cy="16" r="11" fill="url(#aura-mark)" />
      <circle cx="16" cy="16" r="3.6" fill="currentColor" />
    </svg>
  );
}
