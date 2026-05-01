'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { Flip } from 'gsap/Flip';
import { motion } from 'framer-motion';
import { projects, ProjectCategory } from '@/data/projects';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import Image from 'next/image';

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<'All' | ProjectCategory>('All');

  const filters: ('All' | ProjectCategory)[] = ['All', 'Frontend', 'Backend', 'Full Stack'];

  const filteredProjects =
    activeFilter === 'All' ? projects : projects.filter((p) => p.category === activeFilter);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !gridRef.current) return;

    const ctx = gsap.context(() => {
      // Entrance animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          id: 'projects-entrance',
        },
      });

      tl.from(titleRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      })
        .from(
          filterRef.current!.children,
          {
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.5,
            ease: 'power3.out',
          },
          '-=0.3'
        )
        .from(
          gridRef.current!.children,
          {
            y: 80,
            opacity: 0,
            stagger: 0.12,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.3'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleFilterChange = (filter: 'All' | ProjectCategory) => {
    if (!gridRef.current) return;

    const state = Flip.getState(gridRef.current.children);
    setActiveFilter(filter);

    requestAnimationFrame(() => {
      if (gridRef.current) {
        Flip.from(state, {
          duration: 0.5,
          ease: 'power1.inOut',
          stagger: 0.05,
          absolute: true,
        });
      }
    });
  };

  return (
    <section id="projects" ref={sectionRef} className="py-32" style={{ background: '#07091a' }}>
      <div className="max-w-7xl mx-auto px-6">
        <h2 ref={titleRef} className="text-5xl font-bold text-white text-center mb-12">
          Featured <span style={{ background: 'linear-gradient(135deg, #4fa8d8, #1a8a6e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Projects</span>
        </h2>

        {/* Filter Tabs */}
        <div ref={filterRef} className="flex justify-center gap-4 mb-12 flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                activeFilter === filter
                  ? 'text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
              style={
                activeFilter === filter
                  ? { background: 'linear-gradient(135deg, #4fa8d8, #1a8a6e)' }
                  : { background: 'rgba(255, 255, 255, 0.05)' }
              }
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !shineRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      transformPerspective: 800,
      duration: 0.4,
      ease: 'power2.out',
    });

    gsap.to(shineRef.current, {
      x: x - rect.width / 2,
      y: y - rect.height / 2,
      opacity: 0.3,
      duration: 0.3,
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || !shineRef.current) return;

    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
    });

    gsap.to(shineRef.current, {
      opacity: 0,
      duration: 0.3,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(10, 15, 30, 0.8)',
        border: '1px solid rgba(79, 168, 216, 0.1)',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Shine effect */}
      <div
        ref={shineRef}
        className="absolute inset-0 pointer-events-none opacity-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(79, 168, 216, 0.3) 0%, transparent 70%)',
        }}
      />

      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          style={{ transform: 'translateZ(20px)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-white">{project.title}</h3>
          <span
            className="px-2 py-1 text-xs rounded-full"
            style={{
              background: 'rgba(79, 168, 216, 0.1)',
              color: '#4fa8d8',
              border: '1px solid rgba(79, 168, 216, 0.3)',
            }}
          >
            {project.category}
          </span>
        </div>

        <p className="text-slate-400 text-sm mb-4">{project.description}</p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs rounded-md text-slate-300"
              style={{ background: 'rgba(255, 255, 255, 0.05)' }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3">
          <motion.a
            href={project.liveUrl}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white flex-1 justify-center"
            style={{ background: 'linear-gradient(135deg, #4fa8d8, #1a8a6e)' }}
          >
            <FiExternalLink />
            Live Demo
          </motion.a>
          <motion.a
            href={project.githubUrl}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-slate-300"
            style={{ border: '1px solid rgba(255, 255, 255, 0.1)' }}
          >
            <FiGithub />
            Code
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

