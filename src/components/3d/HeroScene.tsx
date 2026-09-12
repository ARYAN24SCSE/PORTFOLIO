import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { DigitalSculpture } from './DigitalSculpture';
import { FallbackVisual } from './FallbackVisual';
import { useWebGLSupport } from '../../hooks/useWebGLSupport';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useDevicePerformance } from '../../hooks/useDevicePerformance';
import { gsap, ScrollTrigger } from '../../lib/gsap';

export const HeroScene: React.FC = () => {
  const hasWebGL = useWebGLSupport();
  const prefersReducedMotion = useReducedMotion();
  const { isLowEnd } = useDevicePerformance();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Scroll-driven sculpture choreography
      gsap.to(containerRef.current, {
        yPercent: 40,
        xPercent: 15,
        scale: 0.82,
        opacity: 0.35,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  if (!hasWebGL || prefersReducedMotion) {
    return <FallbackVisual />;
  }

  return (
    <div ref={containerRef} className="w-full h-full relative cursor-grab will-change-transform">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 42 }}
        gl={{
          antialias: !isLowEnd,
          alpha: true,
          powerPreference: isLowEnd ? 'default' : 'high-performance',
          preserveDrawingBuffer: false,
        }}
        dpr={isLowEnd ? 1 : [1, 1.5]}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={isLowEnd ? 0.6 : 0.4} />
          <DigitalSculpture isLowEnd={isLowEnd} />
        </Suspense>
      </Canvas>
    </div>
  );
};
