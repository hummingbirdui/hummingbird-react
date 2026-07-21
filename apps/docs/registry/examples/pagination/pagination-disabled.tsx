"use client";

import { Pagination } from "@hummingbirdui/react";

export default function PaginationDisabled() {
  return (
    <Pagination>
      <Pagination.Content>
        <Pagination.Item disabled>
          <Pagination.Link href="#">Prev</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item active>
          <Pagination.Link href="#">1</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link href="#">2</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link href="#">3</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link href="#">Next</Pagination.Link>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  );
}
