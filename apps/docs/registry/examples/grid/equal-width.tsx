"use client";

import { Container, Row, Col } from "@hummingbirdui/react/layout/grid";

export default function GridEqualWidth() {
  return (
    <Container className="text-center">
      <Row>
        <Col>1 of 2</Col>
        <Col>2 of 2</Col>
      </Row>
      <Row>
        <Col>1 of 3</Col>
        <Col>2 of 3</Col>
        <Col>3 of 3</Col>
      </Row>
    </Container>
  );
}
