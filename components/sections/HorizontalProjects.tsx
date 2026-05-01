'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { ExternalLink, Github, X, ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/projects';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imagePreviewRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const quickX = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const quickY = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !imagePreviewRef.current) return;

    // Setup quickTo for floating image
    quickX.current = gsap.quickTo(imagePreviewRef.current, 'x', { duration: 0.4, ease: 'power3' });
    quickY.current = gsap.quickTo(imagePreviewRef.current, 'y', { duration: 0.4, ease: 'power3' });

    const ctx = gsap.context(() => {
      // Heading entrance
      if (headingRef.current) {
        gsap.from(headingRef.current.querySelectorAll('.anim-word'), {
          y: 100,
          opacity: 0,
          rotateX: 40,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
          },
        });
      }

      // Row entrances
      rowsRef.current.forEach((row, i) => {
        if (!row) return;
        gsap.from(row, {
          y: 60,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 88%',
          },
          delay: i * 0.05,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Modal open effect
  useEffect(() => {
    if (selectedProject !== null && modalRef.current) {
      modalRef.current.classList.remove('hidden');
      gsap.fromTo(modalRef.current, { opacity: 0 }, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
      gsap.fromTo(modalRef.current.querySelector('.modal-content'), {
        y: 60,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.15,
      });
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedProject]);

  const closeModal = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          setSelectedProject(null);
          modalRef.current?.classList.add('hidden');
        },
      });
    }
  };

  const handleRowEnter = (index: number) => {
    setHoveredProject(index);
    if (imagePreviewRef.current) {
      gsap.to(imagePreviewRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: 'power3.out',
      });
    }
  };

  const handleRowLeave = () => {
    setHoveredProject(null);
    if (imagePreviewRef.current) {
      gsap.to(imagePreviewRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        ease: 'power2.in',
      });
    }
  };

  const handleRowMove = (e: React.MouseEvent) => {
    if (quickX.current && quickY.current) {
      quickX.current(e.clientX - 200);
      quickY.current(e.clientY - 150);
    }
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="projects"
        className="relative min-h-screen w-full py-32 px-6 md:px-12 lg:px-24"
        style={{ background: '#060810' }}
      >
        {/* Heading */}
        <div ref={headingRef} className="max-w-7xl mx-auto mb-20" style={{ perspective: '600px' }}>
          <p className="anim-word text-sm tracking-[0.4em] uppercase mb-4" style={{ color: '#4fa8d8' }}>
            Selected Work
          </p>
          <h2 className="overflow-hidden">
            <span className="anim-word inline-block text-5xl md:text-7xl lg:text-8xl font-black text-white">
              Projects
            </span>
          </h2>
        </div>

        {/* Project Rows */}
        <div className="max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => { rowsRef.current[index] = el; }}
              className="group relative border-t border-white/10 cursor-pointer"
              onMouseEnter={() => handleRowEnter(index)}
              onMouseLeave={handleRowLeave}
              onMouseMove={handleRowMove}
              onClick={() => setSelectedProject(index)}
            >
              <div className="flex items-center justify-between py-8 md:py-10 transition-all duration-500 group-hover:pl-4">
                {/* Left: Number + Title */}
                <div className="flex items-center gap-6 md:gap-10">
                  <span
                    className="text-3xl md:text-5xl font-black tabular-nums transition-colors duration-300"
                    style={{
                      fontVariantNumeric: 'tabular-nums',
                      color: 'rgba(255,255,255,0.15)',
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white transition-all duration-500 group-hover:translate-x-2">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-2">
                      <span
                        className="text-xs tracking-[0.2em] uppercase"
                        style={{ color: '#4fa8d8' }}
                      >
                        {project.category}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <div className="flex gap-2">
                        {project.tech.slice(0, 3).map((t) => (
                          <span key={t} className="text-xs text-white/40">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Arrow */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center opacity-0 -translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0"
                    style={{ border: '1px solid rgba(79, 168, 216, 0.3)' }}
                  >
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Hover highlight line */}
              <div
                className="absolute bottom-0 left-0 h-px w-0 transition-all duration-700 group-hover:w-full"
                style={{ background: 'linear-gradient(90deg, #4fa8d8, #1a8a6e)' }}
              />
            </div>
          ))}
          {/* Bottom border */}
          <div className="border-t border-white/10" />
        </div>

        {/* Floating Image Preview */}
        <div
          ref={imagePreviewRef}
          className="fixed top-0 left-0 w-[400px] h-[300px] rounded-xl overflow-hidden pointer-events-none z-50 opacity-0"
          style={{ transform: 'scale(0.9)' }}
        >
          {hoveredProject !== null && (
            <>
              <Image
                src={projects[hoveredProject].image}
                alt={projects[hoveredProject].title}
                fill
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(135deg, rgba(79,168,216,0.15), rgba(26,138,110,0.15))' }}
              />
            </>
          )}
        </div>
      </section>

      {/* Detail Modal */}
      {selectedProject !== null && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-[100] hidden"
          style={{ background: 'rgba(6, 8, 16, 0.97)', backdropFilter: 'blur(20px)' }}
        >
          <button
            onClick={closeModal}
            className="absolute top-8 right-8 w-12 h-12 rounded-full flex items-center justify-center z-10 transition-colors hover:bg-white/10"
            style={{ border: '1px solid rgba(255,255,255,0.15)' }}
            data-magnetic
          >
            <X className="w-5 h-5 text-white" />
          </button>

          <div className="modal-content w-full h-full overflow-y-auto p-8 md:p-12 pt-24">
            <div className="max-w-6xl mx-auto">
              {/* Project Number */}
              <span
                className="text-8xl md:text-9xl font-black block mb-4"
                style={{
                  background: 'linear-gradient(135deg, rgba(79,168,216,0.2), rgba(26,138,110,0.1))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {String(selectedProject + 1).padStart(2, '0')}
              </span>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
                {/* Image */}
                <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
                  <Image
                    src={projects[selectedProject].image}
                    alt={projects[selectedProject].title}
                    fill
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(6,8,16,0.8))' }}
                  />
                </div>

                {/* Details */}
                <div className="space-y-6">
                  <span
                    className="text-xs tracking-[0.3em] uppercase"
                    style={{ color: '#4fa8d8' }}
                  >
                    {projects[selectedProject].category}
                  </span>

                  <h2 className="text-4xl md:text-5xl font-black text-white">
                    {projects[selectedProject].title}
                  </h2>

                  <p className="text-lg text-white/60 leading-relaxed">
                    {projects[selectedProject].description}
                  </p>

                  <div>
                    <h3 className="text-xs font-bold tracking-[0.3em] mb-4 text-white/40 uppercase">
                      Technologies
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {projects[selectedProject].tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-5 py-2.5 rounded-full text-sm font-medium text-white"
                          style={{ border: '1px solid rgba(79, 168, 216, 0.25)', background: 'rgba(79,168,216,0.05)' }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-8">
                    <a
                      href={projects[selectedProject].liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white transition-transform hover:scale-105"
                      style={{ background: 'linear-gradient(135deg, #4fa8d8, #1a8a6e)' }}
                      data-magnetic
                    >
                      <ExternalLink className="w-5 h-5" />
                      Live Demo
                    </a>
                    <a
                      href={projects[selectedProject].githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white/80 transition-colors hover:bg-white/5"
                      style={{ border: '1px solid rgba(255,255,255,0.15)' }}
                      data-magnetic
                    >
                      <Github className="w-5 h-5" />
                      Source Code
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

