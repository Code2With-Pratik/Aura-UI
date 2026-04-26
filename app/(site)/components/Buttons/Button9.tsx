import React from 'react';

export default function Button9() {
  return (
    <>
      <button className="glass-btn">
        <svg 
          className="sparkle"
          height="20" 
          width="20" 
          fill="#FFFFFF" 
          viewBox="0 0 24 24" 
        >
          <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
        </svg>

        <span className="text">Generate</span>
      </button>

      <style dangerouslySetInnerHTML={{ __html: styles }} />
    </>
  );
}

const styles = `
  /* From Uiverse.io by AlimurtuzaCodes - Modified with iOS Glassmorphism */ 
  .glass-btn {
    /* Decreased Size */
    width: 180px;
    height: 56px;
    border-radius: 28px;
    
    /* Layout */
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    
    /* iOS Glass Effect */
    background: rgba(40, 38, 40, 0.4); /* Translucent base */
    backdrop-filter: blur(16px);       /* iOS Frosted blur */
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.15); /* Subtle glass edge */
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
    
    cursor: pointer;
    transition: all 450ms ease-in-out;
  }

  .sparkle {
    fill: #AAAAAA;
    transition: all 800ms ease;
  }

  .text {
    font-weight: 600;
    color: #AAAAAA;
    font-size: 15px; /* Scaled down slightly to match new button size */
    letter-spacing: 0.5px;
    font-family: inherit;
  }

  .glass-btn:hover {
    /* Keep the gradient but make it slightly translucent to preserve glass feel */
    background: linear-gradient(0deg, rgba(164, 124, 243, 0.85), rgba(104, 63, 234, 0.85));
    border: 1px solid rgba(255, 255, 255, 0.3);
    
    /* Enhanced Glow & Shadows */
    box-shadow: inset 0px 1px 0px 0px rgba(255, 255, 255, 0.4),
                inset 0px -4px 0px 0px rgba(0, 0, 0, 0.2),
                0px 0px 0px 4px rgba(255, 255, 255, 0.1),
                0px 0px 100px 0px rgba(153, 23, 255, 0.6);
                
    transform: translateY(-2px);
  }

  .glass-btn:active {
    transform: translateY(1px);
    box-shadow: inset 0px 1px 0px 0px rgba(255, 255, 255, 0.2),
                inset 0px -2px 0px 0px rgba(0, 0, 0, 0.2);
  }

  .glass-btn:hover .text {
    color: white;
  }

  .glass-btn:hover .sparkle {
    fill: white;
    transform: scale(1.2);
  }
`;