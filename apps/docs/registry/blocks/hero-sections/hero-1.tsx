"use client";

import { ArrowRight, ClipboardCheck, Menu, Zap } from "lucide-react";
import { Badge, Button, Nav, Navbar, Text } from "@hummingbirdui/react";
import { cn } from "@hummingbirdui/react/utils";

const stats = [
  {
    value: "200+",
    label: "Project Completed",
    className: "bg-primary/16 text-primary-dark",
  },
  {
    value: "400+",
    label: "Happy clients",
    className: "bg-success/16 text-success-dark",
  },
  {
    value: "300+",
    label: "Unique Design",
    className: "bg-secondary/16 text-secondary-dark",
  },
];

export default function Hero1() {
  return (
    <>
      <Navbar
        expand="lg"
        className="max-w-7xl mx-auto px-6 md:px-10 py-5 justify-between"
      >
        <div className="flex items-center gap-2">
          <Navbar.Toggle className="btn btn-icon">
            <Menu className="size-4.5" />
          </Navbar.Toggle>
          <Navbar.Brand href="#" className="flex items-center gap-2 me-0">
            <img
              src="https://raw.githubusercontent.com/hummingbirdui/hummingbird/c2a66a70db897fd0d89ea72e7cbab1d3c06a93e2/apps/docs/src/assets/images/logos/hb-logo1.svg"
              alt="Logo"
              className="size-10"
            />
            <Text as="h5" className="text-muted max-sm:hidden">
              hummingbird
            </Text>
          </Navbar.Brand>
        </div>
        <div className="lg:w-46.5 lg:order-1 text-end">
          <Button asChild color="neutral" className="px-8">
            <a href="#">Sign Up</a>
          </Button>
        </div>
        <Navbar.Collapse className="py-6 lg:py-0 grow-0 bg-default rounded-lg">
          <Navbar.Nav asChild className="lg:gap-8">
            <div>
              <Nav.Link href="#" active>
                Home
              </Nav.Link>
              <Nav.Link href="#">Features</Nav.Link>
              <Nav.Link href="#">Pricing</Nav.Link>
              <Nav.Link href="#">Contact</Nav.Link>
            </div>
          </Navbar.Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="py-6 lg:py-10 max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-2 mb-6">
          <div className="max-lg:text-center">
            <Badge
              variant="subtle"
              color="primary"
              className="mb-8 py-1.25 pe-2.5"
            >
              <Zap className="size-3" fill="currentColor" />
              Design. Inspire. Transform
            </Badge>
            <Text
              as="h1"
              size="5xl"
              fontWeight="semibold"
              className="md:text-6xl lg:text-7xl mb-6"
            >
              Interior Design <br className="sm:hidden lg:block" /> that{" "}
              <span className="text-primary">Inspires</span>
            </Text>
            <Text size="base" className="lg:max-w-xl mb-10">
              Transform your home with our expertly designed interiors that
              combine contemporary style, classic charm, and cozy functionality.
              We craft spaces that are not just visually appealing but also
              inviting and tailored to your way of living.
            </Text>
            <Button color="neutral" size="lg">
              Start Project
              <ArrowRight className="size-6" />
            </Button>
            <div className="sm:flex items-center max-lg:justify-between gap-2.5 xl:gap-7 mt-16 max-lg:mb-12">
              {stats.map((stat, index) => (
                <div key={stat.label} className="contents">
                  {index > 0 && (
                    <div className="sm:h-10 border-b max-sm:my-2.5 sm:border-s border-default" />
                  )}
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "size-9.25 flex items-center justify-center rounded-lg",
                        stat.className,
                      )}
                    >
                      <ClipboardCheck className="size-5" />
                    </div>
                    <div>
                      <Text as="h4" className="mb-1">
                        {stat.value}
                      </Text>
                      <Text size="xs" className="text-muted mb-0">
                        {stat.label}
                      </Text>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-max ms-auto relative">
            <img
              className="w-65 rounded-3xl ms-auto hidden lg:block"
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=958&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
            <img
              className="lg:w-98 rounded-3xl ms-auto lg:-mt-15 lg:me-13"
              src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1392&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
            <div className="w-63 h-48 bg-primary-lighter rounded-2xl absolute bottom-0 right-3 -z-1" />
          </div>
        </div>
      </div>
    </>
  );
}
