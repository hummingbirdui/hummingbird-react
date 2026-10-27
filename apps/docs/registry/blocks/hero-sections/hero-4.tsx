"use client";

import { ChevronRight, Menu, Search, ShoppingCart } from "lucide-react";
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
              <Menu className="size-4.5" />
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
              <Search className="size-4.5" />
            </Button>
            <Button variant="subtle" shape="circle" aria-label="Cart">
              <ShoppingCart className="size-4.5" />
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
              <ChevronRight className="size-4.5" />
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
