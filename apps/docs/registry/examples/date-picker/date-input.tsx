"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";

import {
  Button,
  Calendar,
  DatePicker,
  Field,
  Input,
  InputIcon,
} from "@hummingbirdui/react";

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

export default function DatePickerInput() {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(
    new Date("2025-06-01"),
  );
  const [month, setMonth] = React.useState<Date | undefined>(date);
  const [value, setValue] = React.useState(formatDate(date));

  return (
    <Field className="mx-auto w-56">
      <Field.Label htmlFor="date-required">Subscription Date</Field.Label>
      <DatePicker open={open} onOpenChange={setOpen}>
        <DatePicker.Anchor asChild>
          <InputIcon>
            <Input
              id="date-required"
              value={value}
              placeholder="June 01, 2025"
              onChange={(e) => {
                const date = new Date(e.target.value);
                setValue(e.target.value);
                if (isValidDate(date)) {
                  setDate(date);
                  setMonth(date);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setOpen(true);
                }
              }}
            />
            <InputIcon.End>
              <DatePicker.Trigger asChild>
                <Button
                  shape="circle"
                  variant="text"
                  size="sm"
                  aria-label="Select date"
                  className="-me-2"
                >
                  <CalendarIcon className="size-3.5" />
                </Button>
              </DatePicker.Trigger>
            </InputIcon.End>
          </InputIcon>
        </DatePicker.Anchor>
        <DatePicker.Content align="end" sideOffset={10}>
          <Calendar
            mode="single"
            selected={date}
            month={month}
            onMonthChange={setMonth}
            onSelect={(date) => {
              setDate(date);
              setValue(formatDate(date));
              setOpen(false);
            }}
          />
        </DatePicker.Content>
      </DatePicker>
    </Field>
  );
}
