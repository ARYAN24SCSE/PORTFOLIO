import React from 'react';

export const FallbackVisual: React.FC = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none select-none">
      {/* Subtle radial lighting match */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_50%,rgba(244,241,234,0.06)_0%,transparent_70%)]" />

      {/* SVG Geometric Kinetic Structure matching Sculpture Silhouette */}
      <svg className="w-full h-full max-w-md max-h-88 opacity-75" viewBox="0 0 400 400" fill="none">
        {/* Outer Torus Orbital Lines */}
        <circle cx="200" cy="200" r="110" stroke="#F4F1EA" strokeWidth="1" strokeDasharray="3 4" opacity="0.3" />
        <circle cx="200" cy="200" r="145" stroke="#858C87" strokeWidth="0.8" strokeDasharray="4 6" opacity="0.25" />
        <circle cx="200" cy="200" r="160" stroke="#FF0000" strokeWidth="0.8" opacity="0.2" />

        {/* Central Organic Knot Curves */}
        <path
          d="M 130,200 C 130,130 270,130 270,200 C 270,270 130,270 130,200 Z"
          stroke="#F4F1EA"
          strokeWidth="2"
          fill="none"
          opacity="0.85"
        />
        <path
          d="M 200,130 C 270,130 270,270 200,270 C 130,270 130,130 200,130 Z"
          stroke="#F4F1EA"
          strokeWidth="1.6"
          strokeDasharray="6 3"
          fill="rgba(244,241,234,0.03)"
          opacity="0.7"
        />

        {/* Inner Core */}
        <polygon
          points="200,165 230,182 230,218 200,235 170,218 170,182"
          fill="rgba(244,241,234,0.08)"
          stroke="#F4F1EA"
          strokeWidth="1.2"
        />
        <circle cx="200" cy="200" r="4" fill="#FF0000" />
      </svg>
    </div>
  );
};
