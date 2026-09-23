'use client';

import { useCallback, useEffect, useRef } from 'react';

const TRAIL_LEN = 6;
const RADIUS = 200;
const SEGS = 48;
const PATTERN_ROWS = 10;
const PATTERN_COLS = 18;
const PATTERN_TEXT = 'K E Y O U';

type Point = { x: number; y: number };

function buildRows() {
  return Array.from({ length: PATTERN_ROWS }, (_, r) => ({
    id: r,
    cells: Array.from({ length: PATTERN_COLS }, (_, c) => `${r}-${c}`),
  }));
}

const ROWS = buildRows();

function PatternGrid({
  variant,
}: {
  variant: 'base' | 'alt';
}) {
  return (
    <div
      className={`hero-pattern ${variant === 'alt' ? 'hero-pattern--alt' : ''}`}
      aria-hidden="true"
    >
      {ROWS.map((row, ri) => (
        <div
          key={row.id}
          className={`hero-pattern__row ${ri % 2 === 1 ? 'hero-pattern__row--odd' : ''}`}
        >
          {row.cells.map((id) => (
            <span key={id} className="hero-pattern__cell">
              {PATTERN_TEXT}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function HeroSpotlight({
  titleZh,
  titleEn,
  label = 'About',
}: {
  titleZh: React.ReactNode;
  titleEn: string;
  label?: string;
}) {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const altRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    targetX: -300,
    targetY: -300,
    isInside: false,
    animationId: 0,
    trail: Array.from({ length: TRAIL_LEN }, (): Point => ({ x: -300, y: -300 })),
  });

  const step = useCallback(() => {
    const state = stateRef.current;
    const alt = altRef.current;
    if (!alt) {
      state.animationId = 0;
      return;
    }

    for (let i = 0; i < TRAIL_LEN; i++) {
      const tx = i === 0 ? state.targetX : state.trail[i - 1].x;
      const ty = i === 0 ? state.targetY : state.trail[i - 1].y;
      const ease = 0.7 - 0.04 * i;
      state.trail[i].x += (tx - state.trail[i].x) * ease;
      state.trail[i].y += (ty - state.trail[i].y) * ease;
    }

    const head = state.trail[0];
    const tail = state.trail[TRAIL_LEN - 1];
    const angle = Math.atan2(head.y - tail.y, head.x - tail.x);
    const points: string[] = [];

    for (let e = 0; e <= SEGS; e++) {
      const t = angle - Math.PI / 2 + (Math.PI * e) / SEGS;
      points.push(
        `${(head.x + RADIUS * Math.cos(t)).toFixed(2)}px ${(head.y + RADIUS * Math.sin(t)).toFixed(2)}px`
      );
    }
    for (let e = 0; e <= SEGS; e++) {
      const t = angle + Math.PI / 2 + (Math.PI * e) / SEGS;
      points.push(
        `${(tail.x + RADIUS * Math.cos(t)).toFixed(2)}px ${(tail.y + RADIUS * Math.sin(t)).toFixed(2)}px`
      );
    }

    alt.style.clipPath = `polygon(${points.join(', ')})`;

    const settled =
      Math.abs(state.targetX - tail.x) <= 1 &&
      Math.abs(state.targetY - tail.y) <= 1 &&
      !state.isInside;

    if (settled) {
      state.animationId = 0;
      return;
    }
    state.animationId = requestAnimationFrame(step);
  }, []);

  const kick = useCallback(() => {
    if (!stateRef.current.animationId) {
      stateRef.current.animationId = requestAnimationFrame(step);
    }
  }, [step]);

  useEffect(() => {
    const surface = surfaceRef.current;
    const alt = altRef.current;
    if (!surface || !alt) return;

    const isTouch =
      window.matchMedia('(hover: none), (pointer: coarse)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0;

    if (isTouch) {
      alt.style.display = 'none';
      return;
    }

    const state = stateRef.current;

    const onMove = (e: MouseEvent) => {
      const rect = surface.getBoundingClientRect();
      state.targetX = e.clientX - rect.left;
      state.targetY = e.clientY - rect.top;
      kick();
    };

    const onEnter = (e: MouseEvent) => {
      const rect = surface.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      state.isInside = true;
      state.targetX = x;
      state.targetY = y;
      for (let i = 0; i < TRAIL_LEN; i++) {
        state.trail[i] = { x, y };
      }
      kick();
    };

    const onLeave = (e: MouseEvent) => {
      const rect = surface.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      state.isInside = false;
      let tx = x;
      let ty = y;
      if (x <= 0) tx = -400;
      else if (x >= rect.width) tx = rect.width + 400;
      if (y <= 0) ty = -400;
      else if (y >= rect.height) ty = rect.height + 400;
      state.targetX = tx;
      state.targetY = ty;
    };

    surface.addEventListener('mousemove', onMove);
    surface.addEventListener('mouseenter', onEnter);
    surface.addEventListener('mouseleave', onLeave);

    return () => {
      surface.removeEventListener('mousemove', onMove);
      surface.removeEventListener('mouseenter', onEnter);
      surface.removeEventListener('mouseleave', onLeave);
      if (state.animationId) {
        cancelAnimationFrame(state.animationId);
        state.animationId = 0;
      }
    };
  }, [kick]);

  return (
    <div ref={surfaceRef} className="hero-spotlight">
      <PatternGrid variant="base" />
      <h1 className="hero-spotlight__title">{titleZh}</h1>

      <div
        ref={altRef}
        className="hero-spotlight__alt"
        style={{ clipPath: 'circle(0px at -300px -300px)' }}
        aria-hidden="true"
      >
        <PatternGrid variant="alt" />
        <h1 className="hero-spotlight__title hero-spotlight__title--alt">{titleEn}</h1>
        <span className="hero-spotlight__label">{label}</span>
      </div>
    </div>
  );
}
