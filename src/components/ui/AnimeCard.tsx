import React, { useRef } from 'react';
import anime from 'animejs';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface AnimeCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'purple' | 'emerald';
  onClick?: () => void;
}

export const AnimeCard: React.FC<AnimeCardProps> = ({
  children,
  className = '',
  glowColor = 'cyan',
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const handleMouseEnter = () => {
    if (prefersReducedMotion || !cardRef.current) return;

    anime({
      targets: cardRef.current,
      scale: 1.02,
      translateY: -6,
      duration: 500,
      easing: 'spring(1, 80, 14, 0)',
    });
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion || !cardRef.current) return;

    anime({
      targets: cardRef.current,
      scale: 1,
      translateY: 0,
      duration: 400,
      easing: 'easeOutQuad',
    });
  };

  const glowStyles = {
    cyan: 'hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]',
    purple: 'hover:border-purple-400/50 hover:shadow-[0_0_30px_rgba(138,43,226,0.15)]',
    emerald: 'hover:border-emerald-400/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]',
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`glass-card p-6 sm:p-8 rounded-3xl border border-white/10 transition-all duration-300 ${glowStyles[glowColor]} ${className}`}
    >
      {children}
    </div>
  );
};
