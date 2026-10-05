import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, ArrowRight, ArrowLeft, Bot, Shield, Send, Terminal, Sparkles } from 'lucide-react';
import anime from 'animejs';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface StackCard {
  id: string;
  step: string;
  title: string;
  role: string;
  tagline: string;
  status: string;
  icon: string;
  details: string[];
}

const STACK_CARDS: StackCard[] = [
  {
    id: 'layer-1',
    step: 'PHASE 01',
    title: 'Multi-Model AI Content Pipeline',
    role: 'Automated Generation & Multi-Format Publishing',
    tagline: 'Instant synthesis of contextual technical articles, visual carousels, and communications.',
    status: 'ACTIVE FLOW',
    icon: 'Bot',
    details: [
      'Automated Markdown generation from raw RSS feeds',
      'Dynamic token optimization with prompt distillation',
      'Direct cross-platform webhook dispatching',
    ],
  },
  {
    id: 'layer-2',
    step: 'PHASE 02',
    title: 'WhatsApp Cloud API Lead Bot',
    role: '24/7 Context-Aware Conversational System',
    tagline: 'Multi-turn memory retention with natural dialog management and CRM lead injection.',
    status: 'OPTIMIZED',
    icon: 'Send',
    details: [
      'Webhook listener handling 500+ events per minute',
      'Stateful session indexing with Redis caching',
      'Auto-escalation to human engineers on edge queries',
    ],
  },
  {
    id: 'layer-3',
    step: 'PHASE 03',
    title: 'Low-Latency Voice Agent Channel',
    role: 'Real-time Audio Streaming & Transcription',
    tagline: 'Bidirectional low-latency audio pipelines using streaming STT/TTS synthesis.',
    status: 'DEPLOYED',
    icon: 'Terminal',
    details: [
      '<600ms speech-to-speech response turnaround',
      'Custom intent classifiers with noise gating',
      'Automated call summary & audio waveform archiving',
    ],
  },
  {
    id: 'layer-4',
    step: 'PHASE 04',
    title: 'Defensive Security & Threat Guard',
    role: 'Automated Surface Scanning & Triaging',
    tagline: 'Continuous perimeter testing and zero-trust policy enforcement across distributed endpoints.',
    status: 'ARMED',
    icon: 'Shield',
    details: [
      'Automated port probing and SSL cipher auditing',
      'Dynamic rate-limiting with IP reputation scoring',
      'Automated incident remediation script execution',
    ],
  },
];

export const StackedCards: React.FC = () => {
  const [cards, setCards] = useState<StackCard[]>(STACK_CARDS);
  const prefersReducedMotion = useReducedMotion();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bot': return Bot;
      case 'Send': return Send;
      case 'Terminal': return Terminal;
      case 'Shield': return Shield;
      default: return Sparkles;
    }
  };

  const handleNext = () => {
    if (!prefersReducedMotion) {
      anime({
        targets: '.top-stack-card',
        translateX: [0, 120],
        opacity: [1, 0],
        rotateZ: [0, 8],
        easing: 'easeOutExpo',
        duration: 350,
        complete: () => {
          setCards((prev) => {
            const [first, ...rest] = prev;
            return [...rest, first];
          });
        },
      });
    } else {
      setCards((prev) => {
        const [first, ...rest] = prev;
        return [...rest, first];
      });
    }
  };

  const handlePrev = () => {
    setCards((prev) => {
      const last = prev[prev.length - 1];
      const rest = prev.slice(0, prev.length - 1);
      return [last, ...rest];
    });
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Header Controls */}
      <div className="w-full flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span className="font-mono text-xs text-white font-semibold">Interactive 3D Pipeline Blueprint</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
            aria-label="Previous card"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleNext}
            className="w-8 h-8 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 hover:text-cyan-300 transition-colors"
            aria-label="Next card"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3D Stack Container */}
      <div className="relative w-full h-96 xs:h-84 sm:h-72 perspective-1000">
        <AnimatePresence mode="popLayout">
          {cards.slice(0, 3).map((card, index) => {
            const isTop = index === 0;
            const Icon = getIcon(card.icon);

            // Dynamic 3D stack offset
            const offsetY = index * 12;
            const scale = 1 - index * 0.05;
            const zIndex = 30 - index * 10;
            const opacity = 1 - index * 0.2;

            return (
              <motion.div
                key={card.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{
                  opacity,
                  scale,
                  y: offsetY,
                  zIndex,
                }}
                exit={{ opacity: 0, scale: 0.8, x: 140 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className={`absolute top-0 left-0 right-0 glass-card rounded-xl sm:rounded-2xl p-4 xs:p-5 sm:p-6 border transition-all duration-300 cursor-pointer ${
                  isTop
                    ? 'top-stack-card border-cyan-500/40 shadow-2xl shadow-cyan-950/40'
                    : 'border-white/10 hover:border-white/20'
                }`}
                onClick={isTop ? handleNext : undefined}
                whileHover={isTop ? { scale: scale * 1.02 } : {}}
              >
                <div className="flex items-start justify-between mb-2 sm:mb-3 gap-2">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-mono text-[9px] sm:text-[10px] text-cyan-400 tracking-wider font-semibold block">
                        {card.step}
                      </span>
                      <h4 className="font-heading font-bold text-xs sm:text-base text-white truncate">{card.title}</h4>
                    </div>
                  </div>

                  <span className="px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold shrink-0">
                    {card.status}
                  </span>
                </div>

                <p className="text-[11px] sm:text-xs text-zinc-300 mb-2 sm:mb-3 font-normal leading-relaxed">
                  {card.tagline}
                </p>

                <div className="space-y-1 pt-2 border-t border-white/5">
                  {card.details.map((d, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-zinc-400">
                      <span className="w-1 h-1 rounded-full bg-cyan-400 shrink-0"></span>
                      <span className="truncate">{d}</span>
                    </div>
                  ))}
                </div>

                {isTop && (
                  <div className="mt-2 sm:mt-3 pt-2 flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-zinc-500">
                    <span>Tap to cycle layer</span>
                    <span className="text-cyan-400 flex items-center gap-1 font-semibold">
                      Cycle <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StackedCards;
