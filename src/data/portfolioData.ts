import { Project, TechItem, Capability, ContactInfo } from '../types';

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
    id: 'whatsapp-lead-pipeline',
    title: 'WhatsApp Lead Automation Pipeline',
    tagline: 'Event-driven Meta WhatsApp Cloud API workflow for automated qualification and follow-up.',
    category: 'AI & Automation',
    question: 'Could an incoming conversation be turned into a qualified lead without someone manually moving information between tools?',
    summary: 'AI-powered lead automation workflow connecting incoming data, AI processing, automated response generation and downstream actions through an event-driven pipeline.',
    problem: 'Manual lead response times cause high churn and lost opportunities during peak traffic.',
    solution: 'Engineered an automated WhatsApp chatbot pipeline using Meta Cloud API, n8n webhooks, and AI text synthesis.',
    architecture: [
      'Meta WhatsApp Business Cloud API webhook listeners',
      'n8n event-driven pipeline for lead qualification and status routing',
      'Automated follow-up dispatch with CRM synchronization'
    ],
    techStack: ['React', 'n8n', 'WhatsApp API', 'AI', 'Automation', 'Webhooks'],
    githubUrl: 'https://github.com/ARYAN24SCSE',
    status: 'Production Ready',
    featured: true,
    metrics: [
      { label: 'Response', value: '<2.1s' },
      { label: 'Conversion', value: '+42%' },
      { label: 'Availability', value: '24/7' }
    ]
  },
  {
    id: 'ai-content-pipeline',
    title: 'Autonomous AI Content Engine',
    tagline: 'Multi-channel system transforming technical inputs into structured publications and communications.',
    category: 'AI Systems',
    question: 'How much of a repetitive multi-channel publishing workflow can be automated reliably using structured LLM schemas?',
    summary: 'Centralized AI content pipeline that converts brief prompts into multi-platform technical assets, digital copy variations, and scheduled communication workflows.',
    problem: 'Manual content production across multiple channels is repetitive, time-consuming, and inconsistent.',
    solution: 'Built an orchestrated multi-LLM engine using Claude and OpenAI APIs with structured JSON output formatting.',
    architecture: [
      'Multi-model LLM orchestration with prompt guardrails',
      'Automated format transformers for markdown, emails, and social feeds',
      'Continuous webhook triggers connecting output channels'
    ],
    techStack: ['React', 'Python', 'Claude API', 'OpenAI', 'Zapier', 'Tailwind'],
    githubUrl: 'https://github.com/ARYAN24SCSE',
    status: 'Deployed',
    featured: true,
    metrics: [
      { label: 'Turnaround', value: '10x Fast' },
      { label: 'Accuracy', value: '98.5%' },
      { label: 'Channels', value: '5 Feeds' }
    ]
  },
  {
    id: 'conversational-voice-agent',
    title: 'Conversational Voice Outreach System',
    tagline: 'Low-latency conversational voice bot handling automated inquiries and status checks.',
    category: 'Conversational AI',
    question: 'How natural can a voice agent feel in real time while still remaining predictable and accurate under the hood?',
    summary: 'Interactive voice calling system connecting speech recognition, intent classification, and real-time CRM updates for automated outreach pipelines.',
    problem: 'High-volume routine customer calls overwhelm support teams and introduce record-keeping errors.',
    solution: 'Designed an automated calling bot pipeline with natural voice synthesis, speech intent parsing, and instant CRM logging.',
    architecture: [
      'Streaming speech-to-text with sub-600ms latency',
      'Intent classification engine with fallback routing',
      'Real-time webhook synchronization with SQLite/Redis backends'
    ],
    techStack: ['Python', 'FastAPI', 'Voice AI', 'WebSockets', 'n8n', 'SQLite'],
    githubUrl: 'https://github.com/ARYAN24SCSE',
    liveUrl: 'https://aryan.dev',
    status: 'Production Ready',
    featured: true,
    metrics: [
      { label: 'Latency', value: '<600ms' },
      { label: 'Intent Accuracy', value: '95.2%' },
      { label: 'Execution', value: 'Automated' }
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
