import React from 'react';

export default function Input10() {
  return (
    <>
      <div className="gradient-glow-box">
        <div className="gradient-glow-border">
          <input 
            type="text" 
            name="text" 
            className="gradient-glow-input" 
            placeholder="Name" 
          />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: styles }} />
    </>
  );
}

const styles = `
  /* From Uiverse.io by Rodrypaladin */ 
  .gradient-glow-box {
    position: relative;
    /* Added inline-block so it hugs the input width perfectly */
    display: inline-block; 
  }

  .gradient-glow-border {
    background-image: linear-gradient(to right bottom, #e300ff, #ff00aa, #ff5956, #ffb900, #fffe00);
    box-shadow: -15px -5px 20px -5px rgba(225, 0, 255, 0.4),
      15px -5px 20px -5px rgba(255, 0, 212, 0.4),
      15px 5px 20px -5px rgba(255, 174, 0, 0.4),
      -15px 5px 20px -5px rgba(255, 230, 0, 0.4);
    padding: 3px;
    border-radius: 4px; 
  }

  .gradient-glow-input {
    background-color: #212121;
    max-width: 210px;
    width: 100%;
    height: 38px;
    padding: 0 14px 0 8px;
    font-size: 1.1em;
    position: relative;
    border: none;
    color: white;
    outline: 0;
    overflow: hidden;
    font-family: inherit;
    /* Prevent the inner input from overflowing the padded border */
    box-sizing: border-box; 
  }

  .gradient-glow-box::after,
  .gradient-glow-box::before {
    content: "";
    width: 130px;
    height: 30px;
    position: absolute;
    z-index: -1;
  }

  .gradient-glow-box::after {
    bottom: 0;
    right: 0;
  }

  .gradient-glow-box::before {
    top: 0;
    left: 0;
  }

  .gradient-glow-input::placeholder {
    transition: all 0.5s ease-in, transform 0.2s ease-in 0.6s;
    color: #888;
  }

  .gradient-glow-input:focus::placeholder {
    padding-left: 165px;
    transform: translateY(-50px);
  }
`;