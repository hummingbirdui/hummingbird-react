"use client";

import { Globe } from "lucide-react";
import { Button, Divider, Input, Text } from "@hummingbirdui/react";

const columns = [
  {
    title: "Product",
    links: ["UI Components", "Templates", "Design System", "Changelog"],
  },
  {
    title: "Resources",
    links: ["Documentation", "Guides", "API Reference", "Community"],
  },
  {
    title: "Company",
    links: ["About Us", "Blog", "Partners"],
  },
  {
    title: "Support",
    links: ["Help Center", "System Status", "Live Chat"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Security"],
  },
];

const socials = [
  {
    label: "GitHub",
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "X",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M11.3399 8.89916L16.5761 2.8125H15.3353L10.7888 8.09761L7.15734 2.8125H2.96875L8.46 10.8044L2.96875 17.1875H4.2096L9.01085 11.606L12.8461 17.1875H17.0347L11.3393 8.89916H11.3399ZM9.64019 10.8749L9.08388 10.0791L4.65666 3.74659H6.56279L10.1356 8.8569L10.6919 9.6527L15.3358 16.2957H13.4297L9.64019 10.8749Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "Discord",
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  },
];

export default function Footer2() {
  return (
    <footer className="mx-auto max-w-7xl px-6">
      <div className="flex flex-col items-center justify-between gap-10 py-6 border-b border-subtle lg:flex-row">
        <div className="max-w-md text-center lg:text-left">
          <a href="#">
            <img
              src="https://themewagon.com/wp-content/themes/themewagon/dist/images/hb.png"
              alt="hummingbird"
              className="h-14 mb-3 mx-auto lg:mx-0"
            />
          </a>
          <Text size="sm" className="text-muted mb-0">
            Build faster interfaces with a modern Tailwind CSS system designed
            for performance, flexibility, and beautiful user experiences.
          </Text>
        </div>
        <div className="w-full max-w-md">
          <Text
            as="h4"
            size="sm"
            fontWeight="semibold"
            className="text-default mb-3 text-center lg:text-left"
          >
            Subscribe to our newsletter
          </Text>
          <div className="flex items-center gap-2 w-full max-w-90 mb-2 mx-auto lg:mx-0">
            <Input
              variant="fill"
              type="text"
              placeholder="Email address"
              aria-label="Email address"
            />
            <Button variant="subtle" className="shrink-0">
              Subscribe
            </Button>
          </div>
          <Text size="xs" className="text-subtle text-center lg:text-left mb-0">
            No spam, just updates. Unsubscribe at any time.
          </Text>
        </div>
      </div>
      <div className="py-10 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
        {columns.map((column) => (
          <div key={column.title}>
            <Text
              as="h3"
              size="xs"
              fontWeight="bold"
              className="uppercase tracking-wider text-default mb-5"
            >
              {column.title}
            </Text>
            <ul className="space-y-3 list-none p-0 mb-0">
              {column.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-muted hover:text-default no-underline transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex flex-col-reverse items-center justify-between gap-6 border-t border-subtle py-3 md:flex-row">
        <div className="flex flex-col items-center gap-2 md:items-start md:gap-4 md:flex-row">
          <span className="text-sm text-muted">
            &copy; 2026 Hummingbird Inc.
          </span>
          <Divider orientation="vertical" className="h-4 hidden md:block" />
          <Button
            color={null}
            className="p-0 bg-transparent gap-1.5 text-sm font-normal opacity-70 hover:opacity-100 transition"
          >
            <Globe className="size-4" />
            English (US)
          </Button>
        </div>
        <div className="flex items-center gap-2">
          {socials.map((social) => (
            <a
              key={social.label}
              href="#"
              className="p-2 text-muted hover:text-default rounded-full transition"
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
