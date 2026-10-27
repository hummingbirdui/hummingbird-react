"use client";

import { Star } from "lucide-react";
import { Avatar, Badge, Button, Text } from "@hummingbirdui/react";

const avatars = [
  "/images/avatar/avatar_1.webp",
  "/images/avatar/avatar_2.webp",
  "/images/avatar/avatar_3.webp",
  "/images/avatar/avatar_4.webp",
];

export default function Hero2() {
  return (
    <div className="h-full gap-6 flex relative">
      <div className="max-w-4xl py-20 px-6 flex flex-col items-center lg:items-start justify-center text-center lg:text-start">
        <a className="flex items-center gap-2 no-underline mb-12" href="#">
          <img
            src="https://raw.githubusercontent.com/hummingbirdui/hummingbird/c2a66a70db897fd0d89ea72e7cbab1d3c06a93e2/apps/docs/src/assets/images/logos/hb-logo1.svg"
            alt="Logo"
            className="w-8 h-8"
          />
          <Text as="h6" fontWeight="semibold" className="mb-0 text-muted flex">
            hummingbird
          </Text>
        </a>
        <Badge variant="outline" color="primary" className="px-2 py-1.5 mb-10">
          Launch better products, faster
        </Badge>
        <Text
          as="h1"
          size="5xl"
          fontWeight="semibold"
          className="md:text-7xl leading-none mb-6"
        >
          Future of your digital business
        </Text>
        <Text className="md:text-lg text-muted">
          Accelerate development with tools that eliminate repetitive tasks,
          reduce complexity, and provide the flexibility needed to grow your
          product as your business evolves.
        </Text>
        <div className="flex items-center justify-center gap-4 mb-14 ms-3">
          <Avatar.Group className="justify-center">
            {avatars.map((src) => (
              <Avatar key={src} size="sm">
                <Avatar.Image src={src} alt="Avatar" />
              </Avatar>
            ))}
            <Avatar size="sm">
              <Avatar.Fallback className="bg-primary text-base">
                <span>+99</span>
              </Avatar.Fallback>
            </Avatar>
          </Avatar.Group>
          <div className="border-l border-subtle ps-4">
            <Text size="xs" className="text-muted mb-0">
              trusted by clients
            </Text>
            <div className="flex">
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  className="size-4.5 text-warning"
                  fill="currentColor"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button asChild size="lg">
            <a href="#">Get started</a>
          </Button>
          <Button asChild color={null} size="lg">
            <a href="#">View docs</a>
          </Button>
        </div>
      </div>
      <img
        className="hidden lg:block w-[47vw] object-cover"
        src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1055&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
      />
    </div>
  );
}
