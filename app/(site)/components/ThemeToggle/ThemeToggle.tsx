"use client"

import * as React from "react"
import { useTheme } from "next-themes"

// 6 Preset GIFs with transparent backgrounds (or placeholders acting as such)
const GIF_PRESETS = [
  { id: 'preset-1', name: 'Apple', url: 'https://i.pinimg.com/originals/be/cb/ca/becbca09cc81c9ecd1ce133c836b3f25.gif' },
  { id: 'preset-2', name: 'Cat Eyes', url: 'https://i.pinimg.com/originals/6f/b2/d7/6fb2d7e574f85ab02ef9420b4e387552.gif' },
  { id: 'preset-3', name: 'Hello', url: 'https://i.pinimg.com/originals/3d/5c/f7/3d5cf75049da2de56024d5aaa6e62e25.gif' },
  { id: 'preset-4', name: 'Hello2', url: 'https://i.pinimg.com/originals/63/7d/98/637d98e729cce811a9f33e1dd957d09b.gif' },
  { id: 'preset-5', name: 'Cat Walk Paws', url: 'https://i.pinimg.com/originals/11/94/43/119443ce7241ea548fb5a6518c5e4893.gif' },
  { id: 'preset-6', name: 'Cat Walk', url: 'https://i.pinimg.com/originals/8c/af/c2/8cafc2665a04072d903521931ac15540.gif' },
]

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [activeGifUrl, setActiveGifUrl] = React.useState(GIF_PRESETS[0].url)
  const [customUrl, setCustomUrl] = React.useState("")

  const styleId = "theme-transition-styles"

  // Ensure hydration matches
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Function to inject the CSS mask animation into the document head
  const updateStyles = React.useCallback((css: string) => {
    if (typeof window === "undefined") return

    let styleElement = document.getElementById(styleId) as HTMLStyleElement

    if (!styleElement) {
      styleElement = document.createElement("style")
      styleElement.id = styleId
      document.head.appendChild(styleElement)
    }

    styleElement.textContent = css
  }, [])

  const toggleTheme = React.useCallback(() => {
    // 1. Relies on alpha-channel (transparency) instead of luminance.
    // 2. Scales to 500vmax to ensure full screen coverage.
    // 3. Smooth cubic-bezier timing function.
    const animationCss = `
      ::view-transition-group(root) {
        animation-duration: 1.5s;
        animation-timing-function: cubic-bezier(0.25, 1, 0.5, 1);
      }

      ::view-transition-new(root) {
        mask-image: url('${activeGifUrl}');
        mask-position: center;
        mask-repeat: no-repeat;
        mask-size: 0vmin;

        -webkit-mask-image: url('${activeGifUrl}');
        -webkit-mask-position: center;
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-size: 0vmin;

        animation: smooth-scale-mask 1.5s forwards;
        z-index: 10;
      }

      ::view-transition-old(root),
      .dark::view-transition-old(root) {
        animation: none;
        z-index: -1;
      }

      .dark::view-transition-new(root) {
        mask-image: url('${activeGifUrl}');
        mask-position: center;
        mask-repeat: no-repeat;
        mask-size: 0vmin;

        -webkit-mask-image: url('${activeGifUrl}');
        -webkit-mask-position: center;
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-size: 0vmin;

        animation: smooth-scale-mask 1.5s forwards;
        z-index: 10;
      }

      @keyframes smooth-scale-mask {
        0% { 
          mask-size: 0vmin; 
          -webkit-mask-size: 0vmin; 
        }
        100% { 
          mask-size: 500vmax; 
          -webkit-mask-size: 500vmax; 
        }
      }
    `

    updateStyles(animationCss)

    if (typeof window === "undefined") return

    const switchTheme = () => {
      setTheme(resolvedTheme === "light" ? "dark" : "light")
    }

    // Fallback for browsers that don't support View Transitions
    if (!document.startViewTransition) {
      switchTheme()
      return
    }

    document.startViewTransition(switchTheme)
  }, [resolvedTheme, setTheme, activeGifUrl, updateStyles])

  const handleCustomUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setCustomUrl(val)
    if (val.trim() !== "") {
      setActiveGifUrl(val)
    } else {
      setActiveGifUrl(GIF_PRESETS[0].url)
    }
  }

  if (!mounted) return null

  const isDark = resolvedTheme === "dark"

  return (
    <>
      <div className="theme-dashboard">
        
        {/* Main Action Button */}
        <button 
          onClick={toggleTheme} 
          className={`glass-toggle-btn ${isDark ? 'dark-btn' : 'light-btn'}`}
        >
          {isDark ? '☀️ Switch to Light Mode' : '🌙 Switch to Dark Mode'}
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
              *Ensure the GIF has a transparent background so the shape scales correctly.
            </span>
          </div>

          <div className="divider">or choose a preset</div>

          {/* Preset Selectors */}
          <div className="presets-grid">
            {GIF_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => {
                  setCustomUrl("") 
                  setActiveGifUrl(preset.url)
                }}
                className={`preset-btn ${activeGifUrl === preset.url && customUrl === "" ? 'active-preset' : ''}`}
                style={{ backgroundImage: `url(${preset.url})` }}
                title={preset.name}
              >
                <div className="preset-overlay">{preset.name}</div>
              </button>
            ))}
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: styles }} />
    </>
  )
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
`