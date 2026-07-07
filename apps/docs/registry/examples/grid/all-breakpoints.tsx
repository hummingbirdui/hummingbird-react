"use client";

import { Container, Row, Col } from "@hummingbirdui/react/layout/grid";

export default function GridAllBreakpoints() {
  return (
    <Container className="text-center">
      <Row>
        <Col>col</Col>
        <Col>col</Col>
        <Col>col</Col>
        <Col>col</Col>
      </Row>
      <Row>
        <Col xs={8}>xs=8</Col>
        <Col xs={4}>xs=4</Col>
      </Row>
    </Container>
  );
}
