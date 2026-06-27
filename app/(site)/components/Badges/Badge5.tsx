import React from 'react';

/* Holographic Premium — an iridescent pill whose gradient drifts like an
   oil-slick foil, topped with three sparkles that twinkle out of phase. */
export default function Badge5() {
  return (
    <>
      <span className="badge5">
        <span className="badge5-spark badge5-spark--a" aria-hidden>✦</span>
        <span className="badge5-spark badge5-spark--b" aria-hidden>✧</span>
        <span className="badge5-spark badge5-spark--c" aria-hidden>✦</span>
        <span className="badge5-label">PREMIUM</span>
      </span>

      <style dangerouslySetInnerHTML={{ __html: styles }} />
    </>
  );
}

const styles = `
  .badge5 {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 22px;
    border-radius: 999px;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 14px;
    font-weight: 800;
    letter-spacing: 0.18em;
    overflow: visible;
    background: linear-gradient(
      100deg,
      #f0abfc, #a5b4fc, #67e8f9, #6ee7b7, #fde68a, #f0abfc
    );
    background-size: 300% 100%;
    animation: badge5-foil 5s ease infinite;
    box-shadow:
      0 6px 24px rgba(165, 180, 252, 0.45),
      inset 0 1px 0 rgba(255, 255, 255, 0.6);
  }

  .badge5-label {
    background: linear-gradient(180deg, #1e1b4b, #4c1d95);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: #1e1b4b;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
  }

  .badge5-spark {
    position: absolute;
    color: #fff;
    font-size: 13px;
    text-shadow: 0 0 6px rgba(255, 255, 255, 0.95);
    opacity: 0;
    pointer-events: none;
  }

  .badge5-spark--a { top: -8px; left: 6px;  animation: badge5-twinkle 2.4s ease-in-out infinite; }
  .badge5-spark--b { bottom: -9px; right: 14px; animation: badge5-twinkle 2.4s ease-in-out 0.8s infinite; }
  .badge5-spark--c { top: -4px; right: -4px; font-size: 10px; animation: badge5-twinkle 2.4s ease-in-out 1.6s infinite; }

  @keyframes badge5-foil {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes badge5-twinkle {
    0%, 100% { opacity: 0; transform: scale(0.3) rotate(0deg); }
    50%      { opacity: 1; transform: scale(1.2) rotate(90deg); }
  }
`;
