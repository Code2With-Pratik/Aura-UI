import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Gallery, { type Variant } from "./Gallery";

export const metadata: Metadata = {
  title: "Footer — Aura UI",
  description: "Six footer layout variants, ready to drop in.",
};

const NAMES = [
  "Minimal Brand",
  "Studio Grid",
  "Glass Social",
  "Newsletter CTA",
  "Compact Brand",
  "Launchpad Split",
];

async function loadVariants(): Promise<Variant[]> {
  const dir = path.join(process.cwd(), "app", "(site)", "components", "Footer");

  return Promise.all(
    Array.from({ length: 6 }, async (_, i) => {
      const fileName = `Footer${i + 1}.tsx`;
      const code = fs.readFileSync(path.join(dir, fileName), "utf8");
      const snippet = `import Footer${i + 1} from "@/app/(site)/components/Footer/Footer${i + 1}";\n\nexport default function Demo() {\n  return <Footer${i + 1} />;\n}`;

      return {
        id: i + 1,
        name: NAMES[i],
        fileName,
        componentName: `Footer${i + 1}`,
        code,
        highlightedCode: code,
        highlightedSnippet: snippet,
      };
    }),
  );
}

export default async function FooterCategoryPage() {
  const variants = await loadVariants();
  return <Gallery slug="Footer" title="Footer" variants={variants} />;
}
