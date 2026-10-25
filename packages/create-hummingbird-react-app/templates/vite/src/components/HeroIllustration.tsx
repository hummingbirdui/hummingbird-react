import type { ComponentProps } from 'react';

/** Decorative artwork. Colors come from theme tokens, so it follows the active theme and dark mode. */
export function HeroIllustration(props: ComponentProps<'svg'>) {
  return (
    <svg
      width="500"
      height="500"
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <rect width="500" height="500" rx="24" fill="url(#hb-hero-background)" />
      <path
        opacity="0.5"
        d="M250.172 464.5C131.155 464.5 34.6719 368.017 34.6719 249C34.6718 129.983 131.154 33.5 250.172 33.5C369.189 33.5 465.672 129.983 465.672 249C465.672 368.017 369.189 464.5 250.172 464.5Z"
        stroke="var(--color-inverse)"
      />
      <g opacity="0.5" filter="url(#hb-hero-blur)">
        <ellipse
          cx="250.172"
          cy="251"
          rx="140"
          ry="140"
          transform="rotate(180 250.172 251)"
          fill="url(#hb-hero-glow)"
          fillOpacity="0.8"
        />
      </g>
      <path
        opacity="0.32"
        d="M250.172 401.5C167.053 401.5 99.6719 334.119 99.6719 251C99.6719 167.881 167.053 100.5 250.172 100.5C333.291 100.5 400.672 167.881 400.672 251C400.672 334.119 333.291 401.5 250.172 401.5Z"
        stroke="var(--color-inverse)"
      />
      <path
        opacity="0.6"
        d="M249.672 335.5C202.452 335.5 164.172 297.22 164.172 250C164.172 202.78 202.452 164.5 249.672 164.5C296.892 164.5 335.172 202.78 335.172 250C335.172 297.22 296.892 335.5 249.672 335.5Z"
        fill="url(#hb-hero-disc)"
        fillOpacity="0.44"
        stroke="var(--color-inverse)"
      />
      <path
        d="M226.997 220.901C232.943 217.204 242.509 214.964 249.682 227.169L282.089 291.387L266.148 278.157C262.828 275.401 258.793 273.689 254.729 272.237C245.944 269.096 234.495 261.945 231.548 248.768C230.42 243.725 228.799 233.715 224.867 229.408C223.884 228.33 222.487 227.781 221.108 227.303L201.027 220.345L221.236 222.435C223.266 222.645 225.264 221.978 226.997 220.901ZM255.762 233.882C261.148 228.659 277.013 219.089 297.027 222.699L264.359 250.92L255.762 233.882ZM232.252 222.662C230.382 222.662 228.865 224.179 228.865 226.049C228.865 227.92 230.382 229.436 232.252 229.436C234.122 229.436 235.638 227.919 235.638 226.049C235.638 224.179 234.122 222.663 232.252 222.662Z"
        fill="url(#hb-hero-bird)"
      />
      <defs>
        <filter
          id="hb-hero-blur"
          x="1.78478"
          y="2.61291"
          width="496.774"
          height="496.774"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="54.1935" result="effect1_foregroundBlur" />
        </filter>
        <linearGradient
          id="hb-hero-background"
          x1="404.088"
          y1="57.5452"
          x2="86.1668"
          y2="443.455"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.25" stopColor="var(--color-secondary-lighter)" />
          <stop offset="0.75" stopColor="var(--color-primary-lighter)" />
        </linearGradient>
        <radialGradient
          id="hb-hero-glow"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(-169.68 227.36 -233.308 -27.4252 326.332 136.2)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--color-primary-light)" />
          <stop offset="1" stopColor="var(--color-secondary-light)" />
        </radialGradient>
        <linearGradient
          id="hb-hero-disc"
          x1="303.329"
          y1="165"
          x2="196.015"
          y2="335"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--color-inverse)" />
          <stop offset="1" stopColor="var(--color-primary-lighter)" />
        </linearGradient>
        <linearGradient
          id="hb-hero-bird"
          x1="243.678"
          y1="191.812"
          x2="304.621"
          y2="336.174"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1E90FF" />
          <stop offset="0.5" stopColor="#0074E6" />
          <stop offset="1" stopColor="#003970" />
        </linearGradient>
      </defs>
    </svg>
  );
}
