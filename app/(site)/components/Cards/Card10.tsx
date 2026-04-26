import React from 'react';

export default function Card10() {
  return (
    <>
    <div className="card10-container">
      <img
        src="/Image.jpg"
        alt="Anime Couple"
      />
      <div className="card10-text-area">
        "There is always some madness in love. But there is also always some
        reason in madness. Young love is a flame; very pretty, often very
        hot and fierce, but still only light and flickering.🤍"
      </div>
    </div>

      <style dangerouslySetInnerHTML={{ __html: styles }} />
    </>
  );
}

const styles = `
  @import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

  /* Wrapper to center the single card on the page */
  .card10-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 50px 20px;
    font-family: "Poppins", sans-serif;
  }

  .card10-container {
    height: 300px;
    width: 350px;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    box-shadow: 0 10px 10px #0000005e;
  }

  .card10-container img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 15px;
    filter: grayscale(1);
    transition: 0.4s;
    cursor: pointer;
    position: relative;
    display: block;
  }

  .card10-container:hover img {
    filter: grayscale(0);
    transform: scale(1.3) rotate(-7deg);
  }

  .card10-text-area {
    position: absolute;
    /* Adjusted from 12% to 50% to properly center the text box */
    top: 50%;
    left: 50%;
    padding: 15px;
    width: 250px;
    color: #fff;
    opacity: 0;
    transition: 0.4s;
    /* Combined translate and scale so it doesn't lose its centering */
    transform: translate(-50%, -50%) scale(0);
    z-index: 1;
    font-size: 13px;
    text-align: center;
    line-height: 1.5;
  }

  .card10-container:hover > .card10-text-area {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }

  .card10-text-area::before {
    height: 100%;
    width: 100%;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(#0000007f, transparent, #0000006f);
    z-index: -1;
    border-radius: 10px;
    transition: 0.4s;
  }

  .card10-container:hover .card10-text-area::before {
    transition-delay: 0.5s;
    backdrop-filter: blur(5px);
  }
`;