'use client';

import { useEffect, useState, useRef } from 'react';
import { Moon, Sun } from 'lucide-react';
import { animateThemeTransition } from '@/lib/theme';

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem('theme') as 'dark' | 'light' | null;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
    const initialTheme = stored || systemTheme;

    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';

    if (buttonRef.current) {
      animateThemeTransition(newTheme === 'dark', buttonRef.current);
    }

    setTimeout(() => {
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
    }, 100);
  };

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      data-magnetic
      className="fixed top-6 right-6 z-50 p-4 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 hover:bg-primary/20 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-6 h-6 text-primary" />
      ) : (
        <Moon className="w-6 h-6 text-primary" />
      )}
    </button>
  );
}

