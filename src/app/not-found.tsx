import Link from 'next/link';
import RainbowDivider from '@/components/RainbowDivider';

export default function NotFound() {
  return (
    <div className="relative-z min-h-[65vh] flex flex-col items-center justify-center text-center px-4 animate-fade-in">
      <span className="font-mono text-sm uppercase tracking-widest text-accent mb-3">
        404 ERROR
      </span>
      <h1 className="font-sans text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-foreground tracking-tight mb-4">
        页面未找到
      </h1>
      <p className="max-w-md text-muted text-[15px] leading-relaxed mb-8">
        抱歉，您所寻找的项目或页面不存在，可能已被移动或移除。
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <Link href="/" className="btn-glow no-underline">
          返回主页
        </Link>
        <Link href="/#projects" className="btn-ghost no-underline">
          浏览所有项目
        </Link>
      </div>

      <div className="w-full max-w-sm mt-16">
        <RainbowDivider />
      </div>
    </div>
  );
}
