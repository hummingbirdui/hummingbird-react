"use client";

import { Button, Text } from "@hummingbirdui/react";

const columns = [
  {
    title: "Social",
    links: ["Twitter (X)", "Instagram", "LinkedIn"],
  },
  {
    title: "Studio",
    links: ["Projects", "Lab", "Archive"],
  },
];

export default function Footer4() {
  return (
    <footer className="mx-auto max-w-7xl px-6 lg:px-8 pt-6">
      <div className="relative flex flex-col gap-16 lg:flex-row lg:items-start lg:justify-between overflow-hidden py-10">
        <div className="max-w-xl z-10">
          <Text as="h2" size="4xl" className="sm:text-6xl mb-6">
            Ready to build the{" "}
            <span className="text-primary underline decoration-primary/30">
              future
            </span>
            ?
          </Text>
          <Text size="lg" className="text-muted mb-8">
            Join 5,000+ creators and engineers pushing the boundaries of
            what&apos;s possible on the web.
          </Text>
          <div className="flex gap-3">
            <Button
              asChild
              color="neutral"
              size="lg"
              className="rounded-full px-8 dark:bg-white dark:text-black"
            >
              <a href="#">Get Started</a>
            </Button>
            <Button
              asChild
              variant="outline"
              color="neutral"
              size="lg"
              className="rounded-full px-8"
            >
              <a href="#">Contact Us</a>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-12 sm:grid-cols-3">
          {columns.map((column) => (
            <div key={column.title} className="space-y-4">
              <Text
                size="sm"
                fontWeight="bold"
                className="uppercase tracking-widest"
              >
                {column.title}
              </Text>
              <ul className="space-y-3 text-sm list-none p-0 mb-0">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-muted hover:text-primary no-underline transition"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Text
          as="h1"
          fontWeight="black"
          className="absolute -left-10 -bottom-1/5 text-[12vw] leading-none tracking-tighter text-muted/5 dark:text-muted/10 sm:text-[15vw] pointer-events-none"
        >
          HUMMINGBIRD
        </Text>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-subtle/60 py-8">
        <div className="flex items-center gap-2">
          <div className="size-1.75 rounded-full bg-primary" />
          <span className="text-xs font-medium tracking-widest uppercase text-muted">
            Built in 2026
          </span>
        </div>
        <Text size="xs" className="text-muted mb-0">
          &copy; All Rights Reserved &bull;{" "}
          <a href="#" className="text-muted no-underline">
            Privacy
          </a>{" "}
          &bull;{" "}
          <a href="#" className="text-muted no-underline">
            Terms
          </a>
        </Text>
      </div>
    </footer>
  );
}
