"use client";

import { useRef, useState } from "react";

export type CarouselVariant =
  | "center"
  | "stack"
  | "coverflow"
  | "horizontal-expand"
  | "vertical-expand"
  | "filmstrip"
  | "radial"
  | "masonry";

const slides = [
  { title: "ROSE", label: "No. 23", tone: "blue" },
  { title: "BLACK", label: "Forever dreaming", tone: "ink" },
  { title: "MOTION", label: "New perspectives", tone: "red" },
  { title: "FORM", label: "A quiet study", tone: "green" },
  { title: "NIGHT", label: "The light between", tone: "paper" },
  { title: "TYPE", label: "Editorial notes", tone: "violet" },
];

export default function CarouselsPreview({
  variant = "center",
  size = "compact",
}: {
  variant?: CarouselVariant;
  size?: "compact" | "large";
}) {
  const [active, setActive] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [hoveredSlide, setHoveredSlide] = useState<number | null>(null);
  const dragStart = useRef<number | null>(null);
  const draggedSlide = useRef<number | null>(null);
  const move = (step: number) =>
    setActive((value) => (value + step + slides.length) % slides.length);
  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const slide = (event.target as HTMLElement).closest<HTMLElement>(
      "[data-carousel-slide]",
    );
    if (!slide) return;
    dragStart.current = event.clientX;
    draggedSlide.current = Number(slide.dataset.carouselSlide);
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStart.current === null || draggedSlide.current === null) return;
    setDragOffset(
      Math.max(-120, Math.min(120, event.clientX - dragStart.current)),
    );
  };
  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (
      dragStart.current !== null &&
      draggedSlide.current !== null &&
      Math.abs(event.clientX - dragStart.current) > 32
    ) {
      move(event.clientX < dragStart.current ? 1 : -1);
    }
    dragStart.current = null;
    draggedSlide.current = null;
    setIsDragging(false);
    setDragOffset(0);
  };
  const distanceFromActive = (index: number) => {
    const raw = (index - active + slides.length) % slides.length;
    return raw > slides.length / 2 ? raw - slides.length : raw;
  };
  return (
    <div
      className={`carousel-preview carousel-preview--${variant} carousel-preview--${size}${isDragging ? " is-dragging" : ""}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      role="region"
      aria-label={`${variant} carousel preview`}
    >
      <div className="carousel-preview__stage">
        {slides.map((slide, index) => {
          const distance = distanceFromActive(index);
          return (
            <article
              className={`carousel-preview__slide carousel-preview__slide--${slide.tone}`}
              key={slide.title}
              data-carousel-slide={index}
              style={getSlideStyle(
                variant,
                distance,
                hoveredSlide === index,
                hoveredSlide !== null,
                draggedSlide.current === index ? dragOffset : 0,
                isDragging,
              )}
              onMouseEnter={() => setHoveredSlide(index)}
              onMouseLeave={() => setHoveredSlide(null)}
              aria-hidden={
                variant !== "horizontal-expand" &&
                variant !== "vertical-expand" &&
                Math.abs(distance) > 2
              }
            >
              <img
                className="carousel-preview__image"
                src={`/Images/Image${index + 1}.jpg`}
                alt={`${slide.title} editorial artwork`}
                draggable={false}
              />
              <span className="carousel-preview__copy">{slide.label}</span>
              <strong className="carousel-preview__copy">{slide.title}</strong>
              <small className="carousel-preview__copy">DRAG TO EXPLORE</small>
            </article>
          );
        })}
      </div>
      <div
        className="carousel-preview__controls"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => move(-1)}
          aria-label="Previous slide"
        >
          ←
        </button>
        <div className="carousel-preview__dots">
          {slides.map((slide, index) => (
            <button
              type="button"
              key={slide.title}
              aria-label={`Go to ${slide.title}`}
              aria-current={index === active}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
        <button type="button" onClick={() => move(1)} aria-label="Next slide">
          →
        </button>
      </div>
      <style>{styles + imageStyles}</style>
    </div>
  );
}

function getSlideStyle(
  variant: CarouselVariant,
  distance: number,
  isHovered = false,
  hasHoveredSlide = false,
  dragOffset = 0,
  isDragging = false,
): React.CSSProperties {
  const style = getBaseSlideStyle(
    variant,
    distance,
    isHovered,
    hasHoveredSlide,
  );
  if (!dragOffset) return style;
  return {
    ...style,
    transform: `${style.transform} translateX(${dragOffset}px)`,
    transition: isDragging ? "none" : "transform .48s cubic-bezier(.16,1,.3,1)",
  };
}

function getBaseSlideStyle(
  variant: CarouselVariant,
  distance: number,
  isHovered = false,
  hasHoveredSlide = false,
): React.CSSProperties {
  if (variant === "stack")
    return {
      transform: `translate(-50%, -50%) translate(${distance * 26}px, ${Math.abs(distance) * 7}px) rotate(${distance * 5}deg) scale(${1 - Math.abs(distance) * 0.07})`,
      zIndex: 10 - Math.abs(distance),
      opacity: Math.abs(distance) > 2 ? 0 : 1,
    };
  if (variant === "coverflow")
    return {
      transform: `translate(-50%, -50%) translateX(${distance * 125}px) rotateY(${distance * -34}deg) scale(${distance === 0 ? 1 : 0.8})`,
      zIndex: 10 - Math.abs(distance),
      opacity: Math.abs(distance) > 2 ? 0 : distance === 0 ? 1 : 0.65,
    };
  if (variant === "horizontal-expand")
    return {
      left: `calc(50% + ${railPosition(distance, hasHoveredSlide ? 38 : 10, hasHoveredSlide ? 9.5 : 10, 0.5)}%)`,
      transform: "translate(-50%, -50%)",
      width: isHovered ? "38%" : hasHoveredSlide ? "9.5%" : "10%",
      borderRadius: "28px",
      zIndex: 10 - Math.abs(distance),
      opacity: 1,
    };
  if (variant === "vertical-expand")
    return {
      top: `calc(50% + ${railPosition(distance, hasHoveredSlide ? 58 : 10, hasHoveredSlide ? 5 : 10, 0.5)}%)`,
      transform: "translate(-50%, -50%)",
      height: isHovered ? "58%" : hasHoveredSlide ? "5%" : "10%",
      borderRadius: "28px",
      zIndex: 10 - Math.abs(distance),
      opacity: 1,
    };
  if (variant === "filmstrip")
    return {
      transform: `translate(-50%, -50%) translateX(${distance * 112}px) scale(${distance === 0 ? 1 : 0.84})`,
      zIndex: 10 - Math.abs(distance),
      opacity: Math.abs(distance) > 3 ? 0 : distance === 0 ? 1 : 0.8,
    };
  if (variant === "radial")
    return {
      transform: `translate(-50%, -50%) rotate(${distance * 18}deg) translateX(${distance * 86}px) rotate(${distance * -18}deg) scale(${distance === 0 ? 1 : 0.82})`,
      zIndex: 10 - Math.abs(distance),
      opacity: Math.abs(distance) > 2 ? 0 : distance === 0 ? 1 : 0.72,
    };
  if (variant === "masonry")
    return {
      transform: `translate(-50%, -50%) translate(${distance * 105}px, ${(Math.abs(distance) % 2) * 22}px) scale(${distance === 0 ? 1 : 0.84})`,
      width: distance === 0 ? "38%" : "24%",
      height: distance === 0 ? "72%" : "52%",
      zIndex: 10 - Math.abs(distance),
      opacity: Math.abs(distance) > 2 ? 0 : distance === 0 ? 1 : 0.78,
    };
  return {
    transform: `translate(-50%, -50%) translateX(${distance * 115}px) scale(${distance === 0 ? 1 : 0.82})`,
    zIndex: 10 - Math.abs(distance),
    opacity: Math.abs(distance) > 2 ? 0 : distance === 0 ? 1 : 0.7,
  };
}

function railPosition(
  distance: number,
  expandedSize: number,
  compactSize: number,
  gap: number,
) {
  if (distance === 0) return 0;
  const direction = distance < 0 ? -1 : 1;
  const steps = Math.abs(distance);
  return (
    direction *
    (expandedSize / 2 +
      gap +
      (steps - 1) * (compactSize + gap) +
      compactSize / 2)
  );
}

const styles = `.carousel-preview{position:relative;width:100%;height:330px;overflow:hidden;border-radius:18px;background:var(--color-surface,#111);color:#fff;touch-action:pan-y;user-select:none;cursor:grab}.carousel-preview--large{height:560px}.carousel-preview.is-dragging{cursor:grabbing}.carousel-preview__stage{position:absolute;inset:0;perspective:900px}.carousel-preview__slide{position:absolute;left:50%;top:50%;display:flex;width:34%;height:72%;flex-direction:column;justify-content:space-between;overflow:hidden;border-radius:18px;padding:18px;box-shadow:0 20px 45px rgba(0,0,0,.25);transition:transform .62s cubic-bezier(.16,1,.3,1),left .62s cubic-bezier(.16,1,.3,1),top .62s cubic-bezier(.16,1,.3,1),width .62s cubic-bezier(.16,1,.3,1),height .62s cubic-bezier(.16,1,.3,1),opacity .42s ease;will-change:transform,left,top,width,height}.carousel-preview__slide span,.carousel-preview__slide small{font:600 9px/1 system-ui;letter-spacing:.16em;text-transform:uppercase;opacity:.72}.carousel-preview__slide strong{font:italic 42px/.8 Georgia,serif;letter-spacing:-.08em}.carousel-preview__slide--blue{background:#1746b5;color:#f8fbff}.carousel-preview__slide--ink{background:#090909;color:#f3f0e9}.carousel-preview__slide--red{background:#ed3028;color:#17110f}.carousel-preview__slide--green{background:#243a12;color:#d9e98e}.carousel-preview__slide--paper{background:#deddd8;color:#1e1e1e}.carousel-preview__slide--violet{background:#5f4c91;color:#fff}.carousel-preview__controls{position:absolute;bottom:12px;left:50%;z-index:20;display:flex;align-items:center;gap:12px;transform:translateX(-50%)}.carousel-preview__controls>button{display:grid;height:25px;width:25px;place-items:center;border:1px solid rgba(255,255,255,.2);border-radius:50%;background:rgba(0,0,0,.25);color:inherit;cursor:pointer}.carousel-preview__dots{display:flex;gap:5px}.carousel-preview__dots button{height:6px;width:6px;border:0;border-radius:50%;background:rgba(255,255,255,.35);cursor:pointer;transition:transform .25s,background .25s}.carousel-preview__dots button[aria-current=true]{background:var(--color-accent-primary,#a5ff75);transform:scale(1.5)}.carousel-preview--coverflow .carousel-preview__slide{transform-style:preserve-3d}.carousel-preview--horizontal-expand .carousel-preview__slide{width:16%;padding:14px}.carousel-preview--horizontal-expand .carousel-preview__slide strong{font-size:24px}.carousel-preview--vertical-expand .carousel-preview__slide{height:18%;padding:13px}.carousel-preview--vertical-expand .carousel-preview__slide strong{font-size:28px}.carousel-preview--filmstrip .carousel-preview__slide{border-radius:10px}.carousel-preview--filmstrip .carousel-preview__slide strong{font-size:32px}.carousel-preview--large .carousel-preview__slide{padding:24px}.carousel-preview--large .carousel-preview__slide strong{font-size:58px}.carousel-preview--large.carousel-preview--vertical-expand{height:700px}@media (max-width:640px){.carousel-preview--large{height:440px}.carousel-preview--large.carousel-preview--vertical-expand{height:560px}.carousel-preview__slide{width:48%}.carousel-preview__slide strong{font-size:34px}.carousel-preview--horizontal-expand .carousel-preview__slide{width:18%}}`;

const imageStyles = `.carousel-preview__image{position:absolute;inset:0;height:100%;width:100%;object-fit:cover;filter:saturate(.92);transition:transform .7s cubic-bezier(.16,1,.3,1),filter .4s ease}.carousel-preview__slide::after{position:absolute;inset:0;z-index:1;background:linear-gradient(180deg,rgba(0,0,0,.04),rgba(0,0,0,.48));content:""}.carousel-preview__copy{position:relative;z-index:2;text-shadow:0 2px 14px rgba(0,0,0,.55)}.carousel-preview__slide:hover .carousel-preview__image{transform:scale(1.06);filter:saturate(1.08)}.carousel-preview--radial .carousel-preview__slide{border-radius:50%;padding:22px}.carousel-preview--masonry .carousel-preview__slide{border-radius:12px}`;
