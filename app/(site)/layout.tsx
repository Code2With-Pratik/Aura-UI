import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RouteTransition from "./_shared/RouteTransition";
import ScrollToTop from "./_shared/ScrollToTop";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollToTop />
      <RouteTransition />
      <Navbar />

      <div className="pt-[68px]">{children}</div>

      <Footer />

      <Analytics />
    </>
  );
}
