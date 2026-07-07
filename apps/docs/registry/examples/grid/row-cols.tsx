"use client";

import { Container, Row, Col } from "@hummingbirdui/react/layout/grid";

export default function GridRowCols() {
  return (
    <Container className="text-center">
      <Row xs={2}>
        <Col>Column</Col>
        <Col>Column</Col>
        <Col>Column</Col>
        <Col>Column</Col>
      </Row>
    </Container>
  );
}
