"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { ReactNode, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * SmoothScroll component using Lenis.
 * Provides a global smooth scrolling experience and synchronizes with GSAP ScrollTrigger.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Register ScrollTrigger if it's not already
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
  }, []);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.5,
        smoothWheel: true,
      }}
    >
      <LenisGSAPSync />
      {children}
    </ReactLenis>
  );
}

/**
 * Inner component to handle the synchronization between Lenis and GSAP.
 * This needs to be inside ReactLenis to have access to the lenis instance via useLenis.
 */
function LenisGSAPSync() {
  useLenis((lenis) => {
    // Update ScrollTrigger on every scroll
    ScrollTrigger.update();
  });

  return null;
}
