import type * as React from "react";
import { Table } from "@hummingbirdui/react/table";

export type CssVariableDef = {
  cssVariable: React.ReactNode;
  description?: React.ReactNode;
};

export function CssVariablesTable({ data }: { data: CssVariableDef[] }) {
  return (
    <Table highlight>
      <Table.Header>
        <Table.Row>
          <Table.Head className="bg-muted">CSS Variable</Table.Head>
          <Table.Head className="bg-muted">Description</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((row, i) => (
          <Table.Row key={i}>
            <Table.Cell>
              <code className="font-semibold">{row.cssVariable}</code>
            </Table.Cell>
            <Table.Cell>{row.description}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
