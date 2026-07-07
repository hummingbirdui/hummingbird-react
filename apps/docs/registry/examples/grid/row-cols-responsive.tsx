"use client";

import { Container, Row, Col } from "@hummingbirdui/react/layout/grid";

export default function GridRowColsResponsive() {
  return (
    <Container className="text-center">
      <Row xs={1} sm={2} md={4}>
        <Col>Column</Col>
        <Col>Column</Col>
        <Col>Column</Col>
        <Col>Column</Col>
      </Row>
    </Container>
  );
}
