"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import {
  Button,
  Calendar,
  DatePicker,
  Field,
  toast,
} from "@hummingbirdui/react";

const formSchema = z.object({
  dob: z.date("A date of birth is required."),
});

type FormValues = z.infer<typeof formSchema>;

export default function FormDatePicker() {
  const [open, setOpen] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { dob: undefined },
  });

  function onSubmit(data: FormValues) {
    toast("Date of birth saved", { description: format(data.dob, "PPP") });
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="mx-auto w-full max-w-sm space-y-4"
    >
      <Controller
        name="dob"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <Field.Label htmlFor="form-dob">Date of birth</Field.Label>
            <DatePicker open={open} onOpenChange={setOpen}>
              <DatePicker.Trigger
                id="form-dob"
                placeholder="Pick a date"
                className={fieldState.invalid ? "is-invalid" : undefined}
              >
                {field.value && format(field.value, "PPP")}
              </DatePicker.Trigger>
              <DatePicker.Content>
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={(date) => {
                    field.onChange(date);
                    setOpen(false);
                  }}
                />
              </DatePicker.Content>
            </DatePicker>
            {fieldState.invalid && (
              <Field.Text variant="invalid">
                {fieldState.error?.message}
              </Field.Text>
            )}
          </Field>
        )}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
