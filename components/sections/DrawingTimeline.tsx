'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { experiences } from '@/data/experience';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function DrawingTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !svgRef.current) return;

    const ctx = gsap.context(() => {
      const timeline = svgRef.current!.querySelector('.timeline-path') as SVGPathElement;
      const nodes = containerRef.current!.querySelectorAll('.timeline-node');

      if (!timeline) return;

      // Get total path length
      const pathLength = timeline.getTotalLength();

      // Initially hide the path
      gsap.set(timeline, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      // Draw the path on scroll
      gsap.to(timeline, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
      });

      // Animate nodes when line reaches them
      nodes.forEach((node) => {
        const content = node.querySelector('.node-content');

        gsap.fromTo(
          content,
          {
            scale: 0,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: node,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Glow effect when activated
        ScrollTrigger.create({
          trigger: node,
          start: 'top 60%',
          onEnter: () => {
            gsap.to(node.querySelector('.node-glow'), {
              scale: 1.5,
              opacity: 0,
              duration: 1,
              ease: 'power2.out',
              repeat: 2,
            });
          },
        });
      });

      // Rocket following the path
      if (rocketRef.current) {
        gsap.to(rocketRef.current, {
          motionPath: {
            path: timeline,
            align: timeline,
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
          },
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative min-h-screen w-full py-32 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-background to-primary/5"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-6xl md:text-7xl font-black mb-4 text-center">
          <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
            EXPERIENCE
          </span>
        </h2>
        <p className="text-xl text-muted-foreground mb-24 text-center">
          My professional journey through the years
        </p>

        <div className="relative">
          {/* SVG Timeline */}
          <svg
            ref={svgRef}
            className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-full pointer-events-none"
            style={{ zIndex: 0 }}
          >
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="1" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <path
              className="timeline-path"
              d={`M ${window.innerWidth / 2} 0 L ${window.innerWidth / 2} ${
                experiences.length * 500
              }`}
              stroke="url(#gradient)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          {/* Rocket Indicator */}
          <div
            ref={rocketRef}
            className="absolute w-12 h-12 pointer-events-none"
            style={{ zIndex: 10 }}
          >
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-75" />
              <div className="absolute inset-0 bg-primary rounded-full flex items-center justify-center text-2xl">
                🚀
              </div>
            </div>
          </div>

          {/* Timeline Nodes */}
          <div className="relative space-y-32">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`timeline-node relative flex items-center gap-8 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div
                  className={`node-content flex-1 ${
                    index % 2 === 0 ? 'text-right pr-16' : 'text-left pl-16'
                  }`}
                >
                  <div className="inline-block p-8 rounded-2xl bg-card border-2 border-primary/20 backdrop-blur-sm hover:border-primary/40 transition-colors">
                    <span className="inline-block px-4 py-2 mb-4 text-xs font-bold tracking-widest bg-primary/20 rounded-full">
                      {exp.period}
                    </span>
                    <h3 className="text-3xl font-bold mb-2">{exp.role}</h3>
                    <h4 className="text-xl text-primary mb-4">{exp.company}</h4>
                    <ul className="space-y-2 mb-6">
                      {exp.description.map((desc, i) => (
                        <li key={i} className="text-muted-foreground">
                          • {desc}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2 justify-end">
                      {exp.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs border border-primary/30 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Node Circle */}
                <div className="relative flex-shrink-0 w-8 h-8 z-10">
                  <div className="node-glow absolute inset-0 bg-primary rounded-full blur-xl" />
                  <div className="absolute inset-0 bg-primary rounded-full border-4 border-background" />
                </div>

                {/* Spacer */}
                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

