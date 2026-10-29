"use client";

import { Text } from "@hummingbirdui/react";
import { cn } from "@hummingbirdui/react/utils";

const members = [
  {
    name: "Arlo White",
    role: "Backend Engineer",
    bio: "Building robust systems with a focus on security and efficiency.",
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1170",
    className:
      "md:border-r md:pr-8 lg:pr-12 last:border-r-0 lg:nth-4:border-r-0",
  },
  {
    name: "Sarah Jenkins",
    role: "UX Designer",
    bio: "Creating intuitive interfaces that put the user first.",
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    className:
      "md:pl-8 lg:border-r lg:px-8 lg:last:border-r-0 lg:nth-4:border-r-0",
  },
  {
    name: "James Wilson",
    role: "Product Manager",
    bio: "Bridging the gap between technical teams and business goals.",
    image:
      "https://images.unsplash.com/photo-1546820389-44d77e1f3b31?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    className:
      "md:border-r md:pr-8 lg:px-8 lg:last:border-r-0 lg:nth-4:border-r-0",
  },
  {
    name: "Maya Patel",
    role: "Frontend Lead",
    bio: "Specializing in modern React architectures and animations.",
    image:
      "https://images.unsplash.com/photo-1563584316028-2b70b3a3a8bf?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    className: "md:pl-8 lg:pl-8",
  },
];

export default function Team4() {
  return (
    <section className="px-6 py-20 mx-auto max-w-7xl">
      <Text as="h1" size="3xl" className="sm:text-4xl mb-4">
        Our Team
      </Text>
      <Text className="text-muted sm:text-lg max-w-2xl mb-12">
        The talented people making it all happen.
      </Text>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-subtle">
        {members.map((member) => (
          <div
            key={member.name}
            className={cn("border-b border-subtle py-12", member.className)}
          >
            <img
              className="size-16 object-cover rounded-full mb-6"
              src={member.image}
              alt={member.name}
            />
            <Text as="h3" size="lg" fontWeight="semibold" className="mb-1">
              {member.name}
            </Text>
            <Text size="sm" fontWeight="medium" className="text-primary mb-4">
              {member.role}
            </Text>
            <Text size="sm" className="text-muted mb-0">
              {member.bio}
            </Text>
          </div>
        ))}
      </div>
    </section>
  );
}
