import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const links = [
  ["Home", "/"],
  ["About", "/about"],
  ["Services", "/services"],
  ["Team", "/team"],
  ["Contact", "/contact"],
] as const;

export default function Footer8() {
  return (
    <footer className="footer8 relative w-full min-w-0 overflow-hidden bg-[var(--color-bg)] px-5 pb-6 pt-32 text-[var(--color-fg)] sm:px-8 sm:pt-36">
      <div className="pointer-events-none absolute inset-x-0 top-[-1rem] h-48 sm:top-[-1.5rem] sm:h-56" aria-hidden="true">
        <svg viewBox="0 0 1200 260" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
          <path className="footer8-wave footer8-wave-one" fill="#0b2b63" fillOpacity="0.95" d="M0 86 C120 34 205 126 330 78 C455 30 535 120 660 74 C790 26 890 122 1010 72 C1090 40 1150 62 1200 48 L1200 260 L0 260 Z" />
          <path className="footer8-wave footer8-wave-two" fill="#10458d" fillOpacity="0.9" d="M0 104 C130 148 230 44 360 98 C490 152 570 48 700 102 C830 156 930 52 1050 104 C1120 134 1165 92 1200 112 L1200 260 L0 260 Z" />
          <path className="footer8-wave footer8-wave-three" fill="#1768c4" fillOpacity="0.78" d="M0 132 C110 82 220 174 345 126 C470 78 570 174 690 126 C820 74 920 168 1045 124 C1120 98 1165 142 1200 126 L1200 260 L0 260 Z" />
          <path className="footer8-wave footer8-wave-four" fill="#2389e8" fillOpacity="0.58" d="M0 158 C140 202 225 104 370 154 C510 204 600 108 735 156 C865 204 950 112 1080 158 C1135 178 1170 148 1200 162 L1200 260 L0 260 Z" />
          <path className="footer8-wave footer8-wave-five" fill="var(--color-accent-primary)" fillOpacity="0.34" d="M0 186 C120 142 235 224 355 180 C480 134 585 226 710 182 C835 140 945 224 1060 182 C1120 160 1165 194 1200 182 L1200 260 L0 260 Z" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto flex max-w-[760px] flex-col items-center text-center">
        <div className="mb-7 flex items-center gap-2.5"><span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--color-accent-primary)] text-[var(--color-bg)]"><span className="text-lg font-bold leading-none">A</span></span><span className="text-[16px] font-semibold tracking-[-0.05em]">Aura UI</span></div>
        <p className="max-w-[360px] text-[12px] leading-relaxed text-[var(--color-fg-muted)]">A thoughtful interface system for digital products with a point of view.</p>

        <div className="mt-7 flex flex-wrap justify-center gap-2.5" aria-label="Social links">
          <a href="https://facebook.com" aria-label="Facebook" className="rounded-full border border-[var(--color-border-default)] p-2.5 text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary)]"><Facebook className="h-4 w-4" /></a>
          <a href="https://x.com" aria-label="Twitter / X" className="rounded-full border border-[var(--color-border-default)] p-2.5 text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary)]"><Twitter className="h-4 w-4" /></a>
          <a href="https://linkedin.com" aria-label="LinkedIn" className="rounded-full border border-[var(--color-border-default)] p-2.5 text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary)]"><Linkedin className="h-4 w-4" /></a>
          <a href="https://instagram.com" aria-label="Instagram" className="rounded-full border border-[var(--color-border-default)] p-2.5 text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary)]"><Instagram className="h-4 w-4" /></a>
        </div>

        <nav aria-label="Footer navigation" className="mt-8 flex max-w-full flex-wrap justify-center gap-x-5 gap-y-3 text-[11px] font-medium text-[var(--color-fg-muted)] sm:gap-x-8">
          {links.map(([label, href]) => <a key={label} href={href} className="transition-colors hover:text-[var(--color-accent-primary)]">{label}</a>)}
        </nav>

        <div className="mt-10 w-full border-t border-[var(--color-border-default)] pt-4 text-[10px] text-[var(--color-fg-muted)]">
          <p>© 2026 Aura UI. Crafted with intention.</p>
        </div>
      </div>

      <style jsx>{`
        .footer8-wave {
          transform-box: fill-box;
          transform-origin: center bottom;
          animation: footer8-wave 8s ease-in-out infinite;
          will-change: transform;
        }

        .footer8-wave-two {
          animation-duration: 9.5s;
          animation-delay: -2.5s;
        }

        .footer8-wave-three {
          animation-duration: 7s;
          animation-delay: -4s;
        }

        .footer8-wave-four {
          animation-duration: 11s;
          animation-delay: -6s;
        }

        .footer8-wave-five {
          animation-duration: 10s;
          animation-delay: -1s;
        }

        @keyframes footer8-wave {
          0%, 100% { transform: translate3d(-2%, 0, 0) rotate(-0.5deg) scaleY(1); }
          50% { transform: translate3d(2%, 8px, 0) rotate(0.5deg) scaleY(1.06); }
        }

        @media (prefers-reduced-motion: reduce) {
          .footer8-wave { animation: none; }
        }
      `}</style>
    </footer>
  );
}
