interface BadgeProps {
  children: React.ReactNode;
}

export default function Badge({ children }: BadgeProps) {
  return (
    <span className="inline-flex items-center font-mono text-[11px] px-2 py-0.5 rounded-sm bg-white/5 text-dim border border-white/5">
      {children}
    </span>
  );
}
