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
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'header-glass py-4'
          : 'bg-transparent py-7'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand identity colophon */}
        <a
          href="#hero"
          className="group flex items-baseline gap-3 focus:outline-none"
        >
          <span className="font-heading font-bold text-xl tracking-tight text-[#F4F1EA] group-hover:text-[#FF0000] transition-colors">
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
          className="md:hidden p-2 text-[#858C87] hover:text-[#F4F1EA] focus:outline-none"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#111613] border-b border-white/10 px-6 py-6 space-y-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between text-sm font-mono text-[#C2C5C0] hover:text-[#F4F1EA] py-2 border-b border-white/5"
            >
              <span>{link.name}</span>
              <span className="text-xs text-[#858C87]">{link.num}</span>
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between text-xs font-mono text-[#FF0000] pt-2"
          >
            <span>INQUIRE / COLLABORATE</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </header>
  );
};
