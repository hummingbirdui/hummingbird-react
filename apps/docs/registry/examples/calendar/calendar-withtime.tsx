"use client";

import * as React from "react";
import { Clock2Icon } from "lucide-react";
import { Calendar, Card, Field, InputGroup, Input } from "@hummingbirdui/react";

export default function CalendarWithTime() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 12),
  );

  return (
    <Card size="sm" className="mx-auto w-fit">
      <Card.Body className="p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="p-0"
        />
      </Card.Body>
      <Card.Footer className="border-t border-default bg-card">
        <div>
          <Field className="mb-3">
            <label htmlFor="time-from">Start Time</label>
            <InputGroup>
              <Input
                id="time-from"
                type="time"
                step="1"
                defaultValue="10:30:00"
                className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
              <InputGroup.Text>
                <Clock2Icon className="text-muted-foreground" />
              </InputGroup.Text>
            </InputGroup>
          </Field>
          <Field>
            <label htmlFor="time-to">End Time</label>
            <InputGroup>
              <Input
                id="time-to"
                type="time"
                step="1"
                defaultValue="12:30:00"
                className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
              <InputGroup.Text>
                <Clock2Icon className="text-muted-foreground text-xs" />
              </InputGroup.Text>
            </InputGroup>
          </Field>
        </div>
      </Card.Footer>
    </Card>
  );
}
