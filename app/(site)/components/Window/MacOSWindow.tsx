"use client";
import WindowPreview from "./WindowPreview";
export default function MacOSWindow({
  compact = false,
}: {
  compact?: boolean;
}) {
  return <WindowPreview kind="macos" compact={compact} />;
}
