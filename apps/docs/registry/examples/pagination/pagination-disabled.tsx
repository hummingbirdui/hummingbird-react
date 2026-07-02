"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@hummingbirdui/react";

export default function PaginationDisabled() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem disabled>
          <PaginationLink href="#">Prev</PaginationLink>
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
          <PaginationLink href="#">Next</PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
