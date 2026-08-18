"use client";

import { Carousel } from "@hummingbirdui/react";

const slides = [
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop",
    title: "Misty peaks",
    text: "Sunrise over the ridgeline after a night of rain.",
  },
  {
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop",
    title: "Into the forest",
    text: "Light finding its way through the old pines.",
  },
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
    title: "Slow tides",
    text: "An empty beach and a long afternoon.",
  },
];

export default function CarouselDefault() {
  return (
    <Carousel className="mx-auto max-w-xl overflow-hidden rounded-xl">
      <Carousel.Content>
        {slides.map((slide) => (
          <Carousel.Item key={slide.title}>
            <img
              src={slide.src}
              alt={slide.title}
              className="h-80 w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/60 to-transparent" />
            <Carousel.Caption>
              <h5 className="mb-1 font-semibold">{slide.title}</h5>
              <p className="mb-0 text-sm">{slide.text}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel.Content>
      <Carousel.Previous />
      <Carousel.Next />
      <Carousel.Indicators />
    </Carousel>
  );
}
