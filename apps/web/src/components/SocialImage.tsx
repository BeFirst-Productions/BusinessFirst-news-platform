"use client";

import React, { useState, useEffect } from 'react';

interface SocialImageProps {
  src: string;
  alt: string;
  fallbackSrc: string;
  className?: string;
}

export default function SocialImage({ src, alt, fallbackSrc, className }: SocialImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <img
      src={imgSrc}
      alt={alt}
      draggable={false}
      className={`${className} text-transparent`}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
}
