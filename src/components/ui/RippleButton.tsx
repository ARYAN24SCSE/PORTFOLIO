import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import anime from 'animejs';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface RippleButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'cyan' | 'outline';
  icon?: React.ReactNode;
}

export const RippleButton: React.FC<RippleButtonProps> = ({
  children,
  onClick,
  href,
  className = '',
  variant = 'cyan',
  icon,
}) => {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion || !buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) * 0.25;
    const y = (e.clientY - (top + height / 2)) * 0.25;
    setMagneticPos({ x, y });
  };

  const handleMouseLeave = () => {
    setMagneticPos({ x: 0, y: 0 });
  };

  const createRipple = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const newRipple: Ripple = { id: Date.now(), x, y, size };
    setRipples((prev) => [...prev, newRipple]);

    // Animate ripple with Anime.js
    setTimeout(() => {
      anime({
        targets: `.ripple-${newRipple.id}`,
        scale: [0, 1],
        opacity: [0.6, 0],
        easing: 'easeOutExpo',
        duration: 700,
        complete: () => {
          setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
        },
      });
    }, 10);

    if (onClick) onClick();
  };

  const variantStyles = {
    cyan: 'bg-cyan-400 text-black font-semibold hover:bg-cyan-300 shadow-lg shadow-cyan-500/25 border border-cyan-300/50',
    primary: 'bg-linear-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:brightness-110 shadow-lg shadow-cyan-500/20 border border-cyan-400/40',
    secondary: 'bg-white/5 text-white hover:bg-white/10 border border-white/10 hover:border-cyan-400/40',
    outline: 'bg-transparent text-cyan-400 hover:text-white border border-cyan-500/40 hover:border-cyan-400 hover:bg-cyan-500/10',
  };

  const elementContent = (
    <>
      {/* Expanding ripples */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className={`ripple-${ripple.id} absolute rounded-full bg-white/40 pointer-events-none will-change-transform`}
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            width: `${ripple.size}px`,
            height: `${ripple.size}px`,
          }}
        />
      ))}

      {/* Button Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {icon}
        {children}
      </span>

      {/* High-speed specular shine sweep */}
      <span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
    </>
  );

  const baseClasses = `relative inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-xs font-mono tracking-wide overflow-hidden transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 group cursor-pointer ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <motion.a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={createRipple}
        animate={prefersReducedMotion ? {} : { x: magneticPos.x, y: magneticPos.y }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 350, damping: 20 }}
        className={baseClasses}
      >
        {elementContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      type="button"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={createRipple}
      animate={prefersReducedMotion ? {} : { x: magneticPos.x, y: magneticPos.y }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 350, damping: 20 }}
      className={baseClasses}
    >
      {elementContent}
    </motion.button>
  );
};
