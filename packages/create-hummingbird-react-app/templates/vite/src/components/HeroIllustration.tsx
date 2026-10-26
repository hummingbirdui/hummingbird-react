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
      {/* Hummingbird React mark, centered in the inner disc */}
      <g transform="translate(201.672 202) scale(2.4)">
        <rect width="40" height="40" rx="10" fill="url(#hb-hero-mark)" />
        <path
          d="M13.5742 10.148C15.3085 9.07008 18.0988 8.41696 20.1904 11.9761L29.6416 30.7056L24.9932 26.8462C24.0248 26.0425 22.8471 25.5433 21.6621 25.1196C19.0997 24.2036 15.7608 22.1178 14.9014 18.2749C14.5725 16.8042 14.0998 13.8845 12.9531 12.6284C12.6663 12.3143 12.2584 12.1544 11.8564 12.0152L6 9.98586L11.8936 10.5952C12.4855 10.6563 13.0688 10.4622 13.5742 10.148ZM21.9648 13.9341C23.5364 12.4108 28.1632 9.61995 34 10.6724L24.4727 18.9038L21.9648 13.9341ZM15.1016 10.6636C14.5561 10.6636 14.1143 11.1064 14.1143 11.6519C14.1144 12.1972 14.5562 12.6392 15.1016 12.6392C15.6469 12.6391 16.0887 12.1972 16.0889 11.6519C16.0889 11.1064 15.647 10.6636 15.1016 10.6636Z"
          fill="white"
        />
      </g>
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
          id="hb-hero-mark"
          x1="0"
          y1="0.379624"
          x2="40.0028"
          y2="39.6176"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#58C4DC" />
          <stop offset="1" stopColor="#087EA4" />
        </linearGradient>
      </defs>
    </svg>
  );
}
