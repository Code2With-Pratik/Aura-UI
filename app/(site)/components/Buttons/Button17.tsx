"use client";

import React from "react";

export default function Button17() {
  const [pressed, setPressed] = React.useState(false);

  return (
    <button
      type="button"
      className="liquid-metal-button"
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{ transform: pressed ? "translateY(2px) scale(0.98)" : undefined }}
    >
      <span className="liquid-metal-button__shine" />
      <span className="liquid-metal-button__content">
        <span className="liquid-metal-button__icon" aria-hidden="true">
          ↗
        </span>
        <span>Continue</span>
      </span>
      <span className="liquid-metal-button__glow" aria-hidden="true" />
      <style dangerouslySetInnerHTML={{ __html: styles }} />
    </button>
  );
}

const styles = `
  .liquid-metal-button {
    position: relative;
    display: inline-flex;
    min-width: 154px;
    height: 52px;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.42);
    border-radius: 999px;
    padding: 0 22px;
    color: #fff;
    cursor: pointer;
    isolation: isolate;
    background: linear-gradient(145deg, #f8fafc 0%, #9aa4b2 26%, #252a34 58%, #dbe4ee 100%);
    box-shadow: inset 0 1px 1px rgba(255,255,255,.75), inset 0 -5px 12px rgba(0,0,0,.45), 0 12px 28px rgba(0,0,0,.24);
    font: 600 14px/1 inherit;
    transition: transform 250ms cubic-bezier(.1,.4,.2,1), filter 250ms ease, box-shadow 250ms ease;
  }

  .liquid-metal-button:hover {
    filter: brightness(1.12) saturate(1.08);
    box-shadow: inset 0 1px 1px rgba(255,255,255,.85), inset 0 -5px 12px rgba(0,0,0,.38), 0 16px 34px rgba(0,0,0,.3);
  }

  .liquid-metal-button:focus-visible {
    outline: 2px solid #a7f3d0;
    outline-offset: 4px;
  }

  .liquid-metal-button__content {
    position: relative;
    z-index: 2;
    display: inline-flex;
    align-items: center;
    gap: 9px;
    text-shadow: 0 1px 2px rgba(0,0,0,.6);
  }

  .liquid-metal-button__icon {
    display: grid;
    width: 24px;
    height: 24px;
    place-items: center;
    border: 1px solid rgba(255,255,255,.45);
    border-radius: 50%;
    background: rgba(8, 12, 20, .48);
    font-size: 16px;
    transition: transform 250ms ease;
  }

  .liquid-metal-button:hover .liquid-metal-button__icon {
    transform: translate(2px, -2px) rotate(8deg);
  }

  .liquid-metal-button__shine,
  .liquid-metal-button__glow {
    position: absolute;
    pointer-events: none;
  }

  .liquid-metal-button__shine {
    inset: -80% 30%;
    z-index: 1;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.5), transparent);
    transform: rotate(24deg) translateX(-120%);
    transition: transform 600ms ease;
  }

  .liquid-metal-button:hover .liquid-metal-button__shine {
    transform: rotate(24deg) translateX(120%);
  }

  .liquid-metal-button__glow {
    inset: 5px;
    z-index: 0;
    border-radius: inherit;
    background: radial-gradient(circle at 30% 0%, rgba(255,255,255,.6), transparent 42%);
    opacity: .7;
  }
`;
