"use client";

import { Badge, Button, Text } from "@hummingbirdui/react";

export default function Cta5() {
  return (
    <section className="p-3">
      <div className="px-6 py-12 flex flex-col lg:flex-row items-center justify-between gap-8 bg-linear-to-b from-subtle via-primary-lighter to-primary-light/40 max-w-7xl mx-auto rounded-xl">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-2">
          <Badge variant="subtle" className="uppercase mb-6">
            Limited Protocol
          </Badge>

          <Text
            as="h2"
            size="4xl"
            fontWeight="black"
            className="md:text-5xl tracking-tighter mb-3"
          >
            Don’t miss <span className="text-primary italic">the surge.</span>
          </Text>

          <Text size="base" fontWeight="medium" className="max-w-md">
            Upgrade within the next 24 hours to secure 40% off all
            infrastructure plans.
          </Text>
        </div>

        <div className="flex items-center gap-4">
          <Button asChild className="sm:btn-lg sm:w-50 shrink-0">
            <a href="#">Upgrade now</a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="sm:btn-lg sm:w-50 shrink-0"
          >
            <a href="#">See pricing</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
