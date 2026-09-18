"use client";

import * as React from "react";
import { useTheme } from "next-themes";

// 6 Preset GIFs with transparent backgrounds (or placeholders acting as such)
const GIF_PRESETS = [
  {
    id: "preset-1",
    name: "Apple",
    url: "https://i.pinimg.com/originals/be/cb/ca/becbca09cc81c9ecd1ce133c836b3f25.gif",
  },
  {
    id: "preset-2",
    name: "Cat Eyes",
    url: "https://i.pinimg.com/originals/6f/b2/d7/6fb2d7e574f85ab02ef9420b4e387552.gif",
  },
  {
    id: "preset-3",
    name: "Hello",
    url: "https://i.pinimg.com/originals/3d/5c/f7/3d5cf75049da2de56024d5aaa6e62e25.gif",
  },
  {
    id: "preset-4",
    name: "Hello2",
    url: "https://i.pinimg.com/originals/63/7d/98/637d98e729cce811a9f33e1dd957d09b.gif",
  },
  {
    id: "preset-5",
    name: "Cat Walk Paws",
    url: "https://i.pinimg.com/originals/11/94/43/119443ce7241ea548fb5a6518c5e4893.gif",
  },
  {
    id: "preset-6",
    name: "Cat Walk",
    url: "https://i.pinimg.com/originals/8c/af/c2/8cafc2665a04072d903521931ac15540.gif",
  },
];

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [activeGifUrl, setActiveGifUrl] = React.useState(GIF_PRESETS[0].url);
  const [customUrl, setCustomUrl] = React.useState("");
  const [isLoadingGif, setIsLoadingGif] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const styleId = "theme-gif-transition-styles";

  // Ensure hydration matches
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const updateTransitionStyles = React.useCallback((url: string) => {
    const cssUrl = url
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '\\"')
      .replace(/\)/g, "\\)");
    let styleElement = document.getElementById(
      styleId,
    ) as HTMLStyleElement | null;
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    styleElement.textContent = `
      ::view-transition-group(root) {
        animation-duration: 1500ms;
        animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
      }

      ::view-transition-old(root) {
        z-index: 0;
        animation: none;
      }

      ::view-transition-new(root) {
        z-index: 1;
        animation: aura-gif-reveal 1500ms cubic-bezier(0.22, 1, 0.36, 1) both;
        clip-path: none !important;
        mask-image: url("${cssUrl}");
        mask-position: center;
        mask-repeat: no-repeat;
        mask-size: 0vmin;
        mask-mode: luminance;
        -webkit-mask-image: url("${cssUrl}");
        -webkit-mask-position: center;
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-size: 0vmin;
        -webkit-mask-mode: luminance;
      }

      @keyframes aura-gif-reveal {
        0% {
          mask-size: 0vmin;
          -webkit-mask-size: 0vmin;
        }
        100% {
          mask-size: 500vmax;
          -webkit-mask-size: 500vmax;
        }
      }
    `;
  }, []);

  const preloadGif = React.useCallback((url: string) => {
    return new Promise<void>((resolve) => {
      const image = new Image();
      let settled = false;
      const finish = () => {
        if (settled) return;
        settled = true;
        resolve();
      };

      image.onload = async () => {
        try {
          await image.decode?.();
        } catch {
          // The image is still usable when decode is unavailable or rejected.
        }
        finish();
      };
      image.onerror = finish;
      image.src = url;
      window.setTimeout(finish, 4000);
    });
  }, []);

  const toggleTheme = React.useCallback(async () => {
    if (!resolvedTheme || isLoadingGif || isAnimating) return;

    setIsLoadingGif(true);
    await preloadGif(activeGifUrl);
    const switchTheme = () => {
      setTheme(resolvedTheme === "light" ? "dark" : "light");
    };

    setIsAnimating(true);
    window.requestAnimationFrame(() => {
      updateTransitionStyles(activeGifUrl);
      if (typeof document.startViewTransition === "function") {
        const transition = document.startViewTransition(switchTheme);
        transition.finished.finally(() => {
          setIsLoadingGif(false);
          window.setTimeout(() => setIsAnimating(false), 180);
        });
      } else {
        switchTheme();
        setIsLoadingGif(false);
        window.setTimeout(() => setIsAnimating(false), 1500);
      }
    });
  }, [
    activeGifUrl,
    isAnimating,
    isLoadingGif,
    preloadGif,
    resolvedTheme,
    setTheme,
    updateTransitionStyles,
  ]);

  const handleCustomUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomUrl(val);
    if (val.trim() !== "") {
      setActiveGifUrl(val);
    } else {
      setActiveGifUrl(GIF_PRESETS[0].url);
    }
  };

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <>
      <div className="theme-dashboard">
        {/* Main Action Button */}
        <button
          type="button"
          onClick={toggleTheme}
          disabled={isLoadingGif || isAnimating}
          aria-busy={isLoadingGif || isAnimating}
          className={`glass-toggle-btn ${isDark ? "dark-btn" : "light-btn"}`}
        >
          {isDark ? "☀️ Switch to Light Mode" : "🌙 Switch to Dark Mode"}
        </button>

        {/* Bento Grid Settings Panel */}
        <div className="settings-bento-box">
          <h3 className="bento-title">GIF Mask Transition Settings</h3>

          {/* Custom URL Input */}
          <div className="input-group">
            <label>Paste Custom GIF URL</label>
            <input
              type="text"
              placeholder="https://example.com/transparent-animation.gif"
              value={customUrl}
              onChange={handleCustomUrlChange}
              className="custom-url-input"
            />
            <span className="helper-text">
              *Ensure the GIF has a transparent background so the shape scales
              correctly.
            </span>
          </div>

          <div className="divider">or choose a preset</div>

          {/* Preset Selectors */}
          <div className="presets-grid">
            {GIF_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                disabled={isLoadingGif || isAnimating}
                onClick={() => {
                  setCustomUrl("");
                  setActiveGifUrl(preset.url);
                }}
                aria-label={`Use ${preset.name} GIF transition`}
                aria-pressed={activeGifUrl === preset.url && customUrl === ""}
                className={`preset-btn ${activeGifUrl === preset.url && customUrl === "" ? "active-preset" : ""}`}
                style={{ backgroundImage: `url(${preset.url})` }}
                title={preset.name}
              >
                <div className="preset-overlay">{preset.name}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {isAnimating && (
        <div className="theme-gif-layer" aria-hidden="true">
          <img src={activeGifUrl} alt="" />
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: styles }} />
    </>
  );
}

const styles = `
  /* Modern layout and centering */
  .theme-dashboard {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    padding: 40px 20px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }

  .theme-gif-layer {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: grid;
    place-items: center;
    overflow: hidden;
    pointer-events: none;
    background: transparent;
    isolation: isolate;
    will-change: opacity;
    animation: theme-gif-layer-out 180ms ease 1.5s both;
  }

  .theme-gif-layer img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    mix-blend-mode: screen;
    transform-origin: center;
    backface-visibility: hidden;
    will-change: transform, opacity;
    animation: theme-gif-layer-in 1.5s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  @keyframes theme-gif-layer-in {
    0% { opacity: 0; transform: scale(0.72) rotate(-3deg); }
    45% { opacity: 1; transform: scale(1.02) rotate(0.5deg); }
    100% { opacity: 1; transform: scale(1) rotate(0deg); }
  }

  @keyframes theme-gif-layer-out {
    to { opacity: 0; }
  }

  /* Main Toggle Button */
  .glass-toggle-btn {
    padding: 16px 32px;
    font-size: 1.1rem;
    font-weight: 600;
    border-radius: 999px;
    border: 1px solid rgba(128, 128, 128, 0.2);
    cursor: pointer;
    backdrop-filter: blur(10px);
    transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  .glass-toggle-btn:disabled {
    cursor: wait;
    opacity: 0.78;
    transform: none;
  }

  .dark-btn {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }
  .dark-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  .light-btn {
    background: rgba(0, 0, 0, 0.8);
    color: white;
  }
  .light-btn:hover {
    background: rgba(0, 0, 0, 0.9);
    transform: translateY(-2px);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  }

  /* Bento Box Settings Container */
  .settings-bento-box {
    background: rgba(128, 128, 128, 0.05);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(128, 128, 128, 0.2);
    border-radius: 24px;
    padding: 24px;
    width: 100%;
    max-width: 500px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
  }

  .bento-title {
    margin: 0 0 20px 0;
    font-size: 1.2rem;
    font-weight: 600;
    opacity: 0.9;
  }

  /* Custom Input Styling */
  .input-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .input-group label {
    font-size: 0.85rem;
    font-weight: 500;
    opacity: 0.7;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .custom-url-input {
    width: 100%;
    padding: 12px 16px;
    border-radius: 12px;
    border: 1px solid rgba(128, 128, 128, 0.3);
    background: rgba(128, 128, 128, 0.1);
    color: inherit;
    font-family: inherit;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.2s;
    box-sizing: border-box;
  }

  .custom-url-input:focus {
    border-color: #3b82f6; 
  }

  .helper-text {
    font-size: 0.75rem;
    color: #888;
    margin-top: 4px;
  }

  .divider {
    text-align: center;
    margin: 20px 0;
    font-size: 0.85rem;
    opacity: 0.5;
    position: relative;
  }

  /* Preset Grid (3 columns, 2 rows for 6 items) */
  .presets-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }

  .preset-btn {
    position: relative;
    aspect-ratio: 1;
    border-radius: 12px;
    border: 2px solid rgba(128, 128, 128, 0.2);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
    overflow: hidden;
    padding: 0;
    transition: transform 0.2s, border-color 0.2s;
    background-color: rgba(128, 128, 128, 0.1); /* Helps transparent GIFs show up */
  }

  .preset-btn:hover {
    transform: scale(1.05);
  }

  .active-preset {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.4);
  }

  .preset-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding-bottom: 6px;
    color: white;
    font-size: 0.7rem;
    font-weight: 600;
    opacity: 0;
    transition: opacity 0.2s;
  }

  .preset-btn:hover .preset-overlay,
  .active-preset .preset-overlay {
    opacity: 1;
  }

  /* Mobile responsiveness */
  @media (max-width: 500px) {
    .presets-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;
