"use client";

import React from "react";

/**
 * SnakeAnimation
 *
 * Static visual layer:
 *   - 4 stacked cards (CodePen / HTML / CSS / JS)
 *   - 4 SVG line paths drawn as a dashed "snake" behind the cards.
 *
 * NO scroll trigger lives in this component. The parent (SnakeRail)
 * drives all animation from a single ScrollTrigger so the card translate
 * and the snake stroke-dashoffset stay perfectly in sync.
 *
 * All styles are class-scoped (.snake-*) so they don't leak into the
 * rest of the app, and the original custom HTML elements (`<cards>`,
 * `<card>`, etc.) are translated into divs.
 */
const SnakeAnimation: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`snake-root ${className ?? ""}`}>
      <style>{styles}</style>

      <main className="snake-main">
        <div className="snake-cards">
          {/* Card 1 — CodePen */}
          <div className="snake-card-wrapper">
            <div id="codepen" className="snake-card">
              <header>
                Elevate your web apps with the depth and motion of macOS.
              </header>
            </div>
          </div>

          {/* Card 2 — HTML */}
          <div className="snake-card-wrapper">
            <div id="html" className="snake-card">
              <code>
                <dl>
                  <dt>{`<Button variant="primary">`}</dt>
                  <dd>{`Get started`}</dd>
                  <dt>{`</Button>`}</dt>
                </dl>
              </code>
            </div>
          </div>

          {/* Card 3 — CSS */}
          <div className="snake-card-wrapper">
            <div id="css" className="snake-card">
              <code>
                <dl>
                  <dt>{`.aura-glass {`}</dt>
                  <dd>
                    {`backdrop-filter:`}
                    <br />
                    {`  blur(24px);`}
                    <br />
                    {`background:`}
                    <br />
                    {`  rgba(0,0,0,.4);`}
                  </dd>
                  <dt>{`}`}</dt>
                </dl>
              </code>
            </div>
          </div>

          {/* Card 4 — JS */}
          <div className="snake-card-wrapper">
            <div id="js" className="snake-card">
              <code>
                <dl>
                  <dt>{`const { theme } =`}</dt>
                  <dd>{`  useTheme();`}</dd>
                  <dt>{`setTheme("dark");`}</dt>
                </dl>
              </code>
            </div>
          </div>
        </div>

        {/* The snake — uses paths defined in the SVG defs below */}
        <svg
          className="snake-paths"
          width="740"
          height="2000"
          xmlns="http://www.w3.org/2000/svg"
        >
          <use href="#linePath01" />
          <use href="#linePath02" />
          <use href="#linePath03" />
          <use href="#linePath04" />
        </svg>
      </main>

      {/* SVG defs — kept in a 0×0 absolutely-positioned SVG (rather than
          display:none) so paint servers and masks resolve in every browser. */}
      <svg
        width="0"
        height="0"
        aria-hidden
        focusable="false"
        style={{
          position: "absolute",
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <defs>
          <path
            id="linePath01"
            d="m 106,45h 375c 114,0 226,128 226,235v 236c 0,136 -122,222 -224,221l -182,-2c -89,1 -141,42 -142,158l -2,204c -1,117 37,173 134,173h 186c 110,-3 230,111 230,220v 242c 0,113 -125,225 -248,225H 105"
          />
          <path
            id="linePath02"
            d="m 33,85h 444c 96,0 190,107 190,201v 224c 0,116 -98,188 -190,187l -192,-2c -92,0 -166,75 -166,168v 278c 0,94 74,169 166,169h 194c 92,0 188,94 188,188v 228c 0,94 -104,191 -214,191H 105"
          />
          <path
            id="linePath03"
            d="m 155,127h 308c 94,0 162,86 162,177v 178c 0,109 -50,174 -166,173L 277,653C 158,653 77,762 77,849v 302c 0,118 107,196 180,197l 204,4c 92,0 164,67 164,160v 200c 0,91 -89,163 -188,163H 105"
          />
          <path
            id="linePath04"
            d="m 283,173c 2,0 165,0 165,0C 544,175 577,238 577,330v 156c 0,94 -48,126 -140,125L 269,609C 167,602 29,702 29,851v 312c 0,111 101,235 242,235h 162c 109,1 144,49 144,136v 162c 0,73 -53,130 -118,130l -353,1"
          />

          <path
            id="codepenIcon"
            fill="#FFFFFF"
            d="m 214,306 -57,37c -1,0 -2,2 -2,3v 40c 0,1 1,2 2,3l 57,40c 2,1 6,1 7,0l 58,-40c 1,0 2,-1 2,-3v -40c 0,-2 -2,-3 -2,-3l -57,-37c -4,-3 -8,0 -8,0zm -2,13 1,26 -24,16 -19,-14zm 10,0 43,28 -19,14 -24,-16zm -6,35 19,14 -19,14 -19,-14zm -52,3 14,9 -14,9zm 106,0v 19l -14,-9zm -84,15 24,16v 26l -42,-28zm 59,0 17,14 -42,28v -26z"
          />
          <path
            id="htmlIcon"
            fill="#FFFFFF"
            d="m 94,318v 109h 16v -47h 12v 47h 16V 318h -16v 45h -12v -45zm 47,0v 18h 14v 92h 15v -92h 14v -18zm 45,0v 109h 15v -54l 7,41h 12l 5,-42v 55h 15V 318h -16l -11,72 -11,-72zm 62,0 1,109h 34v -19h -19v -91z"
          />
          <path
            id="cssIcon"
            fill="#FFFFFF"
            d="m 94,398c 0,26 18,31 30,31 9,0 32,-3 31,-34h -19c 0,23 -22,21 -22,0v -43c 0,-25 22,-21 22,1h 18c 1,-32 -22,-35 -30,-35 -10,0 -30,3 -30,32zm 105,-1c 0,22 -23,18 -23,-2h -18c 0,0 1,33 30,33 9,0 30,-4 30,-31 0,-42 -39,-26 -39,-50 0,-16 22,-20 22,3h 18c -2,-21 -11,-31 -30,-31 -9,0 -28,0 -29,28 -1,40 39,23 39,50zm 62,0c 0,21 -22,22 -23,-2h -17c 0,0 0,33 30,33 18,0 30,-9 30,-31 0,-41 -39,-27 -39,-50 0,-15 22,-20 22,3h 18c -1,-22 -13,-31 -27,-31 -11,0 -32,1 -33,27 1,38 39,25 39,51z"
          />
          <path
            id="jsIcon"
            fill="#FFFFFF"
            d="m 262,395c 0,20 -22,20 -22,-1h -18c 0,14 5,31 28,31 16,0 30,-9 30,-31 0,-41 -39,-26 -39,-49 0,-16 20,-19 20,3h 18c -1,-27 -14,-30 -27,-30 -19,-1 -29,8 -29,27 -2,38 39,24 39,50zm -67,-76v 74c 0,22 -22,20 -22,-1h -19c -1,26 15,34 30,34 27,0 30,-20 30,-30v -77z"
          />

          <mask id="block">
            <path fill="#FFFFFF" d="M 0,0 H 300 V 450 H 0 Z" />
          </mask>
          <mask id="codepenMask">
            <use href="#codepenIcon" />
          </mask>
          <mask id="htmlMask">
            <use href="#htmlIcon" />
          </mask>
          <mask id="cssMask">
            <use href="#cssIcon" />
          </mask>
          <mask id="jsMask">
            <use href="#jsIcon" />
          </mask>
          <mask id="codepenMask2">
            <use href="#codepenIcon" stroke="#FFFFFF" strokeWidth="4" />
          </mask>
          <mask id="htmlMask2">
            <use href="#htmlIcon" stroke="#FFFFFF" strokeWidth="4" />
          </mask>
          <mask id="cssMask2">
            <use href="#cssIcon" stroke="#FFFFFF" strokeWidth="4" />
          </mask>
          <mask id="jsMask2">
            <use href="#jsIcon" stroke="#FFFFFF" strokeWidth="4" />
          </mask>

          <linearGradient
            id="cl1"
            gradientUnits="objectBoundingBox"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="20%" stopColor="#b169db" />
            <stop offset="45%" stopColor="#f7d152" />
            <stop offset="65%" stopColor="#46cf71" />
            <stop offset="85%" stopColor="#0fbffa" />
            <stop offset="100%" stopColor="#0fbffa" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,500..600;1,500..600&display=swap');

/*
  IMPORTANT: do NOT define --strokeDashoffset on .snake-root.
  GSAP sets it on document.body during scroll, and the value cascades
  down to the SVG paths via CSS custom property inheritance. If we
  re-declare it on .snake-root, the local value SHADOWS body's value
  for everything inside .snake-root — and the snake stops animating
  because the SVG paths see the static .snake-root value, not the
  scroll-driven body value.
  The fallback "0px" in var(--strokeDashoffset, 0px) handles the
  initial paint before JS has run, so we don't need a defaulted root.
*/

.snake-main {
  display: flex;
  justify-content: center;
  position: relative;
  width: 740px;
  height: 2000px;
  padding: 0;
  margin: 0 auto;
}

.snake-cards {
  display: block;
  width: 300px;
  position: absolute;
  top: 0;
  z-index: 10;
}

.snake-card-wrapper {
  display: block;
  position: relative;
  width: 300px;
  height: 450px;
  border-radius: 20px;
  margin-top: 25px;
  margin-bottom: 25px;
}

.snake-card-wrapper::before {
  position: absolute;
  content: " ";
  display: block;
  z-index: 0;
  inset: 0;
  border-radius: inherit;
  background-color: rgba(0, 0, 0, 0.27);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.snake-card-wrapper::after {
  position: absolute;
  inset: 0;
  z-index: 0;
  content: " ";
  display: block;
  height: 450px;
  border-radius: 20px;
  background-image: url('data:image/svg+xml,<svg id="svgPaths" width="300" height="450" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="cl2" gradientUnits="objectBoundingBox" x1="0" y1="0" x2="1" y2="1" gradientTransform="rotate(45)"><stop offset="20%" stop-color="%23b169db"/><stop offset="45%" stop-color="%23f7d152"/><stop offset="65%" stop-color="%2346cf71"/><stop offset="85%" stop-color="%230fbffa"/></linearGradient></defs><path fill="url(%23cl2)" stroke="none" d="M 20,0C 9,0 0,9 0,20v 410c 0,11 9,20 20,20h 130 130c 11,0 20,-9 20,-20V 20C 300,9 291,0 280,0Zm 1,1h 161l 95,2c 12,1 19,10 19,20L 299,175v 254c 0,11 -9,20 -20,20H 118l -95,-3c -10,0 -20,-8 -20,-20L 1,275V 22C 1,11 10,1 21,1Z" /></svg>');
  filter: blur(1px) saturate(1.2) brightness(1.2);
  opacity: 0.85;
}

.snake-card {
  display: block;
  width: 300px;
  height: 450px;
  border-radius: 20px;
  background: radial-gradient(closest-corner, rgba(45, 45, 50, 0.07) 10%, rgba(45, 45, 50, 0.73) 90%),
              linear-gradient(50deg, rgba(0, 220, 90, 0.13) 0%, transparent 25%, transparent 75%, rgba(150, 90, 220, 0.13) 100%);
  color: #FFFFFF;
  position: relative;
  mask-composite: subtract;
  -webkit-mask-composite: source-out;
}

.snake-card#codepen {
  background: radial-gradient(closest-corner, rgba(108, 108, 110, 0.05) 10%, rgba(108, 108, 110, 0.4) 90%),
              linear-gradient(50deg, rgba(0, 220, 90, 0.07) 0%, transparent 25%, transparent 75%, rgba(150, 90, 220, 0.13) 100%);
  -webkit-mask-image: url(#block), url(#codepenMask);
          mask-image: url(#block), url(#codepenMask);
}
.snake-card#codepen::before { -webkit-mask: url(#codepenMask2); mask: url(#codepenMask2); }

.snake-card#html { -webkit-mask-image: url(#block), url(#htmlMask); mask-image: url(#block), url(#htmlMask); }
.snake-card#html::before { -webkit-mask: url(#htmlMask2); mask: url(#htmlMask2); }
.snake-card#css { -webkit-mask-image: url(#block), url(#cssMask); mask-image: url(#block), url(#cssMask); }
.snake-card#css::before { -webkit-mask: url(#cssMask2); mask: url(#cssMask2); }
.snake-card#js { -webkit-mask-image: url(#block), url(#jsMask); mask-image: url(#block), url(#jsMask); }
.snake-card#js::before { -webkit-mask: url(#jsMask2); mask: url(#jsMask2); }

.snake-card::before {
  position: absolute;
  inset: 0;
  z-index: 0;
  display: block;
  content: "";
  width: 300px;
  height: 450px;
  background: linear-gradient(-45deg, #912acd 20%, #e6b71d, #16a242, #03b0ea 70%);
  opacity: 0.6;
}

.snake-card header,
.snake-card code {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 310px;
  padding: 20px;
  text-overflow: clip;
  filter: brightness(1.4);
  overflow: hidden;
  mix-blend-mode: plus-lighter;
  text-shadow: 3px 3px 5px rgba(0,0,0,0.4);
  font-family: "Source Code Pro", "SF Mono", Menlo, monospace;
  font-style: normal;
  font-optical-sizing: auto;
}

.snake-card header {
  font-size: 28px;
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.01em;
  background: linear-gradient(-45deg, #912acd 20%, #e6b71d, #16a242, #03b0ea 70%, #03b0ea);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  text-align: center;
}

.snake-card code {
  font-size: 22px;
  line-height: 32px;
  font-weight: 600;
  letter-spacing: 0;
  background: linear-gradient(45deg, #b169db 20%, #f7d152, #46cf71, #0fbffa 70%, #03b0ea);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

/* The dl is inline-block so the parent flex container can centre it
   as a single block, while the text inside stays left-aligned (start). */
.snake-card code dl {
  margin: 0;
  display: inline-block;
  text-align: start;
}
.snake-card code dd { margin: 0; padding-left: 16px; }
.snake-card code dt { margin: 0; }

.snake-paths {
  position: absolute;
  top: 75px;
  z-index: -1;
  width: 740px;
  height: 2000px;
}

/* Two-step paint: solid purple as the guaranteed fallback, then the
   gradient on top. Either way the snake is visible. */
.snake-paths use {
  fill: none;
  stroke: #b169db;
  stroke: url(#cl1) #b169db;
  stroke-linecap: round;
  stroke-width: var(--dot, 20px);
  stroke-dashoffset: var(--strokeDashoffset, 0px);
  opacity: 0.95;
}

/* ─────────────────────────────────────────────────────────────
   LIGHT THEME OVERRIDES
   When next-themes adds the .light class to <html>, the cards
   flip to a white-translucent glass look and the rainbow text
   gradients pick darker stops so they read on cream surfaces.
   The snake stroke is left alone — its rainbow gradient already
   reads on both themes.
   ───────────────────────────────────────────────────────────── */
/*
   Apple-style glassmorphism for the four cards.
   Recipe:
     - Very low background alpha (0.12–0.20) so the snake behind shows through
     - STRONG backdrop-filter blur (24–28px) + saturate 180% for the
       "frosted but vivid" Apple look
     - Crisp inset highlight at the top edge (1px white line)
     - Soft outer drop shadow for elevation
     - Faint inner border at 1px to define the card edge
*/
.light .snake-card-wrapper::before {
  background-color: rgba(255, 255, 255, 0.16);
  backdrop-filter: blur(26px) saturate(180%);
  -webkit-backdrop-filter: blur(26px) saturate(180%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.55),
    inset 0 0 0 1px rgba(255, 255, 255, 0.22),
    0 12px 36px rgba(50, 40, 10, 0.12),
    0 2px 8px rgba(50, 40, 10, 0.06);
}

.light .snake-card {
  background-image: radial-gradient(closest-corner, rgba(255, 255, 255, 0.05) 10%, rgba(255, 255, 255, 0.18) 90%),
                    linear-gradient(135deg, rgba(160, 100, 220, 0.06) 0%, transparent 30%, transparent 70%, rgba(40, 130, 220, 0.08) 100%);
  background-color: transparent;
  color: #14140a;
}

.light .snake-card#codepen {
  background-image: radial-gradient(closest-corner, rgba(255, 255, 255, 0.08) 10%, rgba(255, 255, 255, 0.16) 90%),
                    linear-gradient(135deg, rgba(160, 100, 220, 0.04) 0%, transparent 30%, transparent 70%, rgba(40, 130, 220, 0.06) 100%);
  background-color: transparent;
}

.light .snake-card::before {
  background-image: linear-gradient(-45deg, #6a1c9c 20%, #b08712, #0e7c2c, #0181b3 70%);
  background-color: transparent;
  opacity: 0.55;
}

.light .snake-card header,
.light .snake-card code {
  /* On light surfaces "plus-lighter" washes the text out completely; switch
     to a darken-style blend so the rainbow gradient keeps contrast. */
  mix-blend-mode: multiply;
  filter: brightness(0.95) contrast(1.1);
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.6);
}

.light .snake-card header {
  background: linear-gradient(-45deg, #6a1c9c 20%, #b08712, #0e7c2c, #0181b3 70%, #0181b3);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.light .snake-card code {
  background: linear-gradient(45deg, #6a1c9c 20%, #b08712, #0e7c2c, #0181b3 70%, #0181b3);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.snake-paths use[href="#linePath01"] {
  --dot: 20px;
  --gap: 50px;
  stroke-dasharray: 20px 50px 120px 50px 20px 50px 300px 50px 20px 50px 150px 50px 20px 20000px;
}
.snake-paths use[href="#linePath02"] {
  --dot: 34px;
  --gap: 60px;
  stroke-dasharray: 34px 60px 120px 60px 34px 60px 300px 60px 34px 60px 150px 60px 34px 20000px;
}
.snake-paths use[href="#linePath03"] {
  --dot: 25px;
  --gap: 40px;
  stroke-dasharray: 25px 40px 120px 40px 25px 40px 250px 40px 25px 40px 150px 40px 25px 20000px;
}
.snake-paths use[href="#linePath04"] {
  --dot: 40px;
  --gap: 70px;
  stroke-dasharray: 40px 70px 100px 70px 40px 70px 200px 70px 40px 20000px;
}
`;

export default SnakeAnimation;
