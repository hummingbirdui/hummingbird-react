"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@hummingbirdui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PaginationWithIcons() {
  return (
    <Pagination>
      <PaginationContent shape="circle">
        <PaginationItem disabled>
          <PaginationLink href="#" aria-label="Go to previous page">
            <ChevronLeft className="size-4" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem active>
          <PaginationLink active href="#">
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" aria-label="Go to next page">
            <ChevronRight className="size-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
