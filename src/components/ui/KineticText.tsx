import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface KineticTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerTime?: number;
  highlightWords?: string[];
}

export const KineticText: React.FC<KineticTextProps> = ({
  text,
  className = '',
  delay = 0,
  staggerTime = 40,
  highlightWords = [],
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const letters = containerRef.current.querySelectorAll('.kinetic-char');
    if (!letters.length) return;

    anime({
      targets: letters,
      translateY: [28, 0],
      opacity: [0, 1],
      rotateZ: [6, 0],
      scale: [0.9, 1],
      delay: anime.stagger(staggerTime, { start: delay }),
      duration: 900,
      easing: 'spring(1, 80, 12, 0)',
    });
  }, [delay, staggerTime, prefersReducedMotion, text]);

  const words = text.split(' ');

  return (
    <div ref={containerRef} className={`inline-flex flex-wrap gap-x-[0.3em] overflow-hidden ${className}`}>
      {words.map((word, wIdx) => {
        const isHighlighted = highlightWords.includes(word);
        return (
          <span key={wIdx} className="inline-block whitespace-nowrap">
            {word.split('').map((char, cIdx) => (
              <span
                key={cIdx}
                className={`kinetic-char inline-block ${
                  isHighlighted ? 'text-gradient-cyan font-bold' : ''
                }`}
                style={{ opacity: prefersReducedMotion ? 1 : 0 }}
              >
                {char}
              </span>
            ))}
          </span>
        );
      })}
    </div>
  );
};
