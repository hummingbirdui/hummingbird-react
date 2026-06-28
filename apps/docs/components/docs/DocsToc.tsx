"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@hummingbirdui/react/utils";

interface TocItem {
  title: ReactNode;
  url: string;
  depth: number;
}

/**
 * Right-column "On this page" table of contents with scroll-spy: an
 * IntersectionObserver tracks which heading is in view and highlights the
 * matching link. Hidden below `xl`.
 */
export function DocsToc({ toc }: { toc: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>();

  useEffect(() => {
    const elements = toc
      .map((item) => document.getElementById(item.url.replace("#", "")))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "0px 0px -70% 0px", threshold: [0, 1] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [toc]);

  if (toc.length === 0) return null;

  const minDepth = Math.min(...toc.map((item) => item.depth));

  return (
    <div className="ps-6 py-10 sticky top-0 h-max hidden xl:block">
      <p className="font-bold ps-4 mb-2 text-default">On this page</p>
      <ul className="list-none ps-4 m-0">
        {toc.map((item) => {
          const id = item.url.replace("#", "");
          const active = id === activeId;
          return (
            <li
              key={item.url}
              style={{
                paddingInlineStart: `${(item.depth - minDepth) * 0.75}rem`,
              }}
            >
              <a
                href={item.url}
                aria-current={active ? "location" : undefined}
                className={cn(
                  "flex items-center gap-3 py-1 text-sm no-underline",
                  active
                    ? "text-primary font-medium"
                    : "text-muted hover:text-default"
                )}
              >
                <span className="w-1 h-1 rounded-full bg-current shrink-0" />
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
