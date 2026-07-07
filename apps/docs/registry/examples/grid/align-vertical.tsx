"use client";

import { Container, Row, Col } from "@hummingbirdui/react/layout/grid";

export default function GridAlignVertical() {
  return (
    <Container className="text-center">
      <Row className="items-start">
        <Col>One of three columns</Col>
        <Col>One of three columns</Col>
        <Col>One of three columns</Col>
      </Row>
    </Container>
  );
}
