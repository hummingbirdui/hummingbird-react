"use client";

import { Text } from "@hummingbirdui/react";

const members = [
  {
    name: "Lindsay Walton",
    role: "Front-end Developer",
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1170",
  },
  {
    name: "Courtney Henry",
    role: "Designer",
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Tom Cook",
    role: "Director of Product",
    image:
      "https://images.unsplash.com/photo-1546820389-44d77e1f3b31?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Leonard Krasner",
    role: "Senior Designer",
    image:
      "https://images.unsplash.com/photo-1563584316028-2b70b3a3a8bf?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function Team3() {
  return (
    <section className="px-6 py-20 mx-auto max-w-7xl">
      <Text
        as="h3"
        size="base"
        fontWeight="semibold"
        className="text-primary mb-3"
      >
        Our people
      </Text>
      <Text as="h1" size="3xl" className="sm:text-4xl mb-4">
        Built by a team of experts
      </Text>
      <Text className="text-muted sm:text-lg mb-12">
        We believe that great software is built by diverse teams who are
        passionate about their craft.
      </Text>
      <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-8">
        {members.map((member) => (
          <div key={member.name}>
            <img
              className="aspect-square object-cover rounded-2xl mb-6"
              src={member.image}
              alt={member.name}
            />
            <Text as="h3" size="base" fontWeight="semibold">
              {member.name}
            </Text>
            <Text size="sm" className="text-muted">
              {member.role}
            </Text>
          </div>
        ))}
      </div>
    </section>
  );
}
