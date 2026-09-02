import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/page";

const components = {
  Buttons: { name: "Buttons", source: "Buttons", available: true },
  Input: { name: "Inputs", source: "Input", available: true },
  CheckBoxs: { name: "Checkboxes", source: "CheckBoxs", available: true },
  Cards: { name: "Cards", source: "Cards", available: true },
  Badges: { name: "Badges", source: "Badges", available: true },
  Loaders: { name: "Loaders", source: "Loaders", available: true },
  ThemeToggle: { name: "Theme Toggle", source: "ThemeToggle", available: true },
  Tables: { name: "Tables", source: "Tables", available: false },
  Footer: { name: "Footer", source: "Footer", available: true },
  Dock: { name: "Dock", source: "Dock", available: false },
  MockUp: { name: "Mockup", source: "MockUp", available: false },
  Navbar: { name: "Navbar", source: "Navbar", available: false },
  PageTransition: { name: "Page Transition", source: "PageTransition", available: false },
  AvatarStack: { name: "Avatar Stack", source: "AvatarStack", available: false },
  Progress: { name: "Progress", source: "Progress", available: false },
  Spotlight: { name: "Spotlight", source: "Spotlight", available: false },
  Toast: { name: "Toast", source: "Toast", available: false },
  Tooltip: { name: "Tooltip", source: "Tooltip", available: false },
  Window: { name: "Window", source: "Window", available: false },
} as const;

type ComponentSlug = keyof typeof components;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ component: string }>;
}): Promise<Metadata> {
  const { component } = await params;
  const entry = components[component as ComponentSlug];
  return entry ? { title: `${entry.name} - Aura UI`, description: `${entry.name} installation, usage, and preview.` } : {};
}

export default async function ComponentDocsPage({
  params,
}: {
  params: Promise<{ component: string }>;
}) {
  const { component } = await params;
  const entry = components[component as ComponentSlug];
  if (!entry) notFound();

  const importName = entry.source === "CheckBoxs" ? "Checkbox1" : `${entry.source}1`;
  const installCommand = `npx aura-ui add ${entry.source}`;

  return (
    <DocsPage>
      <Link href="/docs/components" className="mb-6 inline-flex items-center gap-1.5 text-sm text-fd-muted-foreground hover:text-fd-foreground">
        <ArrowLeft className="h-4 w-4" /> Components
      </Link>
      <DocsTitle>{entry.name}</DocsTitle>
      <DocsDescription>{entry.name} installation, usage, and preview.</DocsDescription>
      <DocsBody>
        <section className="aura-card mb-6 p-5">
          <h2 className="mb-3 text-lg font-medium text-fg">Installation</h2>
          <pre className="overflow-x-auto rounded-lg border border-border-default bg-surface-elevated p-4 font-mono text-sm text-fg"><code>{installCommand}</code></pre>
        </section>

        <section className="aura-card mb-6 p-5">
          <h2 className="mb-3 text-lg font-medium text-fg">Preview</h2>
          {entry.available ? (
            <iframe title={`${entry.name} preview`} src={`/components/${entry.source}`} className="h-[620px] w-full rounded-lg border border-border-default bg-surface" />
          ) : (
            <div className="grid min-h-40 place-items-center rounded-lg border border-border-default bg-surface p-6 text-center text-fg-muted">Preview coming soon.</div>
          )}
        </section>

        <section className="aura-card p-5">
          <h2 className="mb-3 text-lg font-medium text-fg">How to use</h2>
          <pre className="overflow-x-auto rounded-lg border border-border-default bg-surface-elevated p-4 font-mono text-sm text-fg"><code>{`import ${importName} from "@/components/${entry.source}/${importName}";\n\nexport default function Example() {\n  return <${importName} />;\n}`}</code></pre>
        </section>
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return Object.keys(components).map((component) => ({ component }));
}