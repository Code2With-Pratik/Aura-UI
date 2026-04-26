import React from 'react';

export default function Card9() {
  return (
    <>
      <div className="card9-container">
        <div className="card9-card">
          <div className="card9-logo">
            <span className="card9-circle card9-circle1"></span>
            <span className="card9-circle card9-circle2"></span>
            <span className="card9-circle card9-circle3"></span>
            <span className="card9-circle card9-circle4"></span>
            <span className="card9-circle card9-circle5">
              {/* Seedling Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 20h10" />
                <path d="M10 20c5.5-2.5.8-6.4 3-10" />
                <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
                <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
              </svg>
            </span>
          </div>

          <div className="card9-glass">
            <div className="card9-content">
              <h1>Rayen</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, autem.
              </p>
            </div>

            <div className="card9-footer">
              <div className="card9-social">
                <span className="card9-social_icons">
                  {/* Facebook Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </span>
                <span className="card9-social_icons">
                  {/* LinkedIn Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </span>
                <span className="card9-social_icons">
                  {/* Twitter/X Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </span>
              </div>

              <div className="card9-link">
                Read More{' '}
                {/* External Link Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ marginLeft: '4px', display: 'inline' }}
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: styles }} />
    </>
  );
}

const styles = `
  /* Wrapped in a display flex to center it nicely in your app */
  .card9-wrapper {
    --prime_color: #00894d;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  }

  .card9-container {
    width: 300px;
    height: 300px;
    perspective: 1000px;
  }

  .card9-card {
    height: 100%;
    border-radius: 50px;
    background: linear-gradient(135deg, #00ffd6, #08e260);
    transition: 0.5s ease-in-out;
    transform-style: preserve-3d;
    box-shadow:
        #05471100 40px 50px 25px,
        #02140033 0px 25px 25px;
  }

  .card9-glass {
    transform-style: preserve-3d;
    position: absolute;
    inset: 8px;
    background: linear-gradient(#ffffff59, #ffffffd0);
    border-radius: 55px;
    border-top-right-radius: 100%;
    border-left: 1px solid white;
    border-bottom: 1px solid white;
    transition: 0.5s ease-in-out;
    transform: translate3d(0, 0, 25px);
  }

  .card9-logo {
    position: absolute;
    right: 0;
    top: 0;
    transform-style: preserve-3d;
  }

  .card9-logo .card9-circle {
    position: absolute;
    aspect-ratio: 1;
    border-radius: 50%;
    background: #00f9cd33;
    top: 0;
    right: 0;
    box-shadow: #64646f33 -10px 10px 20px;
    transition: 0.5s ease-in-out;
    backdrop-filter: blur(5px);
  }

  .card9-logo .card9-circle1 {
    width: 170px;
    transform: translate3d(0, 0, 20px);
    top: 8px;
    right: 8px;
    transition-delay: 0.0s;
  }

  .card9-logo .card9-circle2 {
    width: 140px;
    transform: translate3d(0, 0, 40px);
    top: 10px;
    right: 10px;
    transition-delay: 0.4s;
  }

  .card9-logo .card9-circle3 {
    width: 110px;
    transform: translate3d(0, 0, 60px);
    top: 17px;
    right: 17px;
    transition-delay: 0.8s;
  }

  .card9-logo .card9-circle4 {
    width: 80px;
    transform: translate3d(0, 0, 80px);
    top: 23px;
    right: 23px;
    transition-delay: 1.2s;
  }

  .card9-logo .card9-circle5 {
    width: 50px;
    transform: translate3d(0, 0, 100px);
    top: 30px;
    right: 30px;
    transition-delay: 1.6s;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--prime_color);
  }

  .card9-content {
    padding: 130px 60px 0 30px;
  }

  .card9-content h1 {
    color: var(--prime_color);
    font-weight: 900;
    font-size: 20px;
    margin: 0;
  }

  .card9-content p {
    margin-top: 10px;
    color: #00a15d;
    font-size: 15px;
    line-height: 1.4;
  }

  .card9-footer {
    transform-style: preserve-3d;
    position: absolute;
    bottom: 20px;
    left: 30px;
    right: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .card9-footer .card9-link {
    transition: 0.2s ease-in-out;
    font-size: 14px;
    color: #00c37b;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-weight: bold;
  }

  .card9-footer .card9-link:hover {
    transform: translate3d(0, 0, 10px);
    color: var(--prime_color);
  }

  .card9-footer .card9-social {
    transform-style: preserve-3d;
    display: flex;
    gap: 10px;
  }

  .card9-footer .card9-social .card9-social_icons {
    display: inline-block;
    width: 30px;
    height: 30px;
    background: #fff;
    color: var(--prime_color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: #05471180 7px 7px 5px;
    transition: 0.5s;
  }

  .card9-footer .card9-social .card9-social_icons:nth-child(1) {
    transition: 0.2s ease-in-out 0.2s;
  }

  .card9-footer .card9-social .card9-social_icons:nth-child(2) {
    transition: 0.2s ease-in-out 0.4s;
  }

  .card9-footer .card9-social .card9-social_icons:nth-child(3) {
    transition: 0.2s ease-in-out 0.6s;
  }

  /* Hover Effect */
  .card9-container:hover .card9-card {
    transform: rotate3d(1, 1, 0, 30deg);
    box-shadow:
        #0547110d 30px 50px 25px,
        #05471111 0px 25px 30px;
  }

  .card9-container:hover .card9-card .card9-footer .card9-social .card9-social_icons {
    transform: translate3d(0, 0, 50px);
    box-shadow: #05471133 -5px 20px 10px;
  }

  .card9-container:hover .card9-card .card9-logo .card9-circle2 {
    transform: translate3d(0, 0, 60px);
  }

  .card9-container:hover .card9-card .card9-logo .card9-circle3 {
    transform: translate3d(0, 0, 80px);
  }

  .card9-container:hover .card9-card .card9-logo .card9-circle4 {
    transform: translate3d(0, 0, 100px);
  }

  .card9-container:hover .card9-card .card9-logo .card9-circle5 {
    transform: translate3d(0, 0, 120px);
  }
`;