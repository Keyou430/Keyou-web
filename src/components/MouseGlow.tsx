'use client';

import { useEffect } from 'react';

export default function MouseGlow() {
  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    const root = document.documentElement;
    let ticking = false;
    let clientX = 0;
    let clientY = 0;

    const updatePosition = () => {
      root.style.setProperty('--mouse-x', `${clientX}px`);
      root.style.setProperty('--mouse-y', `${clientY}px`);
      root.style.setProperty('--mouse-x-pct', `${(clientX / window.innerWidth) * 100}%`);
      root.style.setProperty('--mouse-y-pct', `${(clientY / window.innerHeight) * 100}%`);
      ticking = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      clientX = e.clientX;
      clientY = e.clientY;
      if (!ticking) {
        requestAnimationFrame(updatePosition);
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="mouse-glow" aria-hidden="true">
      <div className="mouse-glow__core" />
      <div className="mouse-glow__halo" />
    </div>
  );
}
