export type ProjectCategory = 'Frontend' | 'Backend' | 'Full Stack';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  tech: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
}

export const projects: Project[] = [
  {
    id: 'ecom',
    title: 'E-Commerce Platform',
    description: 'Full-featured online shopping platform with Stripe payments, admin dashboard, and real-time inventory management.',
    category: 'Full Stack',
    tech: ['Next.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 'task',
    title: 'Task Management App',
    description: 'Kanban-style project management tool with drag-and-drop, real-time collaboration, and team analytics.',
    category: 'Full Stack',
    tech: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 'chat',
    title: 'Real-Time Chat Application',
    description: 'End-to-end encrypted messaging app with group chats, file sharing, and voice/video calls.',
    category: 'Full Stack',
    tech: ['React', 'WebSocket', 'Redis', 'Express'],
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&q=80',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 'blog',
    title: 'Blog CMS Platform',
    description: 'Modern content management system with markdown editor, SEO optimization, and analytics dashboard.',
    category: 'Full Stack',
    tech: ['Next.js', 'PostgreSQL', 'Prisma', 'MDX'],
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 'api',
    title: 'REST API Service',
    description: 'Scalable RESTful API with authentication, rate limiting, and comprehensive documentation.',
    category: 'Backend',
    tech: ['Node.js', 'Express', 'MongoDB', 'JWT'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 'devops',
    title: 'DevOps Dashboard',
    description: 'Centralized monitoring and deployment dashboard for microservices with CI/CD pipeline integration.',
    category: 'Full Stack',
    tech: ['React', 'Docker', 'Kubernetes', 'AWS'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    liveUrl: '#',
    githubUrl: '#',
  },
];
