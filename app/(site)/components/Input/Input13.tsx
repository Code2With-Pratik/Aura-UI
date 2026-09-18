"use client";

import React, { useRef, useState } from "react";
import { Check, ImageUp, RotateCw, Upload, ZoomIn } from "lucide-react";

const FRAME_SIZE = 208;

export default function Input13() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOrigin, setDragOrigin] = useState({ x: 0, y: 0 });

  const selectFile = (file?: File) => {
    if (!file?.type.startsWith("image/")) return;
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setImageUrl(URL.createObjectURL(file));
    setResultUrl(null);
    setZoom(1);
    setRotation(0);
    setOffset({ x: 0, y: 0 });
  };

  const confirmImage = () => {
    if (!imageUrl) return;
    const image = new Image();
    image.onload = () => {
      const size = 320;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const context = canvas.getContext("2d");
      if (!context) return;
      const scale =
        Math.max(size / image.naturalWidth, size / image.naturalHeight) * zoom;
      context.save();
      context.beginPath();
      context.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      context.clip();
      context.translate(size / 2 + offset.x, size / 2 + offset.y);
      context.rotate((rotation * Math.PI) / 180);
      context.scale(scale, scale);
      context.drawImage(
        image,
        -image.naturalWidth / 2,
        -image.naturalHeight / 2,
      );
      context.restore();
      setResultUrl(canvas.toDataURL("image/png"));
    };
    image.src = imageUrl;
  };

  const reset = () => {
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setImageUrl(null);
    setResultUrl(null);
    setZoom(1);
    setRotation(0);
    setOffset({ x: 0, y: 0 });
  };

  if (resultUrl) {
    return (
      <div className="image-uploader image-uploader--result">
        <div className="image-uploader__result-wrap">
          <img src={resultUrl} alt="Cropped upload preview" />
          <span>
            <Check size={14} />
          </span>
        </div>
        <strong>Photo ready</strong>
        <small>Cropped and optimized for upload.</small>
        <button type="button" onClick={reset}>
          Choose another photo
        </button>
        <style dangerouslySetInnerHTML={{ __html: styles }} />
      </div>
    );
  }

  return (
    <div className="image-uploader">
      {!imageUrl ? (
        <>
          <button
            type="button"
            className="image-uploader__dropzone"
            onClick={() => inputRef.current?.click()}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              selectFile(event.dataTransfer.files[0]);
            }}
          >
            <span>
              <ImageUp size={20} />
            </span>
            <strong>Drag & drop an image</strong>
            <small>PNG, JPG, WEBP</small>
          </button>
          <input
            ref={inputRef}
            hidden
            type="file"
            accept="image/*"
            onChange={(event) => selectFile(event.target.files?.[0])}
          />
          <button
            type="button"
            className="image-uploader__outline"
            onClick={() => inputRef.current?.click()}
          >
            Browse image
          </button>
        </>
      ) : (
        <>
          <div
            className={`image-uploader__crop ${dragging ? "is-dragging" : ""}`}
            onPointerDown={(event) => {
              setDragging(true);
              setDragStart({ x: event.clientX, y: event.clientY });
              setDragOrigin(offset);
              event.currentTarget.setPointerCapture(event.pointerId);
            }}
            onPointerMove={(event) => {
              if (!dragging) return;
              setOffset({
                x: dragOrigin.x + event.clientX - dragStart.x,
                y: dragOrigin.y + event.clientY - dragStart.y,
              });
            }}
            onPointerUp={() => setDragging(false)}
            onPointerCancel={() => setDragging(false)}
          >
            <img
              src={imageUrl}
              alt="Crop preview"
              draggable={false}
              style={{
                transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px)) rotate(${rotation}deg) scale(${zoom})`,
              }}
            />
            <i />
          </div>
          <label className="image-uploader__slider">
            <ZoomIn size={15} />
            <input
              type="range"
              min="1"
              max="3"
              step="0.01"
              value={zoom}
              onChange={(event) => setZoom(Number(event.target.value))}
            />
          </label>
          <div className="image-uploader__actions">
            <button
              type="button"
              className="image-uploader__outline"
              onClick={() => setRotation((value) => (value + 90) % 360)}
            >
              <RotateCw size={14} /> Rotate
            </button>
            <div>
              <button
                type="button"
                className="image-uploader__ghost"
                onClick={reset}
              >
                Cancel
              </button>
              <button
                type="button"
                className="image-uploader__solid"
                onClick={confirmImage}
              >
                <Upload size={14} /> Use photo
              </button>
            </div>
          </div>
        </>
      )}
      <style dangerouslySetInnerHTML={{ __html: styles }} />
    </div>
  );
}

const styles = `
  .image-uploader { display:flex; width:100%; max-width:320px; flex-direction:column; align-items:center; gap:16px; color:var(--color-fg,#111827); font-family:inherit; }
  .image-uploader button { font:inherit; }
  .image-uploader__dropzone { width:208px; height:208px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; border:2px dashed color-mix(in srgb,var(--color-fg,#111827) 25%,transparent); border-radius:50%; background:color-mix(in srgb,var(--color-fg,#111827) 4%,transparent); color:inherit; cursor:pointer; transition:transform .2s,border-color .2s,background .2s; }
  .image-uploader__dropzone:hover { transform:scale(1.02); border-color:var(--color-accent-primary,#10b981); background:color-mix(in srgb,var(--color-accent-primary,#10b981) 8%,transparent); }
  .image-uploader__dropzone span { display:grid; place-items:center; width:40px; height:40px; border:1px dashed currentColor; border-radius:50%; opacity:.7; }
  .image-uploader small { font-size:11px; opacity:.6; }
  .image-uploader__outline,.image-uploader__ghost,.image-uploader__solid { display:inline-flex; align-items:center; gap:7px; border:0; border-radius:9px; padding:8px 12px; cursor:pointer; transition:transform .2s,filter .2s,background .2s; }
  .image-uploader__outline { border:1px solid color-mix(in srgb,var(--color-fg,#111827) 20%,transparent); background:transparent; color:inherit; }
  .image-uploader__outline:hover,.image-uploader__ghost:hover,.image-uploader__solid:hover { transform:translateY(-1px); filter:brightness(1.08); }
  .image-uploader__crop { position:relative; width:${FRAME_SIZE}px; height:${FRAME_SIZE}px; overflow:hidden; border:2px dashed color-mix(in srgb,var(--color-accent-primary,#10b981) 55%,transparent); border-radius:50%; background:color-mix(in srgb,var(--color-fg,#111827) 8%,transparent); cursor:grab; touch-action:none; }
  .image-uploader__crop.is-dragging { cursor:grabbing; }
  .image-uploader__crop img { position:absolute; left:50%; top:50%; max-width:none; user-select:none; pointer-events:none; transform-origin:center; }
  .image-uploader__crop i { position:absolute; inset:0; border-radius:50%; box-shadow:inset 0 0 0 1px rgba(255,255,255,.45); pointer-events:none; }
  .image-uploader__slider { display:flex; width:100%; align-items:center; gap:10px; }
  .image-uploader__slider input { width:100%; accent-color:var(--color-accent-primary,#10b981); }
  .image-uploader__actions { display:flex; width:100%; align-items:center; justify-content:space-between; gap:8px; }
  .image-uploader__actions > div { display:flex; gap:6px; }
  .image-uploader__ghost { background:transparent; color:inherit; opacity:.7; }
  .image-uploader__solid { background:var(--color-accent-primary,#10b981); color:#fff; }
  .image-uploader--result { text-align:center; }
  .image-uploader__result-wrap { position:relative; }
  .image-uploader__result-wrap img { width:146px; height:146px; object-fit:cover; border:1px solid color-mix(in srgb,var(--color-fg,#111827) 18%,transparent); border-radius:50%; }
  .image-uploader__result-wrap span { position:absolute; right:2px; bottom:4px; display:grid; place-items:center; width:28px; height:28px; border-radius:50%; background:#14b8a6; color:#fff; }
`;
