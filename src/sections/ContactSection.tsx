import React, { useState } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!formState.email || !formState.message) return;

    setIsSubmitting(true);
    setResultMessage(null);

    try {
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      const formData = new FormData();

      formData.append('access_key', accessKey || 'a08a26ef-e9bc-4dfc-9b78-43552a8e8055');
      formData.append('name', formState.name);
      formData.append('email', formState.email);
      formData.append('message', formState.message);
      formData.append('subject', 'New Portfolio Contact — Aryan');

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        setFormState({ name: '', email: '', message: '' });
        setResultMessage('MESSAGE SENT. Aryan will review and reply promptly.');
      } else {
        setIsSuccess(false);
        setResultMessage(data.message || "COULDN'T SEND. PLEASE TRY AGAIN.");
      }
    } catch (error) {
      console.error('Web3Forms submission error:', error);
      setIsSuccess(false);
      setResultMessage("COULDN'T SEND. PLEASE TRY AGAIN.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-20 sm:py-32 relative bg-[#0B0F0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Marker */}
        <div className="flex items-baseline gap-3 sm:gap-4 mb-10 sm:mb-16 pb-4 sm:pb-6 border-b border-white/10">
          <span className="font-mono text-xs text-[#FF0000] font-semibold tracking-wider shrink-0">
            05 // CLOSING
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F4F1EA] tracking-tight font-heading">
            INITIATE CONTACT
          </h2>
        </div>

        {/* 2-Column Asymmetric Closing Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Massive Headline + Direct Channels */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-10">
            <div>
              <h3 className="text-4xl xs:text-5xl sm:text-7xl lg:text-8xl font-bold font-heading text-[#F4F1EA] tracking-tighter leading-[0.9] mb-4 sm:mb-6">
                LET'S<br />BUILD.
              </h3>
              <p className="text-[#C2C5C0] text-sm sm:text-base max-w-md font-normal leading-relaxed">
                I'm always interested in interesting problems, system experiments, and things genuinely worth building. Whether you want to talk AI agents, automation pipelines, or technical projects, feel free to reach out.
              </p>
            </div>

            {/* Direct Studio Channels */}
            <div className="space-y-3 pt-4 sm:pt-6 border-t border-white/10 font-mono text-[11px] sm:text-xs">
              <div className="flex items-center justify-between py-2 border-b border-white/5 gap-2">
                <span className="text-[#858C87] shrink-0">ELECTRONIC MAIL</span>
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-[#F4F1EA] hover:text-[#FF0000] transition-colors truncate"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                  <button
                    onClick={copyEmail}
                    className="text-[#858C87] hover:text-[#F4F1EA] p-1 shrink-0"
                    title="Copy Email"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-[#FF0000]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-white/5 gap-2">
                <span className="text-[#858C87] shrink-0">TELEPHONE</span>
                <a
                  href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
                  className="text-[#F4F1EA] hover:text-[#FF0000] transition-colors truncate"
                >
                  {PERSONAL_INFO.phone}
                </a>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-white/5 gap-2">
                <span className="text-[#858C87] shrink-0">PROFESSIONAL NETWORK</span>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F4F1EA] hover:text-[#FF0000] transition-colors flex items-center gap-1 shrink-0"
                >
                  <span>LINKEDIN</span>
                  <ArrowUpRight className="w-3 h-3 text-[#FF0000]" />
                </a>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-white/5 gap-2">
                <span className="text-[#858C87] shrink-0">SOURCE CODE</span>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F4F1EA] hover:text-[#FF0000] transition-colors flex items-center gap-1 shrink-0"
                >
                  <span>GITHUB</span>
                  <ArrowUpRight className="w-3 h-3 text-[#FF0000]" />
                </a>
              </div>

              <div className="flex items-center justify-between py-2 gap-2">
                <span className="text-[#858C87] shrink-0">BASE OF OPERATIONS</span>
                <span className="text-[#C2C5C0] truncate text-right">{PERSONAL_INFO.location}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Sleek Tactile Glass Form Plate */}
          <div className="lg:col-span-6 glass-panel p-5 xs:p-6 sm:p-12">
            <h4 className="font-heading font-bold text-lg sm:text-xl text-[#F4F1EA] tracking-tight mb-6 sm:mb-8">
              TRANSMIT INQUIRY
            </h4>

            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              <div>
                <label className="block font-mono text-[10px] text-[#858C87] uppercase tracking-wider mb-1">
                  YOUR NAME
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  disabled={isSubmitting}
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="Full name or organization"
                  className="studio-input text-base sm:text-sm font-normal disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] text-[#858C87] uppercase tracking-wider mb-1">
                  RETURN ADDRESS (EMAIL)
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  disabled={isSubmitting}
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="yourname@organization.com"
                  className="studio-input text-base sm:text-sm font-normal disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] text-[#858C87] uppercase tracking-wider mb-1">
                  PROJECT SCOPE OR INQUIRY
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  disabled={isSubmitting}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Describe the opportunity, objective, or system requirements..."
                  className="studio-input text-base sm:text-sm resize-none font-normal disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 sm:py-4 bg-[#F4F1EA] text-[#111613] hover:bg-white hover:text-[#FF0000] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all font-mono text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 mt-4"
              >
                <span>{isSubmitting ? 'DISPATCHING...' : 'DISPATCH INQUIRY'}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#FF0000]" />
              </button>

              {resultMessage && (
                <div
                  className={`p-3.5 border font-mono text-xs text-center transition-all ${
                    isSuccess
                      ? 'border-[#FF0000]/40 bg-[#111613] text-[#F4F1EA]'
                      : 'border-[#FF0000] bg-black/60 text-[#FF0000]'
                  }`}
                >
                  {resultMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
