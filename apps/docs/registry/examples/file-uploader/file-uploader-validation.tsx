"use client";

import * as React from "react";
import { FileUploader } from "@hummingbirdui/react";
import { ImageUp } from "lucide-react";

const MAX_SIZE = 1024 * 1024; // 1 MB

export default function FileUploaderValidation() {
  const [error, setError] = React.useState<string | null>(null);

  return (
    <FileUploader
      accept={{ "image/*": [] }}
      maxSize={MAX_SIZE}
      onDropAccepted={() => setError(null)}
      onDropRejected={(rejections) => {
        setError(
          rejections[0]?.errors[0]?.code === "file-too-large"
            ? "Images must be smaller than 1 MB."
            : "Only image files are accepted.",
        );
      }}
      className="mx-auto w-full max-w-md"
    >
      <FileUploader.Dropzone>
        <FileUploader.Message>
          <div className="flex flex-col items-center justify-center gap-2">
            <ImageUp className="size-4" />
            <p className="text-xs mb-0">Drop images here (max 1 MB each)</p>
          </div>
        </FileUploader.Message>
      </FileUploader.Dropzone>
      {error ? <p className="mt-2 text-xs text-danger">{error}</p> : null}
      <FileUploader.Thumbnails />
    </FileUploader>
  );
}
