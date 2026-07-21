"use client";

import { Pagination } from "@hummingbirdui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PaginationSizes() {
  return (
    <div className="flex flex-col gap-3">
      <Pagination size="sm">
        <Pagination.Content>
          <Pagination.Item disabled>
            <Pagination.Link href="#">
              <ChevronLeft className="size-4" />
            </Pagination.Link>
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Link href="#">1</Pagination.Link>
          </Pagination.Item>
          <Pagination.Item active>
            <Pagination.Link href="#">2</Pagination.Link>
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Link href="#">3</Pagination.Link>
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Link href="#">
              <ChevronRight className="size-4" />
            </Pagination.Link>
          </Pagination.Item>
        </Pagination.Content>
      </Pagination>
      <Pagination>
        <Pagination.Content>
          <Pagination.Item disabled>
            <Pagination.Link href="#">
              <ChevronLeft className="size-4" />
            </Pagination.Link>
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Link href="#">1</Pagination.Link>
          </Pagination.Item>
          <Pagination.Item active>
            <Pagination.Link href="#">2</Pagination.Link>
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Link href="#">3</Pagination.Link>
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Link href="#">
              <ChevronRight className="size-4" />
            </Pagination.Link>
          </Pagination.Item>
        </Pagination.Content>
      </Pagination>
      <Pagination size="lg">
        <Pagination.Content>
          <Pagination.Item disabled>
            <Pagination.Link href="#">
              <ChevronLeft className="size-4" />
            </Pagination.Link>
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Link href="#">1</Pagination.Link>
          </Pagination.Item>
          <Pagination.Item active>
            <Pagination.Link href="#">2</Pagination.Link>
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Link href="#">3</Pagination.Link>
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Link href="#">
              <ChevronRight className="size-4" />
            </Pagination.Link>
          </Pagination.Item>
        </Pagination.Content>
      </Pagination>
    </div>
  );
}
