"use client";

import { Row, Col } from "@hummingbirdui/react/layout/grid";

export default function GridNoGutters() {
  return (
    <Row className="g-0 text-center">
      <Col xs={6} md={8}>
        xs=6 md=8
      </Col>
      <Col xs={6} md={4}>
        xs=6 md=4
      </Col>
    </Row>
  );
}
