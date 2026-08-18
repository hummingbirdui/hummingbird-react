"use client";

import * as React from "react";
import { Carousel, type CarouselApi } from "@hummingbirdui/react";

const images = [
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop",
    alt: "Misty mountain peaks",
  },
  {
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop",
    alt: "Sunlit forest",
  },
  {
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
    alt: "Starry night over mountains",
  },
  {
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop",
    alt: "Lake at sunset",
  },
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
    alt: "Quiet beach",
  },
];

export default function CarouselThumbnails() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [selected, setSelected] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelected(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <div className="mx-auto max-w-xl">
      <Carousel setApi={setApi} className="overflow-hidden rounded-xl">
        <Carousel.Content>
          {images.map((image) => (
            <Carousel.Item key={image.src}>
              <img
                src={image.src}
                alt={image.alt}
                className="h-72 w-full object-cover"
              />
            </Carousel.Item>
          ))}
        </Carousel.Content>
        <Carousel.Previous />
        <Carousel.Next />
      </Carousel>
      <div className="mt-3 flex justify-center gap-2">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === selected || undefined}
            className={`overflow-hidden rounded-lg border-2 transition duration-200 ${
              index === selected
                ? "border-primary"
                : "border-transparent opacity-50 hover:opacity-100"
            }`}
          >
            <img
              src={image.src}
              alt=""
              className="h-12 w-16 object-cover sm:h-14 sm:w-20"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
