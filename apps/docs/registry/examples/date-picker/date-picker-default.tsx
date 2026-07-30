"use client";

import * as React from "react";
import { format } from "date-fns";

import { Button, Calendar, Field, Popover } from "@hummingbirdui/react";

export default function DatePickerSimple() {
  const [date, setDate] = React.useState<Date>();

  return (
    <Field className="mx-auto w-44">
      <label htmlFor="date-picker-simple">Date</label>
      <Popover>
        <Popover.Trigger asChild>
          <Button
            variant="outline"
            id="date-picker-simple"
            className="justify-start font-normal"
          >
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </Popover.Trigger>
        <Popover.Content className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            defaultMonth={date}
          />
        </Popover.Content>
      </Popover>
    </Field>
  );
}
