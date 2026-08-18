"use client";

import { Carousel, Card, Avatar } from "@hummingbirdui/react";
import Autoplay from "embla-carousel-autoplay";

const testimonials = [
  {
    quote:
      "The component API is so consistent that our team stopped reading the docs after the first week — everything just works the way you expect.",
    name: "Amelia Chen",
    role: "Frontend Lead, Nova Labs",
    avatar: "https://i.pravatar.cc/80?img=47",
  },
  {
    quote:
      "We migrated our design system in a sprint. The CSS variables meant our brand theme dropped in without touching a single component.",
    name: "Marcus Webb",
    role: "Design Engineer, Fieldstone",
    avatar: "https://i.pravatar.cc/80?img=12",
  },
  {
    quote:
      "Accessible by default, styled by our tokens, and the bundle barely moved. Exactly what a UI kit should be.",
    name: "Priya Sharma",
    role: "CTO, Brightline",
    avatar: "https://i.pravatar.cc/80?img=32",
  },
];

export default function CarouselAutoplay() {
  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[Autoplay({ delay: 4000, stopOnInteraction: false })]}
      className="mx-auto max-w-lg"
    >
      <Carousel.Content>
        {testimonials.map((testimonial) => (
          <Carousel.Item key={testimonial.name}>
            <Card className="mx-1 my-1">
              <Card.Body className="text-center">
                <p className="mb-4 text-sm leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center justify-center gap-3">
                  <Avatar>
                    <Avatar.Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                    />
                    <Avatar.Fallback>{testimonial.name[0]}</Avatar.Fallback>
                  </Avatar>
                  <div className="text-start">
                    <p className="mb-0 text-sm font-semibold">
                      {testimonial.name}
                    </p>
                    <p className="mb-0 text-xs text-muted">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Carousel.Item>
        ))}
      </Carousel.Content>
    </Carousel>
  );
}
