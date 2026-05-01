'use client';

import Lenis from 'lenis';
import { gsap } from './gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let lenisInstance: Lenis | null = null;

export function createLenis(): Lenis {
  if (lenisInstance) lenisInstance.destroy();

  lenisInstance = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smooth: true });
  lenisInstance.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => { lenisInstance?.raf(time * 1000); });
  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}
