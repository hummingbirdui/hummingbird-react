"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button, Field, Slider, toast } from "@hummingbirdui/react";

const formSchema = z.object({
  budget: z
    .array(z.number())
    .refine((value) => value[0] >= 25, "Allocate a budget of at least $25."),
});

type FormValues = z.infer<typeof formSchema>;

export default function FormSlider() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { budget: [10] },
  });

  function onSubmit(data: FormValues) {
    toast("Budget saved", { description: `Monthly budget: $${data.budget[0]}` });
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="mx-auto w-full max-w-sm space-y-4"
    >
      <Controller
        name="budget"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <Field.Label>Budget: ${field.value[0]}</Field.Label>
            <Slider
              value={field.value}
              onValueChange={field.onChange}
              max={100}
              step={5}
              aria-label="Budget"
            />
            {fieldState.invalid && (
              <Field.Text variant="invalid" className="block">
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
