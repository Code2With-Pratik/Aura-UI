import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { codeToHtml } from "shiki";
import Gallery from "./Gallery";

export const metadata: Metadata = {
  title: "Mockups — Aura UI",
  description: "Responsive iOS, macOS, iPad, and MacBook mockup components.",
};

const sources = [
  ["ios", "iOS Mobile", "IOSMockup.tsx", "npx aura-ui add ios-mockup"],
  [
    "macos",
    "macOS Laptop",
    "MacOSLaptopMockup.tsx",
    "npx aura-ui add macos-laptop-mockup",
  ],
  ["ipad", "iPad", "IPadMockup.tsx", "npx aura-ui add ipad-mockup"],
  [
    "macbook",
    "MacBook Pro",
    "MacBookMockup.tsx",
    "npx aura-ui add macbook-mockup",
  ],
] as const;

export default async function MockUpCategoryPage() {
  const dir = path.join(process.cwd(), "app", "(site)", "components", "MockUp");
  const variants = await Promise.all(
    sources.map(async ([id, name, fileName, install]) => {
      const code = fs.readFileSync(path.join(dir, fileName), "utf8");
      const componentName = fileName.replace(".tsx", "");
      const snippet = `import ${componentName} from "@/app/(site)/components/MockUp/${componentName}";\n\nexport default function Demo() {\n  return <${componentName} />;\n}`;
      return {
        id,
        name,
        fileName,
        install,
        code,
        highlightedCode: await codeToHtml(code, {
          lang: "tsx",
          theme: "github-dark",
        }),
        highlightedSnippet: await codeToHtml(snippet, {
          lang: "tsx",
          theme: "github-dark",
        }),
      };
    }),
  );
  return <Gallery variants={variants} />;
}
