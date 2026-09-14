import {
  SITE_CONFIG,
  PERSONAL_INFO,
  HERO_DATA,
  ABOUT_DATA,
  WHAT_I_BUILD,
  PROJECTS,
  TECH_CATEGORIES,
  MARQUEE_ITEMS,
} from './portfolioData';

/**
 * Escapes HTML characters to prevent XSS / invalid HTML syntax
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Resolves the absolute canonical domain from environment variable or SITE_CONFIG
 */
export function getSiteDomain(): string {
  const envUrl =
    (typeof globalThis !== 'undefined' && (globalThis as any).process?.env?.VITE_SITE_URL) ||
    (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_SITE_URL);
  let domain = (envUrl || SITE_CONFIG.domain || 'https://buildwitharyan.vercel.app').trim();
  // Strip trailing slash for consistency
  if (domain.endsWith('/')) {
    domain = domain.slice(0, -1);
  }
  return domain;
}

/**
 * Generates Schema.org JSON-LD structured data graph
 */
export function generateJsonLd(): string {
  const domain = getSiteDomain();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${domain}/#person`,
        name: 'Aryan',
        jobTitle: 'Cybersecurity Student & Technical Builder',
        url: `${domain}/`,
        sameAs: [PERSONAL_INFO.github, PERSONAL_INFO.linkedin],
        knowsAbout: [
          'Cybersecurity',
          'AI Agents',
          'Workflow Automation',
          'n8n',
          'React',
          'TypeScript',
          'GSAP',
          'Three.js',
        ],
        description:
          'Cybersecurity student and technical builder creating AI-powered automation, intelligent digital systems and high-performance web experiences.',
      },
      {
        '@type': 'WebSite',
        '@id': `${domain}/#website`,
        url: `${domain}/`,
        name: SITE_CONFIG.name,
        description:
          'Cybersecurity student and technical builder specializing in AI agents, workflow automation, and high-performance web experiences.',
        publisher: {
          '@id': `${domain}/#person`,
        },
      },
    ],
  };

  return JSON.stringify(jsonLd, null, 2);
}

/**
 * Generates crawlable, accessible, semantic HTML representing the entire portfolio
 * directly from the single source of truth (portfolioData.ts).
 */
export function generateSemanticHtml(): string {
  const domain = getSiteDomain();

  const capabilitiesHtml = WHAT_I_BUILD.map(
    (cap, idx) => `
        <article class="py-8 px-4 sm:px-6 border-b border-[rgba(17,22,19,0.14)]">
          <div class="flex items-baseline gap-6 sm:gap-10 mb-2">
            <span class="font-mono text-sm text-[#707671] font-semibold">0${idx + 1}</span>
            <div>
              <h3 class="text-2xl sm:text-3xl font-bold font-heading text-[#111613]">${escapeHtml(cap.title)}</h3>
              <div class="font-mono text-xs text-[#707671] uppercase tracking-wider mt-1 font-medium">${escapeHtml(cap.subtitle)}</div>
            </div>
          </div>
          <p class="text-[#424844] text-base leading-relaxed max-w-xl mb-4">
            ${escapeHtml(cap.description)}
          </p>
          <ul class="flex flex-wrap gap-2 font-mono text-xs text-[#707671]">
            ${cap.keyFeatures.map((feat) => `<li>• ${escapeHtml(feat)}</li>`).join(' ')}
          </ul>
        </article>`
  ).join('\n');

  const projectsHtml = PROJECTS.map(
    (proj, idx) => `
        <article class="glass-material-dark p-8 flex flex-col justify-between">
          <div class="space-y-4">
            <div class="flex items-baseline justify-between pb-4 border-b border-white/10 font-mono text-xs">
              <span class="text-[#FF0000] font-semibold">0${idx + 1} // ${escapeHtml(proj.category.toUpperCase())}</span>
              <span class="text-[#858C87]">${escapeHtml(proj.status.toUpperCase())}</span>
            </div>
            <h3 class="text-2xl font-bold text-[#F4F1EA] font-heading">${escapeHtml(proj.title)}</h3>
            <p class="text-[#C2C5C0] text-sm leading-relaxed">
              ${escapeHtml(proj.summary)}
            </p>
            ${
              proj.question
                ? `<div class="p-3 bg-black/25 border border-white/10 font-mono text-xs text-[#858C87]">
              <span class="text-[#FF0000] block text-[10px]">THE QUESTION //</span>
              "${escapeHtml(proj.question)}"
            </div>`
                : ''
            }
            <div class="flex flex-wrap gap-2 pt-2">
              ${proj.techStack.map((tech) => `<span class="px-2 py-1 bg-white/5 font-mono text-[11px] text-[#C2C5C0]">${escapeHtml(tech)}</span>`).join(' ')}
            </div>
          </div>
          <div class="pt-6 mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            ${
              proj.githubUrl
                ? `<a href="${escapeHtml(proj.githubUrl)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-4 py-2 bg-white/10 text-[#F4F1EA] border border-white/15 hover:border-[#FF0000] text-xs font-mono uppercase font-semibold">VIEW GITHUB REPOSITORY ↗</a>`
                : '<span></span>'
            }
            ${
              proj.liveUrl
                ? `<a href="${escapeHtml(proj.liveUrl)}" target="_blank" rel="noopener noreferrer" class="text-[#F4F1EA] hover:underline">LIVE LINK ↗</a>`
                : ''
            }
          </div>
        </article>`
  ).join('\n');

  const techCategoriesHtml = TECH_CATEGORIES.map(
    (cat, idx) => `
        <div class="p-6 sm:p-9 border-b border-[rgba(17,22,19,0.14)] grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline">
          <div class="lg:col-span-4 flex items-baseline gap-5">
            <span class="font-mono text-xs text-[#707671] font-semibold">0${idx + 1}</span>
            <div>
              <h3 class="font-heading font-bold text-xl sm:text-2xl text-[#111613]">${escapeHtml(cat.name)}</h3>
              <div class="font-mono text-[11px] text-[#FF0000] uppercase tracking-wider mt-1 font-semibold">${escapeHtml(cat.level)}</div>
            </div>
          </div>
          <div class="lg:col-span-8 flex flex-wrap gap-3 font-mono text-xs text-[#424844]">
            ${cat.technologies.map((tech) => `<span>${escapeHtml(tech)}</span>`).join(' / ')}
          </div>
        </div>`
  ).join('\n');

  return `
    <div class="relative min-h-screen bg-[#111613] text-[#F4F1EA] w-full max-w-full overflow-x-clip">
      <!-- Header / Nav -->
      <header class="fixed top-0 left-0 right-0 z-50 py-7 transition-all">
        <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          <a href="#hero" class="flex items-baseline gap-3">
            <span class="font-heading font-bold text-xl tracking-tight text-[#F4F1EA]">${escapeHtml(SITE_CONFIG.brandTitle)}</span>
            <span class="text-[10px] font-mono tracking-widest text-[#858C87] uppercase hidden sm:inline-block">${escapeHtml(SITE_CONFIG.brandTagline)}</span>
          </a>
          <nav class="hidden md:flex items-center gap-8">
            <a href="#about" class="flex items-center gap-1.5 text-xs font-mono text-[#C2C5C0]"><span class="text-[10px] text-[#858C87]">01</span><span>ABOUT</span></a>
            <a href="#capabilities" class="flex items-center gap-1.5 text-xs font-mono text-[#C2C5C0]"><span class="text-[10px] text-[#858C87]">02</span><span>CAPABILITIES</span></a>
            <a href="#projects" class="flex items-center gap-1.5 text-xs font-mono text-[#C2C5C0]"><span class="text-[10px] text-[#858C87]">03</span><span>WORK</span></a>
            <a href="#stack" class="flex items-center gap-1.5 text-xs font-mono text-[#C2C5C0]"><span class="text-[10px] text-[#858C87]">04</span><span>STACK</span></a>
            <a href="#contact" class="flex items-center gap-1.5 text-xs font-mono text-[#C2C5C0]"><span class="text-[10px] text-[#858C87]">05</span><span>CONTACT</span></a>
          </nav>
          <div class="hidden md:flex items-center">
            <a href="#contact" class="text-xs font-mono tracking-wider text-[#C2C5C0] border-b border-white/20 pb-0.5">INQUIRE</a>
          </div>
        </div>
      </header>

      <main class="relative z-10">
        <!-- 01 Hero Section -->
        <section id="hero" class="relative min-h-screen w-full flex flex-col justify-between pt-36 pb-12 overflow-hidden border-b border-white/10">
          <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full z-20 my-auto">
            <div class="max-w-3xl space-y-8">
              <div class="inline-flex items-center gap-2.5 font-mono text-xs tracking-widest text-[#F4F1EA] uppercase">
                <span class="w-1.5 h-1.5 bg-[#FF0000]"></span>
                <span class="text-[#C2C5C0]">${escapeHtml(HERO_DATA.tagline)}</span>
              </div>
              <div class="relative inline-block">
                <h1 class="text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] font-bold text-[#F4F1EA] tracking-tighter leading-[0.88] font-heading">
                  ${escapeHtml(HERO_DATA.name)}
                </h1>
                <span class="absolute -top-2 -right-6 font-mono text-xs text-[#FF0000] font-semibold tracking-wider">[01]</span>
              </div>
              <div class="space-y-4 max-w-xl">
                <p class="text-xl sm:text-2xl font-normal text-[#F4F1EA] tracking-tight leading-snug font-heading">
                  ${escapeHtml(HERO_DATA.headline)}
                </p>
                <p class="text-sm sm:text-base text-[#C2C5C0] font-normal leading-relaxed">
                  ${escapeHtml(HERO_DATA.subheadline)}
                </p>
                <div class="flex flex-wrap items-center gap-4 pt-4">
                  <a href="#projects" class="inline-flex items-center gap-2 px-6 py-3.5 bg-[#F4F1EA] text-[#111613] text-xs font-mono tracking-wider font-semibold uppercase">
                    <span>VIEW PROJECTS</span>
                  </a>
                  <a href="#contact" class="inline-flex items-center gap-2 px-6 py-3.5 border border-white/20 text-[#F4F1EA] text-xs font-mono tracking-wider uppercase">
                    <span>CONTACT ME</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full z-20 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] font-mono text-[#858C87]">
            <div class="flex items-center gap-6">
              <span>01 PERSPECTIVE</span>
              <span>02 SCOPE</span>
              <span>03 WORK</span>
              <span>04 TOOLING</span>
            </div>
            <div class="flex items-center gap-2 text-[#C2C5C0]">
              <span>SCROLL TO EXPLORE</span>
              <span class="w-1.5 h-1.5 rounded-full bg-[#FF0000]"></span>
            </div>
          </div>
        </section>

        <!-- Marquee / Ticker -->
        <section aria-label="Discipline Index" class="py-12 bg-[#0B0F0D] border-b border-white/10 overflow-hidden">
          <div class="font-mono text-sm tracking-widest text-[#858C87] uppercase flex gap-8 whitespace-nowrap px-6">
            ${MARQUEE_ITEMS.map((item) => `<span>${escapeHtml(item)}</span>`).join(' • ')}
          </div>
        </section>

        <!-- 02 About Section -->
        <section id="about" class="py-28 relative bg-[#111613] border-b border-white/10">
          <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-16 pb-6 border-b border-white/10">
              <div class="flex items-baseline gap-4">
                <span class="font-mono text-xs text-[#FF0000] font-semibold tracking-wider">01 // PERSPECTIVE</span>
                <h2 class="text-3xl sm:text-4xl font-bold text-[#F4F1EA] tracking-tight font-heading">${escapeHtml(ABOUT_DATA.title)}</h2>
              </div>
              <span class="font-mono text-xs text-[#858C87] uppercase tracking-widest">TECHNICAL DIRECTION &amp; FOUNDATIONS</span>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              <div class="lg:col-span-5 space-y-8">
                <div class="space-y-6 text-[#C2C5C0] text-base sm:text-[17px] leading-[1.75] font-normal font-body">
                  ${ABOUT_DATA.paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join('\n                  ')}
                </div>
                <div class="pt-6 border-t border-white/10 space-y-2 font-mono text-xs text-[#858C87]">
                  <div class="flex justify-between"><span>FOCUS DOMAINS</span><span class="text-[#F4F1EA]">DEFENSIVE CYBER / AI WORKFLOWS</span></div>
                  <div class="flex justify-between"><span>ACADEMIC STATUS</span><span class="text-[#F4F1EA]">CYBERSECURITY STUDENT</span></div>
                  <div class="flex justify-between"><span>LOCATION</span><span class="text-[#F4F1EA]">${escapeHtml(PERSONAL_INFO.location.toUpperCase())}</span></div>
                </div>
              </div>
              <div class="lg:col-span-7 space-y-8">
                <article class="p-8 bg-[#161B18] border border-white/10 space-y-4">
                  <div class="font-mono text-xs text-[#FF0000] tracking-wider uppercase">STAGE 01 // CYBERSECURITY</div>
                  <h3 class="text-xl sm:text-2xl font-bold text-[#F4F1EA] font-heading tracking-tight">Foundational Defense &amp; Threat Modeling</h3>
                  <p class="text-sm text-[#C2C5C0] leading-relaxed">
                    My core academic focus. I like studying how systems get probed, how zero-trust boundaries hold up, and what makes software defensively sound.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <!-- 03 Capabilities Section -->
        <section id="capabilities" class="py-32 relative bg-[#F4F1EA] text-[#111613] border-b border-[rgba(17,22,19,0.14)]">
          <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-20 pb-8 border-b border-[rgba(17,22,19,0.14)]">
              <div class="flex items-baseline gap-4">
                <span class="font-mono text-xs text-[#FF0000] font-semibold tracking-wider">02 // EXPLORATION</span>
                <h2 class="text-4xl sm:text-5xl font-bold text-[#111613] tracking-tight font-heading">WHAT I LOVE EXPERIMENTING WITH</h2>
              </div>
              <span class="font-mono text-xs text-[#707671] uppercase tracking-widest">INTERESTS, EXPERIMENTS &amp; PROTOTYPES</span>
            </div>
            <div class="border-t border-[rgba(17,22,19,0.14)]">
              ${capabilitiesHtml}
            </div>
          </div>
        </section>

        <!-- 04 Projects Section -->
        <section id="projects" class="relative bg-[#0B0F0D] border-b border-white/10 w-full max-w-full">
          <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-28 pb-12 flex flex-col sm:flex-row sm:items-baseline justify-between gap-6 border-b border-white/10">
            <div class="flex items-baseline gap-4">
              <span class="font-mono text-xs text-[#FF0000] font-semibold tracking-wider">03 // PROJECTS</span>
              <h2 class="text-4xl sm:text-5xl font-bold text-[#F4F1EA] tracking-tight font-heading">FEATURED WORK</h2>
            </div>
            <div class="font-mono text-xs text-[#C2C5C0] flex items-center gap-3">
              <span>EXPLORE CASE STUDIES</span>
            </div>
          </div>
          <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            ${projectsHtml}
          </div>
        </section>

        <!-- 05 Tech Stack Section -->
        <section id="stack" class="py-32 relative bg-[#FAF9F5] text-[#111613] border-b border-[rgba(17,22,19,0.14)]">
          <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-20 pb-8 border-b border-[rgba(17,22,19,0.14)]">
              <div class="flex items-baseline gap-4">
                <span class="font-mono text-xs text-[#FF0000] font-semibold tracking-wider">04 // TOOLING</span>
                <h2 class="text-4xl sm:text-5xl font-bold text-[#111613] tracking-tight font-heading">TECH STACK</h2>
              </div>
              <span class="font-mono text-xs text-[#707671] uppercase tracking-widest">TECHNOLOGIES, RUNTIMES &amp; TOOLS I USE</span>
            </div>
            <div class="border-t border-[rgba(17,22,19,0.14)]">
              ${techCategoriesHtml}
            </div>
          </div>
        </section>

        <!-- 06 Contact Section -->
        <section id="contact" class="py-32 relative bg-[#0B0F0D]">
          <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div class="flex items-baseline gap-4 mb-16 pb-6 border-b border-white/10">
              <span class="font-mono text-xs text-[#FF0000] font-semibold tracking-wider">05 // CLOSING</span>
              <h2 class="text-3xl sm:text-4xl font-bold text-[#F4F1EA] tracking-tight font-heading">INITIATE CONTACT</h2>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              <div class="lg:col-span-6 space-y-10">
                <div>
                  <h3 class="text-5xl sm:text-7xl lg:text-8xl font-bold font-heading text-[#F4F1EA] tracking-tighter leading-[0.9] mb-6">
                    LET'S<br />BUILD.
                  </h3>
                  <p class="text-[#C2C5C0] text-base max-w-md font-normal leading-relaxed">
                    I'm always interested in interesting problems, system experiments, and things genuinely worth building. Whether you want to talk AI agents, automation pipelines, or technical projects, feel free to reach out.
                  </p>
                </div>
                <div class="space-y-4 pt-6 border-t border-white/10 font-mono text-xs">
                  <div class="flex items-center justify-between py-2 border-b border-white/5">
                    <span class="text-[#858C87]">ELECTRONIC MAIL</span>
                    <a href="mailto:${escapeHtml(PERSONAL_INFO.email)}" class="text-[#F4F1EA]">${escapeHtml(PERSONAL_INFO.email)}</a>
                  </div>
                  <div class="flex items-center justify-between py-2 border-b border-white/5">
                    <span class="text-[#858C87]">TELEPHONE</span>
                    <a href="tel:${escapeHtml(PERSONAL_INFO.phone.replace(/\s+/g, ''))}" class="text-[#F4F1EA]">${escapeHtml(PERSONAL_INFO.phone)}</a>
                  </div>
                  <div class="flex items-center justify-between py-2 border-b border-white/5">
                    <span class="text-[#858C87]">PROFESSIONAL NETWORK</span>
                    <a href="${escapeHtml(PERSONAL_INFO.linkedin)}" target="_blank" rel="noopener noreferrer" class="text-[#F4F1EA]">LINKEDIN</a>
                  </div>
                  <div class="flex items-center justify-between py-2 border-b border-white/5">
                    <span class="text-[#858C87]">SOURCE CODE</span>
                    <a href="${escapeHtml(PERSONAL_INFO.github)}" target="_blank" rel="noopener noreferrer" class="text-[#F4F1EA]">GITHUB</a>
                  </div>
                  <div class="flex items-center justify-between py-2">
                    <span class="text-[#858C87]">BASE OF OPERATIONS</span>
                    <span class="text-[#C2C5C0]">${escapeHtml(PERSONAL_INFO.location)}</span>
                  </div>
                </div>
              </div>
              <div class="lg:col-span-6 glass-panel p-8 sm:p-12">
                <h4 class="font-heading font-bold text-xl text-[#F4F1EA] tracking-tight mb-8">TRANSMIT INQUIRY</h4>
                <form action="https://api.web3forms.com/submit" method="POST" class="space-y-6">
                  <input type="hidden" name="access_key" value="1a3277bd-104c-4011-a66a-c1cd24f8dcc6" />
                  <input type="hidden" name="subject" value="New Portfolio Contact — Aryan" />
                  <div>
                    <label class="block font-mono text-[10px] text-[#858C87] uppercase tracking-wider mb-1">YOUR NAME</label>
                    <input type="text" name="name" required placeholder="Full name or organization" class="studio-input font-normal" />
                  </div>
                  <div>
                    <label class="block font-mono text-[10px] text-[#858C87] uppercase tracking-wider mb-1">RETURN ADDRESS (EMAIL)</label>
                    <input type="email" name="email" required placeholder="name@domain.com" class="studio-input font-normal" />
                  </div>
                  <div>
                    <label class="block font-mono text-[10px] text-[#858C87] uppercase tracking-wider mb-1">TRANSMISSION MESSAGE</label>
                    <textarea name="message" required rows="4" placeholder="Brief context on scope, challenge or timeline..." class="studio-input font-normal resize-none"></textarea>
                  </div>
                  <button type="submit" class="w-full py-4 bg-[#F4F1EA] text-[#111613] font-mono text-xs uppercase tracking-widest font-semibold">
                    DISPATCH TRANSMISSION
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <!-- Footer -->
      <footer class="relative bg-[#0B0F0D] border-t border-white/10 pt-16 pb-12 overflow-hidden">
        <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10 items-baseline">
            <div class="md:col-span-6 space-y-4">
              <div class="font-heading font-bold text-2xl text-[#F4F1EA] tracking-tight">${escapeHtml(HERO_DATA.name)}</div>
              <p class="text-[#858C87] text-sm max-w-sm font-normal leading-relaxed">
                Cybersecurity student exploring AI agents, automated workflow pipelines, and experimental web interfaces.
              </p>
            </div>
            <div class="md:col-span-3 space-y-3 font-mono text-xs">
              <div class="text-[#858C87] uppercase tracking-widest">NAVIGATION</div>
              <ul class="space-y-2 text-[#C2C5C0]">
                <li><a href="#about">01 ABOUT</a></li>
                <li><a href="#capabilities">02 CAPABILITIES</a></li>
                <li><a href="#projects">03 WORK</a></li>
                <li><a href="#stack">04 STACK</a></li>
                <li><a href="#contact">05 CONTACT</a></li>
              </ul>
            </div>
            <div class="md:col-span-3 space-y-3 font-mono text-xs">
              <div class="text-[#858C87] uppercase tracking-widest">COMMUNICATIONS</div>
              <ul class="space-y-2 text-[#C2C5C0]">
                <li><a href="mailto:${escapeHtml(PERSONAL_INFO.email)}">EMAIL TRANSMISSION</a></li>
                <li><a href="tel:${escapeHtml(PERSONAL_INFO.phone.replace(/\s+/g, ''))}">${escapeHtml(PERSONAL_INFO.phone)}</a></li>
                <li><a href="${escapeHtml(PERSONAL_INFO.linkedin)}" target="_blank" rel="noopener noreferrer">LINKEDIN NETWORK</a></li>
                <li><a href="${escapeHtml(PERSONAL_INFO.github)}" target="_blank" rel="noopener noreferrer">GITHUB ARCHIVE</a></li>
              </ul>
            </div>
          </div>
          <div class="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-[#858C87]">
            <p>© 2026 ARYAN. DESIGNED &amp; ENGINEERED AS AN EDITORIAL DIGITAL INSTALLATION.</p>
            <a href="#hero" class="text-[#FF0000]">TOP OF DOCUMENT</a>
          </div>
        </div>
      </footer>
    </div>
  `.trim();
}
