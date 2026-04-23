import { docs } from "@/.source";
import { loader } from "fumadocs-core/source";

/**
 * Bridges a version mismatch between the installed fumadocs packages:
 *
 *   - fumadocs-mdx@11.10 returns `{ files: () => VirtualFile[] }` from
 *     `toFumadocsSource()` (legacy callable form)
 *   - fumadocs-core@15.8 expects `{ files: VirtualFile[] }` (array form)
 *
 * We capture the original typed return value so the proper SourceConfig
 * (with `body`, `toc`, `full` etc. on `pageData`) flows through to the
 * loader — then we just normalise `files` from a function to an array.
 */
const mdx = docs.toFumadocsSource();
type MdxSource = typeof mdx;

const filesValue = (mdx as unknown as { files: unknown }).files;
const filesArray =
  typeof filesValue === "function"
    ? (filesValue as () => unknown[])()
    : (filesValue as unknown[]);

export const source = loader({
  baseUrl: "/docs",
  /* Cast back to the captured MdxSource type so loader picks up the
     proper PageData (which includes `body`, `toc`, `full`) instead of
     falling back to the bare `PageData` interface from fumadocs-core. */
  source: { files: filesArray } as MdxSource,
});
