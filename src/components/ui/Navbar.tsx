import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const NAV_LINKS = [
  { num: '01', name: 'ABOUT', href: '#about' },
  { num: '02', name: 'CAPABILITIES', href: '#capabilities' },
  { num: '03', name: 'WORK', href: '#projects' },
  { num: '04', name: 'STACK', href: '#stack' },
  { num: '05', name: 'CONTACT', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer when window resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? 'header-glass py-3.5 sm:py-4'
          : 'bg-transparent py-5 sm:py-7'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand identity colophon */}
        <a
          href="#hero"
          className="group flex items-baseline gap-2.5 sm:gap-3 focus:outline-none max-w-[70vw] sm:max-w-none"
        >
          <span className="font-heading font-bold text-base sm:text-xl tracking-tight text-[#F4F1EA] group-hover:text-[#FF0000] transition-colors truncate">
            HE KNOWS SOMETHING
          </span>
          <span className="text-[10px] font-mono tracking-widest text-[#858C87] uppercase hidden sm:inline-block">
            // DIGITAL PRACTICE
          </span>
        </a>

        {/* Editorial Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="group flex items-center gap-1.5 text-xs font-mono text-[#C2C5C0] hover:text-[#F4F1EA] transition-colors"
            >
              <span className="text-[10px] text-[#858C87] group-hover:text-[#FF0000] transition-colors">
                {link.num}
              </span>
              <span>{link.name}</span>
            </a>
          ))}
        </nav>

        {/* Minimal Right Studio Anchor */}
        <div className="hidden md:flex items-center">
          <a
            href="#contact"
            className="flex items-center gap-1 text-xs font-mono tracking-wider text-[#C2C5C0] hover:text-[#F4F1EA] transition-colors border-b border-white/20 hover:border-[#FF0000] pb-0.5"
          >
            <span>INQUIRE</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#FF0000]" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 rounded-md border border-white/10 bg-white/5 text-[#C2C5C0] hover:text-[#F4F1EA] hover:border-[#FF0000] active:scale-95 transition-all focus:outline-none"
          aria-label="Toggle Navigation"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-[#FF0000]" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Glass Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#111613]/95 backdrop-blur-xl border-b border-white/10 px-5 py-6 space-y-3 mt-3 shadow-2xl">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between text-sm font-mono text-[#C2C5C0] hover:text-[#F4F1EA] py-3 px-3 rounded-md hover:bg-white/5 border-b border-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#FF0000] font-semibold">{link.num}</span>
                <span className="tracking-wide font-medium">{link.name}</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#858C87]" />
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between text-xs font-mono text-[#111613] bg-[#F4F1EA] hover:bg-white font-semibold py-3 px-4 rounded transition-colors"
            >
              <span>INQUIRE / COLLABORATE</span>
              <ArrowUpRight className="w-4 h-4 text-[#FF0000]" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
