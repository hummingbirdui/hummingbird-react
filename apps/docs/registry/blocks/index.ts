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
    blocks: [],
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
    blocks: [],
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
    blocks: [],
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
    blocks: [],
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
    blocks: [],
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
    blocks: [],
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
    blocks: [],
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
    blocks: [],
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
