import React, { useState } from 'react';

export default function Card11() {
  const [isHovered, setIsHovered] = useState(false);

  // Assuming CardCoverImage.jpg is located in the public folder
  const frontImageUrl = "/CardCoverImage.jpg";

  // Use inline styles for a drop-in component.
  const styles = {
    cardContainer: {
      perspective: '1000px', // Creates the 3D space for the flip
      width: '280px',
      height: '420px',
      cursor: 'pointer',
      margin: '20px',
    },
    cardInner: {
      position: 'relative',
      width: '100%',
      height: '100%',
      textAlign: 'center',
      transition: 'transform 0.8s',
      transformStyle: 'preserve-3d',
      // Condition for flipping based on hover state
      transform: isHovered ? 'rotateY(180deg)' : 'rotateY(0deg)',
      borderRadius: '30px', // Common aesthetic for modern cards
      boxShadow: isHovered
        ? '0 20px 40px rgba(0,0,0,0.3)'
        : '0 8px 16px rgba(0,0,0,0.1)',
    },
    cardFace: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backfaceVisibility: 'hidden', // Hides the side not facing the user
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '30px',
      overflow: 'hidden',
    },
    cardFront: {
      backgroundColor: '#bbb',
      color: 'black',
      zIndex: 2,
    },
    cardBack: {
      // Styling for the back to match the "dark mode" UI seen in the images
      backgroundColor: '#121212', 
      color: 'white',
      transform: 'rotateY(180deg)', // Initially rotated out of view
      padding: '30px',
      textAlign: 'left',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    frontImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
    },
    heading: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    },
    paragraph: {
      fontSize: '14px',
      lineHeight: '1.7',
      marginBottom: '10px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#e0e0e0',
    },
    readMore: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#ffffff',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginTop: 'auto', // Pushes the link to the bottom
      padding: '10px 0',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    },
    arrow: {
      fontSize: '20px',
      transform: 'translateY(1px)',
    }
  };

  return (
    <div
      // Typescript help for style object
      style={styles.cardContainer as React.CSSProperties}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.cardInner as React.CSSProperties}>
        
        {/* Front Side */}
        <div style={{ ...styles.cardFace, ...styles.cardFront } as React.CSSProperties}>
          <img
            src={frontImageUrl}
            alt="Card Cover"
            style={styles.frontImage as React.CSSProperties}
          />
        </div>

        {/* Back Side (Hover State) */}
        <div style={{ ...styles.cardFace, ...styles.cardBack } as React.CSSProperties}>
          <h2 style={styles.heading as React.CSSProperties}>CARD HEADING</h2>
          <p style={styles.paragraph as React.CSSProperties}>1. Lorem ipsum dolor sit amet consectetur...</p>
          <p style={styles.paragraph as React.CSSProperties}>2. Quis consectetur cupiditate vitae...</p>
          <p style={styles.paragraph as React.CSSProperties}>3. Vitae consequatur quis consectetur cupiditate...</p>
          
          <a href="" target="_blank" rel="noopener noreferrer" style={styles.readMore as React.CSSProperties}>
            Read More <span style={styles.arrow as React.CSSProperties}>→</span>
          </a>
        </div>

      </div>
    </div>
  );
}