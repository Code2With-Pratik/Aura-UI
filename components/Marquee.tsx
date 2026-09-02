"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { auraEase } from "@/lib/motion";
import {
  MarkBrush,
  MarkCircle,
  MarkScribble,
  Sparkle,
} from "./HandMarkers";

/**
 * Two-row showcase marquee + click-to-maximize lightbox.
 *
 * Marquee
 *  - Row A scrolls right → left, Row B scrolls left → right (opposite).
 *  - Page scroll DOWN  → both rows play normal direction.
 *  - Page scroll UP    → both rows reverse (still opposite to each other).
 *  - Direction is mutated DIRECTLY on the DOM nodes via refs (no React
 *    re-render on scroll), so the marquee never stutters.
 *
 * Lightbox (window mockup)
 *  - Click any card → it maximises into a macOS-style window.
 *  - Closes via the RED traffic light, ESC key, or clicking the backdrop.
 *  - Bottom of the window has a frosted-blur strip with the title /
 *    description + a "Live preview" CTA.
 *  - Window is fully responsive (90 vw on mobile, capped at 880 px).
 */

type ShowcaseItem = {
  src: string;
  title: string;
  description: string;
  href: string;
};

const rowA: ShowcaseItem[] = [
  {
    src: "https://zjjcbyeirsumszohvtvu.supabase.co/storage/v1/object/public/portfolio/projects/2c41cac4-7cb6-4c78-83b8-9f4f5faf1427.png",
    title: "Developer Portfolio",
    description: "Hi There, I am Pratik and I am a Front-End Web Developer. It has been 2 years I am working and learning. I have developed many websites. I am also learning Back-End Development and looking forward to be a Full Stack Web Developer.",
    href: "https://www.pratikdhandare.in",
  },
  {
    src: "https://zjjcbyeirsumszohvtvu.supabase.co/storage/v1/object/public/portfolio/projects/22371395-fcc1-4c24-883d-00808591055b.png",
    title: "Spylt Protein Website",
    description: "Rev up your rebel spirit and feed the adventure of life with SPYLT, where you’re one chug away from epic nostalgia and fearless fun.",
    href: "https://try-spylt.vercel.app",
  },
  {
    src: "https://zjjcbyeirsumszohvtvu.supabase.co/storage/v1/object/public/portfolio/projects/d22d833d-dfb5-40dc-97d7-4267f44d49cd.jpg",
    title: "Designer Portfolio",
    description: "Designed and developed with cool interaction animation and glass UI",
    href: "https://designer-portfolio-adx.vercel.app",
  },
  {
    src: "https://zjjcbyeirsumszohvtvu.supabase.co/storage/v1/object/public/portfolio/projects/5ee4fab7-08a3-465e-a4a7-ce5c85d50a35.png",
    title: "IOS MacOS Portfolio",
    description: "This is not just a portfolio it is a Operating System.",
    href: "https://ios-macos-portfolio.vercel.app",
  },
  {
    src: "https://zjjcbyeirsumszohvtvu.supabase.co/storage/v1/object/public/portfolio/projects/b06c5996-d299-49b4-9098-95f6eea0794a.jpg",
    title: "Grand Palace Animated Website",
    description: "An immersive cinematic journey through a magnificent luxury palace. Explore breathtaking interiors, gardens, and aerial views through scroll-based animation.",
    href: "https://animated-palace.vercel.app",
  },
  {
    src: "https://zjjcbyeirsumszohvtvu.supabase.co/storage/v1/object/public/portfolio/projects/c5508aec-0d5f-4bd5-9e7a-6088034916f6.png",
    title: "Obsidian Safe And Secure",
    description: "A multi feature application which has the ability to chat , coloborate , conact randoom one and store your files and folder all in safe handa that only you can access",
    href: "https://obsidian-safe-and-secure.onrender.com",
  },
  {
    src: "https://zjjcbyeirsumszohvtvu.supabase.co/storage/v1/object/public/portfolio/projects/96cd57d6-45fe-45c1-866f-b72fb376b187.png",
    title: "Command Line Interface",
    description: "Application that store your idea in real time as creating the cards and your own space as you can add code snippets and content as you like and protected.",
    href: "https://command-line-interface.vercel.app",
  },
  {
    src: "https://zjjcbyeirsumszohvtvu.supabase.co/storage/v1/object/public/portfolio/projects/90031a9d-dbab-4edb-bc16-e0632d396af1.png",
    title: "NexaOne AI",
    description: "All in one AI Platform to have chat , multiple AI tools and group meeting like features with complete security and managable",
    href: "https://nexaone-ai.onrender.com",
  },
  {
    src: "https://www.pratikdhandare.in/assets/project1.jpg",
    title: "EZ Startup Futurio Website",
    description: "A company website landing page with glass UI and Custom components",
    href: "https://ezstartupfuturio.vercel.app",
  },
];

const rowB: ShowcaseItem[] = [
  {
    src: "https://www.pratikdhandare.in/assets/project2.jpg",
    title: "Grand Stay Hotel Management Application",
    description: "With the help of this app you can manage all the things in the hoytel in a single admin as well as the client like manage the bookings , services , payments , checkin checkout etc.",
    href: "https://grandstay.kesug.com",
  },
  {
    src: "https://www.pratikdhandare.in/assets/project3.jpg",
    title: "Job Portal",
    description: "Platform that connet both employee and the recruiter with big companies.",
    href: "https://job-portal-y5hr.onrender.com",
  },
  {
    src: "https://www.pratikdhandare.in/assets/project4.jpg",
    title: "Mega A construction Website",
    description: "Mega is not the name it is a brand that full fill your idea into reality as the seamless arcitecture with in time",
    href: "https://magmawebsite.netlify.app/",
  },
  {
    src: "https://www.pratikdhandare.in/assets/project5.jpg",
    title: "Freelance Landing page",
    description: "This is the landing page for the freelace website",
    href: "https://freelancerlandingpage.netlify.app/",
  },
  {
    src: "https://www.pratikdhandare.in/assets/project6.jpg",
    title: "Apple Store",
    description: "The store that show case the airpods",
    href: "https://appleairpodslandingpage.netlify.app",
  },
  {
    src: "https://www.pratikdhandare.in/assets/project7.jpg",
    title: "Cake Shop",
    description: "This is a cake shop website were you can give the order as per your requirement and customise the cake design and we will order the cake to you!",
    href: "https://code2with-pratik.github.io/Cake-Shop/",
  },
  {
    src: "https://www.pratikdhandare.in/assets/project8.jpg",
    title: "Talk To Nature",
    description: "This is the animation website that animate the mountain and leaves as the scroll using the GSAP the animation library",
    href: "https://parallexeffectweb.netlify.app",
  },
];

export default function Marquee() {
  const rowARef = useRef<HTMLDivElement>(null);
  const rowBRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<ShowcaseItem | null>(null);

  /* Page-scroll direction sets animation-direction directly on the DOM —
     no React state, no re-renders.

     Smoothness fix: trackpad momentum / mouse-wheel jitter emits tiny
     opposite-sign deltas constantly, which previously thrashed the
     animation-direction back and forth and looked jittery. We now:
       - accumulate same-sign deltas (sign flip resets the accumulator)
       - require ~30 px of sustained motion before flipping
       - enforce a 400 ms cooldown between flips
     This kills the micro-flip storm without harming responsiveness. */
  useEffect(() => {
    let lastY = window.scrollY;
    let currentDir: "normal" | "reverse" = "normal";
    let accumDelta = 0;
    let lastFlipAt = 0;
    let ticking = false;

    const FLIP_THRESHOLD_PX = 30;
    const FLIP_COOLDOWN_MS = 400;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;
      if (delta === 0) return;

      // Reset accumulator on sign flip; otherwise compound.
      if (Math.sign(delta) !== Math.sign(accumDelta)) {
        accumDelta = delta;
      } else {
        accumDelta += delta;
      }

      if (Math.abs(accumDelta) < FLIP_THRESHOLD_PX) return;

      const now = performance.now();
      if (now - lastFlipAt < FLIP_COOLDOWN_MS) return;

      const next: "normal" | "reverse" = accumDelta > 0 ? "normal" : "reverse";
      if (next === currentDir) {
        accumDelta = 0;
        return;
      }
      currentDir = next;
      lastFlipAt = now;
      accumDelta = 0;
      if (rowARef.current) rowARef.current.style.animationDirection = next;
      if (rowBRef.current) rowBRef.current.style.animationDirection = next;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close lightbox on ESC */
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    /* Lock body scroll while open */
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active]);

  const trackA = [...rowA, ...rowA];
  const trackB = [...rowB, ...rowB];

  return (
    <>
      <section
        id="updates"
        aria-label="Showcase"
        className="relative border-b border-border-default bg-surface/40 pt-2 pb-6 overflow-hidden md:pb-4"
      >
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-bg to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-bg to-transparent" />

        {/* Centered section header */}
        <ShowcaseHeader />

        <Row
          ref={rowARef}
          track={trackA}
          keyframe="aura-marquee-a"
          duration={48}
          onCardClick={setActive}
        />
        <div className="mt-5">
          <Row
            ref={rowBRef}
            track={trackB}
            keyframe="aura-marquee-b"
            duration={54}
            onCardClick={setActive}
          />
        </div>

        <style>{`
          @keyframes aura-marquee-a {
            from { transform: translate3d(0, 0, 0); }
            to   { transform: translate3d(-50%, 0, 0); }
          }
          @keyframes aura-marquee-b {
            from { transform: translate3d(-50%, 0, 0); }
            to   { transform: translate3d(0, 0, 0); }
          }
        `}</style>
      </section>

      <Lightbox item={active} onClose={() => setActive(null)} />
    </>
  );
}

/* ────── Centered section header ──────
   Eyebrow + "Show case" title where 'case' sits on top of a hand-drawn
   accent brush wash, then a thin gradient line + center diamond accent
   to draw the eye into the rows below. All accent colors flow from
   var(--color-accent-primary) so the ThemePicker FAB updates them live. */
function ShowcaseHeader() {
  return (
    <header className="relative z-20 mb-10 flex flex-col items-center px-6 text-center md:mb-14">
      <p className="eyebrow mb-3">Gallery</p>

      <h2 className="display-clamp text-balance">
        Show
        <span className="relative ml-1.5 inline-block px-2.5 align-baseline">
          {/* Sparkles — four 4-point stars positioned around the word.
              Each twinkles on its own staggered animation so the cluster
              feels alive without being noisy. */}
          <Sparkle className="absolute -left-1 -top-1 h-4 w-4" delay="0s" />
          <Sparkle className="absolute -right-2 top-2 h-3 w-3" delay="0.5s" />
          <Sparkle className="absolute -bottom-1 left-3 h-2.5 w-2.5" delay="1s" />
          <Sparkle className="absolute -right-1 -bottom-2 h-3.5 w-3.5" delay="1.4s" />

          <span
            className="relative not-italic font-sans font-light"
            style={{ color: "var(--color-accent-primary)" }}
          >
            case
          </span>
        </span>
      </h2>

      {/* Attractive bottom accent line — thin gradient strokes flanking
          a diamond accent. Uses color-mix so it stays accent-tinted in
          both themes. */}
      <div
        aria-hidden
        className="mt-5 flex items-center gap-2.5"
      >
        <span
          className="h-[2px] w-14 rounded-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-accent-primary) 75%, transparent))",
          }}
        />
        <span
          className="h-1.5 w-1.5 rotate-45"
          style={{
            backgroundColor: "var(--color-accent-primary)",
            boxShadow:
              "0 0 12px color-mix(in srgb, var(--color-accent-primary) 70%, transparent)",
          }}
        />
        <span
          className="h-[2px] w-14 rounded-full"
          style={{
            background:
              "linear-gradient(90deg, color-mix(in srgb, var(--color-accent-primary) 75%, transparent), transparent)",
          }}
        />
      </div>

      <p className="mt-6 max-w-[520px] text-pretty text-base leading-relaxed text-fg/70 md:text-lg">
        Real <MarkScribble>surfaces</MarkScribble> stitched from the same{" "}
        <MarkCircle>primitives</MarkCircle> — click any{" "}
        <MarkBrush>card</MarkBrush> to open it as a window.
      </p>
    </header>
  );
}

/* ────── Row primitive ────── */

const Row = ({
  ref,
  track,
  keyframe,
  duration,
  onCardClick,
}: {
  ref: React.RefObject<HTMLDivElement | null>;
  track: ShowcaseItem[];
  keyframe: string;
  duration: number;
  onCardClick: (item: ShowcaseItem) => void;
}) => (
  <div className="flex">
    <div
      ref={ref}
      className="flex shrink-0 items-center gap-4 pr-4"
      style={{
        animationName: keyframe,
        animationDuration: `${duration}s`,
        animationTimingFunction: "linear",
        animationIterationCount: "infinite",
        animationDirection: "normal",
        animationFillMode: "both",
        willChange: "transform",
      }}
    >
      {track.map((item, i) => (
        <ShowcaseCard
          key={`${item.src}-${i}`}
          item={item}
          onClick={() => onCardClick(item)}
        />
      ))}
    </div>
  </div>
);

function ShowcaseCard({
  item,
  onClick,
}: {
  item: ShowcaseItem;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative shrink-0 overflow-hidden border border-border-default transition-transform duration-300 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
      style={{
        width: 300,
        height: 190,
        borderRadius: 18,
        backgroundColor: "var(--color-surface)",
      }}
      aria-label={`Open ${item.title}`}
    >
      <img
        src={item.src}
        alt=""
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        draggable={false}
      />

      {/* Default subtle vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 group-hover:opacity-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.18) 100%)",
        }}
      />

      {/* Hover overlay — darker tint + centred fullscreen icon button.
          The icon uses the existing aura-glass style so it matches the
          rest of the UI's glass language. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 100%)",
        }}
      >
        <span
          className="flex items-center justify-center rounded-full text-fg shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] backdrop-blur-xl"
          style={{
            width: 48,
            height: 48,
            backgroundColor: "rgba(255,255,255,0.16)",
            border: "1px solid rgba(255,255,255,0.32)",
          }}
        >
          <FullscreenIcon />
        </span>
      </div>
    </button>
  );
}

function FullscreenIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-white"
      aria-hidden
    >
      <path d="M3 8V3h5" />
      <path d="M17 8V3h-5" />
      <path d="M3 12v5h5" />
      <path d="M17 12v5h-5" />
    </svg>
  );
}

/* ────── Lightbox (macOS-style window mockup) ────── */

function Lightbox({
  item,
  onClose,
}: {
  item: ShowcaseItem | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.01, ease: auraEase }}
          className="fixed inset-0 z-[120] flex items-center justify-center px-4 sm:px-8"
          aria-modal
          role="dialog"
          aria-label={item.title}
        >
          {/* Backdrop — frosted-white glass blur, clicking closes */}
          <div
            className="absolute inset-0"
            onClick={onClose}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0)",
              backdropFilter: "blur(8px) saturate(60%)",
              WebkitBackdropFilter: "blur(28px) saturate(60%)",
            }}
          />

          {/* Window */}
          <motion.div
            initial={{ scale: 0.92, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.94, y: 16, opacity: 0 }}
            transition={{ duration: 0.12, ease: auraEase }}
            className="relative z-10 w-full overflow-hidden rounded-2xl shadow-[0_60px_140px_-30px_rgba(0,0,0,0.7)]"
            style={{
              maxWidth: "min(880px, 95vw)",
              backgroundColor: "var(--color-surface)",
              /* Mockup-style white-gray border, 2px wide */
              border: "2px solid rgba(220, 220, 225, 0.35)",
              boxShadow:
                "0 0 0 1px rgba(180, 180, 180, 0.22), 0 60px 140px -30px rgba(0, 0, 0, 0.7)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title bar with traffic lights — bigger, more tactile */}
            <div className="flex items-center gap-2.5 border-b border-white/10 bg-black/40 px-4 py-3 backdrop-blur sm:px-5 sm:py-3.5">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="relative h-[18px] w-[18px] rounded-full transition-transform duration-150 hover:scale-110"
                style={{
                  backgroundColor: "#ff5f57",
                  boxShadow:
                    "0 0 0 0.5px rgba(0,0,0,0.5) inset, 0 0 10px -2px #ff5f57",
                }}
              />
              {/* Yellow + green are decorative — disabled */}
              <span
                aria-hidden
                className="h-[18px] w-[18px] rounded-full opacity-90"
                style={{
                  backgroundColor: "#febc2e",
                  boxShadow:
                    "0 0 0 0.5px rgba(0,0,0,0.5) inset, 0 0 10px -2px #febc2e",
                }}
              />
              <span
                aria-hidden
                className="h-[18px] w-[18px] rounded-full opacity-90"
                style={{
                  backgroundColor: "#28c840",
                  boxShadow:
                    "0 0 0 0.5px rgba(0,0,0,0.5) inset, 0 0 10px -2px #28c840",
                }}
              />
              <span className="ml-3 truncate text-[11px] text-white/55 font-mono">
                {item.title.toLowerCase().replace(/\s+/g, "-")}.aura
              </span>
              <span className="ml-auto hidden text-[10px] uppercase tracking-[0.2em] text-white/35 sm:inline">
                ESC to close
              </span>
            </div>

            {/* Image area */}
            <div className="relative aspect-[16/10] w-full bg-black/30">
              <img
                src={item.src}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover"
                draggable={false}
              />

              {/* Bottom frosted-blur info strip */}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3 sm:p-5">
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 -z-10 h-full"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(10,10,12,0.85) 0%, rgba(10,10,12,0.55) 60%, rgba(10,10,12,0) 100%)",
                    backdropFilter: "blur(12px) saturate(140%)",
                    WebkitBackdropFilter: "blur(12px) saturate(140%)",
                    maskImage:
                      "linear-gradient(to top, #000 0%, #000 40%, transparent 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to top, #000 0%, #000 40%, transparent 100%)",
                  }}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-base font-semibold text-white sm:text-lg">
                    {item.title}
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-[11px] text-white/70 sm:text-[13px]">
                    {item.description}
                  </p>
                </div>
                <a
                  href={item.href}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold text-black transition-transform hover:scale-[1.03] sm:px-4 sm:py-2 sm:text-[13px]"
                  style={{
                    backgroundColor: "var(--color-accent-primary)",
                    boxShadow:
                      "0 8px 24px -8px color-mix(in srgb, var(--color-accent-primary) 55%, transparent)",
                  }}
                >
                  Live preview
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M3 6h6m0 0L6.5 3.5M9 6L6.5 8.5"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
