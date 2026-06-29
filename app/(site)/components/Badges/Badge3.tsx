import React from 'react';

/* Aurora Border — a "NEW" pill wrapped in a conic-gradient ring that
   rotates continuously, creating a spinning neon outline. */
export default function Badge3() {
  return (
    <>
      <span className="badge3">
        <span className="badge3-ring" aria-hidden />
        <span className="badge3-inner">
          <svg className="badge3-spark" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          NEW
        </span>
      </span>

      <style dangerouslySetInnerHTML={{ __html: styles }} />
    </>
  );
}

const styles = `
  .badge3 {
    position: relative;
    display: inline-flex;
    padding: 2px;
    border-radius: 999px;
    overflow: hidden;
    isolation: isolate;
  }

  .badge3-ring {
    position: absolute;
    inset: -60%;
    background: conic-gradient(
      from 0deg,
      #22d3ee, #3b82f6, #a855f7, #22d3ee
    );
    animation: badge3-rotate 3.2s linear infinite;
    z-index: 0;
  }

  .badge3-inner {
    position: relative;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 8px 17px;
    border-radius: 999px;
    background: #0b1120;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.14em;
    color: #e0f2fe;
  }

  .badge3-spark {
    width: 14px;
    height: 14px;
    color: #67e8f9;
    animation: badge3-twinkle 2s ease-in-out infinite;
  }

  @keyframes badge3-rotate {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  @keyframes badge3-twinkle {
    0%, 100% { opacity: 0.6; transform: scale(0.85) rotate(0deg); }
    50%      { opacity: 1; transform: scale(1.1) rotate(45deg); }
  }
`;
