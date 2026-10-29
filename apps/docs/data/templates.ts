export interface Template {
  title: string;
  category: string;
  description: string;
  tags: string[];
  previewLink: string;
  buyLink: string;
  previewImages: string[];
}

const previewImages = (name: string) =>
  Array.from(
    { length: 6 },
    (_, index) => `/images/templates/${name}-${index + 1}.png`,
  );

export const templates: Template[] = [
  {
    title: "Phoenix Tailwind React",
    category: "Dashboard & Web app Template",
    description:
      "A modern template featuring reusable layouts, dedicated app modules, prebuilt pages, and thoughtfully crafted UI components.",
    tags: [
      "216 HTML files",
      "10 Layouts",
      "14 Apps",
      "27+ Components",
      "Light & Dark mode",
    ],
    previewLink: "https://phoenix-tailwind-react.prium.me/showcase",
    buyLink: "https://themewagon.com/themes/phoenix-tailwind-react/",
    previewImages: previewImages("phoenix"),
  },
  {
    title: "Falcon Tailwind React",
    category: "Dashboard & Web app Template",
    description:
      "A comprehensive template featuring reusable layouts, app modules, prebuilt pages, and a rich collection of UI components.",
    tags: [
      "200+ HTML files",
      "10+ Modules",
      "40+ Components",
      "Light & Dark mode",
    ],
    previewLink: "https://falcon-tailwind-react.prium.me/",
    buyLink: "https://themewagon.com/themes/falcon-tailwind-react/",
    previewImages: previewImages("falcon"),
  },
];
