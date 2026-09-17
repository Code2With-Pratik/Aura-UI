"use client";
import { useState } from "react";
import { Maximize2, Minus, X } from "lucide-react";

const DEFAULT_VIDEO = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
const DEFAULT_IMAGE = "/window-desktop.svg";
function embed(value: string) {
  try {
    const url = new URL(value.trim());
    let id = url.searchParams.get("v");
    if (url.hostname === "youtu.be") id = url.pathname.slice(1);
    if (url.pathname.startsWith("/shorts/")) id = url.pathname.split("/")[2];
    if (url.pathname.startsWith("/embed/")) id = url.pathname.split("/")[2];
    return id ? `https://www.youtube.com/embed/${id}` : null;
  } catch {
    return null;
  }
}
export default function WindowPreview({
  kind,
  compact = false,
}: {
  kind: "windows" | "macos";
  compact?: boolean;
}) {
  const mac = kind === "macos";
  const [video, setVideo] = useState(DEFAULT_VIDEO);
  const [image, setImage] = useState(DEFAULT_IMAGE);
  const [submittedVideo, setSubmittedVideo] = useState(DEFAULT_VIDEO);
  const [submittedImage, setSubmittedImage] = useState(DEFAULT_IMAGE);
  const videoUrl = embed(submittedVideo);
  return (
    <div
      className={`relative overflow-hidden rounded-[18px] border border-white/10 bg-[#0d0f0d] shadow-[0_30px_80px_-30px_rgba(0,0,0,.9)] ${compact ? "mx-auto max-w-[820px]" : "w-full"}`}
    >
      <div
        className={`relative flex h-11 items-center border-b border-white/10 px-4 ${mac ? "bg-[#202020]" : "bg-[#191b1d]"}`}
      >
        {!mac && (
          <div className="mr-3 grid h-5 w-5 grid-cols-2 gap-0.5 rounded bg-[#2d8cff] p-1">
            <i className="bg-white/90" />
            <i className="bg-white/90" />
            <i className="bg-white/90" />
            <i className="bg-white/90" />
          </div>
        )}
        {mac ? (
          <div className="flex items-center gap-1.5">
            <i className="grid h-2.5 w-2.5 place-items-center rounded-full bg-[#ff5f57]">
              <X className="h-1.5 w-1.5 text-black/60" />
            </i>
            <i className="grid h-2.5 w-2.5 place-items-center rounded-full bg-[#febc2e]">
              <Minus className="h-1.5 w-1.5 text-black/60" />
            </i>
            <i className="grid h-2.5 w-2.5 place-items-center rounded-full bg-[#28c840]">
              <Maximize2 className="h-1.5 w-1.5 text-black/60" />
            </i>
          </div>
        ) : (
          <div className="ml-auto flex items-center gap-4">
            <Minus className="h-3 w-3 text-fg-muted" />
            <Maximize2 className="h-3 w-3 text-fg-muted" />
            <X className="h-3 w-3 text-fg-muted" />
          </div>
        )}
        <span className="pointer-events-none absolute inset-x-0 text-center font-mono text-[10px] text-white/45">
          {mac ? "Aura Preview" : "Aura — Video window"}
        </span>
      </div>
      <div
        className={`relative aspect-video bg-cover bg-center p-3 sm:p-4 ${mac ? "bg-[url('/macos-wallpaper.svg')]" : "bg-[url('/windows-wallpaper.svg')]"}`}
        style={{ backgroundImage: `url("${submittedImage || DEFAULT_IMAGE}")` }}
      >
        <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-white/15 bg-black/35 shadow-2xl backdrop-blur-sm">
          <div className="flex items-center gap-2 border-b border-white/10 bg-black/25 px-3 py-2">
            <span className="truncate font-mono text-[9px] text-white/45">
              {submittedImage || "image-url"}
            </span>
          </div>
          <div className="min-h-0 flex-1 bg-black">
            {videoUrl ? (
              <iframe
                title={`${mac ? "macOS" : "Windows"} YouTube preview`}
                src={videoUrl}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div className="grid h-full place-items-center text-[11px] text-white/55">
                Paste a valid YouTube URL below.
              </div>
            )}
          </div>
        </div>
      </div>
      {!compact && (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSubmittedVideo(video);
            setSubmittedImage(image);
          }}
          className="grid gap-2 border-t border-white/10 bg-[#111311] p-3 sm:grid-cols-[1fr_1fr_auto]"
        >
          <input
            value={video}
            onChange={(event) => setVideo(event.target.value)}
            aria-label="YouTube URL"
            placeholder="YouTube URL"
            className="min-w-0 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 font-mono text-[10px] text-white/80 outline-none placeholder:text-white/30 focus:border-[#b8ff57]/70"
          />
          <input
            value={image}
            onChange={(event) => setImage(event.target.value)}
            aria-label="Image URL"
            placeholder="Image URL"
            className="min-w-0 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 font-mono text-[10px] text-white/80 outline-none placeholder:text-white/30 focus:border-[#b8ff57]/70"
          />
          <button
            type="submit"
            className="rounded-lg bg-[#b8ff57] px-3 py-2 text-[10px] font-semibold text-black"
          >
            Preview
          </button>
        </form>
      )}
    </div>
  );
}
