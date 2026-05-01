export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string[];
  tech: string[];
}

export const experiences: ExperienceItem[] = [
  {
    id: '1',
    company: 'TechCorp Solutions',
    role: 'Senior Full Stack Developer',
    period: '2022 — Present',
    description: [
      'Leading development of microservices platform serving 1M+ users',
      'Architected and implemented real-time data processing pipeline',
      'Mentored team of 5 junior developers and conducted code reviews',
      'Reduced API response time by 60% through optimization',
    ],
    tech: ['Next.js', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
  },
  {
    id: '2',
    company: 'InnovateLab',
    role: 'Full Stack Developer',
    period: '2020 — 2022',
    description: [
      'Built real-time collaboration platform with WebSocket integration',
      'Developed RESTful APIs handling 10K+ requests per minute',
      'Implemented CI/CD pipeline reducing deployment time by 80%',
      'Collaborated with cross-functional teams in Agile environment',
    ],
    tech: ['React', 'GraphQL', 'MongoDB', 'Redis', 'Kubernetes'],
  },
  {
    id: '3',
    company: 'WebStart Agency',
    role: 'Frontend Developer',
    period: '2019 — 2020',
    description: [
      'Created responsive web applications for 20+ clients',
      'Implemented modern UI/UX designs with high attention to detail',
      'Optimized application performance achieving 95+ Lighthouse scores',
      'Integrated third-party APIs and payment gateways',
    ],
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'REST APIs'],
  },
];
