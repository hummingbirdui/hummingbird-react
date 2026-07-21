"use client";

import { Pagination } from "@hummingbirdui/react";

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
        <Pagination key={color} color={color}>
          <Pagination.Content>
            <Pagination.Item>
              <Pagination.Link href="#">1</Pagination.Link>
            </Pagination.Item>
            <Pagination.Item active>
              <Pagination.Link href="#">2</Pagination.Link>
            </Pagination.Item>
            <Pagination.Item>
              <Pagination.Link href="#">3</Pagination.Link>
            </Pagination.Item>
          </Pagination.Content>
        </Pagination>
      ))}
    </div>
  );
}
