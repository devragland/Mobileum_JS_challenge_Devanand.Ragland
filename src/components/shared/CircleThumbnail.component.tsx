import React, { useState } from 'react';
import styled from 'styled-components';

// Styled div for the thumbnail
const ThumbNail = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  border: 3px solid #6c6969;
`;

// Visually hidden image for loading
const HiddenImg = styled.img`
  visibility: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
`;

interface ThumbNailProps {
  imageUrl: string;
  alt: string;
}

const CircleThumbNail: React.FC<ThumbNailProps> = ({ imageUrl, alt }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageLoaded(false);
  };

  return (
    <>
     {/* use a hidden image tag to lazy load images and then on load, render them  */}
      <HiddenImg 
        src={imageUrl} 
        loading="lazy"
        alt={alt} 
        onLoad={handleImageLoad} 
        onError={handleImageError} 
      />
      {imageLoaded ? (
        <ThumbNail style={{ backgroundImage: `url(${imageUrl})` }} />
      ) : (
        <ThumbNail style={{ backgroundImage: `url('path/to/fallback/image.png')` }}>Image not available</ThumbNail>
      )}
    </>
  );
};

export default CircleThumbNail;
