"use client";

import { Menu, Star } from "lucide-react";
import { Avatar, Badge, Button, Nav, Navbar, Text } from "@hummingbirdui/react";

const navLinks = ["Home", "Features", "Pricing", "Company"];

const avatars = [
  "/images/avatar/avatar_1.webp",
  "/images/avatar/avatar_2.webp",
  "/images/avatar/avatar_3.webp",
  "/images/avatar/avatar_4.webp",
];

const brands = [
  {
    src: "https://www.adobe.com/federal/assets/svgs/adobe-logo.svg",
    className: "size-20 mx-auto",
  },
  {
    src: "https://static.xx.fbcdn.net/rsrc.php/y9/r/tL_v571NdZ0.svg",
    className: "size-20 mx-auto",
  },
  {
    src: "https://themewagon.com/wp-content/uploads/2021/03/Frame-172-1.png",
    className: "h-8 mx-auto",
  },
  {
    src: "https://onesuite.io/wp-content/uploads/2024/09/OneSuite-Logo.png",
    className: "h-12 hidden md:block mx-auto",
  },
  {
    src: "https://onedesk.so/_astro/logo.BAosC44E.png",
    className: "h-4 hidden md:block mx-auto",
  },
];

export default function Hero3() {
  return (
    <div>
      <div className="border-b border-subtle">
        <Navbar expand="lg" className="max-w-7xl mx-auto px-6 md:px-10 py-4">
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
                className="mb-0 max-sm:hidden"
              >
                hummingbird
              </Text>
            </Navbar.Brand>
          </div>
          <Button className="rounded-full px-6 md:px-10 lg:order-1">
            Login
          </Button>
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
      <div className="max-w-7xl mx-auto py-15 px-6">
        <div className="max-w-4xl text-center mx-auto">
          <Badge variant="outline" color="primary" className="px-2 py-1.5 mb-8">
            Launch better products, faster
          </Badge>
          <Text
            as="h1"
            size="5xl"
            fontWeight="semibold"
            className="leading-none mb-6"
          >
            Future of digital business
          </Text>
          <Text>
            Accelerate development with tools that eliminate repetitive tasks,
            reduce complexity, and provide the flexibility needed to grow your
            product as your business evolves.
          </Text>
          <div className="flex items-center justify-center gap-4 mb-14 ms-3">
            <Avatar.Group className="justify-center">
              {avatars.map((src) => (
                <Avatar key={src} size="sm">
                  <Avatar.Image src={src} alt="Avatar" />
                </Avatar>
              ))}
              <Avatar size="sm">
                <Avatar.Fallback className="bg-primary text-base">
                  <span>+99</span>
                </Avatar.Fallback>
              </Avatar>
            </Avatar.Group>
            <div className="border-l border-subtle ps-4">
              <Text size="xs" className="text-muted mb-0">
                trusted by clients
              </Text>
              <div className="flex">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    className="size-4.5 text-warning"
                    fill="currentColor"
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-3 flex-wrap justify-center">
            <Button asChild size="lg">
              <a href="#">Get started</a>
            </Button>
            <Button asChild color={null} size="lg">
              <a href="#">View docs</a>
            </Button>
          </div>
        </div>
        <div className="max-w-5xl mx-auto p-3 rounded-2xl shadow my-10">
          <img
            className="h-75 object-cover w-full rounded-2xl"
            src="https://images.unsplash.com/photo-1603201667141-5a2d4c673378?q=80&w=2096&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className="grid grid-cols-3 md:grid-cols-5 max-w-5xl gap-6 mx-auto items-center text-center">
          {brands.map((brand) => (
            <img
              key={brand.src}
              src={brand.src}
              alt=""
              className={brand.className}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
