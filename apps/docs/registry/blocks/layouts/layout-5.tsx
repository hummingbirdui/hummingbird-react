"use client";

import { ChevronDown, Menu, Search } from "lucide-react";
import {
  Avatar,
  Button,
  Dropdown,
  Nav,
  Navbar,
  Text,
} from "@hummingbirdui/react";

const dashboards = [
  "E-commerce",
  "Project Management",
  "CRM",
  "Travel Agency",
  "Stock",
];

const apps = [
  {
    title: "E-commerce",
    links: [
      "Add Product",
      "products",
      "Customers",
      "Product Details",
      "Inventory",
    ],
  },
  { title: "Email", links: ["Inbox", "Email Details", "Compose"] },
  { title: "File Manager", links: ["Grid View", "List View", "Upload"] },
];

const documentation = [
  "Getting Started",
  "Installation",
  "Configuration",
  "Framework Guide",
  "API Reference",
];

export default function Layout5() {
  return (
    <>
      <Navbar
        expand="lg"
        className="bg-default fixed top-0 w-full border-b border-subtle px-6 justify-between flex z-1035"
      >
        <div className="flex items-center">
          <Navbar.Toggle className="btn btn-icon">
            <Menu className="size-4.5" />
          </Navbar.Toggle>
          <Navbar.Brand href="#" className="flex items-center gap-2">
            <img
              src="https://raw.githubusercontent.com/hummingbirdui/hummingbird/c2a66a70db897fd0d89ea72e7cbab1d3c06a93e2/apps/docs/src/assets/images/logos/hb-logo1.svg"
              alt="Logo"
              className="w-8 h-8"
            />
            <Text
              as="h6"
              fontWeight="semibold"
              className="mb-0 text-muted flex"
            >
              hummingbird
            </Text>
          </Navbar.Brand>
        </div>
        <div className="flex gap-2 lg:order-1">
          <Button
            variant="subtle"
            color="neutral"
            shape="circle"
            className="size-8 text-muted"
            aria-label="Search"
          >
            <Search className="size-5" />
          </Button>
          <Dropdown>
            <Dropdown.Trigger asChild>
              <button
                type="button"
                className="rounded-full"
                aria-label="Account menu"
              >
                <Avatar size="sm">
                  <Avatar.Image
                    src="/images/avatar/avatar_1.webp"
                    alt="Avatar"
                  />
                </Avatar>
              </button>
            </Dropdown.Trigger>
            <Dropdown.Content align="end" className="z-1040">
              <Dropdown.Item>Action</Dropdown.Item>
              <Dropdown.Item>Another action</Dropdown.Item>
              <Dropdown.Item>Something else here</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>
        </div>
        <Navbar.Collapse className="grow-0">
          <Navbar.Nav className="mb-2 lg:mb-0">
            <Nav.Item>
              <Dropdown>
                <MenuTrigger>Dashboard</MenuTrigger>
                <Dropdown.Content align="start" className="z-1040">
                  {dashboards.map((item) => (
                    <Dropdown.Item key={item}>{item}</Dropdown.Item>
                  ))}
                </Dropdown.Content>
              </Dropdown>
            </Nav.Item>
            <Nav.Item>
              <Dropdown>
                <MenuTrigger>Apps</MenuTrigger>
                <Dropdown.Content align="start" className="z-1040">
                  {apps.map((app) => (
                    <Dropdown.Sub key={app.title}>
                      <Dropdown.SubTrigger>{app.title}</Dropdown.SubTrigger>
                      <Dropdown.SubContent className="z-1040">
                        {app.links.map((link) => (
                          <Dropdown.Item key={link}>{link}</Dropdown.Item>
                        ))}
                      </Dropdown.SubContent>
                    </Dropdown.Sub>
                  ))}
                </Dropdown.Content>
              </Dropdown>
            </Nav.Item>
            <Nav.Item>
              <Dropdown>
                <MenuTrigger>Documentation</MenuTrigger>
                <Dropdown.Content align="start" className="z-1040">
                  {documentation.map((item) => (
                    <Dropdown.Item key={item}>{item}</Dropdown.Item>
                  ))}
                </Dropdown.Content>
              </Dropdown>
            </Nav.Item>
          </Navbar.Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="px-6 pb-6 pt-21 flex flex-col h-full">
        <div className="grid grid-cols-3 gap-4 md:gap-6">
          <div className="bg-muted/50 aspect-video rounded-lg" />
          <div className="bg-muted/50 aspect-video rounded-lg" />
          <div className="bg-muted/50 aspect-video rounded-lg" />
        </div>
        <div className="bg-muted/50 rounded-lg mt-4 md:mt-6 flex-1" />
      </div>
    </>
  );
}

function MenuTrigger({ children }: { children: React.ReactNode }) {
  return (
    <Dropdown.Trigger asChild>
      <button
        type="button"
        className="nav-link flex items-center gap-1 text-sm"
      >
        {children}
        <ChevronDown className="size-4.5" />
      </button>
    </Dropdown.Trigger>
  );
}
