"use client";

import React from "react";

interface BrickPatternProps {
  className?: string;
  opacity?: number;
  animate?: boolean;
}

export default function BrickPattern({ 
  className = "", 
  opacity = 0.02,
  animate = true 
}: BrickPatternProps) {
  const brickWidth = 60;
  const brickHeight = 30;
  const patternId = React.useId();
  
  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden ${className}`}>
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={`brick-${patternId}`}
            x="0"
            y="0"
            width={brickWidth * 2}
            height={brickHeight * 2}
            patternUnits="userSpaceOnUse"
          >
            {/* First row */}
            <rect
              x="2"
              y="2"
              width={brickWidth - 4}
              height={brickHeight - 4}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity={opacity}
              rx="2"
            />
            <rect
              x={brickWidth + 2}
              y="2"
              width={brickWidth - 4}
              height={brickHeight - 4}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity={opacity}
              rx="2"
            />
            
            {/* Second row (offset) */}
            <rect
              x={-brickWidth/2 + 2}
              y={brickHeight + 2}
              width={brickWidth - 4}
              height={brickHeight - 4}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity={opacity}
              rx="2"
            />
            <rect
              x={brickWidth/2 + 2}
              y={brickHeight + 2}
              width={brickWidth - 4}
              height={brickHeight - 4}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity={opacity}
              rx="2"
            />
            <rect
              x={brickWidth * 1.5 + 2}
              y={brickHeight + 2}
              width={brickWidth - 4}
              height={brickHeight - 4}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity={opacity}
              rx="2"
            />
          </pattern>
          
          {/* Mortar lines pattern */}
          <pattern
            id={`mortar-${patternId}`}
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="10"
              cy="10"
              r="0.5"
              fill="currentColor"
              opacity={opacity * 2}
            />
          </pattern>
        </defs>
        
        {/* Brick pattern */}
        <rect
          width="100%"
          height="100%"
          fill={`url(#brick-${patternId})`}
          className="text-primary/30"
        />
        
        {/* Mortar texture */}
        <rect
          width="100%"
          height="100%"
          fill={`url(#mortar-${patternId})`}
          className="text-primary/20"
        />
        
        {animate && (
          <g className="text-primary/10">
            {/* Construction dust particles */}
            {Array.from({ length: 12 }, (_, i) => (
              <circle
                key={i}
                cx={50 + i * 100}
                cy={50 + (i % 3) * 200}
                r="1"
                fill="currentColor"
                opacity={opacity * 4}
              >
                <animate
                  attributeName="cy"
                  values={`${50 + (i % 3) * 200}; ${100 + (i % 3) * 200}; ${50 + (i % 3) * 200}`}
                  dur={`${10 + i * 0.5}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values={`0; ${opacity * 4}; 0`}
                  dur={`${8 + i * 0.3}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
          </g>
        )}
      </svg>
    </div>
  );
}
