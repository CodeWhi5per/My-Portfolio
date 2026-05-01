'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(hover: none) and (pointer: coarse)').matches);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring || isMobile) return;

    const onMouseMove = (e: MouseEvent) => {
      gsap.set(dot, { x: e.clientX, y: e.clientY });
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.3, ease: 'power2.out' });
    };

    // Scale cursor on hoverable elements
    const hoverElements = document.querySelectorAll('a, button, [role="button"], input, textarea');

    const onMouseEnter = () => {
      gsap.to(ring, { scale: 1.8, duration: 0.3, ease: 'power2.out' });
    };

    const onMouseLeave = () => {
      gsap.to(ring, { scale: 1, duration: 0.3, ease: 'power2.out' });
    };

    hoverElements.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    });

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', checkMobile);
      hoverElements.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999]"
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#4fa8d8',
          boxShadow: '0 0 8px #4fa8d8',
          mixBlendMode: 'screen',
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9998]"
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1.5px solid rgba(79, 168, 216, 0.4)',
          opacity: 0.4,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
}
