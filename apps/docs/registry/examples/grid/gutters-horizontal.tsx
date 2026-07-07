"use client";

import { Container, Row, Col } from "@hummingbirdui/react/layout/grid";

export default function GridGuttersHorizontal() {
  return (
    <Container className="text-center overflow-hidden">
      <Row className="gx-12">
        <Col>
          <div>Custom column padding</div>
        </Col>
        <Col>
          <div>Custom column padding</div>
        </Col>
      </Row>
    </Container>
  );
}
