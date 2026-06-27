import React from 'react';

/* Live Pulse — a "LIVE" status badge with a radar-ping dot that emits
   expanding rings, signalling real-time activity. */
export default function Badge2() {
  return (
    <>
      <span className="badge2">
        <span className="badge2-dot" aria-hidden>
          <span className="badge2-ping" />
          <span className="badge2-ping badge2-ping--delay" />
          <span className="badge2-core" />
        </span>
        LIVE
      </span>

      <style dangerouslySetInnerHTML={{ __html: styles }} />
    </>
  );
}

const styles = `
  .badge2 {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 9px 18px 9px 16px;
    border-radius: 999px;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.16em;
    color: #fecaca;
    background: rgba(20, 4, 6, 0.9);
    border: 1px solid rgba(239, 68, 68, 0.4);
    box-shadow: 0 0 22px rgba(239, 68, 68, 0.18);
  }

  .badge2-dot {
    position: relative;
    width: 10px;
    height: 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .badge2-core {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: #ef4444;
    box-shadow: 0 0 8px #ef4444;
    animation: badge2-throb 1.6s ease-in-out infinite;
  }

  .badge2-ping {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: rgba(239, 68, 68, 0.55);
    animation: badge2-ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;
  }

  .badge2-ping--delay { animation-delay: 0.9s; }

  @keyframes badge2-ping {
    0%   { transform: scale(1); opacity: 0.7; }
    100% { transform: scale(3.4); opacity: 0; }
  }

  @keyframes badge2-throb {
    0%, 100% { transform: scale(1); }
    50%      { transform: scale(0.78); }
  }
`;
