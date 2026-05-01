'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiTailwindcss,
  SiGsap,
  SiFigma,
  SiGit,
  SiMongodb,
  SiPostgresql,
  SiDocker,
} from 'react-icons/si';
import { FiCloud } from 'react-icons/fi';

gsap.registerPlugin(Draggable, InertiaPlugin, ScrollTrigger);

const skills = [
  {
    icon: SiReact,
    name: 'React',
    color: '#61DAFB',
    description: 'Component architecture, Hooks, Context API',
    size: 'large',
  },
  {
    icon: SiNextdotjs,
    name: 'Next.js',
    color: '#000000',
    description: 'SSR, SSG, API Routes, App Router',
    size: 'large',
  },
  {
    icon: SiTypescript,
    name: 'TypeScript',
    color: '#3178C6',
    description: 'Type safety, Generics, Advanced patterns',
    size: 'medium',
  },
  {
    icon: SiNodedotjs,
    name: 'Node.js',
    color: '#339933',
    description: 'Express, REST APIs, GraphQL',
    size: 'medium',
  },
  {
    icon: SiTailwindcss,
    name: 'Tailwind',
    color: '#06B6D4',
    description: 'Utility-first, Custom configurations',
    size: 'small',
  },
  {
    icon: SiGsap,
    name: 'GSAP',
    color: '#88CE02',
    description: 'Advanced animations, ScrollTrigger',
    size: 'medium',
  },
  {
    icon: SiFigma,
    name: 'Figma',
    color: '#F24E1E',
    description: 'UI/UX Design, Prototyping',
    size: 'small',
  },
  {
    icon: SiGit,
    name: 'Git',
    color: '#F05032',
    description: 'Version control, Collaboration',
    size: 'small',
  },
  {
    icon: SiMongodb,
    name: 'MongoDB',
    color: '#47A248',
    description: 'NoSQL, Aggregation, Indexing',
    size: 'medium',
  },
  {
    icon: SiPostgresql,
    name: 'PostgreSQL',
    color: '#4169E1',
    description: 'Relational DB, Complex queries',
    size: 'small',
  },
  {
    icon: SiDocker,
    name: 'Docker',
    color: '#2496ED',
    description: 'Containerization, Deployment',
    size: 'small',
  },
  {
    icon: FiCloud,
    name: 'AWS',
    color: '#FF9900',
    description: 'Cloud services, S3, Lambda',
    size: 'medium',
  },
];

export default function InteractiveSkills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !gridRef.current) return;

    const ctx = gsap.context(() => {
      const skillCards = gridRef.current!.querySelectorAll('.skill-card');

      // Animate cards on scroll
      gsap.fromTo(
        skillCards,
        {
          y: 100,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: {
            amount: 0.6,
            from: 'random',
          },
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          },
        }
      );

      // Make each skill draggable with physics
      skillCards.forEach((card) => {
        const iconElement = card.querySelector('.skill-icon') as HTMLElement;

        if (!iconElement) return;

        Draggable.create(iconElement, {
          type: 'x,y',
          bounds: card,
          inertia: true,
          edgeResistance: 0.85,
          throwProps: true,
          onDrag: function () {
            gsap.to(iconElement, {
              rotation: this.deltaX * 0.5,
              duration: 0.3,
            });
          },
          onThrowComplete: function () {
            gsap.to(iconElement, {
              rotation: 0,
              duration: 0.5,
              ease: 'elastic.out(1, 0.3)',
            });
          },
        });

        // Float animation
        gsap.to(iconElement, {
          y: '+=20',
          duration: 2 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: Math.random() * 2,
        });
      });

      // Hover expand effect
      skillCards.forEach((card) => {
        const cardElement = card as HTMLElement;
        const details = card.querySelector('.skill-details') as HTMLElement;

        cardElement.addEventListener('mouseenter', () => {
          gsap.to(details, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
          });
          gsap.to(cardElement, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out',
          });
        });

        cardElement.addEventListener('mouseleave', () => {
          gsap.to(details, {
            opacity: 0,
            y: 10,
            duration: 0.3,
            ease: 'power2.in',
          });
          gsap.to(cardElement, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.in',
          });
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const getSizeClass = (size: string) => {
    switch (size) {
      case 'large':
        return 'col-span-2 row-span-2 h-80';
      case 'medium':
        return 'col-span-1 row-span-2 h-80';
      case 'small':
        return 'col-span-1 row-span-1 h-36';
      default:
        return 'col-span-1 row-span-1 h-36';
    }
  };

  return (
    <section
      id="skills"
      ref={containerRef}
      className="min-h-screen w-full py-32 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-background to-primary/5"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-6xl md:text-7xl font-black mb-4">
          <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
            INTERACTIVE LAB
          </span>
        </h2>
        <p className="text-xl text-muted-foreground mb-16">
          Grab and throw the icons to see them bounce with physics
        </p>

        <div
          ref={gridRef}
          className="grid grid-cols-4 auto-rows-auto gap-4"
        >
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div
                key={index}
                className={`skill-card ${getSizeClass(
                  skill.size
                )} relative overflow-hidden rounded-3xl bg-card border-2 border-primary/20 backdrop-blur-sm cursor-grab active:cursor-grabbing`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />

                <div className="relative w-full h-full flex flex-col items-center justify-center p-6">
                  <div className="skill-icon relative z-10 cursor-move">
                    <Icon
                      className="w-16 h-16 md:w-20 md:h-20"
                      style={{ color: skill.color }}
                    />
                  </div>

                  <h3 className="text-xl font-bold mt-4 text-center">
                    {skill.name}
                  </h3>

                  <div className="skill-details absolute bottom-4 left-4 right-4 opacity-0 translate-y-2">
                    <p className="text-sm text-muted-foreground text-center">
                      {skill.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

