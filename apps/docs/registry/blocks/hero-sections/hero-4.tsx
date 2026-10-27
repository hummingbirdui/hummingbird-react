"use client";

import { Button, Nav, Navbar, Text } from "@hummingbirdui/react";
import { cn } from "@hummingbirdui/react/utils";

const navLinks = ["Home", "Features", "Pricing", "Company"];

const offers = [
  {
    title: "Whooping 60% Off",
    subtitle: "on everyday items",
    action: "Shop",
    color: "warning",
    image:
      "https://images.unsplash.com/photo-1772182104431-5a00158fd8e2?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    className: "lg:col-span-2",
  },
  {
    title: "Get 20% Off",
    subtitle: "on iPhone 17",
    action: "Buy",
    color: "primary",
    image:
      "https://images.unsplash.com/photo-1758186334264-d1ab8a079aa2?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    className: "",
  },
  {
    title: "Smart watch 15% Off",
    subtitle: "for today",
    action: "Buy",
    color: "info",
    image:
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    className: "",
  },
] as const;

const titleColors = {
  warning: "text-warning",
  primary: "text-primary",
  info: "text-info",
};

export default function Hero4() {
  return (
    <>
      <div className="border-b border-subtle">
        <Navbar expand="lg" className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2 me-8">
            <Navbar.Toggle className="btn btn-icon">
              <MenuIcon />
            </Navbar.Toggle>
            <Navbar.Brand href="#" className="flex items-center gap-2 me-0">
              <img
                src="https://raw.githubusercontent.com/hummingbirdui/hummingbird/c2a66a70db897fd0d89ea72e7cbab1d3c06a93e2/apps/docs/src/assets/images/logos/hb-logo1.svg"
                alt="Logo"
                className="w-8 h-8"
              />
              <Text
                as="h5"
                fontWeight="semibold"
                className="mb-0 hidden sm:block"
              >
                hummingbird
              </Text>
            </Navbar.Brand>
          </div>
          <div className="flex gap-2 lg:order-1">
            <Button variant="subtle" shape="circle" aria-label="Search">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l5.6 5.6q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-5.6-5.6q-.75.6-1.725.95T9.5 16m0-2q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"
                  strokeWidth="0.5"
                  stroke="currentColor"
                />
              </svg>
            </Button>
            <Button variant="subtle" shape="circle" aria-label="Cart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M17 18a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2M1 2h3.27l.94 2H20a1 1 0 0 1 1 1c0 .17-.05.34-.12.5l-3.58 6.47c-.34.61-1 1.03-1.75 1.03H8.1l-.9 1.63l-.03.12a.25.25 0 0 0 .25.25H19v2H7a2 2 0 0 1-2-2c0-.35.09-.68.24-.96l1.36-2.45L3 4H1zm6 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2m9-7l2.78-5H6.14l2.36 5z"
                  strokeWidth="0.5"
                  stroke="currentColor"
                />
              </svg>
            </Button>
          </div>
          <Navbar.Collapse>
            <Navbar.Nav className="me-auto mb-2 lg:mb-0">
              {navLinks.map((link, index) => (
                <Nav.Item key={link}>
                  <Nav.Link href="#" active={index === 0}>
                    {link}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Navbar.Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-6">
        <div className="md:flex items-center justify-between gap-4 mb-10">
          <Text as="h2" fontWeight="normal" className="mb-6 md:mb-0">
            Refined Design for a Modern Lifestyle.
          </Text>
          <Button asChild size="lg" className="rounded-full text-nowrap">
            <a href="#">
              Shop now
              <svg
                className="flex-1"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12.6 12L8.7 8.1q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.6 4.6q.15.15.213.325t.062.375t-.062.375t-.213.325l-4.6 4.6q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7z"
                  strokeWidth="0.5"
                  stroke="currentColor"
                />
              </svg>
            </a>
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {offers.map((offer) => (
            <div
              key={offer.title}
              className={cn(
                "h-100 rounded-2xl overflow-hidden relative",
                offer.className,
              )}
            >
              <img
                src={offer.image}
                alt=""
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black to-transparent p-8 flex justify-end items-start flex-col">
                <Text
                  as="h3"
                  fontWeight="medium"
                  className={cn(
                    "max-md:text-2xl mb-0",
                    titleColors[offer.color],
                  )}
                >
                  {offer.title}
                </Text>
                <Text as="span" size="lg" className="text-white">
                  {offer.subtitle}
                </Text>
                <Button
                  asChild
                  color={offer.color}
                  size="lg"
                  className="px-8 mt-6 rounded-full"
                >
                  <a href="#">{offer.action}</a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M4 18q-.425 0-.712-.288T3 17t.288-.712T4 16h16q.425 0 .713.288T21 17t-.288.713T20 18zm0-5q-.425 0-.712-.288T3 12t.288-.712T4 11h16q.425 0 .713.288T21 12t-.288.713T20 13zm0-5q-.425 0-.712-.288T3 7t.288-.712T4 6h16q.425 0 .713.288T21 7t-.288.713T20 8z"
        strokeWidth="0.5"
        stroke="currentColor"
      />
    </svg>
  );
}
