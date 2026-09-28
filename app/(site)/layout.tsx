import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import ScrollToTop from "./_shared/ScrollToTop";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <BackgroundBlobs />
      <div className="relative z-10">
        <ScrollToTop />
        <Navbar />

        <div className="pt-[68px]">{children}</div>

        <Footer />
      </div>

      <Analytics />
    </>
  );
}
