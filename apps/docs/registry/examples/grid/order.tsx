"use client";

import { Container, Row, Col } from "@hummingbirdui/react/layout/grid";

export default function GridOrder() {
  return (
    <Container className="text-center">
      <Row>
        <Col>First in DOM, no order applied</Col>
        <Col className="order-5">Second in DOM, with a larger order</Col>
        <Col className="order-1">Third in DOM, with an order of 1</Col>
      </Row>
    </Container>
  );
}
