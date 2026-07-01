"use client";

import { Alert } from "@hummingbirdui/react";

export default function AlertColors() {
  return (
    <div className="flex flex-col gap-3">
      <Alert color="neutral">A neutral alert.</Alert>
      <Alert color="primary">A primary alert.</Alert>
      <Alert color="secondary">A secondary alert.</Alert>
      <Alert color="info">An info alert.</Alert>
      <Alert color="success">A success alert.</Alert>
      <Alert color="warning">A warning alert.</Alert>
      <Alert color="danger">A danger alert.</Alert>
    </div>
  );
}
