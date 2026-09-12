import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#0B0F0D] border-t border-white/10 pt-16 pb-12 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10 items-baseline">
          {/* Col 1: Studio Colophon */}
          <div className="md:col-span-6 space-y-4">
            <div className="font-heading font-bold text-2xl text-[#F4F1EA] tracking-tight">
              ARYAN
            </div>
            <p className="text-[#858C87] text-sm max-w-sm font-normal leading-relaxed">
              Cybersecurity student exploring AI agents, automated workflow pipelines, and experimental web interfaces.
            </p>
          </div>

          {/* Col 2: Studio Index */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <div className="text-[#858C87] uppercase tracking-widest">
              NAVIGATION
            </div>
            <ul className="space-y-2 text-[#C2C5C0]">
              <li><a href="#about" className="hover:text-[#F4F1EA] transition-colors">01 ABOUT</a></li>
              <li><a href="#capabilities" className="hover:text-[#F4F1EA] transition-colors">02 CAPABILITIES</a></li>
              <li><a href="#projects" className="hover:text-[#F4F1EA] transition-colors">03 WORK</a></li>
              <li><a href="#stack" className="hover:text-[#F4F1EA] transition-colors">04 STACK</a></li>
              <li><a href="#contact" className="hover:text-[#F4F1EA] transition-colors">05 CONTACT</a></li>
            </ul>
          </div>

          {/* Col 3: Direct Connect */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <div className="text-[#858C87] uppercase tracking-widest">
              COMMUNICATIONS
            </div>
            <ul className="space-y-2 text-[#C2C5C0]">
              <li>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="hover:text-[#F4F1EA] transition-colors"
                >
                  EMAIL TRANSMISSION
                </a>
              </li>
              <li>
                <a
                  href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
                  className="hover:text-[#F4F1EA] transition-colors"
                >
                  {PERSONAL_INFO.phone}
                </a>
              </li>
              <li>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F4F1EA] transition-colors"
                >
                  LINKEDIN NETWORK
                </a>
              </li>
              <li>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F4F1EA] transition-colors"
                >
                  GITHUB ARCHIVE
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-[#858C87]">
          <p>© {new Date().getFullYear()} ARYAN. DESIGNED &amp; ENGINEERED AS AN EDITORIAL DIGITAL INSTALLATION.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-[#F4F1EA] transition-colors focus:outline-none"
          >
            <span>TOP OF DOCUMENT</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#FF0000]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
