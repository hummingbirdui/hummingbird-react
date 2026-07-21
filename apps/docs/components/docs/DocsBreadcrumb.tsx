"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Drawer } from "@hummingbirdui/react/drawer";
import { Button } from "@hummingbirdui/react/button";
import { Breadcrumb } from "@hummingbirdui/react/breadcrumb";
import { cn } from "@hummingbirdui/react/utils";
import type { SidebarGroup } from "@/lib/docs-tree";
import { Menu } from "lucide-react";
import { SidebarNav } from "./SidebarNav";

function titleCase(segment: string): string {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function DocsBreadcrumb({ groups }: { groups: SidebarGroup[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const segments = pathname.split("/").filter(Boolean).slice(1); // drop "docs"

  return (
    <nav className="sticky top-(--navbar-height) pointer-events-auto! z-30 flex items-center gap-4 py-2 px-6 sm:px-10 border-b border-subtle bg-default lg:hidden">
      <Drawer direction="left" open={open} onOpenChange={setOpen}>
        <Drawer.Trigger asChild>
          <Button
            variant="subtle"
            color="neutral"
            shape="circle"
            className="shrink-0"
            aria-label="Open navigation"
          >
            <Menu className="size-5" />
          </Button>
        </Drawer.Trigger>
        <Drawer.Overlay className="top-[calc(var(--navbar-height)+54px)]!" />
        <Drawer.Content
          overlay={false}
          className="w-60 top-[calc(var(--navbar-height)+54px)] lg:top-(--navbar-height) lg:max-h-[calc(100dvh-var(--navbar-height))]"
        >
          <Drawer.Body className="overflow-y-auto">
            <SidebarNav groups={groups} />
          </Drawer.Body>
        </Drawer.Content>
      </Drawer>

      {segments.length > 0 && (
        <Breadcrumb className="min-w-0">
          <Breadcrumb.List separator="arrow" className="flex-nowrap mb-0">
            {segments.map((segment, index) => {
              const isLast = index === segments.length - 1;
              return (
                <Breadcrumb.Item
                  key={index}
                  className={cn(
                    "font-medium",
                    !isLast && "text-muted",
                    isLast && "truncate",
                  )}
                >
                  {isLast ? (
                    <Breadcrumb.Page>{titleCase(segment)}</Breadcrumb.Page>
                  ) : (
                    titleCase(segment)
                  )}
                </Breadcrumb.Item>
              );
            })}
          </Breadcrumb.List>
        </Breadcrumb>
      )}
    </nav>
  );
}
