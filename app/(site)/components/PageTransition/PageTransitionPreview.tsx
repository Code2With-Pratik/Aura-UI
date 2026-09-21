"use client";

import { useState } from "react";

export type Direction =
  "vertical" | "horizontal" | "split" | "diagonal" | "radial" | "curtain";
const pages = [
  ["Welcome", "A calm entrance for product surfaces."],
  ["Explore", "Move between states without losing context."],
  ["Create", "Finish with a focused call to action."],
];

export default function PageTransitionPreview({
  initialDirection = "vertical",
  showControls = true,
  showDirectionControls = true,
}: {
  initialDirection?: Direction;
  showControls?: boolean;
  showDirectionControls?: boolean;
}) {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState<Direction>(initialDirection);
  const [run, setRun] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const runTransition = (afterCover?: () => void) => {
    setRun((value) => value + 1);
    setIsTransitioning(true);
    window.setTimeout(() => afterCover?.(), 360);
    window.setTimeout(() => setIsTransitioning(false), 1050);
  };
  const next = () => {
    runTransition(() => setPage((value) => (value + 1) % pages.length));
  };
  const chooseDirection = (value: Direction) => {
    setDirection(value);
    runTransition();
  };
  return (
    <div
      className={`page-transition-preview page-transition-preview--${direction}`}
    >
      <div className="page-transition-preview__content" key={`${page}-${run}`}>
        <small>SKIPPER TRANSITION {String(page + 1).padStart(2, "0")}</small>
        <strong>{pages[page][0]}</strong>
        <p>{pages[page][1]}</p>
        {showControls && (
          <div className="page-transition-preview__actions">
            <button
              type="button"
              className="next"
              onClick={() => runTransition()}
            >
              Show animation <span>↗</span>
            </button>
            {showDirectionControls && (
              <>
                <button
                  type="button"
                  onClick={() => chooseDirection("vertical")}
                  aria-pressed={direction === "vertical"}
                >
                  Vertical ladder
                </button>
                <button
                  type="button"
                  onClick={() => chooseDirection("horizontal")}
                  aria-pressed={direction === "horizontal"}
                >
                  Horizontal ladder
                </button>
                <button
                  type="button"
                  onClick={() => chooseDirection("split")}
                  aria-pressed={direction === "split"}
                >
                  Split left / right
                </button>
              </>
            )}
            <button type="button" className="next" onClick={next}>
              Next view <span>↗</span>
            </button>
          </div>
        )}
      </div>
      {isTransitioning && (
        <div
          className={`page-transition-preview__full-ladder page-transition-preview__full-ladder--${direction}`}
          key={`ladder-${run}`}
          aria-hidden="true"
        >
          {Array.from({ length: 6 }, (_, index) => (
            <i key={index} style={{ "--i": index } as React.CSSProperties} />
          ))}
        </div>
      )}
      <style
        dangerouslySetInnerHTML={{
          __html: styles + fullScreenStyles + diagonalCoverageStyles,
        }}
      />
    </div>
  );
}

const styles = `.page-transition-preview{position:relative;display:grid;min-height:260px;width:min(100%,520px);place-items:center;overflow:hidden;border:0;border-radius:16px;background:radial-gradient(circle at 75% 20%,rgba(165,255,117,.2),transparent 45%),#111;color:#fff}.page-transition-preview__content{position:relative;z-index:2;display:flex;width:100%;flex-direction:column;align-items:flex-start;padding:30px;animation:skipper-content-in .7s cubic-bezier(.22,1,.36,1) both}.page-transition-preview__content small{color:#a5ff75;font-size:9px;letter-spacing:.2em}.page-transition-preview__content strong{margin-top:12px;font:italic 38px/1 Georgia,serif}.page-transition-preview__content p{max-width:250px;margin:12px 0 18px;color:#9ca3af}.page-transition-preview__actions{display:flex;flex-wrap:wrap;gap:6px}.page-transition-preview button{border:1px solid rgba(255,255,255,.22);border-radius:999px;padding:7px 10px;color:#aeb7c4;background:rgba(255,255,255,.06);cursor:pointer;font:10px/1 system-ui;transition:background .2s,color .2s,transform .2s}.page-transition-preview button:hover,.page-transition-preview button[aria-pressed=true]{color:#fff;background:rgba(165,255,117,.18);transform:translateY(-1px)}.page-transition-preview button.next{color:#111;background:#a5ff75;border-color:#a5ff75;font-weight:700}.page-transition-preview button span{margin-left:5px}.page-transition-preview__ladder{position:absolute;z-index:1;inset:0;display:flex;pointer-events:none}.page-transition-preview__ladder i{flex:1;background:var(--color-accent-primary,#a5ff75);transform:scaleY(0);transform-origin:bottom;animation:skipper-vertical .85s cubic-bezier(.76,0,.24,1) calc(var(--i)*35ms) both}.page-transition-preview--horizontal .page-transition-preview__ladder{flex-direction:column}.page-transition-preview--horizontal .page-transition-preview__ladder i{width:100%;height:auto;transform:scaleX(0);transform-origin:left;animation-name:skipper-horizontal}.page-transition-preview--horizontal .page-transition-preview__content{animation-name:skipper-content-horizontal}@keyframes skipper-vertical{0%{transform:scaleY(1)}55%{transform:scaleY(1)}100%{transform:scaleY(0)}}@keyframes skipper-horizontal{0%{transform:scaleX(1)}55%{transform:scaleX(1)}100%{transform:scaleX(0)}}@keyframes skipper-content-in{0%{opacity:0;transform:translateY(20px);filter:blur(8px)}100%{opacity:1;transform:none;filter:none}}@keyframes skipper-content-horizontal{0%{opacity:0;transform:translateX(20px);filter:blur(8px)}100%{opacity:1;transform:none;filter:none}}`;

const fullScreenStyles = `.page-transition-preview__full-ladder{position:fixed;z-index:9999;inset:0;display:flex;gap:0;pointer-events:auto;background:var(--color-surface,#111);border:0;outline:0;box-shadow:none}.page-transition-preview__full-ladder i{flex:1;border:0;outline:0;background:var(--color-accent-primary,#a5ff75);transform:scaleY(0);transform-origin:bottom;animation:skipper-vertical 1s cubic-bezier(.76,0,.24,1) calc(var(--i)*55ms) both}.page-transition-preview__full-ladder--horizontal{flex-direction:column}.page-transition-preview__full-ladder--horizontal i{width:100%;height:auto;transform:scaleX(0);transform-origin:left;animation-name:skipper-horizontal}.page-transition-preview__full-ladder--split{display:block}.page-transition-preview__full-ladder--split i{position:absolute;width:50%;height:33.3333%;flex:none;transform:translateX(0);animation-duration:1s}.page-transition-preview__full-ladder--split i:nth-child(-n+3){left:0;top:calc(var(--i)*33.3333%);animation-name:skipper-split-left}.page-transition-preview__full-ladder--split i:nth-child(n+4){right:0;top:calc((var(--i) - 3)*33.3333%);animation-name:skipper-split-right}.page-transition-preview__full-ladder--diagonal i{transform:skewX(-18deg) scaleY(1);transform-origin:bottom;animation-name:skipper-diagonal}.page-transition-preview__full-ladder--radial{display:grid;place-items:center}.page-transition-preview__full-ladder--radial i{position:absolute;inset:0;transform:scale(1);animation-name:skipper-radial}.page-transition-preview__full-ladder--curtain{display:block}.page-transition-preview__full-ladder--curtain i{position:absolute;width:100%;height:16.6667%;transform:translateX(0);animation-name:skipper-curtain-left}.page-transition-preview__full-ladder--curtain i:nth-child(1){top:0}.page-transition-preview__full-ladder--curtain i:nth-child(2){top:16.6667%;animation-name:skipper-curtain-right}.page-transition-preview__full-ladder--curtain i:nth-child(3){top:33.3333%}.page-transition-preview__full-ladder--curtain i:nth-child(4){top:50%;animation-name:skipper-curtain-right}.page-transition-preview__full-ladder--curtain i:nth-child(5){top:66.6667%}.page-transition-preview__full-ladder--curtain i:nth-child(6){top:83.3333%;animation-name:skipper-curtain-right}@keyframes skipper-split-left{to{transform:translateX(-100%)}}@keyframes skipper-split-right{to{transform:translateX(100%)}}@keyframes skipper-diagonal{to{transform:skewX(-18deg) translateY(-110%)}}@keyframes skipper-radial{to{transform:scale(0);opacity:0;border-radius:50%}}@keyframes skipper-curtain-left{to{transform:translateX(-100%)}}@keyframes skipper-curtain-right{to{transform:translateX(100%)}}`;

const diagonalCoverageStyles = `.page-transition-preview__full-ladder--diagonal{overflow:hidden}.page-transition-preview__full-ladder--diagonal i{flex:0 0 22%;height:120%;margin-top:-10%}`;
