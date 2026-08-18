"use client";

import { Carousel } from "@hummingbirdui/react";

const images = [
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop",
    alt: "Misty mountain peaks",
  },
  {
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
    alt: "Starry night over mountains",
  },
  {
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop",
    alt: "Sunlit forest",
  },
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
    alt: "Quiet beach",
  },
];

export default function CarouselVertical() {
  return (
    <Carousel
      orientation="vertical"
      opts={{ loop: true }}
      className="mx-auto max-w-sm overflow-hidden rounded-xl"
    >
      <Carousel.Content className="h-80 [--carousel-item-spacing:0px]">
        {images.map((image) => (
          <Carousel.Item key={image.src}>
            <img
              src={image.src}
              alt={image.alt}
              draggable={false}
              className="h-full w-full select-none object-cover"
            />
          </Carousel.Item>
        ))}
      </Carousel.Content>
      <Carousel.Previous />
      <Carousel.Next />
    </Carousel>
  );
}
