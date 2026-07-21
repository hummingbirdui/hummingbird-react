"use client";

import { Breadcrumb } from "@hummingbirdui/react";

export default function BreadcrumbSeparators() {
  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb>
        <Breadcrumb.List separator="slash">
          <Breadcrumb.Item>
            <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
            <Breadcrumb.Page>Slash</Breadcrumb.Page>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
      <Breadcrumb>
        <Breadcrumb.List separator="dashed">
          <Breadcrumb.Item>
            <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
            <Breadcrumb.Page>Dashed</Breadcrumb.Page>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
      <Breadcrumb>
        <Breadcrumb.List separator="arrow">
          <Breadcrumb.Item>
            <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
            <Breadcrumb.Page>Arrow</Breadcrumb.Page>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
    </div>
  );
}
