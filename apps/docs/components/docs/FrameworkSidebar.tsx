"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@hummingbirdui/react/utils";
import { frameworks } from "@/data/frameworks";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const normalize = (path: string) =>
  path.length > 1 ? path.replace(/\/+$/, "") : path;

/**
 * Right-column framework switcher shown on guide pages instead of the table
 * of contents (pages with `frameworkGuide: true` in their frontmatter),
 * mirroring the core Hummingbird docs. Hidden below `xl`.
 */
export function FrameworkSidebar() {
  const pathname = usePathname();

  return (
    <div className="ps-6 py-10 sticky top-(--navbar-height) h-max hidden xl:block">
      <Link
        href="/docs/getting-started/framework-guides"
        className="mb-4 flex items-center gap-1 text-default font-medium no-underline hover:text-primary"
      >
        <ChevronLeft className="size-5 shrink-0" />
        Back to frameworks
      </Link>
      {frameworks.map((item) => {
        const active = normalize(pathname) === normalize(item.url);
        return (
          <Link
            key={item.url}
            href={item.url}
            aria-current={active ? "page" : undefined}
            className={cn(
              "mb-4 ps-4 no-underline flex items-center justify-between",
              active ? "text-primary" : "text-muted hover:text-default",
            )}
          >
            <span className="flex items-center gap-3">
              { }
              <img
                src={`${basePath}${item.logo.light}`}
                alt=""
                className="w-5 object-contain dark:hidden"
              />
              { }
              <img
                src={`${basePath}${item.logo.dark}`}
                alt=""
                className="w-5 object-contain hidden dark:block"
              />
              <span className="text-base font-medium">{item.name}</span>
            </span>
            <ChevronRight className="size-5 shrink-0" />
          </Link>
        );
      })}
    </div>
  );
}
