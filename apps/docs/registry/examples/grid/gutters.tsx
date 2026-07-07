"use client";

import { Container, Row, Col } from "@hummingbirdui/react/layout/grid";

export default function GridGutters() {
  return (
    <Container className="text-center">
      <Row className="g-3">
        <Col xs={6}>
          <div>Custom column padding</div>
        </Col>
        <Col xs={6}>
          <div>Custom column padding</div>
        </Col>
        <Col xs={6}>
          <div>Custom column padding</div>
        </Col>
        <Col xs={6}>
          <div>Custom column padding</div>
        </Col>
      </Row>
    </Container>
  );
}
