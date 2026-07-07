"use client";

import { Container, Row, Col } from "@hummingbirdui/react/layout/grid";

export default function GridRowColsAuto() {
  return (
    <Container className="text-center">
      <Row xs="auto">
        <Col>Column</Col>
        <Col>Column</Col>
        <Col>Column</Col>
        <Col>Column</Col>
      </Row>
    </Container>
  );
}
