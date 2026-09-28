"use client";

import React from "react";

/**
 * BackgroundBlobs provides the "ascent glass colors" in the background.
 * It uses the current accent color tokens to stay in sync with the theme.
 */
export default function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Central glow */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] opacity-[0.1] blur-[160px] rounded-full"
        style={{
          background: "radial-gradient(circle, var(--color-accent-primary) 0%, transparent 70%)"
        }}
      />
      
      {/* Secondary accent blob */}
      <div 
        className="absolute left-[36%] top-[24%] w-[600px] h-[520px] opacity-[0.045] blur-[150px] rounded-full animate-pulse"
        style={{
          background: "var(--color-accent-primary)",
          animationDuration: "8s"
        }}
      />

      {/* Tertiary accent blob */}
      <div 
        className="absolute right-[28%] bottom-[14%] w-[700px] h-[580px] opacity-[0.04] blur-[165px] rounded-full animate-pulse"
        style={{
          background: "var(--color-accent-primary)",
          animationDuration: "12s",
          animationDelay: "2s"
        }}
      />
      
      {/* Grain overlay for that "Aura" feel */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay [background-image:url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
