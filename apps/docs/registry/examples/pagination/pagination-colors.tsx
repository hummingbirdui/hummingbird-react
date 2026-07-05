"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@hummingbirdui/react";

const colors = [
  "primary",
  "secondary",
  "info",
  "success",
  "warning",
  "danger",
  "neutral",
] as const;

export default function PaginationColors() {
  return (
    <div className="flex flex-col gap-3">
      {colors.map((color) => (
        <Pagination key={color}>
          <PaginationContent color={color}>
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
      ))}
    </div>
  );
}
