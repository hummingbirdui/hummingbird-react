import type { ComponentType } from "react";
import GithubIcon from "@/components/icons/GithubIcon";
import TwitterIcon from "@/components/icons/TwitterIcon";
import FacebookIcon from "@/components/icons/FacebookIcon";
import DiscordIcon from "@/components/icons/DiscordIcon";
import DevIcon from "@/components/icons/DevIcon";
import InstagramIcon from "@/components/icons/InstagramIcon";

interface FooterLink {
  title: string;
  links: { label: string; url: string; external?: boolean }[];
}

interface SocialLink {
  name: string;
  url: string;
  icon: ComponentType<{ className?: string }>;
}

interface ProductLink {
  name: string;
  url: string;
  image: string;
  imageDark?: string;
  alt: string;
  description: string;
}

export const footerLinks: FooterLink[] = [
  {
    title: "Resources",
    links: [
      { label: "About Us", url: "https://hbui.dev/about/" },
      { label: "Documentation", url: "/docs/getting-started/installation" },
      { label: "Components", url: "/docs/components/overview" },
      {
        label: "Blog",
        url: "https://hummingbirdui.medium.com/",
        external: true,
      },
    ],
  },
  {
    title: "Policies",
    links: [
      {
        label: "License",
        url: "https://github.com/hummingbirdui/hummingbird/blob/main/LICENSE",
        external: true,
      },
      { label: "Privacy policy", url: "https://hbui.dev/privacy-policy/" },
      {
        label: "Terms & conditions",
        url: "https://hbui.dev/terms-and-conditions/",
      },
      { label: "Brand guideline", url: "https://hbui.dev/brand-guideline/" },
    ],
  },
  {
    title: "Help Center",
    links: [
      { label: "Contact us", url: "mailto:hello@hbui.dev", external: true },
      {
        label: "Hire us",
        url: "https://themewagon.com/hire-us",
        external: true,
      },
    ],
  },
];

export const socialLinks: SocialLink[] = [
  {
    name: "github",
    url: "https://github.com/hummingbirdui/hummingbird-react",
    icon: GithubIcon,
  },
  {
    name: "facebook",
    url: "https://www.facebook.com/HummingbirdUI/",
    icon: FacebookIcon,
  },
  {
    name: "instagram",
    url: "https://www.instagram.com/hummingbird.ui",
    icon: InstagramIcon,
  },
  {
    name: "twitter",
    url: "https://x.com/Hummingbird_UI",
    icon: TwitterIcon,
  },
  {
    name: "discord",
    url: "https://discord.gg/3Uz3HU4z",
    icon: DiscordIcon,
  },
  {
    name: "dev",
    url: "https://dev.to/hummingbirdui",
    icon: DevIcon,
  },
];

export const productLinks: ProductLink[] = [
  {
    name: "themewagon",
    url: "https://themewagon.com/?utm_source=hummingbird&utm_medium=referral&utm_campaign=hb_footer_products&utm_content=themewagon",
    image: "/images/logos/themewagon.svg",
    alt: "themewagon",
    description: "The #1 collection of web templates for you",
  },
  {
    name: "OneSuite",
    url: "https://onesuite.io/?utm_source=hummingbird&utm_medium=referral&utm_campaign=hb_footer_products&utm_content=onesuite",
    image:
      "https://themewagon.com/wp-content/themes/themewagon/dist/images/os.png",
    alt: "OneSuite",
    description: "Simple Client Portal with Integrated Workflows",
  },
  {
    name: "MailBluster",
    url: "https://mailbluster.com/?utm_source=hummingbird&utm_medium=referral&utm_campaign=hb_footer_products&utm_content=mailbluster",
    image:
      "https://themewagon.com/wp-content/themes/themewagon/dist/images/mb.png",
    alt: "MailBluster",
    description: "Affordable, Powerful Email Marketing SaaS",
  },
  {
    name: "OneDesk",
    url: "https://onedesk.so/?utm_source=hummingbird&utm_medium=referral&utm_campaign=hb_footer_products&utm_content=onedesk",
    image: "/images/logos/onedesk.svg",
    imageDark: "/images/logos/onedesk-dark.svg",
    alt: "OneDesk",
    description: "Secure Client Support Platform for Speed & Reliability",
  },
  {
    name: "Gradnet",
    url: "https://gradnet.io/?utm_source=hummingbird&utm_medium=referral&utm_campaign=hb_footer_products&utm_content=gradnet",
    image:
      "https://themewagon.com/wp-content/themes/themewagon/dist/images/gn.png",
    alt: "Gradnet",
    description: "Alumni Management & Fundraising Platform",
  },
];
