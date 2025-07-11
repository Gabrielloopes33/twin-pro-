"use client";

import React from "react";

interface SimpleBrickBackgroundProps {
  className?: string;
  opacity?: number;
}

export default function SimpleBrickBackground({ 
  className = "", 
  opacity = 0.06
}: SimpleBrickBackgroundProps) {
  
  return (
    <div 
      className={`fixed inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ 
        zIndex: -1,
        backgroundImage: `
          linear-gradient(90deg, rgba(28, 163, 158, ${opacity}) 1px, transparent 1px),
          linear-gradient(rgba(28, 163, 158, ${opacity}) 1px, transparent 1px)
        `,
        backgroundSize: '60px 30px, 60px 30px',
        backgroundPosition: '0 0, 30px 15px'
      }}
    >
      {/* Additional brick lines */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(90deg, transparent 2px, rgba(28, 163, 158, ${opacity * 0.5}) 2px, rgba(28, 163, 158, ${opacity * 0.5}) 58px, transparent 58px),
            linear-gradient(transparent 2px, rgba(28, 163, 158, ${opacity * 0.5}) 2px, rgba(28, 163, 158, ${opacity * 0.5}) 28px, transparent 28px)
          `,
          backgroundSize: '60px 30px, 60px 30px',
          backgroundPosition: '0 0, 30px 15px'
        }}
      />
      
      {/* Mortar dots pattern */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `radial-gradient(circle at center, rgba(28, 163, 158, ${opacity * 2}) 0.5px, transparent 0.5px)`,
          backgroundSize: '20px 20px'
        }}
      />
    </div>
  );
}
