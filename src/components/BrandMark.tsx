type BrandMarkProps = {
  className?: string;
};

export function BrandMark({ className }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <rect x="4" y="4" width="56" height="56" rx="18" fill="url(#brand-bg)" />
      <circle cx="45" cy="18" r="7" fill="url(#brand-sun)" fillOpacity="0.95" />
      <path
        d="M32 12C23.716 12 17 18.716 17 27C17 36.8 26.936 45.841 30.3 48.716C31.291 49.563 32.709 49.563 33.7 48.716C37.064 45.841 47 36.8 47 27C47 18.716 40.284 12 32 12Z"
        fill="#FFF7ED"
      />
      <circle cx="32" cy="27" r="6.75" fill="url(#brand-core)" />
      <path
        d="M18 45C22.667 41.333 27.333 39.5 32 39.5C37.867 39.5 42.2 42.033 45 47.1"
        stroke="#FDE68A"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <circle cx="17" cy="45" r="3" fill="#FFF7ED" />
      <path
        d="M29 28.5C30.6 26.067 32.933 24.833 36 24.8"
        stroke="#F8FAFC"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="brand-bg" x1="10" y1="8" x2="54" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0F766E" />
          <stop offset="0.48" stopColor="#1D4ED8" />
          <stop offset="1" stopColor="#1E3A8A" />
        </linearGradient>
        <linearGradient
          id="brand-sun"
          x1="41"
          y1="12"
          x2="49"
          y2="24"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FDE68A" />
          <stop offset="1" stopColor="#FB7185" />
        </linearGradient>
        <linearGradient
          id="brand-core"
          x1="26"
          y1="21"
          x2="38"
          y2="33"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FDBA74" />
          <stop offset="1" stopColor="#F43F5E" />
        </linearGradient>
      </defs>
    </svg>
  );
}
