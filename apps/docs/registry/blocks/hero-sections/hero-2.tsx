"use client";

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
                <StarIcon key={index} />
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

function StarIcon() {
  return (
    <svg
      className="text-warning"
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="m12 16.3l-3.7 2.825q-.275.225-.6.213t-.575-.188t-.387-.475t-.013-.65L8.15 13.4l-3.625-2.575q-.3-.2-.375-.525t.025-.6t.35-.488t.6-.212H9.6l1.45-4.8q.125-.35.388-.538T12 3.475t.563.188t.387.537L14.4 9h4.475q.35 0 .6.213t.35.487t.025.6t-.375.525L15.85 13.4l1.425 4.625q.125.35-.012.65t-.388.475t-.575.188t-.6-.213z"
        strokeWidth="0.5"
        stroke="currentColor"
      />
    </svg>
  );
}
