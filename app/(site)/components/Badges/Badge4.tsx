import React from 'react';

/* Verified Glow — a trust badge with an animated check that draws itself
   and a soft emerald halo that breathes in and out. */
export default function Badge4() {
  return (
    <>
      <span className="badge4">
        <span className="badge4-check" aria-hidden>
          <svg viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" className="badge4-circle" />
            <path d="M7.5 12.5l3 3 6-6.5" className="badge4-tick" />
          </svg>
        </span>
        Verified
      </span>

      <style dangerouslySetInnerHTML={{ __html: styles }} />
    </>
  );
}

const styles = `
  .badge4 {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 9px 18px 9px 13px;
    border-radius: 999px;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.02em;
    color: #d1fae5;
    background: linear-gradient(145deg, rgba(6, 78, 59, 0.55), rgba(4, 47, 46, 0.7));
    border: 1px solid rgba(16, 185, 129, 0.45);
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.45);
    animation: badge4-halo 2.6s ease-in-out infinite;
  }

  .badge4-check svg {
    width: 20px;
    height: 20px;
    display: block;
  }

  .badge4-circle {
    stroke: #10b981;
    stroke-width: 2;
    fill: rgba(16, 185, 129, 0.12);
  }

  .badge4-tick {
    stroke: #34d399;
    stroke-width: 2.4;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
    stroke-dasharray: 16;
    stroke-dashoffset: 16;
    filter: drop-shadow(0 0 3px rgba(52, 211, 153, 0.9));
    animation: badge4-draw 2.6s ease-in-out infinite;
  }

  @keyframes badge4-draw {
    0%   { stroke-dashoffset: 16; }
    25%  { stroke-dashoffset: 0; }
    80%  { stroke-dashoffset: 0; }
    100% { stroke-dashoffset: 16; }
  }

  @keyframes badge4-halo {
    0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.5); }
    50%      { box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
  }
`;
