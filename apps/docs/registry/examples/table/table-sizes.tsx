"use client";

import { Table } from "@hummingbirdui/react";

export default function TableSizes() {
  return (
    <div className="flex flex-col gap-6">
      <Table size="md">
        <Table.Header>
          <Table.Row>
            <Table.Head>Name</Table.Head>
            <Table.Head>Role</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Jane Cooper</Table.Cell>
            <Table.Cell>Admin</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Cody Fisher</Table.Cell>
            <Table.Cell>Member</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Table size="sm">
        <Table.Header>
          <Table.Row>
            <Table.Head>Name</Table.Head>
            <Table.Head>Role</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Jane Cooper</Table.Cell>
            <Table.Cell>Admin</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Cody Fisher</Table.Cell>
            <Table.Cell>Member</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}
