export type BlockEntry = {
  /** Unique across categories; used in the preview URL `/blocks-preview/<name>/`. */
  name: string;
  title: string;
  /** Path under `registry/blocks/`. */
  file: string;
  /** Classes for the preview iframe, usually a min-height. */
  className?: string;
};

export type BlockCategory = {
  slug: string;
  /** Card title on the blocks index. */
  title: string;
  /** Heading on the category page. */
  pageTitle: string;
  description: string;
  image: { light: string; dark: string };
  blocks: BlockEntry[];
};

export const blockCategories: BlockCategory[] = [
  {
    slug: "layouts",
    title: "Layouts",
    pageTitle: "Layouts",
    description:
      "Explore a variety of Tailwind CSS layout examples and templates to help you build responsive and visually appealing web pages. These layouts include a range of different styles and structures to suit various types of websites and applications.",
    image: {
      light: "/images/blocks/layout.png",
      dark: "/images/blocks/layout-dark.png",
    },
    blocks: [
      {
        name: "layout-1",
        title: "A simple sidebar with navigation grouped by section",
        file: "layouts/layout-1.tsx",
        className: "min-h-225",
      },
      {
        name: "layout-2",
        title: "A responsive sidebar with a search bar",
        file: "layouts/layout-2.tsx",
        className: "min-h-225",
      },
      {
        name: "layout-3",
        title: "A sidebar with collapsible sections",
        file: "layouts/layout-3.tsx",
        className: "min-h-225",
      },
      {
        name: "layout-4",
        title: "A sidebar with submenus as dropdowns",
        file: "layouts/layout-4.tsx",
        className: "min-h-225",
      },
    ],
  },
  {
    slug: "hero-sections",
    title: "Hero sections",
    pageTitle: "Hero sections",
    description:
      "Use these Tailwind CSS hero section examples to add important messaging, product photos, and call-to-actions to the top of your website. These hero examples include a variety of different styles and layouts.",
    image: {
      light: "/images/blocks/hero.png",
      dark: "/images/blocks/hero-dark.png",
    },
    blocks: [
      {
        name: "hero-1",
        title: "Full-screen overlay with centered content",
        file: "hero-sections/hero-1.tsx",
        className: "min-h-174",
      },
      {
        name: "hero-2",
        title: "Split with image",
        file: "hero-sections/hero-2.tsx",
        className: "min-h-206",
      },
      {
        name: "hero-3",
        title: "Centered content with brands logo",
        file: "hero-sections/hero-3.tsx",
        className: "min-h-252.5",
      },
      {
        name: "hero-4",
        title: "Grid view cards for e-commerce landing",
        file: "hero-sections/hero-4.tsx",
        className: "min-h-263",
      },
      {
        name: "hero-5",
        title: "Video background",
        file: "hero-sections/hero-5.tsx",
        className: "min-h-190",
      },
    ],
  },
  {
    slug: "feature-sections",
    title: "Feature sections",
    pageTitle: "Feature Sections",
    description:
      "Explore Tailwind CSS feature section examples to showcase the key features of your product or service. These blocks offer a range of layouts and styles, making it easy to present information clearly and effectively.",
    image: {
      light: "/images/blocks/feature.png",
      dark: "/images/blocks/feature-dark.png",
    },
    blocks: [
      {
        name: "feature-1",
        title: "Simple feature cards",
        file: "feature-sections/feature-1.tsx",
        className: "min-h-230",
      },
      {
        name: "feature-2",
        title: "Split feature layout with image",
        file: "feature-sections/feature-2.tsx",
        className: "min-h-170",
      },
      {
        name: "feature-3",
        title: "Bento grid layout feature section",
        file: "feature-sections/feature-3.tsx",
        className: "min-h-340",
      },
      {
        name: "feature-4",
        title: "Asymmetric feature layout",
        file: "feature-sections/feature-4.tsx",
        className: "min-h-235",
      },
      {
        name: "feature-5",
        title: "Feature layout with side columns and central image",
        file: "feature-sections/feature-5.tsx",
        className: "min-h-215",
      },
    ],
  },
  {
    slug: "pricing-plans",
    title: "Pricing plans",
    pageTitle: "Pricing plans",
    description:
      "Explore a variety of Hummingbird pricing plan examples and templates to help you build responsive and visually appealing web pages. These pricing plans include a range of different styles and structures to suit various types of websites and applications.",
    image: {
      light: "/images/blocks/pricing.png",
      dark: "/images/blocks/pricing-dark.png",
    },
    blocks: [
      {
        name: "pricing-1",
        title: "Three column card layout with icon",
        file: "pricing-plans/pricing-1.tsx",
        className: "min-h-228.5",
      },
      {
        name: "pricing-2",
        title: "Minimal cards with billing toggle",
        file: "pricing-plans/pricing-2.tsx",
        className: "min-h-193",
      },
      {
        name: "pricing-3",
        title: "Three column bordered card layout",
        file: "pricing-plans/pricing-3.tsx",
        className: "min-h-218",
      },
      {
        name: "pricing-4",
        title: "Grid layout with gradient background accents",
        file: "pricing-plans/pricing-4.tsx",
        className: "min-h-315",
      },
      {
        name: "pricing-5",
        title: "Table-based pricing comparison",
        file: "pricing-plans/pricing-5.tsx",
        className: "min-h-265",
      },
    ],
  },
  {
    slug: "stats",
    title: "Stats",
    pageTitle: "Stats",
    description:
      "Explore Tailwind CSS stat section examples to display key metrics and important numbers for your product or service. These blocks include a variety of layouts and styles to help you present data clearly and effectively.",
    image: {
      light: "/images/blocks/stats.png",
      dark: "/images/blocks/stats-dark.png",
    },
    blocks: [
      {
        name: "stat-1",
        title: "Stat cards with trend indicators",
        file: "stats/stat-1.tsx",
        className: "min-h-50",
      },
      {
        name: "stat-2",
        title: "Stat cards with performance trends",
        file: "stats/stat-2.tsx",
        className: "min-h-65",
      },
      {
        name: "stat-3",
        title: "Stat cards with actions",
        file: "stats/stat-3.tsx",
        className: "min-h-65",
      },
      {
        name: "stat-4",
        title: "Stat cards with charts status indicators",
        file: "stats/stat-4.tsx",
        className: "min-h-69",
      },
      {
        name: "stat-5",
        title: "Stat cards with mixed data indicators",
        file: "stats/stat-5.tsx",
        className: "min-h-65",
      },
    ],
  },
  {
    slug: "testimonials",
    title: "Testimonials",
    pageTitle: "Testimonials",
    description:
      "Explore a collection of Tailwind CSS testimonial section examples designed to highlight customer feedback and build trust with your audience. These layouts feature a variety of styles and structures, making them easy to integrate into any website or product.",
    image: {
      light: "/images/blocks/testimonial.png",
      dark: "/images/blocks/testimonial-dark.png",
    },
    blocks: [
      {
        name: "testimonial-1",
        title: "Single card testimonial with brand",
        file: "testimonials/testimonial-1.tsx",
        className: "min-h-149",
      },
      {
        name: "testimonial-2",
        title: "Split testimonial card with image",
        file: "testimonials/testimonial-2.tsx",
        className: "min-h-173",
      },
      {
        name: "testimonial-3",
        title: "Split testimonial section with heading",
        file: "testimonials/testimonial-3.tsx",
        className: "min-h-200",
      },
      {
        name: "testimonial-4",
        title: "Minimal spotlight testimonial",
        file: "testimonials/testimonial-4.tsx",
        className: "min-h-143",
      },
      {
        name: "testimonial-5",
        title: "Testimonial section with stats cards",
        file: "testimonials/testimonial-5.tsx",
        className: "min-h-155",
      },
    ],
  },
  {
    slug: "team-sections",
    title: "Team sections",
    pageTitle: "Team Sections",
    description:
      "Explore Tailwind CSS team section examples to showcase your team members and roles. These blocks include a variety of layouts and styles to help you present your team in a clear and organized way.",
    image: {
      light: "/images/blocks/team.png",
      dark: "/images/blocks/team-dark.png",
    },
    blocks: [
      {
        name: "team-1",
        title: "Simple team grid with profile cards",
        file: "team-sections/team-1.tsx",
        className: "min-h-265",
      },
      {
        name: "team-2",
        title: "Team section with large image cards",
        file: "team-sections/team-2.tsx",
        className: "min-h-185",
      },
      {
        name: "team-3",
        title: "Square image profile cards",
        file: "team-sections/team-3.tsx",
        className: "min-h-172",
      },
      {
        name: "team-4",
        title: "Bordered grid team cards",
        file: "team-sections/team-4.tsx",
        className: "min-h-150",
      },
      {
        name: "team-5",
        title: "Hover reveal overlay team cards",
        file: "team-sections/team-5.tsx",
        className: "min-h-210",
      },
    ],
  },
  {
    slug: "cta-sections",
    title: "CTA sections",
    pageTitle: "CTA Sections",
    description:
      "Explore Tailwind CSS call-to-action section examples to encourage users to take the next step. These blocks include a variety of layouts and styles to help you create clear and effective actions across your pages.",
    image: {
      light: "/images/blocks/cta.png",
      dark: "/images/blocks/cta-dark.png",
    },
    blocks: [
      {
        name: "cta-1",
        title: "Simple cta card",
        file: "cta-sections/cta-1.tsx",
        className: "min-h-185",
      },
      {
        name: "cta-2",
        title: "Split cta section with feature list and image",
        file: "cta-sections/cta-2.tsx",
        className: "min-h-170",
      },
      {
        name: "cta-3",
        title: "Cta cards with multiple startup options",
        file: "cta-sections/cta-3.tsx",
        className: "min-h-170",
      },
      {
        name: "cta-4",
        title: "Feature cta panel with stats card",
        file: "cta-sections/cta-4.tsx",
        className: "min-h-155",
      },
      {
        name: "cta-5",
        title: "Marketing promo cta banner",
        file: "cta-sections/cta-5.tsx",
        className: "min-h-72",
      },
    ],
  },
  {
    slug: "footers",
    title: "Footers",
    pageTitle: "Footer Sections",
    description:
      "Explore Tailwind CSS footer section examples to organize links, resources, and important information at the bottom of your pages. These blocks include a variety of layouts and styles for clear and structured navigation.",
    image: {
      light: "/images/blocks/footer.png",
      dark: "/images/blocks/footer-dark.png",
    },
    blocks: [
      {
        name: "footer-1",
        title: "Default footer section",
        file: "footers/footer-1.tsx",
        className: "min-h-85",
      },
      {
        name: "footer-2",
        title: "Footer with newsletter",
        file: "footers/footer-2.tsx",
        className: "min-h-120",
      },
      {
        name: "footer-3",
        title: "Multi card footer layout",
        file: "footers/footer-3.tsx",
        className: "min-h-98",
      },
      {
        name: "footer-4",
        title: "Footer layout with cta",
        file: "footers/footer-4.tsx",
        className: "min-h-118",
      },
      {
        name: "footer-5",
        title: "E-commerce footer layout",
        file: "footers/footer-5.tsx",
        className: "min-h-115",
      },
    ],
  },
  {
    slug: "authentication-forms",
    title: "Authentication",
    pageTitle: "Authentication Forms",
    description:
      "Use these Tailwind CSS authentication form examples to build clean and user-friendly sign-in and sign-up experiences for your applications. These layouts are designed with modern UI patterns, responsive behavior, and flexible structures to help you create seamless account access flows.",
    image: {
      light: "/images/blocks/auth.png",
      dark: "/images/blocks/auth-dark.png",
    },
    blocks: [
      {
        name: "signin-1",
        title: "Basic sign-in form",
        file: "authentication-forms/signin-1.tsx",
        className: "min-h-220",
      },
      {
        name: "signin-2",
        title: "Sign-in form with floating labels",
        file: "authentication-forms/signin-2.tsx",
        className: "min-h-200",
      },
      {
        name: "signin-3",
        title: "Multi card sign-in layout",
        file: "authentication-forms/signin-3.tsx",
        className: "min-h-170",
      },
      {
        name: "signup-1",
        title: "Split signup layout with marketing panel",
        file: "authentication-forms/signup-1.tsx",
        className: "min-h-260",
      },
      {
        name: "signup-2",
        title: "Split auth layout with signin/signup tabs",
        file: "authentication-forms/signup-2.tsx",
        className: "min-h-260",
      },
    ],
  },
];

export function getBlockCategory(slug: string) {
  return blockCategories.find((category) => category.slug === slug);
}

export function getBlock(name: string) {
  for (const category of blockCategories) {
    const block = category.blocks.find((entry) => entry.name === name);
    if (block) return { block, category };
  }
}

export const allBlocks = blockCategories.flatMap((category) => category.blocks);
