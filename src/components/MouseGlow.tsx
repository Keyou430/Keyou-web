'use client';

import { useEffect } from 'react';

export default function MouseGlow() {
  useEffect(() => {
    const root = document.documentElement;

    const handleMouseMove = (e: MouseEvent) => {
      root.style.setProperty('--mouse-x', `${e.clientX}px`);
      root.style.setProperty('--mouse-y', `${e.clientY}px`);
      root.style.setProperty('--mouse-x-pct', `${(e.clientX / window.innerWidth) * 100}%`);
      root.style.setProperty('--mouse-y-pct', `${(e.clientY / window.innerHeight) * 100}%`);
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
