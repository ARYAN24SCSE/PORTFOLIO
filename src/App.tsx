import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './lib/gsap';

import { Navbar } from './components/ui/Navbar';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { CustomCursor } from './components/ui/CustomCursor';
import { DualParallaxBackground } from './components/ui/DualParallaxBackground';
import { Footer } from './components/ui/Footer';

// Core content sections rendered directly to ensure full hydration consistency
import { HeroSection } from './sections/HeroSection';
import { MarqueeSection } from './sections/MarqueeSection';
import { AboutSection } from './sections/AboutSection';
import { CapabilitiesSection } from './sections/CapabilitiesSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { TechStackSection } from './sections/TechStackSection';
import { ContactSection } from './sections/ContactSection';

export const App: React.FC = () => {
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
        <CapabilitiesSection />
        <ProjectsSection />
        <TechStackSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};

export default App;
