"use client";

import React, { memo } from "react";

interface BrickPatternProps {
  className?: string;
  opacity?: number;
  animate?: boolean;
}

const BrickPattern = memo(function BrickPattern({ 
  className = "", 
  opacity = 0.02,
  animate = false // Disabled by default for better performance
}: BrickPatternProps) {
  const brickWidth = 80; // Increased for fewer elements
  const brickHeight = 40; // Increased for fewer elements
  
  return (
    <div 
      className={`fixed inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex: -1 }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1
        }}
      >
        <defs>
          <pattern
            id="brick-pattern-optimized"
            x="0"
            y="0"
            width={brickWidth * 2}
            height={brickHeight * 2}
            patternUnits="userSpaceOnUse"
          >
            {/* Optimized brick pattern - fewer rectangles */}
            <rect
              x="3"
              y="3"
              width={brickWidth - 6}
              height={brickHeight - 6}
              fill="none"
              stroke="#1CA39E"
              strokeWidth="0.8"
              opacity={opacity}
              rx="3"
            />
            <rect
              x={brickWidth + 3}
              y="3"
              width={brickWidth - 6}
              height={brickHeight - 6}
              fill="none"
              stroke="#1CA39E"
              strokeWidth="0.8"
              opacity={opacity}
              rx="3"
            />
            
            {/* Second row (offset) - reduced elements */}
            <rect
              x={-brickWidth/2 + 3}
              y={brickHeight + 3}
              width={brickWidth - 6}
              height={brickHeight - 6}
              fill="none"
              stroke="#1CA39E"
              strokeWidth="0.8"
              opacity={opacity}
              rx="3"
            />
            <rect
              x={brickWidth * 1.5 + 3}
              y={brickHeight + 3}
              width={brickWidth - 6}
              height={brickHeight - 6}
              fill="none"
              stroke="#1CA39E"
              strokeWidth="0.8"
              opacity={opacity}
              rx="3"
            />
          </pattern>
        </defs>
        
        {/* Single brick pattern background */}
        <rect
          width="100%"
          height="100%"
          fill="url(#brick-pattern-optimized)"
        />
        
        {/* Reduced animated particles for better performance */}
        {animate && (
          <g>
            {Array.from({ length: 4 }, (_, i) => (
              <circle
                key={i}
                cx={100 + i * 200}
                cy={100 + (i % 2) * 300}
                r="1.5"
                fill="#1CA39E"
                opacity={opacity * 2}
              >
                <animate
                  attributeName="cy"
                  values={`${100 + (i % 2) * 300};${150 + (i % 2) * 300};${100 + (i % 2) * 300}`}
                  dur={`${15 + i * 2}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values={`0;${opacity * 2};0`}
                  dur={`${12 + i}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
          </g>
        )}
      </svg>
    </div>
  );
});

export default BrickPattern;
