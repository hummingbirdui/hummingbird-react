"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
} from "@/components/drawer";
import { Button } from "@hummingbirdui/react/button";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
} from "@hummingbirdui/react/breadcrumb";
import { cn } from "@hummingbirdui/react/utils";
import type { SidebarGroup } from "@/lib/docs-tree";
import { SidebarNav } from "./SidebarNav";
import { Menu } from "./Icons";

function titleCase(segment: string): string {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Mobile-only top bar: a menu button that opens the sidebar in a left Drawer,
 * plus a breadcrumb trail derived from the current path. Hidden from `lg` up,
 * where the persistent sidebar takes over.
 */
export function DocsBreadcrumb({ groups }: { groups: SidebarGroup[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the drawer after a client-side navigation (Vaul keeps its own state).
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const segments = pathname.split("/").filter(Boolean).slice(1); // drop "docs"

  return (
    <nav className="sticky top-0 z-30 flex items-center gap-4 py-3 border-b border-subtle bg-default lg:hidden">
      <Drawer direction="left" open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button
            variant="subtle"
            color="neutral"
            shape="circle"
            className="shrink-0"
            aria-label="Open navigation"
          >
            <Menu />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="w-72 max-w-[80vw]">
          <DrawerHeader>
            <DrawerTitle>Documentation</DrawerTitle>
          </DrawerHeader>
          <DrawerBody className="overflow-y-auto">
            <SidebarNav groups={groups} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {segments.length > 0 && (
        <Breadcrumb className="min-w-0">
          <BreadcrumbList separator="arrow" className="flex-nowrap mb-0">
            {segments.map((segment, index) => {
              const isLast = index === segments.length - 1;
              return (
                <BreadcrumbItem
                  key={index}
                  className={cn(
                    "font-medium",
                    !isLast && "text-muted",
                    isLast && "truncate"
                  )}
                >
                  {isLast ? (
                    <BreadcrumbPage>{titleCase(segment)}</BreadcrumbPage>
                  ) : (
                    titleCase(segment)
                  )}
                </BreadcrumbItem>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      )}
    </nav>
  );
}
