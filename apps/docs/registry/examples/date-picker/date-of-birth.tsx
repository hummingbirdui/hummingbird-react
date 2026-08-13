"use client";

import * as React from "react";

import { Calendar, DatePicker, Field } from "@hummingbirdui/react";

export default function DatePickerDateOfBirth() {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  return (
    <Field className="mx-auto w-48">
      <Field.Label htmlFor="date-of-birth">Date of birth</Field.Label>
      <DatePicker open={open} onOpenChange={setOpen}>
        <DatePicker.Trigger id="date-of-birth" placeholder="Select date">
          {date?.toLocaleDateString()}
        </DatePicker.Trigger>
        <DatePicker.Content>
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
        </DatePicker.Content>
      </DatePicker>
    </Field>
  );
}
