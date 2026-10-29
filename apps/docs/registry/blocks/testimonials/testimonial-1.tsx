"use client";

import { Star } from "lucide-react";
import { Card, Text } from "@hummingbirdui/react";

export default function Testimonial1() {
  return (
    <section className="px-6 py-20">
      <Card className="p-6 sm:p-14 border-subtle rounded-3xl max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg"
            alt="Microsoft Logo"
            className="h-6"
          />
          <div className="flex items-center gap-1">
            <Star className="size-5 text-warning" fill="currentColor" />
            <span className="text-sm text-subtle font-black italic uppercase">
              Review 03/26
            </span>
          </div>
        </div>
        <Text
          as="blockquote"
          size="2xl"
          fontWeight="medium"
          className="relative md:text-3xl text-default mb-10"
        >
          <span className="absolute -top-6 -left-12 text-8xl text-primary-light/25 select-none">
            <svg className="size-20" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621c.537-.278 1.24-.375 1.929-.311c1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5a3.87 3.87 0 0 1-2.748-1.179m10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621c.537-.278 1.24-.375 1.929-.311c1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5a3.87 3.87 0 0 1-2.748-1.179"
              />
            </svg>
          </span>
          The attention to detail is{" "}
          <span className="underline decoration-primary-light/25 decoration-4 underline-offset-4">
            staggering
          </span>
          . It&apos;s rare to find a tool that balances power with such a clean,
          effortless user experience.
        </Text>
        <div className="flex items-center gap-4">
          <img
            className="size-16 border-3 border-white dark:border-subtle rounded-xl shadow-sm"
            src="https://i.pravatar.cc/150?u=5"
            alt="Author"
          />
          <div>
            <Text
              as="h5"
              size="lg"
              fontWeight="medium"
              className="text-default"
            >
              Julianne Sterling
            </Text>
            <span className="text-sm text-muted">
              Design Director @Microsoft
            </span>
          </div>
        </div>
      </Card>
    </section>
  );
}
