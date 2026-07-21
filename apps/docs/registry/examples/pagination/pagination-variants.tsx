"use client";

import { Pagination } from "@hummingbirdui/react";

export default function PaginationVariants() {
  return (
    <div className="flex flex-col gap-3">
      <Pagination variant="filled">
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
      <Pagination variant="subtle">
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
      <Pagination variant="outlined">
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
    </div>
  );
}
