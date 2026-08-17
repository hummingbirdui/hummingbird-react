"use client";

import { Calendar } from "@hummingbirdui/react";

export default function CalendarCaption() {
  return (
    <Calendar
      mode="single"
      className="mx-auto rounded-lg border border-default"
      captionLayout="dropdown"
    />
  );
}
