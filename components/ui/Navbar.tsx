'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

interface NavbarProps {
  loaded: boolean;
}

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ loaded }: NavbarProps) {
  const navRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (!loaded || !navRef.current) return;

    // Entrance animation
    gsap.from(navRef.current, {
      y: -80,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
      delay: 0.3,
    });

    // Blur backdrop animation on scroll
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const blur = Math.min(scrollY / 10, 20);

      if (navRef.current) {
        gsap.to(navRef.current, {
          backdropFilter: `blur(${blur}px)`,
          background: `rgba(6, 8, 16, ${Math.min(0.85 + scrollY / 1000, 0.95)})`,
          duration: 0.3,
        });
      }

      // Show/hide navbar based on scroll direction
      if (scrollY > lastScrollY.current && scrollY > 100) {
        // Scrolling down
        setIsVisible(false);
        gsap.to(navRef.current, {
          y: -100,
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        // Scrolling up
        setIsVisible(true);
        gsap.to(navRef.current, {
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      }

      lastScrollY.current = scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    // Active section highlighting
    navItems.forEach((item) => {
      const sectionId = item.href.replace('#', '');
      const section = document.getElementById(sectionId);

      if (section) {
        ScrollTrigger.create({
          trigger: section,
          start: 'top 20%',
          end: 'bottom 20%',
          onEnter: () => setActiveSection(sectionId),
          onEnterBack: () => setActiveSection(sectionId),
          id: `nav-${sectionId}`,
        });
      }
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.id?.startsWith('nav-')) {
          st.kill();
        }
      });
    };
  }, [loaded]);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-[100] py-5 px-6 transition-all"
      style={{
        background: 'rgba(6, 8, 16, 0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(79, 168, 216, 0.1)',
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#home"
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2"
        >
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #4fa8d8, #1a8a6e)' }}
          >
            AJ
          </div>
          <span className="text-white font-semibold hidden sm:block">Alex Johnson</span>
        </motion.a>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  style={
                    isActive
                      ? {
                          background: 'rgba(79, 168, 216, 0.15)',
                          boxShadow: '0 0 20px rgba(79, 168, 216, 0.2)',
                        }
                      : {}
                  }
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* CTA Button */}
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white"
          style={{ background: 'linear-gradient(135deg, #4fa8d8, #1a8a6e)' }}
        >
          Hire Me
        </motion.a>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
