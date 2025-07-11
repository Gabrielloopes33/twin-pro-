"use client";

import React from "react";

interface ConstructionBackgroundProps {
  className?: string;
  opacity?: number;
}

export default function ConstructionBackground({ 
  className = "", 
  opacity = 0.03 
}: ConstructionBackgroundProps) {
  const gridSize = 40;
  const patternId = React.useId();
  
  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden ${className}`}>
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Blueprint grid pattern */}
          <pattern
            id={`blueprint-${patternId}`}
            x="0"
            y="0"
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              opacity={opacity}
            />
            <circle
              cx={gridSize / 2}
              cy={gridSize / 2}
              r="1"
              fill="currentColor"
              opacity={opacity * 2}
            />
          </pattern>
          
          {/* Construction tools pattern */}
          <pattern
            id={`tools-${patternId}`}
            x="0"
            y="0"
            width="200"
            height="200"
            patternUnits="userSpaceOnUse"
          >
            {/* Hammer */}
            <g opacity={opacity * 0.5} className="animate-pulse">
              <rect x="50" y="80" width="4" height="40" fill="currentColor" />
              <rect x="46" y="76" width="12" height="8" fill="currentColor" />
            </g>
            
            {/* Wrench */}
            <g opacity={opacity * 0.5} className="animate-pulse" style={{ animationDelay: '2s' }}>
              <rect x="150" y="150" width="30" height="4" fill="currentColor" />
              <circle cx="145" cy="152" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
            </g>
            
            {/* Screwdriver */}
            <g opacity={opacity * 0.5} className="animate-pulse" style={{ animationDelay: '4s' }}>
              <rect x="120" y="50" width="2" height="25" fill="currentColor" />
              <rect x="118" y="47" width="6" height="6" fill="currentColor" />
            </g>
          </pattern>
        </defs>
        
        {/* Main background */}
        <rect
          width="100%"
          height="100%"
          fill={`url(#blueprint-${patternId})`}
          className="text-primary/20"
        />
        
        {/* Tools overlay */}
        <rect
          width="100%"
          height="100%"
          fill={`url(#tools-${patternId})`}
          className="text-primary/10"
        />
        
        {/* Animated construction elements */}
        <g className="text-primary/5">
          {Array.from({ length: 8 }, (_, i) => (
            <g key={i}>
              <animateTransform
                attributeName="transform"
                type="translate"
                values={`0,0; ${50 + i * 20},${30 + i * 15}; 0,0`}
                dur={`${15 + i * 2}s`}
                repeatCount="indefinite"
              />
              {/* Floating construction particles */}
              <circle
                cx={100 + i * 150}
                cy={100 + i * 80}
                r="2"
                fill="currentColor"
                opacity={opacity * 3}
              >
                <animate
                  attributeName="opacity"
                  values={`0; ${opacity * 3}; 0`}
                  dur={`${8 + i}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
