import React from 'react';

export default function Input11() {
  return (
    <>
      <div className="add-item-container">
        <input type="text" placeholder="Add Item" />
        <button className="add-btn">Add</button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: styles }} />
    </>
  );
}

const styles = `
  /* From Uiverse.io by Smit-Prajapati */ 
  .add-item-container {
    display: flex;
    background: white;
    border-radius: 0.8rem;
    background: linear-gradient(135deg, #23272F 0%, #14161a 100%);
    box-shadow: 6px 6px 12px #0e1013, -6px -6px 20px #383e4b;
    padding: 0.2rem;
    gap: 0.2rem;
    max-width: 210px; 
    width: 100%;
  }

  .add-item-container input {
    border-radius: 0.6rem 0 0 0.6rem;
    background: #23272F;
    box-shadow: inset 3px 3px 6px #0e1013, inset -3px -3px 6px #383e4b;
    width: 100%;
    flex-basis: 70%;
    padding: 0.8rem;
    border: none;
    border: 1px solid transparent;
    color: white;
    transition: all 0.2s ease-in-out;
    font-family: inherit;
    font-size: 13px;
    box-sizing: border-box;
  }

  .add-item-container input:focus {
    border: 1px solid #FFD43B;
    outline: none;
    box-shadow: inset 0px 0px 10px rgba(255, 102, 0, 0.5), inset 0px 0px 10px rgba(255, 212, 59, 0.5), 0px 0px 100px rgba(255, 212, 59, 0.5), 0px 0px 100px rgba(255, 102, 0, 0.5);
  }

  .add-item-container .add-btn {
    flex-basis: 30%;
    padding: 0.8rem 0.4rem;
    background: linear-gradient(135deg, rgb(255, 212, 59) 0%, rgb(255, 102, 0) 100%);
    font-weight: 900;
    font-size: 11px;
    letter-spacing: 0.1rem; 
    text-transform: uppercase;
    color: #23272F;
    border: none;
    width: 100%;
    border-radius: 0 1rem 1rem 0;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    font-family: inherit;
  }

  .add-item-container .add-btn:hover {
    background: linear-gradient(135deg, rgb(255, 212, 59) 50%, rgb(255, 102, 0) 100%);
    box-shadow: 0px 0px 100px rgba(255, 212, 59, 0.5), 0px 0px 100px rgba(255, 102, 0, 0.5);
  }

  @media (max-width: 500px) {
    .add-item-container {
      flex-direction: column;
    }

    .add-item-container input {
      border-radius: 0.8rem;
    }

    .add-item-container .add-btn {
      padding: 1rem;
      border-radius: 0.8rem;
    }
  }
`;