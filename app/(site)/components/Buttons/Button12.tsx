import React from 'react';

export default function Button12() {
  return (
    <>
      <button className="pickup-btn">
        Pick up!
      </button>

      <style dangerouslySetInnerHTML={{ __html: styles }} />
    </>
  );
}

const styles = `
  /* From Uiverse.io by xueyuantan */ 
  .pickup-btn {
    width: 9em;
    height: 3em;
    border-radius: 30em;
    font-size: 15px;
    font-family: inherit;
    border: none;
    position: relative;
    overflow: hidden;
    z-index: 1;
    /* Neumorphic shadow effect */
    box-shadow: 6px 6px 12px #c5c5c5,
               -6px -6px 12px #ffffff;
    background-color: #e0e5ec; /* Added a subtle base color to make the neumorphism pop */
    cursor: pointer;
    color: #333;
    transition: color 0.3s ease;
  }

  .pickup-btn::before {
    content: '';
    width: 0;
    height: 3em;
    border-radius: 30em;
    position: absolute;
    top: 0;
    left: 0;
    background-image: linear-gradient(to right, #0fd850 0%, #f9f047 100%);
    transition: .5s ease;
    display: block;
    z-index: -1;
  }

  .pickup-btn:hover::before {
    width: 9em;
  }
`;