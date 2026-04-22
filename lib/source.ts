import { docs } from "@/.source";
import { loader } from "fumadocs-core/source";

/**
 * fumadocs-mdx@11.10 returns `{ files: () => [...] }` from `toFumadocsSource()`,
 * but fumadocs-core@15.8+ expects `files` to already be an array.
 * Normalize both shapes so loader() is happy.
 */
const mdx = docs.toFumadocsSource() as {
  files: (() => unknown[]) | unknown[];
};
const files = typeof mdx.files === "function" ? mdx.files() : mdx.files;

export const source = loader({
  baseUrl: "/docs",
  source: { files },
});
