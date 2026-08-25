"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import {
  Button,
  Checkbox,
  Field,
  Input,
  Radio,
  RadioGroup,
  Select,
  Textarea,
  toast,
} from "@hummingbirdui/react";

const formSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters."),
  bio: z
    .string()
    .min(10, "Bio must be at least 10 characters.")
    .max(160, "Bio must be at most 160 characters."),
  plan: z.enum(["free", "pro", "team"], "Please select a plan."),
  notify: z.enum(["all", "mentions", "none"], "Please select an option."),
  terms: z.boolean().refine(Boolean, "The terms must be accepted."),
});

type FormValues = z.infer<typeof formSchema>;

export default function FormDemo() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      bio: "",
      plan: "" as FormValues["plan"],
      notify: "" as FormValues["notify"],
      terms: false,
    },
  });

  function onSubmit(_data: FormValues) {
    toast("Form submitted successfully!");
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="mx-auto w-full max-w-sm space-y-4"
    >
      <Controller
        name="username"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <Field.Label htmlFor="form-username">Username</Field.Label>
            <Input
              {...field}
              id="form-username"
              placeholder="hummingbird"
              state={fieldState.invalid ? "invalid" : undefined}
            />
            {fieldState.invalid && (
              <Field.Text variant="invalid">
                {fieldState.error?.message}
              </Field.Text>
            )}
          </Field>
        )}
      />
      <Controller
        name="bio"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <Field.Label htmlFor="form-bio">Bio</Field.Label>
            <Textarea
              {...field}
              id="form-bio"
              rows={3}
              placeholder="Tell everyone a little about this account."
              state={fieldState.invalid ? "invalid" : undefined}
            />
            {fieldState.invalid && (
              <Field.Text variant="invalid">
                {fieldState.error?.message}
              </Field.Text>
            )}
          </Field>
        )}
      />
      <Controller
        name="plan"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <Field.Label htmlFor="form-plan">Plan</Field.Label>
            <Select
              {...field}
              id="form-plan"
              state={fieldState.invalid ? "invalid" : undefined}
            >
              <option value="" disabled>
                Choose a plan
              </option>
              <option value="free">Free</option>
              <option value="pro">Pro</option>
              <option value="team">Team</option>
            </Select>
            {fieldState.invalid && (
              <Field.Text variant="invalid">
                {fieldState.error?.message}
              </Field.Text>
            )}
          </Field>
        )}
      />
      <Controller
        name="notify"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <Field.Label>Notify me about</Field.Label>
            <RadioGroup
              name={field.name}
              value={field.value}
              onValueChange={field.onChange}
            >
              <Radio inline value="all" label="All" />
              <Radio inline value="mentions" label="Mentions" />
              <Radio inline value="none" label="Nothing" />
            </RadioGroup>
            {fieldState.invalid && (
              <Field.Text variant="invalid" className="block">
                {fieldState.error?.message}
              </Field.Text>
            )}
          </Field>
        )}
      />
      <Controller
        name="terms"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <Checkbox
              label="Accept terms and conditions"
              checked={field.value}
              onChange={field.onChange}
              className={fieldState.invalid ? "is-invalid" : undefined}
            />
          </Field>
        )}
      />
      <div className="flex gap-2">
        <Button type="submit">Submit</Button>
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Reset
        </Button>
      </div>
    </form>
  );
}
