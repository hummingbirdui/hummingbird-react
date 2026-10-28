"use client";

import { Card, Text } from "@hummingbirdui/react";

export default function Testimonial2() {
  return (
    <section className="px-6 py-20">
      <Card className="max-w-xl lg:max-w-5xl mx-auto lg:flex-row items-center border-subtle rounded-xl">
        <div className="aspect-4/3 lg:max-w-105 lg:min-h-130 bg-black">
          <img
            src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1200&auto=format&fit=crop"
            className="size-full object-cover opacity-80 grayscale hover:grayscale-0 transition duration-700"
            alt="Client"
          />
        </div>
        <div className="flex-1 p-8 lg:p-16">
          <Text
            as="blockquote"
            size="2xl"
            fontWeight="light"
            className="sm:text-3xl text-default leading-normal tracking-tight mb-14"
          >
            “We didn&apos;t just find a vendor; we found a{" "}
            <span className="font-medium text-primary">strategic partner</span>.
            Their ability to scale with our complexity was the deciding factor
            in our Series C success.”
          </Text>
          <Text
            as="h4"
            size="lg"
            fontWeight="medium"
            className="sm:text-xl text-default"
          >
            Adriana Rivera
          </Text>
          <span className="text-muted">Chief Risk Officer @PayPal</span>
        </div>
      </Card>
    </section>
  );
}
