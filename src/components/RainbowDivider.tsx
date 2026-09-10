export default function RainbowDivider({
  className = '',
  strong = false,
}: {
  className?: string;
  strong?: boolean;
}) {
  return (
    <div className={`relative-z my-16 ${className}`} aria-hidden="true">
      <div className={`rainbow-divider ${strong ? 'rainbow-divider--strong' : ''}`} />
      {!strong && <div className="rainbow-divider__glow" />}
    </div>
  );
}
