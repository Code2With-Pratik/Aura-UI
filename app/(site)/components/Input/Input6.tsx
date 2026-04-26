import React from 'react';

export default function Input6() {
  return (
    <>
      <div className="floating-input-group">
        <input 
          id="name" 
          type="text" 
          required 
          autoComplete="off" 
        />
        <label htmlFor="name">Name</label>
      </div>

      <style dangerouslySetInnerHTML={{ __html: styles }} />
    </>
  );
}

const styles = `
  /* From Uiverse.io by Maximinodotpy */ 
  .floating-input-group {
    font-family: 'Segoe UI', sans-serif;
    margin: 1em 0 1em 0;
    max-width: 190px;
    position: relative;
  }

  .floating-input-group input {
    font-size: 100%;
    padding: 0.8em;
    outline: none;
    border: 2px solid rgb(200, 200, 200);
    background-color: transparent;
    border-radius: 20px;
    width: 100%;
    /* Added box-sizing so padding doesn't break the 100% width */
    box-sizing: border-box; 
  }

  .floating-input-group label {
    font-size: 100%;
    position: absolute;
    left: 0;
    padding: 0.8em;
    margin-left: 0.5em;
    pointer-events: none;
    transition: all 0.3s ease;
    color: rgb(100, 100, 100);
  }

  .floating-input-group :is(input:focus, input:valid) ~ label {
    transform: translateY(-50%) scale(.9);
    margin: 0em;
    margin-left: 1.3em;
    padding: 0.4em;
    background-color: #e8e8e8; /* Change this to match your app's background color */
  }

  .floating-input-group :is(input:focus, input:valid) {
    border-color: rgb(150, 150, 200);
  }
`;