import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { source } from "@/lib/source";
import { baseOptions } from "../layout.config";
import Navbar from "@/components/Navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="pt-[68px]">
        <DocsLayout
          tree={source.pageTree}
          {...baseOptions}
          nav={{ ...baseOptions.nav, enabled: false }}
        >
          {children}
        </DocsLayout>
      </div>
    </>
  );
}
