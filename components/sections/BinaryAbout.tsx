'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function BinaryAbout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      const paragraphs = textRef.current!.querySelectorAll('.decode-text');

      paragraphs.forEach((p) => {
        const originalText = p.textContent || '';
        const scrambleChars = '01!@#$%^&*(){}[]<>?/\\';

        ScrollTrigger.create({
          trigger: p,
          start: 'top 80%',
          end: 'center center',
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const decodeLength = Math.floor(originalText.length * progress);

            let newText = '';
            for (let i = 0; i < originalText.length; i++) {
              if (i < decodeLength) {
                newText += originalText[i];
              } else {
                newText +=
                  scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
              }
            }
            p.textContent = newText;
          },
          onLeave: () => {
            p.textContent = originalText;
          },
        });
      });

      // Image parallax and liquid effect
      gsap.to(imageRef.current, {
        y: -100,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Scale animation for image container
      gsap.fromTo(
        imageRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="min-h-screen w-full py-32 px-6 md:px-12 lg:px-24 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div
            ref={imageRef}
            className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 opacity-50 blur-3xl" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[200px] font-bold text-primary/10">D</span>
            </div>
          </div>

          {/* Text Side */}
          <div ref={textRef} className="space-y-8">
            <h2 className="text-6xl md:text-7xl font-black mb-12">
              <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                ABOUT
              </span>
            </h2>

            <p className="decode-text text-lg md:text-xl leading-relaxed text-foreground/80">
              I am Danushka, a full-stack developer who transforms complex problems
              into elegant digital solutions. With expertise in modern web
              technologies, I craft experiences that blend aesthetic beauty with
              technical precision.
            </p>

            <p className="decode-text text-lg md:text-xl leading-relaxed text-foreground/80">
              My approach combines clean code architecture with stunning visual
              design. Every project is an opportunity to push boundaries and create
              something extraordinary that resonates with users and drives results.
            </p>

            <p className="decode-text text-lg md:text-xl leading-relaxed text-foreground/80">
              From concept to deployment, I ensure every pixel and every line of
              code serves a purpose. Let&apos;s build something remarkable together.
            </p>

            <div className="flex flex-wrap gap-4 pt-8">
              {['React', 'Next.js', 'TypeScript', 'Node.js', 'GSAP'].map((tech) => (
                <span
                  key={tech}
                  className="px-6 py-3 rounded-full border-2 border-primary/30 text-sm font-semibold tracking-wider hover:bg-primary/10 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

