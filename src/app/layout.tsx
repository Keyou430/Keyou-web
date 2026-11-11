import type { Metadata } from 'next';
import MouseGlow from '@/components/MouseGlow';
import Navbar from '@/components/Navbar';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://web.keyou.ccwu.cc'),
  title: {
    default: 'Keyou Web — 陈源富的技术作品集',
    template: '%s | Keyou Web',
  },
  description: '电子信息工程在读，专注于嵌入式系统与硬件开发，探索 AI 驱动的全栈与 Vibe Coding 实践。',
  keywords: [
    'Keyou',
    '陈源富',
    '嵌入式开发',
    'STM32',
    '51单片机',
    'EDA设计',
    'LangChain',
    'RAG',
    'Vibe Coding',
    '个人作品集',
  ],
  authors: [{ name: 'Keyou (陈源富)', url: 'https://github.com/Keyou430' }],
  creator: '陈源富 (Keyou)',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://web.keyou.ccwu.cc',
    siteName: 'Keyou Web',
    title: 'Keyou Web — 陈源富的技术作品集',
    description: '电子信息工程在读，专注于嵌入式系统与硬件开发，探索 AI 驱动的全栈与 Vibe Coding 实践。',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Keyou Web Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Keyou Web — 陈源富的技术作品集',
    description: '电子信息工程在读，专注于嵌入式系统与硬件开发，探索 AI 驱动的全栈与 Vibe Coding 实践。',
    images: ['/og-image.png'],
    creator: '@Keyou430',
  },
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.svg',
  },
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
          <div className="mx-auto mt-6 h-[2px] w-24 rainbow-divider" aria-hidden="true" />
        </footer>
      </body>
    </html>
  );
}
