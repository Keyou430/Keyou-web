interface BadgeProps {
  children: React.ReactNode;
}

export default function Badge({ children }: BadgeProps) {
  return (
    <span className="inline-flex items-center font-sans text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-white/[0.04] text-dim/70 border border-white/[0.05]">
      {children}
    </span>
  );
}
