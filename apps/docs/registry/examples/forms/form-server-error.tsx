"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Alert, Button, Field, Input, toast } from "@hummingbirdui/react";

const formSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

type FormValues = z.infer<typeof formSchema>;

export default function FormServerError() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const { errors, isSubmitting } = form.formState;

  async function onSubmit(data: FormValues) {
    await new Promise((resolve) => setTimeout(resolve, 1200));

    if (data.email !== "demo@example.com") {
      form.setError("root", {
        message: "Sign in failed. Use demo@example.com with any password.",
      });
      return;
    }

    toast("Signed in successfully");
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="mx-auto w-full max-w-sm space-y-4"
    >
      {errors.root && <Alert color="danger">{errors.root.message}</Alert>}
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <Field.Label htmlFor="form-email">Email</Field.Label>
            <Input
              {...field}
              id="form-email"
              type="email"
              placeholder="demo@example.com"
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
        name="password"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <Field.Label htmlFor="form-password">Password</Field.Label>
            <Input
              {...field}
              id="form-password"
              type="password"
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
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
