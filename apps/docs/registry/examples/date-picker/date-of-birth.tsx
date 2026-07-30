"use client";

import * as React from "react";

import { Button, Calendar, Field, Popover } from "@hummingbirdui/react";

export default function DatePickerSimple() {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  return (
    <Field className="mx-auto w-44">
      <label htmlFor="date">Date of birth</label>
      <Popover open={open} onOpenChange={setOpen}>
        <Popover.Trigger>
          <Button
            variant="outline"
            id="date"
            className="justify-start font-normal"
          >
            {date ? date.toLocaleDateString() : "Select date"}
          </Button>
        </Popover.Trigger>
        <Popover.Content className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            defaultMonth={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
            }}
          />
        </Popover.Content>
      </Popover>
    </Field>
  );
}
