export interface Block {
  title: string;
  count: number;
  href: string;
  image?: {
    light: string;
    dark: string;
  };
}

export const blocks: Block[] = [
  {
    title: "Layouts",
    count: 5,
    href: "/layouts",
    image: { light: '/images/blocks/layout.png', dark: '/images/blocks/layout-dark.png' },
  },
  {
    title: "Hero sections",
    count: 5,
    href: "/hero-sections",
    image: { light: '/images/blocks/hero.png', dark: '/images/blocks/hero-dark.png' },
  },
  {
    title: "Feature sections",
    count: 5,
    href: "/feature-sections",
    image: { light: '/images/blocks/feature.png', dark: '/images/blocks/feature-dark.png' },
  },
  {
    title: "Pricing plans",
    count: 5,
    href: "/pricing-plans",
    image: { light: '/images/blocks/pricing.png', dark: '/images/blocks/pricing-dark.png' },
  },
  {
    title: "Stats",
    count: 5,
    href: "/stats",
    image: { light: '/images/blocks/stats.png', dark: '/images/blocks/stats-dark.png' },
  },
  {
    title: "Testimonials",
    count: 5,
    href: "/testimonials",
    image: { light: '/images/blocks/testimonial.png', dark: '/images/blocks/testimonial-dark.png' },
  },
  {
    title: "Team sections",
    count: 5,
    href: "/team-sections",
    image: { light: '/images/blocks/team.png', dark: '/images/blocks/team-dark.png' },
  },
  {
    title: "CTA sections",
    count: 5,
    href: "/cta-sections",
    image: { light: '/images/blocks/cta.png', dark: '/images/blocks/cta-dark.png' },
  },
  {
    title: "Footers",
    count: 5,
    href: "/footers",
    image: { light: '/images/blocks/footer.png', dark: '/images/blocks/footer-dark.png' },
  },
  {
    title: "Authentication",
    count: 5,
    href: "/authentication-forms",
    image: { light: '/images/blocks/auth.png', dark: '/images/blocks/auth-dark.png' },
  },
];
