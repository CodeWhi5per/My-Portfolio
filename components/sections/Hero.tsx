'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import Image from 'next/image';

interface HeroProps {
  loaded?: boolean;
}

export default function Hero({ loaded = true }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const topTextRef = useRef<HTMLDivElement>(null);
  const bottomTextRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loaded || !sectionRef.current || !topTextRef.current || !bottomTextRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.from(imageRef.current!, {
        scale: 1.1,
        opacity: 0,
        duration: 1.4,
        ease: 'power3.out',
      })
      .from(topTextRef.current!, {
        x: 200,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
      }, '-=1')
      .from(bottomTextRef.current!, {
        x: -200,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
      }, '-=1.1');

      // Top text scrolls LEFT - increased speed to match visual speed of bottom text
      gsap.to(topTextRef.current!, {
        xPercent: -300,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current!,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      // Bottom text scrolls RIGHT
      gsap.to(bottomTextRef.current!, {
        xPercent: 100,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current!,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [loaded]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-background"
    >
      {/* Top text - BEHIND the image */}
      <div
        ref={topTextRef}
        className="absolute top-[22%] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none"
        style={{ willChange: 'transform', fontFamily: 'var(--font-poppins)' }}
      >
        <h1 className="text-[12vw] font-extrabold leading-none tracking-tighter text-white">
          Sahan
        </h1>
      </div>

      {/* Bottom text - ON TOP of the image */}
      <div
        ref={bottomTextRef}
        className="absolute bottom-[15%] left-1/2 -translate-x-1/2 whitespace-nowrap z-20 pointer-events-none select-none"
        style={{ willChange: 'transform', fontFamily: 'var(--font-poppins)' }}
      >
        <h2 className="text-[12vw] font-bold leading-none tracking-tighter text-white">
            Danushka
        </h2>
      </div>

      {/* Massive center image - in front of the text */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-10 flex items-end justify-center"
        style={{ willChange: 'transform' }}
      >
        <div className="relative w-full h-full max-w-[700px] md:max-w-[800px] lg:max-w-[900px]">
          <Image
            src="/me.png"
            alt="Sahan Danushka"
            fill
            className="object-contain object-bottom"
            priority
            sizes="(max-width: 768px) 100vw, 900px"
          />
          {/* Bottom fade to blend into background */}
          <div
            className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"
          />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] text-white/30 uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-5 h-9 border-2 border-white/15 rounded-full flex justify-center">
            <div
              className="w-1 h-2.5 rounded-full mt-1.5"
              style={{
                background: 'linear-gradient(135deg, #4fa8d8, #1a8a6e)',
                animation: 'scrollBounce 2s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
      `}</style>
    </section>
  );
}

