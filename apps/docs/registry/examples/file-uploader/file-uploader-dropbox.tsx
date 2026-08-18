"use client";

import { FileUploader } from "@hummingbirdui/react";
import { Upload } from "lucide-react";

export default function FileUploaderDropbox() {
  return (
    <FileUploader
      accept={{ "image/*": [] }}
      className="mx-auto w-full max-w-md"
    >
      <FileUploader.Thumbnails dropbox>
        <FileUploader.Dropzone variant="box">
          <FileUploader.Message>
            <Upload className="size-4" />
          </FileUploader.Message>
        </FileUploader.Dropzone>
      </FileUploader.Thumbnails>
    </FileUploader>
  );
}
