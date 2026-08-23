export interface Framework {
  name: string;
  logo: { light: string; dark: string };
  url: string;
}

export const frameworks: Framework[] = [
  {
    name: "Next.js",
    logo: {
      light: "/images/frameworks/nextjs.svg",
      dark: "/images/frameworks/nextjs-dark.svg",
    },
    url: "/docs/getting-started/framework-guides/nextjs",
  },
  {
    name: "Vite",
    logo: {
      light: "/images/frameworks/vite.svg",
      dark: "/images/frameworks/vite.svg",
    },
    url: "/docs/getting-started/framework-guides/vite",
  },
  {
    name: "Astro",
    logo: {
      light: "/images/frameworks/astro.svg",
      dark: "/images/frameworks/astro-dark.svg",
    },
    url: "/docs/getting-started/framework-guides/astro",
  },
  {
    name: "React Router",
    logo: {
      light: "/images/frameworks/react-router.svg",
      dark: "/images/frameworks/react-router.svg",
    },
    url: "/docs/getting-started/framework-guides/react-router",
  },
  {
    name: "Gatsby",
    logo: {
      light: "/images/frameworks/gatsby.svg",
      dark: "/images/frameworks/gatsby.svg",
    },
    url: "/docs/getting-started/framework-guides/gatsby",
  },
];
