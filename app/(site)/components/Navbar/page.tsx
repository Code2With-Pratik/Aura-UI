import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { codeToHtml } from "shiki";
import Gallery, { type Variant } from "./Gallery";

export const metadata: Metadata = {
  title: "Navbar — Aura UI",
};

export default async function NavbarCategoryPage() {
  const dir = path.join(process.cwd(), "app", "(site)", "components", "Navbar");
  const files = [
    "Navbar1.tsx",
    "Navbar2.tsx",
    "Navbar3.tsx",
    "Navbar4.tsx",
    "Navbar5.tsx",
    "Navbar6.tsx",
    "Navbar7.tsx",
    "Navbar8.tsx",
  ];
  const names = [
    "Apple Store",
    "macOS glass",
    "iOS glass",
    "Dashboard",
    "Floating pill",
    "Mega menu",
    "Fullscreen portfolio",
    "SmartCare",
  ];
  const variants: Variant[] = await Promise.all(
    files.map(async (fileName, index) => {
      const wrapperCode = fs.readFileSync(path.join(dir, fileName), "utf8");
      const componentCode = fs.readFileSync(
        path.join(dir, "NavbarPreview.tsx"),
        "utf8",
      );
      const code = `${wrapperCode}\n\n${componentCode}`;
      return {
        id: index + 1,
        name: names[index],
        fileName,
        code,
        highlightedCode: await codeToHtml(code, {
          lang: "tsx",
          theme: "github-dark",
        }),
        install: `npx aura-ui add navbar-${index + 1}`,
      };
    }),
  );
  return <Gallery variants={variants} />;
}
