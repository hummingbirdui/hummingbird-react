"use client";

import { Container, Row, Col } from "@hummingbirdui/react/layout/grid";

export default function GridAlignHorizontal() {
  return (
    <Container className="text-center">
      <Row className="justify-start">
        <Col xs={4}>One of two columns</Col>
        <Col xs={4}>One of two columns</Col>
      </Row>
      <Row className="justify-center">
        <Col xs={4}>One of two columns</Col>
        <Col xs={4}>One of two columns</Col>
      </Row>
      <Row className="justify-end">
        <Col xs={4}>One of two columns</Col>
        <Col xs={4}>One of two columns</Col>
      </Row>
    </Container>
  );
}
