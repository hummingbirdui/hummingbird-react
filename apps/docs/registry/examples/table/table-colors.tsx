"use client";

import { Table } from "@hummingbirdui/react";

const colors = [
  "neutral",
  "primary",
  "secondary",
  "info",
  "success",
  "warning",
  "danger",
] as const;

export default function TableColors() {
  return (
    <div className="flex flex-col gap-6">
      {colors.map((color) => (
        <Table key={color} color={color}>
          <Table.Header>
            <Table.Row>
              <Table.Head>Color</Table.Head>
              <Table.Head>Status</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>{color}</Table.Cell>
              <Table.Cell>Active</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      ))}
    </div>
  );
}
