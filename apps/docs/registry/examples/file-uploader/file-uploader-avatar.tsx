"use client";

import { FileUploader } from "@hummingbirdui/react";
import { ImagePlus } from "lucide-react";

export default function FileUploaderAvatar() {
  return (
    <FileUploader
      accept={{ "image/*": [] }}
      maxFiles={1}
      className="flex justify-center"
    >
      <FileUploader.Dropzone variant="avatar">
        <FileUploader.Message>
          <div className="flex flex-col items-center justify-center gap-2">
            <ImagePlus className="size-4" />
            <p className="text-xs mb-0">Upload Avatar</p>
          </div>
        </FileUploader.Message>
      </FileUploader.Dropzone>
    </FileUploader>
  );
}
