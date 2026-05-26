'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const WORD_LIST = ['portfolio', 'projects', 'blog', 'code', 'engineering'];

const NAV_ITEMS = [
  { href: '/#projects', label: '/projects' },
  { href: '/#stack', label: '/stack' },
  { href: '/#contact', label: '/contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [typeText, setTypeText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  // Typewriter tick
  useEffect(() => {
    const word = WORD_LIST[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting) {
      if (charIdx < word.length) {
        timeout = setTimeout(() => setCharIdx(charIdx + 1), 90);
      } else {
        timeout = setTimeout(() => setDeleting(true), 1800);
      }
    } else {
      if (charIdx > 0) {
        timeout = setTimeout(() => setCharIdx(charIdx - 1), 50);
      } else {
        setDeleting(false);
        setWordIdx((wordIdx + 1) % WORD_LIST.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx]);

  // Sync typeText
  useEffect(() => {
    setTypeText(WORD_LIST[wordIdx].slice(0, charIdx));
  }, [charIdx, wordIdx]);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => setMenuOpen(false);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <nav className="sticky top-0 z-50 glass border-x-0 border-t-0 rounded-none border-b-white/10">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        {/* Left */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="font-mono text-base font-bold text-foreground no-underline tracking-tight"
          >
            <span className="text-accent">&gt;</span> Keyou Web
          </Link>
          <span className="hidden font-mono text-[13px] text-dim sm:inline-block min-w-[80px]">
            {typeText}
            <span className="inline-block w-[1px] h-[14px] bg-accent ml-0.5 align-[-2px] animate-blink" />
          </span>
        </div>

        {/* Right — desktop */}
        <ul className="hidden items-center gap-6 sm:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="font-mono text-[13px] text-muted no-underline transition-colors hover:text-accent"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger — mobile */}
        <button
          className="flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1 sm:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-[1.5px] bg-foreground transition-transform duration-200 ${
              menuOpen ? 'translate-y-[6.5px] rotate-45' : ''
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-foreground transition-opacity duration-200 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-foreground transition-transform duration-200 ${
              menuOpen ? '-translate-y-[6.5px] -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`flex-col gap-0 border-t border-white/10 px-6 pb-3 pt-1 sm:hidden ${
          menuOpen ? 'flex' : 'hidden'
        }`}
      >
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="font-mono text-sm text-muted no-underline py-3 border-b border-white/5 last:border-b-0 hover:text-accent"
            onClick={closeMenu}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
