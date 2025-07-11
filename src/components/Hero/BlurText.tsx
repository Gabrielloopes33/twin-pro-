"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";

const buildKeyframes = (from: any, steps: any) => {
  const keys = new Set([
    ...Object.keys(from),
    ...steps.flatMap((s: any) => Object.keys(s)),
  ]);
  const keyframes: any = {};
  keys.forEach((k) => {
    keyframes[k] = [from[k], ...steps.map((s: any) => s[k])];
  });
  return keyframes;
};

const BlurText = ({
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
}) => {
  const [done, setDone] = useState(false);
  const items = useMemo(
    () =>
      animateBy === "letters"
        ? text.split("")
        : text.split(" ").map((w) => w + " "),
    [text, animateBy]
  );
  const directions: any = {
    top: { y: 20, opacity: 0, filter: "blur(8px)" },
    bottom: { y: -20, opacity: 0, filter: "blur(8px)" },
    left: { x: 20, opacity: 0, filter: "blur(8px)" },
    right: { x: -20, opacity: 0, filter: "blur(8px)" },
  };
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
            delay: (delay / 1000) + (i * 0.05),
            duration: 0.6,
            type: "spring",
          }}
          onAnimationComplete={i === items.length - 1 ? () => setDone(true) : undefined}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {item}
        </motion.span>
      ))}
    </span>
  );
};

export default BlurText;
