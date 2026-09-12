export type DeviceTier = 'high' | 'medium' | 'low' | 'mobile';

export type TechCategory = 
  | 'Cybersecurity & Defense'
  | 'AI & Agentic Systems'
  | 'Automation & Workflows'
  | 'Frontend & Performance Engineering';

export type TechLevel = 'BUILDING WITH' | 'COMFORTABLE WITH' | 'EXPLORING';

export interface TechItem {
  name: string;
  category: TechCategory;
  level: TechLevel;
  iconName: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  summary: string;
  question?: string;
  problem: string;
  solution: string;
  architecture: string[];
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  status: 'Deployed' | 'Production Ready' | 'Active Development' | 'Experimental Architecture';
  featured: boolean;
  metrics: { label: string; value: string }[];
}

export interface Capability {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  keyFeatures: string[];
  techStack: string[];
  icon: string;
}

export interface WorkflowNode {
  id: string;
  title: string;
  subtitle: string;
  type: 'trigger' | 'processor' | 'ai' | 'action' | 'security';
  status: 'active' | 'standby' | 'processing';
  details: string;
}

export interface PerformanceBudgetMetric {
  metric: string;
  budget: string;
  achieved: string;
  unit: string;
  status: 'OPTIMAL' | 'PASS' | 'BENCHMARK';
  notes: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  location: string;
  availability: string;
}
