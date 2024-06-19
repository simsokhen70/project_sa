"use client";
import React, { useState } from 'react';
import Image from 'next/image';

const IframeComponent = ({ src, width, height }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="flex justify-center items-start">
      {loading && 
      <div className='mt-20'>
        <div className="custom-loader"></div>
      </div>     
    }
      <iframe 
        src={src} 
        width={width} 
        height={height} 
        style={{ border: 'none', display: loading ? 'none' : 'block', boxShadow: 'inset 0 -3em 3em rgb(0 200 0 / 30%)' }} 
        allowFullScreen
        onLoad={() => setLoading(false)}
      />    
    </div>
  );
};

export default IframeComponent;
