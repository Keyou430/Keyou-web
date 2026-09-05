import type { Metadata } from 'next';
import MouseGlow from '@/components/MouseGlow';
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
        <MouseGlow />
        <Navbar />
        <main className="relative-z mx-auto max-w-5xl px-6 pb-32">
          {children}
        </main>
        <footer className="relative-z border-t border-white/[0.04] py-12 text-center font-sans text-xs text-dim tracking-wide">
          &copy; {new Date().getFullYear()} Keyou Web
        </footer>
      </body>
    </html>
  );
}
