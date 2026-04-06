"use client";

import { Navbar } from "@/components/navbar";
import { SpotlightSearch } from "@/components/spotlight-search";
import { SpotlightProvider } from "@/contexts/spotlight-context";
import type { ReactNode } from "react";

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <SpotlightProvider>
      <Navbar />
      <SpotlightSearch />
      {children}
    </SpotlightProvider>
  );
}
