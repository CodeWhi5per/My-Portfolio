'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!cursorRef.current || !cursorDotRef.current) return;

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    let animationFrameId: number;

    // Smooth cursor follow with quickTo
    const quickX = gsap.quickTo(cursor, 'x', { duration: 0.5, ease: 'power3' });
    const quickY = gsap.quickTo(cursor, 'y', { duration: 0.5, ease: 'power3' });
    const quickDotX = gsap.quickTo(cursorDot, 'x', { duration: 0.15, ease: 'power3' });
    const quickDotY = gsap.quickTo(cursorDot, 'y', { duration: 0.15, ease: 'power3' });

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      quickX(e.clientX);
      quickY(e.clientY);
      quickDotX(e.clientX);
      quickDotY(e.clientY);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target;
      // Check if target is an Element (has closest method)
      if (!(target instanceof Element)) return;

      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.hasAttribute('data-magnetic')
      ) {
        gsap.to(cursor, {
          scale: 3,
          duration: 0.3,
          ease: 'power2.out',
        });
        gsap.to(cursorDot, {
          scale: 0,
          duration: 0.3,
        });
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target;
      // Check if target is an Element (has closest method)
      if (!(target instanceof Element)) return;

      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.hasAttribute('data-magnetic')
      ) {
        gsap.to(cursor, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
        gsap.to(cursorDot, {
          scale: 1,
          duration: 0.3,
        });
      }
    };

    // Add magnetic effect to interactive elements
    const addMagneticEffect = () => {
      const magneticElements = document.querySelectorAll('[data-magnetic]');

      magneticElements.forEach((el) => {
        const element = el as HTMLElement;

        element.addEventListener('mouseenter', function(this: HTMLElement) {
          gsap.to(this, {
            duration: 0.3,
            scale: 1.05,
            ease: 'power2.out',
          });
        });

        element.addEventListener('mouseleave', function(this: HTMLElement) {
          gsap.to(this, {
            duration: 0.3,
            x: 0,
            y: 0,
            scale: 1,
            ease: 'elastic.out(1, 0.3)',
          });
        });

        element.addEventListener('mousemove', function(this: HTMLElement, e: MouseEvent) {
          const rect = this.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          gsap.to(this, {
            duration: 0.3,
            x: x * 0.3,
            y: y * 0.3,
            ease: 'power2.out',
          });
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    // Initialize magnetic effects
    addMagneticEffect();

    // Re-apply on DOM changes
    const observer = new MutationObserver(addMagneticEffect);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[10000] mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div className="w-full h-full rounded-full border-2 border-white" />
      </div>
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-[10001] bg-white rounded-full"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
}

