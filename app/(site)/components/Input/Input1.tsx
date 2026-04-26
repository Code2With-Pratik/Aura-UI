import React from 'react';

export default function Input1() {
  // You can easily change this label text to anything (e.g., "Email", "Password")
  const labelText = "Username";

  return (
    <>
      <div className="form-control">
        <input type="text" required />
        <label>
          {labelText.split('').map((char, index) => (
            <span 
              key={index} 
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {char}
            </span>
          ))}
        </label>
      </div>

      <style dangerouslySetInnerHTML={{ __html: styles }} />
    </>
  );
}

const styles = `
  /* From Uiverse.io by liyaxu123 */ 
  .form-control {
    position: relative;
    margin: 20px 0 40px;
    width: 190px;
  }

  .form-control input {
    background-color: transparent;
    border: 0;
    border-bottom: 2px #fff solid;
    display: block;
    width: 100%;
    padding: 15px 0;
    font-size: 18px;
    color: #fff;
    font-family: inherit;
  }

  .form-control input:focus,
  .form-control input:valid {
    outline: 0;
    border-bottom-color: lightblue;
  }

  .form-control label {
    position: absolute;
    top: 15px;
    left: 0;
    pointer-events: none;
  }

  .form-control label span {
    display: inline-block;
    font-size: 18px;
    min-width: 5px;
    color: #fff;
    transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  /* When the input is focused or has valid data (not empty due to 'required' attribute) */
  .form-control input:focus + label span,
  .form-control input:valid + label span {
    color: lightblue;
    transform: translateY(-30px);
  }
`;