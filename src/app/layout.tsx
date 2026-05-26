import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import './globals.css';

export const metadata: Metadata = {
  title: 'Keyou Web',
  description: 'Keyou 的个人技术作品集 — 工程、项目与笔记。',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <Navbar />
        <main className="relative-z mx-auto max-w-5xl px-6 pb-24">
          {children}
        </main>
        <footer className="relative-z border-t border-white/5 py-10 text-center font-mono text-xs text-dim">
          {'/* '}&copy; {new Date().getFullYear()} Keyou Web{' */'}
        </footer>
      </body>
    </html>
  );
}
