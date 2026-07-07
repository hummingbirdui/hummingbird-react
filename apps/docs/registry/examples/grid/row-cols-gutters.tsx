"use client";

import { Container, Row, Col } from "@hummingbirdui/react/layout/grid";

export default function GridRowColsGutters() {
  return (
    <Container className="text-center">
      <Row xs={2} lg={3} className="g-3">
        <Col>
          <div>Row column</div>
        </Col>
        <Col>
          <div>Row column</div>
        </Col>
        <Col>
          <div>Row column</div>
        </Col>
        <Col>
          <div>Row column</div>
        </Col>
        <Col>
          <div>Row column</div>
        </Col>
        <Col>
          <div>Row column</div>
        </Col>
      </Row>
    </Container>
  );
}
