import { Project, TechItem, Capability, ContactInfo } from '../types';

export const SITE_CONFIG = {
  domain:
    (typeof globalThis !== 'undefined' && (globalThis as any).process?.env?.VITE_SITE_URL) ||
    'https://buildwitharyan.vercel.app',
  name: 'Aryan Portfolio',
  brandTitle: 'HE KNOWS SOMETHING',
  brandTagline: '// DIGITAL PRACTICE',
};

export const PERSONAL_INFO: ContactInfo = {
  email: 'aryankashyap9888@gmail.com',
  phone: '+91 9888323328',
  linkedin: 'https://www.linkedin.com/in/aryan-59a554318/',
  github: 'https://github.com/ARYAN24SCSE',
  location: 'Punjab / New Delhi / Remote',
  availability: 'Available for AI Systems, Automation & Engineering Roles',
};

export const HERO_DATA = {
  name: 'ARYAN',
  tagline: 'CYBERSECURITY × AI × AUTOMATION',
  headline: 'Cybersecurity student building AI agents, automation pipelines, and experimental web interfaces.',
  subheadline: 'I tend to build things when I am curious about how they actually behave under the hood.',
  badges: [
    'AI Agents',
    'Workflow Automation',
    'Conversational Systems',
    'Cybersecurity',
    'Interactive Frontend'
  ]
};

export const ABOUT_DATA = {
  title: 'ABOUT ME',
  paragraphs: [
    "I'm a cybersecurity student using security as my core technical foundation, while spending my time figuring out how AI agents, automated workflows, and the web can connect together.",
    "I learn by building rather than only studying concepts. I tend to build things when I'm curious about how they actually behave under the hood — whether that's testing how far an AI system can go with dynamic tool calls, or writing frontends that feel responsive and alive."
  ]
};

export const WHAT_I_BUILD: Capability[] = [
  {
    id: 'ai-agents',
    title: 'AI AGENTS',
    subtitle: 'Autonomous Systems & Tool Calling',
    description: 'I like testing how far an AI system can go with dynamic tool calling and multi-step reasoning before a human needs to step in.',
    keyFeatures: ['Multi-turn context retention', 'Dynamic tool calling', 'Structured JSON outputs'],
    techStack: ['Python', 'OpenAI API', 'LangChain', 'Claude', 'REST APIs'],
    icon: 'Bot'
  },
  {
    id: 'ai-automation',
    title: 'AI AUTOMATION',
    subtitle: 'Event-Driven Workflow Pipelines',
    description: 'I enjoy taking repetitive, messy processes and figuring out where software and event triggers can remove the boring parts.',
    keyFeatures: ['API & webhook integration', 'Error handling & fallbacks', 'Automated data transformation'],
    techStack: ['n8n', 'Make.com', 'Zapier', 'Webhooks', 'Meta Cloud API'],
    icon: 'Workflow'
  },
  {
    id: 'cybersecurity',
    title: 'CYBERSECURITY',
    subtitle: 'Defensive Systems & Architecture',
    description: 'My long-term academic foundation. I like taking things apart, understanding attack surfaces, and figuring out how systems actually behave under pressure.',
    keyFeatures: ['Application security concepts', 'Network traffic analysis', 'Vulnerability assessment'],
    techStack: ['Linux', 'Wireshark', 'OWASP Top 10', 'Nmap', 'Network Security'],
    icon: 'Shield'
  },
  {
    id: 'interactive-web',
    title: 'INTERACTIVE WEB',
    subtitle: 'Modern Immersive Frontend',
    description: 'I tend to build interfaces when I want to experiment with tactile depth, 3D math, and responsive scroll choreography in React.',
    keyFeatures: ['Spatial 3D depth with R3F', 'GSAP ScrollTrigger sequencing', 'Responsive fluid layouts'],
    techStack: ['React', 'TypeScript', 'Three.js / R3F', 'GSAP', 'Tailwind CSS'],
    icon: 'Layout'
  },
  {
    id: 'performance-engineering',
    title: 'PERFORMANCE ENGINEERING',
    subtitle: 'Optimized Systems & Architecture',
    description: 'I am curious about how fast and lightweight a rich web experience can feel, keeping payloads small and main threads quiet.',
    keyFeatures: ['60 FPS RAF ticker loops', 'Sub-200KB bundle discipline', 'Zero layout shift'],
    techStack: ['Lenis', 'Vite', 'Code Splitting', 'Web Workers', 'GPU Acceleration'],
    icon: 'Zap'
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'social-media-content-automation',
    title: 'AI-Powered Social Media Content Creation & Automation Platform',
    tagline: 'End-to-end pipeline combining article scraping, LLM distillation, video synthesis, and multi-platform distribution.',
    category: 'Content Automation & Systems',
    question: 'How do you engineer a fully automated pipeline that reliably turns web articles into short-form video assets and scheduled multi-platform posts?',
    summary: 'End-to-end automated content pipeline that scrapes articles, uses LLMs for translation and summarization, generates short-form video content, tracks publishing state, and automates distribution across multiple social platforms. Includes scheduling, queue management, rate limiting, and database-backed posting tracking.',
    problem: 'Manual content production across multiple channels requires fragmented tools, manual translation, manual video editing, and error-prone distribution schedules.',
    solution: 'Engineered an automated content engine leveraging Python, LLM reasoning for translation and summarization, MoviePy for automated short-form video synthesis, and database-backed queuing for rate-limited social distribution.',
    architecture: [
      'Automated web scrapers extracting raw source articles and metadata',
      'LLM reasoning pipeline for multilingual translation, synthesis, and script structuring',
      'MoviePy dynamic video compilation pipeline rendering short-form video assets',
      'Database-backed posting tracking with queue management and API rate limiting',
      'Multi-channel dispatching handlers across social media endpoints'
    ],
    techStack: [
      'Python',
      'LLM Automation',
      'Web Scraping',
      'Content Automation',
      'Social Media Automation',
      'MoviePy'
    ],
    githubUrl: 'https://github.com/ARYAN24SCSE/SocialMediaContentCreationAndPostingAutomationPlatform',
    status: 'Engineered',
    featured: true,
    metrics: [
      { label: 'Pipeline Stage', value: 'End-to-End' },
      { label: 'Video Engine', value: 'MoviePy' },
      { label: 'State Tracking', value: 'DB-Backed' }
    ]
  },
  {
    id: 'n8n-social-media-automations',
    title: 'n8n Social Media Automation Workflows',
    tagline: 'Orchestrated n8n workflows for automated social-media publishing and digital-marketing operations.',
    category: 'Workflow Engineering',
    question: 'How can complex multi-platform marketing operations and approval chains be orchestrated with zero-code and low-code reliability?',
    summary: 'Collection of n8n automation workflows for social-media publishing and digital-marketing operations, including Facebook and Instagram posting, human approval flows, webhook triggers, image-generation workflows, engagement automation, and post-data management.',
    problem: 'Cross-platform marketing execution often suffers from disconnected APIs, missing approval gates, and fragile manual handoffs.',
    solution: 'Architected robust n8n workflow blueprints integrating Meta Graph APIs, conditional human approval triggers, automated visual asset pipelines, and structured post-data persistence.',
    architecture: [
      'Event-driven webhook triggers capturing inbound marketing requests and schedule events',
      'Facebook Graph API & Instagram Graph API node integrations for automated media dispatch',
      'Human-in-the-loop approval gates before publishing payload execution',
      'Automated image generation pipelines paired with copywriting logic',
      'Post-data logging and engagement tracking pipelines'
    ],
    techStack: [
      'n8n',
      'Workflow Automation',
      'Facebook Graph API',
      'Instagram Graph API',
      'Webhooks',
      'Social Media Automation'
    ],
    githubUrl: 'https://github.com/ARYAN24SCSE/n8n-automations',
    status: 'Implemented',
    featured: true,
    metrics: [
      { label: 'Workflow Engine', value: 'n8n' },
      { label: 'Meta APIs', value: 'FB & IG Graph' },
      { label: 'Control Flow', value: 'Human Approval' }
    ]
  }
];

export const TECH_CATEGORIES = [
  {
    name: 'FRONTEND',
    technologies: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React'],
    level: 'BUILDING WITH'
  },
  {
    name: 'MOTION / INTERACTION',
    technologies: ['Motion.dev', 'GSAP', 'ScrollTrigger', 'Lenis', 'Swiper', 'Anime.js', 'Locomotive.js'],
    level: 'BUILDING WITH'
  },
  {
    name: 'AI / AGENTS',
    technologies: ['AI tools', 'LLMs', 'AI agents', 'Tool calling', 'Structured outputs', 'Agentic workflows'],
    level: 'BUILDING WITH'
  },
  {
    name: 'AUTOMATION',
    technologies: ['n8n', 'APIs', 'Webhooks', 'Workflow automation', 'WhatsApp automation'],
    level: 'BUILDING WITH'
  },
  {
    name: 'CYBERSECURITY',
    technologies: ['Cybersecurity fundamentals', 'Networking', 'Security concepts', 'Security projects'],
    level: 'EXPLORING'
  }
];

export const MARQUEE_ITEMS = [
  'CYBERSECURITY',
  'AI AGENTS',
  'AI AUTOMATION',
  'WORKFLOW SYSTEMS',
  'N8N',
  'CHATBOTS',
  'WHATSAPP',
  'REACT',
  'GSAP',
  'THREE.JS',
  'PERFORMANCE'
];
