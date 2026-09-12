import React from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  delay = 0,
  once = true,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(' ');

  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>;
  }

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 18,
        stiffness: 120,
      },
    },
    hidden: {
      opacity: 0,
      y: 16,
    },
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {words.map((word, idx) => (
        <motion.span key={idx} variants={child} className="inline-block">
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};
