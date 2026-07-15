'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const WORD_LIST = ['作品', '博客', '笔记', '开源', '工程'];

const NAV_ITEMS = [
  { href: '/#projects', label: '作品' },
  { href: '/#stack', label: '技术栈' },
  { href: '/#contact', label: '联系' },
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
    <nav className="sticky top-0 z-50 backdrop-blur-2xl border-b border-white/[0.06] rounded-none"
      style={{ background: 'rgba(10, 10, 15, 0.78)' }}
    >
      <div className="mx-auto flex h-12 max-w-5xl items-center justify-between px-6">
        {/* Left */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="font-sans text-[15px] font-semibold text-foreground no-underline tracking-tight"
          >
            Keyou Web
          </Link>
          <span className="hidden font-mono text-[12px] text-dim/60 sm:inline-block min-w-[80px]">
            {typeText}
            <span className="inline-block w-[1px] h-[13px] bg-accent/70 ml-0.5 align-[-2px] animate-blink" />
          </span>
        </div>

        {/* Right — desktop */}
        <ul className="hidden items-center gap-7 sm:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="font-sans text-[13px] text-muted/80 no-underline transition-colors duration-200 hover:text-foreground"
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
        className={`flex-col gap-0 border-t border-white/[0.06] px-6 pb-3 pt-1 sm:hidden ${
          menuOpen ? 'flex' : 'hidden'
        }`}
      >
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="font-sans text-[14px] text-muted/80 no-underline py-3 border-b border-white/[0.04] last:border-b-0 hover:text-foreground transition-colors"
            onClick={closeMenu}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
