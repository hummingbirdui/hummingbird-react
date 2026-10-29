"use client";

import { ChevronRight, Menu } from "lucide-react";
import {
  Avatar,
  Breadcrumb,
  Button,
  Collapsible,
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

export default function Layout3() {
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
      <Drawer.Body className="block py-5 px-2 h-[calc(100%-60px)] overflow-y-auto">
        {sections.map((section, index) => (
          <div
            key={section.title}
            className={cn("w-full", index === 0 && "mb-0.5")}
          >
            <Collapsible defaultOpen asChild>
              <ListGroup asChild className="w-full bg-transparent gap-0.5">
                <div>
                  <Collapsible.Trigger asChild>
                    <ListGroup.Item
                      asChild
                      action
                      className="font-semibold rounded-lg text-sm py-2 flex justify-between items-center group"
                    >
                      <button type="button">
                        {section.title}
                        <ChevronRight className="size-4.5 group-data-[state=open]:rotate-90 transition-transform" />
                      </button>
                    </ListGroup.Item>
                  </Collapsible.Trigger>
                  <Collapsible.Content className="flex flex-col gap-0.5">
                    {section.links.map((link) => (
                      <ListGroup.Item
                        key={link}
                        asChild
                        action
                        active={link === "E-commerce"}
                        className="rounded-lg text-sm py-2 ps-8"
                      >
                        <a href="#">
                          <span>{link}</span>
                        </a>
                      </ListGroup.Item>
                    ))}
                  </Collapsible.Content>
                </div>
              </ListGroup>
            </Collapsible>
          </div>
        ))}
      </Drawer.Body>
    </>
  );
}
