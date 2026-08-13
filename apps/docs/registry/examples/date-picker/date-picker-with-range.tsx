"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { type DateRange } from "react-day-picker";

import { Calendar, DatePicker, Field } from "@hummingbirdui/react";

export default function DatePickerWithRange() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 20),
    to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
  });

  return (
    <Field className="mx-auto w-64">
      <Field.Label htmlFor="date-picker-range">Date Picker Range</Field.Label>
      <DatePicker>
        <DatePicker.Trigger id="date-picker-range" placeholder="Pick a date">
          {date?.from &&
            (date.to
              ? `${format(date.from, "LLL dd, y")} - ${format(date.to, "LLL dd, y")}`
              : format(date.from, "LLL dd, y"))}
        </DatePicker.Trigger>
        <DatePicker.Content>
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </DatePicker.Content>
      </DatePicker>
    </Field>
  );
}
