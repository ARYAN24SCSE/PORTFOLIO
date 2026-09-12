import React, { useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'purple' | 'emerald';
  onClick?: () => void;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  glowColor = 'cyan',
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) / (width / 2);
    const y = (e.clientY - (top + height / 2)) / (height / 2);

    const rotateX = -y * 8; // Tilt up/down max 8deg
    const rotateY = x * 8;  // Tilt left/right max 8deg

    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion) return;
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  const glowStyles = {
    cyan: 'hover:border-cyan-400/50 hover:shadow-[0_0_35px_rgba(0,240,255,0.18)]',
    purple: 'hover:border-purple-400/50 hover:shadow-[0_0_35px_rgba(168,85,247,0.18)]',
    emerald: 'hover:border-emerald-400/50 hover:shadow-[0_0_35px_rgba(16,185,129,0.18)]',
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ transform, transition: 'transform 0.15s ease-out' }}
      className={`glass-card p-6 sm:p-8 rounded-3xl border border-white/10 will-change-transform ${glowStyles[glowColor]} ${className}`}
    >
      {children}
    </div>
  );
};
