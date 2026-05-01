'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';
import ClientOnly from '@/components/ui/ClientOnly';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';

const ThreeCanvas = dynamic(() => import('@react-three/fiber').then((mod) => ({ default: mod.Canvas })), { ssr: false });
const FloatingShapes = dynamic(() => import('@/components/three/FloatingShapes'), { ssr: false });

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !infoRef.current || !formRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          id: 'contact-entrance',
        },
      });

      // Title animation with word split
      const titleText = titleRef.current!.innerText;
      const words = titleText.split(' ');
      titleRef.current!.innerHTML = words
        .map((word) => `<span style="display:inline-block; margin-right:0.3em;">${word}</span>`)
        .join('');

      tl.from(titleRef.current!.children, {
        y: 60,
        opacity: 0,
        stagger: 0.08,
        ease: 'power4.out',
        duration: 0.6,
      })
        .from(
          infoRef.current!.children,
          {
            x: -40,
            opacity: 0,
            stagger: 0.1,
            ease: 'power3.out',
            duration: 0.6,
          },
          '-=0.3'
        )
        .from(
          formRef.current,
          {
            y: 60,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.4'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleFocus = (fieldName: string, labelElement: HTMLElement) => {
    gsap.to(labelElement, {
      y: -22,
      scale: 0.8,
      color: '#4fa8d8',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleBlur = (fieldName: string, value: string, labelElement: HTMLElement) => {
    if (!value) {
      gsap.to(labelElement, {
        y: 0,
        scale: 1,
        color: '#94a3b8',
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const shakeField = (element: HTMLElement) => {
    gsap.fromTo(
      element,
      { x: 0 },
      {
        keyframes: [
          { x: -8 },
          { x: 8 },
          { x: -6 },
          { x: 6 },
          { x: 0 }
        ],
        duration: 0.4,
        ease: 'power2.out',
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toast.error('Please enter your name');
      if (formRef.current) shakeField(formRef.current.querySelector('input[name="name"]')!);
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error('Please enter a valid email');
      if (formRef.current) shakeField(formRef.current.querySelector('input[name="email"]')!);
      return;
    }

    if (!formData.message.trim()) {
      toast.error('Please enter a message');
      if (formRef.current) shakeField(formRef.current.querySelector('textarea[name="message"]')!);
      return;
    }

    setLoading(true);

    /*
      EMAILJS CONFIG — Replace these values:
      Service ID:  "your_service_id"
      Template ID: "your_template_id"
      Public Key:  "your_public_key"
      Get these from https://emailjs.com/account

      Example implementation:
      import emailjs from 'emailjs-com';

      try {
        await emailjs.send(
          'your_service_id',
          'your_template_id',
          {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
          },
          'your_public_key'
        );
        toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } catch (error) {
        toast.error('Failed to send message. Please try again.');
      }
    */

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-32 overflow-hidden" style={{ background: '#07091a' }}>
      {/* Three.js Floating Shapes Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <ClientOnly>
          <ThreeCanvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <FloatingShapes />
          </ThreeCanvas>
        </ClientOnly>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <h2 ref={titleRef} className="text-5xl md:text-6xl font-bold text-white text-center mb-16">
          Let&apos;s Work Together
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div ref={infoRef} className="space-y-6">
            <div className="mb-8">
              <p className="text-xl text-slate-400 leading-relaxed">
                Have a project in mind or just want to chat? Feel free to reach out. I&apos;m always open to discussing new opportunities and collaborations.
              </p>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(79, 168, 216, 0.1)' }}>
                <FiMail className="text-xl" style={{ color: '#4fa8d8' }} />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Email</h4>
                <a href="mailto:alex@example.com" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  alex@example.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(79, 168, 216, 0.1)' }}>
                <FiPhone className="text-xl" style={{ color: '#4fa8d8' }} />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Phone</h4>
                <a href="tel:+1234567890" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  +1 (234) 567-890
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(79, 168, 216, 0.1)' }}>
                <FiMapPin className="text-xl" style={{ color: '#4fa8d8' }} />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Location</h4>
                <p className="text-slate-400">San Francisco, CA</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="relative">
              <label
                htmlFor="name"
                className="absolute left-4 top-3 text-slate-400 pointer-events-none transition-all"
                ref={(el) => {
                  if (el && formData.name) {
                    gsap.set(el, { y: -22, scale: 0.8, color: '#4fa8d8' });
                  }
                }}
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                onFocus={(e) => handleFocus('name', e.target.previousElementSibling as HTMLElement)}
                onBlur={(e) => handleBlur('name', e.target.value, e.target.previousElementSibling as HTMLElement)}
                className="w-full px-4 py-3 rounded-lg text-white bg-transparent transition-all"
                style={{ border: '1px solid rgba(255, 255, 255, 0.1)', outline: 'none' }}
              />
            </div>

            {/* Email Field */}
            <div className="relative">
              <label
                htmlFor="email"
                className="absolute left-4 top-3 text-slate-400 pointer-events-none transition-all"
                ref={(el) => {
                  if (el && formData.email) {
                    gsap.set(el, { y: -22, scale: 0.8, color: '#4fa8d8' });
                  }
                }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onFocus={(e) => handleFocus('email', e.target.previousElementSibling as HTMLElement)}
                onBlur={(e) => handleBlur('email', e.target.value, e.target.previousElementSibling as HTMLElement)}
                className="w-full px-4 py-3 rounded-lg text-white bg-transparent transition-all"
                style={{ border: '1px solid rgba(255, 255, 255, 0.1)', outline: 'none' }}
              />
            </div>

            {/* Subject Field */}
            <div className="relative">
              <label
                htmlFor="subject"
                className="absolute left-4 top-3 text-slate-400 pointer-events-none transition-all"
                ref={(el) => {
                  if (el && formData.subject) {
                    gsap.set(el, { y: -22, scale: 0.8, color: '#4fa8d8' });
                  }
                }}
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                onFocus={(e) => handleFocus('subject', e.target.previousElementSibling as HTMLElement)}
                onBlur={(e) => handleBlur('subject', e.target.value, e.target.previousElementSibling as HTMLElement)}
                className="w-full px-4 py-3 rounded-lg text-white bg-transparent transition-all"
                style={{ border: '1px solid rgba(255, 255, 255, 0.1)', outline: 'none' }}
              />
            </div>

            {/* Message Field */}
            <div className="relative">
              <label
                htmlFor="message"
                className="absolute left-4 top-3 text-slate-400 pointer-events-none transition-all"
                ref={(el) => {
                  if (el && formData.message) {
                    gsap.set(el, { y: -22, scale: 0.8, color: '#4fa8d8' });
                  }
                }}
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                onFocus={(e) => handleFocus('message', e.target.previousElementSibling as HTMLElement)}
                onBlur={(e) => handleBlur('message', e.target.value, e.target.previousElementSibling as HTMLElement)}
                className="w-full px-4 py-3 rounded-lg text-white bg-transparent transition-all resize-none"
                style={{ border: '1px solid rgba(255, 255, 255, 0.1)', outline: 'none' }}
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-lg text-white font-semibold transition-all"
              style={{ background: loading ? 'rgba(79, 168, 216, 0.5)' : 'linear-gradient(135deg, #4fa8d8, #1a8a6e)' }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  );
}
