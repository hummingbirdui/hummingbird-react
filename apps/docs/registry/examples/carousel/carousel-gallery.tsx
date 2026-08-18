"use client";

import { Carousel, Badge } from "@hummingbirdui/react";

const destinations = [
  {
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop",
    name: "Dolomites",
    country: "Italy",
  },
  {
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop",
    name: "Lake Tahoe",
    country: "USA",
  },
  {
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800&auto=format&fit=crop",
    name: "Yosemite",
    country: "USA",
  },
  {
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop",
    name: "Highlands",
    country: "Scotland",
  },
  {
    src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=800&auto=format&fit=crop",
    name: "Provence",
    country: "France",
  },
];

export default function CarouselGallery() {
  return (
    <Carousel
      opts={{ align: "start", loop: true }}
      className="mx-auto max-w-2xl"
    >
      <Carousel.Content>
        {destinations.map((destination) => (
          <Carousel.Item
            key={destination.name}
            className="basis-2/3 sm:basis-1/2 md:basis-1/3"
          >
            <div className="relative overflow-hidden rounded-xl">
              <img
                src={destination.src}
                alt={destination.name}
                className="aspect-4/5 w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-4 pt-10">
                <p className="mb-1 font-semibold text-white">
                  {destination.name}
                </p>
                <Badge variant="subtle" color="warning">
                  {destination.country}
                </Badge>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel.Content>
      <Carousel.Previous />
      <Carousel.Next />
    </Carousel>
  );
}
