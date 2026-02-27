export function FrameSentinelLogo({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Shield Background */}
      <path
        d="M50 10L20 25V45C20 65 35 80 50 90C65 80 80 65 80 45V25L50 10Z"
        fill="url(#gradient1)"
        stroke="#10b981"
        strokeWidth="2"
      />
      
      {/* Frame/Scan Lines */}
      <rect x="35" y="35" width="30" height="30" fill="none" stroke="#10b981" strokeWidth="2" rx="2" />
      <line x1="30" y1="50" x2="70" y2="50" stroke="#10b981" strokeWidth="1" opacity="0.6" />
      <line x1="50" y1="30" x2="50" y2="70" stroke="#10b981" strokeWidth="1" opacity="0.6" />
      
      {/* Eye/Sentinel Symbol */}
      <circle cx="50" cy="50" r="8" fill="#10b981" />
      <circle cx="50" cy="50" r="4" fill="#0f1419" />
      
      {/* Corner Brackets */}
      <path d="M32 32 L32 38 M32 32 L38 32" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
      <path d="M68 32 L68 38 M68 32 L62 32" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
      <path d="M32 68 L32 62 M32 68 L38 68" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
      <path d="M68 68 L68 62 M68 68 L62 68" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
      
      <defs>
        <linearGradient id="gradient1" x1="20" y1="10" x2="80" y2="90">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#0f1419" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function FrameSentinelIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2L4 6V11C4 16 8 20 12 22C16 20 20 16 20 11V6L12 2Z"
        fill="currentColor"
        opacity="0.2"
      />
      <path
        d="M12 2L4 6V11C4 16 8 20 12 22C16 20 20 16 20 11V6L12 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
