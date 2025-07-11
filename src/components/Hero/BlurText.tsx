"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState, useMemo, memo, useCallback } from "react";

const BlurText = memo(function BlurText({
  text = "",
  delay = 200,
  animateBy = "words",
  direction = "top",
  onAnimationComplete,
  className = "",
}: {
  text: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom" | "left" | "right";
  onAnimationComplete?: () => void;
  className?: string;
}) {
  const [done, setDone] = useState(false);
  
  const items = useMemo(
    () =>
      animateBy === "letters"
        ? text.split("")
        : text.split(" ").map((w) => w + " "),
    [text, animateBy]
  );
  
  const directions: any = useMemo(() => ({
    top: { y: 20, opacity: 0, filter: "blur(8px)" },
    bottom: { y: -20, opacity: 0, filter: "blur(8px)" },
    left: { x: 20, opacity: 0, filter: "blur(8px)" },
    right: { x: -20, opacity: 0, filter: "blur(8px)" },
  }), []);

  const handleAnimationComplete = useCallback(() => {
    setDone(true);
  }, []);

  useEffect(() => {
    if (done && onAnimationComplete) onAnimationComplete();
  }, [done, onAnimationComplete]);

  return (
    <span className={className}>
      {items.map((item, i) => (
        <motion.span
          key={i}
          initial={directions[direction]}
          animate={{ x: 0, y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{
            delay: (delay / 1000) + (i * 0.03), // Reduced delay between words
            duration: 0.4, // Reduced duration
            type: "spring",
            damping: 12,
            stiffness: 200,
          }}
          onAnimationComplete={i === items.length - 1 ? handleAnimationComplete : undefined}
          style={{ 
            display: "inline-block", 
            whiteSpace: "pre",
            willChange: "transform, opacity, filter"
          }}
        >
          {item}
        </motion.span>
      ))}
    </span>
  );
});

export default BlurText;
