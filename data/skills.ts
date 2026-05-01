export type SkillCategory = 'Frontend' | 'Backend' | 'Database' | 'DevOps';

export interface Skill {
  name: string;
  category: SkillCategory;
  level: number;
  color: string;
}

export const skills: Skill[] = [
  { name: 'React', category: 'Frontend', level: 95, color: '#61DAFB' },
  { name: 'Next.js', category: 'Frontend', level: 92, color: '#ffffff' },
  { name: 'TypeScript', category: 'Frontend', level: 90, color: '#3178C6' },
  { name: 'JavaScript', category: 'Frontend', level: 93, color: '#F7DF1E' },
  { name: 'HTML/CSS', category: 'Frontend', level: 95, color: '#E34F26' },
  { name: 'Tailwind CSS', category: 'Frontend', level: 90, color: '#06B6D4' },
  { name: 'Node.js', category: 'Backend', level: 88, color: '#339933' },
  { name: 'Express.js', category: 'Backend', level: 87, color: '#ffffff' },
  { name: 'Python', category: 'Backend', level: 82, color: '#3776AB' },
  { name: 'REST APIs', category: 'Backend', level: 90, color: '#FF6C37' },
  { name: 'GraphQL', category: 'Backend', level: 80, color: '#E10098' },
  { name: 'PostgreSQL', category: 'Database', level: 85, color: '#336791' },
  { name: 'MongoDB', category: 'Database', level: 83, color: '#47A248' },
  { name: 'Redis', category: 'Database', level: 78, color: '#DC382D' },
  { name: 'Docker', category: 'DevOps', level: 82, color: '#2496ED' },
  { name: 'Git', category: 'DevOps', level: 90, color: '#F05032' },
  { name: 'AWS', category: 'DevOps', level: 75, color: '#FF9900' },
];
