import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .loader {
    width: 45px;
    height: 90px;
    position: relative;
  }
  .loader:after {
    content: "";
    position: absolute;
    inset: 0 0 20px;
    border-radius: 15px 15px 10px 10px;
    padding: 1px;
    background: repeating-linear-gradient(-45deg, #91d2e2 0 8px, #1296a7 0 12px)
      content-box;
    --c: radial-gradient(farthest-side, #000 94%, #0000);
    -webkit-mask:
      linear-gradient(#0000 0 0),
      var(--c) -10px -10px,
      var(--c) 15px -14px,
      var(--c) 9px -6px,
      var(--c) -12px 9px,
      var(--c) 14px 9px,
      var(--c) 23px 27px,
      var(--c) -8px 35px,
      var(--c) 50% 50%,
      linear-gradient(#000 0 0);
    mask:
      linear-gradient(#000 0 0),
      var(--c) -10px -10px,
      var(--c) 15px -14px,
      var(--c) 9px -6px,
      var(--c) -12px 9px,
      var(--c) 14px 9px,
      var(--c) 23px 27px,
      var(--c) -8px 35px,
      var(--c) 50% 50%,
      linear-gradient(#0000 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude, add, add, add, add, add, add, add, add;
    -webkit-mask-repeat: no-repeat;
    animation: l2 3s infinite ease-out;
  }
  .loader:before {
    content: "";
    position: absolute;
    inset: 50% calc(50% - 4px) 0;
    background: #e0a267;
    border-radius: 50px;
  }
  @keyframes l2 {
    0% {
      -webkit-mask-size:
        auto,
        0 0,
        0 0,
        0 0,
        0 0,
        0 0,
        0 0,
        0 0,
        0 0;
    }
    10% {
      -webkit-mask-size:
        auto,
        25px 25px,
        0 0,
        0 0,
        0 0,
        0 0,
        0 0,
        0 0,
        0 0;
    }
    20% {
      -webkit-mask-size:
        auto,
        25px 25px,
        25px 25px,
        0 0,
        0 0,
        0 0,
        0 0,
        0 0,
        0 0;
    }
    30% {
      -webkit-mask-size:
        auto,
        25px 25px,
        25px 25px,
        30px 30px,
        0 0,
        0 0,
        0 0,
        0 0,
        0 0;
    }
    40% {
      -webkit-mask-size:
        auto,
        25px 25px,
        25px 25px,
        30px 30px,
        30px 30px,
        0 0,
        0 0,
        0 0,
        0 0;
    }
    50% {
      -webkit-mask-size:
        auto,
        25px 25px,
        25px 25px,
        30px 30px,
        30px 30px,
        25px 25px,
        0 0,
        0 0,
        0 0;
    }
    60% {
      -webkit-mask-size:
        auto,
        25px 25px,
        25px 25px,
        30px 30px,
        30px 30px,
        25px 25px,
        25px 25px,
        0 0,
        0 0;
    }
    70% {
      -webkit-mask-size:
        auto,
        25px 25px,
        25px 25px,
        30px 30px,
        30px 30px,
        25px 25px,
        25px 25px,
        25px 25px,
        0 0;
    }
    80%,
    100% {
      -webkit-mask-size:
        auto,
        25px 25px,
        25px 25px,
        30px 30px,
        30px 30px,
        25px 25px,
        25px 25px,
        25px 25px,
        200% 200%;
    }
  }`;

export default Loader;
