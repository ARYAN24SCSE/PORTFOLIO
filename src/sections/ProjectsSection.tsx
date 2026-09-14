import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { ArrowUpRight, ArrowRight, Github, ChevronRight } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { useReducedMotion } from '../hooks/useReducedMotion';

// Dynamically load modal only when required
const LazyProjectModal = lazy(() =>
  import('../components/ui/ProjectModal').then((module) => ({
    default: module.ProjectModal,
  }))
);

export const ProjectsSection: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Strict 3-layer architecture refs
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const selectedProject = PROJECTS.find((p) => p.id === selectedProjectId);

  useEffect(() => {
    if (prefersReducedMotion || !pinWrapperRef.current || !trackRef.current) return;

    // Responsive GSAP ScrollTrigger containment for Desktop & Tablet
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const pinWrapper = pinWrapperRef.current;
      const track = trackRef.current;
      if (!pinWrapper || !track) return;

      // Exact distance required to translate the track completely across the viewport
      const calculateDistance = () => {
        const trackWidth = track.scrollWidth;
        const windowWidth = window.innerWidth;
        // Scroll until the last card is comfortably positioned with right margin
        return Math.max(0, trackWidth - windowWidth + 120);
      };

      // Virtual scroll distance: proportional to travel distance for buttery smooth pacing
      const getVirtualScrollDistance = () => {
        const horizontalDistance = calculateDistance();
        // Comfortable scrub length allowing deliberate reading of each case study
        return horizontalDistance + window.innerWidth * 0.4;
      };

      const tween = gsap.to(track, {
        x: () => -calculateDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: pinWrapper,
          pin: true,
          pinSpacing: true,
          scrub: 0.8, // Snappy yet silky response to Lenis wheel
          start: 'top top',
          end: () => `+=${getVirtualScrollDistance()}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            setScrollProgress(progress);
            const total = PROJECTS.length;
            const newIndex = Math.min(total - 1, Math.floor(progress * total));
            setActiveProjectIndex(newIndex);
          },
        },
      });

      return () => {
        tween.kill();
      };
    });

    // Refresh after DOM layout settles to guarantee exact dimensions
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(refreshTimer);
      mm.revert();
    };
  }, [prefersReducedMotion]);

  return (
    <section
      id="projects"
      className="relative bg-[#0B0F0D] border-b border-white/10 w-full max-w-full overflow-x-clip"
    >
      {/* ========================================================================= */}
      {/* LAYER 1: PRE-SCROLL STAGING HEADER (Normal vertical flow) */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-28 pb-12 flex flex-col sm:flex-row sm:items-baseline justify-between gap-6 border-b border-white/10">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-xs text-[#FF0000] font-semibold tracking-wider">
            03 // PROJECTS
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#F4F1EA] tracking-tight font-heading">
            FEATURED WORK
          </h2>
        </div>
        <div className="font-mono text-xs text-[#C2C5C0] flex items-center gap-3">
          <span>VERTICAL SCROLL DRIVES HORIZONTAL REVEAL</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#FF0000]" />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* LAYER 2: PIN WRAPPER (Locks to viewport on scroll) */}
      {/* ========================================================================= */}
      <div
        ref={pinWrapperRef}
        className="w-full h-screen min-h-160 max-h-270 relative overflow-hidden flex flex-col justify-between py-6 sm:py-8 bg-[#0B0F0D]"
      >
        {/* Pinned Stage Telemetry Bar */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full flex items-center justify-between z-20 shrink-0 select-none">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-[#858C87]">
              ACTIVE CASE //
            </span>
            <span className="font-mono text-xs text-[#FF0000] font-bold">
              0{activeProjectIndex + 1} of 0{PROJECTS.length}
            </span>
            <span className="hidden sm:inline-block font-mono text-[11px] text-[#C2C5C0] uppercase">
              {PROJECTS[activeProjectIndex]?.title}
            </span>
          </div>

          {/* Scrub Track Progress Bar */}
          <div className="flex items-center gap-3">
            <div className="w-24 sm:w-40 h-1 bg-white/10 relative overflow-hidden">
              <div
                className="h-full bg-[#FF0000] transition-all duration-100 ease-out"
                style={{ width: `${Math.max(8, scrollProgress * 100)}%` }}
              />
            </div>
            <span className="font-mono text-[10px] text-[#858C87] w-8 text-right">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* LAYER 3: HORIZONTAL VIEWPORT & CONTINUOUS TRACK */}
        {/* ======================================================================= */}
        <div
          ref={viewportRef}
          className="w-full h-full flex items-center overflow-x-auto md:overflow-hidden scrollbar-none py-2 my-auto"
        >
          <div
            ref={trackRef}
            className="flex items-stretch gap-8 sm:gap-12 px-6 sm:px-12 lg:px-20 w-max will-change-transform max-w-none"
          >
            {PROJECTS.map((project, idx) => (
              <div
                key={project.id}
                className="w-[88vw] sm:w-[70vw] lg:w-[52vw] max-w-3xl shrink-0 flex flex-col justify-between p-8 sm:p-10 lg:p-12 glass-material-dark relative group transition-all duration-300"
              >
                {/* Project Header Metadata */}
                <div>
                  <div className="flex items-baseline justify-between pb-5 mb-6 border-b border-white/10">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-sm text-[#FF0000] font-semibold">
                        0{idx + 1} //
                      </span>
                      <span className="font-mono text-xs text-[#C2C5C0] uppercase tracking-wider">
                        {project.category}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-[#858C87]">
                      CASE 0{idx + 1}
                    </span>
                  </div>

                  {/* Title & Headline */}
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F4F1EA] font-heading tracking-tight mb-4 group-hover:text-[#FF0000] transition-colors leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-[#C2C5C0] text-sm sm:text-base leading-relaxed font-normal mb-6 max-w-2xl">
                    {project.summary}
                  </p>

                  {/* Editorial Metadata Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 p-4 sm:p-5 bg-black/25 border border-white/10 font-mono text-xs mb-6">
                    <div>
                      <span className="text-[#858C87] block text-[10px]">EXECUTION STATUS</span>
                      <span className="text-[#F4F1EA] font-semibold">{project.status}</span>
                    </div>
                    <div>
                      <span className="text-[#858C87] block text-[10px]">PRIMARY STACK</span>
                      <span className="text-[#F4F1EA] font-semibold">{project.techStack[0]}</span>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <span className="text-[#858C87] block text-[10px]">ARCHITECTURE</span>
                      <span className="text-[#F4F1EA] font-semibold">AUTOMATION PIPELINE</span>
                    </div>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-[11px] font-mono text-[#C2C5C0] border border-white/10 bg-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Strip */}
                <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <button
                    onClick={() => setSelectedProjectId(project.id)}
                    className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-[#F4F1EA] hover:text-[#FF0000] transition-colors font-medium focus:outline-none"
                  >
                    <span>INSPECT ARCHITECTURE</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#FF0000]" />
                  </button>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-[#FF0000] text-[#F4F1EA] hover:text-white border border-white/15 hover:border-[#FF0000] transition-all text-xs font-mono font-semibold tracking-wider uppercase group/btn"
                    >
                      <Github className="w-4 h-4 text-[#F4F1EA] group-hover/btn:text-white" />
                      <span>VIEW GITHUB REPOSITORY</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover/btn:opacity-100" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pinned Stage Footnote */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full flex items-center justify-between z-20 shrink-0 text-[11px] font-mono text-[#858C87] select-none">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000] animate-pulse" />
            <span>PINNED HORIZONTAL TRACK // USE TRACKPAD OR MOUSE WHEEL</span>
          </div>
          <div className="hidden sm:flex items-center gap-1">
            <span>RELEASE TO TECH STACK</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#FF0000]" />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CASE STUDY DETAIL MODAL (Dynamically imported on demand) */}
      {/* ========================================================================= */}
      {selectedProject && (
        <Suspense fallback={null}>
          <LazyProjectModal
            project={selectedProject}
            isOpen={!!selectedProject}
            onClose={() => setSelectedProjectId(null)}
          />
        </Suspense>
      )}
    </section>
  );
};
