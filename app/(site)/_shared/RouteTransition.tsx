"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const PANEL_COUNT = 6;

export default function RouteTransition() {
  const pathname = usePathname();
  const firstPathname = useRef(pathname);
  const [run, setRun] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (firstPathname.current === pathname) return;

    firstPathname.current = pathname;
    setRun((value) => value + 1);
    setIsVisible(true);

    const timeout = window.setTimeout(() => {
      setIsVisible(false);
    }, 900);

    return () => window.clearTimeout(timeout);
  }, [pathname]);

  if (!isVisible) return null;

  return (
    <div
      className="aura-route-transition"
      key={run}
      aria-hidden="true"
      data-testid="route-transition"
    >
      {Array.from({ length: PANEL_COUNT }, (_, index) => (
        <span
          key={index}
          className="aura-route-transition__panel"
          style={{ "--panel-index": index } as React.CSSProperties}
        />
      ))}
      <style>{`
        .aura-route-transition {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          pointer-events: all;
          background: var(--color-surface, #080808);
        }

        .aura-route-transition__panel {
          flex: 1 1 0;
          min-width: 0;
          background: var(--color-accent-primary, #a5ff75);
          transform: scaleY(1);
          transform-origin: bottom;
          will-change: transform;
          backface-visibility: hidden;
          animation: aura-route-panel-out 220ms cubic-bezier(.65, 0, .35, 1)
            calc(var(--panel-index) * 82ms) both;
        }

        @keyframes aura-route-panel-out {
          from { transform: scaleY(1); }
          to { transform: scaleY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .aura-route-transition__panel {
            animation-duration: 160ms;
            animation-delay: 0ms;
          }
        }
      `}</style>
    </div>
  );
}
