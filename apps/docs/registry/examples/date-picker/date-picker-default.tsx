"use client";

import * as React from "react";
import { format } from "date-fns";

import { Calendar, DatePicker, Field } from "@hummingbirdui/react";

export default function DatePickerSimple() {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date>();

  return (
    <Field className="mx-auto w-48">
      <Field.Label htmlFor="date-picker-simple">Date</Field.Label>
      <DatePicker open={open} onOpenChange={setOpen}>
        <DatePicker.Trigger id="date-picker-simple" placeholder="Pick a date">
          {date && format(date, "PPP")}
        </DatePicker.Trigger>
        <DatePicker.Content>
          <Calendar
            mode="single"
            selected={date}
            defaultMonth={date}
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
