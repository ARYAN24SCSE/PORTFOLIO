import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from '../hooks/useReducedMotion';

const TRACK_ONE = [
  'CYBERSECURITY ARCHITECTURE',
  'AUTONOMOUS AGENTS',
  'WORKFLOW AUTOMATION',
  'PERFORMANCE ENGINEERING',
  'EVENT-DRIVEN PIPELINES',
  'SYSTEM HARDENING',
];

const TRACK_TWO = [
  'INTERACTIVE WEB EXPERIENCES',
  'TOOL CALLING & APIS',
  'LOW-LATENCY RUNTIMES',
  'REVERSED DEFENSE',
  'THREE.JS SCULPTURE',
  'AGENTIC WORKFLOWS',
];

export const MarqueeSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [velocityMultiplier, setVelocityMultiplier] = useState(1);
  const lastScrollY = useRef(0);
  const velocityTimeout = useRef<number | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY.current);
      lastScrollY.current = currentScrollY;

      // Accelerate proportionally with scroll velocity
      const targetMultiplier = Math.min(1 + delta * 0.08, 3.2);
      setVelocityMultiplier(targetMultiplier);

      if (velocityTimeout.current) {
        window.clearTimeout(velocityTimeout.current);
      }

      velocityTimeout.current = window.setTimeout(() => {
        setVelocityMultiplier(1);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (velocityTimeout.current) window.clearTimeout(velocityTimeout.current);
    };
  }, [prefersReducedMotion]);

  const baseDuration = isHovered ? 45 : 22;
  const computedDuration = baseDuration / velocityMultiplier;

  return (
    <div
      className="py-14 relative overflow-hidden border-y border-white/10 bg-[#161B18] select-none w-full max-w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Track 1: Moving Left */}
      <div className="flex overflow-hidden whitespace-nowrap mb-4 w-full max-w-full">
        <motion.div
          animate={prefersReducedMotion ? {} : { x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: computedDuration,
          }}
          className="flex items-center gap-12 text-3xl sm:text-5xl lg:text-6xl font-bold font-heading tracking-tighter text-[#F4F1EA] uppercase will-change-transform"
        >
          {[...TRACK_ONE, ...TRACK_ONE].map((item, idx) => (
            <div key={idx} className="flex items-center gap-12">
              <span className={idx % 2 === 0 ? 'text-[#F4F1EA]' : 'text-[#858C87] font-light'}>
                {item}
              </span>
              <span className="text-sm font-mono text-[#FF0000] font-normal tracking-normal">
                ✦
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Track 2: Moving Right */}
      <div className="flex overflow-hidden whitespace-nowrap">
        <motion.div
          animate={prefersReducedMotion ? {} : { x: ['-50%', '0%'] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: computedDuration * 1.15,
          }}
          className="flex items-center gap-12 text-2xl sm:text-4xl lg:text-5xl font-mono tracking-tight text-[#C2C5C0] uppercase will-change-transform"
        >
          {[...TRACK_TWO, ...TRACK_TWO].map((item, idx) => (
            <div key={idx} className="flex items-center gap-12">
              <span className={idx % 2 === 0 ? 'text-[#C2C5C0]' : 'text-[#858C87]'}>
                {item}
              </span>
              <span className="text-xs text-[#FF0000] font-mono">
                /
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
