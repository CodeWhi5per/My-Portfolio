'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experiences } from '@/data/experience';

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !timelineRef.current || !lineRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
        },
      });

      // Animate SVG line based on scroll
      const lineLength = lineRef.current!.getTotalLength();
      gsap.set(lineRef.current, {
        strokeDasharray: lineLength,
        strokeDashoffset: lineLength,
      });

      gsap.to(lineRef.current, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: true,
          id: 'timeline-line',
        },
      });

      // Animate each timeline node
      const nodes = timelineRef.current!.querySelectorAll('.timeline-node');
      nodes.forEach((node, index) => {
        const side = index % 2 === 0 ? -80 : 80;
        const dot = node.querySelector('.timeline-dot');
        const card = node.querySelector('.timeline-card');

        ScrollTrigger.create({
          trigger: node,
          start: 'top 80%',
          id: `timeline-node-${index}`,
          onEnter: () => {
            gsap.from(card, {
              x: side,
              opacity: 0,
              duration: 0.7,
              ease: 'power3.out',
            });

            gsap.from(dot, {
              scale: 0,
              duration: 0.4,
              ease: 'back.out(2)',
            });
          },
        });

        // 3D depth effect
        gsap.to(node, {
          scale: 1,
          opacity: 1,
          scrollTrigger: {
            trigger: node,
            start: 'top 70%',
            end: 'top 30%',
            scrub: true,
            id: `timeline-depth-${index}`,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-32" style={{ background: '#060810' }}>
      <div className="max-w-5xl mx-auto px-6">
        <h2 ref={titleRef} className="text-5xl font-bold text-white text-center mb-20">
          Work <span style={{ background: 'linear-gradient(135deg, #4fa8d8, #1a8a6e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Experience</span>
        </h2>

        <div ref={timelineRef} className="relative">
          {/* Center SVG Line */}
          <svg
            className="absolute left-1/2 transform -translate-x-1/2 top-0 h-full w-1"
            style={{ zIndex: 0 }}
          >
            <line
              ref={lineRef}
              x1="50%"
              y1="0"
              x2="50%"
              y2="100%"
              stroke="url(#lineGradient)"
              strokeWidth="2"
            />
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4fa8d8" />
                <stop offset="100%" stopColor="#1a8a6e" />
              </linearGradient>
            </defs>
          </svg>

          {/* Timeline Nodes */}
          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div
                key={exp.id}
                className="timeline-node relative mb-16 flex items-center"
                style={{ opacity: 0.5, transform: 'scale(0.9)' }}
              >
                {/* Dot */}
                <div
                  className="timeline-dot absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full z-10"
                  style={{
                    background: 'linear-gradient(135deg, #4fa8d8, #1a8a6e)',
                    boxShadow: '0 0 20px rgba(79, 168, 216, 0.5)',
                  }}
                />

                {/* Card */}
                <div
                  className={`timeline-card w-full md:w-[calc(50%-2rem)] ${
                    isLeft ? 'md:mr-auto md:pr-12 text-right' : 'md:ml-auto md:pl-12 text-left'
                  }`}
                >
                  <div
                    className="p-6 rounded-2xl"
                    style={{
                      background: 'rgba(10, 26, 42, 0.6)',
                      border: '1px solid rgba(79, 168, 216, 0.2)',
                    }}
                  >
                    <div className="mb-3">
                      <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
                      <div className="flex items-center gap-2 justify-between">
                        <span className="font-semibold" style={{ color: '#4fa8d8' }}>
                          {exp.company}
                        </span>
                        <span className="text-sm text-slate-500">{exp.period}</span>
                      </div>
                    </div>

                    <ul className="space-y-2 mb-4">
                      {exp.description.map((item, i) => (
                        <li key={i} className="text-slate-400 text-sm flex items-start gap-2">
                          <span className="text-cyan-400 mt-1">▹</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs rounded-full"
                          style={{
                            background: 'rgba(79, 168, 216, 0.1)',
                            color: '#4fa8d8',
                            border: '1px solid rgba(79, 168, 216, 0.3)',
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
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
