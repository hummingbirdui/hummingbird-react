"use client";

import * as React from "react";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";

import { Calendar, DatePicker, Field, Input } from "@hummingbirdui/react";

export default function DatePickerTime() {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  return (
    <div className="mx-auto flex max-w-xs gap-2">
      <Field>
        <Field.Label htmlFor="date-picker-optional">Date</Field.Label>
        <DatePicker open={open} onOpenChange={setOpen}>
          <DatePicker.Trigger
            id="date-picker-optional"
            placeholder="Select date"
            icon={<ChevronDownIcon />}
          >
            {date && format(date, "PPP")}
          </DatePicker.Trigger>
          <DatePicker.Content>
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              defaultMonth={date}
              onSelect={(date) => {
                setDate(date);
                setOpen(false);
              }}
            />
          </DatePicker.Content>
        </DatePicker>
      </Field>
      <Field className="w-32 shrink-0">
        <Field.Label htmlFor="time-picker-optional">Time</Field.Label>
        <Input
          type="time"
          id="time-picker-optional"
          step="1"
          defaultValue="10:30:00"
          className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </Field>
    </div>
  );
}
