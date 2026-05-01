'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

const ROTATING_WORDS = ['Developer', 'Designer', 'Creator', 'Innovator'];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const overlay = overlayRef.current;
    const leftPanel = leftPanelRef.current;
    const rightPanel = rightPanelRef.current;
    const counter = counterRef.current;
    const wordEl = wordRef.current;
    const lineEl = lineRef.current;

    if (!overlay || !leftPanel || !rightPanel || !counter || !wordEl || !lineEl) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setVisible(false);
        onComplete();
      },
    });

    // Phase 1: Counter counts up with expanding line
    tl.to(counter, {
      textContent: 100,
      duration: 2.0,
      ease: 'power2.inOut',
      snap: { textContent: 1 },
      onUpdate() {
        if (counter) {
          counter.textContent = String(Math.round(parseFloat(counter.textContent || '0'))).padStart(3, '0');
        }
      },
    }, 0);

    tl.to(lineEl, {
      scaleX: 1,
      duration: 2.0,
      ease: 'power2.inOut',
    }, 0);

    // Phase 1b: Rotating words cycle
    ROTATING_WORDS.forEach((word, i) => {
      const startTime = i * 0.5;
      tl.to(wordEl, {
        duration: 0.15,
        y: -30,
        opacity: 0,
        ease: 'power2.in',
        onComplete() {
          if (wordEl) wordEl.textContent = word;
        },
      }, startTime);
      tl.to(wordEl, {
        duration: 0.2,
        y: 0,
        opacity: 1,
        ease: 'power2.out',
      }, startTime + 0.15);
    });

    // Fade out center content before curtain opens
    tl.to([counter, wordEl, lineEl], {
      opacity: 0,
      scale: 0.95,
      duration: 0.5,
      ease: 'power2.in',
    }, 1.8);

    // Phase 2: Curtain split open - smooth and quick
    tl.to(leftPanel, {
      xPercent: -100,
      duration: 0.8,
      ease: 'power3.inOut',
    }, 2.1);

    tl.to(rightPanel, {
      xPercent: 100,
      duration: 0.8,
      ease: 'power3.inOut',
    }, 2.1);

    // Fade out overlay completely for smooth transition
    tl.to(overlay, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out',
    }, 2.7);

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[10000]" style={{ opacity: 1 }}>
      {/* Left Curtain Panel */}
      <div
        ref={leftPanelRef}
        className="absolute top-0 left-0 w-1/2 h-full"
        style={{ background: '#060810' }}
      />
      {/* Right Curtain Panel */}
      <div
        ref={rightPanelRef}
        className="absolute top-0 right-0 w-1/2 h-full"
        style={{ background: '#060810' }}
      />

      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
        {/* Rotating Word */}
        <div className="overflow-hidden mb-8">
          <span
            ref={wordRef}
            className="block text-sm tracking-[0.4em] uppercase"
            style={{ color: '#4fa8d8' }}
          >
            {ROTATING_WORDS[0]}
          </span>
        </div>

        {/* Line */}
        <div
          ref={lineRef}
          className="w-48 h-px mb-8"
          style={{
            background: 'linear-gradient(90deg, transparent, #4fa8d8, #1a8a6e, transparent)',
            transform: 'scaleX(0)',
          }}
        />

        {/* Counter */}
        <span
          ref={counterRef}
          className="text-7xl md:text-8xl font-black tabular-nums"
          style={{
            fontVariantNumeric: 'tabular-nums',
            background: 'linear-gradient(135deg, #4fa8d8, #1a8a6e)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          000
        </span>
      </div>
    </div>
  );
}

