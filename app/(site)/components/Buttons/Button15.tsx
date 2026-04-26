import React from 'react';

export default function Button15() {
  return (
    <>
      <button className="anatomy-btn">
        <div className="icon">
          <span className="text-icon hide">Icon</span>
          <svg
            className="css-i6dzq1"
            strokeLinejoin="round"
            strokeLinecap="round"
            fill="none"
            strokeWidth="2"
            stroke="currentColor"
            height="24"
            width="24"
            viewBox="0 0 24 24"
          >
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
          </svg>
        </div>
        
        <span className="title">Anatomy</span>
        
        <div className="padding-left hide">
          <div className="padding-left-line">
            <span className="padding-left-text">Left Padding</span>
          </div>
        </div>
        
        <div className="padding-right hide">
          <div className="padding-right-line">
            <span className="padding-right-text">Right Padding</span>
          </div>
        </div>
        
        <div className="background hide">
          <span className="background-text">Background</span>
        </div>
        
        <div className="border hide">
          <span className="border-text">Border Radius</span>
        </div>
      </button>

      <style dangerouslySetInnerHTML={{ __html: styles }} />
    </>
  );
}

const styles = `
  /* From Uiverse.io by barisdogansutcu */ 
  .anatomy-btn {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 14px;
    background-image: linear-gradient(#3470fa, #313ed7);
    color: white;
    border: solid 2px #0618db;
    height: 50px;
    padding: 0px 20px;
    border-radius: 5px;
    font-weight: 600;
    transform: scale(0.85);
    position: relative;
    font-family: inherit;
    margin: 0 auto; 
  }

  .anatomy-btn:not(:hover) .hide,
  .anatomy-btn:not(:hover) .icon::before,
  .anatomy-btn:not(:hover) .icon::after {
    opacity: 0;
    visibility: hidden;
    transform: scale(1.4);
  }

  .hide {
    transition: all 0.2s ease;
  }

  .anatomy-btn:active {
    background-image: linear-gradient(#313ed7, #3470fa);
    border-color: #313ed7;
  }

  .anatomy-btn .icon {
    position: relative;
  }

  .anatomy-btn .icon::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 6px;
    height: 6px;
    transform: translate(-50%, -50%);
    background-color: rgb(255, 0, 170);
    border-radius: 100%;
  }

  .anatomy-btn .icon::after {
    content: "";
    position: absolute;
    right: 0;
    bottom: 0;
    transform: translate(-19%, -60%);
    width: 100px;
    height: 33px;
    background-color: transparent;
    border-radius: 12px 22px 2px 2px;
    border-right: solid 2px rgb(255, 0, 170);
    border-top: solid 2px transparent;
  }

  .anatomy-btn .icon .text-icon {
    color: rgb(255, 0, 170);
    position: absolute;
    font-size: 12px;
    left: -37px;
    top: -38px;
  }

  .anatomy-btn .icon svg {
    width: 20px;
    height: 20px;
    border: solid 2px transparent;
    display: flex;
  }

  .anatomy-btn:hover .icon svg {
    border: solid 2px rgba(255, 0, 170, 0.692);
  }

  .anatomy-btn .padding-left {
    position: absolute;
    width: 20px;
    height: 2px;
    background-color: rgb(255, 0, 170);
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  .anatomy-btn .padding-left:before {
    content: "";
    width: 2px;
    height: 10px;
    background-color: rgb(255, 0, 170);
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  .anatomy-btn .padding-left:after {
    content: "";
    width: 2px;
    height: 10px;
    background-color: rgb(255, 0, 170);
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  .anatomy-btn .padding-left-line {
    position: absolute;
    width: 30px;
    height: 2px;
    background-color: rgb(255, 0, 170);
    left: -24px;
    top: 11px;
    transform: rotate(-50deg);
  }

  .anatomy-btn .padding-left-line::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 6px;
    height: 6px;
    transform: translate(-50%, -50%);
    background-color: rgb(255, 0, 170);
    border-radius: 100%;
  }

  .anatomy-btn .padding-left-text {
    color: rgb(255, 0, 170);
    font-size: 12px;
    position: absolute;
    white-space: nowrap;
    transform: rotate(50deg);
    bottom: 30px;
    left: -67px;
  }

  .anatomy-btn .padding-right {
    position: absolute;
    width: 20px;
    height: 2px;
    background-color: rgb(255, 0, 170);
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  .anatomy-btn .padding-right:before {
    content: "";
    width: 2px;
    height: 10px;
    background-color: rgb(255, 0, 170);
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  .anatomy-btn .padding-right:after {
    content: "";
    width: 2px;
    height: 10px;
    background-color: rgb(255, 0, 170);
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  .anatomy-btn .padding-right-line {
    position: absolute;
    width: 30px;
    height: 2px;
    background-color: rgb(255, 0, 170);
    right: -24px;
    top: 11px;
    transform: rotate(50deg);
  }

  .anatomy-btn .padding-right-line::before {
    content: "";
    position: absolute;
    left: 30px;
    top: 0;
    width: 6px;
    height: 6px;
    transform: translate(-50%, -50%);
    background-color: rgb(255, 0, 170);
    border-radius: 100%;
  }

  .anatomy-btn .padding-right-text {
    color: rgb(255, 0, 170);
    font-size: 12px;
    position: absolute;
    white-space: nowrap;
    transform: rotate(-50deg);
    bottom: 33px;
    left: 18px;
  }

  .anatomy-btn .background {
    position: absolute;
  }

  .anatomy-btn .background::before {
    content: "";
    position: absolute;
    right: 27px;
    bottom: -70px;
    width: 100px;
    height: 53px;
    background-color: transparent;
    border-radius: 0px 0px 22px 22px;
    border-right: solid 2px rgb(255, 0, 170);
    border-bottom: solid 2px transparent;
  }

  .anatomy-btn .background::after {
    content: "";
    position: absolute;
    right: 25px;
    bottom: -20px;
    width: 6px;
    height: 6px;
    background-color: rgb(255, 0, 170);
    border-radius: 100%;
  }

  .anatomy-btn .background-text {
    position: absolute;
    color: rgb(255, 0, 170);
    font-size: 12px;
    bottom: -70px;
    left: -115px;
  }

  .anatomy-btn .border {
    position: absolute;
    right: 0;
    top: 0;
  }

  .anatomy-btn .border:before {
    content: "";
    width: 15px;
    height: 15px;
    border: solid 2px rgb(255, 0, 170);
    position: absolute;
    right: 0%;
    top: 0;
    transform: translate(50%, -50%);
    border-radius: 100%;
  }

  .anatomy-btn .border:after {
    content: "";
    width: 2px;
    height: 25px;
    background-color: rgb(255, 0, 170);
    position: absolute;
    right: -10px;
    top: -15px;
    transform: translate(50%, -50%) rotate(60deg);
  }

  .anatomy-btn .border .border-text {
    position: absolute;
    color: rgb(255, 0, 170);
    font-size: 12px;
    right: -112px;
    top: -30px;
    white-space: nowrap;
  }
`;