// AnimatedGridPattern.tsx
// Source: https://github.com/magicuidesign/magicui/blob/main/components/animated-grid-pattern.tsx
import * as React from "react";

export interface AnimatedGridPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: number;
  numSquares?: number;
  maxOpacity?: number;
  duration?: number;
  repeatDelay?: number;
  className?: string;
}

export const AnimatedGridPattern: React.FC<AnimatedGridPatternProps> = ({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 200,
  maxOpacity = 0.5,
  duration = 1,
  repeatDelay = 0.5,
  className = "",
}) => {
  const squares = Array.from({ length: numSquares }, (_, i) => {
    const row = Math.floor(i / 10);
    const col = i % 10;
    const delay = (row + col) * 0.05;
    return (
      <rect
        key={i}
        x={col * width}
        y={row * height}
        width={width}
        height={height}
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray={strokeDasharray}
        fill="none"
        style={{
          opacity: maxOpacity,
          animation: `fadeInOut ${duration}s ease-in-out ${delay + repeatDelay}s infinite alternate`,
        }}
      />
    );
  });

  return (
    <svg
      className={className}
      width={width * 10}
      height={height * 20}
      viewBox={`${x} ${y} ${width * 10} ${height * 20}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: -1 }}
    >
      <style>{`
        @keyframes fadeInOut {
          0% { opacity: 0; }
          100% { opacity: ${maxOpacity}; }
        }
      `}</style>
      {squares}
    </svg>
  );
};
