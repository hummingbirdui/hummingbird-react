"use client";

import { Table } from "@hummingbirdui/react";

export default function TableBorderless() {
  return (
    <Table borderless>
      <Table.Header>
        <Table.Row>
          <Table.Head>Name</Table.Head>
          <Table.Head>Email</Table.Head>
          <Table.Head>Role</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Jane Cooper</Table.Cell>
          <Table.Cell>jane@example.com</Table.Cell>
          <Table.Cell>Admin</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Cody Fisher</Table.Cell>
          <Table.Cell>cody@example.com</Table.Cell>
          <Table.Cell>Member</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}
