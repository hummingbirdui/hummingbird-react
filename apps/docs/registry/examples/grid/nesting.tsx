"use client";

import { Container, Row, Col } from "@hummingbirdui/react/layout/grid";

export default function GridNesting() {
  return (
    <Container className="text-center">
      <Row>
        <Col sm={3}>Level 1: sm=3</Col>
        <Col sm={9}>
          <Row>
            <Col xs={8} sm={6}>
              Level 2: xs=8 sm=6
            </Col>
            <Col xs={4} sm={6}>
              Level 2: xs=4 sm=6
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
