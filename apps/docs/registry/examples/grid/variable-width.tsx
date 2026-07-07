"use client";

import { Container, Row, Col } from "@hummingbirdui/react/layout/grid";

export default function GridVariableWidth() {
  return (
    <Container className="text-center">
      <Row className="md:justify-center mb-3">
        <Col lg={2}>1 of 3</Col>
        <Col md="auto">Variable width content</Col>
        <Col lg={2}>3 of 3</Col>
      </Row>
      <Row>
        <Col>1 of 3</Col>
        <Col md="auto">Variable width content</Col>
        <Col lg={2}>3 of 3</Col>
      </Row>
    </Container>
  );
}
