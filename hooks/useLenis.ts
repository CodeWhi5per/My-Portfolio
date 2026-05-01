'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { getLenis } from '@/lib/lenis';

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);
  useEffect(() => { lenisRef.current = getLenis(); }, []);
  return lenisRef;
}
