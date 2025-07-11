'use client';

import React, { ReactNode, useEffect, useRef, useState, useCallback, memo } from 'react';

interface AnimatedContentProps {
  children: ReactNode;
  show?: boolean;
  animation?: 'fade' | 'slide';
  duration?: number;
  delay?: number;
  className?: string;
}

const AnimatedContent: React.FC<AnimatedContentProps> = memo(function AnimatedContent({
  children,
  show = true,
  animation = 'fade',
  duration = 500,
  delay = 0,
  className = '',
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && !hasAnimated) {
        setTimeout(() => {
          setIsVisible(true);
          setHasAnimated(true);
        }, delay);
      }
    },
    [delay, hasAnimated]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [handleIntersection]);

  const animationClass = () => {
    if (!isVisible) return 'opacity-0';
    switch (animation) {
      case 'fade':
        return 'opacity-100';
      case 'slide':
        return 'opacity-100 translate-y-0';
      default:
        return 'opacity-100';
    }
  };

  const getStyle = () => {
    const baseStyle = {
      transitionDuration: `${duration}ms`,
      transitionProperty: 'opacity, transform',
      willChange: isVisible ? 'auto' : 'opacity, transform',
    };

    if (!isVisible) {
      switch (animation) {
        case 'slide':
          return { ...baseStyle, transform: 'translateY(20px)', opacity: 0 };
        default:
          return { ...baseStyle, opacity: 0 };
      }
    }

    return baseStyle;
  };

  return (
    <div
      ref={ref}
      className={`transition-all ${className} ${animationClass()}`}
      style={getStyle()}
    >
      {children}
    </div>
  );
});

export default AnimatedContent;
