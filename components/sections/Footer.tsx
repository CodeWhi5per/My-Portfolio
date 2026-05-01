'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { motion } from 'framer-motion';
import { getLenis } from '@/lib/lenis';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiArrowUp } from 'react-icons/fi';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerRef.current || !contentRef.current || !socialsRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          id: 'footer-entrance',
        },
      });

      gsap.from(socialsRef.current!.children, {
        scale: 0,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: socialsRef.current,
          start: 'top 90%',
          id: 'socials-entrance',
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, {
        duration: 2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FiTwitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: FiMail, href: 'mailto:alex@example.com', label: 'Email' },
  ];

  return (
    <footer ref={footerRef} className="relative py-12" style={{ background: '#060810', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div ref={contentRef} className="max-w-7xl mx-auto px-6">
        {/* Social Links */}
        <div ref={socialsRef} className="flex justify-center gap-6 mb-8">
          {socialLinks.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -3 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all"
              style={{
                background: 'rgba(79, 168, 216, 0.1)',
                border: '1px solid rgba(79, 168, 216, 0.2)',
              }}
              aria-label={social.label}
            >
              <social.icon className="text-xl" style={{ color: '#4fa8d8' }} />
            </motion.a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-center text-slate-500 mb-6">
          © {new Date().getFullYear()} Alex Johnson. Built with{' '}
          <span style={{ color: '#4fa8d8' }}>Next.js</span>,{' '}
          <span style={{ color: '#4fa8d8' }}>GSAP</span> &{' '}
          <span style={{ color: '#4fa8d8' }}>Three.js</span>.
        </p>

        {/* Back to Top Button */}
        <div className="flex justify-center">
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.9 }}
            className="px-6 py-3 rounded-full flex items-center gap-2 font-semibold text-white transition-all"
            style={{ background: 'linear-gradient(135deg, #4fa8d8, #1a8a6e)' }}
          >
            <FiArrowUp />
            Back to Top
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
