import React, { useEffect, useState, useRef, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './lib/gsap';

import { Navbar } from './components/ui/Navbar';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { CustomCursor } from './components/ui/CustomCursor';
import { DualParallaxBackground } from './components/ui/DualParallaxBackground';

// First viewport critical components loaded immediately
import { HeroSection } from './sections/HeroSection';
import { MarqueeSection } from './sections/MarqueeSection';
import { AboutSection } from './sections/AboutSection';

// Predictive Below-the-fold code splitting
// Preloaded when approaching viewport (rootMargin: '600px 0px') so transitions remain seamless
const LazyCapabilitiesSection = lazy(() =>
  import('./sections/CapabilitiesSection').then((m) => ({ default: m.CapabilitiesSection }))
);
const LazyProjectsSection = lazy(() =>
  import('./sections/ProjectsSection').then((m) => ({ default: m.ProjectsSection }))
);
const LazyTechStackSection = lazy(() =>
  import('./sections/TechStackSection').then((m) => ({ default: m.TechStackSection }))
);
const LazyContactSection = lazy(() =>
  import('./sections/ContactSection').then((m) => ({ default: m.ContactSection }))
);
const LazyFooter = lazy(() =>
  import('./components/ui/Footer').then((m) => ({ default: m.Footer }))
);

export const App: React.FC = () => {
  // Predictive loading flags
  const [loadBelowFold, setLoadBelowFold] = useState(false);
  const belowFoldTriggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lenis Smooth Scroll initialized with GSAP ticker synchronization
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateFunc = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateFunc);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateFunc);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    // Predictive Proximity Loader:
    // Starts fetching below-the-fold sections 800px before user reaches them, or on idle
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLoadBelowFold(true);
          observer.disconnect();
        }
      },
      { rootMargin: '800px 0px' }
    );

    if (belowFoldTriggerRef.current) {
      observer.observe(belowFoldTriggerRef.current);
    }

    // Safety fallback: if user stays idle for 2.5s, preload below-the-fold in background
    let idleTimer: number | ReturnType<typeof setTimeout> | null = null;
    if ('requestIdleCallback' in window) {
      idleTimer = (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(
        () => setLoadBelowFold(true),
        { timeout: 2500 }
      );
    } else {
      idleTimer = setTimeout(() => setLoadBelowFold(true), 1500);
    }

    return () => {
      observer.disconnect();
      if (idleTimer !== null) {
        if ('cancelIdleCallback' in window && typeof idleTimer === 'number') {
          (window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleTimer);
        } else {
          clearTimeout(idleTimer);
        }
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#111613] text-[#F4F1EA] selection:bg-[#FF0000]/25 selection:text-[#F4F1EA] w-full max-w-full overflow-x-clip">
      <DualParallaxBackground />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />

      <main className="relative z-10">
        <HeroSection />
        <MarqueeSection />
        <AboutSection />

        {/* Sentinel element to trigger predictive loading before reaching Capabilities */}
        <div ref={belowFoldTriggerRef} className="w-full h-px pointer-events-none" />

        {loadBelowFold && (
          <Suspense fallback={<div className="min-h-96 w-full bg-[#111613]" />}>
            <LazyCapabilitiesSection />
            <LazyProjectsSection />
            <LazyTechStackSection />
            <LazyContactSection />
          </Suspense>
        )}
      </main>

      {loadBelowFold && (
        <Suspense fallback={null}>
          <LazyFooter />
        </Suspense>
      )}
    </div>
  );
};

export default App;
