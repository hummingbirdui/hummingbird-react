"use client";

import * as React from "react";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { Button, Calendar, Field, Input, Popover } from "@hummingbirdui/react";

export default function DatePickerTime() {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  return (
    <div className="flex gap-2 mx-auto max-w-xs">
      <Field>
        <label htmlFor="date-picker-optional">Date</label>
        <Popover open={open} onOpenChange={setOpen}>
          <Popover.Trigger>
            <Button
              variant="outline"
              id="date-picker-optional"
              className="w-32 justify-between font-normal"
            >
              {date ? format(date, "PPP") : "Select date"}
              <ChevronDownIcon data-icon="inline-end" />
            </Button>
          </Popover.Trigger>
          <Popover.Content className="w-auto overflow-hidden p-0" align="start">
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
          </Popover.Content>
        </Popover>
      </Field>
      <Field className="w-32">
        <label htmlFor="time-picker-optional">Time</label>
        <Input
          type="time"
          id="time-picker-optional"
          step="1"
          defaultValue="10:30:00"
          className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </Field>
    </div>
  );
}
