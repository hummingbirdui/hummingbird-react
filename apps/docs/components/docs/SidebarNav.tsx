"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListGroup, ListGroupItem } from "@hummingbirdui/react/list-group";
import { cn } from "@hummingbirdui/react/utils";
import type { SidebarGroup } from "@/lib/docs-tree";

export function SidebarNav({ groups }: { groups: SidebarGroup[] }) {
  const pathname = usePathname();
  return (
    <nav className="w-full">
      {groups.map((group, index) => (
        <div key={index}>
          {group.subHeader && (
            <h2
              className={cn(
                "text-xs mb-2 text-subtle uppercase",
                index !== 0 && "mt-6",
              )}
            >
              {group.subHeader}
            </h2>
          )}
          <ListGroup className="w-full bg-transparent gap-0.5">
            {group.items.map((item) => {
              const active = pathname === item.url;
              return (
                <ListGroupItem
                  key={item.url}
                  action
                  active={active}
                  asChild
                  className={cn(
                    "rounded-lg text-sm py-2",
                    active
                      ? "text-primary-dark bg-primary-lighter"
                      : "text-default",
                  )}
                >
                  <Link href={item.url}>{item.name}</Link>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </div>
      ))}
    </nav>
  );
}
