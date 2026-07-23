import Link from "next/link";
import { ReactNode } from "react";

export interface Faq {
  question: string;
  answer: ReactNode | string;
}

export interface FaqTab {
  label: string;
  value: string;
  faqs: Faq[];
}

export const faqs: Faq[] = [
  {
    question: "What is Hummingbird UI?",
    answer:
      "Hummingbird UI is an open-source component framework built on Tailwind CSS. It provides production-ready UI components with semantic markup, flexible theming, and a scalable design system.",
  },
  {
    question: "Can I use Hummingbird with React?",
    answer: (
      <>
        Yes. Not only HB seamlessly works with React apps, it also comes with a{" "}
        <Link
          href="https://react.hbui.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          React version
        </Link>{" "}
        that includes clean JSX syntax for React developers.
      </>
    ),
  },
  {
    question: "Do I need to know Tailwind CSS?",
    answer:
      "Basic knowledge of Tailwind CSS is recommended. Hummingbird builds on Tailwind's utility-first approach while providing cleaner component classes and easier customization.",
  },
  {
    question: "Is Hummingbird UI open source?",
    answer:
      "Yes. The framework is open source, allowing you to use, customize, and extend it in both personal and commercial projects according to its license.",
  },
];

export const faqTabs: FaqTab[] = [
  {
    label: "General",
    value: "general",
    faqs: [
      {
        question: "What is Hummingbird UI?",
        answer:
          "Hummingbird UI is an open-source component framework built on Tailwind CSS. It provides production-ready UI components with semantic markup, flexible theming, and a scalable design system.",
      },
      {
        question: "Is Hummingbird UI framework agnostic?",
        answer:
          "Yes. Hummingbird UI works with plain HTML and integrates seamlessly with modern frameworks such as React, Next.js, Vue, Astro, Angular, Svelte, and others.",
      },
      {
        question: "Do I need to know Tailwind CSS?",
        answer:
          "Basic knowledge of Tailwind CSS is recommended. Hummingbird builds on Tailwind's utility-first approach while providing cleaner component classes and easier customization.",
      },
      {
        question: "Is Hummingbird UI open source?",
        answer:
          "Yes. The framework is open source, allowing you to use, customize, and extend it in both personal and commercial projects according to its license.",
      },
    ],
  },
  {
    label: "Features",
    value: "features",
    faqs: [
      {
        question:
          "What makes Hummingbird UI different from using Tailwind alone?",
        answer:
          "Hummingbird reduces repetitive utility classes by introducing semantic component classes while preserving the flexibility to use Tailwind utilities whenever needed.",
      },
      {
        question: "Can I customize the default theme?",
        answer:
          "Absolutely. Hummingbird uses CSS variables and design tokens, making it easy to change colors, typography, spacing, and other design properties globally or per component.",
      },
      {
        question: "Does Hummingbird support dark mode?",
        answer:
          "Yes. Built-in dark mode and multiple color themes are included, allowing you to switch themes with minimal configuration.",
      },
      {
        question: "Are the components optimized for production?",
        answer:
          "Yes. Components are designed for production with clean markup, zero unnecessary CSS, modern JavaScript, and a consistent design system for maintainable applications.",
      },
    ],
  },
  {
    label: "Pricing",
    value: "pricing",
    faqs: [
      {
        question: "Is Hummingbird UI free to use?",
        answer:
          "Yes. Hummingbird UI is open source and free to use. You can start building immediately without purchasing a license.",
      },
      {
        question: "Can I use Hummingbird UI in commercial projects?",
        answer:
          "Yes. You can use Hummingbird UI in personal, client, and commercial projects in accordance with its open-source license.",
      },
      {
        question: "Are there any hidden fees?",
        answer:
          "No. The core framework is free to use. Check the official documentation for any optional premium resources or services that may be offered separately.",
      },
      {
        question: "Do I need a subscription to receive updates?",
        answer:
          "No. As an open-source project, updates are available through the project's package releases.",
      },
    ],
  },
  {
    label: "Support",
    value: "support",
    faqs: [
      {
        question: "Where can I find the documentation?",
        answer:
          "Comprehensive documentation includes installation guides, component examples, customization options, and framework integrations to help you get started quickly.",
      },
      {
        question: "How can I report a bug or request a feature?",
        answer:
          "You can submit bug reports, feature requests, or contribute through the project's GitHub repository and community channels.",
      },
      {
        question: "Does Hummingbird provide integration guides?",
        answer:
          "Yes. Integration guides are available for popular frameworks, making it easy to use Hummingbird in different development environments.",
      },
      {
        question: "Can I contribute to Hummingbird UI?",
        answer:
          "Absolutely. Community contributions are welcome, whether it's improving documentation, fixing bugs, or adding new components and features.",
      },
    ],
  },
];
