"use client";

import { Table } from "@hummingbirdui/react";

export default function TableActive() {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head>Name</Table.Head>
          <Table.Head>Status</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Jane Cooper</Table.Cell>
          <Table.Cell>Active</Table.Cell>
        </Table.Row>
        <Table.Row active>
          <Table.Cell>Cody Fisher</Table.Cell>
          <Table.Cell>Highlighted row</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Esther Howard</Table.Cell>
          <Table.Cell active>Highlighted cell</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}
