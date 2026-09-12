import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'studio';
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  href,
  variant = 'studio',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.22, y: middleY * 0.22 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles = 'relative inline-flex items-center justify-center font-mono text-xs tracking-wider transition-colors overflow-hidden group focus:outline-none';
  const variantStyles = {
    studio: 'bg-[#F4F1EA] text-[#111613] font-semibold hover:bg-white hover:text-[#FF0000] border border-[#F4F1EA]',
    primary: 'bg-[#111613] text-[#F4F1EA] font-medium hover:border-[#FF0000] border border-white/20',
    secondary: 'bg-white/5 text-[#C2C5C0] hover:text-[#F4F1EA] border border-white/10 hover:border-white/20',
    outline: 'bg-transparent text-[#C2C5C0] hover:text-[#F4F1EA] border border-white/20 hover:border-[#FF0000]',
  };

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={prefersReducedMotion ? {} : { x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 220, damping: 18, mass: 0.1 }}
      className={`${baseStyles} ${variantStyles[variant]} px-6 py-3 ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      <span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} type="button" className="inline-block">
      {content}
    </button>
  );
};
