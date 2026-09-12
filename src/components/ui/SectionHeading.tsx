import React from 'react';
import { FadeIn } from './FadeIn';

interface SectionHeadingProps {
  badge: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  centered = false,
  className = '',
}) => {
  return (
    <div className={`mb-12 md:mb-16 ${centered ? 'text-center' : ''} ${className}`}>
      <FadeIn direction="up" delay={0.05}>
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs tracking-wider uppercase mb-4 ${centered ? 'mx-auto' : ''}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          {badge}
        </div>
      </FadeIn>

      <FadeIn direction="up" delay={0.1}>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white max-w-3xl">
          {title}
        </h2>
      </FadeIn>

      {subtitle && (
        <FadeIn direction="up" delay={0.15}>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-2xl font-normal leading-relaxed">
            {subtitle}
          </p>
        </FadeIn>
      )}
    </div>
  );
};
