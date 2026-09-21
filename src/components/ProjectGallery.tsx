'use client';

import MorphGallery, { type MorphItem } from '@/components/MorphGallery';

export default function ProjectGallery({ images }: { images: string[] }) {
  if (images.length < 2) return null;

  const items: MorphItem[] = images.map((src, i) => ({
    src,
    alt: `项目截图 ${i + 1}`,
  }));

  return (
    <div className="mb-12">
      <MorphGallery
        items={items}
        height="clamp(260px, 42vw, 440px)"
        autoplay={5000}
        duration={1400}
        noiseScale={3.2}
        edge={0.18}
        drift={0.45}
      />
    </div>
  );
}
