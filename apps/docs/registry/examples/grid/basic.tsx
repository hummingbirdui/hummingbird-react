"use client";

import { Container, Row, Col } from "@hummingbirdui/react/layout/grid";

export default function GridBasic() {
  return (
    <Container className="text-center">
      <Row>
        <Col>Column</Col>
        <Col>Column</Col>
        <Col>Column</Col>
      </Row>
    </Container>
  );
}
