"use client";

import { FileUploader } from "@hummingbirdui/react";
import { Upload } from "lucide-react";

export default function FileUploaderSingle() {
  return (
    <FileUploader maxFiles={1} className="mx-auto w-full max-w-md">
      <FileUploader.Dropzone>
        <FileUploader.Message>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <Upload className="size-4" />
            <p className="text-xs mb-0">
              <span>Drop a file here</span>
              <span className="mx-1 text-subtle">or</span>
              <span className="text-primary">browse from device</span>
            </p>
          </div>
        </FileUploader.Message>
      </FileUploader.Dropzone>
      <FileUploader.List />
    </FileUploader>
  );
}
