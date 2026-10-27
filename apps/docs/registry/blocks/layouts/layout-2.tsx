"use client";

import { Menu, Search } from "lucide-react";
import {
  Avatar,
  Button,
  Drawer,
  Dropdown,
  Input,
  InputIcon,
  ListGroup,
  Navbar,
  Text,
} from "@hummingbirdui/react";
import { cn } from "@hummingbirdui/react/utils";

const sections = [
  {
    title: "Dashboards",
    links: ["E-commerce", "Project Management", "CRM"],
  },
  {
    title: "Pages",
    links: ["Social Feed", "Profile", "Chat", "File Manager"],
  },
];

export default function Layout2() {
  return (
    <Drawer direction="left">
      <Navbar className="bg-default fixed top-0 w-full border-b border-subtle px-6 justify-between flex h-15 z-1035">
        <div className="flex">
          <Drawer.Trigger asChild>
            <Button
              variant="icon"
              color={null}
              className="me-3 lg:hidden"
              aria-label="Open navigation"
            >
              <Menu className="size-4.5" />
            </Button>
          </Drawer.Trigger>
          <Logo />
        </div>
        <InputIcon className="w-80 hidden md:block">
          <InputIcon.Start>
            <Search className="size-5" />
          </InputIcon.Start>
          <Input
            variant="fill"
            type="text"
            className="rounded-full"
            aria-label="Search"
          />
        </InputIcon>
        <div className="flex gap-2">
          <Button
            variant="subtle"
            color="neutral"
            shape="circle"
            className="size-8 text-muted md:hidden"
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
            <Dropdown.Content align="end">
              <Dropdown.Item>Action</Dropdown.Item>
              <Dropdown.Item>Another action</Dropdown.Item>
              <Dropdown.Item>Something else here</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>
        </div>
      </Navbar>
      <div className="lg:grid lg:grid-cols-[16.5rem_1fr] h-full pt-15">
        <aside className="hidden lg:block border-e border-subtle w-66 sticky top-15 h-[calc(100vh-60px)] overflow-y-scroll">
          <SidebarNav />
        </aside>
        <Drawer.Content className="w-66 lg:hidden">
          <Drawer.Title className="sr-only">Navigation</Drawer.Title>
          <Drawer.Header className="px-5 py-0 border-b border-subtle h-15">
            <Logo />
          </Drawer.Header>
          <div className="overflow-y-auto">
            <SidebarNav />
          </div>
        </Drawer.Content>
        <div className="p-6 flex flex-col h-full">
          <div className="grid grid-cols-3 gap-4 md:gap-6">
            <div className="bg-muted/50 aspect-video rounded-lg" />
            <div className="bg-muted/50 aspect-video rounded-lg" />
            <div className="bg-muted/50 aspect-video rounded-lg" />
          </div>
          <div className="bg-muted/50 rounded-lg mt-4 md:mt-6 flex-1" />
        </div>
      </div>
    </Drawer>
  );
}

function Logo() {
  return (
    <a className="flex items-center gap-2 no-underline" href="#">
      <img
        src="https://raw.githubusercontent.com/hummingbirdui/hummingbird/c2a66a70db897fd0d89ea72e7cbab1d3c06a93e2/apps/docs/src/assets/images/logos/hb-logo1.svg"
        alt="Logo"
        className="w-8 h-8"
      />
      <Text as="h6" fontWeight="semibold" className="mb-0 text-muted flex">
        hummingbird
      </Text>
    </a>
  );
}

function SidebarNav() {
  return (
    <Drawer.Body className="block p-5">
      {sections.map((section, index) => (
        <div key={section.title} className="w-full">
          <Text
            as="h2"
            size="xs"
            className={cn("mb-2 text-muted uppercase", index > 0 && "mt-6")}
          >
            {section.title}
          </Text>
          <ListGroup asChild className="w-full bg-transparent gap-0.5">
            <div>
              {section.links.map((link) => (
                <ListGroup.Item
                  key={link}
                  asChild
                  action
                  active={link === "E-commerce"}
                  className="rounded-lg text-sm py-2"
                >
                  <a href="#">
                    <span>{link}</span>
                  </a>
                </ListGroup.Item>
              ))}
            </div>
          </ListGroup>
        </div>
      ))}
    </Drawer.Body>
  );
}
