'use client';

import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@/hooks/useGSAP';
import { gsap } from '@/lib/gsap';
import { useLenis } from '@/hooks/useLenis';
import Image from 'next/image';
import {
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiVite,
  SiThreedotjs,
  SiGreensock,
  SiFlutter,
  SiKotlin,
  SiSpring,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiMysql,
  SiMongodb,
  SiGooglecloud
} from 'react-icons/si';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const heroWordRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const massiveTextRef = useRef<HTMLDivElement>(null);
  const techStackRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useLenis();

  useEffect(() => {
    setIsClient(true);
  }, []);


  // ==========================================
  // CUSTOM CURSOR
  // ==========================================
  useEffect(() => {
    if (!isClient || !cursorRef.current) return;

    const cursor = cursorRef.current;
    const hoverables = document.querySelectorAll('a, button, .hoverable');

    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const handleMouseEnter = () => {
      gsap.to(cursor, {
        scale: 5,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      hoverables.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [isClient]);

  // ==========================================
  // MAIN PINNED SCROLL ANIMATIONS
  // ==========================================
  useGSAP(
    () => {
      if (!sectionRef.current || !pinContainerRef.current || !isClient) return;

      // Set initial states - hide everything except hero
      gsap.set([introRef.current, massiveTextRef.current, techStackRef.current, statsRef.current], {
        opacity: 0,
      });

      // Create main timeline with ScrollTrigger
      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=600%', // Reduced from 1000% to 600%
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // ==========================================
      // STAGE 1: HERO WORD REVEAL (0-10%)
      // ==========================================
      if (heroWordRef.current) {
        const letters = heroWordRef.current.querySelectorAll('.letter');

        mainTimeline
          .from(letters, {
            y: 120,
            opacity: 0,
            stagger: 0.08,
            duration: 1.2,
            ease: 'expo.out',
          }, 0)
          .to(heroWordRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.inOut',
          }, 2.5);
      }

      // ==========================================
      // STAGE 2: INTRO PARAGRAPH (10-20%)
      // ==========================================
      if (introRef.current) {
        mainTimeline
          .to(introRef.current, {
            opacity: 1,
            duration: 0.8, // Slower fade in (was 0.5)
            ease: 'power2.out',
          }, 3.5) // Delayed start (was 1.8)
          .to(introRef.current, {
            opacity: 0,
            duration: 0.8, // Slower fade out (was 0.5)
            ease: 'power2.inOut',
          }, 5.5); // Stay longer (was 2.5)
      }

      // ==========================================
      // STAGE 3: MASSIVE TEXT STATEMENTS (20-50%)
      // ==========================================
      if (massiveTextRef.current) {
        const statements = massiveTextRef.current.querySelectorAll('.statement');

        // Set all statements to opacity 0 initially
        gsap.set(statements, { opacity: 0 });

        mainTimeline.to(massiveTextRef.current, {
          opacity: 1,
          duration: 0.5,
        }, 6.5); // Delayed start (was 2.8)

        statements.forEach((statement, index) => {
          const words = statement.querySelectorAll('.word');
          const startTime = 7 + (index * 3.5); // Reduced from 4 to 3.5

          // Show this statement
          mainTimeline.to(statement, {
            opacity: 1,
            duration: 0.8,
          }, startTime);

          // Animate words in
          mainTimeline.from(words, {
            y: 80,
            opacity: 0,
            clipPath: 'inset(0 100% 0 0)',
            stagger: 0.15,
            duration: 1,
            ease: 'power3.out',
          }, startTime + 0.5);

          // Fade out words if not the last statement
          if (index < statements.length - 1) {
            mainTimeline.to(words, {
              opacity: 0,
              duration: 0.8,
            }, startTime + 2.8); // Reduced stay time

            // Hide this statement
            mainTimeline.to(statement, {
              opacity: 0,
              duration: 0.8,
            }, startTime + 3.4);
          }
        });

        // Fade out the last statement (now at 2nd statement)
        mainTimeline.to(massiveTextRef.current, {
          opacity: 0,
          duration: 0.8,
        }, 14); // Much earlier (was 21)
      }

      // ==========================================
      // STAGE 4: TECH STACK ICON SWAPPING
      // ==========================================
      if (techStackRef.current) {
        const techItems = techStackRef.current.querySelectorAll('.tech-item');

        mainTimeline.to(techStackRef.current, {
          opacity: 1,
          duration: 0.8,
        }, 15); // Start right after Stage 3 (was 22)

        // Stagger animation for each tech item
        techItems.forEach((item, index) => {
          const startTime = 16 + (index * 0.15); // Adjusted timing

          mainTimeline
            .from(item, {
              scale: 0,
              rotation: 180,
              opacity: 0,
              duration: 0.8,
              ease: 'back.out(1.7)',
            }, startTime)
            .to(item, {
              y: -10,
              duration: 0.4,
              ease: 'power2.inOut',
              yoyo: true,
              repeat: 1,
            }, startTime + 0.8);
        });

        mainTimeline.to(techStackRef.current, {
          opacity: 0,
          duration: 0.8,
        }, 20); // Fade out earlier (was 28)
      }

      // ==========================================
      // STAGE 5: STATS FINALE (updated timing)
      // ==========================================
      if (statsRef.current) {
        const counters = statsRef.current.querySelectorAll('.counter');

        mainTimeline.to(statsRef.current, {
          opacity: 1,
          duration: 0.8,
        }, 21); // Start right after tech stack (was 29)

        counters.forEach((counter) => {
          const target = parseInt(counter.getAttribute('data-target') || '0');
          const obj = { value: 0 };

          mainTimeline.to(obj, {
            value: target,
            duration: 2.5,
            ease: 'power2.out',
            onUpdate: () => {
              counter.textContent = Math.round(obj.value).toString();
            },
          }, 21.8); // Start right after stats fade in
        });
      }
    },
    { scope: sectionRef, dependencies: [isClient] }
  );

  return (
    <>
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-50 mix-blend-difference hidden lg:block"
        style={{
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
      />

      <section
        id="about"
        ref={sectionRef}
        className="relative h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] text-[#f0f0f0] overflow-hidden"
        style={{ fontFamily: 'var(--font-poppins)' }}
      >
        {/* Pin Container - Everything happens inside here */}
        <div
          ref={pinContainerRef}
          className="absolute inset-0 flex items-center justify-center"
        >
          {/* STAGE 1: HERO WORD REVEAL - "About" */}
          <div
            ref={heroWordRef}
            className="absolute inset-0 flex items-center justify-center"
            style={{ willChange: 'transform' }}
          >
            {/* "About" text - centered */}
            <div className="text-[10vw] font-black leading-none tracking-tighter text-white">
              {'ABOUT'.split('').map((letter, i) => (
                <span
                  key={i}
                  className="letter inline-block"
                  style={{ willChange: 'transform' }}
                >
                  {letter}
                </span>
              ))}
            </div>
          </div>

          {/* STAGE 2: INTRO PARAGRAPH */}
          <div
            ref={introRef}
            className="absolute inset-0 flex items-center justify-center px-6"
            style={{ willChange: 'transform' }}
          >
            <p className="text-[clamp(32px,5vw,72px)] font-bold text-center max-w-5xl">
              I build <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">web</span> and <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">mobile</span> Apps.
            </p>
          </div>

          {/* STAGE 3: MASSIVE TEXT STATEMENTS */}
          <div
            ref={massiveTextRef}
            className="absolute inset-0 flex items-center justify-center px-6"
            style={{ willChange: 'transform' }}
          >
            {/* Statement 1 - Absolutely positioned in center */}
            <div className="statement absolute inset-0 flex items-center justify-center px-6">
              <h2 className="text-[clamp(56px,8vw,140px)] font-black uppercase leading-none text-center max-w-6xl">
                {['Full', 'Stack', 'Developer'].map((word, i) => {
                  const gradients = [
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // Full - Purple/Indigo
                    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', // Stack - Pink/Red
                    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', // Developer - Cyan/Blue
                  ];
                  return (
                    <span
                      key={i}
                      className="word inline-block mx-1 text-transparent bg-clip-text"
                      style={{
                        willChange: 'transform',
                        clipPath: 'inset(0 0% 0 0)',
                        backgroundImage: gradients[i],
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {word}
                    </span>
                  );
                })}
              </h2>
            </div>

            {/* Statement 2 - Absolutely positioned in center */}
            <div className="statement absolute inset-0 flex items-center justify-center px-6">
              <h2 className="text-[clamp(48px,8vw,120px)] font-black uppercase leading-tight text-center max-w-6xl">
                {'Building products since 2022'.split(' ').map((word, i) => (
                  <span
                    key={i}
                    className="word inline-block mx-2"
                    style={{
                      willChange: 'transform',
                      clipPath: 'inset(0 0% 0 0)',
                      color: i === 3 ? '#fbbf24' : '#f0f0f0',
                    }}
                  >
                    {word}
                  </span>
                ))}
              </h2>
            </div>
          </div>

          {/* STAGE 4: TECH STACK ICON SWAPPING */}
          <div
            ref={techStackRef}
            className="absolute inset-0 flex items-center justify-center px-6"
            style={{ willChange: 'transform' }}
          >
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-8 md:gap-12 max-w-7xl">
              {/* Frontend */}
              <div className="tech-item flex flex-col items-center gap-3">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-2xl shadow-cyan-500/50 hover:scale-110 transition-transform">
                  <SiTypescript className="w-12 h-12 md:w-14 md:h-14" />
                </div>
                <span className="text-xs md:text-sm text-gray-300 font-medium">TypeScript</span>
              </div>

              <div className="tech-item flex flex-col items-center gap-3">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-2xl shadow-blue-500/50 hover:scale-110 transition-transform">
                  <SiReact className="w-12 h-12 md:w-14 md:h-14" />
                </div>
                <span className="text-xs md:text-sm text-gray-300 font-medium">React</span>
              </div>

              <div className="tech-item flex flex-col items-center gap-3">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-gray-800 to-black flex items-center justify-center text-white shadow-2xl shadow-gray-800/50 hover:scale-110 transition-transform">
                  <SiNextdotjs className="w-12 h-12 md:w-14 md:h-14" />
                </div>
                <span className="text-xs md:text-sm text-gray-300 font-medium">Next.js</span>
              </div>

              <div className="tech-item flex flex-col items-center gap-3">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-white shadow-2xl shadow-cyan-400/50 hover:scale-110 transition-transform">
                  <SiTailwindcss className="w-12 h-12 md:w-14 md:h-14" />
                </div>
                <span className="text-xs md:text-sm text-gray-300 font-medium">Tailwind CSS</span>
              </div>

              <div className="tech-item flex flex-col items-center gap-3">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white shadow-2xl shadow-purple-500/50 hover:scale-110 transition-transform">
                  <SiVite className="w-12 h-12 md:w-14 md:h-14" />
                </div>
                <span className="text-xs md:text-sm text-gray-300 font-medium">Vite</span>
              </div>

              <div className="tech-item flex flex-col items-center gap-3">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white shadow-2xl shadow-gray-700/50 hover:scale-110 transition-transform">
                  <SiThreedotjs className="w-12 h-12 md:w-14 md:h-14" />
                </div>
                <span className="text-xs md:text-sm text-gray-300 font-medium">Three.js</span>
              </div>

              {/* Animation & Mobile */}
              <div className="tech-item flex flex-col items-center gap-3">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white shadow-2xl shadow-green-500/50 hover:scale-110 transition-transform">
                  <SiGreensock className="w-12 h-12 md:w-14 md:h-14" />
                </div>
                <span className="text-xs md:text-sm text-gray-300 font-medium">GSAP</span>
              </div>

              <div className="tech-item flex flex-col items-center gap-3">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white shadow-2xl shadow-blue-400/50 hover:scale-110 transition-transform">
                  <SiFlutter className="w-12 h-12 md:w-14 md:h-14" />
                </div>
                <span className="text-xs md:text-sm text-gray-300 font-medium">Flutter</span>
              </div>

              <div className="tech-item flex flex-col items-center gap-3">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center text-white shadow-2xl shadow-purple-600/50 hover:scale-110 transition-transform">
                  <SiKotlin className="w-12 h-12 md:w-14 md:h-14" />
                </div>
                <span className="text-xs md:text-sm text-gray-300 font-medium">Kotlin</span>
              </div>

              <div className="tech-item flex flex-col items-center gap-3">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-white to-gray-400 flex items-center justify-center shadow-2xl shadow-gray-400/50 hover:scale-110 transition-transform overflow-hidden">
                  <Image
                    src="/java.png"
                    alt="Java"
                    width={70}
                    height={70}
                    className="w-12 h-12 md:w-14 md:h-14 object-contain"
                  />
                </div>
                <span className="text-xs md:text-sm text-gray-300 font-medium">Java</span>
              </div>

              {/* Backend */}
              <div className="tech-item flex flex-col items-center gap-3">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-green-600 to-lime-600 flex items-center justify-center text-white shadow-2xl shadow-green-600/50 hover:scale-110 transition-transform">
                  <SiSpring className="w-12 h-12 md:w-14 md:h-14" />
                </div>
                <span className="text-xs md:text-sm text-gray-300 font-medium">Spring Boot</span>
              </div>

              <div className="tech-item flex flex-col items-center gap-3">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white shadow-2xl shadow-green-500/50 hover:scale-110 transition-transform">
                  <SiNodedotjs className="w-12 h-12 md:w-14 md:h-14" />
                </div>
                <span className="text-xs md:text-sm text-gray-300 font-medium">Node.js</span>
              </div>

              <div className="tech-item flex flex-col items-center gap-3">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-white shadow-2xl shadow-gray-600/50 hover:scale-110 transition-transform">
                  <SiExpress className="w-12 h-12 md:w-14 md:h-14" />
                </div>
                <span className="text-xs md:text-sm text-gray-300 font-medium">Express.js</span>
              </div>

              <div className="tech-item flex flex-col items-center gap-3">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-purple-700 to-violet-800 flex items-center justify-center text-white shadow-2xl shadow-purple-700/50 hover:scale-110 transition-transform overflow-hidden">
                  <Image
                    src="/Csharp.png"
                    alt="C#"
                    width={80}
                    height={80}
                    className="w-12 h-12 md:w-14 md:h-14 object-contain"
                  />
                </div>
                <span className="text-xs md:text-sm text-gray-300 font-medium">C#</span>
              </div>

              <div className="tech-item flex flex-col items-center gap-3">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-yellow-500 flex items-center justify-center text-white shadow-2xl shadow-blue-500/50 hover:scale-110 transition-transform">
                  <SiPython className="w-12 h-12 md:w-14 md:h-14" />
                </div>
                <span className="text-xs md:text-sm text-gray-300 font-medium">Python</span>
              </div>

              {/* Database */}
              <div className="tech-item flex flex-col items-center gap-3">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white shadow-2xl shadow-blue-600/50 hover:scale-110 transition-transform">
                  <SiMysql className="w-12 h-12 md:w-14 md:h-14" />
                </div>
                <span className="text-xs md:text-sm text-gray-300 font-medium">MySQL</span>
              </div>

              <div className="tech-item flex flex-col items-center gap-3">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center text-white shadow-2xl shadow-green-600/50 hover:scale-110 transition-transform">
                  <SiMongodb className="w-12 h-12 md:w-14 md:h-14" />
                </div>
                <span className="text-xs md:text-sm text-gray-300 font-medium">MongoDB</span>
              </div>

              {/* Cloud */}
              <div className="tech-item flex flex-col items-center gap-3">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-red-500 flex items-center justify-center text-white shadow-2xl shadow-blue-500/50 hover:scale-110 transition-transform">
                  <SiGooglecloud className="w-12 h-12 md:w-14 md:h-14" />
                </div>
                <span className="text-xs md:text-sm text-gray-300 font-medium">GCP</span>
              </div>
            </div>
          </div>

          {/* STAGE 5: STATS FINALE */}
          <div
            ref={statsRef}
            className="absolute inset-0 flex items-center justify-center px-6"
            style={{ willChange: 'transform' }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-6xl w-full">
              {/* Stat 1 */}
              <div className="text-center">
                <div className="text-[clamp(64px,12vw,120px)] font-black counter text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-blue-600" data-target="4">
                  0
                </div>
                <div className="text-xl md:text-2xl text-gray-400 mt-4 font-medium">Years of Experience</div>
              </div>

              {/* Stat 2 */}
              <div className="text-center">
                <div className="text-[clamp(64px,12vw,120px)] font-black counter text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-pink-600" data-target="15">
                  0
                </div>
                <div className="text-xl md:text-2xl text-gray-400 mt-4 font-medium">Projects Built</div>
              </div>

              {/* Stat 3 */}
              <div className="text-center">
                <div className="text-[clamp(64px,12vw,120px)] font-black counter text-transparent bg-clip-text bg-gradient-to-br from-yellow-400 to-orange-600" data-target="1579">
                  0
                </div>
                <div className="text-xl md:text-2xl text-gray-400 mt-4 font-medium">Cups of Coffee</div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none" />
      </section>

      {/* CSS Animations */}
      <style jsx global>{`
        body {
          cursor: none;
        }


        .letter,
        .word,
        .line {
          will-change: transform;
        }

        /* Smooth text rendering */
        .line, .word, .letter {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
    </>
  );
}

