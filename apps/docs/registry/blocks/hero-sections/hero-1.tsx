"use client";

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
            <MenuIcon />
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  fill="currentColor"
                  d="m7 22l4-7.5l-8-1L15 2h2l-4 7.5l8 1L9 22z"
                />
              </svg>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 24 24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  fill="currentColor"
                  d="M16.175 13H5q-.425 0-.712-.288T4 12t.288-.712T5 11h11.175l-4.9-4.9q-.3-.3-.288-.7t.313-.7q.3-.275.7-.288t.7.288l6.6 6.6q.15.15.213.325t.062.375t-.062.375t-.213.325l-6.6 6.6q-.275.275-.687.275T11.3 19.3q-.3-.3-.3-.712t.3-.713z"
                />
              </svg>
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
                      <ClipboardCheckIcon />
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

function ClipboardCheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.25em"
      height="1.25em"
      viewBox="0 0 24 24"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path
        fill="currentColor"
        d="M10.6 13.25L8.45 11.1q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7l2.85 2.85q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275zM5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h4.2q.325-.9 1.088-1.45T12 1t1.713.55T14.8 3H19q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm0-2h14V5H5zm7.538-14.962q.212-.213.212-.538t-.213-.537T12 2.75t-.537.213t-.213.537t.213.538t.537.212t.538-.213M5 19V5z"
      />
    </svg>
  );
}
