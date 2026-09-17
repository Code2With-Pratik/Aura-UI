import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import { codeToHtml } from "shiki";
import Gallery, { type Variant } from "./Gallery";

export const metadata: Metadata = {
  title: "Tables — Aura UI",
  description: "Premium responsive data tables for dashboards and apps.",
};

export default async function TablesCategoryPage() {
  const dir = path.join(process.cwd(), "app", "(site)", "components", "Tables");
  const files = [
    "Table1.tsx",
    "Table2.tsx",
    "Table3.tsx",
    "Table4.tsx",
    "Table5.tsx",
    "Table6.tsx",
  ];
  const names = [
    "Team members",
    "Projects",
    "Billing",
    "Inventory",
    "Tasks",
    "Analytics",
  ];
  const variants: Variant[] = await Promise.all(
    files.map(async (fileName, index) => {
      const code = fs.readFileSync(path.join(dir, fileName), "utf8");
      return {
        id: index + 1,
        name: names[index],
        fileName,
        code,
        highlightedCode: await codeToHtml(code, {
          lang: "tsx",
          theme: "github-dark",
        }),
        install: `npx aura-ui add table-${index + 1}`,
      };
    }),
  );
  return <Gallery variants={variants} />;
}
