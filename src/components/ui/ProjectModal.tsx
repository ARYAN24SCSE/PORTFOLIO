import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, Check } from 'lucide-react';
import { Project } from '../../types';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  if (!project || !isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop Fade In / Out */}
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
        />

        {/* Case Study Window */}
        <motion.div
          key="modal-content"
          initial={{ opacity: 0, scale: 0.95, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', stiffness: 320, damping: 26 }}
          className="relative w-full max-w-3xl glass-panel p-8 sm:p-12 z-10 space-y-8 max-h-[90vh] overflow-y-auto shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)]"
        >
          {/* Close Trigger */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-[#858C87] hover:text-[#F4F1EA] border border-white/10 hover:border-[#FF0000] transition-colors focus:outline-none"
            aria-label="Close Case Study"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header Metadata */}
          <div className="space-y-3 pr-10 border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[#FF0000] font-semibold uppercase tracking-wider">
                {project.category}
              </span>
              <span className="text-[#858C87] font-mono text-xs">/</span>
              <span className="font-mono text-xs text-[#C2C5C0] uppercase tracking-wider">
                {project.status}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#F4F1EA] font-heading tracking-tight">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm font-mono text-[#C2C5C0]">
              {project.tagline}
            </p>
          </div>

          {/* Personal Engineering Curiosity Context */}
          {project.question && (
            <div className="p-4 bg-black/30 border border-white/10 space-y-1.5">
              <span className="font-mono text-[10px] text-[#FF0000] uppercase tracking-wider font-semibold block">
                THE QUESTION //
              </span>
              <p className="text-xs sm:text-sm text-[#F4F1EA] font-mono italic leading-relaxed">
                "{project.question}"
              </p>
            </div>
          )}

          {/* Problem Statement */}
          <div className="space-y-2">
            <h4 className="font-mono text-xs text-[#FF0000] uppercase tracking-wider font-semibold">
              01 // THE PROBLEM &amp; CHALLENGE
            </h4>
            <p className="text-sm text-[#C2C5C0] font-normal leading-relaxed">
              {project.problem}
            </p>
          </div>

          {/* Solution Statement */}
          <div className="space-y-2 pt-2 border-t border-white/5">
            <h4 className="font-mono text-xs text-[#FF0000] uppercase tracking-wider font-semibold">
              02 // ENGINEERING SOLUTION
            </h4>
            <p className="text-sm text-[#C2C5C0] font-normal leading-relaxed">
              {project.solution}
            </p>
          </div>

          {/* System Architecture */}
          <div className="space-y-3 pt-2 border-t border-white/5">
            <h4 className="font-mono text-xs text-[#FF0000] uppercase tracking-wider font-semibold">
              03 // SYSTEM ARCHITECTURE PIPELINE
            </h4>
            <div className="space-y-2">
              {project.architecture.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs font-mono text-[#F4F1EA]">
                  <span className="text-[#FF0000] mt-0.5">0{idx + 1}.</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Core Technologies */}
          <div className="space-y-3 pt-2 border-t border-white/5">
            <h4 className="font-mono text-xs text-[#858C87] uppercase tracking-wider">
              TECHNOLOGIES DEPLOYED
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-mono text-[#C2C5C0] bg-white/5 border border-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Key Metrics / Output */}
          <div className="p-5 bg-[#0B0F0D] border border-white/10 space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs text-[#FF0000] font-semibold uppercase">
              <Check className="w-4 h-4 text-[#FF0000]" />
              MEASURED METRICS &amp; IMPACT
            </div>
            <div className="grid grid-cols-3 gap-4">
              {project.metrics.map((metric, idx) => (
                <div key={idx}>
                  <div className="text-[10px] font-mono text-[#858C87] uppercase">{metric.label}</div>
                  <div className="text-base font-heading font-bold text-[#F4F1EA]">{metric.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-white/10">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono text-[#F4F1EA] bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                VIEW REPOSITORY
              </a>
            ) : <span />}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono text-[#111613] bg-[#F4F1EA] hover:bg-white transition-colors font-semibold"
              >
                LIVE DEPLOYMENT
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
