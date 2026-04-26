import React, { useState } from 'react';

export default function DownloadButton() {
  const [status, setStatus] = useState<'idle' | 'downloading' | 'complete'>('idle');

  const handleClick = () => {
    // Prevent clicking while it's already animating
    if (status !== 'idle') return;

    // Start download state
    setStatus('downloading');

    // Simulate a 3-second download filling the progress bar
    setTimeout(() => {
      setStatus('complete');

      // Reset back to idle after 3 seconds of showing "Complete"
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    }, 3000);
  };

  return (
    <>
      <button 
        className={`download-btn ${status}`}
        onClick={handleClick}
      >
        <div className="btn-content">
          <div className="icon-wrapper">
            {/* Standard Download Arrow */}
            <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            
            {/* Success Checkmark */}
            <svg className="check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <div className="text-wrapper">
            <span className="text default">Download File</span>
            <span className="text downloading">Downloading...</span>
            <span className="text complete">Download Complete</span>
          </div>
        </div>
        
        {/* The animated background fill */}
        <div className="progress-bar"></div>
      </button>

      <style dangerouslySetInnerHTML={{ __html: styles }} />
    </>
  );
}

const styles = `
  .download-btn {
    --bg: #1C212E;
    --text: #FFF;
    --success: #16BF78;
    --progress-bg: rgba(255, 255, 255, 0.08);

    position: relative;
    appearance: none;
    border: 0;
    background: var(--bg);
    color: var(--text);
    /* Dimensions matched to your previous button */
    height: 56px;
    width: 200px;
    padding: 0 20px;
    border-radius: 28px;
    cursor: pointer;
    outline: none;
    overflow: hidden;
    font-family: inherit;
    transition: transform 0.2s ease, background 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  .download-btn:active {
    transform: scale(0.96);
  }

  /* Keeps text and icons above the background fill */
  .download-btn .btn-content {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    height: 100%;
  }

  /* --- ICON STYLING --- */
  .icon-wrapper {
    position: relative;
    width: 22px;
    height: 22px;
  }

  .icon-wrapper svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  .icon-wrapper .check {
    opacity: 0;
    transform: scale(0.5);
    stroke: var(--success);
  }

  /* --- TEXT STYLING --- */
  .text-wrapper {
    position: relative;
    height: 24px;
    flex: 1;
    text-align: left;
  }

  .text-wrapper .text {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  .text.downloading, .text.complete {
    opacity: 0;
    transform: translateY(15px);
  }

  /* --- PROGRESS BAR --- */
  .progress-bar {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0%;
    background: var(--progress-bg);
    z-index: 1;
  }

  /* =========================================
     ANIMATION STATES
     ========================================= */

  /* 1. DOWNLOADING STATE */
  .download-btn.downloading {
    pointer-events: none;
  }
  .download-btn.downloading .text.default {
    opacity: 0;
    transform: translateY(-15px);
  }
  .download-btn.downloading .text.downloading {
    opacity: 1;
    transform: translateY(0);
  }
  .download-btn.downloading .arrow {
    animation: download-bounce 1s infinite ease-in-out;
  }
  .download-btn.downloading .progress-bar {
    /* 3 second linear fill to simulate download */
    transition: width 3s linear;
    width: 100%; 
  }

  /* 2. COMPLETE STATE */
  .download-btn.complete {
    pointer-events: none;
  }
  .download-btn.complete .progress-bar {
    width: 100%;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .download-btn.complete .text.default,
  .download-btn.complete .text.downloading {
    opacity: 0;
    transform: translateY(-15px);
  }
  .download-btn.complete .text.complete {
    opacity: 1;
    transform: translateY(0);
  }
  .download-btn.complete .arrow {
    opacity: 0;
    transform: scale(0.5);
  }
  .download-btn.complete .check {
    opacity: 1;
    transform: scale(1);
  }

  /* KEYFRAMES */
  @keyframes download-bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(4px); }
  }
`;