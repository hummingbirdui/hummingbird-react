import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@hummingbirdui/react/button";
import { ChevronLeft, ChevronRight } from "./Icons";

interface PaginationItem {
  name: ReactNode;
  url: string;
}

/**
 * Previous / Next links to the adjacent pages in tree order. Each side renders
 * a spacer when absent so the present side keeps its edge alignment.
 */
export function DocsPagination({
  prev,
  next,
}: {
  prev?: PaginationItem;
  next?: PaginationItem;
}) {
  return (
    <div className="flex items-center justify-between gap-4 mt-16">
      {prev ? (
        <Button
          asChild
          variant="subtle"
          color="neutral"
          className="flex-col items-start h-auto px-5 py-3"
        >
          <Link href={prev.url}>
            <span className="flex items-center -ml-1 text-muted">
              <ChevronLeft />
              <span className="text-xs">Previous</span>
            </span>
            <span className="text-base font-semibold">{prev.name}</span>
          </Link>
        </Button>
      ) : (
        <span />
      )}

      {next ? (
        <Button
          asChild
          variant="subtle"
          color="neutral"
          className="flex-col items-end h-auto px-5 py-3"
        >
          <Link href={next.url}>
            <span className="flex items-center text-muted">
              <span className="text-xs">Next</span>
              <ChevronRight />
            </span>
            <span className="text-base font-semibold">{next.name}</span>
          </Link>
        </Button>
      ) : (
        <span />
      )}
    </div>
  );
}
