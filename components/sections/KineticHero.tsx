'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';

gsap.registerPlugin(ScrollTrigger, Observer);

export default function KineticHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !nameRef.current) return;

    const letters = nameRef.current.querySelectorAll('.letter');
    const ctx = gsap.context(() => {
      // Initial stagger animation
      gsap.fromTo(
        letters,
        {
          y: (i) => (i % 2 === 0 ? 100 : -100),
          x: (i) => (i % 3 === 0 ? -50 : 50),
          rotation: (i) => (i % 2 === 0 ? -15 : 15),
          opacity: 0,
          scale: 0.5,
        },
        {
          y: 0,
          x: 0,
          rotation: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: {
            each: 0.08,
            from: 'random',
          },
          ease: 'elastic.out(1, 0.5)',
          delay: 0.5,
        }
      );

      // Mouse follow effect using Observer
      Observer.create({
        type: 'pointer',
        onMove: (self) => {
          const { x, y } = self;
          if (x === undefined || y === undefined) return;

          const centerX = window.innerWidth / 2;
          const centerY = window.innerHeight / 2;

          letters.forEach((letter, i) => {
            const offsetX = ((x - centerX) / centerX) * (15 + i * 2);
            const offsetY = ((y - centerY) / centerY) * (10 + i * 2);

            gsap.to(letter, {
              x: offsetX,
              y: offsetY,
              rotationY: offsetX * 0.1,
              rotationX: -offsetY * 0.1,
              duration: 1.5,
              ease: 'power2.out',
            });
          });
        },
      });

      // Scale up and scroll through effect
      gsap.to(nameRef.current, {
        scale: 3,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          pin: false,
        },
      });

      gsap.to(containerRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const name = 'DANUSHKA';

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5"
    >
      <div
        ref={nameRef}
        className="relative text-[15vw] font-black tracking-tighter leading-none select-none"
        style={{ perspective: '1000px' }}
      >
        {name.split('').map((letter, i) => (
          <span
            key={i}
            className="letter inline-block"
            style={{
              transformStyle: 'preserve-3d',
              display: 'inline-block',
            }}
          >
            {letter}
          </span>
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-sm text-muted-foreground tracking-widest">SCROLL</span>
        <div className="w-[2px] h-16 bg-gradient-to-b from-primary to-transparent animate-pulse" />
      </div>
    </section>
  );
}

