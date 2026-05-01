'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { skills } from '@/data/skills';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiGit,
  SiGraphql,
} from 'react-icons/si';
import { FiCloud } from 'react-icons/fi';
import ClientOnly from "../ui/ClientOnly";

const ThreeCanvas = dynamic(() => import('@react-three/fiber').then((mod) => ({ default: mod.Canvas })), { ssr: false });
const OrbitControls = dynamic(() => import('@react-three/drei').then((mod) => ({ default: mod.OrbitControls })), { ssr: false });
const TechGlobe = dynamic(() => import('@/components/three/TechGlobe'), { ssr: false });

const iconMap: Record<string, any> = {
  React: SiReact,
  'Next.js': SiNextdotjs,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  'HTML/CSS': SiHtml5,
  'Tailwind CSS': SiTailwindcss,
  'Node.js': SiNodedotjs,
  'Express.js': SiExpress,
  Python: SiPython,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  Redis: SiRedis,
  Docker: SiDocker,
  Git: SiGit,
  AWS: FiCloud,
  GraphQL: SiGraphql,
  'REST APIs': SiReact,
};

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !globeRef.current || !pillsRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          id: 'skills-entrance',
        },
      });

      // Split text title animation
      const titleText = titleRef.current!.innerText;
      titleRef.current!.innerHTML = titleText
        .split('')
        .map((char) => `<span style="display:inline-block;">${char === ' ' ? '&nbsp;' : char}</span>`)
        .join('');

      tl.from(titleRef.current!.children, {
        y: 80,
        opacity: 0,
        stagger: 0.04,
        ease: 'power4.out',
        duration: 0.6,
      })
        .from(
          globeRef.current,
          {
            scale: 0,
            opacity: 0,
            duration: 1,
            ease: 'back.out(1.2)',
          },
          '-=0.3'
        )
        .from(
          pillsRef.current!.children,
          {
            y: 30,
            opacity: 0,
            stagger: 0.05,
            ease: 'power3.out',
            duration: 0.5,
          },
          '-=0.5'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const categories = Array.from(new Set(skills.map((s) => s.category)));

  return (
    <section id="skills" ref={sectionRef} className="py-32" style={{ background: '#060810' }}>
      <div className="max-w-7xl mx-auto px-6">
        <h2 ref={titleRef} className="text-5xl font-bold text-white text-center mb-16">
          My Skills
        </h2>

        {/* 3D Globe */}
        <div ref={globeRef} className="h-[500px] mb-16">
          <ClientOnly>
            <ThreeCanvas camera={{ position: [0, 0, 10], fov: 50 }}>
              <TechGlobe />
              <OrbitControls enableZoom={false} enablePan={false} />
            </ThreeCanvas>
          </ClientOnly>
        </div>

        {/* Skill Pills by Category */}
        <div ref={pillsRef} className="space-y-8">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="text-xl font-semibold text-slate-400 mb-4">{category}</h3>
              <div className="flex flex-wrap gap-3">
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill) => {
                    const Icon = iconMap[skill.name] || SiReact;
                    return (
                      <motion.div
                        key={skill.name}
                        whileHover={{ scale: 1.1 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all"
                        style={{
                          background: 'rgba(10, 26, 42, 0.6)',
                          border: `1px solid ${skill.color}40`,
                          color: skill.color,
                          boxShadow: `0 0 20px ${skill.color}20`,
                        }}
                      >
                        <Icon className="text-lg" />
                        {skill.name}
                      </motion.div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
