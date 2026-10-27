"use client";

import { Menu } from "lucide-react";
import {
  Avatar,
  Breadcrumb,
  Button,
  Drawer,
  Dropdown,
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

export default function Layout1() {
  return (
    <Drawer direction="left">
      <div className="lg:grid lg:grid-cols-[16.5rem_1fr] h-full">
        <aside className="hidden lg:block border-e border-subtle w-66 sticky top-0 h-screen">
          <Sidebar />
        </aside>
        <Drawer.Content className="w-66 lg:hidden">
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
      <Drawer.Header className="px-5 py-0 border-b border-subtle h-15 flex items-center">
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
      </Drawer.Header>
      <Drawer.Body className="block p-5 h-[calc(100%-60px)] overflow-y-auto">
        {sections.map((section, index) => (
          <div key={section.title} className="w-full">
            <Text
              as="h2"
              size="xs"
              className={cn("mb-2 text-subtle uppercase", index > 0 && "mt-6")}
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
    </>
  );
}
