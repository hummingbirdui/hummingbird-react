"use client";

import { Table } from "@hummingbirdui/react";

export default function RebootCaptions() {
  return (
    <Table>
      <Table.Caption>This is a table caption</Table.Caption>
      <Table.Header>
        <Table.Row>
          <Table.Head>Header 1</Table.Head>
          <Table.Head>Header 2</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Data 1</Table.Cell>
          <Table.Cell>Data 2</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}
