'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from '@/lib/gsap';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function LiquidNavbar() {
  const navRef = useRef<HTMLElement>(null);
  const liquidRef = useRef<HTMLDivElement>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current || !liquidRef.current) return;

    // Ensure navbar is visible from the start
    navRef.current.style.display = 'block';
    navRef.current.style.visibility = 'visible';

    // Simple fade-in animation
    gsap.fromTo(navRef.current,
      {
        opacity: 0,
        y: -20
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.3,
      }
    );

    // Initialize liquid background to first nav item after a slight delay
    setTimeout(() => {
      if (!liquidRef.current || !linksContainerRef.current) return;

      const firstLink = linksContainerRef.current.querySelector('[data-index="0"]');
      if (firstLink) {
        const containerBounds = linksContainerRef.current.getBoundingClientRect();
        const linkBounds = firstLink.getBoundingClientRect();
        const left = linkBounds.left - containerBounds.left;
        const width = linkBounds.width;

        gsap.to(liquidRef.current, {
          left: left,
          width: width,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
        });
      }
    }, 500);
  }, []);

  const handleMouseEnter = (index: number, e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!liquidRef.current || !linksContainerRef.current) return;

    const target = e.currentTarget;
    const containerBounds = linksContainerRef.current.getBoundingClientRect();
    const targetBounds = target.getBoundingClientRect();

    const left = targetBounds.left - containerBounds.left;
    const width = targetBounds.width;

    gsap.to(liquidRef.current, {
      left: left,
      width: width,
      duration: 0.6,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  const handleMouseLeave = () => {
    if (!liquidRef.current || !linksContainerRef.current) return;

    const activeLink = linksContainerRef.current.querySelector(`[data-index="${activeIndex}"]`);
    if (activeLink) {
      const containerBounds = linksContainerRef.current.getBoundingClientRect();
      const activeBounds = activeLink.getBoundingClientRect();
      const left = activeBounds.left - containerBounds.left;
      const width = activeBounds.width;

      gsap.to(liquidRef.current, {
        left: left,
        width: width,
        duration: 0.6,
        ease: 'elastic.out(1, 0.3)',
      });
    }
  };

  const handleClick = (index: number, href: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setActiveIndex(index);

    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
        isScrolled ? 'py-4' : 'py-6'
      }`}
      style={{
        display: 'block',
        visibility: 'visible',
        background: isScrolled
          ? 'rgba(26,26,26,0.3)'
          : 'rgba(26,26,26,0.3)',
        backdropFilter: isScrolled ? 'blur(20px)' : 'blur(0px)',
        WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'blur(0px)',
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className="text-2xl font-bold text-white relative z-10"
        >
          <span className="text-white">Danuwa</span>
          <span className="text-cyan-400">.</span>
        </a>

        {/* Navigation Links */}
        <div ref={linksContainerRef} className="relative flex items-center gap-2">
          {/* Liquid Background */}
          <div
            ref={liquidRef}
            className="absolute h-10 rounded-full transition-all"
            style={{
              background: 'linear-gradient(135deg, rgba(79, 168, 216, 0.2), rgba(26, 138, 110, 0.2))',
              border: '1px solid rgba(79, 168, 216, 0.3)',
              boxShadow: '0 0 20px rgba(79, 168, 216, 0.2)',
              left: 0,
              width: 0,
              opacity: 0.8,
            }}
          />

          {/* Nav Items */}
          {navItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              data-index={index}
              onClick={(e) => handleClick(index, item.href, e)}
              onMouseEnter={(e) => handleMouseEnter(index, e)}
              onMouseLeave={handleMouseLeave}
              className={`relative px-5 py-2 text-sm font-medium transition-colors duration-300 z-10 ${
                activeIndex === index
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <a
          href="#contact"
          className="relative px-6 py-2.5 rounded-full text-sm font-medium text-white overflow-hidden group"
        >
          <div
            className="absolute inset-0 transition-transform duration-300 group-hover:scale-110"
            style={{
              background: 'linear-gradient(135deg, #4fa8d8, #1a8a6e)',
            }}
          />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(135deg, #6ec3e8, #2aa588)',
            }}
          />
          <span className="relative z-10">Let&apos;s Talk</span>
        </a>
      </div>
    </nav>
  );
}

