"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListGroup } from "@hummingbirdui/react/list-group";
import { cn } from "@hummingbirdui/react/utils";
import type { SidebarGroup } from "@/lib/docs-tree";

const normalize = (path: string) =>
  path.length > 1 ? path.replace(/\/+$/, "") : path;

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
              const path = normalize(pathname);
              const url = normalize(item.url);
              // Prefix match keeps a collapsed folder's index entry (e.g.
              // Framework Guides) highlighted while on one of its child pages.
              const active = path === url || path.startsWith(url + "/");
              return (
                <ListGroup.Item
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
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </div>
      ))}
    </nav>
  );
}
