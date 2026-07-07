"use client";

import { Container, Row, Col } from "@hummingbirdui/react/layout/grid";

export default function GridAlignSelf() {
  return (
    <Container className="text-center">
      <Row>
        <Col className="self-start">One of three columns</Col>
        <Col className="self-center">One of three columns</Col>
        <Col className="self-end">One of three columns</Col>
      </Row>
    </Container>
  );
}
