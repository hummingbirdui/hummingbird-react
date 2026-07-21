"use client";

import { Table } from "@hummingbirdui/react";

export default function TableFooterExample() {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head>Item</Table.Head>
          <Table.Head>Amount</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Widget</Table.Cell>
          <Table.Cell>$12.00</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Gadget</Table.Cell>
          <Table.Cell>$8.00</Table.Cell>
        </Table.Row>
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.Cell>Total</Table.Cell>
          <Table.Cell>$20.00</Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
}
