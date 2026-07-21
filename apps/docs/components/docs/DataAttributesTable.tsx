import type * as React from "react";
import { Table } from "@hummingbirdui/react/table";

export type DataAttributeDef = {
  attribute: React.ReactNode;
  /**
   * Possible values. An array renders as a code chip (`"open" | "closed"`);
   * a plain node renders as text (e.g. "Present when disabled").
   */
  values: string[] | React.ReactNode;
};

export function DataAttributesTable({ data }: { data: DataAttributeDef[] }) {
  return (
    <Table highlight>
      <Table.Header>
        <Table.Row>
          <Table.Head className="bg-muted">Data attribute</Table.Head>
          <Table.Head className="bg-muted">Values</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((row, i) => (
          <Table.Row key={i}>
            <Table.Cell>
              <code className="font-semibold">{row.attribute}</code>
            </Table.Cell>
            <Table.Cell>
              {Array.isArray(row.values) ? (
                <code>{row.values.join(" | ")}</code>
              ) : (
                row.values
              )}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
