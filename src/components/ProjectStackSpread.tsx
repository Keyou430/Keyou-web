'use client';

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
  type MotionValue,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { projects } from '@/data/projects';
import HeroSpotlight from '@/components/HeroSpotlight';

// scatter targets in vw / vh from centre — ring around the Hero, no overlap
const LAYOUT = [
  { target: { x: -32, y: -34 }, stack: { x: -8, y: -10 }, rotate: -14, z: 1 },
  { target: { x: 0, y: -38 }, stack: { x: 4, y: -8 }, rotate: 6, z: 2 },
  { target: { x: 32, y: -34 }, stack: { x: 12, y: -6 }, rotate: -8, z: 3 },
  { target: { x: -36, y: 2 }, stack: { x: -14, y: 0 }, rotate: 10, z: 4 },
  { target: { x: 36, y: 4 }, stack: { x: 14, y: 2 }, rotate: -6, z: 5 },
  { target: { x: -32, y: 34 }, stack: { x: -6, y: 10 }, rotate: 8, z: 6 },
  { target: { x: 0, y: 38 }, stack: { x: 6, y: 8 }, rotate: -4, z: 7 },
  { target: { x: 32, y: 34 }, stack: { x: 16, y: 12 }, rotate: 12, z: 8 },
];

// touch / small-screen: two neat columns
const SM_TARGETS = [
  { x: -22, y: -38 }, { x: 22, y: -38 },
  { x: -22, y: -13 }, { x: 22, y: -13 },
  { x: -22, y: 12 }, { x: 22, y: 12 },
  { x: -22, y: 37 }, { x: 22, y: 37 },
];

const SCATTER_START = 0.12;
const SCATTER_END = 0.9;
const CENTER_IN_START = 0.55;
const CENTER_IN_END = 0.85;

const PARALLAX_X = 2.2;
const PARALLAX_Y = 1.8;
const PARALLAX_SPRING = { stiffness: 90, damping: 22, mass: 0.6 };

const depthOf = (i: number, total: number) =>
  total <= 1 ? 1 : 0.55 + (i / (total - 1)) * 0.75;

interface CardData {
  id: string;
  title: string;
  category: string;
  tech: string[];
  target: { x: number; y: number };
  stack: { x: number; y: number };
  rotate: number;
  z: number;
}

function buildCards(): CardData[] {
  return projects.slice(0, 8).map((p, i) => {
    const L = LAYOUT[i % LAYOUT.length];
    return {
      id: p.id,
      title: p.title,
      category: p.category,
      tech: p.techStack.slice(0, 3),
      target: L.target,
      stack: L.stack,
      rotate: L.rotate,
      z: L.z,
    };
  });
}

function useIsTouch() {
  const [touch, setTouch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    const read = () => setTouch(mq.matches);
    read();
    mq.addEventListener('change', read);
    return () => mq.removeEventListener('change', read);
  }, []);
  return touch;
}

function usePointerParallax(active: boolean, enabled: boolean) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, PARALLAX_SPRING);
  const y = useSpring(rawY, PARALLAX_SPRING);

  useEffect(() => {
    if (!enabled) return;
    if (!active) { rawX.set(0); rawY.set(0); return; }
    const onMove = (e: PointerEvent) => {
      rawX.set((e.clientX / window.innerWidth) * 2 - 1);
      rawY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onLeave = () => { rawX.set(0); rawY.set(0); };
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [active, enabled, rawX, rawY]);
  return { x, y };
}

function ProjectCard({
  card,
  index,
  progress,
  reduce,
  isTouch,
  pointer,
  depth,
}: {
  card: CardData;
  index: number;
  progress: MotionValue<number>;
  reduce: boolean | null;
  isTouch: boolean;
  pointer: { x: MotionValue<number>; y: MotionValue<number> };
  depth: number;
}) {
  const flat = reduce === true;
  const sm = isTouch ? SM_TARGETS[index % SM_TARGETS.length] : null;
  const endX = sm ? sm.x : card.target.x;
  const endY = sm ? sm.y : card.target.y;
  const endRotate = flat || isTouch ? 0 : card.rotate;
  const startRotate = flat ? 0 : card.rotate;

  const translate = useTransform(
    [progress, pointer.x, pointer.y],
    ([p, px, py]: number[]) => {
      const tx = card.stack.x + (endX - card.stack.x) * p;
      const ty = card.stack.y + (endY - card.stack.y) * p;
      const drift = depth * p;
      const dx = tx - px * PARALLAX_X * drift;
      const dy = ty - py * PARALLAX_Y * drift;
      return `calc(-50% + ${dx}vw) calc(-50% + ${dy}vh)`;
    },
  );
  const rotate = useTransform(progress, [0, 1], [startRotate, endRotate]);
  const scale = useTransform(progress, [0, 1], [0.75, 1]);

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 will-change-transform"
      style={{
        width: isTouch ? '42vw' : 'min(18vw, 220px)',
        zIndex: card.z,
        translate,
        rotate,
        scale,
      }}
    >
      <div className="project-spread-card">
        <span className="block text-[10px] uppercase tracking-[0.18em] text-dim/50">
          {card.category}
        </span>
        <h3 className="mt-2 text-[15px] font-medium leading-snug text-foreground">
          {card.title}
        </h3>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {card.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/[0.06] px-2 py-0.5 text-[10px] text-dim/50"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectStackSpread() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const isTouch = useIsTouch();
  const cards = buildCards();

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start start', 'end end'],
  });

  const progress = useTransform(
    scrollYProgress,
    [0, SCATTER_START, SCATTER_END, 1],
    [0, 0, 1, 1],
  );

  const [spread, setSpread] = useState(false);
  useMotionValueEvent(progress, 'change', (p) => {
    setSpread((was) => (was ? p > 0.985 : p >= 0.999));
  });

  const parallaxEnabled = reduce !== true && !isTouch;
  const pointer = usePointerParallax(spread, parallaxEnabled);

  const noScale = reduce === true;
  const centerOpacity = useTransform(
    progress,
    [CENTER_IN_START, CENTER_IN_END],
    [0, 1],
  );
  const centerScale = useTransform(
    progress,
    [CENTER_IN_START, CENTER_IN_END],
    [noScale ? 1 : 0.88, 1],
  );
  const hintOpacity = useTransform(progress, [0, SCATTER_START], [1, 0]);

  return (
    <div
      ref={wrapRef}
      className="relative-z w-full"
      style={{ height: '280vh' }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* scattered project cards — pointer-events-none so mouse reaches centre spotlight */}
        <div className="pointer-events-none absolute inset-0 z-10">
          {cards.map((card, i) => (
            <ProjectCard
              key={card.id}
              card={card}
              index={i}
              progress={progress}
              reduce={reduce}
              isTouch={isTouch}
              pointer={pointer}
              depth={parallaxEnabled ? depthOf(i, cards.length) : 0}
            />
          ))}
        </div>

        {/* centre — HeroSpotlight on page background */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
          style={{ opacity: centerOpacity, scale: centerScale }}
        >
          <div className="pointer-events-auto">
            <HeroSpotlight
              titleZh={
                <>
                  <span className="text-gradient">你好，我是 </span>
                  <span className="text-gradient-accent">陈源富</span>
                </>
              }
              titleEn="HELLO, I'M KEYOU"
              label="About"
            />
          </div>
        </motion.div>

        {/* scroll hint */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-[3vh] z-20 flex flex-col items-center gap-[0.6vh] text-[0.8vw] font-medium uppercase tracking-[0.2em] max-md:bottom-6 max-md:gap-1 max-md:text-[2.8vw]"
          style={{ color: '#f5f5f7', opacity: hintOpacity }}
        >
          <span>Scroll</span>
          <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
            className="animate-bounce max-md:h-[4vw] max-md:w-[4vw]"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
