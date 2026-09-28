import { NextResponse } from "next/server";
import { fontBySlug } from "@/lib/fonts/registry";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const segments = (await params).slug;
  const slug = segments.join("/").replace(/\.css$/, "");
  const font = fontBySlug(slug);

  if (!font) {
    return new NextResponse("/* Font not found */", { status: 404 });
  }

  const origin = process.env.NEXT_PUBLIC_SITE_URL || "https://aura-ui-os.vercel.app";
  const css = font.files
    .map(
      (file) =>
        `@font-face { font-family: "${font.name}"; src: url("${new URL(file.url, origin)}") format("woff2"); font-weight: ${file.variable ? file.weightRange : file.weight}; font-style: ${file.style}; font-display: swap; }`,
    )
    .join("\n");

  return new NextResponse(`${css}\n:root { --font-${font.slug}: "${font.name}"; }`, {
    headers: {
      "Content-Type": "text/css; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600, s-maxage=31536000, immutable",
    },
  });
}
