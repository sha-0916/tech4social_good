type LogoMarkProps = { size?: number; className?: string };

export default function LogoMark({ size = 56, className = "" }: LogoMarkProps) {
  const px = `${size}px`;
  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      role="img"
      aria-label="ClimateLens logo"
    >
      <defs>
        <linearGradient id="lensGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#9333ea" />
        </linearGradient>
      </defs>
      <circle cx="28" cy="28" r="16" stroke="url(#lensGrad)" strokeWidth="4" fill="rgba(255,255,255,0.06)" />
      <circle cx="24" cy="24" r="6" fill="rgba(255,255,255,0.25)" />
      <rect x="38" y="38" width="16" height="6" rx="3" transform="rotate(45 38 38)" fill="url(#lensGrad)" />
      <path d="M46 16c5 1 8 5 8 10-5-1-9-4-8-10Z" fill="#22c55e" opacity="0.9"/>
      <path d="M46 16c2 4 1 7-2 10-1-5 0-8 2-10Z" fill="#16a34a" opacity="0.9"/>
    </svg>
  );
}
