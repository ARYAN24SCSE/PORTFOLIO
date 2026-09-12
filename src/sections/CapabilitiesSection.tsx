import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Plus } from 'lucide-react';
import { WHAT_I_BUILD } from '../data/portfolioData';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const CapabilitiesSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="capabilities" className="py-32 relative bg-[#F4F1EA] text-[#111613] border-b border-[rgba(17,22,19,0.14)] select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Editorial Section Header: Clean Bright Typography */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-20 pb-8 border-b border-[rgba(17,22,19,0.14)]">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-xs text-[#FF0000] font-semibold tracking-wider">
              02 // EXPLORATION
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#111613] tracking-tight font-heading">
              WHAT I LOVE EXPERIMENTING WITH
            </h2>
          </div>
          <span className="font-mono text-xs text-[#707671] uppercase tracking-widest">
            INTERESTS, EXPERIMENTS &amp; PROTOTYPES
          </span>
        </div>

        {/* Typographic Horizontal Agency Work Index: Editorial Light Treatment */}
        <div className="border-t border-[rgba(17,22,19,0.14)]">
          {WHAT_I_BUILD.map((cap, idx) => {
            const isHovered = hoveredIndex === idx;

            return (
              <div
                key={cap.id}
                onMouseEnter={() => setHoveredIndex(idx)}
                className={`border-b border-[rgba(17,22,19,0.14)] transition-colors duration-300 ${isHovered ? 'bg-[#E8E5DE]' : 'bg-transparent'
                  }`}
              >
                <div
                  onClick={() => setHoveredIndex(isHovered ? null : idx)}
                  className="py-8 px-4 sm:px-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6 relative group"
                >
                  {/* Left Column: Number + Title */}
                  <div className="flex items-baseline gap-6 sm:gap-10">
                    <span className="font-mono text-sm text-[#707671] group-hover:text-[#FF0000] transition-colors font-semibold">
                      0{idx + 1}
                    </span>
                    <div>
                      <h3
                        className={`text-2xl sm:text-3xl lg:text-4xl font-bold font-heading tracking-tight transition-transform duration-300 origin-left ${isHovered ? 'text-[#111613] translate-x-2' : 'text-[#424844]'
                          }`}
                      >
                        {cap.title}
                      </h3>
                      <div className="font-mono text-xs text-[#707671] uppercase tracking-wider mt-1.5 font-medium">
                        {cap.subtitle}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Interaction Trigger */}
                  <div className="flex items-center gap-6 self-end md:self-auto">
                    <span className="font-mono text-xs text-[#707671] hidden lg:inline-block">
                      {cap.keyFeatures[0]}
                    </span>
                    <div className="w-9 h-9 rounded-none border border-[rgba(17,22,19,0.2)] flex items-center justify-center text-[#424844] group-hover:text-[#111613] group-hover:border-[#FF0000] transition-colors">
                      {isHovered ? (
                        <ArrowUpRight className="w-4 h-4 text-[#FF0000]" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Animated Expanded Reveal with Preserved Motion */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden px-4 sm:px-6 pb-10"
                    >
                      <div className="pt-4 border-t border-[rgba(17,22,19,0.08)] grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                        <div className="lg:col-span-7">
                          <p className="text-[#424844] text-base leading-relaxed max-w-xl font-normal">
                            {cap.description}
                          </p>
                        </div>

                        <div className="lg:col-span-5 space-y-2.5">
                          <div className="font-mono text-[11px] text-[#707671] uppercase tracking-wider mb-2 font-semibold">
                            EXPLORATION FOCUS:
                          </div>
                          {cap.keyFeatures.map((feat, fIdx) => (
                            <div
                              key={fIdx}
                              className="flex items-center gap-2.5 text-xs font-mono text-[#424844]"
                            >
                              <span className="w-1.5 h-1.5 bg-[#FF0000]" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
