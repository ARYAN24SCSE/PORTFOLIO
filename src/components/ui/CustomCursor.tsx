import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Guard against touch devices and mobile screens completely
  const isTouchDevice = typeof window !== 'undefined' && (
    window.matchMedia('(pointer: coarse)').matches ||
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0
  );

  useEffect(() => {
    if (isTouchDevice || prefersReducedMotion) return;

    let mouseX = -100;
    let mouseY = -100;
    let circleX = -100;
    let circleY = -100;
    let isHovered = false;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const target = e.target as HTMLElement | null;
      isHovered = Boolean(target?.closest('a, button, [role="button"], input, textarea, select, .hoverable'));
    };

    const render = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0) scale(${isHovered ? 2 : 1})`;
      }

      circleX += (mouseX - circleX) * 0.22;
      circleY += (mouseY - circleY) * 0.22;

      if (circleRef.current) {
        circleRef.current.style.transform = `translate3d(${circleX - 16}px, ${circleY - 16}px, 0) scale(${isHovered ? 1.6 : 1})`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isTouchDevice, prefersReducedMotion]);

  if (isTouchDevice || prefersReducedMotion) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-white pointer-events-none z-50 mix-blend-difference will-change-transform"
      />
      <div
        ref={circleRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/25 pointer-events-none z-50 will-change-transform transition-transform duration-100"
      />
    </>
  );
};
