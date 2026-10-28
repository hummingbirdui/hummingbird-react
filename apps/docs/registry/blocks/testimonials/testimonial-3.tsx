"use client";

import { Avatar, Text } from "@hummingbirdui/react";

export default function Testimonial3() {
  return (
    <section className="px-6 py-24 max-w-7xl mx-auto">
      <Text as="h2" size="4xl" className="sm:text-5xl max-w-2xl mb-6">
        How modern teams{" "}
        <span className="text-subtle">actually ship faster</span> at scale
      </Text>
      <Text size="lg" className="text-muted mb-16">
        Real feedback from people building modern products
      </Text>
      <div className="grid lg:grid-cols-2 items-center gap-12">
        <div className="relative max-w-xl">
          <img
            src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="rounded-2xl size-full"
          />
          <div className="absolute bottom-6 left-6 bg-white/80 backdrop-blur px-4 py-2 rounded-lg text-sm font-medium text-black">
            ⭐ 4.9 Average Rating
          </div>
        </div>
        <div>
          <Text as="h3" size="5xl" className="mb-6 text-primary">
            “
          </Text>
          <Text size="xl" className="mb-6 text-default leading-relaxed">
            This is by far the best tool we have used in years. The interface is
            incredibly intuitive and the performance is unmatched. It helped our
            team move faster and deliver better results without extra
            complexity.
          </Text>
          <div className="mb-8 text-warning text-lg">★ ★ ★ ★ ★</div>
          <div className="flex items-center gap-4">
            <Avatar size="lg">
              <Avatar.Image
                src="https://i.pravatar.cc/100?img=8"
                alt="Avatar"
                className="grayscale"
              />
            </Avatar>
            <div>
              <Text fontWeight="semibold" className="mb-0">
                Edison Cooper
              </Text>
              <span className="text-muted">CTO at TechFlow</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
