"use client";

import { Triangle } from "lucide-react";
import { Avatar, Card, Divider, Text } from "@hummingbirdui/react";

export default function Testimonial4() {
  return (
    <section className="px-6 py-24">
      <Card className="p-6 md:p-10 rounded-3xl max-w-5xl mx-auto border-subtle">
        <svg
          className="absolute top-6 right-6 sm:top-10 sm:right-10 opacity-15"
          width="45"
          height="36"
          viewBox="0 0 45 36"
          fill="currentColor"
        >
          <path d="M13.5 0C6.044 0 0 6.044 0 13.5c0 4.256 1.954 8.044 5.011 10.511L1.5 36h9l4.5-13.5V0h-1.5zm27 0C33.044 0 27 6.044 27 13.5c0 4.256 1.954 8.044 5.011 10.511L28.5 36h9l4.5-13.5V0h-1.5z" />
        </svg>
        <div className="flex items-center gap-2 mb-10">
          <div className="size-2 rounded-full bg-success-light" />
          <span className="text-xs font-bold uppercase tracking-widest text-subtle">
            Verified Client
          </span>
        </div>
        <Text
          as="blockquote"
          size="2xl"
          fontWeight="medium"
          className="md:text-3xl text-default leading-snug tracking-tight mb-0"
        >
          &quot;The platform didn&apos;t just meet our expectations; it
          completely redefined how we handle scaling. The{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-secondary to-primary font-semibold">
            automation capabilities
          </span>{" "}
          alone saved us over 20 hours a week.&quot;
        </Text>
        <Divider className="border-subtle my-6 lg:my-8" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar size="lg">
              <Avatar.Image
                src="https://i.pravatar.cc/100?img=8"
                alt="Avatar"
                className="grayscale"
              />
            </Avatar>
            <div>
              <Text
                size="base"
                fontWeight="semibold"
                className="text-default mb-0"
              >
                Marcus Thorne
              </Text>
              <span className="text-xs text-subtle">Lead Dev at Stripe</span>
            </div>
          </div>
          <Triangle className="size-6 opacity-15" fill="currentColor" />
        </div>
      </Card>
    </section>
  );
}
