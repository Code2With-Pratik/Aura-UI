import React from 'react';

export default function card2() {
  return (
    <>
      <div className="card2-wrapper">
        <div className="card2-card">
          {/* Background Cover Image - This is the ONLY thing that bends */}
          <div className="card2-bg"></div>

          {/* 3D Pop-out Character Image - Animates from bottom */}
          <img
            src="/AssassinsCreed.png"
            alt="Assassin's Creed Character"
            className="card2-character"
          />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: styles }} />
    </>
  );
}

const styles = `
  /* Container establishes the 3D perspective space */
  .card2-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    perspective: 1000px; 
    font-family: 'Cinzel', 'Times New Roman', serif;
  }

  /* The Card Wrapper holds the 3D context but DOES NOT bend itself */
  .card2-card {
    width: 300px;
    height: 450px;
    position: relative;
    transform-style: preserve-3d;
    cursor: pointer;
  }

  /* Background Image Layer - This bends backwards on hover */
  .card2-bg {
    position: absolute;
    inset: 0;
    background-image: url('/AssassinsCreedCover.jpg');
    background-size: cover;
    background-position: center;
    border-radius: 15px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
    /* Anchor the transform to the bottom so the top tilts away */
    transform-origin: bottom center;
    transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.6s ease, filter 0.6s ease;
  }

  /* Hover Action: Bends ONLY the background backwards */
  .card2-card:hover .card2-bg {
    transform: rotateX(35deg);
    box-shadow: 0 40px 40px rgba(0, 0, 0, 0.8);
    filter: brightness(0.4);
  }

  /* Foreground Character Layer - Invisible by default */
  .card2-character {
    position: absolute;
    width: 120%; /* Slightly smaller for better containment */
    left: 50%;
    bottom: -10%; 
    
    /* Starts hidden, pushed down, scaled down, and slightly pushed back in 3D */
    opacity: 0;
    transform: translateX(-50%) translateY(120px) translateZ(-20px) scale(0.6);
    filter: drop-shadow(0px 0px 0px rgba(0,0,0,0));
    
    transition: all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
    pointer-events: none; 
    z-index: 10;
  }

  /* Hover Action: Character pops up from the bottom, scales up, and pushes OUT towards user */
  .card2-card:hover .card2-character {
    opacity: 1;
    transform: translateX(-50%) translateY(-60px) translateZ(100px) scale(1.25);
    filter: drop-shadow(0px 30px 20px rgba(0,0,0,0.8));
  }

  /* Floating Title */
  .card2-title {
    position: absolute;
    bottom: 30px;
    left: 0;
    width: 100%;
    text-align: center;
    color: #e0e0e0;
    font-size: 26px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    text-shadow: 0 4px 10px rgba(0,0,0,0.8);
    
    /* Initial state on the card */
    transform: translateZ(1px);
    transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), color 0.6s, text-shadow 0.6s;
    pointer-events: none;
    z-index: 5;
  }

  /* Hover Action: Title pushes out just behind the character */
  .card2-card:hover .card2-title {
    transform: translateZ(80px) translateY(20px);
    color: #ffffff;
    text-shadow: 0 15px 20px rgba(0,0,0,1);
  }
`;