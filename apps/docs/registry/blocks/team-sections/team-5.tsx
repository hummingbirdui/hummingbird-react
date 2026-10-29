"use client";

import { Text } from "@hummingbirdui/react";

const members = [
  {
    name: "Jordan Smith",
    role: "Creative Director",
    image:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    links: ["LinkedIn", "Twitter"],
  },
  {
    name: "Anya Taylor",
    role: "Lead Developer",
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    links: ["Github", "LinkedIn"],
  },
  {
    name: "David Vose",
    role: "Product Manager",
    image:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=600",
    links: ["LinkedIn", "Twitter"],
  },
];

export default function Team5() {
  return (
    <section className="px-6 py-20 mx-auto max-w-7xl">
      <Text as="h1" size="3xl" className="sm:text-4xl mb-4">
        Meet our specialists
      </Text>
      <Text className="text-muted sm:text-lg max-w-2xl mb-12">
        Our team is composed of industry veterans and creative thinkers
        dedicated to solving complex problems with elegant solutions.
      </Text>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <div
            key={member.name}
            className="group relative overflow-hidden aspect-4/5"
          >
            <img
              src={member.image}
              alt={member.name}
              className="absolute size-full object-cover grayscale transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0"
            />
            <div className="absolute bottom-0 p-8 size-full flex flex-col bg-linear-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Text
                size="xs"
                fontWeight="medium"
                className="text-white mb-2 mt-auto"
              >
                {member.role}
              </Text>
              <Text as="h3" size="2xl" className="text-white mb-4">
                {member.name}
              </Text>
              <div className="flex gap-4">
                {member.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-white hover:text-primary text-sm"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
