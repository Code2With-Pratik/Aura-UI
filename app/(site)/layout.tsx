import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SiteLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Navbar />

      <div className="pt-[68px]">
        {children}
      </div>

      <Footer />

      <Analytics />
    </>
  );
}