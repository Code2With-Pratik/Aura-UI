import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="main">
        <div className="up">
          <div className="loaders">
            <div className="loader" />
            <div className="loader" />
            <div className="loader" />
            <div className="loader" />
            <div className="loader" />
            <div className="loader" />
            <div className="loader" />
            <div className="loader" />
            <div className="loader" />
            <div className="loader" />
          </div>
          <div className="loadersB">
            <div className="loaderA">
              <div className="ball0" />
            </div>
            <div className="loaderA">
              <div className="ball1" />
            </div>
            <div className="loaderA">
              <div className="ball2" />
            </div>
            <div className="loaderA">
              <div className="ball3" />
            </div>
            <div className="loaderA">
              <div className="ball4" />
            </div>
            <div className="loaderA">
              <div className="ball5" />
            </div>
            <div className="loaderA">
              <div className="ball6" />
            </div>
            <div className="loaderA">
              <div className="ball7" />
            </div>
            <div className="loaderA">
              <div className="ball8" />
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .main {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .loaders,
  .loadersB {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .loader {
    position: absolute;
    width: 1.15em;
    height: 13em;
    border-radius: 50px;
    background: #e0e0e0;
  }
  .loader:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 1.15em;
    height: 5em;
    background: #e0e0e0;
    border-radius: 50px;
    border: 1px solid #e2e2e2;
    box-shadow:
      inset 5px 5px 15px #d3d2d2ab,
      inset -5px -5px 15px #e9e9e9ab;
    mask-image: linear-gradient(
      to bottom,
      black calc(100% - 48px),
      transparent 100%
    );
  }
  .loader::before {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    width: 1.15em;
    height: 4.5em;
    background: #e0e0e0;
    border-radius: 50px;
    border: 1px solid #e2e2e2;
    box-shadow:
      inset 5px 5px 15px #d3d2d2ab,
      inset -5px -5px 15px #e9e9e9ab;
    mask-image: linear-gradient(
      to top,
      black calc(100% - 48px),
      transparent 100%
    );
  }
  .loaderA {
    position: absolute;
    width: 1.15em;
    height: 13em;
    border-radius: 50px;
    background: transparent;
  }
  .ball0,
  .ball1,
  .ball2,
  .ball3,
  .ball4,
  .ball5,
  .ball6,
  .ball7,
  .ball8,
  .ball9 {
    width: 1.15em;
    height: 1.15em;
    box-shadow:
      rgba(0, 0, 0, 0.17) 0px -10px 10px 0px inset,
      rgba(0, 0, 0, 0.15) 0px -15px 15px 0px inset,
      rgba(0, 0, 0, 0.1) 0px -40px 20px 0px inset,
      rgba(0, 0, 0, 0.06) 0px 2px 1px,
      rgba(0, 0, 0, 0.09) 0px 4px 2px,
      rgba(0, 0, 0, 0.09) 0px 8px 4px,
      rgba(0, 0, 0, 0.09) 0px 16px 8px,
      rgba(0, 0, 0, 0.09) 0px 32px 16px,
      0px -1px 15px -8px rgba(0, 0, 0, 0.09);
    border-radius: 50%;
    transition: transform 800ms cubic-bezier(1, -0.4, 0, 1.4);
    background-color: rgb(232, 232, 232, 1);
    animation: 3.63s move ease-in-out infinite;
  }
  .loader:nth-child(2) {
    transform: rotate(20deg);
  }
  .loader:nth-child(3) {
    transform: rotate(40deg);
  }
  .loader:nth-child(4) {
    transform: rotate(60deg);
  }
  .loader:nth-child(5) {
    transform: rotate(80deg);
  }
  .loader:nth-child(6) {
    transform: rotate(100deg);
  }
  .loader:nth-child(7) {
    transform: rotate(120deg);
  }
  .loader:nth-child(8) {
    transform: rotate(140deg);
  }
  .loader:nth-child(9) {
    transform: rotate(160deg);
  }

  .loaderA:nth-child(2) {
    transform: rotate(20deg);
  }
  .loaderA:nth-child(3) {
    transform: rotate(40deg);
  }
  .loaderA:nth-child(4) {
    transform: rotate(60deg);
  }
  .loaderA:nth-child(5) {
    transform: rotate(80deg);
  }
  .loaderA:nth-child(6) {
    transform: rotate(100deg);
  }
  .loaderA:nth-child(7) {
    transform: rotate(120deg);
  }
  .loaderA:nth-child(8) {
    transform: rotate(140deg);
  }
  .loaderA:nth-child(9) {
    transform: rotate(160deg);
  }

  .ball1 {
    animation-delay: 0.2s;
  }
  .ball2 {
    animation-delay: 0.4s;
  }
  .ball3 {
    animation-delay: 0.6s;
  }
  .ball4 {
    animation-delay: 0.8s;
  }
  .ball5 {
    animation-delay: 1s;
  }
  .ball6 {
    animation-delay: 1.2s;
  }
  .ball7 {
    animation-delay: 1.4s;
  }
  .ball8 {
    animation-delay: 1.6s;
  }
  .ball9 {
    animation-delay: 1.8s;
  }

  @keyframes move {
    0% {
      transform: translateY(0em);
    }
    50% {
      transform: translateY(12em);
    }
    100% {
      transform: translateY(0em);
    }
  }`;

export default Loader;
