"use client";

import * as React from "react";

import { Card, Calendar } from "@hummingbirdui/react";

export default function CalendarWeekNumbers() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(new Date().getFullYear(), 0, 12),
  );

  return (
    <Card className="mx-auto w-fit p-0">
      <Card.Body className="p-0">
        <Calendar
          mode="single"
          defaultMonth={date}
          selected={date}
          onSelect={setDate}
          showWeekNumber
        />
      </Card.Body>
    </Card>
  );
}
