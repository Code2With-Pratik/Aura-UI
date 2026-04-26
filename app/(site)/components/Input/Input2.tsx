import React from 'react';

export default function Input2() {
  return (
    <div className="input2-container relative flex items-center justify-center w-full h-full overflow-hidden">
      {/* Main Input Wrapper */}
      <div className="input2-wrapper">
        <div className="input2-glow"></div>
        <div className="input2-darkBorderBg"></div>
        <div className="input2-darkBorderBg"></div>
        <div className="input2-darkBorderBg"></div>

        <div className="input2-white"></div>
        <div className="input2-border"></div>

        <div className="input2-main">
          <input placeholder="Search..." type="text" name="text" className="input2-input" />
          <div className="input2-mask"></div>
          <div className="input2-pink-mask"></div>
          <div className="input2-filterBorder"></div>
          
          <div className="input2-filter-icon">
            <svg
              preserveAspectRatio="none"
              height="27"
              width="27"
              viewBox="4.8 4.56 14.832 15.408"
              fill="none"
            >
              <path
                d="M8.16 6.65002H15.83C16.47 6.65002 16.99 7.17002 16.99 7.81002V9.09002C16.99 9.56002 16.7 10.14 16.41 10.43L13.91 12.64C13.56 12.93 13.33 13.51 13.33 13.98V16.48C13.33 16.83 13.1 17.29 12.81 17.47L12 17.98C11.24 18.45 10.2 17.92 10.2 16.99V13.91C10.2 13.5 9.97 12.98 9.73 12.69L7.52 10.36C7.23 10.08 7 9.55002 7 9.20002V7.87002C7 7.17002 7.52 6.65002 8.16 6.65002Z"
                stroke="#d6d6e6"
                strokeWidth="1"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </div>
          
          <div className="input2-search-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
              height="24"
              fill="none"
              className="feather feather-search"
            >
              <circle stroke="url(#search)" r="8" cy="11" cx="11"></circle>
              <line
                stroke="url(#searchl)"
                y2="16.65"
                y1="22"
                x2="16.65"
                x1="22"
              ></line>
              <defs>
                <linearGradient gradientTransform="rotate(50)" id="search">
                  <stop stopColor="#f8e7f8" offset="0%"></stop>
                  <stop stopColor="#b6a9b7" offset="50%"></stop>
                </linearGradient>
                <linearGradient id="searchl">
                  <stop stopColor="#b6a9b7" offset="0%"></stop>
                  <stop stopColor="#837484" offset="50%"></stop>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: styles }} />
    </div>
  );
}

const styles = `
  .input2-container .input2-white,
  .input2-container .input2-border,
  .input2-container .input2-darkBorderBg,
  .input2-container .input2-glow {
    max-height: 60px;
    max-width: 230px;
    height: 100%;
    width: 100%;
    position: absolute;
    overflow: hidden;
    z-index: -1;
    border-radius: 12px;
    filter: blur(3px);
  }
  
  .input2-container .input2-input {
    background-color: #010201;
    border: none;
    width: 210px;
    height: 48px;
    border-radius: 10px;
    color: white;
    padding-inline: 45px;
    font-size: 14px;
  }
  
  .input2-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
  }
  
  .input2-input::placeholder {
    color: #c0b9c0;
  }
  
  .input2-input:focus {
    outline: none;
  }
  
  .input2-main:focus-within > .input2-mask {
    display: none;
  }
  
  .input2-mask {
    pointer-events: none;
    width: 100px;
    height: 20px;
    position: absolute;
    background: linear-gradient(90deg, transparent, black);
    top: 18px;
    left: 70px;
  }
  
  .input2-pink-mask {
    pointer-events: none;
    width: 30px;
    height: 20px;
    position: absolute;
    background: #cf30aa;
    top: 10px;
    left: 5px;
    filter: blur(20px);
    opacity: 0.8;
    transition: all 2s;
  }
  
  .input2-main:hover > .input2-pink-mask {
    opacity: 0;
  }
  
  .input2-white {
    max-height: 63px;
    max-width: 307px;
    border-radius: 10px;
    filter: blur(2px);
  }
  
  .input2-white::before {
    content: "";
    z-index: -2;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(83deg);
    position: absolute;
    width: 600px;
    height: 600px;
    background-repeat: no-repeat;
    background-position: 0 0;
    filter: brightness(1.4);
    background-image: conic-gradient(
      rgba(0, 0, 0, 0) 0%,
      #a099d8,
      rgba(0, 0, 0, 0) 8%,
      rgba(0, 0, 0, 0) 50%,
      #dfa2da,
      rgba(0, 0, 0, 0) 58%
    );
    transition: all 2s;
  }
  
  .input2-border {
    max-height: 59px;
    max-width: 303px;
    border-radius: 11px;
    filter: blur(0.5px);
  }
  
  .input2-border::before {
    content: "";
    z-index: -2;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(70deg);
    position: absolute;
    width: 600px;
    height: 600px;
    filter: brightness(1.3);
    background-repeat: no-repeat;
    background-position: 0 0;
    background-image: conic-gradient(
      #1c191c,
      #402fb5 5%,
      #1c191c 14%,
      #1c191c 50%,
      #cf30aa 60%,
      #1c191c 64%
    );
    transition: all 2s;
  }
  
  .input2-darkBorderBg {
    max-height: 65px;
    max-width: 312px;
  }
  
  .input2-darkBorderBg::before {
    content: "";
    z-index: -2;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(82deg);
    position: absolute;
    width: 600px;
    height: 600px;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-image: conic-gradient(
      rgba(0, 0, 0, 0),
      #18116a,
      rgba(0, 0, 0, 0) 10%,
      rgba(0, 0, 0, 0) 50%,
      #6e1b60,
      rgba(0, 0, 0, 0) 60%
    );
    transition: all 2s;
  }
  
  .input2-wrapper:hover > .input2-darkBorderBg::before {
    transform: translate(-50%, -50%) rotate(262deg);
  }
  .input2-wrapper:hover > .input2-glow::before {
    transform: translate(-50%, -50%) rotate(240deg);
  }
  .input2-wrapper:hover > .input2-white::before {
    transform: translate(-50%, -50%) rotate(263deg);
  }
  .input2-wrapper:hover > .input2-border::before {
    transform: translate(-50%, -50%) rotate(250deg);
  }
  
  .input2-wrapper:focus-within > .input2-darkBorderBg::before {
    transform: translate(-50%, -50%) rotate(442deg);
    transition: all 4s;
  }
  .input2-wrapper:focus-within > .input2-glow::before {
    transform: translate(-50%, -50%) rotate(420deg);
    transition: all 4s;
  }
  .input2-wrapper:focus-within > .input2-white::before {
    transform: translate(-50%, -50%) rotate(443deg);
    transition: all 4s;
  }
  .input2-wrapper:focus-within > .input2-border::before {
    transform: translate(-50%, -50%) rotate(430deg);
    transition: all 4s;
  }
  
  .input2-glow {
    overflow: hidden;
    filter: blur(30px);
    opacity: 0.4;
    max-height: 130px;
    max-width: 354px;
  }
  
  .input2-glow:before {
    content: "";
    z-index: -2;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(60deg);
    position: absolute;
    width: 999px;
    height: 999px;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-image: conic-gradient(
      #000,
      #402fb5 5%,
      #000 38%,
      #000 50%,
      #cf30aa 60%,
      #000 87%
    );
    transition: all 2s;
  }
  
  .input2-filter-icon {
    position: absolute;
    top: 8px;
    right: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    max-height: 40px;
    max-width: 38px;
    height: 100%;
    width: 100%;
    isolation: isolate;
    overflow: hidden;
    border-radius: 10px;
    background: linear-gradient(180deg, #161329, black, #1d1b4b);
    border: 1px solid transparent;
  }
  
  .input2-filterBorder {
    height: 42px;
    width: 40px;
    position: absolute;
    overflow: hidden;
    top: 7px;
    right: 7px;
    border-radius: 10px;
  }
  
  .input2-filterBorder::before {
    content: "";
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(90deg);
    position: absolute;
    width: 600px;
    height: 600px;
    background-repeat: no-repeat;
    background-position: 0 0;
    filter: brightness(1.35);
    background-image: conic-gradient(
      rgba(0, 0, 0, 0),
      #3d3a4f,
      rgba(0, 0, 0, 0) 50%,
      rgba(0, 0, 0, 0) 50%,
      #3d3a4f,
      rgba(0, 0, 0, 0) 100%
    );
  }
  
  .input2-main {
    position: relative;
  }
  
  .input2-search-icon {
    position: absolute;
    left: 20px;
    top: 15px;
  }
`;