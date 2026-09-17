"use client";
import WindowPreview from "./WindowPreview";
export default function WindowsWindow({
  compact = false,
}: {
  compact?: boolean;
}) {
  return <WindowPreview kind="windows" compact={compact} />;
}
