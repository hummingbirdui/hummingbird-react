"use client";

import * as React from "react";
import { Carousel, type CarouselApi } from "@hummingbirdui/react";

const images = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1200&auto=format&fit=crop",
];

export default function CarouselCounter() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(1);
  const [count, setCount] = React.useState(images.length);

  React.useEffect(() => {
    if (!api) return;
    const update = () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);
    };
    update();
    api.on("select", update);
    api.on("reInit", update);
    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  return (
    <div className="mx-auto max-w-xl">
      <Carousel setApi={setApi} className="overflow-hidden rounded-xl">
        <Carousel.Content>
          {images.map((src, index) => (
            <Carousel.Item key={src}>
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="h-72 w-full object-cover"
              />
            </Carousel.Item>
          ))}
        </Carousel.Content>
        <Carousel.Previous />
        <Carousel.Next />
      </Carousel>
      <p className="mt-3 mb-0 text-center text-sm text-muted">
        Slide {current} of {count}
      </p>
    </div>
  );
}
