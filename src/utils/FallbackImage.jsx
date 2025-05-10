import React from 'react';

const FallbackImage = ({ src, alt, onClick, className }) => {
  const handleError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = '/assets/default-img.png';
  };

  return (
    <img
      src={src || '/assets/default-img.png'}
      alt={alt}
      className={className}
      onError={handleError}
      onClick={onClick}
    />
  );
};

export default FallbackImage;
