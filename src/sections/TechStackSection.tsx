import React, { useState } from 'react';
import { TECH_CATEGORIES } from '../data/portfolioData';

export const TechStackSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <section id="stack" className="py-32 relative bg-[#FAF9F5] text-[#111613] border-b border-[rgba(17,22,19,0.14)] select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Editorial Section Header: Clean Bright Typography */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-20 pb-8 border-b border-[rgba(17,22,19,0.14)]">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-xs text-[#FF0000] font-semibold tracking-wider">
              04 // TOOLING
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#111613] tracking-tight font-heading">
              TECH STACK
            </h2>
          </div>
          <span className="font-mono text-xs text-[#707671] uppercase tracking-widest">
            TECHNOLOGIES, RUNTIMES &amp; TOOLS I USE
          </span>
        </div>

        {/* Typographic Taxonomy Table: Editorial Light */}
        <div className="border-t border-[rgba(17,22,19,0.14)]">
          {TECH_CATEGORIES.map((cat, idx) => {
            const isSelected = activeCategory === cat.name;

            return (
              <div
                key={cat.name}
                onClick={() => setActiveCategory(isSelected ? null : cat.name)}
                onMouseEnter={() => setActiveCategory(cat.name)}
                onMouseLeave={() => setActiveCategory(null)}
                className={`p-6 sm:p-9 border-b border-[rgba(17,22,19,0.14)] transition-colors duration-200 cursor-pointer sm:cursor-default ${
                  isSelected ? 'bg-[#F4F1EA]' : 'bg-transparent'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline">
                  {/* Category Identifier */}
                  <div className="lg:col-span-4 flex items-baseline gap-5">
                    <span className="font-mono text-xs text-[#707671] font-semibold">
                      0{idx + 1}
                    </span>
                    <div>
                      <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#111613] tracking-tight">
                        {cat.name}
                      </h3>
                      <div className="font-mono text-[11px] text-[#FF0000] uppercase tracking-wider mt-1 font-semibold">
                        {cat.level}
                      </div>
                    </div>
                  </div>

                  {/* Skills / Tools Typographic List */}
                  <div className="lg:col-span-8">
                    <div className="flex flex-wrap gap-2 sm:gap-x-7 sm:gap-y-3 font-mono text-xs text-[#424844]">
                      {cat.technologies.map((tech) => (
                        <div
                          key={tech}
                          className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-0 sm:py-0 bg-black/5 sm:bg-transparent rounded-sm sm:rounded-none"
                        >
                          <span className="text-[#858C87] text-[10px] hidden sm:inline">/</span>
                          <span className="hover:text-[#111613] hover:font-medium transition-colors">
                            {tech}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
