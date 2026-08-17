"use client";

import * as React from "react";
import { Calendar } from "@hummingbirdui/react";

export default function CalendarDefault() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="mx-auto rounded-lg border border-default"
    />
  );
}
