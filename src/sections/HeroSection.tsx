import React, { useRef, useEffect, useState, lazy, Suspense } from 'react';
import { ArrowDownRight, ArrowRight } from 'lucide-react';
import { FallbackVisual } from '../components/3d/FallbackVisual';
import { MagneticButton } from '../components/ui/MagneticButton';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { useReducedMotion } from '../hooks/useReducedMotion';

// Defer heavyweight Three.js/R3F HeroScene bundle until initial critical paint finishes
const LazyHeroScene = lazy(() =>
  import('../components/3d/HeroScene').then((module) => ({
    default: module.HeroScene,
  }))
);

export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [load3D, setLoad3D] = useState(false);

  useEffect(() => {
    // Progressive 3D Scene Initialization:
    // Yield to the main thread so HTML/CSS Hero typography and layout paint instantly (FCP & LCP)
    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        const idleHandle = (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(
          () => setLoad3D(true),
          { timeout: 1200 }
        );
        return () => {
          if ('cancelIdleCallback' in window) {
            (window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleHandle);
          }
        };
      } else {
        const timer = setTimeout(() => setLoad3D(true), 200);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 3-Layer Parallax during scroll
      if (headlineRef.current) {
        gsap.to(headlineRef.current, {
          yPercent: -25,
          scale: 1.04,
          opacity: 0.85,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      if (copyRef.current) {
        gsap.to(copyRef.current, {
          yPercent: -45,
          opacity: 0.4,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      if (bottomBarRef.current) {
        gsap.to(bottomBarRef.current, {
          yPercent: -15,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '40% top',
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-32 pb-8 overflow-hidden bg-[#111613]"
    >
      {/* Background Depth Plane: Subtle photographic tonal depth gradient */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_65%_40%,#161B18_0%,#111613_60%,#0B0F0D_100%)]" />

      {/* Architectural Coordinate Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-30 select-none">
        <div className="absolute top-28 left-8 sm:left-14 font-mono text-[9px] text-[#858C87] tracking-widest uppercase">
          INDEX // 2026.01
        </div>
        <div className="absolute top-28 right-8 sm:right-14 font-mono text-[9px] text-[#858C87] tracking-widest uppercase text-right">
          LAT 28.6139° N / LON 77.2090° E
        </div>
      </div>

      {/* Midground 3D Digital Sculpture (Spans right half and crosses centerline) */}
      <div className="absolute top-0 right-0 w-full lg:w-3/5 h-full pointer-events-auto z-10 opacity-95 overflow-hidden max-w-full">
        {load3D ? (
          <Suspense fallback={<FallbackVisual />}>
            <LazyHeroScene />
          </Suspense>
        ) : (
          <FallbackVisual />
        )}
      </div>

      {/* Foreground Content: Asymmetric Editorial Composition */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full z-20 pointer-events-none my-auto">
        <div className="max-w-3xl space-y-8">
          {/* Identity Tag with subtle red focus indicator */}
          <div className="pointer-events-auto inline-flex items-center gap-2.5 font-mono text-xs tracking-widest text-[#F4F1EA] uppercase">
            <span className="w-1.5 h-1.5 bg-[#FF0000]" />
            <span className="text-[#C2C5C0]">CYBERSECURITY / AI / AUTOMATION</span>
          </div>

          {/* Massive Display Typography: ARYAN with subtle red index marker */}
          <div className="relative inline-block">
            <h1
              ref={headlineRef}
              className="text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] font-bold text-[#F4F1EA] tracking-tighter leading-[0.88] select-none font-heading will-change-transform"
            >
              ARYAN
            </h1>
            <span className="absolute -top-2 -right-6 font-mono text-xs text-[#FF0000] font-semibold tracking-wider select-none">
              [01]
            </span>
          </div>

          {/* Editorial Positioning Statement */}
          <div ref={copyRef} className="space-y-4 max-w-xl will-change-transform pointer-events-auto">
            <p className="text-xl sm:text-2xl font-normal text-[#F4F1EA] tracking-tight leading-snug font-heading">
              Building AI agents, automation pipelines, and experimental web interfaces.
            </p>
            <p className="text-sm sm:text-base text-[#C2C5C0] font-normal leading-relaxed">
              Cybersecurity student who tends to build things to figure out how they actually behave under the hood.
            </p>

            {/* Magnetic Studio CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <MagneticButton href="#projects" variant="studio">
                <span>VIEW PROJECTS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </MagneticButton>

              <MagneticButton href="#contact" variant="outline">
                <span>CONTACT ME</span>
                <ArrowDownRight className="w-3.5 h-3.5 text-[#FF0000]" />
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Metadata Bar */}
      <div
        ref={bottomBarRef}
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full z-20 pointer-events-auto pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] font-mono text-[#858C87]"
      >
        <div className="flex items-center gap-6">
          <span>01 PERSPECTIVE</span>
          <span>02 SCOPE</span>
          <span>03 WORK</span>
          <span>04 TOOLING</span>
        </div>
        <div className="flex items-center gap-2 text-[#C2C5C0]">
          <span>SCROLL TO EXPLORE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000] animate-pulse" />
        </div>
      </div>
    </section>
  );
};
