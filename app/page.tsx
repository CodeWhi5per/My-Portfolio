/**
 * PREMIUM PORTFOLIO - MAIN PAGE
 * ==============================
 *
 * This portfolio has been completely transformed into a premium,
 * Awwwards-worthy interactive experience with advanced GSAP animations.
 *
 * IMPLEMENTED FEATURES:
 *
 * 1. GLOBAL INFRASTRUCTURE
 *    ✓ Magnetic Cursor with lag effect and snap-to-element
 *    ✓ Theme Switcher with circular wipe animation
 *    ✓ Smooth Lenis scrolling for cinematic feel
 *
 * 2. KINETIC HERO
 *    ✓ Name typography with elastic stagger entrance
 *    ✓ Observer-based mouse tracking for 3D letter movement
 *    ✓ Scale-up scroll-through effect
 *
 * 3. BINARY ABOUT
 *    ✓ Split-screen layout with parallax portrait
 *    ✓ Text decode animation (code → readable text)
 *    ✓ ScrollTrigger-based reveals
 *
 * 4. INTERACTIVE SKILLS LAB
 *    ✓ Bento Grid with varied card sizes
 *    ✓ Draggable icons with physics and bounce
 *    ✓ Floating animations on all skill icons
 *    ✓ Hover expand with details reveal
 *
 * 5. HORIZONTAL PROJECTS GALLERY
 *    ✓ Pin and horizontal scroll with vertical mouse wheel
 *    ✓ Parallax background text at 0.5x speed
 *    ✓ Full-screen modal expansion
 *    ✓ Smooth transitions between states
 *
 * 6. DRAWING TIMELINE
 *    ✓ SVG path that draws on scroll
 *    ✓ Rocket icon following the path with MotionPath
 *    ✓ Node scale and glow on reach
 *    ✓ Alternating card layout
 *
 * 7. ENHANCED CONTACT
 *    ✓ Infinite scrolling marquee text
 *    ✓ Gravity Well "HIRE ME" button with RoughEase wobble
 *    ✓ Animated form field underlines
 *    ✓ Dual marquees for immersive effect
 *
 * TECH STACK:
 * - Next.js 16.2.4 with App Router
 * - GSAP 3.15.0 (ScrollTrigger, Observer, Draggable, etc.)
 * - Lenis 1.3.23 for smooth scrolling
 * - Tailwind CSS 3.3.3 for styling
 * - TypeScript 5.2.2 for type safety
 *
 * USAGE:
 * - Development: npm run dev (http://localhost:3000)
 * - Production Build: npm run build
 * - Type Check: npm run typecheck
 *
 * For detailed implementation guide, see: lib/implementation-guide.ts
 */

'use client';

import { useState, useEffect } from 'react';
import { createLenis } from '@/lib/lenis';
import LoadingScreen from '@/components/ui/LoadingScreen';
import MagneticCursor from '@/components/ui/MagneticCursor';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import InteractiveSkills from '@/components/sections/InteractiveSkills';
import HorizontalProjects from '@/components/sections/HorizontalProjects';
import DrawingTimeline from '@/components/sections/DrawingTimeline';
import EnhancedContact from '@/components/sections/EnhancedContact';
import Footer from '@/components/sections/Footer';
import LiquidNavbar from "@/components/ui/LiquidNavbar";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) {
      createLenis();

      // Smooth fade-in of main content
      const mainContent = document.querySelector('main');
      if (mainContent) {
        mainContent.style.opacity = '0';
        requestAnimationFrame(() => {
          mainContent.style.transition = 'opacity 0.8s ease-out';
          mainContent.style.opacity = '1';
        });
      }
    }
  }, [loaded]);

  return (
    <>
      <LoadingScreen onComplete={() => setLoaded(true)} />
      {loaded && (
        <>
          <MagneticCursor />
          <LiquidNavbar />
          <main className="overflow-x-hidden" style={{ opacity: 0 }}>
            <Hero loaded={loaded} />
            <About />
            <InteractiveSkills />
            <HorizontalProjects />
            <DrawingTimeline />
            <EnhancedContact />
            <Footer />
          </main>
        </>
      )}
    </>
  );
}
