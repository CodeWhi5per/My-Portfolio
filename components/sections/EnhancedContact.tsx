'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RoughEase } from 'gsap/EasePack';
import toast from 'react-hot-toast';

gsap.registerPlugin(ScrollTrigger, RoughEase);

export default function EnhancedContact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const hireMeButtonRef = useRef<HTMLButtonElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    if (!containerRef.current || !marqueeRef.current) return;

    const ctx = gsap.context(() => {
      // Infinite marquee scroll
      const marquee = marqueeRef.current!;
      const marqueeContent = marquee.querySelector('.marquee-content') as HTMLElement;

      if (marqueeContent) {
        const marqueeWidth = marqueeContent.offsetWidth;

        gsap.to(marqueeContent, {
          x: -marqueeWidth / 2,
          duration: 20,
          ease: 'none',
          repeat: -1,
        });
      }

      // Hire Me Button - Gravity Well Effect
      if (hireMeButtonRef.current) {
        const button = hireMeButtonRef.current;
        let isNear = false;

        const handleMouseMove = (e: MouseEvent) => {
          const rect = button.getBoundingClientRect();
          const buttonCenterX = rect.left + rect.width / 2;
          const buttonCenterY = rect.top + rect.height / 2;

          const distance = Math.hypot(
            e.clientX - buttonCenterX,
            e.clientY - buttonCenterY
          );

          if (distance < 150 && !isNear) {
            isNear = true;
            // Wobble effect
            gsap.to(button, {
              x: (e.clientX - buttonCenterX) * 0.3,
              y: (e.clientY - buttonCenterY) * 0.3,
              duration: 0.5,
              ease: RoughEase.ease.config({
                strength: 3,
                points: 20,
                template: 'power2.out',
                randomize: true,
              }),
            });
          } else if (distance >= 150 && isNear) {
            isNear = false;
            gsap.to(button, {
              x: 0,
              y: 0,
              duration: 0.8,
              ease: 'elastic.out(1, 0.3)',
            });
          } else if (isNear) {
            gsap.to(button, {
              x: (e.clientX - buttonCenterX) * 0.3,
              y: (e.clientY - buttonCenterY) * 0.3,
              duration: 0.3,
              ease: 'power2.out',
            });
          }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
          window.removeEventListener('mousemove', handleMouseMove);
        };
      }

      // Form field animations
      const inputs = formRef.current?.querySelectorAll('input, textarea');
      inputs?.forEach((input) => {
        const element = input as HTMLInputElement | HTMLTextAreaElement;
        const underline = element.nextElementSibling as HTMLElement;

        element.addEventListener('focus', () => {
          gsap.to(underline, {
            scaleX: 1,
            backgroundColor: 'hsl(var(--primary))',
            duration: 0.3,
            ease: 'power2.out',
          });
        });

        element.addEventListener('blur', () => {
          if (!element.value) {
            gsap.to(underline, {
              scaleX: 0,
              duration: 0.3,
              ease: 'power2.in',
            });
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    toast.success('Message sent! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative min-h-screen w-full bg-gradient-to-b from-background to-primary/10 overflow-hidden"
    >
      {/* Scrolling Marquee */}
      <div
        ref={marqueeRef}
        className="absolute top-24 left-0 w-full overflow-hidden pointer-events-none"
      >
        <div className="marquee-content flex whitespace-nowrap text-[15vw] font-black text-primary/5 leading-none">
          <span>START A PROJECT • AVAILABLE FOR HIRE • START A PROJECT • AVAILABLE FOR HIRE • </span>
          <span>START A PROJECT • AVAILABLE FOR HIRE • START A PROJECT • AVAILABLE FOR HIRE • </span>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-32">
        <div className="text-center mb-20">
          <h2 className="text-7xl md:text-9xl font-black mb-6">
            <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
              LET&apos;S TALK
            </span>
          </h2>
          <p className="text-2xl text-muted-foreground">
            Ready to bring your ideas to life
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="p-8 rounded-2xl bg-card/50 backdrop-blur-sm border-2 border-primary/20">
              <h3 className="text-3xl font-bold mb-6">Get in Touch</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-2xl">📧</span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="text-lg font-semibold">contact@danushka.dev</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-2xl">📍</span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="text-lg font-semibold">Remote / Worldwide</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-2xl">⏰</span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Response Time</p>
                    <p className="text-lg font-semibold">Within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hire Me Button with Gravity Effect */}
            <div className="flex justify-center py-12">
              <button
                ref={hireMeButtonRef}
                data-magnetic
                className="relative px-16 py-8 text-2xl font-black bg-primary text-primary-foreground rounded-full hover:shadow-2xl hover:shadow-primary/50 transition-shadow"
              >
                <span className="relative z-10">HIRE ME NOW</span>
                <div className="absolute inset-0 rounded-full bg-primary animate-pulse opacity-50" />
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="p-8 rounded-2xl bg-card/50 backdrop-blur-sm border-2 border-primary/20 space-y-8"
          >
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your Name"
                className="w-full bg-transparent border-0 border-b-2 border-muted-foreground/30 py-4 text-lg focus:outline-none focus:border-primary transition-colors"
              />
              <div className="absolute bottom-0 left-0 h-[2px] w-full bg-primary origin-left scale-x-0" />
            </div>

            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Your Email"
                className="w-full bg-transparent border-0 border-b-2 border-muted-foreground/30 py-4 text-lg focus:outline-none focus:border-primary transition-colors"
              />
              <div className="absolute bottom-0 left-0 h-[2px] w-full bg-primary origin-left scale-x-0" />
            </div>

            <div className="relative">
              <textarea
                name="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Your Message"
                rows={6}
                className="w-full bg-transparent border-0 border-b-2 border-muted-foreground/30 py-4 text-lg focus:outline-none focus:border-primary transition-colors resize-none"
              />
              <div className="absolute bottom-0 left-0 h-[2px] w-full bg-primary origin-left scale-x-0" />
            </div>

            <button
              type="submit"
              data-magnetic
              className="w-full py-4 bg-primary text-primary-foreground rounded-full text-lg font-bold hover:scale-105 transition-transform"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Marquee */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none py-12">
        <div className="flex whitespace-nowrap text-[20vw] font-black text-primary/5 leading-none animate-marquee-reverse">
          <span>DANUSHKA • DEVELOPER • DESIGNER • DANUSHKA • DEVELOPER • DESIGNER • </span>
          <span>DANUSHKA • DEVELOPER • DESIGNER • DANUSHKA • DEVELOPER • DESIGNER • </span>
        </div>
      </div>
    </section>
  );
}

