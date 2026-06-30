"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerBody,
  DrawerOverlay,
} from "@hummingbirdui/react/drawer";
import { Button } from "@hummingbirdui/react/button";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
} from "@hummingbirdui/react/breadcrumb";
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
        <DrawerTrigger asChild>
          <Button
            variant="subtle"
            color="neutral"
            shape="circle"
            className="shrink-0"
            aria-label="Open navigation"
          >
            <Menu className="size-5" />
          </Button>
        </DrawerTrigger>
        <DrawerOverlay className="top-[calc(var(--navbar-height)+54px)]!" />
        <DrawerContent
          overlay={false}
          className="w-60 top-[calc(var(--navbar-height)+54px)] lg:top-(--navbar-height) lg:max-h-[calc(100dvh-var(--navbar-height))]"
        >
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
                    isLast && "truncate",
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
