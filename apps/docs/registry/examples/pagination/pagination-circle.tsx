"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@hummingbirdui/react";

export default function PaginationCircle() {
  return (
    <Pagination>
      <PaginationContent shape="circle">
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem active>
          <PaginationLink active href="#">
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
