"use client";

import { GalleryVerticalEnd, Sparkles, Zap } from "lucide-react";
import { Badge, Button, Card, Divider, Text } from "@hummingbirdui/react";

export default function Cta2() {
  return (
    <section className="px-6 py-24">
      <div className="max-w-6xl mx-auto grid items-center lg:grid-cols-2 gap-12 lg:gap-20">
        {/* left content */}
        <div className="space-y-8">
          <Badge variant="subtle" color="neutral" className="gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full rounded-full bg-primary opacity-75 animate-ping" />
              <span className="inline-flex size-2 rounded-full bg-primary" />
            </span>
            <span className="uppercase text-muted">New: v1.0 is live</span>
          </Badge>

          <Text
            as="h2"
            size="4xl"
            fontWeight="extrabold"
            className="md:text-6xl tracking-tight"
          >
            Build faster with
            <br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-secondary to-primary font-extrabold">
              smart logic.
            </span>
          </Text>

          <Text className="md:text-lg text-muted max-w-md">
            Ship production-ready interfaces with composable UI blocks designed
            for speed, scalability, and real-world workflows.
          </Text>

          <div className="flex items-center gap-3">
            <Button asChild className="md:btn-lg font-semibold">
              <a href="#">Explore Library</a>
            </Button>
            <Button
              asChild
              variant="subtle"
              color="neutral"
              className="md:btn-lg"
            >
              <a href="#">View Live Demo</a>
            </Button>
          </div>

          <Divider className="border-subtle" />

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-sm font-medium text-muted">
              <Zap className="size-5 text-primary" fill="currentColor" />
              Instant setup
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-muted">
              <GalleryVerticalEnd
                className="size-5 text-secondary"
                fill="currentColor"
              />
              120+ Blocks
            </div>
          </div>
        </div>

        {/* right content */}
        <div className="relative aspect-4/3 max-w-140">
          <div className="size-full rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="size-full object-cover transition duration-700 hover:scale-105"
            />
          </div>
          <Card className="hidden sm:block absolute -top-6 -right-6 border-0 dark:border border-subtle px-4 py-3 text-sm shadow-xl rounded-xl">
            <Text as="h6" size="sm" className="text-default mb-0">
              2x Faster
            </Text>
            <span className="text-muted text-xs">Development speed</span>
          </Card>
          <Badge
            variant="subtle"
            color="neutral"
            size="lg"
            className="absolute bottom-5 left-5 rounded-lg border-0 py-2.5"
          >
            <Sparkles className="size-4 text-[#f9c23c]" fill="currentColor" />
            New Components Added
          </Badge>
        </div>
      </div>
    </section>
  );
}
