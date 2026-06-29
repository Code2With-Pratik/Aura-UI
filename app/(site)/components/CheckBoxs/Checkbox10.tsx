import React from 'react';
import styled from 'styled-components';

const Checkbox = () => {
  return (
    <StyledWrapper>
      <div className="radial-menu-container">
        <input type="checkbox" id="menu-toggle" className="menu-toggle" />
        <label htmlFor="menu-toggle" className="center-icon" tabIndex={0} role="button" aria-label="Toggle menu" aria-expanded="false">
          <svg width="800px" height="800px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none">
            <path fill="#4285F4" d="M14.9 8.161c0-.476-.039-.954-.121-1.422h-6.64v2.695h3.802a3.24 3.24 0 01-1.407 2.127v1.75h2.269c1.332-1.22 2.097-3.02 2.097-5.15z" />
            <path fill="#34A853" d="M8.14 15c1.898 0 3.499-.62 4.665-1.69l-2.268-1.749c-.631.427-1.446.669-2.395.669-1.836 0-3.393-1.232-3.952-2.888H1.85v1.803A7.044 7.044 0 008.14 15z" />
            <path fill="#FBBC04" d="M4.187 9.342a4.17 4.17 0 010-2.68V4.859H1.849a6.97 6.97 0 000 6.286l2.338-1.803z" />
            <path fill="#EA4335" d="M8.14 3.77a3.837 3.837 0 012.7 1.05l2.01-1.999a6.786 6.786 0 00-4.71-1.82 7.042 7.042 0 00-6.29 3.858L4.186 6.66c.556-1.658 2.116-2.89 3.952-2.89z" />
          </svg>
        </label>
        <svg className="connection-lines" width={400} height={300} viewBox="0 0 400 300" aria-hidden="true">
          <defs>
            <linearGradient id="googleFlow" gradientUnits="objectBoundingBox" x1={0} y1={0} x2={1} y2={0}>
              <stop offset="0%" stopColor="#4285F4" stopOpacity="0.2" />
              <stop offset="45%" stopColor="#EA4335" stopOpacity="0.8" />
              <stop offset="55%" stopColor="#FBBC05" stopOpacity={1} />
              <stop offset="65%" stopColor="#34A853" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#4285F4" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path className="line line-1" d="M 200 150 Q 140 130, 80 80" />
          <path className="line line-2" d="M 200 150 Q 180 100, 180 50" />
          <path className="line line-3" d="M 200 150 Q 240 80, 300 40" />
          <path className="line line-4" d="M 200 150 Q 260 120, 320 100" />
          <path className="line line-5" d="M 200 150 Q 270 150, 330 160" />
          <path className="line line-6" d="M 200 150 Q 270 180, 330 220" />
          <path className="line line-7" d="M 200 150 Q 220 210, 200 260" />
          <path className="line line-8" d="M 200 150 Q 180 190, 110 230" />
        </svg>
        <div className="menu-item item-1">
          <button className="icon-circle" tabIndex={0} aria-label="Google Mail" data-tooltip="Google Mail">
            <svg width="800px" height="800px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 11.9556C2 8.47078 2 6.7284 2.67818 5.39739C3.27473 4.22661 4.22661 3.27473 5.39739 2.67818C6.7284 2 8.47078 2 11.9556 2H20.0444C23.5292 2 25.2716 2 26.6026 2.67818C27.7734 3.27473 28.7253 4.22661 29.3218 5.39739C30 6.7284 30 8.47078 30 11.9556V20.0444C30 23.5292 30 25.2716 29.3218 26.6026C28.7253 27.7734 27.7734 28.7253 26.6026 29.3218C25.2716 30 23.5292 30 20.0444 30H11.9556C8.47078 30 6.7284 30 5.39739 29.3218C4.22661 28.7253 3.27473 27.7734 2.67818 26.6026C2 25.2716 2 23.5292 2 20.0444V11.9556Z" fill="white" />
              <path d="M22.0515 8.52295L16.0644 13.1954L9.94043 8.52295V8.52421L9.94783 8.53053V15.0732L15.9954 19.8466L22.0515 15.2575V8.52295Z" fill="#EA4335" />
              <path d="M23.6231 7.38639L22.0508 8.52292V15.2575L26.9983 11.459V9.17074C26.9983 9.17074 26.3978 5.90258 23.6231 7.38639Z" fill="#FBBC05" />
              <path d="M22.0508 15.2575V23.9924H25.8428C25.8428 23.9924 26.9219 23.8813 26.9995 22.6513V11.459L22.0508 15.2575Z" fill="#34A853" />
              <path d="M9.94811 24.0001V15.0732L9.94043 15.0669L9.94811 24.0001Z" fill="#C5221F" />
              <path d="M9.94014 8.52404L8.37646 7.39382C5.60179 5.91001 5 9.17692 5 9.17692V11.4651L9.94014 15.0667V8.52404Z" fill="#C5221F" />
              <path d="M9.94043 8.52441V15.0671L9.94811 15.0734V8.53073L9.94043 8.52441Z" fill="#C5221F" />
              <path d="M5 11.4668V22.6591C5.07646 23.8904 6.15673 24.0003 6.15673 24.0003H9.94877L9.94014 15.0671L5 11.4668Z" fill="#4285F4" />
            </svg>
          </button>
        </div>
        <div className="menu-item item-2">
          <button className="icon-circle" tabIndex={0} aria-label="Google Drive" data-tooltip="Google Drive">
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx={18} cy={5} r={3} fill="#4285F4" />
              <circle cx={6} cy={12} r={3} fill="#EA4335" />
              <circle cx={18} cy={19} r={3} fill="#FBBC04" />
              <line x1="8.5" y1={11} x2="15.5" y2={6} stroke="#34A853" strokeWidth={2} />
              <line x1="8.5" y1={13} x2="15.5" y2={18} stroke="#34A853" strokeWidth={2} />
            </svg>
          </button>
        </div>
        <div className="menu-item item-3">
          <button className="icon-circle" tabIndex={0} aria-label="Google Docs" data-tooltip="Google Docs">
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="#4285F4" stroke="#4285F4" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="14,2 14,8 20,8" fill="#fff" />
              <line x1={8} y1={13} x2={16} y2={13} stroke="#fff" strokeWidth={2} />
              <line x1={8} y1={17} x2={16} y2={17} stroke="#fff" strokeWidth={2} />
            </svg>
          </button>
        </div>
        <div className="menu-item item-4">
          <button className="icon-circle" tabIndex={0} aria-label="Google PlayStore" data-tooltip="Play Store">
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 511.999 511.999" xmlSpace="preserve">
              <g>
                <path style={{fill: '#32BBFF'}} d="M382.369,175.623C322.891,142.356,227.427,88.937,79.355,6.028
      		C69.372-0.565,57.886-1.429,47.962,1.93l254.05,254.05L382.369,175.623z" />
                <path style={{fill: '#32BBFF'}} d="M47.962,1.93c-1.86,0.63-3.67,1.39-5.401,2.308C31.602,10.166,23.549,21.573,23.549,36v439.96
      		c0,14.427,8.052,25.834,19.012,31.761c1.728,0.917,3.537,1.68,5.395,2.314L302.012,255.98L47.962,1.93z" />
                <path style={{fill: '#32BBFF'}} d="M302.012,255.98L47.956,510.035c9.927,3.384,21.413,2.586,31.399-4.103
      		c143.598-80.41,237.986-133.196,298.152-166.746c1.675-0.941,3.316-1.861,4.938-2.772L302.012,255.98z" />
              </g>
              <path style={{fill: '#2C9FD9'}} d="M23.549,255.98v219.98c0,14.427,8.052,25.834,19.012,31.761c1.728,0.917,3.537,1.68,5.395,2.314
      	L302.012,255.98H23.549z" />
              <path style={{fill: '#29CC5E'}} d="M79.355,6.028C67.5-1.8,53.52-1.577,42.561,4.239l255.595,255.596l84.212-84.212
      	C322.891,142.356,227.427,88.937,79.355,6.028z" />
              <path style={{fill: '#D93F21'}} d="M298.158,252.126L42.561,507.721c10.96,5.815,24.939,6.151,36.794-1.789
      	c143.598-80.41,237.986-133.196,298.152-166.746c1.675-0.941,3.316-1.861,4.938-2.772L298.158,252.126z" />
              <path style={{fill: '#FFD500'}} d="M488.45,255.98c0-12.19-6.151-24.492-18.342-31.314c0,0-22.799-12.721-92.682-51.809l-83.123,83.123
      	l83.204,83.205c69.116-38.807,92.6-51.892,92.6-51.892C482.299,280.472,488.45,268.17,488.45,255.98z" />
              <path style={{fill: '#FFAA00'}} d="M470.108,287.294c12.191-6.822,18.342-19.124,18.342-31.314H294.303l83.204,83.205
      	C446.624,300.379,470.108,287.294,470.108,287.294z" />
            </svg>
          </button>
        </div>
        <div className="menu-item item-5">
          <button className="icon-circle" tabIndex={0} aria-label="Google Podcasts" data-tooltip="Podcasts">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={100} height={100} viewBox="0 0 48 48">
              <path fill="#f9a825" d="M24.5,12L24.5,12c-1.381,0-2.5-1.119-2.5-2.5v-3C22,5.119,23.119,4,24.5,4h0 C25.881,4,27,5.119,27,6.5v3C27,10.881,25.881,12,24.5,12z" />
              <path fill="#f9a825" d="M24.5,33L24.5,33c-1.381,0-2.5-1.119-2.5-2.5v-13c0-1.381,1.119-2.5,2.5-2.5h0 c1.381,0,2.5,1.119,2.5,2.5v13C27,31.881,25.881,33,24.5,33z" />
              <path fill="#f9a825" d="M24.5,44L24.5,44c-1.381,0-2.5-1.119-2.5-2.5v-3c0-1.381,1.119-2.5,2.5-2.5h0 c1.381,0,2.5,1.119,2.5,2.5v3C27,42.881,25.881,44,24.5,44z" />
              <path fill="#e53935" d="M15.5,36L15.5,36c-1.381,0-2.5-1.119-2.5-2.5v-3c0-1.381,1.119-2.5,2.5-2.5h0 c1.381,0,2.5,1.119,2.5,2.5v3C18,34.881,16.881,36,15.5,36z" />
              <path fill="#43a047" d="M33.5,20L33.5,20c-1.381,0-2.5-1.119-2.5-2.5v-3c0-1.381,1.119-2.5,2.5-2.5h0 c1.381,0,2.5,1.119,2.5,2.5v3C36,18.881,34.881,20,33.5,20z" />
              <path fill="#e53935" d="M15.5,25L15.5,25c-1.381,0-2.5-1.119-2.5-2.5v-9c0-1.381,1.119-2.5,2.5-2.5h0 c1.381,0,2.5,1.119,2.5,2.5v9C18,23.881,16.881,25,15.5,25z" />
              <path fill="#43a047" d="M33.5,37L33.5,37c-1.381,0-2.5-1.119-2.5-2.5v-9c0-1.381,1.119-2.5,2.5-2.5h0 c1.381,0,2.5,1.119,2.5,2.5v9C36,35.881,34.881,37,33.5,37z" />
              <path fill="#1565c0" d="M6.5,28L6.5,28C5.119,28,4,26.881,4,25.5v-3C4,21.119,5.119,20,6.5,20h0C7.881,20,9,21.119,9,22.5v3 C9,26.881,7.881,28,6.5,28z" />
              <path fill="#1e88e5" d="M42.5,28L42.5,28c-1.381,0-2.5-1.119-2.5-2.5v-3c0-1.381,1.119-2.5,2.5-2.5h0 c1.381,0,2.5,1.119,2.5,2.5v3C45,26.881,43.881,28,42.5,28z" />
            </svg>
          </button>
        </div>
        <div className="menu-item item-6">
          <button className="icon-circle" tabIndex={0} aria-label="Google Home" data-tooltip="Google Home">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={100} height={100} viewBox="0 0 48 48">
              <path fill="#fafafa" d="M22.586,4.414L5.879,21.121C5.316,21.684,5,22.447,5,23.243V41c0,1.105,0.895,2,2,2h34 c1.105,0,2-0.895,2-2V23.243c0-0.796-0.316-1.559-0.879-2.121L25.414,4.414C24.633,3.633,23.367,3.633,22.586,4.414z" />
              <path fill="#43a047" d="M12 35H36V43H12z" />
              <path fill="#fbc02d" d="M13,24v19H7c-1.1,0-2-0.9-2-2V24H13z" />
              <path fill="#1e88e5" d="M42.12,21.12L29.59,8.59l-5.55,5.55L35,25.1V43h6c1.1,0,2-0.9,2-2V23.24 C43,22.45,42.68,21.68,42.12,21.12z" />
              <path fill="#e64a19" d="M29.59,8.59L5,33.18v-9.94c0-0.79,0.32-1.56,0.88-2.12L22.59,4.41c0.78-0.78,2.04-0.78,2.82,0 L29.59,8.59z" />
            </svg>
          </button>
        </div>
        <div className="menu-item item-7">
          <button className="icon-circle" tabIndex={0} aria-label="Google Map" data-tooltip="Google Map">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={100} height={100} viewBox="0 0 48 48">
              <path fill="#48b564" d="M35.76,26.36h0.01c0,0-3.77,5.53-6.94,9.64c-2.74,3.55-3.54,6.59-3.77,8.06	C24.97,44.6,24.53,45,24,45s-0.97-0.4-1.06-0.94c-0.23-1.47-1.03-4.51-3.77-8.06c-0.42-0.55-0.85-1.12-1.28-1.7L28.24,22l8.33-9.88	C37.49,14.05,38,16.21,38,18.5C38,21.4,37.17,24.09,35.76,26.36z" />
              <path fill="#fcc60e" d="M28.24,22L17.89,34.3c-2.82-3.78-5.66-7.94-5.66-7.94h0.01c-0.3-0.48-0.57-0.97-0.8-1.48L19.76,15	c-0.79,0.95-1.26,2.17-1.26,3.5c0,3.04,2.46,5.5,5.5,5.5C25.71,24,27.24,23.22,28.24,22z" />
              <path fill="#2c85eb" d="M28.4,4.74l-8.57,10.18L13.27,9.2C15.83,6.02,19.69,4,24,4C25.54,4,27.02,4.26,28.4,4.74z" />
              <path fill="#ed5748" d="M19.83,14.92L19.76,15l-8.32,9.88C10.52,22.95,10,20.79,10,18.5c0-3.54,1.23-6.79,3.27-9.3	L19.83,14.92z" />
              <path fill="#5695f6" d="M28.24,22c0.79-0.95,1.26-2.17,1.26-3.5c0-3.04-2.46-5.5-5.5-5.5c-1.71,0-3.24,0.78-4.24,2L28.4,4.74	c3.59,1.22,6.53,3.91,8.17,7.38L28.24,22z" />
            </svg>
          </button>
        </div>
        <div className="menu-item item-8">
          <button className="icon-circle" tabIndex={0} aria-label="Google Meet" data-tooltip="Google Meet">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={100} height={100} viewBox="0 0 48 48">
              <rect width={16} height={16} x={12} y={16} fill="#fff" transform="rotate(-90 20 24)" />
              <polygon fill="#1e88e5" points="3,17 3,31 8,32 13,31 13,17 8,16" />
              <path fill="#4caf50" d="M37,24v14c0,1.657-1.343,3-3,3H13l-1-5l1-5h14v-7l5-1L37,24z" />
              <path fill="#fbc02d" d="M37,10v14H27v-7H13l-1-5l1-5h21C35.657,7,37,8.343,37,10z" />
              <path fill="#1565c0" d="M13,31v10H6c-1.657,0-3-1.343-3-3v-7H13z" />
              <polygon fill="#e53935" points="13,7 13,17 3,17" />
              <polygon fill="#2e7d32" points="38,24 37,32.45 27,24 37,15.55" />
              <path fill="#4caf50" d="M46,10.11v27.78c0,0.84-0.98,1.31-1.63,0.78L37,32.45v-16.9l7.37-6.22C45.02,8.8,46,9.27,46,10.11z" />
            </svg>
          </button>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .radial-menu-container {
    --primary-bg: #ffffff;
    --secondary-bg: #f3f4f6;
    --accent-color: #3b82f6;
    --text-color: #1f2937;
    --line-color: #d1d5db;
    --shadow-sm: 0 0.125em 0.25em rgba(0, 0, 0, 0.05);
    --shadow-md: 0 0.25em 0.5em rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 0.5em 1em rgba(0, 0, 0, 0.15);

    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    font-size: 16px;
  }

  .menu-toggle {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  .center-icon {
    position: relative;
    width: 4em;
    height: 4em;
    background: var(--primary-bg);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 100;
    box-shadow: var(--shadow-md);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .center-icon:hover {
    transform: scale(1.1);
    box-shadow: var(--shadow-lg);
    background: var(--line-color);
  }

  .center-icon:hover svg path,
  .center-icon:hover svg circle {
    stroke: white;
  }

  .center-icon:active {
    transform: scale(0.95);
  }

  .center-icon:focus-visible {
    outline: 0.125em solid var(--accent-color);
    outline-offset: 0.25em;
  }

  .center-icon svg {
    width: 2.5em;
    height: 2.5em;
    transition: transform 0.3s ease;
  }

  .menu-toggle:checked ~ .center-icon svg {
    transform: rotate(180deg);
  }

  .connection-lines {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  }

  .line {
    fill: none;
    stroke: url(#googleFlow);
    stroke-width: 2.5;
    stroke-linecap: round;
    opacity: 0;
    stroke-dasharray: 350;
    stroke-dashoffset: 350;

    transition: stroke-dashoffset 0.7s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .menu-toggle:checked ~ .connection-lines .line {
    opacity: 1;
  }

  .menu-toggle:checked ~ .connection-lines .line-1 {
    stroke-dashoffset: 0;
    transition-delay: 0.1s;
  }

  .menu-toggle:checked ~ .connection-lines .line-2 {
    stroke-dashoffset: 0;
    transition-delay: 0.15s;
  }

  .menu-toggle:checked ~ .connection-lines .line-3 {
    stroke-dashoffset: 0;
    transition-delay: 0.2s;
  }

  .menu-toggle:checked ~ .connection-lines .line-4 {
    stroke-dashoffset: 0;
    transition-delay: 0.25s;
  }

  .menu-toggle:checked ~ .connection-lines .line-5 {
    stroke-dashoffset: 0;
    transition-delay: 0.3s;
  }

  .menu-toggle:checked ~ .connection-lines .line-6 {
    stroke-dashoffset: 0;
    transition-delay: 0.35s;
  }

  .menu-toggle:checked ~ .connection-lines .line-7 {
    stroke-dashoffset: 0;
    transition-delay: 0.4s;
  }
  .menu-toggle:checked ~ .connection-lines .line-8 {
    stroke-dashoffset: 0;
    transition-delay: 0.5s;
  }

  .menu-item {
    position: absolute;
    opacity: 0;
    transform: scale(0) translate(-50%, -50%);
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    z-index: 10;
  }

  .icon-circle {
    width: 3.5em;
    height: 3.5em;
    background: var(--primary-bg);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-sm);
    cursor: pointer;
    transition: all 0.3s ease;
    border: 0.125em solid transparent;
  }

  .icon-circle:hover {
    transform: scale(1.15);
    box-shadow: var(--shadow-lg);
    border-color: var(--accent-color);
    background: var(--secondary-bg);
    stroke: #1f2937;
  }

  .icon-circle:active {
    transform: scale(1.05);
  }

  .icon-circle:focus-visible {
    outline: 0.125em solid var(--accent-color);
    outline-offset: 0.125em;
  }

  .icon-circle svg {
    width: 2em;
    height: 2em;
    transition: transform 0.3s ease;
  }

  .icon-circle:hover svg {
    transform: rotate(12deg);
  }

  .menu-toggle:checked ~ .menu-item {
    opacity: 1;
    transform: scale(1) translate(-50%, -50%);
  }

  .item-1 {
    left: 20%;
    top: 28%;
  }

  .menu-toggle:checked ~ .item-1 {
    transition-delay: 0.1s;
  }

  .item-2 {
    left: 45.5%;
    top: 18%;
  }

  .menu-toggle:checked ~ .item-2 {
    transition-delay: 0.15s;
  }

  .item-3 {
    left: 75%;
    top: 15%;
  }

  .menu-toggle:checked ~ .item-3 {
    transition-delay: 0.2s;
  }

  .item-4 {
    left: 80%;
    top: 34.5%;
  }

  .menu-toggle:checked ~ .item-4 {
    transition-delay: 0.25s;
  }

  .item-5 {
    left: 82%;
    top: 53%;
  }

  .menu-toggle:checked ~ .item-5 {
    transition-delay: 0.3s;
  }

  .item-6 {
    left: 82.5%;
    top: 72%;
  }

  .menu-toggle:checked ~ .item-6 {
    transition-delay: 0.35s;
  }

  .item-7 {
    left: 50%;
    top: 85%;
  }

  .menu-toggle:checked ~ .item-7 {
    transition-delay: 0.4s;
  }

  .item-8 {
    left: 27%;
    top: 74%;
  }

  .menu-toggle:checked ~ .item-8 {
    transition-delay: 0.5s;
  }

  @media (max-width: 768px) {
    .radial-menu-container {
      font-size: 14px;
    }
  }

  @media (max-width: 480px) {
    .radial-menu-container {
      font-size: 12px;
    }
  }

  .icon-circle {
    position: relative;
  }

  .icon-circle::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 120%;
    left: 50%;
    transform: translateX(-50%) translateY(6px);

    background: linear-gradient(
      135deg,
      #4285f4 0%,
      #ea4335 30%,
      #fbbc05 60%,
      #34a853 100%
    );
    color: #ffffff;
    padding: 0.35em 0.6em;
    font-size: 0.75em;
    white-space: nowrap;
    border-radius: 0.375em;

    opacity: 0;
    pointer-events: none;
    transition:
      opacity 0.25s ease,
      transform 0.25s ease;
    z-index: 999;
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.25);
  }

  .icon-circle:hover::after,
  .icon-circle:hover::before,
  .icon-circle:focus-visible::after,
  .icon-circle:focus-visible::before {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }`;

export default Checkbox;
