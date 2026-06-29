import React from 'react';

/* Shimmer Pro — a gradient "PRO" pill with a glossy light sweep that
   glides across the surface on a loop, plus a soft outer glow. */
export default function Badge1() {
  return (
    <>
      <span className="badge1">
        <svg className="badge1-icon" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2l2.4 5.6L20.5 8l-4.3 4 1.2 6L12 15.3 6.6 18l1.2-6L3.5 8l6.1-.4L12 2z"
            fill="currentColor"
          />
        </svg>
        PRO
        <span className="badge1-sheen" aria-hidden />
      </span>

      <style dangerouslySetInnerHTML={{ __html: styles }} />
    </>
  );
}

const styles = `
  .badge1 {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 9px 18px;
    border-radius: 999px;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.12em;
    color: #fff;
    overflow: hidden;
    background: linear-gradient(120deg, #6366f1 0%, #a855f7 50%, #ec4899 100%);
    box-shadow:
      0 4px 20px rgba(168, 85, 247, 0.45),
      inset 0 1px 0 rgba(255, 255, 255, 0.35);
    isolation: isolate;
  }

  .badge1-icon {
    width: 15px;
    height: 15px;
    color: #fde68a;
    filter: drop-shadow(0 0 4px rgba(253, 230, 138, 0.8));
    animation: badge1-spin 6s linear infinite;
  }

  .badge1-sheen {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      105deg,
      transparent 30%,
      rgba(255, 255, 255, 0.55) 48%,
      rgba(255, 255, 255, 0.55) 52%,
      transparent 70%
    );
    transform: translateX(-120%);
    animation: badge1-sweep 2.8s ease-in-out infinite;
    z-index: 2;
  }

  @keyframes badge1-sweep {
    0%   { transform: translateX(-120%); }
    55%, 100% { transform: translateX(120%); }
  }

  @keyframes badge1-spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
`;
