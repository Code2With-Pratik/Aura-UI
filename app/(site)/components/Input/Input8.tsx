import React from 'react';

export default function Input8() {
  return (
    <>
      <div className="neumorphic-input-container">
        <input required type="text" name="text" className="neumorphic-input" />
        <label className="neumorphic-label">Username</label>
      </div>

      <style dangerouslySetInnerHTML={{ __html: styles }} />
    </>
  );
}

const styles = `
  /* From Uiverse.io by AmIt-DasIT */ 
  .neumorphic-input-container {
    display: flex;
    flex-direction: column;
    gap: 7px;
    position: relative;
    color: white;
    /* Added margin to give the floating label room to move up */
    margin-top: 35px; 
  }

  .neumorphic-input-container .neumorphic-label {
    font-size: 15px;
    padding-left: 10px;
    position: absolute;
    top: 13px;
    transition: 0.3s;
    pointer-events: none;
  }

  .neumorphic-input {
    width: 200px;
    height: 45px;
    border: none;
    outline: none;
    padding: 0px 10px; /* Adjusted slightly to keep text off the edge */
    border-radius: 6px;
    color: #fff;
    font-size: 15px;
    background-color: transparent;
    box-shadow: 3px 3px 10px rgba(0,0,0,1),
    -1px -1px 6px rgba(255, 255, 255, 0.4);
    font-family: inherit;
  }

  .neumorphic-input:focus {
    border: 2px solid transparent;
    color: #fff;
    box-shadow: 3px 3px 10px rgba(0,0,0,1),
    -1px -1px 6px rgba(255, 255, 255, 0.4),
    inset 3px 3px 10px rgba(0,0,0,1),
    inset -1px -1px 6px rgba(255, 255, 255, 0.4);
  }

  .neumorphic-input-container .neumorphic-input:valid ~ .neumorphic-label,
  .neumorphic-input-container .neumorphic-input:focus ~ .neumorphic-label {
    transition: 0.3s;
    padding-left: 2px;
    transform: translateY(-35px);
  }

  .neumorphic-input-container .neumorphic-input:valid,
  .neumorphic-input-container .neumorphic-input:focus {
    box-shadow: 3px 3px 10px rgba(0,0,0,1),
    -1px -1px 6px rgba(255, 255, 255, 0.4),
    inset 3px 3px 10px rgba(0,0,0,1),
    inset -1px -1px 6px rgba(255, 255, 255, 0.4);
  }
`;