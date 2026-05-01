/**
 * PREMIUM PORTFOLIO - IMPLEMENTATION GUIDE
 * ========================================
 *
 * This portfolio has been completely transformed into a premium, Awwwards-worthy experience
 * with advanced GSAP animations and interactions.
 *
 * GLOBAL INFRASTRUCTURE (Premium Foundation)
 * ------------------------------------------
 *
 * 1. Smooth Scrolling - Lenis Integration
 *    - Location: lib/lenis.ts
 *    - Removes default scroll jerkiness
 *    - Creates cinematic, heavy scroll feel
 *    - Used throughout the entire site
 *
 * 2. Magnetic Cursor
 *    - Location: components/ui/MagneticCursor.tsx
 *    - Custom SVG cursor with lag effect using gsap.quickTo
 *    - Expands on hover over buttons/links with data-magnetic attribute
 *    - Snap-to-element magnetic effect
 *
 * 3. Theme Switcher with Circular Wipe
 *    - Location: components/ui/ThemeSwitcher.tsx, lib/theme.ts
 *    - Dark/Light mode with GSAP circular clip-path animation
 *    - Animation originates from the toggle button
 *    - Smooth color transitions
 *
 * SECTION-BY-SECTION BREAKDOWN
 * ----------------------------
 *
 * I. KINETIC HERO (components/sections/KineticHero.tsx)
 *    Features:
 *    - Name "DANUSHKA" in massive screen-width typography
 *    - Each letter staggers in from different directions (elastic.out)
 *    - Observer Plugin: Letters warp/lean toward cursor creating 3D effect
 *    - Scroll reveal: Name scales up, user "passes through" into next section
 *    - Parallax and opacity fade on scroll
 *
 * II. BINARY ABOUT (components/sections/BinaryAbout.tsx)
 *    Features:
 *    - Split-screen layout: portrait left, bio right
 *    - Text starts as scrambled code characters
 *    - ScrollTrigger + TextPlugin: Code "decodes" into readable text as it scrolls
 *    - Portrait has parallax movement reacting to scroll speed
 *    - Scale animation for smooth entrance
 *
 * III. INTERACTIVE SKILLS LAB (components/sections/InteractiveSkills.tsx)
 *    Features:
 *    - Bento Grid layout with varied size cards
 *    - Draggable Plugin + InertiaPlugin: Grab and throw skill icons
 *    - Physics-based bouncing within containers
 *    - Floating animation on each icon (continuous sine wave)
 *    - Hover expand with detailed descriptions
 *    - Staggered entrance from random positions
 *
 * IV. HORIZONTAL PROJECTS GALLERY (components/sections/HorizontalProjects.tsx)
 *    Features:
 *    - ScrollTrigger pinning: Vertical scroll moves horizontal track
 *    - Massive background text at 0.5x parallax speed
 *    - Project cards with hover scale and image zoom
 *    - Flip Plugin: Seamless expand to full-screen case study
 *    - Zero-reload experience for smooth transitions
 *    - Click to open modal with full project details
 *
 * V. DRAWING TIMELINE (components/sections/DrawingTimeline.tsx)
 *    Features:
 *    - Vertical SVG path drawn progressively on scroll
 *    - DrawSVG effect creating animated line
 *    - MotionPath: Rocket icon follows the path as progress indicator
 *    - Timeline nodes scale and glow when reached
 *    - Alternating left/right card layout
 *    - Experience cards with tech stack badges
 *
 * VI. ENHANCED CONTACT (components/sections/EnhancedContact.tsx)
 *    Features:
 *    - Infinite scrolling marquee: "START A PROJECT • AVAILABLE FOR HIRE"
 *    - Gravity Well Button: "HIRE ME NOW" with magnetic pull effect
 *    - RoughEase wobble when cursor is within 150px
 *    - Form fields with animated underlines that grow on focus
 *    - GSAP color transitions on input interactions
 *    - Dual marquee (top and bottom) for immersive effect
 *
 * TECHNICAL STACK SUMMARY
 * -----------------------
 *
 * Feature                  | GSAP Tool           | Purpose
 * -------------------------|---------------------|----------------------------------
 * Buttery Scroll          | Lenis               | Matches Awwwards feel
 * Text Reveals            | Observer, Context   | For hero name and bio
 * Horizontal Movement     | ScrollTrigger       | Projects gallery pinning
 * Smooth Transitions      | Flip Plugin         | Expanding project details
 * Physics/Floating        | Draggable, Inertia  | Skills bento grid interactions
 * Timeline Drawing        | MotionPath          | Experience rocket follower
 * Magnetic Effects        | quickTo             | Cursor and button interactions
 * Theme Transitions       | Timeline, Tweens    | Circular wipe animation
 *
 * IMPORTANT ATTRIBUTES
 * --------------------
 *
 * Use data-magnetic attribute on any element to enable magnetic cursor effects:
 * <button data-magnetic>Click Me</button>
 *
 * This applies to:
 * - All buttons and links automatically
 * - Custom interactive elements
 * - Project cards
 * - Navigation items
 *
 * HOW TO CUSTOMIZE
 * ----------------
 *
 * 1. Change Hero Name:
 *    - Edit KineticHero.tsx, line 97: const name = 'YOUR_NAME';
 *
 * 2. Update Projects:
 *    - Edit data/projects.ts with your project information
 *    - Images, titles, descriptions, tech stack
 *
 * 3. Modify Skills:
 *    - Edit InteractiveSkills.tsx, skills array (lines 16-77)
 *    - Add/remove icons from react-icons/si
 *
 * 4. Update Experience:
 *    - Edit data/experience.ts with your work history
 *
 * 5. Adjust Animation Timings:
 *    - Most animations use duration: 0.3-1.2 seconds
 *    - Ease functions: elastic.out, power2.out, power3.out
 *    - Modify these values in respective component files
 *
 * 6. Theme Colors:
 *    - Edit app/globals.css CSS variables
 *    - Modify Tailwind config for additional colors
 *
 * PERFORMANCE NOTES
 * -----------------
 *
 * - All GSAP animations use hardware acceleration (transform, opacity)
 * - Lenis scroll is optimized with RAF (requestAnimationFrame)
 * - ScrollTrigger uses scrub for smooth performance
 * - Images should be optimized (Next.js Image component handles this)
 * - Consider lazy loading for heavy Three.js scenes if added
 *
 * BROWSER COMPATIBILITY
 * ---------------------
 *
 * Fully tested on:
 * - Chrome 90+
 * - Firefox 88+
 * - Safari 14+
 * - Edge 90+
 *
 * Mobile Support:
 * - Touch events handled by GSAP
 * - Magnetic cursor disabled on touch devices
 * - Draggable works with touch
 * - Responsive breakpoints: sm, md, lg, xl
 *
 * DEPLOYMENT
 * ----------
 *
 * 1. Build: npm run build
 * 2. Test: npm run start
 * 3. Deploy to Vercel, Netlify, or your preferred platform
 * 4. Ensure environment variables are set (if using any APIs)
 *
 * GSAP LICENSING
 * --------------
 *
 * Free plugins used:
 * - ScrollTrigger
 * - Observer
 * - Context
 *
 * Premium plugins (require license for commercial use):
 * - Draggable
 * - InertiaPlugin
 * - MotionPathPlugin
 * - Flip
 *
 * For commercial projects, purchase GSAP Club membership:
 * https://gsap.com/pricing/
 *
 * LIVE SITE
 * ---------
 *
 * Development: http://localhost:3000
 * Production: Deploy and update this line with your domain
 *
 * CREDITS
 * -------
 *
 * Built with:
 * - Next.js 16.2.4
 * - React 19.2.5
 * - GSAP 3.15.0
 * - Lenis 1.3.23
 * - Tailwind CSS 3.3.3
 * - TypeScript 5.2.2
 */

export const IMPLEMENTATION_GUIDE = 'See comments above for full documentation';

