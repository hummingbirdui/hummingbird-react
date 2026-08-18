"use client";

import { Carousel, Card } from "@hummingbirdui/react";

export default function CarouselDragFree() {
  return (
    <div className="mx-auto max-w-2xl">
      <Carousel opts={{ dragFree: true, align: "start" }}>
        <Carousel.Content className="cursor-grab active:cursor-grabbing">
          {Array.from({ length: 10 }, (_, index) => (
            <Carousel.Item
              key={index}
              className="basis-1/2 sm:basis-1/3 md:basis-1/4"
            >
              <Card className="aspect-square select-none">
                <Card.Body className="flex items-center justify-center">
                  <span className="text-4xl font-semibold text-muted">
                    {index + 1}
                  </span>
                </Card.Body>
              </Card>
            </Carousel.Item>
          ))}
        </Carousel.Content>
      </Carousel>
      <p className="mt-3 mb-0 text-center text-xs text-muted">
        Drag to scroll — free momentum, no snapping.
      </p>
    </div>
  );
}
