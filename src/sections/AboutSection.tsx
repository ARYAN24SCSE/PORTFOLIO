import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface StoryStage {
  id: string;
  num: string;
  title: string;
  headline: string;
  detail: string;
  metric: string;
}

const STORY_STAGES: StoryStage[] = [
  {
    id: 'cyber',
    num: '01',
    title: 'CYBERSECURITY',
    headline: 'Foundational Defense & Threat Modeling',
    detail: 'My core academic focus. I like studying how systems get probed, how zero-trust boundaries hold up, and what makes software defensively sound.',
    metric: 'PRINCIPLE // ZERO TRUST',
  },
  {
    id: 'agents',
    num: '02',
    title: 'AI AGENTS',
    headline: 'Autonomous Execution & Tool Calling',
    detail: 'Testing how far autonomous models can go when given APIs, structured JSON schemas, and multi-turn context before losing the plot.',
    metric: 'RUNTIME // MULTI-AGENT ORCHESTRATION',
  },
  {
    id: 'automation',
    num: '03',
    title: 'AUTOMATION',
    headline: 'Event-Driven Workflow Pipelines',
    detail: 'Connecting messy disconnected tools via webhooks, n8n, and custom scripts to eliminate repetitive manual steps.',
    metric: 'LATENCY // SUB-SECOND DISPATCH',
  },
  {
    id: 'web',
    num: '04',
    title: 'WEB ENGINEERING',
    headline: 'Tactile Interfaces & Spatial WebGL',
    detail: 'Building frontends where layout, 3D math, and scroll choreography feel fast and tactile without weighing down the browser.',
    metric: 'FRAMERATE // 60 FPS OPTIMIZED',
  },
];

export const AboutSection: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const activeStage = STORY_STAGES[activeStageIndex];

  return (
    <section id="about" className="py-28 relative bg-[#111613] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header Marker */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-16 pb-6 border-b border-white/10">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-xs text-[#FF0000] font-semibold tracking-wider">
              01 // PERSPECTIVE
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F4F1EA] tracking-tight font-heading">
              ABOUT
            </h2>
          </div>
          <span className="font-mono text-xs text-[#858C87] uppercase tracking-widest">
            TECHNICAL DIRECTION &amp; FOUNDATIONS
          </span>
        </div>

        {/* 2-Column Editorial Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Exactly 70–100 Word Editorial Biography */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-6 text-[#C2C5C0] text-base sm:text-[17px] leading-[1.75] font-normal font-body max-w-prose">
              <p>
                I'm a cybersecurity student using security as my core technical foundation, while spending my time figuring out how AI agents, automated workflows, and the web can connect together.
              </p>
              <p>
                I learn by building rather than only studying concepts. I tend to build things when I'm curious about how they actually behave under the hood — whether that's testing how far an AI system can go with dynamic tool calls, or writing frontends that feel responsive and alive.
              </p>
            </div>

            {/* Editorial Metadata Anchor */}
            <div className="pt-6 border-t border-white/10 space-y-2 font-mono text-xs text-[#858C87]">
              <div className="flex justify-between">
                <span>FOCUS DOMAINS</span>
                <span className="text-[#F4F1EA]">DEFENSIVE CYBER / AI WORKFLOWS</span>
              </div>
              <div className="flex justify-between">
                <span>ACADEMIC STATUS</span>
                <span className="text-[#F4F1EA]">CYBERSECURITY STUDENT</span>
              </div>
              <div className="flex justify-between">
                <span>LOCATION</span>
                <span className="text-[#F4F1EA]">PUNJAB / NEW DELHI / REMOTE</span>
              </div>
            </div>

            {/* Subtle Personal Note: Currently Curious About */}
            <div className="pt-6 border-t border-white/10 space-y-2.5">
              <div className="font-mono text-[10px] text-[#FF0000] uppercase tracking-widest font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#FF0000]" />
                <span>CURRENTLY CURIOUS ABOUT</span>
              </div>
              <ul className="font-mono text-xs text-[#C2C5C0] space-y-1.5 pl-3 border-l border-white/10">
                <li>• AI agents that gracefully recover from failed tool calls</li>
                <li>• Making WhatsApp automation feel natural and reliable</li>
                <li>• Making WebGL and 3D scenes load as fast as static pages</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Scrollytelling Visual Narrative */}
          <div className="lg:col-span-7 space-y-8">
            {/* Interactive Narrative Words */}
            <div className="space-y-4">
              {STORY_STAGES.map((stage, idx) => {
                const isActive = idx === activeStageIndex;

                return (
                  <div
                    key={stage.id}
                    onClick={() => setActiveStageIndex(idx)}
                    className={`cursor-pointer transition-all duration-300 pb-4 border-b ${
                      isActive ? 'border-[#FF0000]' : 'border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-baseline gap-4">
                        <span className="font-mono text-xs text-[#858C87]">
                          {stage.num}
                        </span>
                        <span
                          className={`font-heading text-2xl sm:text-4xl font-bold tracking-tight transition-colors duration-300 ${
                            isActive ? 'text-[#F4F1EA]' : 'text-[#858C87] hover:text-[#C2C5C0]'
                          }`}
                        >
                          {stage.title}
                        </span>
                      </div>
                      <span
                        className={`font-mono text-[10px] tracking-wider transition-colors ${
                          isActive ? 'text-[#FF0000]' : 'text-zinc-600'
                        }`}
                      >
                        {isActive ? 'ACTIVE FOCUS' : 'INSPECT'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Active Stage Visual Spread Panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="p-8 bg-[#161B18] border border-white/10 rounded-none relative overflow-hidden"
              >
                {/* Subtle hairline background grid */}
                <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-[#858C87]">
                  {activeStage.metric}
                </div>

                <div className="max-w-lg space-y-3">
                  <div className="font-mono text-xs text-[#FF0000] tracking-wider uppercase">
                    STAGE {activeStage.num} // {activeStage.title}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#F4F1EA] font-heading tracking-tight">
                    {activeStage.headline}
                  </h3>
                  <p className="text-sm text-[#C2C5C0] leading-relaxed font-normal">
                    {activeStage.detail}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#858C87]">
                  <span>TAP OR CLICK OTHER DISCIPLINES TO CYCLE</span>
                  <span className="text-[#C2C5C0] flex items-center gap-1">
                    NEXT {activeStageIndex < STORY_STAGES.length - 1 ? '0' + (activeStageIndex + 2) : '01'}
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#FF0000]" />
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
