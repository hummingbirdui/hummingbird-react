"use client";

import { Badge, Card, Text } from "@hummingbirdui/react";

export default function Testimonial5() {
  return (
    <section className="px-6 py-24 max-w-6xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
      <div className="lg:w-7/12">
        <Text
          as="blockquote"
          size="4xl"
          className="md:text-5xl/14 italic tracking-tight mb-12"
        >
          “Before using this platform, our process was{" "}
          <span className="underline decoration-warning decoration-4 underline-offset-8">
            slow and full of friction
          </span>
          . Now everything is automated and incredibly reliable.”
        </Text>
        <div className="flex items-center gap-6">
          <img
            src="https://i.pravatar.cc/100?img=60"
            alt="Nafis"
            className="size-20 rounded-2xl rotate-3 object-cover shadow-xl border-4 border-white"
          />
          <div>
            <Text size="xl" fontWeight="bold" className="tracking-tight mb-1.5">
              Nafis Rahman
            </Text>
            <span className="text-muted font-medium italic">
              Engineering Lead at Vertex
            </span>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-5/12 space-y-4">
        <Card className="p-8 border-subtle rounded-4xl">
          <div className="flex justify-between items-start mb-4">
            <Text
              size="6xl"
              fontWeight="black"
              className="text-default leading-none"
            >
              3x
            </Text>
            <Badge variant="subtle" color="success" size="md">
              ↑ 200%
            </Badge>
          </div>
          <Text fontWeight="medium" className="text-muted uppercase">
            Faster daily deployments
          </Text>
        </Card>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 rounded-4xl text-white dark:text-neutral bg-neutral dark:bg-white">
            <Text size="3xl" fontWeight="bold" className="mb-6">
              -60%
            </Text>
            <Text
              size="xs"
              fontWeight="semibold"
              className="uppercase tracking-widest"
            >
              Error Rate
            </Text>
          </div>
          <div className="p-6 rounded-4xl text-white dark:text-neutral bg-warning">
            <Text size="3xl" fontWeight="bold" className="mb-6">
              99.9%
            </Text>
            <Text
              size="xs"
              fontWeight="semibold"
              className="uppercase tracking-widest"
            >
              Uptime
            </Text>
          </div>
        </div>
      </div>
    </section>
  );
}
