"use client";

import { Ellipsis, Menu, Search } from "lucide-react";
import {
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Drawer,
  Dropdown,
  Input,
  InputIcon,
  ListGroup,
  Navbar,
  Text,
} from "@hummingbirdui/react";

const menus = [
  {
    title: "Getting Started",
    links: [
      "Introduction",
      "Installation",
      "Framework Guide",
      "JavaScript",
      "Accessibility",
    ],
  },
  {
    title: "Customize",
    links: ["Component", "Theming", "Colors", "Dark Mode", "Reboot"],
  },
  {
    title: "Layout & content",
    links: ["Container", "Typography", "Background", "Grid", "Shadows"],
  },
  {
    title: "Components",
    links: [
      "Buttons",
      "Avatars",
      "Breadcrumbs",
      "Dropdown",
      "Modal",
      "Offcanvas",
      "Loader",
      "Pagination",
    ],
  },
];

export default function Layout4() {
  return (
    <Drawer direction="left">
      <div className="lg:grid lg:grid-cols-[16.5rem_1fr] h-full">
        <aside className="hidden lg:flex flex-col border-e border-subtle w-66 sticky top-0 h-screen">
          <Sidebar />
        </aside>
        <Drawer.Content className="w-66 flex flex-col lg:hidden">
          <Drawer.Title className="sr-only">Navigation</Drawer.Title>
          <Sidebar />
        </Drawer.Content>
        <div className="pt-15 h-full flex-1">
          <Navbar className="bg-default fixed top-0 w-full lg:w-[calc(100%-16.5rem)] border-b border-subtle px-6 justify-start h-15">
            <Drawer.Trigger asChild>
              <Button
                variant="icon"
                color={null}
                className="lg:hidden"
                aria-label="Open navigation"
              >
                <Menu className="size-4.5" />
              </Button>
            </Drawer.Trigger>
            <Breadcrumb className="ms-5 lg:ms-0">
              <Breadcrumb.List>
                <Breadcrumb.Item>
                  <Breadcrumb.Link href="#" className="link link-hover">
                    Dashboard
                  </Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>
                  <Breadcrumb.Page>E-commerce</Breadcrumb.Page>
                </Breadcrumb.Item>
              </Breadcrumb.List>
            </Breadcrumb>
            <Dropdown>
              <Dropdown.Trigger asChild>
                <button
                  type="button"
                  className="ms-auto rounded-full"
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
              <Dropdown.Content align="end">
                <Dropdown.Item>Action</Dropdown.Item>
                <Dropdown.Item>Another action</Dropdown.Item>
                <Dropdown.Item>Something else here</Dropdown.Item>
              </Dropdown.Content>
            </Dropdown>
          </Navbar>
          <div className="p-6 flex flex-col h-full">
            <div className="grid grid-cols-3 gap-4 md:gap-6">
              <div className="bg-muted/50 aspect-video rounded-lg" />
              <div className="bg-muted/50 aspect-video rounded-lg" />
              <div className="bg-muted/50 aspect-video rounded-lg" />
            </div>
            <div className="bg-muted/50 rounded-lg mt-4 md:mt-6 flex-1" />
          </div>
        </div>
      </div>
    </Drawer>
  );
}

function Sidebar() {
  return (
    <>
      <Drawer.Header className="px-5 pt-4 flex flex-col items-start">
        <a className="flex gap-2 no-underline mb-3" href="#">
          <img
            src="https://raw.githubusercontent.com/hummingbirdui/hummingbird/c2a66a70db897fd0d89ea72e7cbab1d3c06a93e2/apps/docs/src/assets/images/logos/hb-logo1.svg"
            alt="Logo"
            className="w-8 h-8"
          />
          <Text as="h6" fontWeight="semibold" className="mb-0 text-muted">
            hummingbird
          </Text>
        </a>
        <InputIcon className="w-full">
          <InputIcon.Start>
            <Search className="size-4" />
          </InputIcon.Start>
          <Input size="sm" type="text" aria-label="Search" />
        </InputIcon>
      </Drawer.Header>
      <Drawer.Body className="flex-1 flex flex-col justify-between pt-5 pb-3 px-2">
        <ListGroup asChild className="w-full bg-transparent gap-0.5">
          <div>
            {menus.map((menu, index) => (
              <Dropdown key={menu.title}>
                <Dropdown.Trigger asChild>
                  <ListGroup.Item
                    asChild
                    action
                    active={index === 0}
                    className="rounded-lg text-sm py-2 flex items-center justify-between"
                  >
                    <button type="button">
                      <span>{menu.title}</span>
                      <Ellipsis className="size-3.5" />
                    </button>
                  </ListGroup.Item>
                </Dropdown.Trigger>
                <Dropdown.Content
                  side="right"
                  align="start"
                  sideOffset={2}
                  className="py-2"
                >
                  {menu.links.map((link) => (
                    <Dropdown.Item
                      key={link}
                      className={link === "Installation" ? "active" : undefined}
                    >
                      {link}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Content>
              </Dropdown>
            ))}
          </div>
        </ListGroup>
        <Card className="mt-auto border-subtle mx-1">
          <Card.Body className="p-2">
            <Text as="h6" size="base">
              Need help?
            </Text>
            <Card.Text className="text-sm text-muted">
              Check out our documentation to get all the information you need to
              start working with hummingbird.
            </Card.Text>
            <Button asChild color="neutral" size="sm" className="w-full">
              <a href="#">Documentation</a>
            </Button>
          </Card.Body>
        </Card>
      </Drawer.Body>
    </>
  );
}
