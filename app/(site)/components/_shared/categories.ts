/* Order of component categories used by the bottom prev/next arrows.
   The slug is the folder name under /app/(site)/components and becomes
   the URL segment; the label is what we render to the user. */
export type Category = {
  slug: string;
  label: string;
};

export const CATEGORIES: Category[] = [
  { slug: "Buttons", label: "Buttons" },
  { slug: "Input", label: "Inputs" },
  { slug: "Cards", label: "Cards" },
  { slug: "Tables", label: "Tables" },
  { slug: "Footer", label: "Footer" },
  { slug: "Dock", label: "Dock" },
  { slug: "MockUp", label: "Mockup" },
  { slug: "Navbar", label: "Navbar" },
  { slug: "PageTransition", label: "Page Transition" },
];

export function getNeighbours(slug: string) {
  const idx = CATEGORIES.findIndex((c) => c.slug === slug);
  if (idx === -1) return { prev: null, next: null, current: null };
  return {
    current: CATEGORIES[idx],
    prev: idx > 0 ? CATEGORIES[idx - 1] : null,
    next: idx < CATEGORIES.length - 1 ? CATEGORIES[idx + 1] : null,
  };
}
