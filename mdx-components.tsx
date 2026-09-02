import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import FrameworkSelector from "@/components/FrameworkSelector";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    FrameworkSelector,
    ...components,
  };
}
