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
            id="brick-pattern"
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
              stroke="#1CA39E"
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
              stroke="#1CA39E"
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
              stroke="#1CA39E"
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
              stroke="#1CA39E"
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
              stroke="#1CA39E"
              strokeWidth="1"
              opacity={opacity}
              rx="2"
            />
          </pattern>
          
          {/* Mortar dots pattern */}
          <pattern
            id="mortar-pattern"
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
              fill="#1CA39E"
              opacity={opacity * 2}
            />
          </pattern>
        </defs>
        
        {/* Brick pattern background */}
        <rect
          width="100%"
          height="100%"
          fill="url(#brick-pattern)"
        />
        
        {/* Mortar texture overlay */}
        <rect
          width="100%"
          height="100%"
          fill="url(#mortar-pattern)"
        />
        
        {animate && (
          <g>
            {/* Animated construction dust particles */}
            {Array.from({ length: 8 }, (_, i) => (
              <circle
                key={i}
                cx={50 + i * 150}
                cy={50 + (i % 3) * 200}
                r="1"
                fill="#1CA39E"
                opacity={opacity * 3}
              >
                <animate
                  attributeName="cy"
                  values={`${50 + (i % 3) * 200};${100 + (i % 3) * 200};${50 + (i % 3) * 200}`}
                  dur={`${10 + i * 0.5}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values={`0;${opacity * 3};0`}
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
