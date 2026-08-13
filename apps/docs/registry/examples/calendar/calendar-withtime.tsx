"use client";

import * as React from "react";
import { Calendar, Card, Field, Input, InputIcon } from "@hummingbirdui/react";
import { Clock2Icon } from "lucide-react";

export default function CalendarWithTime() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 12),
  );

  return (
    <Card className="mx-auto w-fit">
      <Card.Body className="p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="w-full"
        />
      </Card.Body>
      <Card.Footer className="border-t border-default">
        <div>
          <Field className="mb-3">
            <Field.Label htmlFor="time-from">Start Time</Field.Label>
            <InputIcon>
              <Input
                id="time-from"
                type="time"
                step="1"
                defaultValue="10:30:00"
                className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
              <InputIcon.End>
                <Clock2Icon className="text-muted size-4" />
              </InputIcon.End>
            </InputIcon>
          </Field>
          <Field>
            <Field.Label htmlFor="time-to">End Time</Field.Label>
            <InputIcon>
              <Input
                id="time-to"
                type="time"
                step="1"
                defaultValue="12:30:00"
                className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
              <InputIcon.End>
                <Clock2Icon className="text-muted size-4" />
              </InputIcon.End>
            </InputIcon>
          </Field>
        </div>
      </Card.Footer>
    </Card>
  );
}
