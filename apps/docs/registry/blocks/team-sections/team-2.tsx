"use client";

import { Card, Text } from "@hummingbirdui/react";

const members = [
  {
    name: "Leslie Alexander",
    role: "Co-Founder / CEO",
    bio: "Expert in strategic planning and human-centric design with 10+ years of experience.",
    image:
      "https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=1021&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Michael Foster",
    role: "Co-Founder / CTO",
    bio: "Architecting scalable solutions and leading our engineering team to new heights.",
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1170",
  },
  {
    name: "Dries Vincent",
    role: "Business Relations",
    bio: "Building bridges between technology and user needs through global partnerships.",
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function Team2() {
  return (
    <section className="px-6 py-20 mx-auto max-w-7xl">
      <div className="text-center mb-12">
        <Text as="h1" size="3xl" className="sm:text-4xl mb-4">
          Meet Our Leadership
        </Text>
        <Text className="text-muted sm:text-lg max-w-150 mx-auto">
          We’re a dynamic group of individuals who are passionate about what we
          do and dedicated to delivering the best results for our clients.
        </Text>
      </div>
      <div className="mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <Card key={member.name} className="bg-default border-0">
            <img
              className="aspect-3/2 rounded-2xl object-cover mb-6"
              src={member.image}
              alt={member.name}
            />
            <Text
              as="h3"
              size="lg"
              fontWeight="semibold"
              className="text-default mb-2"
            >
              {member.name}
            </Text>
            <Text size="base" fontWeight="medium" className="text-primary mb-4">
              {member.role}
            </Text>
            <Text size="base" className="text-muted">
              {member.bio}
            </Text>
          </Card>
        ))}
      </div>
    </section>
  );
}
