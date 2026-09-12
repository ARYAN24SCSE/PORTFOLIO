import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ZoomParallaxProps {
  children: React.ReactNode;
  className?: string;
  startScale?: number;
  endScale?: number;
  scrub?: boolean | number;
}

export const ZoomParallax: React.FC<ZoomParallaxProps> = ({
  children,
  className = '',
  startScale = 0.92,
  endScale = 1.0,
  scrub = 0.5,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !elementRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elementRef.current,
        { scale: startScale, opacity: 0.7 },
        {
          scale: endScale,
          opacity: 1,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: elementRef.current,
            start: 'top 85%',
            end: 'top 35%',
            scrub: scrub,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [startScale, endScale, scrub, prefersReducedMotion]);

  return (
    <div ref={elementRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
};
