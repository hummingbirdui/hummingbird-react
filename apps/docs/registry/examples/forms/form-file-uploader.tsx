"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Upload } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button, Field, FileUploader, toast } from "@hummingbirdui/react";

const formSchema = z.object({
  attachments: z
    .array(
      z
        .file()
        .max(1_000_000, "Each image must be 1 MB or smaller.")
        .mime(["image/png", "image/jpeg"], "Only PNG and JPEG are allowed."),
    )
    .min(1, "Add at least one image."),
});

type FormValues = z.infer<typeof formSchema>;

export default function FormFileUploader() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { attachments: [] },
  });

  function onSubmit(data: FormValues) {
    toast("Images uploaded", {
      description: data.attachments.map((file) => file.name).join(", "),
    });
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="mx-auto w-full max-w-md space-y-4"
    >
      <Controller
        name="attachments"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <Field.Label>Images</Field.Label>
            <FileUploader
              files={field.value}
              onFilesChange={field.onChange}
              multiple
            >
              <FileUploader.Dropzone>
                <FileUploader.Message>
                  <div className="flex items-center justify-center gap-2">
                    <Upload className="size-4" />
                    <p className="text-xs mb-0">
                      Drop images here or browse from device
                    </p>
                  </div>
                </FileUploader.Message>
              </FileUploader.Dropzone>
              <FileUploader.List />
            </FileUploader>
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
