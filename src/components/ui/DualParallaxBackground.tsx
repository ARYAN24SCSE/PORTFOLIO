import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const DualParallaxBackground: React.FC = () => {
  const bgTextRef1 = useRef<HTMLDivElement>(null);
  const bgTextRef2 = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (bgTextRef1.current) {
        gsap.to(bgTextRef1.current, {
          y: -120,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5,
          },
        });
      }

      if (bgTextRef2.current) {
        gsap.to(bgTextRef2.current, {
          y: 120,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
          },
        });
      }
    });

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Editorial Watermarks: Monochromatic, Restrained, Ultra-subtle */}
      <div
        ref={bgTextRef1}
        className="absolute top-[20%] -left-6 font-heading font-black text-[12vw] leading-none text-[#F4F1EA]/2.5 tracking-tighter uppercase whitespace-nowrap will-change-transform"
      >
        CYBERSECURITY
      </div>

      <div
        ref={bgTextRef2}
        className="absolute top-[60%] -right-6 font-heading font-black text-[14vw] leading-none text-[#F4F1EA]/2.5 tracking-tighter uppercase whitespace-nowrap will-change-transform"
      >
        AUTONOMOUS
      </div>

      {/* Subtle Studio Key Depth Glow (Restrained Red Accent) */}
      <div className="absolute top-[10%] right-[15%] w-150 h-150 bg-[#FF0000]/2 rounded-full blur-[160px] will-change-transform" />
    </div>
  );
};
